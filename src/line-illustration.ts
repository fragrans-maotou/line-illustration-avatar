/** 干净线稿插画：黑线勾轮廓，线有粗细，分区淡彩平涂，白底。不含任何主体专属的描述。 */

import type { LineIllustration } from "./types.ts";

export const lineIllustration: LineIllustration = {
  name: "line-illustration",
  aspectRatio: "1:1",
  width: 1024,
  height: 1024,
  crop: "head-and-upper-body",
  headroom: "10-15% above the head",
  safeZone: "eyes and mouth stay readable; leave open white space on the side the face turns toward",
  styleSuffix: [
    "square head-and-upper-body crop",
    "black contour lines with varied weight",
    "thicker outer silhouette",
    "thinner interior lines for facial features and details",
    "flat muted color fills kept separate by area",
    "limited soft palette",
    "not a photograph",
    "generous blank white background",
    "no scenery",
  ].join(", "),
  avoid: [
    "photograph",
    "photorealistic texture",
    "studio lighting",
    "3d render",
    "anime sparkle eyes",
    "text",
    "watermark",
    "scenery",
    "gradient shading",
    "crosshatching",
    "second subject",
    "straight-on passport crop",
    "face pinned to the center",
    "full profile",
    "single color wash over everything",
  ],
};
