---
name: avatar-generator
description: >-
  根据用户上传的参考图生成正方形干净线稿插画头像：黑线勾轮廓，线有粗细，
  只上一层淡彩或平涂，微侧角度，背景留白。
  在用户要求头像、线稿、插画头像、微信头像、profile picture，
  或附上照片要做成头像时使用。没有参考图就先请用户上传。
  用 TypeScript 核对参考图并输出生图方案，再调用生图。
---

# 干净线稿插画头像

只做这一种风格。黑线勾轮廓，外轮廓更粗，五官和衣服用细线，只上一层淡彩或平涂。背景留白。不是写实照片，也不是 Q 版大头。

角度由这次出图来定，不要问用户。看参考图哪一侧脸更清楚（头发没挡住、眼镜没反光、五官完整），头就微微转向那一侧，大约 25 度，眼睛看回镜头，朝向的一侧留白。两边差不多时用 `turn-left`。不要正面证件照，也不要全侧脸。

长相以用户上传的参考图为准。没有参考图就停下来，请用户上传一张正面、光线清楚的本人照片，不要编造五官，也不要生图。

## 步骤

1. 找到用户这次附上的照片路径。没附照片就请用户上传，到此为止。
2. 看参考图选定角度，写入 `--angle`。不要问用户选哪边。
3. 人物补充只记录用户明确说过的内容（衣服、发型），译成英文短句。没说就不要加 `--notes`，也不要编脸。
4. 在本 skill 目录执行。若还没有 `node_modules`，先运行 `npm install`。

```bash
npm run plan -- --reference "<参考图绝对路径>" --angle "<turn-left 或 turn-right>" --notes "<英文短句，可省略>"
```

画面左侧更清楚用 `turn-left`，画面右侧更清楚用 `turn-right`。用户指定了表情时再加 `--expression "<眼睛和嘴的英文短句>"`。

5. 脚本失败时，把 stderr 里的原话告诉用户，不要生图。
6. 脚本成功后，用当前 agent 的生图能力出图。方案原样传入，不要改写：
   - 提示词用 `prompt`
   - 画幅用 `imageRequest.aspectRatio`（1:1）
   - 参考图用 `imageRequest.referenceImagePaths`
7. 回复里说明这是线稿插画头像，脸来自参考图，并说明头转向哪一侧。不要把图片再贴成 Markdown。

## 示例

小猪参考图两侧差不多清楚，用了 `turn-left`。原图在 [examples/pig/before.png](examples/pig/before.png)，生成结果在 [examples/pig/after.png](examples/pig/after.png)。

## 代码

| 文件 | 做什么 |
| --- | --- |
| `src/cli.ts` | 命令入口，打印方案 JSON |
| `src/index.ts` | 对外导出的能力 |
| `src/parse-args.ts` | 读取 `--reference`、`--angle`、`--notes`、`--expression` |
| `src/read-reference-image.ts` | 确认参考图已上传，并核对格式 |
| `src/portrait-angle.ts` | 两种微侧角度，以及各自的留白 |
| `src/line-illustration.ts` | 线稿插画的固定线条和上色 |
| `src/build-avatar-plan.ts` | 把参考图和构图合成生图方案 |
| `src/types.ts` | 请求、参考图、方案的类型 |
| `src/input-error.ts` | 参考图缺失或不合格时的错误 |
