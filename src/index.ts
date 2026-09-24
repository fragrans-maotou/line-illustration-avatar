/** 对外导出的能力：读参考图，拼出线稿插画头像方案。 */

export { buildAvatarPlan } from "./build-avatar-plan.ts";
export { lineIllustration } from "./line-illustration.ts";
export { defaultPortraitAngle, portraitAngles } from "./portrait-angle.ts";
export type { PortraitAngleId } from "./portrait-angle.ts";
export { subjects, subjectIds } from "./subject.ts";
export type { Subject, SubjectId } from "./subject.ts";
export { AvatarInputError } from "./input-error.ts";
export { parseArgs } from "./parse-args.ts";
export { readReferenceImage } from "./read-reference-image.ts";
export type {
  AvatarPlan,
  AvatarRequest,
  LineIllustration,
  ReferenceImage,
  ReferenceImageFormat,
} from "./types.ts";
