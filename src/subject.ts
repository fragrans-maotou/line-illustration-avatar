/** 参考图里画的是谁。主语、配色和负面提示都跟着主体走，不能把人的特征套到动物或玩偶上。 */

import { AvatarInputError } from "./input-error.ts";

export const subjectIds = ["person", "animal", "character"] as const;

export type SubjectId = (typeof subjectIds)[number];

export type Subject = {
  lead: string;
  colors: string;
  defaultExpression: string;
  avoid: readonly string[];
};

export const subjects: Record<SubjectId, Subject> = {
  person: {
    lead: "clean editorial ink illustration of the person in the reference photo, preserve their face and identity",
    colors: "natural skin tone from the reference photo, hair and clothing keep their own colors",
    defaultExpression: "looking at the camera, relaxed friendly smile",
    avoid: ["chibi", "oversized head", "cartoon animal", "skin tinted with the clothing color", "stiff expression"],
  },
  animal: {
    lead: "clean editorial ink illustration of the animal in the reference photo, same species, preserve its markings, proportions, and identity",
    colors: "fur, skin, and markings keep their natural colors from the reference photo",
    defaultExpression: "keep the expression from the reference photo",
    avoid: ["human", "human face", "anthropomorphic", "turning the animal into a person"],
  },
  character: {
    lead: "clean editorial ink illustration of the toy or character in the reference photo, keep its original shape, proportions, and identity",
    colors: "keep the original colors of the toy or character from the reference photo",
    defaultExpression: "keep the expression from the reference photo",
    avoid: ["human", "human face", "realistic animal", "turning the character into a person", "changing its proportions"],
  },
};

export function parseSubject(value: string): SubjectId {
  if (isSubjectId(value)) {
    return value;
  }
  throw new AvatarInputError(
    `主体只能是 ${subjectIds.join("、")}。真人用 person，猫狗等真实动物用 animal，玩偶、手办、卡通形象用 character。`,
  );
}

function isSubjectId(value: string): value is SubjectId {
  return (subjectIds as readonly string[]).includes(value);
}
