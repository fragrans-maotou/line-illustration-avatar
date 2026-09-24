/** 对外导出的能力：读参考图，拼出线稿插画头像方案。 */

export { buildAvatarPlan } from "./build-avatar-plan.js";
export { lineIllustration } from "./line-illustration.js";
export { defaultPortraitAngle, portraitAngles } from "./portrait-angle.js";
export type { PortraitAngleId } from "./portrait-angle.js";
export { AvatarInputError } from "./input-error.js";
export { parseArgs } from "./parse-args.js";
export { readReferenceImage } from "./read-reference-image.js";
export type {
  AvatarPlan,
  AvatarRequest,
  LineIllustration,
  ReferenceImage,
  ReferenceImageFormat,
} from "./types.js";
