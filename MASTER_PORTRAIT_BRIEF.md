# Master Portrait Brief

## Status

This is a production brief for approval. No image has been generated and no image asset has been added to the application.

The brief extends the approved direction in `VISUAL_BIBLE.md` and `ASSET_MANIFEST.md`. It does not introduce a new visual style.

## 1. Definitive appearance of Dorian Gray

### Identity lock

- **Age:** approximately 20–22; clearly a young adult, not an adolescent. Wilde's opening chapter describes Dorian as a young man who is already over twenty.
- **Face:** exceptionally beautiful, harmonious and delicate rather than rugged; fine oval face, smooth forehead, graceful mouth, high but soft cheekbones, clear jawline, naturally balanced features.
- **Complexion:** luminous warm ivory with a restrained rose undertone. The skin must read as living flesh, not porcelain, plastic or an unnaturally airbrushed beauty.
- **Eyes:** pale blue-grey, clear and observant. This is a controlled production choice for asset continuity; it is not based on a film actor.
- **Hair:** dark brown to near-black, soft natural waves, loose side part, medium length, carefully groomed but not sculpted into a modern hairstyle.
- **Expression:** calm, open and almost innocent, with a trace of curiosity. There is no cruelty, exhaustion, arrogance or supernatural knowledge in the master state.
- **Build:** slender young gentleman, graceful posture, natural proportions; neither muscular hero nor fragile fantasy prince.
- **Clothing:** late-Victorian young gentleman's dress: deep charcoal-black frock coat, ivory shirt with a high collar, muted wine-burgundy cravat, dark waistcoat, subtle antique-gold watch chain. No modern tailoring, jewellery excess or theatrical costume.
- **Pose:** full-length, standing upright in a restrained three-quarter pose. The shoulders are relaxed; the head turns slightly towards the viewer. One hand rests lightly on the back of a carved wooden chair, the other hangs naturally. The pose must remain easy to reproduce across later portrait edits.

### Literary basis

The design follows Wilde's emphasis on extraordinary beauty, youthful grace, the harmony of soul and body, and the contrast between Dorian's living appearance and the portrait's moral burden. The source text does not prescribe a modern celebrity-like face, a film costume or a single canonical hairstyle, so those details are treated as controlled production choices rather than claims about a specific adaptation.

Primary reference: [The Picture of Dorian Gray (1891), Chapter I](https://en.wikisource.org/wiki/The_Picture_of_Dorian_Gray_(1891)/Chapter_1).

## 2. Master image specification

| Parameter | Specification |
| --- | --- |
| Asset role | canonical identity reference for all future portrait variants |
| Composition | vertical 4:5, full-length figure, centred with a slight rightward bias |
| Recommended output | 1600 × 2000 px minimum; preferably generate at the highest stable resolution and export a 1600 × 2000 master |
| File name | `portrait-dorian-stage-0.webp` |
| Medium | classical oil painting on canvas, visible but controlled brushwork |
| Setting | Basil Hallward's Victorian studio, simplified and subordinate to the figure |
| Lighting | warm candlelight from the left/front, cool dusk entering from a tall window, soft chiaroscuro |
| Palette | warm ivory, rose, charcoal, muted plum, deep brown, antique gold and a restrained dried-wine accent |
| Variant safety | keep face, hairline, clothing, pose, camera distance, crop and background landmarks fixed |
| Text policy | no text, lettering, signature, watermark, logo or frame label inside the image |

The face, shoulders and hands must remain inside a central safe area so that the 4:5 asset can be displayed in the portrait panel and cropped conservatively on smaller screens. Avoid an extreme close-up: the master must preserve costume and pose information for later edits.

## 3. Complete GPT Image prompt

Use the following as a standalone prompt. Do not append a film actor, character celebrity or franchise reference.

```text
Create a single vertical 4:5 portrait painting of Dorian Gray, an exceptionally beautiful young English gentleman aged approximately 20–22 in late-Victorian London. He is a clearly adult young man, not an adolescent. He has a harmonious delicate oval face, smooth forehead, softly defined cheekbones, a graceful mouth, luminous warm ivory skin with subtle rose undertones, pale blue-grey eyes, and dark brown to near-black softly wavy hair with a natural side part. His expression is calm, open, observant and almost innocent, with a trace of curiosity; he is not smiling broadly and he does not look cruel, exhausted, arrogant or supernatural.

Show him full length in a restrained three-quarter standing pose, centred with a slight rightward bias. His shoulders are relaxed, his head turns slightly towards the viewer, one hand rests lightly on the back of a carved wooden chair, and the other hangs naturally. Dress him in accurate late-Victorian young-gentleman clothing: a deep charcoal-black frock coat, ivory high-collared shirt, muted wine-burgundy cravat, dark waistcoat, and a subtle antique-gold watch chain. Keep the outfit elegant, simple and reproducible across future edits.

Set the portrait in a quiet Victorian artist's studio associated with Basil Hallward: a subdued dark wooden interior, a tall window with a suggestion of a London garden, a restrained easel or covered canvas in the background, and very little visual clutter. Use warm candlelight from the left and cool blue-violet dusk from the window, creating soft classical chiaroscuro while keeping the face, eyes, hands and clothing clearly readable. Use a controlled palette of warm ivory, rose, charcoal, deep brown, muted plum, antique gold and a restrained dried-wine accent.

Render it as a realistic classical oil painting on canvas with tactile brushwork, layered pigments, natural skin, subtle fabric texture and the quiet psychological atmosphere of Victorian Gothic and Dark Academia. The image should feel like an elegant literary portrait, not a fantasy illustration, not a modern fashion photograph, and not a horror poster. Preserve exact identity landmarks for future image edits: the same face, hairline, pale blue-grey eyes, clothing, pose, lighting direction, camera distance, 4:5 composition and studio background. The master state is untouched: no ageing, wrinkles, scars, cracks, blood, injury, cruelty, distorted anatomy, supernatural glow, demonic features or visible change in the painting.

No text, no title, no lettering, no signature, no watermark, no logo, no border label, no modern objects, no electric lights, no cinematic actor likeness, no recognizable film adaptation, no anime, no comic-book style, no 3D render, no glossy digital airbrushing, no exaggerated fantasy effects.
```

## 4. Chapter I portrait states

The current engine stores a numeric `Portrait` value from 0 to 3 and the UI derives an image stage:

```text
Portrait value 0  -> stage 0
Portrait value 1  -> stage 1
Portrait value 2–3 -> stage 2
```

The number is a gameplay state, not an image-edit instruction. The asset stage is a visual threshold. All three images must be generated as controlled variations of the same master image, ideally through image editing or reference-based variation with the master portrait retained as the identity anchor.

### Stage 0 — `portrait-dorian-stage-0.webp`

**Untouched surface**

- exact master portrait;
- clear youthful skin and calm expression;
- clean mouth, eyes and forehead;
- stable candlelight and studio background;
- no crack, scar, wrinkle, red mark or supernatural glow.

This is the reference image. It establishes identity, costume, pose and composition.

### Stage 1 — `portrait-dorian-stage-1.webp`

**A troubling detail**

- preserve at least 95% of the master image unchanged;
- introduce only one very small, ambiguous disturbance: a slight tension at one corner of the painted mouth or a barely colder shadow beneath one eye;
- keep the skin youthful and smooth;
- allow a subtle loss of warmth in the surrounding paint, not a dramatic colour shift;
- the viewer should be able to dismiss the change as brushwork or a change of light;
- no ageing, wrinkles, scars, damage, blood or grotesque expression.

Stage 1 should communicate that the portrait is beginning to carry psychological pressure, not that Dorian has visibly aged.

### Stage 2 — `portrait-dorian-stage-2.webp`

**The painted warning**

- preserve the same identity, face shape, hair, clothing, pose, camera distance and studio landmarks;
- make the disturbance readable but still restrained: a faint, unnatural line near the painted mouth, a slight asymmetry in the expression, and a cooler shadow gathering around the eyes;
- keep Dorian's living face young and physically intact;
- increase the dried-wine and plum tension only locally in the paint, without a red horror effect;
- retain the impression of a classical painting that might still be explained as a flaw or a warning;
- no dramatic ageing, sagging skin, severe wrinkles, monstrous transformation, blood, wounds, cracks across the canvas or extreme cruelty.

Stage 2 is the strongest image in Chapter I, but it must remain a foreshadowing asset. The large-scale consequences belong to later chapters.

## 5. Six-chapter escalation rule

The visual progression should move from psychological unease to visible moral history, never jump directly to grotesque horror:

```text
Chapter I  subtle disturbance in expression and light
Chapter II first unmistakable emotional mark, still youthful
Chapter III visible signs of ageing or moral damage begin
Chapter IV accumulated stains, fatigue and loss of harmony
Chapter V severe corruption while identity remains recognisable
Chapter VI final transformation, reserved for the approved ending
```

Every later state must be judged against the stage-0 master. Changes must be causal, cumulative and legible, while the living Dorian remains visually consistent with the portrait's original identity.

## 6. Exact future file names

### Required for Chapter I

- `portrait-dorian-stage-0.webp` — master portrait;
- `portrait-dorian-stage-1.webp` — first troubling detail;
- `portrait-dorian-stage-2.webp` — restrained painted warning.

### Reserved for later chapters

- `portrait-dorian-stage-3.webp`;
- `portrait-dorian-stage-4.webp`;
- `portrait-dorian-stage-5.webp`;
- `portrait-dorian-stage-final.webp`.

Do not rename the Chapter I files or add a file suffix tied to a particular image generator. The game should refer to the stable asset paths in `STORY_DATA.assets.portraitStages`.

## 7. Technical alignment notes

1. **Image stage thresholds:** `ASSET_MANIFEST.md` describes stage 1 as following acceptance of Henry's influence and stage 2 as following an intense look at the portrait. In the actual engine, stage 1 means `portrait === 1` and stage 2 means `portrait >= 2`; several different choice combinations can therefore produce the same visual stage. The brief above follows the implementation and treats stages as thresholds.
2. **Displayed aspect ratio — resolved in Milestone 1C.1:** the portrait panel and title-screen portrait now enforce a 4:5 box and use `object-fit: contain`, so a correctly prepared master image is not unintentionally cropped.
3. **Two portrait renderers — resolved in Milestone 1C.1:** both the story portrait panel and the title-screen portrait read the same `STORY_DATA.assets.portraitStages` mapping and keep their CSS fallback when a slot is `null` or an image fails to load.
4. **Typography — resolved in Milestone 1C.1:** the implementation now uses the available system `Georgia` stack with `Times New Roman` fallback. No external font request or runtime dependency is introduced.

The numeric portrait thresholds are unchanged. This milestone changes only technical presentation and asset-loading alignment; it does not change the story, choice effects or chapter structure.
