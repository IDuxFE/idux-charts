# Visual test font

`ChartVisualCJK.otf` is a renamed subset of Noto Sans CJK SC Regular (Sans 2.004), licensed under the SIL Open Font License in `OFL.txt`. The source URL and SHA-256 are recorded in `manifest.json`.

Only the real-demo screenshot fixture loads this font. It uses the public chart and plot theme providers to fix text metrics across macOS installations. Published components and the documentation site retain their default font behavior; the existing D-DIN numeric demo font is preserved.

To regenerate, download the source OTF from the pinned URL, then run from the repository root:

```sh
uv run --with fonttools==4.68.0 python e2e/fixture/fonts/subset.py /path/to/NotoSansCJKsc-Regular.otf
```

The subset includes supported characters from documentation examples and chart sources, plus ASCII and the CJK height-measurement character used by ZRender. Review regenerated snapshots in all three browsers.
