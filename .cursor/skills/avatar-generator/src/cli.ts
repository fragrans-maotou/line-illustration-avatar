/** 命令入口。核对参考图，把方案 JSON 打到标准输出。 */

import {
  AvatarInputError,
  buildAvatarPlan,
  parseArgs,
  readReferenceImage,
} from "./index.js";

async function main(): Promise<void> {
  try {
    const request = parseArgs(process.argv.slice(2));
    const referenceImage = await readReferenceImage(request.referenceImagePath);
    const plan = buildAvatarPlan({
      referenceImage,
      personNotes: request.personNotes,
      expression: request.expression,
      angle: request.angle,
    });
    process.stdout.write(`${JSON.stringify(plan, null, 2)}\n`);
  } catch (error) {
    const message = error instanceof AvatarInputError
      ? error.message
      : error instanceof Error
        ? error.message
        : "生成头像方案失败";
    process.stderr.write(`${message}\n`);
    process.exitCode = 1;
  }
}

await main();
