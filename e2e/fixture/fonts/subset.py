"""Regenerate the test-only CJK font with fonttools==4.68.0 (see README.md)."""

import hashlib
import json
import sys
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

directory = Path(__file__).resolve().parent
root = directory.parents[2]
source = Path(sys.argv[1])
source_sha256 = hashlib.sha256(source.read_bytes()).hexdigest()
if source_sha256 != "2c76254f6fc379fddfce0a7e84fb5385bb135d3e399294f6eeb6680d0365b74b":
    raise ValueError("Expected the pinned Noto Sans CJK SC Regular Sans2.004 source")
characters = set(chr(code) for code in range(32, 127)) | set("国…–—℃％")
for package in ("site", "core", "plots"):
    for path in (root / "packages" / package).rglob("*"):
        if path.suffix not in (".vue", ".ts", ".json") or any(
            part in ("node_modules", "dist", ".archive", "__tests__") for part in path.parts
        ):
            continue
        characters.update(path.read_text())
font = TTFont(source, recalcTimestamp=False)
characters.intersection_update(chr(code) for code in font.getBestCmap())
options = subset.Options()
options.recalc_timestamp = False
subsetter = subset.Subsetter(options=options)
subsetter.populate(text="".join(sorted(characters)))
subsetter.subset(font)
names = {
    1: "ChartVisualCJK",
    2: "Regular",
    3: "ChartVisualCJK-Regular",
    4: "ChartVisualCJK Regular",
    6: "ChartVisualCJK-Regular",
    16: "ChartVisualCJK",
    17: "Regular",
}
for record in font["name"].names:
    if record.nameID in names:
        record.string = names[record.nameID].encode(record.getEncoding())
cff = font["CFF "].cff
cff.fontNames = ["ChartVisualCJK-Regular"]
cff.topDictIndex[0].FamilyName = "ChartVisualCJK"
cff.topDictIndex[0].FullName = "ChartVisualCJK Regular"
font.save(directory / "ChartVisualCJK.otf")
(directory / "manifest.json").write_text(json.dumps({
    "family": "ChartVisualCJK",
    "source": "https://github.com/notofonts/noto-cjk/blob/Sans2.004/Sans/OTF/SimplifiedChinese/NotoSansCJKsc-Regular.otf",
    "sourceSha256": source_sha256,
    "characters": "".join(sorted(characters)),
}, ensure_ascii=False, indent=2) + "\n")
