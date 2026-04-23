#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, statSync, existsSync, mkdirSync, copyFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const sourceRoot = path.join(projectRoot, "public_html", "wp-content", "uploads");
const targetRoot = path.join(projectRoot, "public", "assets", "uploads");
const generatedMapFile = path.join(projectRoot, "src", "lib", "generated", "wp-asset-remap.ts");

const codeExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);
const assetExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".svg", ".pdf"]);
const rasterExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);

if (!existsSync(sourceRoot)) {
  throw new Error(`Source uploads folder not found: ${sourceRoot}`);
}

const walkFiles = (dir, output = []) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const nextPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(nextPath, output);
      continue;
    }
    if (codeExtensions.has(path.extname(entry.name))) {
      output.push(nextPath);
    }
  }
  return output;
};

const collectAssetRefs = () => {
  const srcRoot = path.join(projectRoot, "src");
  const files = walkFiles(srcRoot);
  const refs = new Set();
  const regex = /asset\(\s*(["'`])([^"'`]+)\1\s*\)/g;

  for (const filePath of files) {
    const content = readFileSync(filePath, "utf8");
    let match;
    while ((match = regex.exec(content)) !== null) {
      refs.add(match[2]);
    }
  }

  return [...refs].sort();
};

const normalizeBaseName = (basenameWithoutExt) => {
  let value = basenameWithoutExt.toLowerCase();
  let previous = "";

  while (value !== previous) {
    previous = value;
    value = value.replace(/-\d+x\d+$/i, "");
    value = value.replace(/-scaled(?:-\d+)?$/i, "");
    value = value.replace(/-e\d+$/i, "");
  }

  return value;
};

const directoryCache = new Map();
const getDirectoryAssets = (relativeDir) => {
  if (!directoryCache.has(relativeDir)) {
    const absoluteDir = path.join(sourceRoot, relativeDir);
    let entries = [];
    if (existsSync(absoluteDir)) {
      entries = readdirSync(absoluteDir, { withFileTypes: true })
        .filter((entry) => entry.isFile())
        .map((entry) => entry.name)
        .filter((filename) => assetExtensions.has(path.extname(filename).toLowerCase()));
    }
    directoryCache.set(relativeDir, entries);
  }
  return directoryCache.get(relativeDir);
};

const dimensionCache = new Map();
const getImageArea = (absolutePath) => {
  if (dimensionCache.has(absolutePath)) {
    return dimensionCache.get(absolutePath);
  }

  let area = 0;
  try {
    const output = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", absolutePath], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    const widthMatch = output.match(/pixelWidth:\s*(\d+)/);
    const heightMatch = output.match(/pixelHeight:\s*(\d+)/);
    const width = widthMatch ? Number(widthMatch[1]) : 0;
    const height = heightMatch ? Number(heightMatch[1]) : 0;
    area = width > 0 && height > 0 ? width * height : 0;
  } catch {
    area = 0;
  }

  dimensionCache.set(absolutePath, area);
  return area;
};

const scoreCandidate = (absolutePath, isRaster) => {
  const fileSize = statSync(absolutePath).size;
  const area = isRaster ? getImageArea(absolutePath) : 0;
  return { area, fileSize };
};

const pickBestCandidate = (relativeRefPath) => {
  const normalizedRef = relativeRefPath.replaceAll("\\", "/");
  const relativeDir = path.posix.dirname(normalizedRef);
  const filename = path.posix.basename(normalizedRef);
  const ext = path.posix.extname(filename).toLowerCase();
  const basenameWithoutExt = filename.slice(0, filename.length - ext.length);
  const normalizedBase = normalizeBaseName(basenameWithoutExt);
  const isRaster = rasterExtensions.has(ext);

  const filesInDir = getDirectoryAssets(relativeDir);
  const exactExists = filesInDir.includes(filename);

  if (!isRaster) {
    return exactExists ? normalizedRef : null;
  }

  const familyCandidates = filesInDir.filter((candidateName) => {
    const candidateExt = path.posix.extname(candidateName).toLowerCase();
    if (!rasterExtensions.has(candidateExt)) {
      return false;
    }
    const candidateBase = candidateName.slice(0, candidateName.length - candidateExt.length);
    return normalizeBaseName(candidateBase) === normalizedBase;
  });

  const candidateNames = familyCandidates.length > 0 ? familyCandidates : exactExists ? [filename] : [];
  if (candidateNames.length === 0) {
    return null;
  }

  let bestName = candidateNames[0];
  let bestScore = scoreCandidate(path.join(sourceRoot, relativeDir, bestName), true);

  for (const candidateName of candidateNames.slice(1)) {
    const candidatePath = path.join(sourceRoot, relativeDir, candidateName);
    const candidateScore = scoreCandidate(candidatePath, true);
    if (candidateScore.area > bestScore.area) {
      bestName = candidateName;
      bestScore = candidateScore;
      continue;
    }
    if (candidateScore.area === bestScore.area && candidateScore.fileSize > bestScore.fileSize) {
      bestName = candidateName;
      bestScore = candidateScore;
    }
  }

  return `${relativeDir}/${bestName}`.replace(/^\.\//, "");
};

const ensureDirectory = (dirPath) => {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
};

const assetRefs = collectAssetRefs();
const missing = [];
const remap = {};
const copied = new Set();

for (const ref of assetRefs) {
  const ext = path.posix.extname(ref).toLowerCase();
  if (!assetExtensions.has(ext)) {
    continue;
  }

  const bestMatch = pickBestCandidate(ref);
  if (!bestMatch) {
    missing.push(ref);
    continue;
  }

  if (bestMatch !== ref) {
    remap[ref] = bestMatch;
  }

  if (!copied.has(bestMatch)) {
    const sourcePath = path.join(sourceRoot, bestMatch);
    const destinationPath = path.join(targetRoot, bestMatch);
    ensureDirectory(path.dirname(destinationPath));
    copyFileSync(sourcePath, destinationPath);
    copied.add(bestMatch);
  }
}

const sortedRemapEntries = Object.entries(remap).sort(([a], [b]) => a.localeCompare(b));
const remapBody =
  sortedRemapEntries.length === 0
    ? "{}"
    : `{\n${sortedRemapEntries
        .map(([from, to]) => `  "${from}": "${to}",`)
        .join("\n")}\n}`;

ensureDirectory(path.dirname(generatedMapFile));
writeFileSync(
  generatedMapFile,
  `// Auto-generated by scripts/migrate-wp-assets.mjs\n` +
    `// Maps legacy WordPress-sized asset references to the highest-quality local copy.\n` +
    `export const wpAssetRemap: Record<string, string> = ${remapBody};\n`,
  "utf8"
);

console.log(`Found asset references: ${assetRefs.length}`);
console.log(`Copied assets: ${copied.size}`);
console.log(`Remapped references: ${sortedRemapEntries.length}`);

if (missing.length > 0) {
  console.log(`Missing source files: ${missing.length}`);
  for (const missingPath of missing) {
    console.log(`- ${missingPath}`);
  }
  process.exitCode = 1;
}
