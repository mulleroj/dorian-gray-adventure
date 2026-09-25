# Visual assets

The application uses local, static WebP files at runtime and has no external image or image-generation dependency. Current runtime assets are listed in [ASSET_MANIFEST.md](../ASSET_MANIFEST.md).

- `portraits/portrait-dorian-stage-0.webp`, `portrait-dorian-stage-1.webp`, `portrait-dorian-stage-2.webp`
- `portraits/character-sibyl-vane-stage.webp`, `character-sibyl-vane-offstage.webp`
- `locations/location-theatre-stage.webp`, `location-theatre-backstage.webp`

Approved Master PNGs are reference-only inputs for future image-edit workflows and are not loaded by the runtime UI. Candidate PNGs and audit comparison images remain local working material and are excluded from the baseline repository.

Images should preserve their approved composition, identity, proportions, and visual style. Missing runtime images must continue to fall back safely in the UI. No image-generation service is called by the running application.
