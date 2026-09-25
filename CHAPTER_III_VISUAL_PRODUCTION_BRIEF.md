# DORIAN GRAY — CHAPTER III VISUAL PRODUCTION BRIEF

## Status and scope

This is a production brief for the three approved Chapter III P0 visual assets. It is a planning document only.

This milestone deliberately does **not**:

- generate or add any image file;
- convert a PNG to WebP;
- integrate a new asset into `js/story-data.js`, the engine or the UI;
- change the existing Dorian master or Stage 0–2 assets;
- add a Chapter III scene, location hook or new story fact;
- create Chapter IV artwork;
- commit, push or deploy.

The source of truth is the current project, especially `CHAPTER_III_NARRATIVE_BLUEPRINT.md`, the implemented Chapter III in `js/story-data.js`, `VISUAL_BIBLE.md`, `MASTER_PORTRAIT_BRIEF.md`, `PORTRAIT_TRANSFORMATION_PROMPTS.md`, `ASSET_MANIFEST.md` and `CHAPTER_II_VISUAL_PRODUCTION_BRIEF.md`.

The three P0 assets are candidates for a later, separately approved production and integration milestone:

| Priority | Exact working candidate | Intended final runtime file | Role |
| --- | --- | --- | --- |
| P0 | `portrait-dorian-stage-3-candidate.png` | `portrait-dorian-stage-3.webp` | first unambiguous portrait progression after the locked-schoolroom event |
| P0 | `location-dorians-house-candidate.png` | `location-dorians-house.webp` | maintained late-Victorian house interior for the breakfast and Basil-visit scenes |
| P0 | `location-secret-room-candidate.png` | `location-secret-room.webp` | old schoolroom where the covered portrait is deliberately hidden |

The current app continues to use the Stage 3 CSS fallback. No filename above is a current runtime reference.

## 1. Current visual language

The established direction is **Victorian Gothic · Dark Academia · realistic classical oil painting · candlelight and restrained period light**. Atmosphere comes from material, composition, silence and controlled chiaroscuro rather than fantasy effects or horror spectacle.

The existing Dorian master and Stage 0–2 sequence establish the following visible language:

- classical oil paint on canvas with controlled, tactile brushwork;
- dark polished wood, old glass, carved furniture, canvas, wool, velvet and brass;
- warm ivory, charcoal, deep brown, muted plum, dried wine and antique gold;
- warm light from the left/front and cooler blue-violet light from the right or window;
- realistic Victorian objects with low visual clutter;
- literary unease expressed through small changes in light, posture, expression and negative space;
- no cinematic photorealism, glossy fantasy rendering, anime, comic-book style, 3D render or modern film-still look.

The existing Chapter II location assets confirm the same material system: dark timber, restrained gilding, wine-burgundy textiles, period gaslight and visible painted surfaces. Chapter III should feel like the same illustrated novel, not like a new game chapter with a different renderer.

The application proportions already define the technical targets:

- Dorian portrait viewer and panel: `4:5`, `object-fit: contain`;
- location scene frame: `3:2` source proportion;
- future character frame: `2:3` source proportion;
- current UI fallback remains valid whenever a new image is absent or fails to load.

## 2. Canonical Dorian identity lock

`assets/portraits/portrait-dorian-MASTER.png` is the immutable identity and composition anchor. It must be used as the edit/reference source for Stage 3. Stage 2 may be shown beside the result to judge progression, but it must not be the sole source and Stage 2 → Stage 3 must not become a chained identity workflow.

The visible master landmarks are:

- clearly adult young man, approximately 20–22;
- fine oval face, smooth forehead, soft cheekbones, clear jaw and graceful mouth;
- pale blue-grey eyes;
- dark brown to near-black softly wavy hair with a natural side part and stable hairline;
- luminous warm-ivory skin with a restrained rose undertone;
- slender young gentleman proportions;
- deep charcoal frock coat, ivory high-collared shirt, muted wine-burgundy cravat, dark waistcoat and antique-gold watch chain;
- full-length, restrained three-quarter standing pose;
- one hand resting lightly on the carved chair, the other hanging naturally;
- covered canvas and studio objects to the left, chair and tall dusk-lit window to the right;
- warm candlelight from the left/front and cooler dusk light from the right;
- same camera distance, crop, studio background and 4:5 framing.

The transformation applies only to the **painted portrait**. Living Dorian remains young and unchanged in reality. The result must never imply that a new image shows Dorian standing in the room or that the Stage 3 effect has spread to his body.

## 3. Stage 3 transformation boundary

Stage 3 is the first unmistakable progression beyond the current Stage 2 warning. It belongs immediately after the `c3-the-old-schoolroom` choice has atomically set `portraitLocation: "locked-schoolroom"` and `portraitStageUnlock: "stage-3"`.

The narrative boundary is deliberate:

- **Stage 2:** a readable warning, subtle cruelty, a wrongness that can still be explained as expression, shadow or paint;
- **Stage 3:** deliberate concealment has become a system, and the painted face begins to show sustained inward damage;
- **Stage 4+:** reserved for later chapters and must not be anticipated by this asset.

Stage 3 may show:

- the same recognisable young Dorian;
- slightly reduced harmony in the face;
- harder, more guarded areas around the eyes;
- a less open and slightly tighter mouth;
- very subtle under-eye fatigue or the first restrained sign of premature age in the painted surface;
- a watchful, inwardly cruel or self-protective expression;
- quiet evidence rather than spectacle.

Stage 3 must not show:

- an old man, visibly aged body or grey hair;
- a zombie, demon, monster or fantasy creature;
- grotesque deformation, sagging facial anatomy or a radically different face;
- blood, wounds, bruises, decay, rotting skin, tears or bodily injury;
- cracks across the canvas, supernatural glow, occult symbols or magical particles;
- a full later-novel corruption, Stage 4–5 damage or final transformation;
- any change to living Dorian outside the painted canvas.

### Stage comparison table

| State | Expression | Eyes | Mouth | Skin / age signs | Overall emotional effect | Must not appear yet |
| --- | --- | --- | --- | --- | --- | --- |
| MASTER / Stage 0 | calm, open, almost innocent, faint curiosity | clear pale blue-grey, observant but untroubled | natural and relaxed | smooth youthful skin, no age signal | harmony and promise; the portrait is beautiful before it becomes evidence | any cruelty, fatigue, warning, ageing, damage or supernatural sign |
| Stage 1 | one barely troubling shift, still plausibly neutral | at most one cooler or slightly heavier shadow | one minute tension at one corner, or no mouth change if the eye-shadow option is used | remains smooth and youthful | ambiguous unease; a viewer can doubt that the painting changed | visible ageing, strong asymmetry, scars, cracks, horror or a second major disturbance |
| Stage 2 | warning is readable but restrained; mild asymmetry | cooler shadow gathers around the eyes, eyes remain natural | clearer tightness or faint unnatural line near the mouth | still young and physically intact | the painted face seems to remember a moral pressure | Stage 3 ageing, severe cruelty, wounds, blood, grotesque transformation or supernatural effects |
| Stage 3 | guarded, watchful, inwardly cruel; harmony is reduced but identity remains stable | harder and more tired around the eyes, without glowing or dead eyes | less open, slightly compressed, no grin or grimace | first very subtle painted fatigue or premature age; no old-man transformation | deliberate concealment has become visible inward damage | accumulated stains, deep wrinkles, grey hair, facial collapse, monster imagery, blood or final corruption |

Acceptance rule: Stage 3 must be clearly worse than Stage 2 at a normal viewing size, but it must still leave visual room for later stages to become materially more damaged without needing a redesign of identity.

## 4. Chapter III environment continuity

The two location assets represent different layers of one wealthy late-Victorian London townhouse. They must share architectural DNA while carrying opposite maintenance states.

### Shared house language

Both locations should share:

- dark polished or painted wood with the same warm brown undertone;
- late-Victorian moulding, door proportions, skirting and panel details;
- modest antique-gold or aged-brass hardware used sparingly;
- high windows and believable period daylight;
- deep wine/plum accents that echo the project palette without becoming red horror lighting;
- classical oil-painting materiality and restrained chiaroscuro;
- no modern electrical fixtures, plastic, contemporary furniture, logos or readable labels.

### Dorian's house — maintained public/private living area

`location-dorians-house-candidate.png` supports `c3-morning-quiet`, Basil's breakfast visit and the transition before the portrait is carried upstairs. It should read as elegant, cultivated and private, but not royal. Use a breakfast or morning sitting room with dark polished wood, muted green, wine, plum and warm cream textiles, high windows, soft London morning light, restrained brass, books, flowers, porcelain and period breakfast objects only where they make the room believable. A fireplace is acceptable if it is architecturally natural, but it must not dominate the image.

The house should be socially legible: someone can receive a friend there. It is maintained rather than pristine, aristocratic rather than palatial, and intimate rather than theatrical.

### Secret room — old schoolroom

`location-secret-room-candidate.png` is the old schoolroom in Dorian's house. It carries childhood memory, dust and forgotten domestic history. It has now become a controlled secret space: a room made private by a key and a rule.

Include restrained, historically credible signs such as old wooden boards, dusty shelves or bookcases, covered furniture, a faded childhood object used sparingly, heavy curtain or textile, an old schoolroom table or chair, muted daylight and a visible door/lock relationship. The room should look unused rather than abandoned by disaster.

Do not turn it into a cellar, dungeon, haunted attic, occult room, torture chamber or haunted-house cliché. Its unease comes from dust, memory, control, privacy and the fact that ordinary domestic space has been made secret.

### Covered portrait decision: include option A

Include a **fully covered neutral rectangular canvas** as a secondary, non-dominant object in the secret-room asset. It should be recognisable only as an opaque covered canvas on an easel or against a wall. The cover must conceal the entire painted surface:

- no face;
- no eyes, mouth, skin or fragment of the image;
- no stage-specific mark;
- no supernatural glow or light leaking from under the cloth;
- no implication that the asset itself displays Stage 3.

This is preferable to removing the portrait entirely because the room's functional purpose is to contain the physical secret. A neutral covered canvas supports the implemented locked-room event, remains reusable for all Chapter III branches, and avoids conflict with the separate Stage 3 viewer. The composition must keep it subordinate so the location asset does not become a portrait reveal.

## 5. Exact P0 asset inventory

| Exact candidate | Scene use | Target | Focal point and safe area | Approval boundary |
| --- | --- | --- | --- | --- |
| `portrait-dorian-stage-3-candidate.png` | Stage 3 viewer/panel after the locked-schoolroom event | vertical `4:5`; native `1600 × 2000` target; PNG | Dorian remains centred with the master pose; keep head, hands, chair and window landmarks inside the same safe frame | must be a master-based edit; no runtime mapping in this milestone |
| `location-dorians-house-candidate.png` | `c3-morning-quiet`, Basil's breakfast/visit context and pre-move transition | horizontal `3:2`; native `2400 × 1600` target; PNG | breakfast/sitting-room architecture and window light are the focal structure; leave a calmer low-detail zone in the left/upper-left where future text placement can remain readable | no Dorian, Basil or Henry; no portrait face or Sibyl clue |
| `location-secret-room-candidate.png` | `c3-the-old-schoolroom`, `c3-rules-of-secrecy` and the locked-room context | horizontal `3:2`; native `2400 × 1600` target; PNG | old schoolroom doorway, shelves and covered canvas form the focal group; leave a low-detail zone in the upper-left/left midground | covered canvas is neutral and fully opaque; no Stage 3 face or supernatural clue |

No other Chapter III asset is P0. Do not add decorative images merely because the room could support them.

## 6. Optional P1 asset inventory

These are evaluated but **not approved automatically**:

| Candidate concept | Actual use | Does the P0 set already cover it? | Recommendation |
| --- | --- | --- | --- |
| covered portrait detail | A close detail for a future examine/transition moment | Yes. The neutral canvas in `location-secret-room` is sufficient for the current nine-scene spine and avoids a duplicate spoiler-sensitive asset | Defer until a separate interaction needs a dedicated crop |
| separate old-schoolroom detail | A close insert of the key, door or childhood desk | Yes. The secret-room wide asset can establish the room and the narrative already supplies the key in text | Defer; produce only if a later UI design needs a functional detail card |
| yellow-book object | A focused object image for Henry's note or a later Chapter IV bridge | Not required for current Chapter III; the book is carried by prose and the ending must remain about the contrast between book and key, not an object gallery | Defer until a later scene has a confirmed object slot |
| Basil character portrait | A standalone Basil image for a character card or future confrontation | No current Chapter III P0 scene needs a separate character asset; adding one now would create a new identity review and no current runtime hook | Defer to the next milestone with a specific Basil image slot |

No P1 candidate should be generated before a functional scene use, a defined frame, alt text and an approval decision exist.

## 7. Production prompt — Stage 3 candidate

**Working output:** `portrait-dorian-stage-3-candidate.png`
**Input:** `assets/portraits/portrait-dorian-MASTER.png` as the strict edit/reference source. Stage 1 and Stage 2 may be used only as side-by-side progression references, never as the sole identity source.
**Use case:** `identity-preserve` edit; painted narrative game portrait.

```text
Edit the supplied image `assets/portraits/portrait-dorian-MASTER.png` as the strict canonical identity and composition anchor. Create one controlled Chapter III Stage 3 variation of the existing painted portrait. Do not generate a new Dorian from text alone and do not use a Stage 2 output as the sole source or as a chained identity base.

Preserve the exact same young adult Dorian Gray: the same fine oval face, facial proportions, nose, jaw, mouth structure, pale blue-grey eyes, dark brown to near-black softly wavy hair, natural side part, stable hairline, warm-ivory complexion, body proportions, charcoal Victorian frock coat, ivory high collar, wine-burgundy cravat, dark waistcoat, antique-gold watch chain, hands, three-quarter full-length pose, one hand resting on the carved chair, other hand hanging naturally, camera distance, crop, 4:5 framing, studio background, covered canvas, chair, window, city garden, object positions and warm-left/cool-right lighting direction. Keep the same realistic classical oil-on-canvas medium and controlled brushwork.

Change only the painted portrait's psychological expression and the first restrained signs of inward damage. Make the progression unmistakably stronger than the existing Stage 2 warning but still quiet and literary: slightly reduced facial harmony; harder, more guarded shadow around the eyes; a watchful inwardly cruel expression; a slightly less open, tighter mouth; and one very subtle suggestion of painted fatigue or premature age beneath the eyes or at the mouth. The face must remain recognisably the same young Dorian, with natural eyes and intact youthful structure. The change is in the painted image, not in living Dorian and not in the surrounding studio.

Stage 3 must communicate that concealment has become deliberate and that the portrait now carries sustained inward damage. It must leave room for later Stage 4, Stage 5 and final states. Keep all ageing extremely restrained: no old-man transformation, no grey hair, no deep wrinkles and no facial collapse. Maintain the warm ivory, charcoal, deep brown, muted plum, antique-gold and restrained dried-wine palette. Use local cool blue-violet tension around the eyes and a very restrained muted wine/plum tension near the mouth only if needed. Do not turn the palette red.

Render a realistic classical oil painting on canvas with tactile but controlled brushwork, layered pigment, natural skin and believable Victorian fabric. Preserve the same quiet Victorian Gothic and Dark Academia literary atmosphere. Export a native-resolution PNG with exact 4:5 framing, target 1600 × 2000 px when supported, with no artificial upscale.

Negative constraints: no old man, adolescent, grey hair, zombie, demon, monster, fantasy creature, grotesque deformation, distorted anatomy, sagging face, deep wrinkles, severe ageing, blood, wound, bruise, decay, rotting skin, tears, horror makeup, supernatural glow, magic particles, occult symbol, crack across the canvas, broken frame, threatening grin, grimace, smile, celebrity likeness, recognisable actor or film adaptation likeness, anime, comic-book style, 3D render, glossy digital airbrushing, modern object, electric light, text, title, lettering, signature, watermark, logo, border or frame label. Do not alter the pose, clothing, hairline, hands, chair, window, background landmarks, camera angle, lighting direction or aspect ratio. Do not show a separate real Dorian; this is only the painted portrait.
```

## 8. Production brief and prompt — Dorian's house

**Working output:** `location-dorians-house-candidate.png`
**Use case:** `historical-scene` environment generation; reusable Chapter III house background.
**Target:** native horizontal `3:2`, target `2400 × 1600` px, PNG, no artificial upscale.

The room should be a breakfast or morning sitting room in a wealthy late-Victorian London townhouse. It is elegant, young and aristocratic, but not a palace. The image must be compatible with a future location frame that preserves the room's geometry and leaves text-safe negative space.

```text
Create one horizontal 3:2 environment painting for a late-Victorian wealthy London townhouse interior, used as a neutral reusable background for an English-learning literary adventure. Show an elegant breakfast or morning sitting room connected to Dorian Gray's private house: dark polished wood, restrained Victorian moulding, tall high windows, muted green, wine, plum and warm cream textiles, modest antique-gold and aged-brass details, a cultivated but private atmosphere, and soft London morning light. Include a believable period fireplace only if it remains subordinate. Add a few natural objects such as closed books, restrained flowers, porcelain or period breakfast objects, but avoid clutter and avoid making the room look staged as a catalogue.

The house is wealthy, maintained and socially readable, but it is not a royal palace, ballroom or museum. The architecture should feel like the same house that could later contain an unused old schoolroom: share the dark wood language, door proportions, moulding, brass details and restrained wine/plum palette with a future secret-room interior. Keep the room elegant and lived-in without visible people.

Composition: horizontal 3:2, native target 2400 × 1600 px, no artificial upscale. Establish a calm wide room with the principal architectural focal point and morning window light in the centre-right/right half. Keep the left and upper-left area relatively quiet and low-detail so future story text can remain readable when the image is shown beside or behind UI content. Keep important doors, windows and furniture inside a crop-safe central area; do not place a single irreplaceable object at the extreme edge. Use realistic classical oil painting on canvas, controlled brushwork, natural wood and textile texture, restrained chiaroscuro, Victorian Gothic and Dark Academia literary atmosphere.

No Dorian, no Basil, no Lord Henry, no Sibyl, no human figure, no portrait face, no visible portrait canvas, no explicit Sibyl clue, no death or relationship clue, no spoiler, no modern object, no smartphone, no electric ceiling light, no fluorescent lamp, no plastic, no contemporary furniture, no logo, no readable text, no book title, no letters, no signature, no watermark, no fantasy architecture, no magic glow, no horror effects, no anime, no comic-book style, no 3D render, no glossy digital illustration, no recognisable film adaptation or actor likeness.
```

### Dorian's house acceptance notes

- Main visual focal point: the maintained room, window light and cultivated domestic materials, not a character or object clue.
- Text-safe area: low-detail left/upper-left zone; preserve readable dark-mid values rather than bright patterned wallpaper.
- Do not make the room so grand that it contradicts the intimate breakfast visit.
- Do not include the covered portrait: the house asset is the pre-move environment and must remain reusable before the secret-room transition.

## 9. Production brief and prompt — secret room / old schoolroom

**Working output:** `location-secret-room-candidate.png`
**Use case:** `historical-scene` environment generation; reusable locked-schoolroom background.
**Target:** native horizontal `3:2`, target `2400 × 1600` px, PNG, no artificial upscale.

The room is a forgotten domestic schoolroom, not a supernatural chamber. It should feel older than the maintained rooms because it preserves childhood and has been neglected, but it remains part of the same house.

```text
Create one horizontal 3:2 environment painting of the old schoolroom inside the same wealthy late-Victorian London townhouse as the supplied Dorian's-house direction. This is a reusable neutral location asset for an English-learning literary adventure and the physical secret room in which a covered portrait is deliberately hidden.

Show an unused but structurally ordinary childhood schoolroom: old wooden floorboards, dusty dark-wood shelves or bookcases, a simple schoolroom table and chair, one or two pieces of covered furniture, a heavy curtain or aged textile, restrained faded childhood objects, muted daylight entering through a high window, and a believable door with period lock and moulding. The room should show forgotten domestic history and control, with dust on surfaces and a key-related sense of privacy, but it must remain a real room in the same house rather than a ruin.

Include one secondary, fully covered rectangular canvas on an easel or leaning safely against the wall. Use a rich but opaque neutral protective cloth that covers the entire canvas and any painted surface. Show no face, eyes, mouth, skin, painted fragment, stage mark or image through the cloth. The canvas must not be the brightest or largest focal point. It is a neutral physical container for the secret, not a portrait reveal. There is no supernatural glow, light leak or magical aura beneath the cover.

Composition: horizontal 3:2, native target 2400 × 1600 px, no artificial upscale. Make the doorway, shelves and covered canvas form a readable but restrained focal group in the centre-right or right half. Keep a calmer low-detail safe area in the left and upper-left midground for future text placement. Preserve crop-safe architectural landmarks, a clear sense of floor and wall relationship, and enough negative space that a future character could be composited without covering the room's identity. Use the same dark wood, moulding, aged brass, muted green/brown/plum and restrained antique-gold language as Dorian's house, but with dustier values, softer muted daylight and emotionally older materials.

The unease must come from abandonment, memory, privacy, dust, the locked door and deliberate control. Do not make this a horror cellar, dungeon, haunted attic cliché, occult chamber or torture room. No skulls, occult symbols, ritual objects, chains, weapons, blood, wounds, corpse, supernatural smoke, magic particles, glowing canvas, cracked face, visible portrait, readable letters, book titles, labels, signatures, watermarks, logos or modern objects. No Dorian, Basil, Henry or Sibyl. No explicit relationship outcome, no Chapter IV clue, no fantasy architecture, no electric lighting, no anime, no comic-book style, no 3D render, no glossy digital illustration, no recognisable film adaptation or actor likeness.
```

### Secret-room acceptance notes

- Main visual focal point: the old schoolroom's neglected architecture and the controlled relationship between door, shelves, table and covered canvas.
- Text-safe area: low-detail left/upper-left zone; do not place a high-contrast object or bright window glare there.
- The covered canvas must remain fully neutral and reusable for every Chapter III route.
- The asset must communicate “private room made by a key,” not “supernatural room.”

## 10. Global negative prompts and prohibited elements

Apply these prohibitions to all three P0 assets, in addition to the asset-specific negatives above:

- no captions, labels, readable writing, book titles, signatures, logos, watermarks or generator marks;
- no modern objects, electric lighting, plastic, contemporary architecture, modern tailoring or branded items;
- no celebrity, recognisable actor or film-adaptation likeness;
- no anime, comic-book, cel-shaded, glossy digital, photorealistic film-still or 3D-render style;
- no fantasy worldbuilding, magic particles, supernatural glow or occult symbols;
- no gore, blood, wounds, bruises, corpses, torture, poison staging or explicit death image;
- no new character, silhouette or face that becomes an accidental story clue;
- no visual claim that an interactive alive-estranged or alive-together route is a happy ending;
- no visual claim that the portrait itself caused Sibyl's outcome;
- no visual preview of Chapter IV, later corruption, Basil confrontation or final transformation.

## 11. Composition, safe-area and crop rules

### Portrait

- exact vertical `4:5`, target `1600 × 2000` px when supported;
- edit the master in place conceptually, but export a new candidate file and never overwrite the master;
- preserve full-length framing, head, both hands, chair, covered canvas and window landmarks;
- keep the face and hands inside the central safe area used by the existing viewer;
- no automatic reframing, outpainting, face replacement, beautification or relighting;
- Stage 3's important change must remain legible in the face at normal panel size, not only in a zoomed inspection;
- the portrait viewer's `object-fit: contain` must not lose the head, hands or chair.

### Locations

- exact horizontal `3:2`, target `2400 × 1600` px, native generation/export only;
- keep architectural identity inside a central crop-safe region and avoid essential details at the outermost 10%;
- preserve a low-detail left/upper-left text-safe area in both locations;
- keep the strongest focal structure in the centre-right/right half unless the composition requires a balanced room view;
- avoid a bright window, gold frame, covered canvas or patterned textile behind likely text;
- design for the current location frame's 3:2 proportion and `object-fit: contain` behaviour; do not rely on a crop that only works at one viewport;
- no image should require a generated inpainting step during runtime.

## 12. Continuity checklist

### Stage 3

- [ ] The input was the unchanged `portrait-dorian-MASTER.png`.
- [ ] The result is the same Dorian, not a newly generated look-alike.
- [ ] Face shape, nose, hairline, eyes, clothing, pose, hands, camera and studio landmarks remain stable.
- [ ] Living Dorian is not represented as aged or changed.
- [ ] Stage 3 is visibly stronger than Stage 2 but leaves room for later stages.
- [ ] The change is primarily around eyes, mouth harmony and restrained painted fatigue.
- [ ] No old-man, monster, blood, wound, crack, glow or grotesque element appears.
- [ ] The candidate is native-resolution PNG, exact 4:5, with no fake upscale.

### Dorian's house

- [ ] The room reads as a wealthy late-Victorian London townhouse, not a palace.
- [ ] The room is maintained, private, cultivated and suitable for Basil's visit.
- [ ] Dark wood, muted green/wine/plum, warm cream, aged brass and soft London morning light match the project.
- [ ] No character, portrait face, Sibyl clue, spoiler or modern object appears.
- [ ] The left/upper-left safe area remains calm and readable.
- [ ] The candidate is native-resolution PNG, exact 3:2, with no fake upscale.

### Secret room

- [ ] The room clearly belongs to the same house as Dorian's house asset.
- [ ] Dust, childhood memory and disuse are present without becoming horror cliché.
- [ ] A neutral covered canvas is fully opaque and reveals no portrait information.
- [ ] Door, lock, shelves and schoolroom furniture establish controlled privacy.
- [ ] No occult, supernatural, violent or Chapter IV clue appears.
- [ ] The left/upper-left safe area remains calm and readable.
- [ ] The candidate is native-resolution PNG, exact 3:2, with no fake upscale.

## 13. Accessibility planning

The later integration milestone must decide whether each image is informative or decorative. If the visual is a background behind equivalent story text, it may use empty alt text. If it carries distinct scene information, use concise alt text that does not reveal a branch outcome.

| Asset | Spoiler-safe alt text proposal | Important non-colour information | Fallback |
| --- | --- | --- | --- |
| `portrait-dorian-stage-3.webp` | “Dorian's painted portrait with a guarded expression and the first restrained signs of age.” | Identity, pose and the painted expression must remain legible without relying only on red/plum colour; the CSS Stage 3 placeholder remains a valid fallback | Existing logical Stage 3 CSS placeholder and stage text; no missing-file error should block play |
| `location-dorians-house.webp` | “A refined late-Victorian townhouse sitting room in soft morning light.” | Architecture, furniture, window light and maintained/private condition must read through shape and texture, not only palette | Existing scene/layout fallback with narrative text; no new location is required to complete the scene |
| `location-secret-room.webp` | “An unused Victorian schoolroom with dusty shelves, a locked door and a fully covered canvas.” | Dust, shelves, door/key relationship and covered canvas must be visible by form and contrast; do not depend only on darkness | Existing scene/layout fallback with narrative text; covered portrait remains represented textually |

The final integration must keep the current static local-file model, preserve intrinsic dimensions/aspect-ratio boxes and retain a safe fallback when an image fails to load.

## 14. Runtime format plan

No conversion is performed here.

| Asset | Working candidate | Final runtime | Conversion gate |
| --- | --- | --- | --- |
| Stage 3 | `portrait-dorian-stage-3-candidate.png` | `assets/portraits/portrait-dorian-stage-3.webp` | only after visual approval, exact 4:5 and identity review |
| Dorian's house | `location-dorians-house-candidate.png` | `assets/locations/location-dorians-house.webp` | only after visual approval, exact 3:2 and environment review |
| Secret room | `location-secret-room-candidate.png` | `assets/locations/location-secret-room.webp` | only after visual approval, exact 3:2, neutral canvas and continuity review |

The conversion milestone must use a loss-aware WebP export and verify dimensions, readability and local static paths. The master PNG remains unchanged and is never replaced by the Stage 3 candidate or final WebP.

## 15. Production order

Use this order; do not batch-generate all three before approval:

1. approve this `CHAPTER_III_VISUAL_PRODUCTION_BRIEF.md`;
2. create `portrait-dorian-stage-3-candidate.png` from the unchanged Dorian master;
3. visually approve Stage 3 against the master and Stage 2 comparison;
4. create `location-dorians-house-candidate.png`;
5. visually approve the maintained house and its safe area;
6. create `location-secret-room-candidate.png`, using the approved house asset as an architectural/material reference where useful;
7. visually approve the secret room, especially the fully covered neutral canvas;
8. only then convert the approved candidates to the three final WebP runtime files;
9. integrate them in a later milestone with explicit scene hooks and alt-text decisions;
10. run full browser QA after integration, including portrait fallback, location crops, desktop and narrow layouts.

## 16. Approval workflow

Each asset is approved independently. A candidate is not approved merely because it is attractive.

1. **Prompt compliance review:** verify the candidate against its complete prompt and negative constraints.
2. **Identity/material review:** compare Stage 3 side by side with the master and Stage 2; compare both locations for shared house materials.
3. **Narrative spoiler review:** reject any visible Sibyl outcome, portrait face in the secret room, Chapter IV clue or supernatural escalation.
4. **Composition review:** inspect native resolution, aspect ratio, safe area, focal hierarchy and crop tolerance.
5. **Accessibility review:** approve alt text or mark the image decorative; confirm the fallback communicates the same non-branch-critical information.
6. **Decision record:** record `approved`, `revise`, or `rejected` with the exact filename and reason. Do not silently replace a failed candidate.
7. **Conversion gate:** only an `approved` PNG may become a runtime WebP.
8. **Integration gate:** only after all three P0 assets are approved may a later milestone touch asset maps, scene visuals, manifests or UI hooks.

## 17. Hard stop for this milestone

The only deliverable in this milestone is this brief. No image was generated, no new asset was added, no runtime file was edited, no story data was edited, and no application integration was performed.
