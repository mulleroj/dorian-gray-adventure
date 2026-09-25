# DORIAN GRAY — MILESTONE 3A

## Chapter III: The Changing Portrait — Narrative Architecture

**Status:** design only. Chapter III is not implemented by this document.

This blueprint was prepared from the current workspace, not from earlier handoff summaries. It does not add Chapter III data, modify the engine, change existing story data, add or generate assets, change portrait thresholds, commit, push, or deploy.

The central question is:

> **What do you do when the truth about you can be seen?**

The chapter should make secrecy an active choice rather than a simple “good” or “bad” route. The portrait is a witness and a visual consequence. It is not a morality meter, and it must not decide whether Sibyl lived or died.

---

## 1. Verified project state

### 1.1 Current architecture

The project is a static, offline-capable, data-driven B1 English-learning adventure. There is no backend, account, database, AI API, or runtime image generation.

The relevant current flow is:

```text
story-data.js
   -> game-engine.js -> ui.js -> index.html
   -> narrative-resolver.js
game-state.js -> localStorage
```

The current save key is `dorian-gray-portrait-secret-save-v2`. Version 1 saves remain readable and are normalised into version 2. The save currently contains:

```js
{
  version: 2,
  sceneId,
  activeChapterId,
  reputation,
  conscience,
  portrait,
  flags,
  storyFacts,
  choices,
  visitedScenes,
  completedChapters,
  startedAt,
  updatedAt,
  chapterComplete
}
```

The existing resolver supports declarative `flag`, `choice`, `storyFact`, minimum numeric values, `all`, `any`, and `not`. Conditional prose is read-only. Unknown conditions are false and story data cannot execute JavaScript.

The current baseline test run passed **21/21 tests**, including all 288 Chapter I + Chapter II combinations, v1 migration, story facts, content warnings, chapter completion, and portrait thresholds.

### 1.2 Chapter II → Chapter III handoff

Chapter II is currently a playable nine-scene route:

```text
c2-theatre-lights
  -> c2-prince-charming
  -> c2-many-heroines
  -> c2-tell-basil-henry
  -> c2-offstage-sibyl
  -> c2-engagement
  -> c2-final-performance
  -> c2-backstage-choice
  -> c2-the-morning-after
```

Entering `c2-the-morning-after` resolves the two qualitative facts below. The ending marks `completedChapters["chapter-2"] = true`; there is currently no Chapter III metadata, scene, unlock flow, or handoff.

The Chapter III design must therefore begin only after:

```text
completedChapters["chapter-2"] === true
storyFacts.sibylRelationship !== null
storyFacts.sibylOutcome !== null
storyFacts.c2FinalResponse !== null
```

The Chapter III opening should read the saved state. It must not reset Chapter I or Chapter II values and must not infer Sibyl's status from `Reputation`, `Conscience`, `Portrait`, or a single choice.

### 1.3 The eight actual Chapter I entry states

The current tests verify these exact end states after Chapter I. They are continuity classes for Chapter III, not eight separate chains.

| Path | Chapter I choices | Reputation | Conscience | Portrait | Stored flags |
|---:|---|---:|---:|---:|---|
| 1 | listen to Henry / ask about youth / study portrait | 2 | -3 | 3 | `heardHenry`, `acceptedIdea`, `studiedPortrait` |
| 2 | listen to Henry / ask about youth / turn away | 3 | -1 | 2 | `heardHenry`, `acceptedIdea`, `avoidedPortrait` |
| 3 | listen to Henry / question Henry / study portrait | 0 | -1 | 2 | `heardHenry`, `challengedHenry`, `studiedPortrait` |
| 4 | listen to Henry / question Henry / turn away | 1 | 1 | 1 | `heardHenry`, `challengedHenry`, `avoidedPortrait` |
| 5 | defend Basil / ask about youth / study portrait | 1 | -1 | 2 | `defendedBasil`, `acceptedIdea`, `studiedPortrait` |
| 6 | defend Basil / ask about youth / turn away | 2 | 1 | 1 | `defendedBasil`, `acceptedIdea`, `avoidedPortrait` |
| 7 | defend Basil / question Henry / study portrait | -1 | 1 | 1 | `defendedBasil`, `challengedHenry`, `studiedPortrait` |
| 8 | defend Basil / question Henry / turn away | 0 | 3 | 0 | `defendedBasil`, `challengedHenry`, `avoidedPortrait` |

The Chapter I flags currently present are:

```text
heardHenry
defendedBasil
acceptedIdea
challengedHenry
studiedPortrait
avoidedPortrait
```

There is no current flag saying that Basil has seen the portrait, that the portrait is in a secret room, or that anybody knows its secret.

### 1.4 Chapter II continuity values

Chapter II creates these additional boolean flags depending on the player's choices:

```text
c2RoleFirst
c2PersonSeen
c2PublicIdealisation
c2PublicPersonhood
c2RespectfulPromise
c2EngagementAnnounced
c2RoleIdealisation
c2GrandPromise
c2FinalCruel
c2FinalListen
c2FinalDelay
```

The approved scalar facts and their actual resolver are:

| Fact | Values | Actual meaning |
|---|---|---|
| `sibylRelationship` | `role-first`, `mixed`, `person-first` | cumulative relationship emphasis, not a morality score |
| `sibylOutcome` | `dead-canonical`, `alive-estranged`, `alive-together` | resolved status carried into future chapters |
| `c2FinalResponse` | `cruel`, `listen`, `delay` | Dorian's response after the final performance |

The resolver currently works as follows:

- `role-first` requires `admire-the-roles`, `tell-beautiful-story`, and `stay-inside-the-dream`.
- `person-first` requires `ask-about-sibyl` plus either `defend-the-person` or `listen-to-her-life`.
- all other combinations are `mixed`.
- `role-first` plus `cruel` resolves to `dead-canonical`.
- `person-first` plus `listen` plus `c2RespectfulPromise` resolves to `alive-together`.
- every other combination resolves to `alive-estranged`.

This means `alive-together` is already bounded by cumulative person-first choices and a respectful promise. It must not be rewritten as a happy ending in Chapter III.

### 1.5 History and completion

At the end of a normal Chapter II route:

- `choices` contains the three Chapter I choices and four Chapter II choices;
- `visitedScenes` contains every linear scene once;
- `activeChapterId` is `chapter-2`;
- `chapterComplete` is `true`;
- `completedChapters["chapter-1"]` and `completedChapters["chapter-2"]` are `true`;
- the complete Chapter I and Chapter II history remains available to conditional prose and Teacher mode.

Chapter III should append to this history. It should not replace it with a new chapter-local save or a derived summary.

### 1.6 Current Portrait behaviour and maximum consequences

The current numeric ranges are:

```text
Reputation: -3 to 3
Conscience: -3 to 3
Portrait:   0 to 3
```

The current mapping is the engine and viewer source of truth:

```text
Portrait 0     -> Stage 0
Portrait 1     -> Stage 1
Portrait 2–3   -> Stage 2
```

Chapter II can add portrait pressure in several choices. `applyEffects` clamps the stored value at 3. Therefore, when a Chapter II choice would add pressure to a save already at `Portrait = 3`, the numeric consequence is saturated at 3: no data is lost, but no additional visible stage appears. The choice history, flags, `c2FinalResponse`, relationship outcome, and chapter completion still persist normally.

This saturation is important. Chapter II does not secretly create Stage 3, and a value of 3 currently still renders Stage 2. The Chapter III proposal below preserves this behaviour for existing saves.

---

## 2. Verified literary basis: Oscar Wilde, 1891 edition

The primary reference is the 1891 book edition on Wikisource, not the 1890 magazine version, a film adaptation, or a modern retelling.

### 2.1 Chapter IX — Basil's visit

Chapter IX begins with Basil visiting Dorian at breakfast the morning after Sibyl's death. Basil is genuinely distressed, asks where Dorian was, asks about Sibyl's mother, and expects grief to be present. Dorian instead reports going to the Opera and tries to make the subject disappear through language and control.

Basil explicitly contrasts Dorian's former simplicity and affection with his present lack of pity, and identifies Henry's influence. Dorian admits Henry's influence, but also asks Basil not to abandon their friendship. Basil's concern is therefore not a tutorial lecture: it is grief, loyalty, artistic memory, and fear that a friend has changed.

Later in the same conversation Basil notices the screened portrait and asks to see his own work. Dorian physically prevents him from looking. The chapter ends with Dorian deciding that the portrait must be hidden because friends have had access to it.

Primary text: [Wilde, *The Picture of Dorian Gray* (1891), Chapter IX](https://en.wikisource.org/wiki/The_Picture_of_Dorian_Gray_(1891)/Chapter_9).

### 2.2 Chapter X — the old schoolroom and the locked secret

Chapter X turns the fear into an action. Dorian worries that his servant may have looked behind the screen, obtains the key to the old schoolroom, chooses a rich cover for the canvas, and has frame-makers carry the covered portrait upstairs. The schoolroom is dusty and connected with Dorian's childhood and unhappy family memories.

The portrait's expression is now experienced as cruelty and judgement. Dorian thinks Basil could have helped him resist Henry, but he chooses concealment. The old schoolroom becomes a literal private room for a secret that he intends to control.

Primary text: [Wilde, *The Picture of Dorian Gray* (1891), Chapter X](https://en.wikisource.org/wiki/The_Picture_of_Dorian_Gray_(1891)/Chapter_10).

### 2.3 Chapter X to Chapter XI — the corrected yellow-book chronology

The yellow-bound book arrives after the portrait has been locked away, still within Chapter X. Dorian returns downstairs, receives Henry's note and the book, begins reading it, and later meets Henry at the club. The book is therefore part of the immediate Chapter III bridge, not an event first introduced in Chapter XI.

Chapter XI begins with the long-term statement that Dorian remains under the book's influence for years. It is the literary basis for the lasting effect of the book, repeated visits to the locked portrait, public innocence, and private corruption—not for the book's initial delivery.

For this game, the book belongs at the end of Chapter III as a hook toward Chapter IV, *A Life of Pleasure*. It should not turn Chapter III into a catalogue of aesthetic objects or a full treatment of Dorian's later hedonism.

Primary text: [Wilde, *The Picture of Dorian Gray* (1891), Chapter XI](https://en.wikisource.org/wiki/The_Picture_of_Dorian_Gray_(1891)/Chapter_11).

### 2.4 Canon, game extension, and Sibyl continuity

| Element | Status in the 1891 text | Treatment in Chapter III |
|---|---|---|
| Basil visits Dorian after the Sibyl aftermath | Canonical | Shared dramatic spine; dialogue rewritten for B1 English |
| Basil and Dorian disagree about grief and responsibility | Canonical | Interactive short variants, not a Basil lecture |
| Basil notices the screened portrait | Canonical | Shared pressure point |
| Dorian prevents Basil from seeing it | Canonical | The core concealment decision is adapted, not quoted |
| Portrait is moved to an old schoolroom and locked away | Canonical | Shared room-establishing event |
| Dorian feels the portrait's judgement | Canonical | Expressed as visual-symbolic narrative, not a morality UI |
| Henry's influence continues | Canonical | Short returning voice and final hook |
| Henry's note and yellow-bound book arrive after the portrait is locked | Canonical in Chapter X | Corrected closing sequence and final decision |
| Dorian begins reading and later meets Henry at the club | Canonical in Chapter X | Optional brief reference after the book decision |
| Yellow book shapes Dorian's future over years | Canonical in Chapter XI | Long-term influence and small bridge into Chapter IV |
| Dorian can reveal, partly reveal, or delay the truth | Game extension | Limited choice variants that rejoin the spine |
| Sibyl survives | Game extension | Explicitly labelled interactive continuity, never Wilde's original plot |
| Sibyl remains alive but estranged or close under pressure | Game extension | Short letters, memories, or boundary-setting prose |

The canonical route must not claim that one player click mechanically caused Sibyl's death. The living routes must not be silently rewritten as death, and the canonical route must not be softened into “Sibyl left town.”

---

## 3. Chapter III dramatic and thematic design

The chapter is about what happens when a private truth becomes visible to another person. Its active tensions are:

- secret versus confession;
- shame versus self-justification;
- privacy versus dishonesty;
- Basil's trust versus Dorian's fear of being known;
- Henry's influence versus Dorian's responsibility for using it;
- public innocence versus private evidence;
- control of the room versus control of the self.

The portrait should not announce “good” or “bad.” It should show that Dorian can move, cover, reinterpret, or revisit the evidence. A player may choose an outwardly polite answer while increasing concealment, or speak honestly while still taking control of the room. Numeric effects should describe pressure and social presentation, not reward virtue.

---

## 4. Continuity classes and branch control

Chapter III enters from eight Chapter I states, three Sibyl outcomes, three relationship profiles, three final responses, and multiple numeric combinations. It should not create a separate story chain for each combination.

Use one shared spine with four small continuity dimensions:

| Continuity class | Values read by Chapter III | Purpose |
|---|---|---|
| Basil history | `defendedBasil` present or absent | warmth, trust, and the emotional cost of deflection |
| Henry history | `heardHenry`, `acceptedIdea`, `challengedHenry` | whether Henry's language sounds familiar, seductive, or contested |
| Portrait relationship | `studiedPortrait` or `avoidedPortrait`, plus current `portrait` | whether Dorian has already faced the image and how much pressure is carried |
| Sibyl status | `dead-canonical`, `alive-estranged`, `alive-together` | a few short variants about grief, distance, or boundaries |

Recommended rule:

```text
one Chapter III scene spine
  + short conditional prose
  + four decisions
  + one explicit secret-room event
  + one explicit portrait-stage unlock event
  + one closing Henry/yellow-book bridge
```

The player should feel that previous choices matter, but should not be forced to replay three complete chapters inside Chapter III.

---

## 5. Sibyl outcome handling

### 5.1 `dead-canonical`

Basil may refer to the girl's death, grief, Dorian's avoidance, or the way Dorian turns suffering into a story. He must not be reduced to a moral judge, and the chapter must not re-stage the method or the circumstances of Sibyl's death.

The portrait can make Basil's concern feel more serious, but it must not imply that the portrait itself caused the death. Dorian may deny, rationalise, or acknowledge responsibility for his response.

No new content warning is needed if the chapter only refers to the already-resolved aftermath in non-graphic language. A new warning would be required only if later implementation adds new sensitive material beyond grief and responsibility.

### 5.2 `alive-estranged`

Sibyl is alive and the relationship is damaged or ended. She must never be called dead. A short letter, report, or remembered boundary can establish that she has chosen distance. She need not appear as an active character in the chapter.

Basil's question can expose Dorian's temptation to describe an estrangement as if it were merely an artistic disappointment. The player should hear that survival has not erased harm.

### 5.3 `alive-together`

Sibyl is alive and remains connected to Dorian, but the relationship is conditional and not automatically happy. Her work, voice, ordinary life, and boundaries remain her own. A brief letter or remembered exchange can show closeness under pressure without making her a passive reward.

Dorian now has an especially difficult secret: he hides the portrait from someone who may be emotionally close to him. This raises the stakes of concealment without requiring Sibyl to participate in every scene.

### 5.4 Rejoining rule

All three routes return to the same central problem: Basil is near, the portrait is not safe in its current position, and Dorian must decide what secrecy will mean. Conditional prose changes interpretation and relationships; it does not clone the chapter.

---

## 6. Proposed scene spine

The proposal contains nine scenes. These are narrative architecture only; the IDs are reserved design names, not implementation instructions for this milestone.

### 6.1 `c3-morning-quiet` — Morning Without an Answer

- **Kind:** opening / transition.
- **Content:** The morning after Chapter II is ordinary on the surface. Dorian has completed Sibyl's arc, but the covered portrait remains a private pressure from earlier chapters. The scene establishes that the next problem is not “what happened to Sibyl?” but “what will Dorian do with what can still be seen?”
- **Characters:** Dorian; Basil is announced at the end. Sibyl appears only through a continuity-specific memory, letter, or absence.
- **Entry conditions:** `completedChapters["chapter-2"] === true`; all three existing Chapter II facts are resolved.
- **Conditional variants:**
  - `dead-canonical`: grief and responsibility are present without repeating the method or staging the death.
  - `alive-estranged`: a short reminder that Sibyl is alive but distant.
  - `alive-together`: a short reminder of a living relationship with boundaries.
  - `defendedBasil`: Basil's arrival feels like the return of an earlier trust.
  - no `defendedBasil`: Basil's arrival feels more difficult and less secure.
  - `portrait >= 2`: the covered image is described as an active pressure.
- **Decision:** none.
- **Numeric effects:** none.
- **Story facts:** none; do not invent a duplicate Sibyl fact.
- **Next scene:** `c3-basil-arrives`.
- **Language goals:** morning consequences, absence, ordinary, remain, avoid, remember.
- **Source note:** The breakfast-after-the-tragedy opening is based on Chapter IX. Living Sibyl variants are interactive alternatives and are not Wilde's plot.

### 6.2 `c3-basil-arrives` — Basil at Breakfast

- **Kind:** choice.
- **Content:** Basil arrives worried. He asks where Dorian was, what he knows, and whether Dorian has faced the consequences of the theatre. He is a friend and artist who wants access to Dorian's real feelings, not a teacher delivering a correct answer.
- **Characters:** Dorian and Basil.
- **Entry conditions:** linear after `c3-morning-quiet`; existing Chapter II facts must be non-null.
- **Conditional variants:** Basil is warmer if `defendedBasil` is present. If `heardHenry` or `acceptedIdea` is present, Basil recognises Henry's language. If Sibyl is alive, Basil asks about the damage rather than assuming death.
- **Decision: how does Dorian answer Basil's concern?**

| Choice | Immediate effect | Durable fact effect |
|---|---|---|
| `speak-plainly` | `Reputation -1`, `Conscience +1`, `Portrait 0` | `basilSuspicion = uneasy`; Basil trusts the answer but senses concealment remains |
| `repeat-the-explanation` | `Reputation +1`, `Conscience -1`, `Portrait +1` | `basilSuspicion = suspects`; Henry's framing is visibly active |
| `ask-for-trust` | `Reputation 0`, `Conscience 0`, `Portrait +1` | `basilSuspicion = uneasy`; friendship is invoked without full disclosure |

- **Story facts:** proposes the first value for `basilSuspicion`; no witness/knowledge fact is introduced.
- **Next scene:** `c3-basil-questions`.
- **Language goals:** “I should have…”, “You have to trust me,” excuses, responsibility, consequences.
- **Source note:** Basil's concern, Dorian's avoidance, and Henry's influence are adapted from Chapter IX; the three responses are interactive additions.

### 6.3 `c3-basil-questions` — What Basil Wants to Know

- **Kind:** narrative with conditional prose.
- **Content:** Basil asks what has changed. Dorian may hear an echo of the earlier studio friendship in Basil's request to see the Dorian he once knew. The scene makes clear that Basil's trust is a relationship, not a permission slip to inspect Dorian's private life.
- **Characters:** Dorian and Basil.
- **Entry conditions:** after `c3-basil-arrives`.
- **Conditional variants:**
  - `defendedBasil`: Basil says that Dorian once protected his work and asks whether trust can move in both directions.
  - no `defendedBasil`: Basil is careful and hurt; he does not assume the old intimacy is still available.
  - `basilSuspicion = suspects`: Basil notices that Dorian is watching the covered area rather than listening.
  - `dead-canonical`: Basil names grief and responsibility without graphic detail.
  - living outcome: Basil names the harm of turning a living woman's boundary into a private story.
- **Decision:** none; the next decision is triggered when Basil notices the screen.
- **Numeric effects:** none.
- **Story facts:** none.
- **Next scene:** `c3-behind-the-screen`.
- **Language goals:** ask difficult questions, explain feelings, “The truth is…”, “I cannot tell you because…”.
- **Source note:** Basil's request for the former Dorian and his concern about Henry are based on Chapter IX. The compact B1 dialogue is original.

### 6.4 `c3-behind-the-screen` — The Portrait Behind the Screen

- **Kind:** choice.
- **Content:** Basil notices that the portrait is screened or covered and asks to see his own work. Dorian must decide whether to face the image, let Basil come close without seeing it, or make a partial disclosure about the danger without showing the face.
- **Characters:** Dorian and Basil.
- **Entry conditions:** after `c3-basil-questions`.
- **Conditional variants:** `studiedPortrait` gives Dorian a more intimate memory of the painted warning; `avoidedPortrait` makes the first direct confrontation more avoidable and more frightening. High `basilSuspicion` makes Basil less casual about the screen.
- **Decision: how does Dorian respond to Basil's request?**

| Choice | Immediate effect | Durable fact effect |
|---|---|---|
| `face-the-image-alone` | `Reputation 0`, `Conscience +1`, `Portrait +1` | preserve `basilSuspicion`; Dorian faces the image but denies Basil access |
| `let-him-see-the-cover` | `Reputation -1`, `Conscience 0`, `Portrait 0` | `basilSuspicion = suspects`; Basil sees the concealment, not the painted face |
| `name-the-danger-without-showing-it` | `Reputation 0`, `Conscience +1`, `Portrait +1` | `basilSuspicion = clear`; Dorian names danger without showing the face |

No choice in this scene should show Basil the actual changed face. A full witness event belongs to a later approved confrontation chapter, not to Chapter III's first concealment.

- **Next scene:** `c3-the-expression`.
- **Language goals:** hiding, revealing, permission, suspicion, “If he sees it…”, “I do not want anyone to know…”.
- **Source note:** Dorian blocking Basil from the screened portrait is based on Chapter IX. The partial-disclosure options are game extensions.

### 6.5 `c3-the-expression` — The Face That Answers

- **Kind:** narrative / pre-unlock turning point.
- **Content:** Alone or briefly separated from Basil, Dorian looks at the portrait. He recognises the existing cruelty and altered expression already established by the current Stage 2 state. The image makes the remembered warning near the mouth and the difference between an explanation and an excuse feel more serious, but it does not yet display a clearly new state.
- **Characters:** Dorian; Basil remains nearby but does not see the face.
- **Entry conditions:** after `c3-behind-the-screen`.
- **Conditional variants:**
  - `portrait >= 2`: the existing warning is already legible and the new moment gives it emotional meaning.
  - `portrait <= 1`: the scene emphasises that concealment itself has made the existing image more threatening; it does not describe premature ageing or force a new asset.
  - `studiedPortrait`: the visual echoes the line near the mouth from Chapter I.
  - `avoidedPortrait`: Dorian is tempted to look away again.
- **Decision:** none in the base proposal; this is the shared observation required before the room decision.
- **Numeric effects:** none. The future Stage 3 unlock must not happen merely because this paragraph renders.
- **Story facts:** none.
- **Next scene:** `c3-the-old-schoolroom`.
- **Language goals:** expression, appearance, evidence, “I told myself that…”, comparison, fear.
- **Source note:** The existing altered expression and the portrait as judgement adapt Chapters IX–X. The newly unlocked Stage 3 is deliberately deferred until after the locked-schoolroom event. No morality-meter language should be used.

### 6.6 `c3-the-old-schoolroom` — The Room With a Key

- **Kind:** choice and shared physical transition.
- **Content:** Dorian decides what to do with the portrait. The old schoolroom is dusty, private, and connected to childhood memories. The scene should make concealment feel like a material act: a key, a cover, a staircase, a room, and a rule about who may enter.
- **Characters:** Dorian; housekeeper or frame-makers may be referenced briefly; Basil is not allowed to see the image.
- **Entry conditions:** after `c3-the-expression`.
- **Conditional variants:** `basilSuspicion = clear` makes the lie about the room more difficult. `defendedBasil` gives Dorian a stronger reason to regret excluding him. Living Sibyl routes may make the room feel especially dangerous because the secret is also kept from someone close.
- **Decision: why and how does Dorian hide it?**

| Choice | Immediate effect | Durable fact effect |
|---|---|---|
| `move-it-alone` | `Reputation +1`, `Conscience -1`, `Portrait +1` | `portraitLocation = locked-schoolroom`; `portraitStageUnlock = stage-3`; preserve the current `basilSuspicion` |
| `tell-basil-there-is-a-private-reason` | `Reputation -1`, `Conscience +1`, `Portrait +1` | `portraitLocation = locked-schoolroom`; `portraitStageUnlock = stage-3`; `basilSuspicion = clear` |
| `delay-but-keep-the-key` | `Reputation 0`, `Conscience 0`, `Portrait +1` | the scene still ends with `portraitLocation = locked-schoolroom`; `portraitStageUnlock = stage-3`; `basilSuspicion = clear` |

All three choices reach the locked room and universally unlock Stage 3. Their difference is the social meaning of the concealment, not whether the shared event or visual progression occurs. No minimum numeric Portrait value is required.

- **Next scene:** `c3-rules-of-secrecy`.
- **Language goals:** lock, cover, key, private, permission, “I must keep it safe,” “Nobody else can enter.”
- **Source note:** The schoolroom, cover, key, frame-makers, and move upstairs are based on Chapter X. The choice framing is an interactive expansion.

### 6.7 `c3-rules-of-secrecy` — Rules Around the Secret

- **Kind:** narrative with short conditional variants.
- **Content:** The portrait is now in the locked room and the explicit Stage 3 unlock is active. Dorian establishes practical rules: who may carry a key, what he will say if asked, and how often he will look. The first newly visible portrait state may be displayed here. It should expose the difference between privacy and deception without resolving it for the player.
- **Characters:** Dorian; Basil may leave or remain outside the room. Sibyl appears only through the outcome-specific continuity line.
- **Entry conditions:** `portraitLocation = locked-schoolroom`.
- **Conditional variants:**
  - `basilSuspicion = uneasy`: Dorian calls the secret private while Basil has noticed a change in him.
  - `basilSuspicion = suspects`: Basil has noticed the pattern but does not know what the portrait shows.
  - `basilSuspicion = clear`: Basil does not accuse him, but the friendship now contains an unanswered question.
  - `alive-estranged`: privacy is contrasted with another person's right to leave a damaged relationship.
  - `alive-together`: Dorian's secrecy is especially costly because closeness increases the expectation of honesty.
- **Decision:** none.
- **Numeric effects:** none.
- **Story facts:** derived state is now available for future chapters:
  - `portraitHidden = true` because `portraitLocation = locked-schoolroom`;
  - `secretRoomEstablished = true` for the same reason;
- `portraitStageUnlock = stage-3` is already present;
  - no `portraitWitness` or `sibylContact` is stored.
- **Next scene:** `c3-henrys-note`.
- **Language goals:** rules, trust, privacy, dishonesty, consequences, “Does hiding the portrait mean hiding the truth?”
- **Source note:** The locked room and Dorian's decision to keep the key are based on Chapter X. The explicit rules are original game structure.

### 6.8 `c3-henrys-note` — The Book That Was Waiting

- **Kind:** choice.
- **Content:** After the portrait has been locked away, Dorian returns downstairs. Henry's note and the yellow-bound book are waiting. Dorian begins reading and must decide how to respond to the influence arriving through the book. A brief optional reference may mention that he will later meet Henry at the club; Henry does not need to enter the house.
- **Characters:** Dorian; Lord Henry through his note, book, and remembered voice. Basil may be mentioned but need not remain present.
- **Entry conditions:** `portraitLocation = locked-schoolroom`; Chapter II complete.
- **Conditional variants:**
  - `heardHenry` or `acceptedIdea`: Henry's old language feels familiar and easy to reuse.
  - `challengedHenry`: Dorian hears the same argument as something he can question.
  - `basilSuspicion = clear`: Henry's offer becomes an attractive way to avoid the unanswered friendship problem.
  - `dead-canonical`: Henry can frame grief as something to outgrow; the text must preserve Dorian's responsibility rather than endorse the frame.
  - living outcomes: Henry may invite Dorian to turn relationship difficulty into an aesthetic story.
- **Decision: what does Dorian do with Henry's influence?**

| Choice | Immediate effect | Durable fact effect |
|---|---|---|
| `accept-the-book` | `Reputation +1`, `Conscience -1`, `Portrait +1` | `yellowBookResponse = accepted` |
| `question-the-book` | `Reputation -1`, `Conscience +1`, `Portrait 0` | `yellowBookResponse = questioned` |
| `use-it-as-an-escape` | `Reputation +1`, `Conscience 0`, `Portrait +1` | `yellowBookResponse = escape` |

These are not good/bad buttons. Accepting a book can be curiosity; questioning it can still leave Dorian lonely; using it as escape is a deliberate self-protective strategy.

- **Next scene:** `c3-the-book-on-the-table`.
- **Language goals:** influence, escape, fascination, question, accept, “I am afraid that…”, “I told myself that…”.
- **Source note:** Henry's note, the yellow-bound book's arrival after the locked-room event, Dorian beginning to read, and the later club meeting are based on Chapter X. Chapter XI supplies the long-term statement of the book's influence. The three responses are interactive additions and only prepare Chapter IV.

### 6.9 `c3-the-book-on-the-table` — A Book for the Next Life

- **Kind:** ending / bridge to Chapter IV.
- **Content:** The book rests on the table while the key to the schoolroom remains with Dorian. The chapter closes on two objects: one hides evidence, the other offers a story in which experience can be turned into style. The next chapter may begin with Dorian choosing how to live under both influences.
- **Characters:** Dorian; Henry and Basil appear only through remembered voices or short conditional lines.
- **Entry conditions:** after `c3-henrys-note`; all Chapter III required facts are present.
- **Conditional variants:**
  - `portraitLocation = locked-schoolroom`: the physical secret is established.
  - `basilSuspicion = suspects` or `clear`: Basil's unanswered suspicion remains a future pressure.
  - `yellowBookResponse = accepted`: fascination is the hook.
  - `yellowBookResponse = questioned`: the hook is ambivalence rather than surrender.
  - `yellowBookResponse = escape`: the hook is avoidance through aesthetic life.
  - all Sibyl outcomes: her status remains consistent and is not reopened.
- **Decision:** none. The book is a bridge, not a Chapter IV scene.
- **Numeric effects:** none beyond the selected Henry choice.
- **Story facts:** Chapter III facts remain persistent; `yellowBookResponse` is the handoff fact for Chapter IV.
- **Next scene:** none; mark Chapter III complete only in a later implementation milestone.
- **Language goals:** bridge, future, choice, consequence, private/public, “The truth is…”.
- **Source note:** The yellow-book hook follows Chapter X's immediate sequence; the contrast between public beauty, the locked room, and long-term influence is supported by Chapters X–XI. The Chapter IV handoff is original game architecture.

---

## 7. Decision points and design effects

The four decisions are deliberately different:

| Decision | Immediate problem | Long-term question |
|---|---|---|
| Basil's concern | Will Dorian answer a friend or manage the conversation? | Can trust survive a partial truth? |
| The screened portrait | Does Dorian face the evidence, protect it, or name danger without showing it? | Is privacy still honest when another person is being excluded? |
| The old schoolroom | How will Dorian convert fear into a physical rule? | Does control of the room become control of the self? |
| Henry's book | Will Dorian accept, question, or use influence as escape? | Can an attractive explanation become a way to avoid responsibility? |

The numeric deltas above are proposals only. They should be validated against the existing -3..3 and 0..3 clamps during implementation. The portrait delta should remain contextual pressure; a high value must never directly resolve a Sibyl outcome, unlock a moral label, or replace an explicit narrative event.

---

## 8. Basil continuity

Basil should have three short tonal profiles, not three Basil branches.

### 8.1 If `defendedBasil` is present

Basil can refer to earlier trust without claiming ownership:

> “You stood beside me once. I am not asking you to give me every private thought. I am asking whether I may believe what you tell me.”

Dorian's concealment should therefore feel like a conscious cost in an existing friendship.

### 8.2 If `defendedBasil` is absent

Basil remains caring but more cautious:

> “Perhaps I no longer know what you want from me. I would rather hear a difficult truth than be given a beautiful answer.”

The text must not punish the player for the Chapter I choice; it should make the relationship history legible.

### 8.3 Henry and Basil contrast

Basil sees a person and a work that may be harmed by secrecy. Henry sees a story that can be shaped. Neither should be a tutorial narrator. Basil's strongest function is to make Dorian's need for control emotionally expensive; Henry's strongest function is to make that control sound elegant.

### 8.4 Approved reveal boundary

Basil may notice the screen, understand that Dorian is concealing something, become increasingly suspicious, and see that Dorian reacts strongly to the portrait. Basil must not see the changed painted face in Chapter III. A future witness/knowledge fact is reserved for the later confrontation chapter in which another character actually sees the transformed portrait. Chapter III is about fear and the decision to hide, not yet the irreversible full reveal.

---

## 9. Portrait Stage 3 proposal

### 9.1 Current constraints

The current engine clamps `Portrait` to 0–3, maps 2–3 to Stage 2, and the viewer derives its asset from `portraitStage(state)`. Existing version 1 and version 2 saves therefore cannot distinguish a future Stage 3 from the current maximum.

The reserved manifest already names `portrait-dorian-stage-3.webp` for Chapter III, but the file does not exist and must not be created in Milestone 3A.

### 9.2 Evaluation of the three options

#### A. Extend the numeric Portrait range

**Advantages:** small change to the current numeric model; future pressure can progress from 3 to 4; old values 0–3 retain their meaning.

**Risks:** a numeric threshold alone could unlock Stage 3 during an arbitrary choice; it encourages treating Portrait as a hidden morality score; a future scene could accidentally produce a visible transformation before the story is ready.

**Assessment:** useful as a future pressure extension, unsafe as the only Stage 3 gate.

#### B. Add a separate persistent portrait-progress fact

**Advantages:** makes visual progression explicit; old saves safely default to `null`; Stage 3 can be unlocked by one approved narrative event; later stages can be added without reinterpreting every old numeric value.

**Risks:** a second progression system can drift from `Portrait`; the allow-list and viewer model must be extended; duplicate “portrait stage” concepts can confuse future content authors.

**Assessment:** semantically safe if the fact is an explicit unlock, not a second hidden score.

#### C. Combine numeric pressure with an explicit stage unlock

**Advantages:** preserves existing numeric pressure and all existing saves; keeps numeric pressure available for conditional prose; prevents Stage 3 from appearing before the locked-room event; supports Stage 4, 5, and final as explicit future milestones.

**Risks:** requires a small, carefully tested state contract; the explicit unlock must remain separate from the numeric pressure value.

**Assessment:** approved and recommended.

### 9.3 Recommended minimum safe change

Do not implement this now. The approved future model is:

```js
storyFacts: {
  // existing facts remain unchanged
  sibylRelationship: null,
  sibylOutcome: null,
  c2FinalResponse: null,

  // proposed future allow-listed fact
  portraitStageUnlock: null // "stage-3" only after the locked-schoolroom event
}
```

The future engine change should:

1. preserve `portraitStageForValue(0|1|2|3)` exactly for old saves;
2. keep `Portrait` as pressure, not the sole stage selector;
3. set `portraitStageUnlock = "stage-3"` in the same event that sets `portraitLocation = "locked-schoolroom"`;
4. make the viewer return Stage 3 only when that explicit fact is present;
5. leave `portraitStageUnlock` as `null` for all migrated old saves;
6. later extend the allow-list to `stage-4`, `stage-5`, and `stage-final` only through future approved chapters;
7. test old saves at Portrait 0, 1, 2, and 3 before and after the migration.

Stage 3 is universal for every valid Chapter III route after the locked-schoolroom event. There is no minimum numeric Portrait requirement. The numeric value remains useful for conditional prose and continuity, but it must never be an additional Stage 3 gate or an accidental side effect of a future threshold.

### 9.4 Stage 3 literary purpose

Stage 3 should be the first unmistakable change beyond the Chapter I warning and the Chapter II contextual pressure:

- unmistakably the same Dorian;
- no grotesque horror and no identity change;
- slightly reduced harmony in the face;
- a harder transition around the eyes and mouth;
- a trace of fatigue or premature age, but not an old man;
- an expression that suggests judgement, guardedness, or inward cruelty;
- the feeling that concealment has become an action with a cost.

Stage 2 is a warning that something is wrong. Stage 3 is the first visible evidence that Dorian has built a system around hiding it. It should not depict Sibyl, death, a literal demon, or a morality-meter symbol.

No prompt or image is included in this milestone.

---

## 10. Secret-room continuity facts

The current state has no portrait-location or Basil-suspicion fact. Do not add redundant booleans or a witness fact before the later full reveal. The approved compact schema is:

```js
storyFacts: {
  // existing approved facts
  sibylRelationship: null,
  sibylOutcome: null,
  c2FinalResponse: null,

  // proposed Chapter III facts
  portraitLocation: null,
  // "locked-schoolroom"

  basilSuspicion: null,
  // "none" | "uneasy" | "suspects" | "clear"

  portraitStageUnlock: null,
  // "stage-3"

  yellowBookResponse: null
  // "accepted" | "questioned" | "escape"
}
```

Recommended use:

- `portraitHidden` is derived as `portraitLocation === "locked-schoolroom"`.
- `secretRoomEstablished` is derived as `portraitLocation === "locked-schoolroom"`.
- `basilSuspicion` records Basil's reading of the concealment and can be used for short prose variants.
- existing `sibylOutcome` remains the authoritative alive/dead fact. Sibyl contact is derived, never duplicated in Chapter III:
  `dead-canonical -> none`, `alive-estranged -> distant`, `alive-together -> present`.
- `yellowBookResponse` is a small Chapter IV hook and not a Chapter III theme meter.
- no `portraitWitness` is stored. Basil never sees the changed painted face in this chapter; a future witness/knowledge fact belongs to the later full-reveal chapter.

The future normaliser must reject unknown values and unknown keys exactly as it currently rejects arbitrary `storyFacts` values. Old saves should receive `null` for all new facts.

---

## 11. Yellow-book bridge

The yellow book should appear after the portrait is locked, in the immediate aftermath of that event and the final scene. It should function as:

- a new fascination;
- a continuation of Henry's influence;
- a possible escape from responsibility into aesthetic experience;
- a clean hook toward Chapter IV, *A Life of Pleasure*.

It should not introduce the whole Chapter IV social world, a catalogue of objects, a new portrait stage by itself, or a new relationship meter. The final image should retain the contrast between the book on the table and the key to the locked room.

---

## 12. B1 English goals

### 12.1 Functional goals

Learners should be able to:

- describe a secret and explain why it is being kept;
- distinguish privacy from dishonesty;
- express suspicion and uncertainty;
- answer a difficult personal question;
- describe responsibility without claiming simple causation;
- explain a consequence;
- compare a public image with a private reality;
- accept, question, or resist another person's influence.

### 12.2 Target vocabulary

```text
secret, hide, reveal, cover, lock, key, private, public,
trust, suspicion, doubt, responsibility, excuse, consequence,
grief, ashamed, afraid, honest, distant, influence, escape,
portrait, expression, witness, room, rule, promise
```

### 12.3 Useful structures

```text
I cannot tell you because...
You have to trust me.
I should have...
If he sees it...
I am afraid that...
I do not want anyone to know...
The truth is...
I told myself that...
It is private, but...
I was responsible for my choice, even if...
```

The glossary should appear in the narrative only where it supports reading. Definitions should not interrupt Basil's emotional exchange or turn the locked-room scene into a vocabulary exercise.

---

## 13. Teacher mode material

### 13.1 Comprehension questions

1. Why does Basil visit Dorian at the beginning of the chapter?
2. What does Basil notice about Dorian's way of speaking and feeling?
3. Why does Dorian not want Basil to see the portrait?
4. What does the screen hide, and what does it reveal about Dorian's fear?
5. Why is the old schoolroom a meaningful place for the portrait?
6. Which rules does Dorian create around the secret?
7. How does Henry offer Dorian an escape from responsibility?
8. What is the difference between hiding an object and hiding the truth?

### 13.2 Discussion questions

1. Is hiding the portrait the same as hiding the truth?
2. Does privacy become dishonesty when another person is harmed?
3. Why is Basil dangerous to Dorian even though he wants to help him?
4. Can someone change if nobody can see the consequences?
5. Can Dorian be responsible without being the sole cause of every consequence?
6. Which is more powerful in this chapter: the key, the screen, or the book?
7. Does Henry control Dorian, or does Dorian use Henry's ideas to control himself?
8. How do the alive-estranged and alive-together routes change the meaning of secrecy?

### 13.3 Canon versus alternative explanation

Teacher mode should show a clear distinction:

| Discussion point | Canonical basis | Interactive extension |
|---|---|---|
| Basil's visit and concern | Chapter IX | short player-selected replies |
| Basil's fear that Dorian has changed | Chapter IX | continuity-sensitive Basil wording |
| Dorian blocks the portrait | Chapter IX | face / partial disclosure variants |
| Schoolroom and locked door | Chapter X | different social meanings of the same move |
| Henry's note, book, and influence | Chapter X for delivery and reading; Chapter XI for long-term influence | accept / question / escape decision |
| Sibyl survives | not Wilde's 1891 plot | explicit alternative continuity from Chapter II |

Teacher mode must not describe `alive-estranged` or `alive-together` as hidden versions of Wilde's ending. They are game alternatives.

### 13.4 How Chapter II changes Chapter III

- `dead-canonical`: Basil's concern is grief and responsibility; the chapter must avoid repeating the method of death.
- `alive-estranged`: Basil can challenge Dorian's attempt to treat a living person's distance as an aesthetic disappointment.
- `alive-together`: the secret is more dangerous because Dorian is hiding it from someone close to him.
- `defendedBasil`: Basil's trust has a warmer starting point and concealment costs more.
- no `defendedBasil`: Basil is still caring but less secure in the relationship.
- `studiedPortrait`: Dorian recognises the image's continuity with the earlier warning.
- `avoidedPortrait`: the locked-room choice is a stronger first act of direct concealment.
- `challengedHenry`: Henry's book can be questioned as a continuation of an old argument.
- `acceptedIdea` or `heardHenry`: Henry's influence has familiar language ready for reuse.

---

## 14. Visual asset plan

No image should be generated or added in Milestone 3A.

### P0 — approved for a future implementation

| Asset | Intended use | Reason it is necessary |
|---|---|---|
| `portrait-dorian-stage-3.webp` | portrait panel and viewer after the approved Stage 3 unlock | the milestone's first new portrait state; already reserved in the manifest |
| `location-secret-room.webp` | `c3-the-old-schoolroom` and/or `c3-rules-of-secrecy` | makes the locked room a persistent location rather than an abstract flag; already reserved in the manifest |
| `location-dorians-house.webp` | breakfast, Basil's visit, and transition to the upper room | provides the domestic setting for the Chapter IX–X material; already reserved in the manifest |

### P1 — useful only if the scene layout needs them

| Asset | Intended use | Scope rule |
|---|---|---|
| covered-portrait detail | screen / cover moment in `c3-behind-the-screen` | do not create if the existing portrait panel and prose can represent the cover safely |
| old-schoolroom detail | key, dusty bookcase, tapestry, or childhood room detail | do not create as a decorative duplicate of `location-secret-room.webp` |
| yellow-book object detail | closing bridge in `c3-the-book-on-the-table` | create only if the book is a real visual interaction, not a decorative prop |
| Basil visit portrait | optional future character visual | defer if the location and dialogue already establish Basil clearly |

The first priority is the new portrait asset and a usable secret-room environment. No separate Sibyl asset is required for this chapter: living continuity can be carried by a brief letter, report, or conditional text, avoiding a false impression that Sibyl is a full active branch here.

All future assets must preserve the established Dorian identity, 4:5 portrait composition, light direction, and Victorian Gothic / Dark Academia visual language. A missing runtime image must continue to use the existing CSS fallback.

---

## 15. Technical risk audit

### 15.1 Save v2 and migration

The current save format can support Chapter III with a small allow-list extension. New fields must default to `null` during normalisation. Existing v1 and v2 saves must retain:

- numeric values;
- all current flags;
- the complete choice history;
- visited scenes;
- Chapter I and Chapter II completion;
- the three existing Sibyl facts.

Do not create a separate Chapter III save key or silently rewrite old saves.

### 15.2 Story facts and validation

The current `STORY_FACT_KEYS` allow-list is safe but must be extended deliberately. New values must be enumerated. Never use arbitrary booleans or free-form strings for secret-room state if a finite value can express it.

The main risk is duplicate facts such as `portraitHidden`, `secretRoomEstablished`, and `portraitLocation` drifting apart. Prefer `portraitLocation` as the stored source and derive the two booleans when needed.

### 15.3 Conditional narrative

The existing resolver is sufficient for the proposed short variants. Use `storyFact`, `flag`, and small `all` / `any` conditions. Do not add JavaScript predicates, dynamic expressions, or chapter-specific code paths for every continuity combination.

### 15.4 Chapter completion and future handoff

Chapter III should use the existing `completedChapters` map and `activeChapterId`. The final scene should be the only scene that marks Chapter III complete. Chapter IV should remain unavailable until its own scenes and handoff are approved.

### 15.5 Portrait stage system

The current `portraitStageForValue` function is intentionally stable. A future implementation should preserve it for values 0–3 and add an explicit unlock path in `portraitStage(state)` or an equivalent single source of truth. The viewer, panel, CSS fallback, and tests must all consume the same model. Do not duplicate stage mapping in UI or story data.

### 15.6 Basil and character continuity

The current architecture has no character registry. This is acceptable if Chapter III uses outcome-aware conditional prose and never creates a living Sibyl scene on `dead-canonical`. A later character-continuity helper may be useful, but it is not required for this chapter and should not be added pre-emptively.

### 15.7 Teacher mode

Teacher mode currently reads the active chapter's `teacherNotes`. Chapter III needs its own scene list, decision map, learning goals, discussion questions, and canon/alternative distinction. It should not hard-code a Chapter III index or assume all chapters contain the same note fields.

### 15.8 Scene images and fallbacks

The existing UI supports declarative scene visuals and image-error fallbacks. Chapter III can reuse that pattern. The secret room should not require a new rendering system. Any Stage 3 asset integration must verify both the real image and the CSS fallback.

### 15.9 Tests required before implementation is considered complete

At minimum, future implementation should cover:

1. all eight Chapter I entry states into the Chapter III opening;
2. all three Sibyl outcomes without status contradiction;
3. `defendedBasil` and its absence;
4. `studiedPortrait` and `avoidedPortrait`;
5. all four Chapter III decisions and their persistent facts;
6. secret-room derivation from `portraitLocation`;
7. Basil suspicion values are allow-listed; no witness fact exists yet;
8. old saves retain current Stage 0/1/2 mapping;
9. Stage 3 is unavailable before the explicit unlock event;
10. Stage 3 is available for every valid route after `portraitLocation = "locked-schoolroom"` and the approved asset mapping;
11. the final Chapter III scene completes only Chapter III;
12. Chapter IV remains locked until its own implementation;
13. Teacher mode labels living Sibyl routes as alternatives;
14. no new sensitive warning appears unless new sensitive material is actually added.

---

## 16. Approved implementation contract

This corrected blueprint is locked for the next implementation milestone. It does not implement Chapter III.

### Literary chronology

- Basil's visit and the portrait confrontation belong to Chapter IX.
- The portrait is moved into and locked inside the old schoolroom in Chapter X.
- Dorian then returns downstairs; Henry's note and the yellow-bound book arrive in Chapter X.
- Dorian begins reading in Chapter X and may later meet Henry at the club.
- Chapter XI supplies the long-term statement of the book's influence over years.

### Stage 3

- Every valid Chapter III route unlocks Stage 3 after the physical move into the locked schoolroom.
- The same event sets `portraitLocation = "locked-schoolroom"` and `portraitStageUnlock = "stage-3"`.
- No minimum numeric `Portrait` value is required.
- `Portrait` remains useful for conditional prose and continuity but is not a morality score or an additional Stage 3 gate.
- `c3-the-expression` describes only the existing Stage 2 cruelty and altered expression.
- `c3-rules-of-secrecy` is the first scene allowed to display or describe the newly unlocked Stage 3.

### Persistent facts

The only proposed Chapter III additions are:

```text
portraitLocation: null | "locked-schoolroom"
basilSuspicion: null | "uneasy" | "suspects" | "clear"
portraitStageUnlock: null | "stage-3"
yellowBookResponse: null | "accepted" | "questioned" | "escape"
```

`portraitHidden` and `secretRoomEstablished` are derived from `portraitLocation`. `sibylOutcome` remains authoritative; Sibyl contact is derived as `none`, `distant`, or `present` and is not persisted in Chapter III. No `portraitWitness` fact is introduced; Basil does not see the changed face.

### Continuity and visuals

- `dead-canonical`, `alive-estranged`, and `alive-together` remain short conditional variants around one shared nine-scene spine.
- Chapter III receives no new Sibyl visual assets.
- Approved future P0 assets are `portrait-dorian-stage-3.webp`, `location-secret-room.webp`, and `location-dorians-house.webp`.
- Covered-portrait detail, separate old-schoolroom detail, yellow-book detail, and Basil's character portrait remain P1 and require demonstrated UI need.
- No new sensitive-content warning is needed unless implementation adds genuinely new sensitive material.

No unresolved design blocker remains. No implementation, image generation, engine/story-data change, asset change, commit, push, or deploy is part of Milestone 3A.1.
