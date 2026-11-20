# Demo map data

These GeoJSON files are local demo assets, excluded from the published chart library. Each Vue demo imports and registers its maps; no runtime download is required.

## World map

- File: [world.json](./world.json).
- Source: [Apache ECharts example data](https://echarts.apache.org/examples/data/asset/geo/world.json).
- The local JSON matches this source and contains 217 regions. It uses uncompressed longitude/latitude coordinates with CRS84 metadata.
- Region names come from `properties.name`. The status and density demos use `geo.nameMap` to translate the names needed by their sample data; the source geometry and names are preserved.

## China map

- File: [china.json](./china.json).
- Source: [ECharts 3.8.5 china.json](https://raw.githubusercontent.com/apache/echarts/3.8.5/map/json/china.json).
- This file uses `UTF8Encoding`; ECharts decodes the compressed coordinates during registration.
- Source release license: BSD 3-Clause License, Copyright (c) 2017, Baidu Inc.
- [Upstream license](https://raw.githubusercontent.com/apache/echarts/3.8.5/LICENSE).
- [Distributed China map license](../../../../public/china-map-data-LICENSE.txt).

The ECharts 3.8.5 attribution and license above apply to the China map source. The world map download source is recorded separately above. Geographic boundaries reflect the respective source datasets.
