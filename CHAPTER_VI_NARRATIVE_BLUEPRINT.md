# DORIAN GRAY — MILESTONE 6A
## Chapter VI: The Final Choice
### Narrative, Ending & Final Portrait Blueprint

Status: blueprint only. This document does not implement Chapter VI, change runtime, change save handling, generate Stage 6 artwork, create artwork, commit, push, or deploy.

## 1. Scope boundary

The six-chapter arc is now:

1. **The Beautiful Young Man** — first influence and first portrait pressure;
2. **The Actress** — idealisation, public promise, and relationship consequence;
3. **The Changing Portrait** — visible change, concealment, and the locked room;
4. **A Life of Pleasure** — repeated choices become a way of life;
5. **The Confrontation** — Basil sees the private truth and the player resolves Basil's immediate outcome;
6. **The Final Choice** — Dorian claims change, tests that claim, faces the final evidence, and makes an irreversible choice.

This milestone stops at the design of the final chapter. It does not add Chapter VI metadata or scenes to `js/story-data.js`.

## 2. Audit of the actual repository

Audit date: 2026-09-26.

Verified repository state:

- `HEAD`: `5c7c5570c89fd336a975bd910b2518e39c55a522`;
- branch: `main`;
- tracking ref: `origin/main` at the same SHA;
- working tree: clean before this blueprint was created;
- Chapter I–V are playable in the current runtime;
- no `chapter-6` chapter metadata exists;
- no `c6-*` scene exists;
- no Stage 6 runtime asset or Stage 6 mapping exists;
- `portrait-dorian-stage-final.webp` is only a reserved manifest entry, not a runtime asset;
- current Stage 5 artwork is `assets/portraits/portrait-dorian-stage-5.webp`.

The relevant current sources are:

- `README.md`, `ARCHITECTURE.md`, `STORY_DESIGN.md`, and `ASSET_MANIFEST.md`;
- `CHAPTER_V_NARRATIVE_BLUEPRINT.md`;
- `js/story-data.js`;
- `js/game-state.js`;
- `js/game-engine.js`;
- `js/narrative-resolver.js`;
- `js/chapter-four-behaviour.js`;
- `js/chapter-five-outcome.js`;
- `js/portrait-viewer.js`;
- `js/ui.js`;
- `tests/chapter-five.test.js`, `tests/chapter-five-foundation.test.js`, `tests/chapter-five-outcome.test.js`, `tests/chapter-four-behaviour.test.js`, `tests/multi-chapter-foundation.test.js`, `tests/game-engine.test.js`, and `tests/portrait-viewer.test.js`.

## 3. Current state contract that Chapter VI must receive

### 3.1 Save envelope

The actual save contract remains version 2:

```js
{
  version: 2,
  sceneId: string,
  activeChapterId: string,
  reputation: -3..3,
  conscience: -3..3,
  portrait: 0..3,
  flags: { [flag: string]: boolean },
  storyFacts: {
    sibylRelationship: null | "role-first" | "mixed" | "person-first",
    sibylOutcome: null | "dead-canonical" | "alive-estranged" | "alive-together",
    c2FinalResponse: null | "cruel" | "listen" | "delay",
    portraitLocation: null | "locked-schoolroom",
    basilSuspicion: null | "uneasy" | "suspects" | "clear",
    portraitStageUnlock: null | "stage-3" | "stage-4" | "stage-5",
    yellowBookResponse: null | "accepted" | "questioned" | "escape",
    basilOutcome: null | "dead-canonical" | "alive-separated" | "alive-helping"
  },
  choices: [{ sceneId, choiceId, reflection }],
  visitedScenes: string[],
  completedChapters: { [chapterId: string]: boolean },
  startedAt: string,
  updatedAt: string,
  chapterComplete: boolean
}
```

`game-state.js` keeps bounded numeric values, boolean flags, allow-listed story facts, choice history, visited scenes, and completion history. It reads the legacy v1 key and writes the v2 key. Chapter VI must preserve this migration boundary and must not assume that a new save version is needed.

### 3.2 Boolean flags

The current flag history is inherited from Chapters I–II:

| Source | Existing flags |
| --- | --- |
| Chapter I | `heardHenry`, `defendedBasil`, `acceptedIdea`, `challengedHenry`, `studiedPortrait`, `avoidedPortrait` |
| Chapter II | `c2RoleFirst`, `c2PersonSeen`, `c2PublicIdealisation`, `c2PublicPersonhood`, `c2RespectfulPromise`, `c2EngagementAnnounced`, `c2RoleIdealisation`, `c2GrandPromise`, `c2FinalCruel`, `c2FinalListen`, `c2FinalDelay` |
| Chapters III–V | no new boolean flags; later continuity is represented by story facts, choice history, and derived profile |

Chapter VI should add no boolean flags. It should read earlier flags only if a short conditional sentence genuinely benefits from them. It must not turn old flags into a new moral score.

### 3.3 Numeric values

The ranges and meanings are fixed:

- `reputation`: `-3..3`, public impression;
- `conscience`: `-3..3`, inner resistance or acceptance of consequence;
- `portrait`: `0..3`, accumulated pressure/context, not a moral score.

The Chapter V choices alter these values as follows:

| Decision | Choice | Reputation | Conscience | Portrait |
| --- | --- | ---: | ---: | ---: |
| I | `ask-what-you-actually-saw` | -1 | +1 | 0 |
| I | `defend-the-public-name` | +1 | 0 | 0 |
| I | `attack-the-gossip` | +1 | -1 | +1 |
| II | `warn-before-the-door` | 0 | +1 | 0 |
| II | `challenge-him-to-look` | 0 | 0 | +1 |
| II | `admit-partial-truth` | -1 | +1 | 0 |
| III | `listen-and-answer` | 0 | +1 | 0 |
| III | `blame-the-portrait-and-basil` | 0 | -1 | +1 |
| III | `reject-his-judgement` | +1 | -1 | +1 |
| IV | `accept-basil-help` | 0 | 0 | 0 |
| IV | `end-the-conversation` | 0 | 0 | 0 |
| IV | `silence-the-witness` | 0 | 0 | 0 |

Chapter VI may use these values as context for prose, but they must not decide Basil's outcome, Sibyl's outcome, Stage 6, Dorian's repentance, or the final ending.

### 3.4 Current Chapter V ending contract

Chapter V is the actual ten-scene shared spine:

```text
c5-fog-at-the-door
  -> c5-what-people-say
  -> c5-answer-basil                 [Decision I]
  -> c5-show-you-the-truth
  -> c5-the-locked-room              [Decision II]
  -> c5-basil-sees                   [universal Stage 5 event]
  -> c5-basil-asks-for-change
  -> c5-after-the-truth              [Decision III]
  -> c5-final-response               [Decision IV]
  -> c5-after-the-door               [ending]
```

The four exact Chapter V decision groups are:

```text
[
  ["ask-what-you-actually-saw", "defend-the-public-name", "attack-the-gossip"],
  ["warn-before-the-door", "challenge-him-to-look", "admit-partial-truth"],
  ["listen-and-answer", "blame-the-portrait-and-basil", "reject-his-judgement"],
  ["accept-basil-help", "end-the-conversation", "silence-the-witness"]
]
```

The current tests verify all `3 × 3 × 3 × 3 = 81` Chapter V paths. Each path:

- visits the same ten scenes;
- records exactly four Chapter V choice records;
- visits the universal witness scene;
- changes `portraitStageUnlock` from Stage 4 to Stage 5 at `c5-basil-sees`;
- leaves `basilOutcome` `null` until Decision IV;
- resolves exactly one of `dead-canonical`, `alive-separated`, or `alive-helping`;
- completes only at `c5-after-the-door`;
- leaves `activeChapterId === "chapter-5"` and `sceneId === "c5-after-the-door"` at the ending;
- does not create `completedChapters["chapter-6"]` or any Chapter VI metadata.

The tested outcome distribution is:

| `basilOutcome` | Number of 81 paths | Meaning |
| --- | ---: | --- |
| `dead-canonical` | 14 | restrained canonical adaptation of the immediate Basil consequence |
| `alive-separated` | 52 | interactive alternative; Basil survives and chooses distance |
| `alive-helping` | 15 | interactive alternative; Basil survives and offers limited support |

The Stage 5 event is universal. Basil witnesses damage that already exists; his gaze does not cause it. Chapter VI must begin from this witnessed Stage 5 state and must not reinterpret the witness event as route-dependent.

### 3.5 Chapter IV behaviour profile

`chapterFourBehaviourProfile(state)` is a pure derived resolver, not a save key. It reads the latest relevant history among these twelve Chapter IV choice IDs:

| Stance | Choice IDs |
| --- | --- |
| `reflection` | `share-the-evening`, `ask-what-was-seen`, `share-the-music`, `name-the-change` |
| `control` | `shape-the-evening`, `calmly-deflect`, `control-the-memory`, `control-the-comparison` |
| `escape` | `charm-as-shield`, `joke-about-rumour`, `beauty-as-shield`, `cover-and-return` |

The profile is:

- `self-examining` if at least three choices are `reflection`;
- `pleasure-as-escape` if at least three choices are `escape` and the reflection threshold is not met;
- `divided` otherwise.

Chapter VI may use this profile for one short interpretive variant, but it must not create new route chains or persist the profile.

## 4. Literary basis: Oscar Wilde, 1891 edition

Primary reading for this blueprint:

- [Chapter XIX of the 1891 edition](https://en.wikisource.org/wiki/The_Picture_of_Dorian_Gray_(1891)/Chapter_19);
- [Chapter XX of the 1891 edition](https://en.wikisource.org/wiki/The_Picture_of_Dorian_Gray_(1891)/Chapter_20);
- [Chapters XIV–XVIII of the 1891 edition](https://en.wikisource.org/wiki/The_Picture_of_Dorian_Gray_(1891)).

### 4.1 Chapter XIX: the claim of change

The adaptation must preserve these dramatic facts without copying Wilde's wording:

1. Dorian tells Henry that he intends to become good or has begun to change.
2. He offers one recent act as evidence: he believes he spared a young woman instead of using or abandoning her for his own pleasure.
3. Henry questions whether one restrained act, especially in a safe setting, proves a changed life.
4. Dorian wants to believe that a new life has begun, but the conversation exposes the difference between intention and transformation.

The game should not turn this into a reward for a single compassionate click. The act is a claim Dorian makes about himself; Chapter VI tests the claim.

### 4.2 Chapter XX: evidence and the final image

The adaptation must preserve this movement:

1. Dorian seeks the portrait again and expects his supposed improvement to appear in it.
2. The portrait is worse, not better.
3. Dorian is forced to ask whether his “good” act was genuinely selfless or merely a way to feel safe, pure, or admired.
4. He understands the portrait as the last evidence of his life and as a private conscience he has tried to control.
5. He attempts to destroy it.
6. The canonical movement ends in Dorian's death.
7. The portrait returns to its original young appearance.
8. The body that had been young carries the age and distortion previously held by the image.

The B1 adaptation should use newly written, short sentences such as:

> “I did one kind thing. Does that mean I have changed?”

> “One act can be kind. It cannot explain a whole life.”

> “The portrait was worse. It had not accepted my excuse.”

These are adaptation examples, not quotations from Wilde.

## 5. Deliberate Chapter XIV–XVIII boundary

Chapters XIV–XVIII are consulted only for time continuity and psychological pressure. They are not a procedural source for Chapter VI.

### 5.1 Short continuity bridge that is allowed

The bridge may compress the period after Basil's outcome into a few sentences:

- the house and social world have absorbed a consequence that Dorian cannot fully erase;
- Dorian avoids, fears, or rationalises what Basil's witness made unavoidable;
- in the alive-helping branch, Basil's support remains limited and does not absolve Dorian;
- in the alive-separated branch, Basil's boundary remains real and is not a reunion promise;
- in the dead-canonical branch, loss and guilt remain facts without procedural description;
- Dorian still has the young public face and the Stage 5 private evidence.

### 5.2 Explicitly excluded material

The following must not become universal Chapter VI scenes or mechanics:

- Alan Campbell's body-disposal sequence;
- coercive procedural concealment;
- servant deception or instructions for evading discovery;
- forensic detail, investigation walkthroughs, or evidence-management mechanics;
- opium-den procedural detail or substance-use spectacle;
- James Vane's revenge plot;
- the hunting accident and its body-identification sequence;
- any subplot that assumes Sibyl is dead in every run;
- any cleanup chain that assumes Basil is dead in every run.

These elements depend on Wilde's canonical continuity. The current game explicitly supports three Sibyl outcomes and three Basil outcomes, so they cannot be inserted into the shared spine without contradicting valid saves.

## 6. Exact dramatic function of Chapter VI

### Central question

> What does it mean to change when the past cannot be undone?

Secondary thematic question:

> Can one apparently good action prove that a person has changed?

The chapter must not claim that change is impossible. Change may begin now, while past harm remains real. Responsibility is not the same as moral purity, and one action cannot erase history.

Chapter VI is not a second Basil confrontation and not a catalogue of Dorian's crimes. It is the chapter in which Dorian's explanation of himself meets evidence that does not argue back in words.

### Dramatic movement

```text
hidden consequence
  -> witnessed consequence
  -> attempt to change
  -> test of motive
  -> final confrontation with evidence
  -> irreversible choice
```

The first two movements connect Chapter V to the final chapter. Basil has already witnessed the portrait; Chapter VI shows what that witness changes in Dorian's private and public life. Henry then hears Dorian's claim, the claimed good act is examined, and the portrait supplies the final evidence.

## 7. Proposed shared-spine chapter shape

The recommended implementation is exactly nine scenes and four decisions. All valid combinations use the same scene order. Continuity changes short paragraphs, not scene availability.

```text
c6-after-the-confrontation       opening / hidden consequence
  -> c6-the-world-has-noticed    narrative / witnessed consequence
  -> c6-a-new-life                choice / Decision I
  -> c6-the-good-act              narrative / one claimed example
  -> c6-the-test-of-motive        choice / Decision II
  -> c6-the-last-proof            narrative / final portrait evidence, Stage 6
  -> c6-what-it-shows             choice / Decision III
  -> c6-the-final-choice          choice / Decision IV / ending resolver
  -> c6-what-remains              ending / terminal result
```

Four three-option decisions produce `3 × 3 × 3 × 3 = 81` local Chapter VI combinations. There are no alternate complete scene trees.

### 7.1 `c6-after-the-confrontation` — “The Quiet House”

- **Function:** bridge from Chapter V without replaying the confrontation;
- **Narrative:** time passes in a compressed paragraph, not a new procedural subplot;
- **Continuity:** read `basilOutcome`, `sibylOutcome`, `yellowBookResponse`, and the Chapter IV profile;
- **Portrait:** Stage 5 remains the last witnessed state;
- **Decision:** none;
- **New facts:** none;
- **Safety:** no body, cleanup, investigation, or substance detail.

Possible B1 framing: “The house is quiet again, but quiet is not the same as peace. Someone has seen the truth, and the room cannot become innocent by being locked.”

### 7.2 `c6-the-world-has-noticed` — “A Consequence With a Witness”

- **Function:** turn private evidence into a consequence that can be noticed by other people without introducing a new witness to the supernatural portrait;
- **Narrative:** a conversation ends early, a familiar invitation is absent, or a person keeps a careful distance;
- **Basil variants:** dead-canonical is an absence and an unresolved loss; alive-separated is a chosen boundary; alive-helping is limited contact that does not become absolution;
- **Sibyl variants:** dead-canonical is memory; alive-estranged is independent distance; alive-together is continuing closeness with ordinary boundaries, not perfect happiness;
- **Decision:** none;
- **New facts:** none.

This scene must not make public rumour equal proof. It only establishes that the consequence has a social life beyond Dorian's private room.

### 7.3 `c6-a-new-life` — “The Claim”

- **Function:** adapt Chapter XIX's conversation with Henry;
- **Narrative:** Dorian says that he has begun a new life and that he has done one thing differently;
- **Evidence:** he names one situation in the country where he chose not to continue a relationship for his own pleasure. The girl is not turned into a new route, romance, or collectible subplot;
- **Henry:** Henry remains charming and sceptical. He asks whether one safe act proves a changed character;
- **Decision I:** the player chooses how Dorian presents the claim.

Recommended choices:

| Choice ID | Label | Dramatic meaning |
| --- | --- | --- |
| `state-the-act-plainly` | State the act plainly. | Dorian describes what happened without calling it proof of goodness. |
| `use-it-as-proof` | Use it as proof of change. | Dorian turns one act into a defence against the whole history. |
| `admit-the-uncertainty` | Admit that the motive is unclear. | Dorian recognises that a kind result can still have a self-protective motive. |

These choices must not produce separate scene chains. They add choice history and short conditional prose only.

### 7.4 `c6-the-good-act` — “One Example”

- **Function:** give the player a clear, B1-readable example of the claimed change;
- **Narrative:** the act is small and specific, not a heroic redemption scene;
- **Boundary:** do not imply that the woman owes Dorian gratitude, silence, love, or forgiveness;
- **Henry's response:** one act can be considerate while still serving Dorian's desire to feel changed;
- **Decision:** none;
- **New facts:** none.

The scene should keep the moral question open: an action can reduce immediate harm without proving that the actor has changed their way of living.

### 7.5 `c6-the-test-of-motive` — “What Was the Act For?”

- **Function:** force the claim to meet its motive;
- **Narrative:** Dorian remembers the act and asks whether he protected another person or protected the image he wants to have of himself;
- **Decision II:** the player chooses the interpretation Dorian is willing to face.

Recommended choices:

| Choice ID | Label | Dramatic meaning |
| --- | --- | --- |
| `protect-her-dignity` | Admit that her freedom mattered. | Dorian gives the other person an independent reason for the act. |
| `protect-my-image` | Admit that I wanted to feel innocent. | Dorian identifies self-protection inside the apparently good act. |
| `refuse-the-question` | Refuse to examine the motive. | Dorian repeats the old pattern of controlling the interpretation. |

No choice should grant a “good” status. No numeric threshold should resolve this scene.

### 7.6 `c6-the-last-proof` — “The Portrait Does Not Agree”

- **Function:** adapt Chapter XX's return to the portrait;
- **Narrative:** Dorian expects the image to have improved because he believes his life has improved;
- **Reveal:** the portrait is worse. The eyes, mouth, and overall surface show that the claimed act has not erased the accumulated history;
- **Interpretation:** the image is evidence and conscience, but it is not an omniscient narrator and does not explain every motive;
- **Portrait event:** this is the universal Stage 6 unlock point in the future implementation;
- **Decision:** none before the interpretation scene;
- **Safety:** no knife, blood, wound, body, or attack procedure is described.

The key B1 beat is: “The portrait had not rewarded the explanation. It showed a life, not one carefully chosen example.”

### 7.7 `c6-what-it-shows` — “What Does It Show?”

- **Function:** give Dorian and the player one explicit moment to interpret the final evidence before any physical or irreversible action;
- **Timing:** this scene occurs after the universal Stage 6 reveal and before `c6-the-final-choice`;
- **Decision III:** interpretation only. It does not decide survival, death, portrait restoration, or Stage 6;
- **Principle:** a legitimate philosophical objection may coexist with avoidance. Do not label disagreement with the portrait simply evil.

Exact future choice IDs:

| Choice ID | Player-facing meaning | Constraint |
| --- | --- | --- |
| `face-what-it-shows` | Dorian admits that the portrait holds a history he cannot undo. | Not automatic redemption, portrait healing, or guaranteed accountability. |
| `call-it-a-curse` | Dorian treats the portrait primarily as something done to him and shifts responsibility toward the supernatural object. | Never claim that the portrait literally caused his choices. |
| `deny-it-can-judge` | Dorian rejects the idea that an image can define the whole truth about him. | May contain a legitimate philosophical objection as well as avoidance; do not label it simply evil. |

These choices change interpretation, wording, Teacher mode, and reflection only. They must not secretly override the final action, create a hidden morality quiz, or use a cumulative threshold.

### 7.8 `c6-the-final-choice` — “The Final Choice”

- **Function:** make the irreversible decision about truth, concealment, and the supernatural bond;
- **Decision IV:** all branches use the same three exact choices;
- **Resolver:** direct final mapping from the selected Decision IV choice;
- **Safety:** the destroy option must be clearly understood as potentially irreversible before the player selects it.

Exact future choice IDs and player-facing labels:

| Choice ID | Player label | Meaning | Prohibited promise |
| --- | --- | --- | --- |
| `stop-hiding-the-truth` | **Stop hiding the truth.** | Dorian does not attack the portrait. He decides the secret cannot remain only under his control and accepts that consequences may follow. | No forgiveness, redemption, legal absolution, restored relationships, or portrait improvement. |
| `cover-the-portrait-again` | **Cover the portrait and keep the secret.** | Dorian survives but returns to concealment. The portrait remains Stage 6. | Do not call this a bad ending. |
| `destroy-the-portrait` | **Destroy the portrait and end the secret.** | Dorian turns against the final evidence and attempts to destroy the supernatural bond or secret. This is the Wilde-aligned terminal action. | Do not state “kill yourself,” “choose death,” any method, or weapon mechanics. |

Before `destroy-the-portrait` is selected, the prose must state in B1-safe language that Dorian understands that attacking the portrait may have irreversible consequences for himself. The death must not be hidden behind an innocent-looking button.

Use direct final mapping. Earlier Chapter VI decisions affect interpretation, wording, Teacher mode, and reflection only; they do not secretly override Decision IV.

### 7.9 `c6-what-remains` — “The Last Image”

- **Function:** close the six-chapter arc;
- **Decision:** none;
- **Completion:** the future implementation marks `completedChapters["chapter-6"] = true` only here;
- **State:** `activeChapterId` remains `"chapter-6"`, `sceneId` is `"c6-what-remains"`, and `chapterComplete` is `true`;
- **Next chapter:** none;
- **Teacher mode:** clearly label the three endings and distinguish the Wilde-aligned movement from interactive alternatives.

Ending summaries:

1. **`stop-hiding-the-truth` → `truth-faced`:** Dorian remains alive and does not attack the portrait. He accepts that consequences may follow, without receiving a promise of forgiveness, redemption, legal absolution, restored relationships, or portrait improvement.
2. **`cover-the-portrait-again` → `secret-kept`:** Dorian survives and returns to concealment. The portrait remains Stage 6. This is an interactive ending, but it must not be labelled simply “bad.”
3. **`destroy-the-portrait` → `portrait-destroyed`:** Dorian attempts to destroy the supernatural bond or secret. The Wilde-aligned terminal movement follows: factual, non-graphic death; the image returns to its original young appearance; Dorian's body carries the age and damage that the portrait had carried.

The two interactive alternatives must remain compatible with every `sibylOutcome` and `basilOutcome`. They must not promise that Sibyl returns, that Basil forgives Dorian, or that one final decision repairs earlier harm.

## 8. Continuity matrix

Chapter VI should read existing facts as narrative colour and boundary, not as parallel route requirements.

| Existing fact | `dead-canonical` / first branch | Living alternative 1 | Living alternative 2 |
| --- | --- | --- | --- |
| `sibylOutcome` | loss is remembered without repeating the death | Sibyl is alive and independent; estrangement remains real | Sibyl remains part of Dorian's life; closeness is not perfect happiness |
| `basilOutcome` | Basil's absence and Dorian's guilt remain | Basil survives but has chosen distance | Basil survives and offers limited support, never absolution |
| `yellowBookResponse` | an accepted idea can be recalled as an excuse | a questioned idea can be recalled as unresolved | escape can be recalled as a habit of abstraction |
| `chapterFourBehaviourProfile` | self-examining, divided, or pleasure-as-escape changes one sentence | same | same |
| numeric values | context only | context only | context only |

There are nine continuity classes (`3 Sibyl outcomes × 3 Basil outcomes`) and three derived Chapter IV profiles. The spine remains one path. No class receives a new scene, a new death, or a different final-choice menu.

## 9. Narrative resolver and ending contract

The future implementation should use declarative conditional prose through the existing `narrative-resolver.js` mechanisms.

Rules:

- conditional prose is short and side-effect free;
- unknown conditions resolve false;
- no `eval`, generated code, or runtime AI is introduced;
- `sibylOutcome`, `basilOutcome`, `yellowBookResponse`, and behaviour profile alter wording only;
- Decision III (`c6-what-it-shows`) changes interpretation only;
- Decision IV at `c6-the-final-choice` is the explicit source of the Chapter VI outcome;
- the final outcome is written only after Decision IV;
- the ending warning is shown only after the outcome is known.

Recommended future pure resolver contract:

```js
chapterSixEnding(state) =>
  "truth-faced"
  | "secret-kept"
  | "portrait-destroyed"
  | null
```

Use direct final mapping:

```text
stop-hiding-the-truth
    -> truth-faced

cover-the-portrait-again
    -> secret-kept

destroy-the-portrait
    -> portrait-destroyed
```

The pure resolver should read the latest valid Chapter VI Decision IV choice, return `null` for incomplete or malformed history, and never mutate state. Decision I–III records may be preserved for Teacher mode and conditional prose, but they must not override Decision IV.

## 10. Save and completion blueprint

This milestone does not modify `js/game-state.js`. For a future implementation:

1. keep save version 2 unless a tested migration need proves otherwise;
2. preserve all existing fields and all existing v1-to-v2 migration behaviour;
3. extend the existing allow-list rather than creating a parallel save format;
4. add at most one compact final outcome fact, preferably `chapterSixOutcome`, with exactly `truth-faced`, `secret-kept`, or `portrait-destroyed`;
5. add `stage-6` to the existing `portraitStageUnlock` allow-list;
6. do not add `basilKilled`, `basilAlive`, `murderCount`, `violenceMeter`, `repentanceScore`, `portraitWitness`, or a new morality meter;
7. keep warning actions (`continue`, `skip`, `pause`) outside the saved game state;
8. mark Chapter VI complete only at `c6-what-remains`.

Future handoff requirements into Chapter VI:

```text
completedChapters["chapter-5"] === true
storyFacts.basilOutcome !== null
storyFacts.portraitStageUnlock === "stage-5"
storyFacts.sibylOutcome !== null
storyFacts.sibylRelationship !== null
storyFacts.c2FinalResponse !== null
storyFacts.yellowBookResponse !== null
portrait is still a bounded numeric value 0..3
```

Entry must preserve the previous choices, visited scenes, flags, numeric values, and story facts. Starting Chapter VI must not reset or recompute the Chapter V outcome.

## 11. Final portrait / Stage 6 blueprint

### 11.1 Role of Stage 6

Stage 5 means that accumulated damage has become witnessed truth. Stage 6 means that Dorian's explanation has failed against the image itself: the supposed improvement has not repaired the history held by the portrait.

Stage 6 is therefore not a punishment meter and not a branch-specific Basil image. It is one shared final damaged portrait reached at `c6-the-last-proof`, before the irreversible choice.

### 11.2 Reserved file and mapping

The current manifest already reserves:

```text
assets/portraits/portrait-dorian-stage-final.webp
```

Future runtime mapping should use the logical key `6` while retaining that stable filename, unless a later asset review explicitly approves a different name. This milestone does not create, edit, or integrate the file.

### 11.3 Visual brief

The final damaged portrait should:

- keep the established 4:5 portrait composition;
- preserve Dorian's recognisable identity, pose, hairline, clothing language, and oil-painted medium;
- show unmistakable age and accumulated damage in the face;
- deepen the lines around the eyes and mouth;
- make the eyes tired, watchful, and no longer protected by youthful harmony;
- make the mouth harder and less open, with a restrained loss of proportion;
- make the skin and paint surface feel dry, worn, and historically burdened;
- remain an image of a human being, not a monster;
- remain legible in the existing `object-fit: contain` 4:5 presentation on desktop and mobile.

It must not contain:

- gore, blood, a wound, a knife, a corpse, exposed anatomy, decomposition, or a jump-scare monster;
- a route-specific Basil or Sibyl reference;
- a visual claim that Dorian has already died;
- a totally unrecognisable face that breaks continuity with Stage 0.

### 11.4 Restored portrait after the canonical-shaped ending

The canonical final movement requires a second narrative state: after Dorian dies, the portrait returns to its original young form. No new restored artwork is required. The future ending presentation should reuse the existing Stage 0 runtime asset for this final image.

The implementation must distinguish:

- **last damaged evidence:** logical Stage 6, shown before the final choice;
- **restored painting after `portrait-destroyed`:** existing Stage 0 presentation in the ending;
- **evidence retained after `truth-faced` or `secret-kept`:** Stage 6 remains the final image.

The ending-specific display may use `chapterSixOutcome` rather than rewriting the historical Stage 6 fact. This avoids inventing a `stage-0` unlock value and keeps the final outcome explicit across save/reload.

### 11.5 Dorian's body

The canonical ending may state that the body carries the age and distortion formerly held by the portrait. It does not require a body illustration. A text-only ending is preferred for the B1 classroom adaptation and keeps the final visual focus on the returned portrait.

## 12. Warning and safeguarding contract

Only the `portrait-destroyed` ending needs the existing content-warning mechanism. The warning should appear after the final outcome has resolved and should say, in factual language, that the canonical-shaped adaptation includes Dorian's non-graphic death.

The sensitive segment may describe the irreversible consequence in one restrained sentence. `skip` must remove only that transition, not the facts that:

- Dorian chose to destroy the portrait;
- the portrait returned to its young appearance;
- Dorian's body carried the image's age and damage.

No branch may include:

- body-disposal instructions;
- concealment instructions;
- forensic or investigation gameplay;
- weapon acquisition or use instructions;
- graphic physical description.

## 13. Teacher mode and literary labelling

Future teacher metadata should include:

- the six-scene movement from claim to evidence to choice;
- B1 vocabulary for motive, evidence, responsibility, change, consequence, and concealment;
- comprehension questions about why Henry doubts one good act and why the portrait matters;
- a discussion prompt about whether a good result proves a good motive;
- an explicit note that `destroy-the-portrait` follows Wilde's final movement, while the other two endings are interactive alternatives;
- an explicit note that earlier alive Sibyl or alive Basil outcomes make the whole route an adaptation, even when the final image movement follows Wilde;
- a safeguarding note explaining why Chapters XIV–XVIII procedural material is omitted.

The chapter must remain a classic data-driven branching adventure. It must not become an AI dialogue, an open-ended chat, or a backend-dependent system.

## 14. Future verification plan

Implementation work, when separately authorised, should add focused tests without changing this milestone's files beyond the blueprint:

### Contract and entry

- Chapter VI is absent before implementation;
- valid entry requires completed Chapter V, resolved `basilOutcome`, and Stage 5;
- entry preserves the complete previous state;
- incomplete, malformed, and incompatible saves remain safe;
- save v2 and v1 migration remain compatible.

### Shared spine

- exactly nine `c6-*` scenes in the declared order;
- exactly four decision groups with three choices each;
- all 81 local Chapter VI paths visit the same nine scenes;
- exactly four Chapter VI choice records are added;
- Stage 6 is universal at `c6-the-last-proof`;
- Decision III is `c6-what-it-shows` and changes interpretation only;
- the final outcome is `null` until Decision IV at `c6-the-final-choice`;
- completion occurs only at `c6-what-remains`.

### Continuity

- all nine Sibyl/Basil continuity classes render without contradiction;
- alive Sibyl is never described as dead;
- alive Basil is never used as a universal cleanup witness or forced into forgiveness;
- dead Basil is never made available for support;
- all three Chapter IV profiles alter prose only;
- numeric values do not change the ending resolver.

### Ending and portrait

- the three Decision IV choices resolve exactly three finite outcomes: `truth-faced`, `secret-kept`, and `portrait-destroyed`;
- the canonical-shaped ending shows the non-graphic warning and restores the Stage 0 image in the ending presentation;
- the two alternative endings retain Stage 6 evidence;
- the portrait viewer and scene fallback remain safe when the future Stage 6 asset is missing;
- no generated, remote, candidate, or reference-only artwork enters runtime.

### Literary and safety boundary

- Chapter XIX and XX beats are present in newly written B1 prose;
- Chapters XIV–XVIII are represented only by a short consequence bridge;
- no Alan Campbell procedure, servant deception, forensic detail, opium-den procedure, James Vane plot, hunting accident, or universal dead-Sibyl assumption leaks into the chapter;
- full syntax, unit, save/reload, portrait, warning, and `git diff --check` verification is performed only in a separately authorised implementation milestone.

## 15. Milestone stop

The only intended output of Milestone 6A is this file:

`CHAPTER_VI_NARRATIVE_BLUEPRINT.md`

No Chapter VI runtime, no save modification, no Stage 6 artwork, no artwork generation, no commit, no push, and no deploy belong to this milestone.
