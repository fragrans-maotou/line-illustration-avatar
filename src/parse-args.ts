/** 从命令行读取 --reference、--subject、--notes、--expression、--angle。 */

import { AvatarInputError } from "./input-error.ts";
import { parsePortraitAngle } from "./portrait-angle.ts";
import { parseSubject, subjectIds } from "./subject.ts";
import type { AvatarRequest } from "./types.ts";

const MISSING_REFERENCE =
  "缺少参考图。请上传一张正面、光线清楚的照片，再生成头像。";

const MISSING_SUBJECT =
  `缺少 --subject。看参考图判定主体：${subjectIds.join("、")}。`;

export function parseArgs(argv: readonly string[]): AvatarRequest {
  let referenceImagePath: string | undefined;
  let subject: AvatarRequest["subject"] | undefined;
  let notes: string | undefined;
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
      case "--subject":
        subject = parseSubject(readFlagValue(argv, index, "主体"));
        index += 1;
        break;
      case "--notes":
        notes = readFlagValue(argv, index, "补充描述");
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
  if (!subject) {
    throw new AvatarInputError(MISSING_SUBJECT);
  }

  const request: AvatarRequest = { referenceImagePath: reference, subject };
  const trimmedNotes = notes?.trim();
  const mood = expression?.trim();
  if (trimmedNotes) {
    request.notes = trimmedNotes;
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
