# Demo map data

English | [简体中文](README.zh.md)

[Documentation and interactive examples](https://iduxfe.github.io/geo-areas/).

The site imports GeoJSON from `@idux/geo-areas`, a site-only dependency. Map data is excluded from the published chart library. Each Vue demo registers the imported maps synchronously; no runtime geographic-data service is required.

## World map

- Import: `@idux/geo-areas/geojson/world.json`.
- The package provides 217 regions with Chinese `properties.name`, bilingual `properties.names` and the original `properties.sourceName`.
- Status and density sample data match the Chinese region names directly.
- Source: Apache ECharts world map, normalized by `@idux/geo-areas`.
- [Distributed Apache-2.0 license](../../../../public/world-map-data-LICENSE.txt) and [NOTICE](../../../../public/world-map-data-NOTICE.txt).

## China map

- Import: `@idux/geo-areas/geojson/china.json` (alias of `CN-provinces.json`).
- The package provides 34 province-level regions with full Chinese names such as `北京市` and `广东省`, matching the sample data.
- Source: ECharts 3.8.5 China map, decoded to standard GeoJSON by `@idux/geo-areas`.
- [Distributed BSD 3-Clause license](../../../../public/china-map-data-LICENSE.txt).

The drill-down demo loads regional boundaries with `loadGeoJSON(adcode)` and extracts district outlines from parent maps. See the [package documentation](https://iduxfe.github.io/geo-areas/) for the sources, coverage and terms of these additional boundaries.

Data versions, upstream sources, transformations and coverage are maintained by [@idux/geo-areas](https://github.com/IDuxFE/geo-areas). Its package includes the source manifest and third-party licenses. The copies under `public/` preserve the map attributions in the built site.
