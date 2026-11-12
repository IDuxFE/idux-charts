# Chart performance baseline

Run `pnpm benchmark:charts` after installing the Chromium browser with `pnpm exec playwright install chromium`.

The benchmark builds a production fixture and renders a 960 × 480 px chart in headless Chromium with the SVG renderer and animation disabled. Both workloads use three series and initially show the last 25% of the category axis. The striped stacked area includes a series with isolated and consecutive gaps. Each run mounts the chart, replaces the series values, and dispatches a zoom action. Input generation is outside the timed section. Measurements include the Vue update and two animation frames, so an update completed within the frame budget typically measures around 33 ms at 60 Hz. The script discards one warm-up and reports p50 and p95 for 24 measurements per workload.

Reference run on 2026-11-12 using Chromium 156.0.8078.4, macOS 15.8.3, and an Intel Core i5-9600K. Point counts are per series. Durations are in milliseconds and shown as p50 / p95.

| Workload               | Points |   First frame |     Refresh |        Zoom |
| ---------------------- | -----: | ------------: | ----------: | ----------: |
| Line                   |  1,000 |   33.1 / 34.5 | 32.9 / 34.6 | 33.0 / 34.1 |
| Stacked area with gaps |  1,000 |   33.4 / 35.3 | 33.3 / 35.3 | 33.5 / 35.3 |
| Line                   | 10,000 |   66.6 / 83.0 | 49.0 / 50.5 | 33.8 / 34.3 |
| Stacked area with gaps | 10,000 | 100.0 / 115.1 | 50.2 / 66.3 | 32.9 / 34.4 |

Compare runs on the same machine and browser with similar system load. Use repeated runs to confirm changes in the tail latencies before attributing them to a code change.
