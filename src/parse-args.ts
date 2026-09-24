/** 从命令行读取 --reference、--notes、--expression、--angle。 */

import { AvatarInputError } from "./input-error.ts";
import { parsePortraitAngle } from "./portrait-angle.ts";
import type { AvatarRequest } from "./types.ts";

const MISSING_REFERENCE =
  "缺少参考图。请上传一张正面、光线清楚的本人照片，再生成头像。";

export function parseArgs(argv: readonly string[]): AvatarRequest {
  let referenceImagePath: string | undefined;
  let personNotes: string | undefined;
  let expression: string | undefined;
  let angle: AvatarRequest["angle"];

  for (let index = 0; index < argv.length; index += 1) {
    const flag = argv[index];
    if (flag === undefined) {
      continue;
    }

    switch (flag) {
      case "--reference":
        referenceImagePath = readFlagValue(argv, index, "参考图路径");
        index += 1;
        break;
      case "--notes":
        personNotes = readFlagValue(argv, index, "人物补充");
        index += 1;
        break;
      case "--expression":
        expression = readFlagValue(argv, index, "表情");
        index += 1;
        break;
      case "--angle":
        angle = parsePortraitAngle(readFlagValue(argv, index, "角度"));
        index += 1;
        break;
      default:
        throw new AvatarInputError(`未知参数：${flag}`);
    }
  }

  const reference = referenceImagePath?.trim();
  if (!reference) {
    throw new AvatarInputError(MISSING_REFERENCE);
  }

  const request: AvatarRequest = { referenceImagePath: reference };
  const notes = personNotes?.trim();
  const mood = expression?.trim();
  if (notes) {
    request.personNotes = notes;
  }
  if (mood) {
    request.expression = mood;
  }
  if (angle) {
    request.angle = angle;
  }
  return request;
}

function readFlagValue(
  argv: readonly string[],
  flagIndex: number,
  label: string,
): string {
  const value = argv[flagIndex + 1];
  if (value === undefined || value.startsWith("--")) {
    throw new AvatarInputError(`--${flagName(argv[flagIndex])} 需要提供${label}。`);
  }
  return value;
}

function flagName(flag: string | undefined): string {
  return flag?.replace(/^--/, "") ?? "参数";
}
