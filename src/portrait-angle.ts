/** 头像只允许微侧和三分之四侧，不包含正面居中和全侧脸。 */

import { AvatarInputError } from "./input-error.ts";

export const portraitAngleIds = [
  "turn-left",
  "turn-right",
  "three-quarter-left",
  "three-quarter-right",
] as const;

export type PortraitAngleId = (typeof portraitAngleIds)[number];

/** 画面里头部转向的方向，以及朝向那一侧留出的空白。 */
export const portraitAngles: Record<PortraitAngleId, string> = {
  "turn-left":
    "quarter turn, head turned slightly toward the left of the frame, eyes looking back at the viewer, face not centered, open white space on the left",
  "turn-right":
    "quarter turn, head turned slightly toward the right of the frame, eyes looking back at the viewer, face not centered, open white space on the right",
  "three-quarter-left":
    "three-quarter view, head turned toward the left of the frame, both eyes still visible, eyes looking back at the viewer, open white space on the left, not a full profile",
  "three-quarter-right":
    "three-quarter view, head turned toward the right of the frame, both eyes still visible, eyes looking back at the viewer, open white space on the right, not a full profile",
};

export const defaultPortraitAngle: PortraitAngleId = "turn-left";

export function parsePortraitAngle(value: string): PortraitAngleId {
  if (isPortraitAngleId(value)) {
    return value;
  }
  throw new AvatarInputError(
    `角度只能是 ${portraitAngleIds.join("、")}。看参考图选微侧，不要正面证件照，也不要全侧脸。`,
  );
}

function isPortraitAngleId(value: string): value is PortraitAngleId {
  return (portraitAngleIds as readonly string[]).includes(value);
}
