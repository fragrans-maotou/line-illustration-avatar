/** 用参考图和线稿插画构图，合成一条可直接生图的方案。 */

import { lineIllustration } from "./line-illustration.js";
import { defaultPortraitAngle, portraitAngles } from "./portrait-angle.js";
import type { PortraitAngleId } from "./portrait-angle.js";
import type { AvatarPlan, ReferenceImage } from "./types.js";

export function buildAvatarPlan(input: {
  referenceImage: ReferenceImage;
  personNotes?: string;
  expression?: string;
  angle?: PortraitAngleId;
}): AvatarPlan {
  const expression = input.expression ?? lineIllustration.defaultExpression;
  const angle = input.angle ?? defaultPortraitAngle;
  const prompt = [
    "clean editorial ink illustration of the person in the reference photo, preserve their face and identity",
    input.personNotes,
    expression,
    portraitAngles[angle],
    lineIllustration.styleSuffix,
  ]
    .filter((part) => part !== undefined && part !== "")
    .join(", ");

  return {
    referenceImage: input.referenceImage,
    illustration: lineIllustration,
    angle,
    ...(input.personNotes ? { personNotes: input.personNotes } : {}),
    expression,
    prompt,
    imageRequest: {
      aspectRatio: lineIllustration.aspectRatio,
      referenceImagePaths: [input.referenceImage.path],
    },
  };
}
