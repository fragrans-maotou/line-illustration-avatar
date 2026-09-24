/** 这份 skill 里流转的数据结构。 */

import type { PortraitAngleId } from "./portrait-angle.ts";

/** 用户上传的参考图。长相以这张图为准。 */
export type ReferenceImage = {
  path: string;
  format: ReferenceImageFormat;
  bytes: number;
};

export type ReferenceImageFormat = "jpeg" | "png" | "webp";

/** 命令行读到的本次请求。参考图路径必填。 */
export type AvatarRequest = {
  referenceImagePath: string;
  /** 用户明确说过的补充，英文短句。不描述五官。 */
  personNotes?: string;
  /** 覆盖默认表情的英文短句。 */
  expression?: string;
  /** 看参考图后选定的微侧方向。 */
  angle?: PortraitAngleId;
};

/** 干净线稿插画的固定构图。每次出图都用同一套。 */
export type LineIllustration = {
  name: "line-illustration";
  aspectRatio: "1:1";
  width: 1024;
  height: 1024;
  crop: "head-and-shoulders";
  headroom: "10-15% above the hair";
  safeZone: "eyes and mouth stay readable; leave open white space on the side the face turns toward";
  defaultExpression: string;
  styleSuffix: string;
  avoid: readonly string[];
};

/** 交给生图工具的方案。提示词和参考图路径都已定好。 */
export type AvatarPlan = {
  referenceImage: ReferenceImage;
  illustration: LineIllustration;
  angle: PortraitAngleId;
  personNotes?: string;
  expression: string;
  prompt: string;
  imageRequest: {
    aspectRatio: "1:1";
    referenceImagePaths: [string];
  };
};
