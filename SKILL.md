---
name: avatar-generator
description: >-
  根据用户上传的参考图生成正方形干净线稿插画头像：黑线勾轮廓，线有粗细，
  分区淡彩平涂，微侧角度，背景留白。主体可以是真人、宠物，也可以是玩偶或卡通形象。
  在用户要求头像、线稿、插画头像、微信头像、profile picture，
  或附上照片要做成头像时使用。没有参考图就先请用户上传。
  用 TypeScript 核对参考图并输出生图方案，再调用生图。
---

# 干净线稿插画头像

只做这一种风格。黑线勾轮廓，外轮廓更粗，五官和细节用细线。上色是分区淡彩平涂，颜色取自参考图，不要一种颜色盖满全图。背景留白。不是写实照片。

主体由参考图决定，不要问用户，也不要把主体换成别的东西。小猪就画小猪，不要画成人；人就画人，不要画成动物。

| 参考图里是 | `--subject` |
| --- | --- |
| 真人 | `person` |
| 猫、狗等真实动物 | `animal` |
| 玩偶、毛绒、手办、卡通形象 | `character` |

真人默认是放松的微笑，并排除 Q 版大头；动物和玩偶保留参考图里原本的表情和比例。

角度由这次出图来定，不要问用户。看参考图哪一侧脸更清楚（没被头发或东西挡住、眼镜没反光、五官完整），让那半边脸朝向镜头：头转向**另一侧**，眼睛看回镜头，头朝向的一侧留白。不要正面证件照，也不要全侧脸。

| 参考图情况 | `--angle` |
| --- | --- |
| 两侧差不多清楚 | `turn-left` |
| 画面左侧略清楚 | `turn-right` |
| 画面右侧略清楚 | `turn-left` |
| 画面左侧明显更好，右侧被挡、糊掉或反光 | `three-quarter-right` |
| 画面右侧明显更好，左侧被挡、糊掉或反光 | `three-quarter-left` |

长相以用户上传的参考图为准。没有参考图就停下来，请用户上传一张正面、光线清楚的照片，不要编造五官，也不要生图。

## 步骤

1. 找到用户这次附上的照片路径。没附照片就请用户上传，到此为止。
2. 看参考图判定主体，写入 `--subject`。
3. 看参考图选定角度，写入 `--angle`。不要问用户选哪边。
4. 补充描述只记录用户明确说过的内容（衣服、发型、颜色），译成英文短句。没说就不要加 `--notes`，也不要编脸。
5. 在本 skill 目录执行。不需要安装 npm 包，本机 Node 直接跑 TypeScript。

```bash
node src/cli.ts --reference "<参考图绝对路径>" --subject "<person、animal 或 character>" --angle "<turn-left、turn-right、three-quarter-left 或 three-quarter-right>" --notes "<英文短句，可省略>"
```

角度按上面的表选。用户指定了表情时再加 `--expression "<眼睛和嘴的英文短句>"`。

6. 脚本失败时，把 stderr 里的原话告诉用户，不要生图。
7. 脚本成功后，用当前 agent 的生图能力出图。方案原样传入，不要改写：
   - 提示词用 `prompt`
   - 画幅用 `imageRequest.aspectRatio`（1:1）
   - 负面提示用 `imageRequest.negativePrompt`。生图工具没有负面提示参数时，在 `prompt` 末尾接上 `, avoid: ` 和它的内容
   - 参考图用 `imageRequest.referenceImagePaths`
8. 回复里说明这是线稿插画头像，脸来自参考图，并说明头转向哪一侧。不要把图片再贴成 Markdown。

## 示例

小猪是玩偶，用 `--subject character`；两侧差不多清楚，用 `turn-left`。原图在 [examples/pig/before.png](examples/pig/before.png)，生成结果在 [examples/pig/after.png](examples/pig/after.png)。

## 代码

从 `src/cli.ts` 读起，顺着一次出图往下看。

| 文件 | 做什么 |
| --- | --- |
| `src/cli.ts` | 命令入口。核对参考图，把方案 JSON 打到标准输出 |
| `src/parse-args.ts` | 读取 `--reference`、`--subject`、`--angle`、`--notes`、`--expression` |
| `src/subject.ts` | 三种主体，各自的主语、配色、默认表情和负面提示 |
| `src/read-reference-image.ts` | 确认参考图已上传，并核对 JPEG、PNG、WebP |
| `src/portrait-angle.ts` | 四种角度（微侧、三分之四侧），以及朝向那一侧的留白 |
| `src/line-illustration.ts` | 线稿插画的固定线条和上色，不含主体专属描述 |
| `src/build-avatar-plan.ts` | 把参考图、角度和风格合成生图方案 |
| `src/types.ts` | 请求、参考图、方案的类型 |
| `src/input-error.ts` | 参考图缺失或不合格。把 message 原样告诉用户 |
| `src/index.ts` | 把上面的能力导出给命令入口 |
