# DORIAN GRAY — MILESTONE 5A
## Chapter V: The Confrontation — Narrative and Technical Blueprint

**Status:** design and technical blueprint only. Chapter V is not implemented by this milestone.

**Verified baseline:** `bb7f3f4b2e1f014622c0fbd38e5957edd5d4b212` on `main`.

**Scope stop:** this document does not add runtime scenes, save fields, artwork, Stage 5 mapping, Chapter VI logic, a commit, a push, or a deploy.

## 1. Verified current project state

### 1.1 Repository and architecture

The repository is the static, offline-capable B1 English-learning adventure described by `README.md`, `ARCHITECTURE.md`, and `STORY_DESIGN.md`. It has no package manifest, build step, backend, account system, database, AI API, or personal-data field. The current runtime flow is:

```text
story-data.js -> game-engine.js -> ui.js -> index.html
game-state.js -> localStorage
narrative-resolver.js -> conditional prose and content warnings
```

The current working tree was clean at the beginning of this audit. The published baseline is Chapter IV-complete and Chapter V-unimplemented. The current source files reviewed for this blueprint were:

- `README.md`, `ARCHITECTURE.md`, `STORY_DESIGN.md`, and `ASSET_MANIFEST.md`;
- `CHAPTER_IV_NARRATIVE_BLUEPRINT.md`;
- `js/story-data.js`, `js/game-state.js`, `js/game-engine.js`, `js/narrative-resolver.js`, `js/chapter-four-behaviour.js`, `js/portrait-viewer.js`, and `js/ui.js`;
- `tests/game-engine.test.js`, `tests/chapter-two.test.js`, `tests/chapter-three.test.js`, `tests/chapter-four.test.js`, `tests/chapter-four-behaviour.test.js`, `tests/multi-chapter-foundation.test.js`, and `tests/portrait-viewer.test.js`.

### 1.2 Current save v2 contract

The current serialised state is:

```js
{
  version: 2,
  sceneId,
  activeChapterId,
  reputation: -3..3,
  conscience: -3..3,
  portrait: 0..3,
  flags: { [knownFlag]: boolean },
  storyFacts: {
    sibylRelationship: "role-first" | "mixed" | "person-first" | null,
    sibylOutcome: "dead-canonical" | "alive-estranged" | "alive-together" | null,
    c2FinalResponse: "cruel" | "listen" | "delay" | null,
    portraitLocation: "locked-schoolroom" | null,
    basilSuspicion: "uneasy" | "suspects" | "clear" | null,
    portraitStageUnlock: "stage-3" | "stage-4" | null,
    yellowBookResponse: "accepted" | "questioned" | "escape" | null
  },
  choices: [{ sceneId, choiceId, reflection }],
  visitedScenes: string[],
  completedChapters: { [chapterId]: boolean },
  startedAt,
  updatedAt,
  chapterComplete: boolean
}
```

`game-state.js` keeps version 2, reads the legacy v1 key, normalises bounded numeric values and allow-listed facts, preserves completed chapters and choice history, and rejects malformed or incompatible saves. A future Chapter V implementation should extend the allow-list rather than invent a second save version unless an actual migration need is demonstrated.

`portraitStage(state)` currently resolves numeric portrait values to Stages 0–2, then gives explicit `portraitStageUnlock` values precedence for Stage 3 and Stage 4. `STORY_DATA.assets.portraitStages` currently contains only assets for Stages 0–4. Stage 5 is not present in runtime.

### 1.3 Verified Chapter IV ending and handoff

Chapter IV has exactly nine shared-spine scenes:

```text
c4-years-begin
c4-the-book-as-habit
c4-house-open              Decision I
c4-whispers                Decision II
c4-chosen-pleasure         Decision III
c4-locked-room-again       Decision IV
c4-face-in-mirror          universal Stage 4 event
c4-later-invitation
c4-threshold               ending
```

Its four decisions have three options each, for 81 local Chapter IV paths. All valid paths finish at `c4-threshold`, mark `completedChapters["chapter-4"] = true`, keep `activeChapterId = "chapter-4"`, and do not create Chapter V completion or Chapter V runtime metadata. The ending explicitly says that Basil has heard enough to want a conversation but has **not** seen the portrait, entered the secret room, or witnessed the truth behind the locked door.

The following is a verified representative Chapter IV handoff, using the test fixture's valid Chapter I–III state and the first, evidence-seeking option at each Chapter IV decision:

```text
completedChapters = {
  "chapter-1": true,
  "chapter-2": true,
  "chapter-3": true,
  "chapter-4": true
}
activeChapterId = "chapter-4"
sceneId = "c4-threshold"
chapterComplete = true
Reputation = 0
Conscience = 3
Portrait = 2
choice history length = 15
```

The same verified representative state contains:

```js
flags: {
  heardHenry: true,
  defendedBasil: true,
  acceptedIdea: true
}

storyFacts: {
  sibylRelationship: "person-first",
  sibylOutcome: "alive-together",
  c2FinalResponse: "listen",
  portraitLocation: "locked-schoolroom",
  basilSuspicion: "uneasy",
  portraitStageUnlock: "stage-4",
  yellowBookResponse: "accepted"
}
```

Its four Chapter IV choice records are `share-the-evening`, `ask-what-was-seen`, `share-the-music`, and `name-the-change`. Other valid Chapter IV choices alter the numeric values and derived behaviour profile, but not the handoff invariant: Stage 4 is universal, Basil has not witnessed the portrait, and the next chapter owns the encounter.

`portraitLocation = "locked-schoolroom"` remains the location contract. `portraitStageUnlock = "stage-4"` means the cumulative Chapter IV event has happened. `basilSuspicion = "uneasy" | "suspects" | "clear"` remains a pre-witness suspicion scale:

- `uneasy`: Basil senses wrongness;
- `suspects`: Basil believes Dorian is deliberately hiding something serious;
- `clear`: Basil understands that the concealment is serious and deliberate;
- none of these values means that Basil has seen or understood the portrait.

The current choice history has 11 pre-Chapter-IV records plus four Chapter IV records on this representative path. A future Chapter V with four decisions should add four records, not time-jump or repeated-ritual records; the representative completed Chapter V would therefore have 19 records.

### 1.4 Existing reusable behaviour and warning systems

`chapterFourBehaviourProfile(state)` is a pure derived helper. It returns exactly:

- `self-examining`;
- `divided`;
- `pleasure-as-escape`.

It is based on Chapter IV choice history and is not persisted. It must remain interpretation and pressure, not a moral verdict or a hidden death threshold.

The existing warning system is declarative. A scene can expose `contentWarning`; the resolver checks its condition, and the UI offers `continue`, `skip`, or `pause`. The warning action is held in UI memory only. `skip` omits only segments marked `sensitive`; `pause` returns to the title without changing the save. Chapter II already demonstrates the desired route-specific warning pattern.

## 2. Verified literary basis and chronology

The primary literary source for this blueprint is Oscar Wilde's 1891 book edition, specifically Chapter XII and Chapter XIII. The verified text is available in the [1891 Chapter XII transcription](https://en.wikisource.org/wiki/The_Picture_of_Dorian_Gray_(1891)/Chapter_12) and [1891 Chapter XIII transcription](https://en.wikisource.org/wiki/The_Picture_of_Dorian_Gray_(1891)/Chapter_13). Film adaptations are not used as canon evidence.

### 2.1 Chapter XII: the approach and serious conversation

The 1891 Chapter XII establishes the correct opening envelope:

1. It is the eve of Dorian's thirty-eighth birthday, late at night, in cold fog.
2. Dorian encounters Basil while Basil is leaving for Paris and has been waiting to speak to him.
3. Basil has heard serious London rumours and names social consequences and damaged lives.
4. Basil struggles to believe the rumours because Dorian still appears young, bright, and innocent.
5. Basil asks Dorian to deny or explain the charges rather than merely perform charm.
6. Basil's concern is personal and moral, but he is not an omniscient investigator. He is still the friend who painted Dorian.
7. Dorian turns Basil's request into a challenge and offers to show him his “soul”.
8. Dorian leads Basil upstairs toward the locked room.

The adaptation may compress the social examples into B1-safe rumours and consequences. It must not turn the scene into a catalogue of crimes or imply that Basil knows the portrait in advance.

### 2.2 Chapter XIII: witnessed truth and the canonical boundary

The 1891 Chapter XIII establishes the second half of the chapter:

1. Basil enters the old, neglected room and Dorian opens the concealed portrait.
2. Basil recognises both his own work and Dorian's face in the changed image.
3. His reaction combines horror, disbelief, recognition, grief, and responsibility; it is not a detached lecture.
4. Dorian gives a partial account of the wish and the portrait's role.
5. Basil asks Dorian to repent and change, insisting that it is not too late.
6. Dorian reacts with despair, anger, and blame; the portrait intensifies the confrontation but does not excuse Dorian.
7. The canonical chapter ends in Basil's violent death.

The blueprint uses only the event boundary and emotional logic of the death. It does not reproduce Wilde's graphic description, weapon detail, blood detail, body detail, concealment sequence, servant deception, or later forensic/procedural material.

### 2.3 What is canon, compressed adaptation, and interactive extension

| Layer | Chapter V treatment |
| --- | --- |
| Canonical events | Fog encounter; Basil's rumours; Basil's disbelief because Dorian looks innocent; demand for an answer; Dorian's offer to show his soul; locked-room entry; Basil sees and recognises the changed portrait; Basil urges change; Dorian reacts with anger and blame; canonical death. |
| Compressed school adaptation | B1 dialogue; short representative rumours instead of Wilde's long social catalogue; short travel and room transitions; restrained description of the portrait; a narrative break around violence; consequence and responsibility instead of Chapter XIV-style aftermath. |
| Interactive alternatives | Dorian's stance during the rumour conversation; the way he frames the reveal; his response to Basil's appeal; a finite survival/helping or survival/separation outcome. These are labelled as interactive additions, not Wilde's plot. |
| Chapter VI boundary | Chapter XIV is not implemented or designed here. No disposal, investigation, forensic, servant-deception, or procedural aftermath is included. |

## 3. Dramatic function and central question

Chapter IV ends with **pressure before encounter**. Chapter V owns the encounter itself: Basil arrives, names the rumours, enters the locked room, and sees what Dorian has hidden.

The six-chapter movement is:

```text
I  The Beautiful Young Man   portrait introduced
II The Actress               relationships and public consequence
III The Changing Portrait    evidence becomes private and visible to Dorian
IV A Life of Pleasure        concealment becomes a habit
V  The Confrontation         private truth becomes witnessed truth
VI The Final Choice          Dorian chooses what to do with accumulated consequence
```

The recommended central question is:

> **What happens when another person finally sees the truth?**

This is deliberately not “Will Dorian be good or evil?” The chapter tests exposure, friendship, responsibility, blame, persuasion, and the limits of one person's help. The portrait reveal is the irreversible midpoint; the final outcome concerns what Dorian does after Basil has seen it.

## 4. Chapter IV → V continuity

### 4.1 Opening invariant

Chapter V must begin from `c4-threshold` or its equivalent future handoff state. Basil is approaching, but he does not already know what the portrait shows. The first scene should feel like a door finally opening, not like a confrontation that has already happened off-screen.

The opening should carry forward:

- `portraitLocation = "locked-schoolroom"`;
- `portraitStageUnlock = "stage-4"`;
- `basilSuspicion` as pre-witness context;
- `sibylOutcome`, `sibylRelationship`, and `c2FinalResponse` unchanged;
- `yellowBookResponse` as a short interpretive influence;
- the derived Chapter IV behaviour profile;
- existing numeric values as context only.

### 4.2 Basil suspicion continuity

The scale remains monotonic in intensity but not in knowledge:

| Value | Chapter V opening meaning | What it must not mean |
| --- | --- | --- |
| `uneasy` | Basil has sensed wrongness and approaches with concern. | He has not inferred the portrait. |
| `suspects` | Basil believes Dorian is concealing something serious and deliberate. | He does not know the hidden object or its supernatural meaning. |
| `clear` | Basil is prepared to challenge an unmistakable serious concealment. | He has not seen the changed portrait. |

Conditional prose may change Basil's patience, examples, and emotional temperature. The scene spine and witness event remain shared.

### 4.3 Sibyl continuity

Chapter V is not another Sibyl chapter. Use no new Sibyl fact.

- `dead-canonical`: Basil may refer briefly to grief, responsibility, or the danger of turning loss into an excuse. No living Sibyl prose is permitted.
- `alive-estranged`: Basil may refer to harm and distance, without implying death or a promised return.
- `alive-together`: Basil may refer to the difficulty of intimacy and secrecy, without asserting marriage, a frozen engagement, constant presence, or automatic happiness.

These are short continuity variants in shared scenes, not separate routes.

### 4.4 Yellow-book continuity

`yellowBookResponse` colours Dorian's vocabulary but does not dominate the chapter:

- `accepted`: Dorian may use aesthetic permission or elegant philosophy to defend himself;
- `questioned`: Dorian knows that attractive ideas can become excuses, even if he resists the conclusion;
- `escape`: Dorian reaches for avoidance language when the conversation becomes personal.

Basil and the portrait remain the centre of gravity.

## 5. Universal portrait witness decision

Basil seeing the changed portrait is a **universal shared-spine event**. Every valid Chapter V route reaches `c5-basil-sees` before the outcome decision resolves.

This is recommended because it is:

- the defining literary event of Chapter V;
- the conversion of private truth into witnessed truth;
- a stable handoff for Chapter VI;
- a way to avoid a separate `portraitWitness` state and a route explosion;
- compatible with both canonical and clearly labelled interactive survival outcomes.

Once `c5-basil-sees` has been entered, later prose must never imply that Basil did not see the portrait. A mid-chapter save may still be incomplete, but the completed Chapter V invariant includes the witness event.

No persistent `portraitWitness` fact is recommended. Chapter VI can infer the completed witness event from `completedChapters["chapter-5"] === true`; an in-progress implementation can use scene position and visited scenes without widening the permanent story-fact contract.

## 6. Sensitive-content strategy

### 6.1 Canonical death treatment

The canonical route remains available as an explicitly labelled canonical adaptation, but its violence is handled through restraint:

- show the escalating anger, control, and refusal clearly;
- end the immediate description at a narrative break;
- state the consequence factually: Basil is dead;
- do not describe a weapon, wound, blood, body, disposal, concealment method, servant deception, investigation, or suffering;
- do not make the player perform or learn a procedure;
- do not make the scene sensational or visually graphic.

The canonical death is a consequence of a legible escalation pattern, not a surprise hidden behind an innocent button.

### 6.2 Route-specific warning

No warning is shown for the whole chapter. The warning appears only on the shared ending scene when `basilOutcome === "dead-canonical"`.

Recommended warning copy for a future implementation:

> **Content note: violent death**
>
> This route reaches a non-graphic account of Basil's violent death. The scene uses a narrative break and states the consequence without describing injury. You can continue, skip the sensitive transition, or pause and return to the title.

The warning follows the Chapter II pattern:

- the route outcome is already resolved in the game state;
- `continue` shows the full restrained scene;
- `skip` removes only the segment marked `sensitive`, while retaining the non-graphic fact that Basil is dead;
- `pause` returns to the title without changing the already-resolved story state;
- the warning action is not persisted.

Teacher mode should explain that the warning exists because one canonical route includes a violent death, while the chapter itself also contains non-violent interactive alternatives.

## 7. Basil outcome model

### 7.1 Recommended single finite fact

Add exactly one future persistent fact:

```text
basilOutcome = "dead-canonical" | "alive-separated" | "alive-helping"
```

The labels are approved here with the following exact semantics:

| Value | Meaning | Canon status | Why Chapter VI needs it |
| --- | --- | --- | --- |
| `dead-canonical` | Basil dies in the restrained canonical adaptation after the confrontation escalates beyond recovery. | Canonical event, school-adapted in presentation. | Chapter VI must acknowledge the irreversible loss without implementing Chapter XIV cleanup. |
| `alive-separated` | Basil survives the witnessed truth but leaves with a clear boundary; Dorian loses the relationship's former safety. | Interactive alternative; not Wilde's original plot. | Chapter VI can treat Basil as a living but absent moral witness. |
| `alive-helping` | Basil survives, remains emotionally present, and offers limited help or a further honest conversation. He does not absolve Dorian or become a teacher avatar. | Interactive alternative; not Wilde's original plot. | Chapter VI can offer a living witness and possible support while preserving Dorian's agency and responsibility. |

`basilOutcome` is better persisted than re-derived in Chapter VI because it is a compact, stable narrative handoff and because reconstructing a final outcome from four historical choice records would make future logic more fragile. It is the only new Chapter V story fact recommended. Do not add `basilKilled`, `basilAlive`, `basilRelationship`, `murderCount`, or `violenceMeter`.

### 7.2 Four-decision resolver

The four Chapter V decisions should be stored in ordinary `choices` history. The resolver may derive a temporary confrontation pattern, but it should write only `basilOutcome` at the final decision.

The recommended choice contract is:

| Decision | Choice ID | B1-readable stance | Pressure effect |
| --- | --- | --- | --- |
| I — answer the rumours | `ask-what-you-actually-saw` | Ask Basil to separate evidence from gossip. | De-escalates without erasing the rumours. |
| I | `defend-the-public-name` | Defend reputation and appearance. | Controls the conversation. |
| I | `attack-the-gossip` | Accuse Basil of repeating cruel stories. | Makes anger and counter-attack explicit. |
| II — frame the reveal | `warn-before-the-door` | Warn that the truth is difficult. | Keeps agency while making risk visible. |
| II | `challenge-him-to-look` | Challenge Basil to judge for himself. | Raises the confrontation's heat. |
| II | `admit-partial-truth` | Admit that Dorian has hidden and harmed before opening the door. | Creates a genuine de-escalation possibility. |
| III — answer Basil's appeal | `listen-and-answer` | Listen to the request for change. | Opens the possibility of help without promising redemption. |
| III | `blame-the-portrait-and-basil` | Blame the portrait, its maker, or Basil's influence. | Makes responsibility avoidance visible. |
| III | `reject-his-judgement` | Reject Basil's right to judge or ask for change. | Makes refusal and control explicit. |
| IV — final threshold | `accept-basil-help` | Let Basil stay and help you face the truth. | Resolves to `alive-helping` only when Decision II is `admit-partial-truth` or Decision III is `listen-and-answer`; otherwise it resolves to `alive-separated`. |
| IV | `end-the-conversation` | Tell Basil to leave and set a final boundary. | Resolves to `alive-separated`. |
| IV | `silence-the-witness` | Say, in clear threatening language, that Basil has seen too much and must not speak. | Can resolve to the canonical route only after a prior escalating pattern. |

The final option is intentionally dangerous but not sensationally labelled “Murder Basil”. Its wording must make coercion and the risk of violence legible. It must not look like “Ask Basil to stay”, “Protect your secret”, or another harmless social action.

### 7.3 Transparent resolver rules

Use a small, auditable rule table rather than a morality meter or numeric thresholds:

1. If the final choice is `accept-basil-help` and either Decision II is `admit-partial-truth` or Decision III is `listen-and-answer`, resolve to `alive-helping`. Basil's help is limited: he witnesses, challenges, and offers a next conversation; he does not solve Dorian or erase prior harm.
2. If the final choice is `accept-basil-help` without either of those earlier truth-seeking responses, resolve to `alive-separated`. The apparently helpful request cannot erase a preceding refusal to admit or listen.
3. If the final choice is `end-the-conversation`, resolve to `alive-separated`. The scene acknowledges that the boundary can be frightened, controlling, or unfair even though Basil survives.
4. If the final choice is `silence-the-witness`, resolve to `dead-canonical` only when `(Decision I == attack-the-gossip OR Decision III == blame-the-portrait-and-basil OR Decision III == reject-his-judgement)` and `Decision II != admit-partial-truth`.
5. If `silence-the-witness` is chosen without that exact prior escalation pattern, resolve to `alive-separated`: the threat is serious and coercive, but the narrative does not silently convert a single ambiguous click into death.

This is a finite pattern resolver, not a `Reputation`, `Conscience`, or `Portrait` threshold. It gives the player agency across multiple decisions, makes the dangerous route readable, and keeps every route on the universal witness spine.

### 7.4 Chapter IV behaviour profile

The derived Chapter IV profile should influence short prose and Basil's interpretation:

- `self-examining`: Basil notices that Dorian can name details but may still avoid responsibility;
- `divided`: Basil sees the split between public control and private recognition;
- `pleasure-as-escape`: Basil meets polished avoidance and the difficulty of keeping the conversation serious.

The profile must not decide the outcome. It is pressure and interpretation, not destiny. In particular:

- `self-examining` does not guarantee safety or redemption;
- `pleasure-as-escape` does not force `dead-canonical`;
- `divided` is not a neutral morality default.

The resolver should be driven by the four visible Chapter V stances. The profile may alter the final prose and the emotional cost of `alive-separated` or `alive-helping`, but it should never override an explicit local choice pattern.

## 8. Proposed shared scene spine

The recommended spine has ten scenes and four decisions. It is intentionally close to the existing Chapter IV pattern: short narrative transitions, four three-option decisions, one universal visual milestone, one shared ending.

### `c5-fog-at-the-door` — Fog at the Door

- **Kind:** narrative.
- **Setting:** Dorian's house and library, late-night fog, the eve of Dorian's thirty-eighth birthday.
- **Literary position:** Opening of Wilde's Chapter XII, before Basil's serious conversation.
- **Content:** Dorian meets Basil after Basil has been waiting and is about to leave London. Basil's return is emotionally unexpected; Dorian's young face makes the encounter more unsettling.
- **Characters:** Dorian, Basil; servant only as background if needed, with no later procedural role.
- **Entry conditions:** Chapter IV complete; existing Chapter III–IV handoff facts resolved; no `basilOutcome`; `portraitLocation` remains `locked-schoolroom`; `portraitStageUnlock` is `stage-4`.
- **Conditional variants:** `basilSuspicion` changes Basil's opening confidence; the Chapter IV profile changes whether Dorian reads the visit as concern, pressure, or an interruption; yellow-book and Sibyl variants are one sentence at most.
- **Decision:** none.
- **Numeric effects:** none.
- **Story facts:** none; do not upgrade `basilSuspicion` merely by entering the scene.
- **Portrait interaction:** The Stage 4 portrait remains in the locked schoolroom and unseen by Basil.
- **Next scene:** `c5-what-people-say`.
- **B1 language goal:** describing time, place, surprise, and a difficult meeting.
- **Source note:** Adapted from the fog encounter, Basil's impending departure, and the late-night timing of Chapter XII.
- **Safeguarding note:** no death warning; no violent language beyond ordinary tension.

### `c5-what-people-say` — What People Say

- **Kind:** narrative.
- **Setting:** the library, firelight and fog outside.
- **Literary position:** Chapter XII's rumour conversation before Dorian offers to show the portrait.
- **Content:** Basil says that serious things are being said about Dorian. He distinguishes rumour from proof but explains that the pattern of social distance has become impossible to ignore. He still struggles to believe the worst because Dorian appears young and innocent.
- **Characters:** Dorian and Basil.
- **Entry conditions:** only from `c5-fog-at-the-door`.
- **Conditional variants:** `uneasy`, `suspects`, and `clear` change how much Basil can say without claiming portrait knowledge. `dead-canonical` Sibyl continuity may mention past responsibility but not repeat her death; living routes must keep Sibyl alive. Yellow-book language may appear as a defensive metaphor only.
- **Decision:** none; the player should first hear the whole pressure before answering it.
- **Numeric effects:** none.
- **Story facts:** none.
- **Portrait interaction:** none; the secret remains upstairs.
- **Next scene:** `c5-answer-basil`.
- **B1 language goal:** “People say that…”, “I do not believe them, but…”, “What have you actually seen?”, and distinguishing evidence from accusation.
- **Source note:** Chapter XII, compressed into non-graphic and non-catalogue B1 language.
- **Safeguarding note:** rumours remain non-specific; do not reproduce Wilde's long list of named scandals or self-harm details.

### `c5-answer-basil` — Answer Basil

- **Kind:** choice; Decision I.
- **Setting:** the library, immediately after Basil's account.
- **Literary position:** Dorian's defensive and contemptuous answers in Chapter XII.
- **Content:** Dorian chooses whether to ask what Basil has actually seen, defend his public name, or attack Basil for listening to gossip. The choice establishes stance, not outcome.
- **Characters:** Dorian and Basil.
- **Entry conditions:** only after `c5-what-people-say`.
- **Conditional variants:** Basil's patience and examples vary with `basilSuspicion`; profile and yellow-book affect Dorian's phrasing, not availability.
- **Decision:** `ask-what-you-actually-saw`, `defend-the-public-name`, or `attack-the-gossip`.
- **Numeric effects:** optional context-only effects: evidence `reputation -1, conscience +1`; public defence `reputation +1`; attack `reputation +1, conscience -1, portrait +1`. Clamp to existing ranges.
- **Story facts:** none; record only the choice in `choices`.
- **Portrait interaction:** none.
- **Next scene:** `c5-show-you-the-truth`.
- **B1 language goal:** asking for evidence, denial, accusation, and public reputation.
- **Source note:** Adapted from Dorian's counter-arguments and Basil's refusal to reduce the issue to social hypocrisy.
- **Safeguarding note:** accusations must concern rumours, reputation, and responsibility, not graphic crimes or targeted slurs.

### `c5-show-you-the-truth` — I Will Show You the Truth

- **Kind:** narrative transition.
- **Setting:** library to staircase; Dorian takes the lamp and offers to show Basil his “soul”.
- **Literary position:** End of Chapter XII, where Dorian converts the conversation into an invitation upstairs.
- **Content:** Basil asks for a plain answer. Dorian says that the answer is upstairs and frames the reveal as Basil's right, a challenge, or a burden depending on Decision I. The scene makes shared witness inevitable without yet showing the face.
- **Characters:** Dorian and Basil.
- **Entry conditions:** only after Decision I.
- **Conditional variants:** evidence-seeking Dorian can warn that seeing is not the same as understanding; public-defence Dorian can make the reveal a challenge; attack Dorian can make it sound like punishment for Basil's concern.
- **Decision:** none.
- **Numeric effects:** none.
- **Story facts:** none.
- **Portrait interaction:** the portrait is still covered/locked; no Stage 5 unlock yet.
- **Next scene:** `c5-the-locked-room`.
- **B1 language goal:** “You wanted to know”, “I will show you”, “You have had more to do with my life than you think”, and expressing intention.
- **Source note:** Chapter XII's “show my soul” transition, rewritten rather than quoted.
- **Safeguarding note:** the reveal is dramatic but not a threat of violence; do not foreshadow the weapon or death.

### `c5-the-locked-room` — The Locked Room

- **Kind:** choice; Decision II.
- **Setting:** staircase and old schoolroom door.
- **Literary position:** Opening of Chapter XIII before the curtain is drawn.
- **Content:** Dorian frames what Basil is about to see. He can warn Basil that the truth is difficult, challenge Basil to judge for himself, or admit partial responsibility before opening the room.
- **Characters:** Dorian and Basil.
- **Entry conditions:** only after `c5-show-you-the-truth`; `portraitLocation = "locked-schoolroom"`.
- **Conditional variants:** `basilSuspicion` changes whether Basil enters cautiously or with direct questions; the profile changes Dorian's emotional framing; Sibyl is referenced only if needed to explain why responsibility matters.
- **Decision:** `warn-before-the-door`, `challenge-him-to-look`, or `admit-partial-truth`.
- **Numeric effects:** warning `conscience +1`; challenge `portrait +1`; partial admission `reputation -1, conscience +1`. These are context signals only.
- **Story facts:** none; do not persist a witness fact or a threat meter.
- **Portrait interaction:** the event prepares the shared reveal but does not unlock Stage 5 yet.
- **Next scene:** `c5-basil-sees` for all options.
- **B1 language goal:** warning, partial confession, challenge, and “I should have…” / “I am responsible for…”.
- **Source note:** Chapter XIII's locked-room entrance and Dorian's invitation to see the soul.
- **Safeguarding note:** the choice labels make emotional risk clear without using a sensational violence label.

### `c5-basil-sees` — Basil Sees

- **Kind:** narrative; universal irreversible witness event.
- **Setting:** old schoolroom, curtain removed, dim light.
- **Literary position:** Chapter XIII's portrait revelation and Basil's recognition.
- **Content:** Basil sees the changed portrait, recognises Dorian and his own work, and moves through disbelief, horror, grief, and moral concern. Dorian gives a short account of the wish and the secret. The prose must not make Basil omniscient: he sees the image and hears Dorian's partial explanation, but he cannot know every rumour or every consequence.
- **Characters:** Dorian and Basil.
- **Entry conditions:** all three choices at Decision II lead here.
- **Conditional variants:** Basil's first words vary by `basilSuspicion`; the profile changes Dorian's internal interpretation; no variant may say that Basil did not see the portrait.
- **Decision:** none.
- **Numeric effects:** no numeric threshold. The future implementation may apply `storyFacts.portraitStageUnlock = "stage-5"` as the event's idempotent entry effect.
- **Story facts:** no `portraitWitness`; no `basilOutcome` yet.
- **Portrait interaction:** universal Stage 5 unlock at this scene. The Stage 5 asset is shared across all outcomes.
- **Next scene:** `c5-basil-asks-for-change`.
- **B1 language goal:** shock, recognition, “What does this mean?”, “I do not understand”, and describing visible evidence.
- **Source note:** Chapter XIII's recognition of the portrait and Basil's emotional reaction, compressed and non-graphic.
- **Safeguarding note:** no gore, no corpse language, no violent event; the warning is not needed at the reveal.

### `c5-basil-asks-for-change` — Basil Asks for Change

- **Kind:** narrative.
- **Setting:** the old schoolroom after the reveal.
- **Literary position:** Chapter XIII's prayer/repentance appeal before Dorian's hatred hardens.
- **Content:** Basil says that the portrait is evidence of a life, not proof that change is impossible. He admits his own part in idealising Dorian but does not take responsibility away from Dorian. He asks for honesty, responsibility, and a decision to change.
- **Characters:** Basil and Dorian.
- **Entry conditions:** only after `c5-basil-sees`; the witness is now irreversible.
- **Conditional variants:** `self-examining` Dorian notices specific details but may still resist; `divided` Dorian shifts between public defence and private fear; `pleasure-as-escape` Dorian reaches for aesthetic language. Sibyl continuity remains brief and factually correct.
- **Decision:** none; Basil's appeal must be heard before Dorian answers it.
- **Numeric effects:** none.
- **Story facts:** none.
- **Portrait interaction:** Stage 5 remains; later text must treat Basil as a witness.
- **Next scene:** `c5-after-the-truth`.
- **B1 language goal:** persuasion, responsibility, “You can still…”, “It is not too late to…”, and acknowledging partial blame without claiming total causation.
- **Source note:** Chapter XIII's appeal to repentance and Basil's admission that he worshipped Dorian too much.
- **Safeguarding note:** Basil is emotionally invested and morally disturbed, not a perfect teacher, police officer, or saint.

### `c5-after-the-truth` — After the Truth

- **Kind:** choice; Decision III.
- **Setting:** old schoolroom, after Basil's appeal.
- **Literary position:** Chapter XIII's turn from sorrow and prayer to Dorian's anger and blame.
- **Content:** Dorian chooses whether to listen and answer, blame the portrait and its maker, or reject Basil's judgement. Each option makes its motivation understandable; none is a simple good/neutral/evil button.
- **Characters:** Dorian and Basil.
- **Entry conditions:** only after the universal witness and Basil's appeal.
- **Conditional variants:** profile and yellow-book response colour the language of blame or self-defence; Basil's prior suspicion changes how much he asks, not what he knows.
- **Decision:** `listen-and-answer`, `blame-the-portrait-and-basil`, or `reject-his-judgement`.
- **Numeric effects:** listen `conscience +1`; blame `conscience -1, portrait +1`; reject `reputation +1, conscience -1, portrait +1`. No numeric value decides the outcome.
- **Story facts:** none; record choice history only.
- **Portrait interaction:** Stage 5 remains visible in the side panel and scene context.
- **Next scene:** `c5-final-response`.
- **B1 language goal:** blame, refusal, listening, “You cannot blame…”, “I should have…”, and responsibility.
- **Source note:** Chapter XIII's argument after Basil sees the portrait, with interactive alternatives.
- **Safeguarding note:** coercive or threatening language must be clear enough to signal risk, but not abusive, graphic, or sensational.

### `c5-final-response` — The Final Response

- **Kind:** choice; Decision IV and finite outcome resolver.
- **Setting:** the locked room at the confrontation's final threshold.
- **Literary position:** compressed point immediately before Chapter XIII's canonical violent end.
- **Content:** Dorian chooses to accept Basil's limited help, end the conversation and separate, or silence the witness. The third option is explicitly threatening in B1 language so the player understands that control may become dangerous.
- **Characters:** Dorian and Basil.
- **Entry conditions:** only after Decision III; `portraitStageUnlock = "stage-5"`.
- **Conditional variants:** the resolver reads the four local choices; profile changes prose pressure only; `basilSuspicion` changes Basil's readiness; no prior fact alone forces an outcome.
- **Decision:** `accept-basil-help`, `end-the-conversation`, or `silence-the-witness`.
- **Numeric effects:** optional context effects only; never use them as thresholds. Suggested: help `conscience +1`; separate `reputation -1`; silence `conscience -1, portrait +1`.
- **Story facts:** the resolver writes exactly one `basilOutcome` value. No `basilKilled`, `violenceMeter`, or witness fact.
- **Portrait interaction:** Stage 5 is already unlocked; the portrait remains the witness that Basil saw.
- **Next scene:** `c5-after-the-door` for all outcomes.
- **B1 language goal:** persuasion, boundary-setting, threat recognition, “If you leave…”, consequences, and choosing a response under pressure.
- **Source note:** Canonical violence is represented as a possible consequence of the Chapter XIII escalation; survival routes are labelled interactive alternatives.
- **Safeguarding note:** the dangerous option must never look harmless, and the route must not teach a method of violence.

### `c5-after-the-door` — After the Door

- **Kind:** ending; shared outcome scene with conditional paragraphs.
- **Setting:** the old schoolroom and the house after the confrontation; no disposal or investigation sequence.
- **Literary position:** Chapter XIII's immediate endpoint, compressed before Chapter VI. Chapter XIV is explicitly outside the boundary.
- **Content:** `dead-canonical` uses a narrative break and states the death factually; `alive-separated` records that Basil leaves alive but the former trust is broken; `alive-helping` records that Basil remains present as a difficult, limited witness. All variants state that Basil saw the portrait.
- **Characters:** Dorian and Basil in the immediate aftermath; no new character is needed.
- **Entry conditions:** `basilOutcome` must be resolved; Stage 5 must already be unlocked.
- **Conditional variants:** exact outcome, Chapter IV profile, and Sibyl continuity alter a few sentences. `dead-canonical` has the conditional content warning. No variant may reopen the rumour conversation as if Basil had not witnessed the truth.
- **Decision:** none; this is the ending and Chapter VI handoff.
- **Numeric effects:** none. Death, survival, and Stage 5 are facts, not numeric thresholds.
- **Story facts:** preserve `basilOutcome`; preserve all existing facts; do not add cleanup facts.
- **Portrait interaction:** Stage 5 remains the shared current state; no route-specific Stage 5 art.
- **Next scene:** none in Chapter V. A future handoff may offer Chapter VI, but this milestone does not implement it.
- **B1 language goal:** consequences, loss, separation, limited help, and “I cannot undo…” / “You are responsible for…”.
- **Source note:** Chapter XIII's immediate consequence, school-adapted and separated from the procedural Chapter XIV aftermath.
- **Safeguarding note:** no graphic violence, body-disposal content, forensic detail, or instructions. The canonical death is factual and restrained.

## 9. Stage 5 proposal

### 9.1 Unlock timing options

| Model | Unlock point | Advantage | Problem |
| --- | --- | --- | --- |
| A — witness | `c5-basil-sees` | Makes the witness event the visual milestone; universal and easy to test. | Stage 5 appears before Basil's final response, so it represents exposure rather than the final consequence. |
| B — confrontation end | `c5-after-the-door` | Combines exposure and emotional consequence in one end-state. | Weakens the moment Basil sees the truth and makes the portrait appear to wait for an outcome. |
| C — outcome-sensitive | Different Stage 5 art by Basil outcome. | Could show canonical violence more strongly. | Creates route-specific assets, visual branching, and an implication that the portrait's truth is different depending on Basil's survival. |

**Recommendation: Model A.** Stage 5 unlocks universally when Basil sees the portrait. This preserves the narrative meaning of “truth is finally witnessed,” avoids a numeric threshold, and gives Chapter VI a stable visual starting point regardless of outcome.

### 9.2 Visual boundary

Stage 5 should be substantially worse than Stage 4 but still leave room for the final Stage 6:

- clearer premature ageing and deeper lines;
- harder, more exhausted eyes;
- stronger asymmetry and a more severe mouth;
- visibly damaged beauty and less harmony;
- one restrained, route-independent sign of moral collapse only if it remains human and non-graphic.

Stage 5 must not be corpse-like, demonic, decomposed, gore-heavy, totally elderly, or the final monster state. Blood or a wound is omitted even where it might be literary-faithful, because it would make one shared classroom asset graphic and route-dependent.

### 9.3 One shared asset

Recommend one asset, `portrait-dorian-stage-5.webp`, for both the canonical death route and the survival routes. It represents the accumulated truth of Dorian's life becoming visible to another person, not a literal illustration of Basil's fate. Separate route-specific portrait art is not justified at this stage.

P0 remains one future portrait asset only. The existing `location-dorians-house.webp` and `location-secret-room.webp` are sufficient for the scene spine.

## 10. Persistent-state proposal

The absolute minimum future contract is:

```js
storyFacts: {
  // existing facts unchanged
  portraitStageUnlock: "stage-3" | "stage-4" | "stage-5" | null,
  basilOutcome: "dead-canonical" | "alive-separated" | "alive-helping" | null
}
```

Future implementation work would need to:

1. add `basilOutcome` to `STORY_FACT_KEYS` and `STORY_FACT_DEFAULTS`;
2. allow `stage-5` in the existing `portraitStageUnlock` list;
3. retain save v2 and keep v1 migration safe, unless testing proves a new version necessary;
4. add Chapter V metadata and a future Chapter VI requirement for `basilOutcome` and `portraitStageUnlock`;
5. write `basilOutcome` exactly once through the final outcome resolver;
6. keep the warning choice outside the save.

No `portraitWitness`, `basilAlive`, `basilKilled`, `basilRelationship`, `murderCount`, or violence counter is approved.

## 11. Numeric-state assessment

Keep the established ranges unchanged:

- Reputation: `-3..3`;
- Conscience: `-3..3`;
- Portrait: `0..3`.

Numeric effects may colour later prose and state-panel context. They must not decide:

- whether Basil lives or dies;
- whether Basil saw the portrait;
- whether Stage 5 unlocks;
- whether Dorian repents;
- whether Chapter VI becomes available.

The witness event and Basil outcome are declarative story facts; the resolver's local stance pattern is explicit and inspectable.

## 12. Chapter VI handoff requirements

Without designing Chapter VI, its minimum reliable inputs are:

- `completedChapters["chapter-5"] === true`;
- `storyFacts.basilOutcome`;
- `storyFacts.portraitStageUnlock === "stage-5"`;
- the four Chapter V choice records, if Chapter VI needs to refer to the confrontation pattern;
- existing `sibylOutcome`, `sibylRelationship`, and `c2FinalResponse`;
- the derived Chapter IV behaviour profile from the existing history;
- current numeric values only as context.

Chapter VI must be able to ask its final question whether Basil is dead, separated, or helping. The canonical route may acknowledge loss, secrecy, guilt, and responsibility, but it must not import Chapter XIV disposal gameplay into Chapter V.

## 13. B1 English goals

The chapter's language goals are:

- confronting rumours: “People say that…”, “What have you actually seen?”;
- accusation and denial: “I do not believe them, but…”, “That is not the question.”;
- partial admission: “I have hidden this”, “I should have told you”;
- shock and evidence: “What does this mean?”, “I know that face”;
- responsibility: “I am responsible for…”, “You cannot blame…”;
- persuasion: “You can still…”, “It is not too late to…”;
- consequences: “I cannot undo…”, “The truth has changed what we are”;
- boundaries and danger: “If you leave…”, “You must not speak of this”;
- asking someone to change without becoming a lecture.

Dialogue should remain dramatic and short. The structures are language goals, not exercise prompts inserted into the story.

## 14. Teacher mode proposal

### Learning goals

- follow a difficult friendship conversation in accessible B1 English;
- distinguish evidence, rumour, denial, and accusation;
- identify the moment private truth becomes witnessed truth;
- describe shock, persuasion, blame, responsibility, and consequence;
- distinguish Wilde's canonical Basil confrontation from interactive survival alternatives;
- discuss sensitive material without reproducing graphic violence.

### Vocabulary

`rumour`, `evidence`, `deny`, `accuse`, `reputation`, `witness`, `reveal`, `recognise`, `horror`, `responsibility`, `repent`, `blame`, `threat`, `boundary`, `consequence`, `separate`, `help`, `survive`, `dead`, `truth`.

### Comprehension

1. Why does Basil confront Dorian?
2. Why does Basil find the rumours difficult to believe at first?
3. What has Basil actually seen before entering the locked room?
4. Why does Dorian offer to show Basil the portrait?
5. What does Basil understand when he sees it?
6. How does Basil ask Dorian to change?
7. How does Dorian respond to responsibility and blame?
8. Which events are canonical, and which survival outcomes are clearly marked interactive alternatives?

### Discussion

1. Is seeing evidence the same as understanding a person?
2. Why does Dorian want Basil to see the portrait?
3. Can Basil help Dorian after seeing the truth?
4. When does blame become a way of avoiding responsibility?
5. Does knowing a secret create responsibility for the witness?
6. Should the game allow Basil to survive even though Wilde's novel does not?
7. How does a content warning change the way a class reads the canonical route?
8. What is the difference between a boundary and an attempt to control another person?

Teacher mode must label `alive-separated` and `alive-helping` as non-canonical survival outcomes. It must not describe them as hidden versions of Wilde's plot.

## 15. School suitability and safeguarding boundaries

Chapter V can remain teachable for approximately ages 15–19 if the implementation follows these boundaries:

- violence is route-specific, warned, non-graphic, and described through a narrative break;
- the factual death consequence is retained so the canonical literary event is not falsified;
- there is no graphic stabbing, wound, blood, body, corpse, or forensic detail;
- there are no disposal instructions, servant-deception steps, investigation mechanics, or procedural concealment;
- threats and coercive language are short, clearly signalled, and never presented as clever or consequence-free;
- rumours remain non-specific and avoid reproducing the novel's sensational catalogue;
- Basil remains a frightened, caring, morally urgent friend, not an avatar for the teacher;
- survival alternatives are explicit interactive extensions and never overwrite the canonical label;
- the warning is not used as a moral judgement on students who choose any route;
- the teacher-facing note explains why the warning exists and how to discuss the route factually.

## 16. Visual asset plan

### P0

- `assets/portraits/portrait-dorian-stage-5.webp` — one shared 4:5 Dorian portrait, non-graphic and clearly between Stage 4 and Final Stage 6.
- Reuse `assets/locations/location-dorians-house.webp` for the fog/library approach.
- Reuse `assets/locations/location-secret-room.webp` for the locked-room and witness scenes.

### P1, not required for this blueprint

- `character-basil-hallward-confrontation.webp` could improve a future scene card, but it is not required for comprehension and must not be generated or integrated in Milestone 5A.
- A foggy London exterior is optional only if later browser QA demonstrates that the opening cannot be understood through text, labels, and the existing house visual.

The current asset manifest lists future Basil and London assets as planned entries, but they are not current runtime assets. This blueprint does not treat those entries as generated or integrated artwork.

## 17. Branch-control strategy

Keep one shared ten-scene spine. Four three-option decisions produce:

```text
3 × 3 × 3 × 3 = 81 local Chapter V paths
```

This is small enough for exhaustive local testing. It must not be multiplied naively by every historical Chapter I–IV click path. The full input space should be handled through equivalence classes:

- three `basilSuspicion` values;
- three Chapter IV behaviour profiles;
- three Sibyl outcomes;
- three yellow-book responses;
- representative numeric extremes;
- all 81 local Chapter V combinations.

These are narrative dimensions, not separate complete routes. The universal reveal, one outcome fact, and short conditional paragraphs prevent a combinatorial scene tree.

## 18. Testing strategy

### 18.1 Static and schema checks

Future implementation tests should verify:

- exactly ten Chapter V scenes and four decision scenes;
- all scene IDs and targets exist;
- Chapter V cannot begin before Chapter IV completion and its existing facts;
- no Chapter IV scene says Basil saw the portrait;
- no Chapter V route bypasses `c5-basil-sees`;
- `basilOutcome` accepts only the three approved values;
- `portraitStageUnlock = "stage-5"` is written only by the universal witness event;
- no new witness, murder, violence, or Basil-relationship fact exists;
- all glossary terms have definitions;
- all canon/alternative and warning metadata is present.

### 18.2 Local exhaustive coverage

Run all 81 combinations of the four Chapter V decision sets from one valid Chapter IV handoff. For every path, assert:

- all ten scenes are visited in shared order;
- exactly four Chapter V choice records are added;
- the portrait witness scene is visited;
- Stage 5 is unlocked before the final scene;
- exactly one `basilOutcome` is resolved;
- Chapter V completes only at `c5-after-the-door`;
- Chapter VI remains unavailable in this milestone's implementation boundary.

### 18.3 Outcome and continuity matrix

Cover:

- every resolver branch: `dead-canonical`, `alive-separated`, and `alive-helping`;
- every `basilSuspicion` value;
- all three Chapter IV behaviour profiles;
- all three Sibyl outcomes;
- all three yellow-book responses;
- representative high and low numeric values, including `Reputation = -3/3`, `Conscience = -3/3`, and `Portrait = 0/3`;
- the dangerous final option with both an escalating and a non-escalating earlier pattern;
- the `admit-partial-truth` barrier case;
- the profile/prose cases showing that profile does not decide the outcome.

### 18.4 Portrait, save, and warning boundaries

Test:

- Stage 4 before `c5-basil-sees`;
- Stage 5 immediately after `c5-basil-sees`;
- save/reload before the reveal;
- save/reload after the reveal but before the final response;
- save/reload after `basilOutcome` resolves;
- current v1 and v2 saves without `basilOutcome` remain readable;
- a future v2 save with unknown Basil values normalises safely;
- warning `continue`, `skip`, and `pause` do not alter the outcome fact;
- `skip` omits only marked sensitive text and retains the factual death consequence;
- the warning appears only for `dead-canonical`.

## 19. Technical risk audit

### New fact and save v2

Risk: adding a fact can widen the save contract or break old saves.

Recommendation: add only `basilOutcome`, extend the allow-list safely, keep v1 migration, and test saves at the pre-reveal, post-reveal, and post-outcome boundaries. Do not implement in this milestone.

### Universal witness event

Risk: later text accidentally treats the portrait as unseen.

Recommendation: make `c5-basil-sees` a required shared target and test every local path. Do not add a redundant `portraitWitness` fact.

### Stage 5 extension

Risk: Stage 5 is confused with numeric Portrait or a morality score.

Recommendation: follow the existing explicit `portraitStageUnlock` architecture and unlock at the universal witness event. Add one shared asset later with fallback safety.

### Outcome resolver

Risk: a single click hides a death route or a huge branch tree becomes untestable.

Recommendation: use four visible decisions and the small rule table in Section 7. Do not use numeric thresholds or a global violence meter.

### Conditional warning

Risk: a warning is shown too early, or skip removes the canonical fact.

Recommendation: resolve `basilOutcome` before the shared ending warning, condition the warning on `dead-canonical`, mark only the transition sentence sensitive, and retain the factual outcome sentence outside the sensitive segment.

### Teacher mode

Risk: a playable chapter is not teachable or alternatives are mistaken for canon.

Recommendation: add comprehension, discussion, goals, vocabulary, scene map, decision map, literary basis, safeguarding, and explicit canon/alternative labelling together in a future implementation milestone.

### Chapter VI handoff

Risk: Chapter VI assumes Basil is alive, dead, or unaware without checking.

Recommendation: require `basilOutcome` and Stage 5, preserve the four Chapter V choices for interpretation, and keep Chapter VI unavailable until its own blueprint and implementation are approved.

## 20. Approved implementation contract

The following boundaries are approved and are implementation requirements, not open owner questions:

1. `basilOutcome` uses exactly `null`, `dead-canonical`, `alive-separated`, or `alive-helping`.
2. Basil sees the changed portrait on the universal shared spine at `c5-basil-sees`; no valid Chapter V route bypasses that witness event.
3. Stage 5 unlocks universally at `c5-basil-sees`. Basil's gaze witnesses already-accumulated damage and does not cause the portrait transformation.
4. One route-independent Stage 5 portrait asset is required; Basil art, fog art, and other new Chapter V artwork are deferred.
5. The content warning appears only on the canonical `dead-canonical` ending, with the existing continue/skip/pause semantics.
6. Chapter V ends at immediate consequence and the Chapter VI handoff; Chapter XIV disposal, investigation, forensic, servant-deception, and other procedural aftermath are excluded.
7. Existing location assets may be reused cautiously only where their scene meaning remains compatible.
8. `basilOutcome` is the only new persistent Chapter V story fact. Do not add `portraitWitness`, `basilKilled`, `basilAlive`, `basilRelationship`, `murderCount`, `threatLevel`, or `violenceMeter`.

## 21. Verification and scope stop

This blueprint was checked against the current Chapter IV state contract, its actual ending invariant, the save v2 normalisation rules, the current warning resolver, the existing Stage 3/4 portrait mapping, and the 1891 Chapter XII/XIII chronology.

The proposed chronology does not leak Chapter XIV disposal or investigation material into Chapter V. It preserves the meaning of `basilSuspicion`, keeps Sibyl and the yellow book as continuity colour rather than new routes, and keeps Chapter IV behaviour derived and non-persistent.

The only file created by Milestone 5A is this blueprint. After the current automated suite and `git diff --check` are run, work stops. No runtime, save, asset, Chapter VI, commit, push, or deploy change is part of this milestone.
