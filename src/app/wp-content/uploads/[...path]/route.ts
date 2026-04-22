import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

const uploadsRoot = path.join(
  /*turbopackIgnore: true*/ process.cwd(),
  "public_html",
  "wp-content",
  "uploads"
);

const contentTypes: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path: segments } = await context.params;
  const relativePath = segments.join("/");
  const extension = path.extname(relativePath).toLowerCase();
  const contentType = contentTypes[extension];

  if (!contentType) {
    return new Response("Unsupported media type", { status: 415 });
  }

  const filePath = path.resolve(/*turbopackIgnore: true*/ uploadsRoot, relativePath);

  if (!filePath.startsWith(`${uploadsRoot}${path.sep}`)) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const file = await readFile(filePath);

    return new Response(file, {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": contentType,
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
