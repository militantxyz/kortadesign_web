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
const targetMaxDimension = 3200;

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

const normalizedRelativePath = (value) => value.replace(/^\.\//, "");

const withScaledSuffix = (relativePath) => {
  const ext = path.posix.extname(relativePath);
  const baseName = path.posix.basename(relativePath, ext);
  const directory = path.posix.dirname(relativePath);
  const scaledBaseName = baseName.endsWith("-scaled") ? baseName : `${baseName}-scaled`;
  const nextPath = path.posix.join(directory, `${scaledBaseName}${ext}`);
  return normalizedRelativePath(nextPath);
};

const dimensionCache = new Map();
const getImageMetrics = (absolutePath) => {
  if (dimensionCache.has(absolutePath)) {
    return dimensionCache.get(absolutePath);
  }

  let width = 0;
  let height = 0;
  try {
    const output = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", absolutePath], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    const widthMatch = output.match(/pixelWidth:\s*(\d+)/);
    const heightMatch = output.match(/pixelHeight:\s*(\d+)/);
    width = widthMatch ? Number(widthMatch[1]) : 0;
    height = heightMatch ? Number(heightMatch[1]) : 0;
  } catch {}

  const metrics = {
    area: width > 0 && height > 0 ? width * height : 0,
    height,
    maxDimension: Math.max(width, height),
    width,
  };

  dimensionCache.set(absolutePath, metrics);
  return metrics;
};

const scoreCandidate = (absolutePath, isRaster) => {
  const fileSize = statSync(absolutePath).size;
  if (!isRaster) {
    return { area: 0, fileSize, maxDimension: 0, oversize: 0 };
  }

  const metrics = getImageMetrics(absolutePath);
  const oversize = Math.max(0, metrics.maxDimension - targetMaxDimension);
  return {
    area: metrics.area,
    fileSize,
    maxDimension: metrics.maxDimension,
    oversize,
  };
};

const isBetterCandidate = (candidateScore, bestScore) => {
  const candidateWithinTarget = candidateScore.oversize === 0;
  const bestWithinTarget = bestScore.oversize === 0;

  if (candidateWithinTarget !== bestWithinTarget) {
    return candidateWithinTarget;
  }

  if (candidateWithinTarget) {
    if (candidateScore.area !== bestScore.area) {
      return candidateScore.area > bestScore.area;
    }
    if (candidateScore.fileSize !== bestScore.fileSize) {
      return candidateScore.fileSize > bestScore.fileSize;
    }
    return candidateScore.maxDimension > bestScore.maxDimension;
  }

  if (candidateScore.oversize !== bestScore.oversize) {
    return candidateScore.oversize < bestScore.oversize;
  }
  if (candidateScore.fileSize !== bestScore.fileSize) {
    return candidateScore.fileSize < bestScore.fileSize;
  }
  return candidateScore.area < bestScore.area;
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
    if (isBetterCandidate(candidateScore, bestScore)) {
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
const resized = new Set();

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

  const sourcePath = path.join(sourceRoot, bestMatch);
  const sourceExt = path.posix.extname(bestMatch).toLowerCase();
  const sourceMetrics = rasterExtensions.has(sourceExt) ? getImageMetrics(sourcePath) : null;
  const needsResize = Boolean(
    sourceMetrics && sourceMetrics.maxDimension > targetMaxDimension
  );
  const publishedPath = needsResize ? withScaledSuffix(bestMatch) : bestMatch;

  if (publishedPath !== ref) {
    remap[ref] = publishedPath;
  }

  if (!copied.has(publishedPath)) {
    const destinationPath = path.join(targetRoot, publishedPath);
    ensureDirectory(path.dirname(destinationPath));

    if (needsResize) {
      try {
        execFileSync(
          "sips",
          ["-Z", String(targetMaxDimension), sourcePath, "--out", destinationPath],
          {
            stdio: ["ignore", "ignore", "ignore"],
          }
        );
        resized.add(publishedPath);
      } catch {
        copyFileSync(sourcePath, destinationPath);
      }
    } else {
      copyFileSync(sourcePath, destinationPath);
    }

    copied.add(publishedPath);
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
    `// Maps legacy WordPress-sized asset references to a high-quality local copy with bounded source dimensions.\n` +
    `export const wpAssetRemap: Record<string, string> = ${remapBody};\n`,
  "utf8"
);

console.log(`Found asset references: ${assetRefs.length}`);
console.log(`Copied assets: ${copied.size}`);
console.log(`Resized assets: ${resized.size}`);
console.log(`Remapped references: ${sortedRemapEntries.length}`);

if (missing.length > 0) {
  console.log(`Missing source files: ${missing.length}`);
  for (const missingPath of missing) {
    console.log(`- ${missingPath}`);
  }
  process.exitCode = 1;
}
