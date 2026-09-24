# 线稿插画头像

上传一张参考图，生成正方形干净线稿头像：黑线勾轮廓，线有粗细，只上一层淡彩，背景留白。头微微侧向更清楚的一侧，不做成正面证件照。

这个目录就是 skill。任何 agent 都读根目录的 [SKILL.md](SKILL.md)，不放进某一个编辑器的私有目录。

## 小猪

参考图两侧脸差不多清楚，所以用 `turn-left`：头转向画面左侧，左侧留白。

| 参考图 | 生成的头像 |
| --- | --- |
| ![小猪参考图](examples/pig/before.png) | ![小猪线稿头像](examples/pig/after.png) |

## 使用

在这个目录执行。第一次先 `npm install`。

```bash
npm run plan -- --reference "<参考图绝对路径>" --angle "<turn-left 或 turn-right>"
```

没有参考图就先上传，再按 `SKILL.md` 里的步骤生图。
