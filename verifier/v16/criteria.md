# v16 — Snow page: section removals + two-video field section

Client direction:

1. Remove the "What we handle / One crew for the whole storm" block (chips,
   Storm Response paragraph, industry chips, See How We Work link) from the
   snow page only.
2. Remove the dark "Winter operations / Planned before the storm, documented
   after it" section (Pre-Storm Protocol™, 24/7 Direct Line™).
3. Add the second real winter-operations video (20260118_190634(1).mp4 — night
   crew shoveling a hotel-entrance walk) and design the "In the field" section
   around BOTH videos as a balanced desktop composition; raw field character —
   no mockups, no over-styling; concise copy; natural stacking on mobile.
4. Performance: posters for instant paint, preload="metadata", web-optimized
   encoding (H.264 yuv420p faststart, no audio), sane file sizes.
5. No unrelated changes elsewhere on the page.

## Criteria

1. "What we handle" / "One crew for the whole storm" absent from snow page.
2. "Winter operations" / "Planned before the storm" / "Pre-Storm Protocol"
   absent from snow page; ProgramExplainer import removed.
3. Two videos side by side, equal size, balanced; stack on mobile.
4. Both videos: poster set, preload="metadata", muted autoplay loop,
   playsInline, controls; captions present.
5. Video 2 encoded H.264 yuv420p faststart, portrait after autorotation,
   file ≤ ~4 MB (source was 33 MB).
6. Playback verified in H.264-capable chromium: readyState 4, playing.
7. Three-step strip, plow photos, and the rest of the page unchanged;
   0 overflow / 0 broken on desktop 1440, tablet 834, mobile 390.
8. Regression: commercial-landscaping and hardscape-design keep their
   "What we handle" blocks; 0 overflow / 0 broken.
