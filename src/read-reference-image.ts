/** 确认用户已经上传参考图，并核对它是 JPEG、PNG 或 WebP。 */

import { open, stat } from "node:fs/promises";
import path from "node:path";

import { AvatarInputError } from "./input-error.js";
import type { ReferenceImage, ReferenceImageFormat } from "./types.js";

const MAX_BYTES = 15 * 1024 * 1024;

export async function readReferenceImage(referenceImagePath: string): Promise<ReferenceImage> {
  const resolved = path.resolve(referenceImagePath);
  const fileStat = await readFileStat(resolved);

  if (!fileStat.isFile()) {
    throw new AvatarInputError(`参考图不是文件：${resolved}`);
  }
  if (fileStat.size === 0) {
    throw new AvatarInputError("参考图是空文件。请重新上传一张照片。");
  }
  if (fileStat.size > MAX_BYTES) {
    throw new AvatarInputError("参考图超过 15MB。请压缩后再上传。");
  }

  const header = await readHeader(resolved);
  const format = detectFormat(header);
  if (format === "heic") {
    throw new AvatarInputError("参考图是 HEIC。请先导出为 JPEG、PNG 或 WebP 再上传。");
  }
  if (format === null) {
    throw new AvatarInputError("参考图格式不支持。请上传 JPEG、PNG 或 WebP。");
  }

  return {
    path: resolved,
    format,
    bytes: fileStat.size,
  };
}

type FileHeaderFormat = ReferenceImageFormat | "heic";

async function readFileStat(resolved: string) {
  try {
    return await stat(resolved);
  } catch (error) {
    if (isMissingFile(error)) {
      throw new AvatarInputError(`找不到参考图：${resolved}`);
    }
    throw error;
  }
}

async function readHeader(resolved: string) {
  const handle = await open(resolved, "r");
  try {
    const header = Buffer.alloc(16);
    await handle.read(header, 0, 16, 0);
    return header;
  } finally {
    await handle.close();
  }
}

function detectFormat(header: Buffer): FileHeaderFormat | null {
  if (header[0] === 0xff && header[1] === 0xd8 && header[2] === 0xff) {
    return "jpeg";
  }
  if (
    header[0] === 0x89 &&
    header[1] === 0x50 &&
    header[2] === 0x4e &&
    header[3] === 0x47
  ) {
    return "png";
  }
  if (header.toString("ascii", 0, 4) === "RIFF" && header.toString("ascii", 8, 12) === "WEBP") {
    return "webp";
  }
  if (header.toString("ascii", 4, 8) === "ftyp") {
    const brand = header.toString("ascii", 8, 12);
    if (brand === "heic" || brand === "heix" || brand === "hevc" || brand === "mif1") {
      return "heic";
    }
  }
  return null;
}

function isMissingFile(error: unknown): boolean {
  return error instanceof Error && "code" in error && error.code === "ENOENT";
}
