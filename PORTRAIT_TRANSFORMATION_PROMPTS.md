# Dorian Gray Portrait Transformation Prompts

Preparation document for Chapter I portrait variants. This document defines image-editing instructions only. It does not generate, add, or modify any image asset.

## Canonical reference and current visual verification

Use this file as the sole canonical visual reference for both edits:

`assets/portraits/portrait-dorian-MASTER.png`

The master PNG must remain unchanged. The currently integrated Chapter I asset is:

`assets/portraits/portrait-dorian-stage-0.webp`

Visual inspection confirms that the integrated stage-0 image follows the master composition: a full-length young Dorian in a restrained three-quarter pose, with his right hand resting on the carved chair and his other hand hanging naturally; dark softly wavy hair; a charcoal Victorian suit, dark waistcoat, ivory shirt, burgundy cravat and antique-gold watch chain; a covered canvas and studio objects to the left; a tall dusk-lit window and chair to the right; warm candlelight from the left and cooler evening light from the right. The face is youthful, calm and open. These identity and composition landmarks are locked for both transformations.

The source files are portrait-oriented and effectively 4:5. The final exports must use an exact 4:5 canvas whenever the image tool offers an export-size choice; do not crop away the head, hands, feet, chair, window, or the main studio landmarks.

## Stage 1 — A Troubling Detail

### Output

`assets/portraits/portrait-dorian-stage-1.webp`

### Complete GPT Image edit prompt

```text
Edit the supplied reference image, using the original file `portrait-dorian-MASTER.png` as the identity and composition anchor. Do not generate a new Dorian from text alone.

Create a single restrained variation of this exact portrait painting. Preserve the same young adult Dorian Gray, the same face, facial proportions, eye shape and colour, hairline, dark softly wavy hair, skin tone, expression identity, clothing, cravat, waistcoat, watch chain, hands, body proportions, three-quarter standing pose, hand resting on the carved chair, camera distance, full-length framing, 4:5 composition, studio background, covered canvas, chair, window, city garden, candle placement, brushwork, palette and lighting direction. Preserve the warm candlelight from the left/front and the cooler dusk light from the window on the right. Keep every object and landmark in the same position.

Introduce only one almost imperceptible psychological disturbance: either a very slight tension at one corner of the painted mouth or an almost unnoticeable cooler shadow beneath one eye. Choose one disturbance, not both. It must be subtle enough that a viewer can reasonably doubt whether the painting has changed at all. Keep the mouth natural and the eyes clear. Preserve the youthful, smooth skin and the calm literary atmosphere. Any change must look like a minute shift in expression or paint, not a new character or a damaged canvas.

The result must remain an elegant realistic classical oil painting on canvas in the established Victorian Gothic and Dark Academia style. Keep the colour change, if any, local and restrained. Maintain natural skin, controlled brushwork, readable fabric texture and the original warm ivory, rose, charcoal, deep brown, muted plum, antique-gold and dried-wine palette.

Do not age Dorian. Do not add wrinkles, sagging skin, grey hair, scars, scratches, cracks, blood, wounds, bruises, decay, tears, dirt, grotesque distortion, supernatural glow, demonic features, horror makeup, a threatening grin, exaggerated asymmetry, dramatic colour grading, or any other horror effect. Do not alter the face identity, hairstyle, costume, pose, anatomy, crop, background, objects, camera angle or light direction. Do not add text, lettering, signature, watermark, logo, border or frame label. Do not introduce a modern object, modern clothing, electric light, celebrity likeness, film adaptation likeness, anime, comic-book style, 3D rendering or glossy digital airbrushing.

Export the edited image as `portrait-dorian-stage-1.webp` with an exact 4:5 aspect ratio and the same framing as the supplied reference. This is Chapter I's first ambiguous warning: the image should make the viewer wonder whether anything truly changed.
```

## Stage 2 — The Painted Warning

### Output

`assets/portraits/portrait-dorian-stage-2.webp`

### Complete GPT Image edit prompt

```text
Edit the supplied reference image, using the original file `portrait-dorian-MASTER.png` as the identity and composition anchor. Do not generate a new Dorian from text alone, and do not use a separately generated Stage 1 image as the source.

Create a controlled Chapter I variation of this exact portrait painting. Preserve the same young adult Dorian Gray and the same identity landmarks: identical face shape, facial proportions, pale blue-grey eyes, youthful warm-ivory complexion, hairline, dark softly wavy hair, clothing, ivory high collar, burgundy cravat, dark waistcoat, antique-gold watch chain, hands, body proportions, three-quarter standing pose, hand resting on the carved chair, camera distance, full-length framing and exact 4:5 composition. Preserve the same Victorian artist's studio, covered canvas, candles, books, bust, chair, tall window, dusk city garden, canvas texture, brushwork, palette and object placement. Preserve the warm candlelight from the left/front and the cool evening light entering from the right.

Make the change visually distinguishable from Stage 1 but still restrained and appropriate to the first chapter. Add a clearer yet delicate asymmetry to the painted mouth: one corner is subtly tighter or lower than the other, without becoming a smile, sneer or grimace. Add cooler, slightly deeper shadows around the eyes, while keeping the eyes themselves natural and the face youthful and physically intact. The result should feel lightly unsettling, as if the painting is carrying a warning that could still be explained as a shift in light, brushwork or expression. Keep the disturbance local to the expression and eye shadows; do not redesign the portrait or change the scene.

The result must remain an elegant realistic classical oil painting on canvas in the established Victorian Gothic and Dark Academia style. Keep the psychological tension quiet and literary. Use only a restrained increase of cool blue-violet shadow around the eyes and, if needed, a very local muted plum or dried-wine tension near the mouth. Do not turn the palette red and do not create a horror effect. Preserve tactile brushwork, natural skin and readable Victorian fabric.

Do not add dramatic ageing, wrinkles, sagging skin, grey hair, scars, scratches, cracks across the canvas, blood, wounds, bruises, decay, tears, dirt, grotesque transformation, monstrous anatomy, demonic features, supernatural glow, horror makeup, extreme cruelty, a threatening grin or a newly invented expression. Do not alter the face identity, hairstyle, costume, pose, anatomy, crop, background landmarks, camera angle, lighting direction or image proportions. Do not add text, lettering, signature, watermark, logo, border or frame label. Do not introduce a modern object, modern clothing, electric light, celebrity likeness, film adaptation likeness, anime, comic-book style, 3D rendering or glossy digital airbrushing.

Export the edited image as `portrait-dorian-stage-2.webp` with an exact 4:5 aspect ratio and the same framing as the supplied reference. Stage 2 must be visibly stronger than Stage 1, but it remains a restrained painted warning in Chapter I, not an aged or grotesquely transformed Dorian.
```

## Exact reference-image instructions

1. Start a new image-edit operation, not a text-to-image generation.
2. Attach `assets/portraits/portrait-dorian-MASTER.png` as the image input/reference for Stage 1.
3. Attach the same unchanged master PNG as the image input/reference for Stage 2. Do not chain Stage 2 from the Stage 1 output; this keeps both variants anchored to the same canonical identity and prevents drift.
4. Use the complete prompt for the requested stage exactly as written. The prompt's instruction to preserve the reference has priority over any generic variation setting.
5. If the tool exposes image-strength, reference-strength or edit-region controls, use the strongest available identity/reference preservation and the smallest edit region that includes the mouth and/or under-eye area. Do not mask or redraw the hair, clothing, hands, chair, window or background.
6. Keep the original framing and do not allow automatic reframing, outpainting, portrait relighting, face replacement, beautification, age variation or style transfer.
7. Export only the approved result as WebP. Keep the original PNG as the untouched reference and do not overwrite it.

## Visual consistency checks before accepting an output

Reject the output and repeat the edit if any check fails.

### Identity and anatomy

- Dorian is recognisably the same person as in the master; the face shape, eyes, nose, mouth structure, hairline and hair remain stable.
- He remains a clearly adult young man with youthful, smooth skin.
- Hands, fingers, limbs and body proportions are anatomically stable.

### Composition and scene

- The image remains 4:5 and full-length, with the same camera distance and crop.
- The three-quarter pose and hand on the carved chair are unchanged.
- The covered canvas, candle group, studio furniture, chair and tall window remain in their original positions.
- The warm-left / cool-right lighting direction is preserved.

### Clothing and medium

- The frock coat, ivory shirt, burgundy cravat, waistcoat and gold watch chain are unchanged.
- The work remains a classical oil painting on canvas with the same controlled brushwork and material texture.
- No modern, glossy, photorealistic, anime, comic-book or 3D rendering artifacts appear.

### Narrative delta

- Stage 1 changes one small expression or shadow detail only. It should be genuinely ambiguous.
- Stage 2 has a clearer mouth asymmetry and cooler eye shadows than Stage 1, but remains subtle and literary.
- Neither stage includes ageing, scars, blood, wounds, cracks, grotesque transformation or supernatural spectacle.
- Stage 2 is visibly stronger than Stage 1 while still remaining a Chapter I warning rather than a later-chapter transformation.

### Technical and asset checks

- The output is a valid WebP at an exact 4:5 aspect ratio; target export is 1600 × 2000 px when supported.
- The image contains no text, title, signature, watermark, logo or frame label.
- The output filename is exactly `portrait-dorian-stage-1.webp` or `portrait-dorian-stage-2.webp`.
- The master PNG has not been modified, renamed or replaced.
- The final file is local and static; it does not depend on a runtime image-generation service or a remote URL.

## Recommended names and formats

Use the stable Chapter I names below. Do not append a generator name, date, seed or temporary suffix.

| Role | File | Format | Aspect ratio | Target size |
| --- | --- | --- | --- | --- |
| Canonical reference, unchanged | `assets/portraits/portrait-dorian-MASTER.png` | PNG | source portrait framing, effectively 4:5 | keep unchanged |
| Stage 0, currently integrated | `assets/portraits/portrait-dorian-stage-0.webp` | WebP | 4:5 | 1600 × 2000 px target |
| Stage 1, A Troubling Detail | `assets/portraits/portrait-dorian-stage-1.webp` | WebP | 4:5 | 1600 × 2000 px target |
| Stage 2, The Painted Warning | `assets/portraits/portrait-dorian-stage-2.webp` | WebP | 4:5 | 1600 × 2000 px target |

Reserved later-stage names remain `portrait-dorian-stage-3.webp`, `portrait-dorian-stage-4.webp`, `portrait-dorian-stage-5.webp` and `portrait-dorian-stage-final.webp`. They are outside this milestone and must not be created here.

## Later integration procedure

Integration is intentionally not performed in this milestone. After both images pass the checks above:

1. Copy the two local WebP files into `assets/portraits/` without changing their names.
2. Verify that each file is readable, local, static and exactly 4:5 before editing application data.
3. In `js/story-data.js`, replace only the two prepared `null` values in `STORY_DATA.assets.portraitStages`:

   ```js
   portraitStages: {
     0: "assets/portraits/portrait-dorian-stage-0.webp",
     1: "assets/portraits/portrait-dorian-stage-1.webp",
     2: "assets/portraits/portrait-dorian-stage-2.webp"
   }
   ```

4. Do not change `portraitStageForValue`, any numeric threshold, choice effects, scene text, chapter data or the fallback behavior.
5. Run the existing engine tests and perform visual QA on the title screen and story screen. Confirm that `Portrait === 1` shows Stage 1 and `Portrait >= 2` shows Stage 2, while `Portrait === 0` still shows Stage 0.
6. Check desktop and narrow mobile layouts for the 4:5 image box, readable alt text and absence of unintended cropping or overflow.
7. Keep the master PNG unchanged and review the final file list before any separately authorized release action.

This milestone stops before image generation and before application integration.
