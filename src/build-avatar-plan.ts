/** 用参考图、主体和线稿插画构图，合成一条可直接生图的方案。 */

import { lineIllustration } from "./line-illustration.ts";
import { defaultPortraitAngle, portraitAngles } from "./portrait-angle.ts";
import type { PortraitAngleId } from "./portrait-angle.ts";
import { subjects } from "./subject.ts";
import type { SubjectId } from "./subject.ts";
import type { AvatarPlan, ReferenceImage } from "./types.ts";

export function buildAvatarPlan(input: {
  referenceImage: ReferenceImage;
  subject: SubjectId;
  notes?: string;
  expression?: string;
  angle?: PortraitAngleId;
}): AvatarPlan {
  const subject = subjects[input.subject];
  const expression = input.expression ?? subject.defaultExpression;
  const angle = input.angle ?? defaultPortraitAngle;
  const prompt = [
    subject.lead,
    input.notes,
    expression,
    portraitAngles[angle],
    subject.colors,
    lineIllustration.styleSuffix,
  ]
    .filter((part) => part !== undefined && part !== "")
    .join(", ");

  return {
    referenceImage: input.referenceImage,
    illustration: lineIllustration,
    subject: input.subject,
    angle,
    ...(input.notes ? { notes: input.notes } : {}),
    expression,
    prompt,
    imageRequest: {
      aspectRatio: lineIllustration.aspectRatio,
      negativePrompt: [...lineIllustration.avoid, ...subject.avoid].join(", "),
      referenceImagePaths: [input.referenceImage.path],
    },
  };
}
