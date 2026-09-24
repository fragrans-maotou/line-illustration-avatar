/** 这份 skill 里流转的数据结构。 */

import type { PortraitAngleId } from "./portrait-angle.ts";
import type { SubjectId } from "./subject.ts";

/** 用户上传的参考图。长相以这张图为准。 */
export type ReferenceImage = {
  path: string;
  format: ReferenceImageFormat;
  bytes: number;
};

export type ReferenceImageFormat = "jpeg" | "png" | "webp";

/** 命令行读到的本次请求。参考图路径和主体必填。 */
export type AvatarRequest = {
  referenceImagePath: string;
  /** 看参考图后判定的主体：真人、动物，还是玩偶或卡通形象。 */
  subject: SubjectId;
  /** 用户明确说过的补充，英文短句。不描述五官。 */
  notes?: string;
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
  crop: "head-and-upper-body";
  headroom: "10-15% above the head";
  safeZone: "eyes and mouth stay readable; leave open white space on the side the face turns toward";
  styleSuffix: string;
  avoid: readonly string[];
};

/** 交给生图工具的方案。提示词和参考图路径都已定好。 */
export type AvatarPlan = {
  referenceImage: ReferenceImage;
  illustration: LineIllustration;
  subject: SubjectId;
  angle: PortraitAngleId;
  notes?: string;
  expression: string;
  prompt: string;
  imageRequest: {
    aspectRatio: "1:1";
    /** 生图工具支持负面提示时原样传入；不支持时并进提示词末尾，前缀 "avoid: "。 */
    negativePrompt: string;
    referenceImagePaths: [string];
  };
};
