/** 头像只允许两种微侧角度，不包含正面居中。 */

import { AvatarInputError } from "./input-error.ts";

export const portraitAngleIds = ["turn-left", "turn-right"] as const;

export type PortraitAngleId = (typeof portraitAngleIds)[number];

/** 画面里头部转向的方向，以及朝向那一侧留出的空白。 */
export const portraitAngles: Record<PortraitAngleId, string> = {
  "turn-left":
    "head turned about twenty-five degrees toward the left of the frame, eyes looking back at the viewer, open white space on the left",
  "turn-right":
    "head turned about twenty-five degrees toward the right of the frame, eyes looking back at the viewer, open white space on the right",
};

export const defaultPortraitAngle: PortraitAngleId = "turn-left";

export function parsePortraitAngle(value: string): PortraitAngleId {
  if (value === "turn-left" || value === "turn-right") {
    return value;
  }
  throw new AvatarInputError(
    "角度只能是 turn-left 或 turn-right。看参考图，把头微微转向更清楚的那一侧。",
  );
}
