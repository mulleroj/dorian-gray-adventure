# DORIAN GRAY — MILESTONE 4A
## Chapter IV: A Life of Pleasure — Narrative and Technical Blueprint

**Status:** design only. Chapter IV is not implemented by this document.

This blueprint was prepared from the current checkout and from Oscar Wilde's 1891 book edition. It does not add Chapter IV metadata, modify story data, change the engine, change save handling, add or generate assets, commit, push, or deploy.

The proposed chapter uses a shared spine. Existing Chapter III facts change short passages and the interpretation of a scene; they do not create separate Chapter IVs.

## 1. Verified current project state

### 1.1 Runtime and repository

- The repository is a static, offline-capable, data-driven B1 English-learning adventure.
- There is no backend, account, database, runtime AI API, or runtime image generation.
- The verified checkout is on `main`, at `e653f37` (`feat: complete Chapter III with visual integration`), with `origin/main` configured.
- The working tree was clean before this blueprint was created.
- The current save format is version 2. Version 1 saves remain readable and are normalized into version 2.
- The current save key is `dorian-gray-portrait-secret-save-v2`; the legacy key is still read and is not deleted during migration.

The relevant existing flow remains:

```text
story-data.js
   -> game-engine.js -> ui.js -> index.html
   -> narrative-resolver.js
game-state.js -> localStorage
```

No implementation in this milestone may change that flow.

### 1.2 Current save shape and Chapter III handoff

The current state contains:

```js
{
  version: 2,
  sceneId,
  activeChapterId,
  reputation: -3..3,
  conscience: -3..3,
  portrait: 0..3,
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

The allow-listed `storyFacts` are currently exactly:

```js
{
  sibylRelationship: "role-first" | "mixed" | "person-first" | null,
  sibylOutcome: "dead-canonical" | "alive-estranged" | "alive-together" | null,
  c2FinalResponse: "cruel" | "listen" | "delay" | null,
  portraitLocation: "locked-schoolroom" | null,
  basilSuspicion: "uneasy" | "suspects" | "clear" | null,
  portraitStageUnlock: "stage-3" | null,
  yellowBookResponse: "accepted" | "questioned" | "escape" | null
}
```

The valid Chapter III ending is `c3-the-book-on-the-table`. A completed Chapter III save has the following invariant handoff state:

| Field | Verified Chapter III result | Meaning for Chapter IV |
| --- | --- | --- |
| `completedChapters` | `chapter-1`, `chapter-2`, and `chapter-3` are `true`; `chapter-4` is absent | Chapter IV may be offered only as the next chapter; it must not be marked complete in advance |
| `activeChapterId` | `chapter-3` | The ending still belongs to Chapter III until an explicit handoff enters Chapter IV |
| `chapterComplete` | `true` | Chapter III is complete, not the whole story |
| `sceneId` | `c3-the-book-on-the-table` | The visible closing scene is the safe entry point for the next chapter |
| `portraitLocation` | `locked-schoolroom` | The portrait is hidden by a physical room and key, not by a boolean `portraitHidden` fact |
| `portraitStageUnlock` | `stage-3` | The current portrait is logically Stage 3 regardless of the numeric `Portrait` value |
| `yellowBookResponse` | `accepted`, `questioned`, or `escape` | The first Chapter IV continuity distinction |
| `basilSuspicion` | `uneasy`, `suspects`, or `clear` | Basil's concealment context is ordered; even `clear` does not tell him the secret or show him the portrait |
| `sibylRelationship` | `role-first`, `mixed`, or `person-first` | A derived Chapter II relationship profile |
| `sibylOutcome` | `dead-canonical`, `alive-estranged`, or `alive-together` | The only valid Sibyl status for later chapters |
| `c2FinalResponse` | `cruel`, `listen`, or `delay` | The final Chapter II response remains available for conditional prose |

Every full Chapter I–III path has **11 choice records**: three from Chapter I, four from Chapter II, and four from Chapter III. The current route has 24 or 25 unique visited scenes depending on whether the optional Chapter I hidden-canvas scene was visited. Chapter III itself adds nine scenes and always ends with its completion recorded.

### 1.3 Basil suspicion semantics

The current runtime values are retained exactly because they are part of the save contract. Their Chapter IV meaning is ordered and monotonic:

| Value | Approved meaning | What Basil still does not know |
| --- | --- | --- |
| `uneasy` | Basil senses that something is wrong. | He does not yet have a settled belief about deliberate concealment. |
| `suspects` | Basil believes Dorian is deliberately concealing something important. | He still does not know what the secret is and has not seen the changed portrait. |
| `clear` | Dorian's concealment has become unmistakable to Basil; Basil clearly understands that there is a serious secret. | He still does not know the portrait's truth and has not seen the changed portrait. |

For Chapter IV, read the practical ordering as:

```text
uneasy < suspects < clear
```

The value `clear` therefore means clear awareness of serious concealment, not clear knowledge of the portrait. Chapter IV must never use it as a `portraitWitness`, `portraitKnowledge`, or reveal fact.

### 1.4 Numeric state and portrait mapping

The current engine clamps values as follows:

- `Reputation`: `-3..3`;
- `Conscience`: `-3..3`;
- `Portrait`: `0..3`.

The current numeric portrait mapping is:

```text
Portrait 0 -> Stage 0
Portrait 1 -> Stage 1
Portrait 2..3 -> Stage 2
```

`portraitStage(state)` then applies the explicit override:

```text
storyFacts.portraitStageUnlock === "stage-3" -> Stage 3
```

The current runtime asset map contains:

```text
Stage 0 -> assets/portraits/portrait-dorian-stage-0.webp
Stage 1 -> assets/portraits/portrait-dorian-stage-1.webp
Stage 2 -> assets/portraits/portrait-dorian-stage-2.webp
Stage 3 -> assets/portraits/portrait-dorian-stage-3.webp
```

The complete current path sweep covered `8 × 36 × 81 = 23,328` Chapter I–III click paths. It produced 45 distinct final `(Reputation, Conscience, Portrait)` triples. Across those paths, `Reputation` and `Conscience` still reach both clamp boundaries, while numeric `Portrait` is observed at `1..3`. The final visible portrait is nevertheless Stage 3 on every valid Chapter III ending because the room event writes `portraitStageUnlock` explicitly.

This confirms two design rules for Chapter IV:

1. Do not use a numeric morality threshold to unlock Stage 4.
2. Do not widen the numeric ranges merely to make a multi-year chapter appear more dramatic. The current values still distinguish context, but they are not a reliable long-term calendar or portrait-stage counter.

### 1.5 Engine, resolver, and Teacher mode contracts

The current engine already provides the relevant foundation:

- chapter-aware `completedChapters` and `activeChapterId`;
- `continueToChapter` and `canStartChapter` handoff logic;
- allow-listed story facts with safe normalization;
- finite `choices` and `visitedScenes` history;
- declarative `choice`, `storyFact`, numeric, `all`, `any`, and `not` conditions;
- side-effect-free conditional prose;
- scene content warnings with continue, skip, and pause behavior;
- a shared portrait stage resolver and portrait viewer model;
- chapter-level Teacher mode with literary basis, adaptation notes, goals, vocabulary, comprehension, and discussion material.

The resolver can already read a precise prior choice from history. That makes a derived Chapter IV continuity profile possible without storing another persistent fact. The UI and Teacher mode must continue to use the same data-driven story model rather than a parallel Chapter IV path system.

## 2. Verified literary basis: Wilde's 1891 edition

The primary reference is the 1891 book edition on Wikisource:

- [Chapter XI](https://en.wikisource.org/wiki/The_Picture_of_Dorian_Gray_(1891)/Chapter_11)
- [Chapter XII](https://en.wikisource.org/wiki/The_Picture_of_Dorian_Gray_(1891)/Chapter_12)

No film adaptation is used as a canon source.

### 2.1 Canonical basis

Chapter XI supports the following narrative facts:

- Dorian remains under the influence of the yellow book for years, and the text explicitly frames this as a continuing influence rather than a single reading event.
- His beautiful young public face remains unchanged while the portrait carries the visible signs of age, corruption, and consequence.
- Strange rumours circulate in London, yet his charm, wealth, manners, and youthful appearance make many people unwilling to believe them.
- His prolonged or unexplained absences contribute to social suspicion.
- Some people distance themselves from him, while others find the rumours increase his dangerous fascination.
- Dorian repeatedly returns to the locked room, comparing the altered portrait with his own unchanged face in a mirror.
- He is both fascinated by and afraid of the portrait; he can pity or hate it, but he can also take a selfish pride in what it appears to carry for him.
- His aesthetic life expands through music, perfume, jewels, textiles, religious objects, collecting, social display, and other forms of sensory experience.
- The objects and experiences function not only as pleasures but also as forms of forgetfulness and escape.
- The chapter is structured around repeated habits and changing interests, not one dated event per year.

Chapter XII begins with Dorian on the eve of his thirty-eighth birthday. Basil meets him in the fog and raises the dreadful things being said about him. Basil explicitly says that he does not believe the rumours simply because Dorian's face still looks innocent, but he also names social distance, damaged reputations, and the effect Dorian has had on people around him. That is the correct boundary for the later confrontation.

### 2.2 Compressed adaptation

For a B1 school game, Chapter IV should compress the long catalogue into four readable dramatic movements:

1. the yellow book becomes an enduring habit;
2. public beauty becomes a practiced social performance;
3. selected pleasures become ways of remembering, controlling, or escaping;
4. the locked-room ritual becomes a repeated private counterpoint to public charm.

The adaptation should preserve the contrast between sensory beauty and avoidance without reproducing Wilde's long lists or treating every object as a separate plot event.

### 2.3 Interactive extensions

The following are game design, not claims about Wilde's exact plot:

- the player chooses how to use a social evening, respond to uncertain rumours, use one representative pleasure, and face or avoid the portrait;
- the player sees short conditional prose for the three yellow-book responses and the three Sibyl outcomes;
- the player receives a Stage 4 visual progression after the shared Chapter IV pattern has been experienced;
- the player may shape whether pleasure becomes connection, performance, or escape without selecting a single "good" or "bad" label;
- the player may end Chapter IV with a Basil hook, but not with the Chapter V confrontation itself.

## 3. Function in the six-chapter arc

The six-chapter arc remains:

1. **The Beautiful Young Man** — first influence and first portrait pressure;
2. **The Actress** — idealisation, public promise, and relationship consequence;
3. **The Changing Portrait** — visible change, concealment, and the locked room;
4. **A Life of Pleasure** — repeated choices become a way of life;
5. **The Confrontation** — Basil's direct pressure and the truth behind the secret;
6. **The Final Choice** — responsibility and the final portrait outcome.

Chapter IV's precise dramatic function is to make the player feel duration. Chapter III establishes a secret. Chapter IV shows how the secret changes the shape of ordinary life: what Dorian repeats, what he avoids, how he uses beauty in public, and how he returns to evidence in private.

Chapter IV must not be:

- another immediate aftermath chapter;
- a catalogue of Wilde's decorative objects;
- a click for every year;
- a moralising montage in which pleasure itself is condemned;
- a single decision that declares Dorian corrupt for decades.

### Central question

> **What happens when a private choice becomes a way of life?**

This is shorter and more B1-friendly than an abstract question about decadence. It supports habits, contrast, repetition, influence, reputation, and responsibility. It also keeps pleasure morally open: the problem is not beauty, music, clothing, or collecting by themselves, but whether Dorian uses them to connect, to perform, or to avoid looking at what he is doing.

## 4. Time-jump strategy

### Recommendation: anchored episodes plus concise transitions plus a repeated portrait ritual

Use a combination of the proposed models:

- **Anchored episodes** provide four representative choices rather than a year-by-year simulation.
- **Time-transition scenes** explicitly tell the player that months or years have passed.
- **Repeated ritual** supplies continuity: Dorian returns to the locked room, compares public youth with private evidence, and changes his response over time.

The chapter should contain nine scenes but only four decisions. The transitions do not ask the player to click through empty years. Each transition must include a clear time marker such as `A few months later`, `Over the next few years`, `After his twenty-fifth year`, or `Years later`.

Approved time envelope:

| Chapter beat | Time marker | Function |
| --- | --- | --- |
| Opening | a few months after Chapter III | The book and the locked room become part of ordinary life |
| Public pattern | over the next few years | Repeated social evenings and cultivated charm |
| Reputation pressure | after his twenty-fifth year | Rumours become socially consequential, echoing Chapter XI |
| Private repetition | weeks and seasons within the later period | Return, compare, avoid, and return again |
| Closing | years later, immediately before Chapter V's confrontation window | Basil's concern is prepared, but the confrontation remains unopened |

This time envelope is approved for implementation: Chapter IV ends immediately before the Chapter XII confrontation window. Chapter V owns the actual Basil encounter/confrontation associated with the eve of Dorian's thirty-eighth birthday. Chapter IV may prepare that window, but it must not stage the meeting itself.

## 5. Public Dorian and private portrait

The player must repeatedly see two distinct states:

| Public Dorian | Private portrait |
| --- | --- |
| young, beautiful, composed | increasingly altered |
| socially fluent and charming | carrying visible consequences |
| able to make rumours look absurd | able to make self-deception visible |
| not physically aged by the time jump | not a literal age calendar, but a record of inward damage |

Implementation and prose rules:

- Never age the living Dorian asset along with the portrait.
- Use the same young public description at each anchor, with changes in social interpretation rather than facial age.
- Reuse the mirror comparison in at least two scenes, but vary the action: examine, compare, fear, avoid, or return.
- Do not write that the portrait causes Sibyl's outcome or that numeric `Portrait` is a moral score.
- Teacher mode should explicitly ask how a person can remain physically unchanged while inwardly changing.

The contrast is dramatic, not fantasy exposition. The game should let the player infer the split from repeated scenes, social reactions, and the image itself.

## 6. Chapter III -> Chapter IV continuity

Chapter IV reads these existing dimensions:

1. `yellowBookResponse`;
2. `sibylOutcome` and, when useful, `sibylRelationship`;
3. `basilSuspicion`;
4. `c2FinalResponse`;
5. existing choice history, especially Henry, Basil, and portrait choices;
6. current numeric values as context only;
7. `portraitLocation = locked-schoolroom` and `portraitStageUnlock = stage-3` as handoff invariants.

It does not branch on every numeric combination and does not create one route for every Chapter I–III history.

### 6.1 Yellow-book continuity

The three Chapter III responses share the same Chapter IV spine but alter the first transition and later private language:

| Existing response | Chapter IV starting tone | What it must not mean |
| --- | --- | --- |
| `accepted` | The book's explanation is attractive. Dorian begins by treating experience as a philosophy and gradually uses it as permission. | It must not remove player agency or force every later choice toward escape. |
| `questioned` | Dorian sees the danger in the book's language, but questioning an influence is not the same as resisting it for years. The book can become a reference he argues with and still follows. | It must not imply that Dorian is protected from long-term influence. |
| `escape` | The book is first used as a place to look away from the locked room, Basil, or relationship difficulty. Some later choices can reinterpret that avoidance. | It must not become a synonym for `accepted`; the emphasis is deliberate evasion, not mere fascination. |

The common axis is: **the book gives Dorian a language for experience, and the player decides whether that language becomes connection, performance, or escape.**

### 6.2 Sibyl continuity

Sibyl does not need to be active in every scene. She remains a continuity pressure, not a second Chapter IV protagonist.

- `dead-canonical`: Sibyl is part of grief, responsibility, and Dorian's temptation to turn pain into an elegant story. Do not re-stage the death or add graphic detail.
- `alive-estranged`: Sibyl is alive and living outside Dorian's control. A short letter, remembered boundary, or mention of separate lives may appear. She must not wait passively for years in the game world.
- `alive-together`: Sibyl remains an ongoing part of Dorian's life across the years. This does not mean an unchanged engagement, permanent honeymoon-like romance, automatic marriage, constant physical presence, or automatic happiness. Short variants may show periods of closeness, periods of distance, boundaries, independent work and life, and unanswered questions.

The approved solution is to keep the authoritative `sibylOutcome` fact unchanged and add only concise time-aware variants. Do not specify marriage or another major long-term relationship event in Chapter IV. If Chapter V or VI later needs a more precise relationship status, that chapter may propose one then.

## 7. Reputation and rumours design

`Reputation` must not become a popularity bar. It remains a bounded context value describing how successfully Dorian manages public impression in the current design, not a verdict on his character.

Chapter IV should represent public life through separate narrative signals:

- **rumours:** attributed to someone or presented as uncertain; never automatically true;
- **observations:** a person saw an absence, a social departure, a repeated performance, or an evasive answer;
- **social distance:** an invitation is not sent, a conversation stops, or a person leaves the room;
- **public charm:** manners, beauty, wealth, and fluency can keep a rumour from becoming accepted fact;
- **player actions:** Dorian can ask, deflect, joke, retaliate, acknowledge uncertainty, or change the subject.

Do not invent explicit crimes merely to raise the stakes. The Chapter XI basis is stronger when the game shows how uncertainty and repeated observations become social pressure without converting every whisper into a verified fact.

The Chapter IV rumour decision should therefore ask:

> **How do you answer a story that may be false, but is already changing the room?**

The immediate result is a different social temperature. The durable result is a choice-history pattern that later affects Basil's interpretation, not a reputation score that decides who is right.

## 8. Scope of Dorian's pleasures

Select only representative areas with a dramatic function:

1. **Music** — can be shared attention and feeling, or a carefully staged atmosphere that keeps conversation shallow.
2. **Perfume** — can connect a memory to a person or place, or turn memory into something Dorian can control and replace.
3. **Jewellery and textiles** — can express craft and beauty, or become a system of arranging objects while avoiding a difficult question.
4. **Social experience** — dinners, salons, invitations, and cultivated taste show how pleasure operates publicly.

Do not reproduce Wilde's full catalogue of instruments, stones, textiles, ecclesiastical objects, historical figures, or violent anecdotes. The selected motifs must reveal a behaviour:

- fascination becomes collection;
- collection becomes control;
- control becomes avoidance;
- avoidance makes the locked room more necessary and more frightening.

Pleasure itself is not the target of the chapter. The target is the use of pleasure as escape, performance, detachment, secrecy, or a substitute for self-examination.

## 9. Proposed Chapter IV scene spine

The IDs below are proposals only. They must not be added to runtime in this milestone. They are deliberately shared-spine IDs rather than branch-specific chains.

### 9.1 Scene overview

| ID | English title | Kind | Approximate time marker | Decision? | Next |
| --- | --- | --- | --- | --- | --- |
| `c4-years-begin` | **The Years Begin** | transition / narrative | A few months after Chapter III | no | `c4-the-book-as-habit` |
| `c4-the-book-as-habit` | **The Book Becomes a Habit** | narrative | Over the next few years | no | `c4-house-open` |
| `c4-house-open` | **A House Open to the World** | choice / social episode | Seasonal evenings, repeated over several years | Decision I | `c4-whispers` |
| `c4-whispers` | **Whispers at the Edge of the Room** | choice / social consequence | After his twenty-fifth year | Decision II | `c4-chosen-pleasure` |
| `c4-chosen-pleasure` | **A Pleasure for Forgetting** | choice / aesthetic episode | One later season | Decision III | `c4-locked-room-again` |
| `c4-locked-room-again` | **The Locked Room, Again** | choice / private ritual | After weeks of absence, then a return | Decision IV | `c4-face-in-mirror` |
| `c4-face-in-mirror` | **The Face in the Mirror** | narrative / explicit milestone | Later in the same long period | no; Stage 4 event | `c4-later-invitation` |
| `c4-later-invitation` | **An Invitation Withheld** | narrative / social consequence | Years later | no | `c4-threshold` |
| `c4-threshold` | **The Door Before the Next Chapter** | ending | At the edge of the Chapter V confrontation window | no | end of Chapter IV |

### 9.2 Scene specifications

#### `c4-years-begin` — The Years Begin

- **Kind:** transition / narrative.
- **Content:** The yellow-bound book is no longer a new object. The locked schoolroom is no longer a new decision. The opening must state that a few months have passed, then mark the move from an event to a pattern. Dorian's public face remains young; the private room remains unchanged in location but not in meaning.
- **Characters:** Dorian; Henry appears only through remembered language or a short note; Sibyl appears only through the outcome-specific continuity line.
- **Entry conditions:** Chapter III completed; `portraitLocation = locked-schoolroom`; `portraitStageUnlock = stage-3`; `yellowBookResponse` resolved.
- **Conditional variants:** `accepted` makes the book sound like a philosophy; `questioned` makes Dorian argue with it while returning to it; `escape` makes the book a deliberate place to look away. `dead-canonical` uses grief and responsibility; `alive-estranged` uses distance; `alive-together` uses closeness and an unanswered obligation.
- **Decision:** none.
- **Numeric effects:** none.
- **Story facts:** none.
- **Portrait interaction:** The cover, key, or stairway is recalled; do not unlock a new stage here.
- **B1 goals:** time markers, influence, contrast, `Over the years...`, `He still looks...`.
- **Source note:** The long-term influence and continuing private room are based on Chapter XI; the transition wording is compressed adaptation.

#### `c4-the-book-as-habit` — The Book Becomes a Habit

- **Kind:** narrative / time-transition.
- **Content:** Show the book appearing in different rooms, beside different moods, or in different editions of the same private explanation. Avoid a catalogue. The key point is that Dorian can question an idea and still let it organise his behaviour. The narration should explicitly say that more time has passed without making the player click through each year.
- **Characters:** Dorian; Henry is a social influence, not a required on-screen character.
- **Entry conditions:** after the opening transition.
- **Conditional variants:** the three yellow-book tones continue; prior Henry choices may change whether the language feels familiar or contested.
- **Decision:** none.
- **Numeric effects:** none.
- **Story facts:** none.
- **Portrait interaction:** A brief sentence connects the book's language to the portrait's silence; no new visual stage.
- **B1 goals:** repeated behaviour, `I keep returning to...`, `I used to...`, `I have become...`.
- **Source note:** Chapter XI states that Dorian remains under the book's influence for years; this scene is a short B1 bridge.

#### `c4-house-open` — A House Open to the World

- **Kind:** choice / social episode.
- **Content:** Dorian hosts a refined evening. Music, flowers, table setting, clothing, and conversation are present only as a social instrument. The scene should show why people are drawn to him and why public charm can coexist with private fear.
- **Characters:** Dorian; invited guests; Lord Henry may be referenced but need not appear.
- **Entry conditions:** after the first time transition.
- **Conditional variants:** `basilSuspicion = uneasy` makes the absence of Basil's easy friendship noticeable and lets rumours deepen a previous discomfort; `suspects` makes rumours reinforce Basil's existing belief that Dorian is deliberately hiding something; `clear` makes public evidence accumulate around a concealment Basil already understands to be serious, without giving him the portrait's truth. `alive-together` may include a boundary about Dorian's availability; `alive-estranged` must not imply Sibyl is waiting for him.
- **Decision I — How do you use the evening?**

  | Choice | Motivation | Immediate effects | Durable use |
  | --- | --- | --- | --- |
  | **Invite people into a shared experience.** | Pleasure is meaningful when attention is shared. | `Reputation +1`, `Conscience +1`, `Portrait 0` | History can support a self-examining or connective profile. |
  | **Shape every detail as a performance.** | Beauty should control the room before anyone asks a difficult question. | `Reputation +1`, `Conscience 0`, `Portrait +1` | Later prose can show public success with increasing distance. |
  | **Use charm to keep every question away.** | If the room stays delighted, the private room stays private. | `Reputation +1`, `Conscience -1`, `Portrait +1` | Later prose can identify pleasure-as-shield without calling it a moral score. |

- **Story facts:** none; choice history is sufficient.
- **Portrait interaction:** public Dorian is described as unchanged; no one sees the portrait.
- **B1 goals:** social invitation, public/private contrast, `Although..., ...`, `People admire...`.
- **Source note:** Dorian's social evenings, music, decoration, manners, and public charm are compressed from Chapter XI. The three approaches are interactive extensions.

#### `c4-whispers` — Whispers at the Edge of the Room

- **Kind:** choice / social consequence.
- **Content:** A guest, absent friend, or report mentions a rumour. The wording must distinguish what was observed from what is believed. Someone leaves or fails to invite Dorian; the game does not reveal a single verified explanation.
- **Characters:** Dorian; one guest or messenger; a small social group. Basil is not present for the confrontation.
- **Entry conditions:** after the salon decision; the time marker states `After his twenty-fifth year`.
- **Conditional variants:** `Reputation` changes the ease with which Dorian controls the room, not the truth of the rumour. `basilSuspicion = uneasy` lets rumours deepen a previous discomfort; `suspects` lets them reinforce an existing suspicion; `clear` lets them add public evidence around a serious concealment Basil already recognises. Earlier public choices change tone, not factual certainty.
- **Decision II — How do you answer an uncertain story?**

  | Choice | Motivation | Immediate effects | Durable use |
  | --- | --- | --- | --- |
  | **Ask what people have actually seen.** | Separate observation from gossip before responding. | `Reputation -1`, `Conscience +1`, `Portrait 0` | Supports a self-examining profile and later careful speech. |
  | **Answer with calm charm and change the subject.** | Protect the room without confirming or denying the story. | `Reputation +1`, `Conscience 0`, `Portrait +1` | Supports a divided public/private profile. |
  | **Turn the rumour into a joke.** | Make uncertainty look foolish before it can damage you. | `Reputation +1`, `Conscience -1`, `Portrait +1` | Supports a performance/escape pattern and later social distance. |

- **Story facts:** none. Do not store `rumourTruth`, `reputationScore`, or a list of accused acts.
- **Portrait interaction:** the public face remains an apparent answer to the rumour; the portrait is not shown in public.
- **B1 goals:** uncertainty and reporting: `People say that...`, `Some people believe...`, `Nobody knows whether...`, `It may be true, but...`.
- **Source note:** The rumours, marked social departures, and mixture of fascination and distrust are based on Chapter XI. The specific classroom-safe exchange is an interactive compression.

#### `c4-chosen-pleasure` — A Pleasure for Forgetting

- **Kind:** choice / aesthetic episode.
- **Content:** Dorian chooses one representative area rather than touring a catalogue. The choice is framed as how he uses an experience, not which object is morally correct.
- **Characters:** Dorian; optional musicians, artisan, guest, or servant depending on the selected area.
- **Entry conditions:** after the rumour episode; a transition should say that another season has passed.
- **Decision III — What do you do with beauty?**

  | Choice | Area and motivation | Immediate effects | Durable use |
  | --- | --- | --- | --- |
  | **Listen to music with someone who feels it differently.** | Treat experience as a shared encounter rather than private possession. | `Reputation 0`, `Conscience +1`, `Portrait 0` | Supports connection and later recognition of another person's perspective. |
  | **Arrange perfume and objects until the memory feels controlled.** | Replace an uncertain feeling with a perfect sensory arrangement. | `Reputation 0`, `Conscience 0`, `Portrait +1` | Supports control and detachment. |
  | **Choose jewels or textiles that make the room impossible to question.** | Let visible beauty become a shield against inward questions. | `Reputation +1`, `Conscience -1`, `Portrait +1` | Supports pleasure-as-escape and public performance. |

- **Conditional variants:** `yellowBookResponse = questioned` may let Dorian notice that the book's language is guiding the choice; `escape` makes the choice feel more deliberately avoidant; `accepted` makes the experience sound like a philosophy. Do not moralise music, perfume, jewels, or cloth.
- **Story facts:** none; the selected choice is enough for future derived continuity.
- **Portrait interaction:** a later sentence links the selected sensory image to the portrait's harder stillness.
- **B1 goals:** sensory description, purpose clauses, `He used to...`, `He kept...`, `Over time...`.
- **Source note:** Music, perfume, jewels, textiles, and collecting are selected from Chapter XI; the compact choice structure is an interactive extension.

#### `c4-locked-room-again` — The Locked Room, Again

- **Kind:** choice / repeated private ritual.
- **Content:** After a period of absence or intense social activity, Dorian returns to the schoolroom. The scene must make the repeated act clear: this is not the first visit, and not the last. He has a mirror, the key, and the choice of what to do with the evidence.
- **Characters:** Dorian only; the absent public world remains audible through memory.
- **Entry conditions:** after the selected pleasure; a clear transition states that weeks or a season have passed.
- **Decision IV — How do you meet the portrait?**

  | Choice | Motivation | Immediate effects | Durable use |
  | --- | --- | --- | --- |
  | **Examine it and name one change.** | Allow evidence to be specific rather than symbolic. | `Reputation 0`, `Conscience +1`, `Portrait +1` | Supports self-examination; later prose can reuse the named act without a new fact. |
  | **Compare it with your face and control the comparison.** | Turn fear into an aesthetic experiment you can manage. | `Reputation 0`, `Conscience 0`, `Portrait +1` | Supports a divided profile and the canonical fascination with contrast. |
  | **Cover it again and return downstairs.** | Preserve the public self by postponing the private question. | `Reputation +1`, `Conscience -1`, `Portrait +1` | Supports pleasure-as-escape; later returns remain possible. |

- **Story facts:** none at this choice. The repeated act is represented by `choices` and `visitedScenes`, not a new `portraitVisitCount` meter.
- **Portrait interaction:** the current Stage 3 portrait is examined but is not yet Stage 4. The choice describes attitude toward evidence, not a morality label.
- **B1 goals:** comparison, habits, `I keep returning to...`, `Although..., ...`, `He still looks...`.
- **Source note:** Repeated returns, mirror comparison, fear, fascination, and the locked room are central to Chapter XI. The three player stances are interactive extensions.

#### `c4-face-in-mirror` — The Face in the Mirror

- **Kind:** narrative / explicit portrait milestone.
- **Content:** After the player has experienced the time transitions, public pattern, uncertain rumours, selected pleasure, and repeated private return, the portrait changes again. The scene must state that this is a later point in a long pattern, not the consequence of one click. Living Dorian remains visibly young. The portrait shows more pronounced hardness, restrained fatigue, and a clearer loss of facial harmony.
- **Characters:** Dorian; no Basil reveal.
- **Entry conditions:** all four Chapter IV decisions have been made; `portraitStageUnlock = stage-3` is present.
- **Conditional variants:** the prior decisions change whether the moment feels like recognition, control, or avoidance. No variant may prevent the shared literary milestone.
- **Decision:** none.
- **Numeric effects:** no numeric threshold and no `Reputation`, `Conscience`, or `Portrait` gate. Stage 4 is not conditional on one choice or one derived profile.
- **Story facts:** implementation writes the approved extension of the existing key: `portraitStageUnlock = "stage-4"`. Do not create a parallel `portraitStage4Unlocked` fact.
- **Portrait interaction:** this is the explicit Stage 4 event and the first scene that may render `portrait-dorian-stage-4.webp`.
- **B1 goals:** describing change, contrast, visible versus hidden self, `He still looks... but...`.
- **Source note:** The unchanged public face and increasingly altered portrait are based on Chapter XI. The exact visual milestone and timing are game architecture.

#### `c4-later-invitation` — An Invitation Withheld

- **Kind:** narrative / social consequence.
- **Content:** A later social scene shows that charm has not stopped all invitations, but distance is becoming visible. Someone leaves, an invitation is not extended, or a conversation becomes formal. The game should not announce a popularity score or prove every rumour. The player should feel that repeated behaviour has accumulated around Dorian.
- **Characters:** Dorian; guests or acquaintances; Basil may be mentioned as someone who has heard enough to be concerned, but he does not confront Dorian here.
- **Entry conditions:** Stage 4 event completed.
- **Conditional variants:** public choices alter the degree of ease; rumour choices alter whether Dorian notices the social mechanism; Sibyl variants remain short and consistent. `basilSuspicion = uneasy` means prior discomfort, `suspects` means an existing belief in deliberate concealment, and `clear` means unmistakable serious concealment without portrait knowledge.
- **Decision:** none; avoid adding a fifth choice merely to restate the chapter theme.
- **Numeric effects:** none.
- **Story facts:** none.
- **Portrait interaction:** no public reveal. A brief private cutback may recall that the Stage 4 image is waiting upstairs.
- **B1 goals:** social consequence, uncertainty, `They stopped inviting him because...`, `It may be true, but...`.
- **Source note:** Social distance, charm, rumours, and continued fascination are based on Chapter XI; the exact event is an interactive compression.

#### `c4-threshold` — The Door Before the Next Chapter

- **Kind:** ending / handoff preparation.
- **Content:** End with the locked door, the unchanged young face, the Stage 4 portrait, and the sense that Basil's concern is no longer only a memory. The scene may say that Basil has heard the stories or wants to speak, but it must not stage the meeting in the fog or the serious conversation from Chapter XII.
- **Characters:** Dorian; Basil only through a note, message, absence, or reported intention.
- **Entry conditions:** `portraitStageUnlock = "stage-4"`; all four Chapter IV decisions resolved.
- **Conditional variants:** one concise line for each yellow-book response, Sibyl outcome, and broad behaviour pattern. Never create separate endings for all numeric combinations.
- **Decision:** none.
- **Numeric effects:** none.
- **Story facts:** Chapter IV completion only; no new Basil knowledge fact and no `portraitWitness` fact.
- **Portrait interaction:** current Stage 4 remains visible; no Stage 5 unlock.
- **B1 goals:** summary, future pressure, public/private contrast, `Although..., ...`.
- **Source note:** This is a bridge to the Basil confrontation window supported by Chapter XII, not a reproduction of Chapter XII's confrontation.

## 10. Decisions and effects summary

The four decisions are deliberately different:

1. **Use of a social evening:** connection, performance, or shield.
2. **Response to a rumour:** investigate, deflect, or ridicule uncertainty.
3. **Use of a pleasure:** share experience, control memory, or use beauty as a shield.
4. **Return to the portrait:** examine, control the comparison, or avoid.

They are not labels such as good, bad, or evil. Each has:

- a comprehensible motivation;
- an immediate social, inward, or portrait-pressure effect;
- a later narrative use through choice history;
- no unnecessary persistent fact;
- a short path back to the same next scene.

The proposed per-choice effects are intentionally small. Because the existing clamp is narrow, implementation should not give every choice a `+1` in all three values. The portrait pressure added by several choices describes the accumulating private pressure; it is not a replacement for the explicit Stage 4 narrative event.

## 11. Repeated behaviour without one-click morality

### Recommendation: no new persistent behavioural meter

Do not add `pleasure`, `corruption`, `decadence`, or `years` as a new numeric meter. The current state already preserves the needed evidence:

- four Chapter IV choice records;
- complete earlier choice history;
- existing `yellowBookResponse`;
- existing `basilSuspicion`;
- existing `sibylOutcome`;
- numeric values as bounded context;
- explicit Stage 4 unlock fact.

For later prose, classify each of the four Chapter IV choices into exactly one of three stances:

- **REFLECTION / CONNECTION:** genuinely share an experience; ask what people have actually seen; share music with another person; examine the portrait and name a change.
- **CONTROL / PERFORMANCE:** shape the evening as a performance; calmly deflect the rumour; control memory through sensory arrangement; compare portrait and living face as a controlled experiment.
- **ESCAPE / AVOIDANCE:** use charm as a shield; ridicule the rumour; use visible beauty as a shield; cover the portrait and return downstairs.

The four proposed scenes map their three choices deterministically in the same order:

| Decision | REFLECTION / CONNECTION | CONTROL / PERFORMANCE | ESCAPE / AVOIDANCE |
| --- | --- | --- | --- |
| I — social evening | invite people into a shared experience | shape every detail as a performance | use charm to keep every question away |
| II — uncertain rumour | ask what people have actually seen | answer with calm charm and change the subject | turn the rumour into a joke |
| III — selected pleasure | listen to music with someone who feels it differently | arrange perfume and objects until the memory feels controlled | choose jewels or textiles that make the room impossible to question |
| IV — portrait return | examine it and name one change | compare it with your face and control the comparison | cover it again and return downstairs |

Derive exactly one mutually exclusive profile from the four stance classifications:

```text
self-examining      if REFLECTION / CONNECTION count >= 3
pleasure-as-escape  if ESCAPE / AVOIDANCE count >= 3
divided             for every other valid combination
```

The resolver must classify all four choices before applying the thresholds. The profile is derived from choice history, is not stored in `storyFacts`, is not a morality label, and is used only for short conditional prose or later Chapter V interpretation. It must return exactly one profile for every one of the 81 valid Chapter IV combinations. If implementation constraints make a pure helper impossible, equivalent finite `choice` conditions must preserve these same mutually exclusive rules; do not introduce a meter.

The Stage 4 unlock is not conditional on which profile wins. It is the shared consequence of time, repetition, and the chapter's explicit later portrait event. This prevents one click from pretending to contain twenty years while still allowing choices to change the meaning of the same visual event.

## 12. Portrait Stage 4 approved contract

### 12.1 Approved unlock rule

Approved implementation contract:

```text
After the four Chapter IV decisions and the later private return,
enter c4-face-in-mirror -> set portraitStageUnlock to "stage-4".
```

The unlock is universal for every valid Chapter IV route. It occurs only after all four Chapter IV decisions, the multi-year time progression, and the repeated return to the locked room. It is not gated by `Reputation`, `Conscience`, numeric `Portrait`, one specific choice, or the derived behavioural profile. This is safer than a numeric threshold because:

- `Portrait` is already clamped and frequently saturated;
- the chapter's literary claim is about sustained time and repeated behaviour;
- every valid route has experienced the same time envelope and private/public contrast;
- `portraitStageUnlock` already provides an explicit narrative mechanism;
- future scenes can still use choice history to make the Stage 4 moment feel different.

This does not mean every Dorian has made the same choices. It means every completed Chapter IV has reached the same structural point in the six-chapter arc.

### 12.2 Stage 3 -> Stage 4 boundary

Stage 3 currently communicates the first sustained damage after the portrait is moved to the old schoolroom. Stage 4 should communicate that the hidden life has become established:

- clearer hardness around the eyes;
- more watchful or inwardly defensive eyes;
- a tighter mouth and less facial openness;
- one restrained suggestion of premature fatigue beneath the eyes or around the mouth;
- slightly reduced facial harmony or a carefully controlled asymmetry;
- the same recognisable young Dorian, pose, hairline, clothing, background, and classical oil medium.

Stage 4 must not contain:

- a monster, demon, corpse, or supernatural transformation;
- an old man or a fully aged face;
- deep wrinkles, facial collapse, gore, wounds, blood, or graphic horror;
- a final moral verdict;
- the visual endpoint reserved for Chapter VI.

### 12.3 Save compatibility

Existing saves with `portraitStageUnlock = "stage-3"` must remain valid and continue to render Stage 3. A later implementation may extend the allow-list for the existing key to include `"stage-4"`; it must not rename the key or invalidate version 2 saves. The stage resolver should give Stage 4 precedence over Stage 3, while numeric fallback remains unchanged for older saves with no explicit unlock.

No Stage 4 file or mapping is created in this milestone.

## 13. Future portrait-stage roadmap

The safest remaining progression is:

| Chapter | Stage | Narrative boundary | Visual boundary |
| --- | --- | --- | --- |
| I | 0 -> 1 | First pressure and first difference | restrained warning |
| II | 1 -> 2 | Relationship and public-image consequences | clearer altered expression |
| III | 2 -> 3 | Secret room and deliberate concealment | sustained inward damage, still restrained |
| IV | 3 -> 4 | Repeated life of pleasure and private/public split | harder, more watchful, visibly fatigued but young |
| V | 4 -> 5 | Basil confrontation and the cost of being seen | substantially more damaged, still human and non-graphic |
| VI | 5 -> final Stage 6 | final choice and responsibility | terminal route-specific state with no need for gore |

This plan leaves visual room in both directions. Chapter IV does not consume the final image, and Chapter V has a meaningful visual consequence after Basil sees or directly challenges the truth. Chapter VI can still support more than one final narrative outcome without forcing Stage 4 or Stage 5 to look terminal.

## 14. Basil and the Chapter V boundary

Chapter IV may:

- remind the player of Basil's former friendship;
- read `basilSuspicion` without creating a second meter;
- show that Basil has heard rumours or noticed distance;
- let Basil's future concern feel more or less personally grounded;
- end with a note, absence, invitation, or intention to speak.

Chapter IV must not:

- stage Basil's full rumour inventory;
- bring Basil to the portrait;
- let Basil see the changed portrait;
- resolve whether Basil believes Dorian;
- contain the primary confrontation dialogue from Chapter XII;
- unlock the final portrait consequences of that confrontation.

The safe end state is **pressure before encounter**. Chapter V owns **encounter, direct accusation, and the portrait witness boundary**.

### Reading the existing `basilSuspicion`

The existing value is read as prior context only:

- `uneasy`: Basil's later concern feels like a growing unease that rumours make harder to ignore;
- `suspects`: the rumours confirm a pattern Basil has already noticed, but he still does not know the portrait's truth;
- `clear`: Basil already understands that Dorian's concealment is serious. Chapter IV must show rumours adding public evidence around that known concealment, without pretending Basil knows the portrait's truth.

No parallel `basilRumourLevel` or `basilKnowledge` meter should be added.

## 15. Minimal storyFact contract

The minimum persistent change needed for the approved chapter is an extension, not a new key:

```js
portraitStageUnlock: "stage-3" | "stage-4" | null
```

Why a later chapter needs it: the portrait viewer and future Chapter V must know that an explicit narrative milestone was reached. Numeric `Portrait` cannot reliably represent it, and deriving it from a particular choice would make the stage depend on one click.

No other new persistent fact is recommended:

- do not store `chapter4Pattern`; derive it from choices;
- do not store `rumourTruth`; rumours remain uncertain and contextual;
- do not store `portraitVisits`; current choice history is enough for this chapter;
- do not store `publicReputation`; `Reputation` already exists and is not a popularity score;
- do not store a new Sibyl fact unless owner review decides that `alive-together` cannot remain a valid durable outcome.

The later implementation would therefore modify only the existing `portraitStageUnlock` allow-list and the explicit Chapter IV scene effect, plus the Chapter IV metadata and tests. This blueprint does not make those changes.

## 16. Numeric-state assessment

Recommendation: keep the existing ranges and meaning for Chapter IV.

### Why not widen the ranges now?

- The current sweep still produces varied `Reputation` and `Conscience` context.
- The clamp is save-compatible and already understood by the tests and UI.
- A wider range would not solve the time-jump problem; it would only make a hidden numeric history harder to explain.
- Stage progression is already correctly decoupled from numeric `Portrait`.
- Chapter IV's important information is repetition, uncertainty, public/private contrast, and explicit narrative time—not a larger number.

### Implementation constraints for future work

- Keep `Reputation` bounded and describe it as public impression or social ease, never as popularity or goodness.
- Keep `Conscience` bounded and avoid presenting it as a single moral truth.
- Keep numeric `Portrait` as pressure/context only.
- Do not gate Stage 4, Sibyl continuity, Basil's knowledge, or a final ending on a numeric threshold.
- Test several Chapter IV choice sets at clamp boundaries and preserve old save normalization.

## 17. Age and calendar continuity

The current project code does not store Dorian's age or a calendar year. The primary text supplies two useful relative anchors:

- Chapter XI refers to events and rumours after Dorian's twenty-fifth year and describes summers and years passing.
- Chapter XII begins on the eve of Dorian's thirty-eighth birthday.

The blueprint should not invent a starting age or exact intermediate dates that the game does not need. Use relative markers:

- `a few months later`;
- `over the next few years`;
- `after his twenty-fifth year`;
- `years later`;
- `before the eve of his thirty-eighth birthday`, because Chapter V opens directly into the Chapter XII confrontation window.

Chronological age and painted apparent age must remain separate. The public Dorian description stays young; the portrait's apparent damage is a distinct visual state.

## 18. B1 English goals

Chapter IV should teach language through the repeated dramatic problem rather than through isolated exercises:

- habits over time: `used to`, `kept`, `would`, `over the years`;
- describing change: `became`, `grew`, `remained`, `was still`;
- rumours and uncertainty: `People say that...`, `Some people believe...`, `Nobody knows whether...`, `It may be true, but...`;
- reputation and social distance: `They stopped inviting him because...`;
- influence: `The book affected him`, `He let the idea guide him`;
- contrast: `Although..., ...`, `He still looked... but...`;
- repeated behaviour: `I keep returning to...`, `He used to...`, `He had begun to...`;
- public/private life: `In public...`, `In the locked room...`.

The English should remain newly written and accessible. Do not copy long passages from the primary text.

## 19. Teacher mode proposal

The future Chapter IV Teacher mode should include:

### Comprehension questions

1. What changes after several months and years?
2. Why does Dorian keep returning to the locked room?
3. What do people actually observe, and what do they only guess?
4. Why does Dorian's young face make some people doubt the rumours?
5. How does the yellow book influence Dorian differently in the three starting variants?
6. What is the difference between enjoying beauty and using beauty to avoid a question?
7. What happens to Dorian's social relationships over time?
8. Why is Stage 4 a result of a pattern rather than one choice?

### Discussion questions

- Is pleasure a problem, or is escape the problem?
- When does a habit become part of identity?
- Can rumours harm someone even when they are unproven?
- Why does Dorian keep looking at the portrait if he fears it?
- Is public reputation the same as character?
- Can a person stay physically unchanged while changing inwardly?
- Is a charming public image evidence of innocence?

### Canon and adaptation notes

Teacher mode should state that Chapter XI supplies the long-term yellow-book influence, unchanged youthful appearance, repeated portrait visits, aesthetic interests, rumours, and social distance. The four player decisions, living Sibyl routes, derived behaviour profile, and universal Stage 4 event are interactive extensions. The Basil confrontation remains Chapter V material, with Chapter XII as its primary literary boundary.

### Time-jump explanation

Include a short note explaining that the game uses representative moments and explicit transitions instead of asking the learner to click through every year. The repeated locked-room ritual is the continuity device.

### Stage 3 -> Stage 4 meaning

Stage 3 means the secret has been deliberately established. Stage 4 means that the secret has become part of an extended way of life: public charm, repeated avoidance, and private evidence now coexist as a stable pattern.

## 20. School suitability and sensitive content

The chapter can remain suitable for secondary school if it uses suggestion and social consequence instead of explicit vice.

Do not include:

- explicit sex;
- drug-use instructions;
- graphic violence or death;
- fetishised decadence;
- detailed criminal acts;
- a playable reconstruction of the novel's violent or sensational historical examples.

Chapter XI contains adult themes, references to vice, morally troubling nightlife, religious imagery, and a long historical catalogue that includes violence, colonialist and racialised language, and sensational examples. The blueprint deliberately omits those catalogues and rewrites the relevant material in neutral, non-graphic B1 language.

No new player-facing content warning is approved for the current Chapter IV material. The approved material contains only non-specific rumours, social distance, adult themes handled by suggestion, secrecy, and reputation pressure. It does not contain explicit sex, drug-use instruction, graphic violence, graphic abuse, or detailed criminal acts. Teacher mode may include a short explanatory note about rumours of harmful adult behaviour and social exclusion in non-graphic terms.

If a later implementation introduces genuinely more explicit sensitive material, stop for review rather than silently adding a blocking or skippable warning.

## 21. Visual asset plan

No images are generated or added in this milestone.

### Approved P0 set

1. `portrait-dorian-stage-4.webp` — the only new required Chapter IV asset.
2. Reuse `assets/locations/location-dorians-house.webp` for salon, sitting-room, invitation, and social-distance scenes.
3. Reuse `assets/locations/location-secret-room.webp` for the repeated portrait ritual and Stage 4 event.

Do not approve a new salon location at this stage. A salon/social environment remains P1 and may be created only if later browser/layout QA demonstrates a real visual comprehension problem when reusing Dorian's house.

### Deferred P1, not approved in this milestone

- one neutral social/salon environment that is reusable across multiple public scenes;
- no separate image for music, perfume, jewellery, or textiles; those are narrative props and should not become four new assets.

### Stage 4 production boundary

The eventual Stage 4 asset must preserve the canonical Dorian identity, composition, 4:5 framing, and visual language established by `MASTER_PORTRAIT_BRIEF.md` and the current portrait set. It must be visibly worse than Stage 3 but remain young, human, restrained, non-graphic, and clearly short of the Chapter V and VI states.

## 22. Branch control

Chapter IV has a large valid input space. The implementation should read only these continuity dimensions:

```text
yellowBookResponse: 3
sibylOutcome: 3
sibylRelationship: 3
c2FinalResponse: 3
basilSuspicion: 3
prior choice history and flags
current numeric context
Stage 3 handoff invariants
```

It should not create a route for every product of those values. The shared spine handles the full input space. Conditional prose should be short and grouped into finite classes:

- yellow-book tone: 3;
- Sibyl status: 3;
- Basil context: 3;
- derived Chapter IV behaviour: 3;
- public/private portrait context: 2 or 3 broad classes.

These are narrative dimensions, not separate scene chains. Choice history remains the detailed evidence; the derived profile is only a compression for later prose.

## 23. Technical risk audit

### Long time jumps

**Risk:** a static scene model has no date system and may make years feel like weeks.

**Mitigation:** use explicit prose time markers in transition scenes; do not add a global calendar unless a later owner decision requires it.

### Chapter IV handoff

**Risk:** Chapter III currently has no Chapter IV metadata, so a premature handoff could create an invalid target.

**Mitigation:** add metadata and `firstScene` only in a future implementation milestone; require completed Chapter III and resolved existing handoff facts; leave Chapter III's ending unchanged until then.

### Stage 4 unlock

**Risk:** a numeric threshold would be saturated or would make one click look like a multi-year transformation.

**Mitigation:** extend the existing `portraitStageUnlock` allow-list and set `stage-4` only at the explicit `c4-face-in-mirror` event.

### Save v2

**Risk:** a new fact or value can invalidate old saves if normalization is not extended safely.

**Mitigation:** preserve `stage-3`; accept `stage-4` as an additional allowed value; keep version 2 and the legacy v1 migration readable; test saves before the unlock and after the unlock.

### Story-fact allow-list

**Risk:** implementing a new behavioural fact for convenience widens the contract unnecessarily.

**Mitigation:** use the existing `choices` history and a pure derived profile. Add only the `stage-4` value to the existing stage key if approved.

### Choice-history size

**Risk:** Chapter IV could make saves or tests grow needlessly.

**Mitigation:** four choice records, no per-year records, no visit counter, and no repeated ritual counter. The existing normalization already keeps the choice structure finite.

### Teacher mode

**Risk:** a chapter can be playable but absent from the teacher-facing map.

**Mitigation:** add Chapter IV metadata, goals, vocabulary, comprehension, discussion, and canon/adaptation notes together in a later implementation milestone; test the scene and decision counts.

### Repeated locations

**Risk:** reusing the house for social scenes may make private and public scenes visually indistinguishable.

**Mitigation:** let prose and labels carry the distinction first; add one salon asset only if visual QA demonstrates a real comprehension or layout problem.

### Future Chapter V

**Risk:** Chapter IV may accidentally reveal the portrait to Basil or spend the emotional confrontation too early.

**Mitigation:** maintain the explicit boundary: Basil may hear rumours and become concerned, but may not see the changed portrait or conduct the full confrontation until Chapter V.

### Exhaustive testing

**Risk:** full-path enumeration grows rapidly even though the scenes share a spine.

**Mitigation:** use a layered test matrix described below: local exhaustive Chapter IV routes, equivalence-class continuity, pairwise decisions, and targeted save/portrait/boundary assertions.

## 24. Testing strategy proposal

### 24.1 Expected path count

The proposed chapter has four independent three-option decisions:

```text
3 × 3 × 3 × 3 = 81 Chapter IV local choice paths
```

If multiplied naively by every existing Chapter I–III click path:

```text
23,328 × 81 = 1,889,568 full click paths
```

That raw product should not be the only test plan. The shared spine makes equivalence classes appropriate, while 81 local paths are still small enough for exhaustive Chapter IV testing from a representative valid handoff.

### 24.2 Required coverage layers

1. **Static schema checks**
   - all proposed scene targets exist;
   - no Chapter IV scene is reachable before the Chapter III handoff;
   - exactly nine scenes and four decisions are declared;
   - every scene glossary term has a definition;
   - no new story fact bypasses the allow-list;
   - Stage 4 asset mapping is absent until the asset milestone.

2. **Chapter IV local exhaustive test**
   - run all 81 combinations from one valid handoff state;
   - repeat with at least one handoff at each relevant numeric clamp profile;
   - assert the shared ending, four choice records, Stage 4 unlock, Chapter IV completion, and no Chapter V completion.

3. **Continuity matrix**
   - test all three `yellowBookResponse` values;
   - test all three `sibylOutcome` values;
   - test all three `basilSuspicion` values;
   - include all three `sibylRelationship` values and at least one differing `c2FinalResponse` for each relationship class;
   - assert that no living Sibyl becomes dead and that `dead-canonical` never gains living-Sibyl prose.

4. **Pairwise decision coverage**
   - cover every option pair across the four decisions;
   - cover each derived behaviour profile where the selected choices make it applicable;
   - cover `accepted`, `questioned`, and `escape` against each public/private decision type.

5. **Boundary tests**
   - `Reputation = -3` and `3`;
   - `Conscience = -3` and `3`;
   - `Portrait = 0`, `1`, `2`, and `3` before Chapter IV;
   - explicit Stage 3 before the event and Stage 4 after the event;
   - malformed, unknown, or old saves containing no Stage 4 value.

6. **Portrait and viewer tests**
   - Stage 3 remains the result before `c4-face-in-mirror`;
   - Stage 4 is the result only after the explicit event;
   - Stage 4 asset failure falls back safely;
   - living Dorian prose and portrait-stage text remain distinct.

7. **Basil boundary tests**
   - Chapter IV may mention rumours and concern;
   - no Chapter IV scene says Basil saw the changed portrait;
   - no Chapter IV scene includes the full Chapter XII confrontation;
   - Chapter V remains the first reveal/confrontation milestone.

8. **Save and handoff tests**
   - save immediately before Stage 4 and restore;
   - save immediately after Stage 4 and restore;
   - verify old v1/v2 saves still normalize;
   - verify `completedChapters` contains Chapters I–IV only after the Chapter IV ending.

### 24.3 Existing 35-test baseline

The requested verification may run the existing full suite, but the runtime must not change during this milestone. Any future Chapter IV implementation should add targeted tests rather than silently altering the current Chapter I–III assertions. The current Chapter III exhaustive test must continue to pass unchanged.

## 25. Approved implementation contract

The owner-approved Chapter IV contract is:

- **Time envelope:** a few months after Chapter III; over the next few years; after Dorian's twenty-fifth year; later years; ending immediately before the Chapter XII confrontation window. Chapter V owns the actual Basil encounter/confrontation associated with the eve of Dorian's thirty-eighth birthday.
- **Basil semantics:** `uneasy` means sensed wrongness; `suspects` means belief in deliberate concealment; `clear` means unmistakable serious concealment. The ordering is `uneasy < suspects < clear`, and even `clear` does not mean portrait knowledge or portrait sight.
- **Stage 4:** universal explicit unlock at `c4-face-in-mirror`, after all four decisions, the multi-year progression, and repeated locked-room return. The implementation writes `portraitStageUnlock = "stage-4"`; no numeric threshold or behavioural-profile gate is used.
- **Portrait roadmap:** Stage 0–1 in Chapter I, Stage 2 in Chapter II, Stage 3 in Chapter III, Stage 4 in Chapter IV, Stage 5 in Chapter V, and final Stage 6 in Chapter VI. This is a narrative/visual roadmap, not a morality scale.
- **Behaviour profile:** each decision is classified as REFLECTION / CONNECTION, CONTROL / PERFORMANCE, or ESCAPE / AVOIDANCE. Exactly one non-persistent profile is derived: `self-examining` at reflection count `>= 3`, `pleasure-as-escape` at escape count `>= 3`, otherwise `divided`.
- **Sibyl:** keep the authoritative `sibylOutcome` values. `dead-canonical` remains past responsibility; `alive-estranged` remains an independent life outside Dorian's control; `alive-together` remains an ongoing relationship across the years without implying unchanged engagement, marriage, constant presence, or automatic happiness.
- **Chapter IV / V boundary:** Chapter IV ends with pressure before encounter. Basil may have heard rumours and want to speak, but the fog encounter, full rumour confrontation, changed-portrait sight, secret-room reveal, and major confrontation belong to Chapter V.
- **Content warning:** no new player-facing blocking or skippable warning for the approved non-graphic material. Teacher mode may explain the themes briefly. New genuinely explicit material requires review.
- **Visual P0:** `portrait-dorian-stage-4.webp` only, with the existing Dorian's-house and secret-room assets reused. A salon asset remains deferred P1 until browser/layout QA demonstrates a real need.
- **Numeric ranges:** keep `Reputation -3..3`, `Conscience -3..3`, and `Portrait 0..3` unchanged. They remain contextual values, not calendar counters or stage selectors.
- **Testing:** exhaust all 81 local Chapter IV combinations and combine that with continuity, representative prior-state, clamp-boundary, save/restore, Stage 3 -> Stage 4, Basil-boundary, and derived-profile tests. Do not require naive enumeration of 1,889,568 full historical paths.

No unresolved design question remains in this correction milestone.

## 26. Scope stop

This milestone delivers this blueprint only. It does not:

- implement Chapter IV;
- add Chapter IV metadata or scenes;
- modify the engine, resolver, UI, save format, or portrait mapping;
- add or generate Stage 4 or any location asset;
- begin Chapter V;
- commit, push, or deploy.
