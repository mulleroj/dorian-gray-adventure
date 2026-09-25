# DORIAN GRAY — MILESTONE 2A

## Chapter II: The Actress — Narrative Blueprint

**Status:** design only. Chapter II is not implemented by this document.

This blueprint is based on the verified current workspace state and on the 1891 text of Oscar Wilde's *The Picture of Dorian Gray*. It separates primary-text events from new interactive branches written for this educational game.

The proposal contains:

- 9 narrative scenes;
- 4 major decision points;
- no new numeric personality indicator;
- one persistent non-numeric relationship outcome for Sibyl;
- no new portrait asset or portrait threshold in Milestone 2A;
- one canonical-inspired tragedy route and finite alternatives that rejoin a shared aftermath.

The main design question is:

> **Do you love Sibyl, or do you love the characters she plays?**

The chapter must not turn this into a one-click morality test. The player should understand why Dorian is attracted to the theatrical ideal, why his disappointment feels powerful, and why his response has consequences for another person.

---

## 1. Literary foundations

### 1.1 Primary-text basis

The literary basis has been checked against the 1891 edition:

- [Chapter IV](https://en.wikisource.org/wiki/The_Picture_of_Dorian_Gray_(1891)/Chapter_4): Dorian tells Lord Henry about Sibyl, describes her through the roles she plays, and announces that he is engaged.
- [Chapter V](https://en.wikisource.org/wiki/The_Picture_of_Dorian_Gray_(1891)/Chapter_5): Sibyl tells her mother that she loves “Prince Charming”; her family, money, work and life outside the stage are visible.
- [Chapter VI](https://en.wikisource.org/wiki/The_Picture_of_Dorian_Gray_(1891)/Chapter_6): Lord Henry and Basil discuss Dorian's engagement; Dorian describes Sibyl's previous performance as Rosalind.
- [Chapter VII](https://en.wikisource.org/wiki/The_Picture_of_Dorian_Gray_(1891)/Chapter_7): Dorian brings Basil and Lord Henry to the Romeo and Juliet performance. Sibyl acts badly because real love has changed her relationship to theatrical feeling. Dorian rejects her and later sees a cruel change in the portrait.
- [Chapter VIII](https://en.wikisource.org/wiki/The_Picture_of_Dorian_Gray_(1891)/Chapter_8): Dorian learns from Lord Henry that Sibyl is dead. The passage describes a non-accidental death after she swallows a theatrical substance, but does not use the modern clinical word “suicide” in that passage.

The 1891 text is the reference edition for this blueprint. A future implementation should not silently combine a film adaptation, a modern retelling or the 1890 magazine version with this sequence.

### 1.2 Canonical events and game additions

| Element | Primary-text status | Treatment in this game |
| --- | --- | --- |
| Dorian's fascination with the theatre | Canonical | Recurring setting and gradual introduction to Sibyl |
| Sibyl's exceptional stage ability | Canonical before the final performance | Short B1 descriptions of several roles, without long Shakespeare quotations |
| Sibyl's love for Dorian | Canonical | Shown through her words and through the contrast between stage and private life |
| A woman beyond her roles | Central contrast in the novel, filtered through Dorian's perception | Made the main interactive question |
| “Prince Charming” | Canonical | Retained as a reference, not as Sibyl's whole identity |
| Dorian's account to Henry | Canonical | Adapted into a conditional game conversation |
| Basil's response to the engagement | Canonical | Counterweight to Henry's cynicism |
| Romeo and Juliet evening | Canonical | Fixed dramatic centre |
| Sibyl's poor performance after falling in love | Canonical | Player witnesses it before choosing a response |
| Dorian's cruel rejection | Canonical route | One playable route, not the only response |
| Portrait change | Canonical sequence | Expressed using the existing Chapter I system |
| Sibyl's death | Canonical route | Non-graphic aftermath, never a reward or punishment animation |
| Sibyl surviving | Not canonical | Explicit interactive alternative persisted in later chapters |

### 1.3 What is not claimed as Wilde's plot

The following are game inventions and must be identified as such in Teacher mode:

- exact player-choice wording;
- any route in which Sibyl survives;
- any route in which Dorian and Sibyl remain together;
- story facts such as sibylRelationship or sibylOutcome;
- conditional reactions based on Chapter I values;
- the consolidation of several novel conversations into nine B1 scenes;
- chapter summaries and classroom discussion prompts.

The game must not claim that Wilde wrote an alternate survival route. It should describe that route as a controlled interactive extension designed to examine agency, empathy and consequence.

---

## 2. Central conflict and design principles

### 2.1 Dramatic question

Dorian's attraction begins with an artistic experience. Sibyl is first understood as a sequence of beautiful performances: Rosalind, Juliet, Imogen and other heroines. The relationship becomes unstable when Sibyl's real love makes her less effective at pretending theatrical passion.

The chapter therefore tests whether Dorian can:

- distinguish a person from an image;
- tolerate an ordinary, imperfect relationship;
- listen to Sibyl's own experience;
- separate disappointment from punishment;
- recognise Lord Henry's influence;
- accept that a beautiful performance is not the same as a truthful life.

### 2.2 No simple good or bad answer

Each decision needs a believable attraction:

- idealising Sibyl can feel like devotion and romantic intensity;
- listening to ordinary life can feel less glamorous and more frightening;
- defending a weak performance can feel loyal, but can threaten Dorian's self-image as a connoisseur;
- asking for time can feel responsible, but can also become avoidance;
- a public declaration can increase Reputation while still leaving Sibyl unseen.

The game should reveal the difference between short-term emotional relief and long-term relational consequence. It must not label a choice as morally correct before the player experiences its result.

### 2.3 Existing values

The current values retain their existing meanings:

- **Reputation:** how Dorian appears to society and to the people whose approval he wants.
- **Conscience:** how willing Dorian is to face the effect of his choices.
- **Portrait:** pressure carried by the image; it is not a morality score and must not independently decide whether Sibyl lives or dies.

Chapter II can use the existing ranges:

- Reputation: -3 to +3;
- Conscience: -3 to +3;
- Portrait: 0 to 3, mapped as 0 to stage 0, 1 to stage 1, and 2–3 to stage 2.

No fourth numeric indicator is proposed.

---

## 3. Verified Chapter I state and continuity

### 3.1 The seven existing scenes

| Order | ID | Scene | Function | Access |
| ---: | --- | --- | --- | --- |
| 1 | c1-opening | A Quiet Studio | Dorian enters Basil's studio beside the covered canvas | Chapter I first scene |
| 2 | c1-basil-studio | The Painter's Friend | Basil's devotion and Henry's arrival | Linear |
| 3 | c1-henry-arrives | Lord Henry Wotton | Decision I: listen to Henry or stand beside Basil | Two choices |
| 4 | c1-youth-question | The Price of Youth | Decision II: expand Henry's idea or question it | Two choices |
| 5 | c1-portrait-unveiled | The Portrait | Decision III: study the portrait or step away | Two choices |
| 6 | c1-hidden-canvas | Behind the Curtain | Optional detail in the paint | Requires studiedPortrait |
| 7 | c1-closing | A Promise in the Evening | Chapter I ending and choice summary | Both portrait routes |

### 3.2 Recorded decisions and history

The current engine records one choice from each scene:

1. c1-henry-arrives: listen-to-henry or defend-basil;
2. c1-youth-question: ask-about-youth or question-henry;
3. c1-portrait-unveiled: study-portrait or turn-away.

Each record contains:

~~~text
sceneId
choiceId
reflection
~~~

Every completed Chapter I path has three choice records. visitedScenes contains the linear scenes and, only on the study-portrait route, c1-hidden-canvas.

The current access rule is exact:

~~~text
c1-hidden-canvas requires flags.studiedPortrait === true
~~~

There is currently no Chapter II scene or chapter handoff in the data.

### 3.3 All eight Chapter I outcomes

These are the actual end values produced by the current tests and engine. R means Reputation, C means Conscience and P means Portrait.

| Path | Decision I | Decision II | Decision III | End state R / C / P | Stored flags | Opening emphasis for Chapter II |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | listen to Henry | ask about youth | study portrait | 2 / -3 / 3 | heardHenry, acceptedIdea, studiedPortrait | Henry is trusted; portrait pressure is strongest |
| 2 | listen to Henry | ask about youth | turn away | 3 / -1 / 2 | heardHenry, acceptedIdea, avoidedPortrait | High social confidence; avoids self-examination |
| 3 | listen to Henry | question Henry | study portrait | 0 / -1 / 2 | heardHenry, challengedHenry, studiedPortrait | Henry was heard but not fully accepted; image was faced |
| 4 | listen to Henry | question Henry | turn away | 1 / 1 / 1 | heardHenry, challengedHenry, avoidedPortrait | Henry's charm remains; conscience is accessible |
| 5 | defend Basil | ask about youth | study portrait | 1 / -1 / 2 | defendedBasil, acceptedIdea, studiedPortrait | Basil is an emotional anchor; Henry's idea was admitted |
| 6 | defend Basil | ask about youth | turn away | 2 / 1 / 1 | defendedBasil, acceptedIdea, avoidedPortrait | Socially secure; some concern for Basil remains |
| 7 | defend Basil | question Henry | study portrait | -1 / 1 / 1 | defendedBasil, challengedHenry, studiedPortrait | Most questioning state; portrait still matters |
| 8 | defend Basil | question Henry | turn away | 0 / 3 / 0 | defendedBasil, challengedHenry, avoidedPortrait | Strongest current Conscience; least pressured portrait |

The opposite flags are not stored as explicit false values. Their absence must not be interpreted without checking the choice history.

### 3.4 Continuity table: Chapter I → Chapter II

| Chapter I fact | How it appears in Chapter II | What it must not do |
| --- | --- | --- |
| heardHenry or high Reputation | Henry greets Dorian as someone responsive to his ideas; Dorian may use Henry's language about beauty and experience | Force agreement in every later scene |
| defendedBasil | Basil receives a warmer response and can act as a trusted witness | Make Basil a moral answer key |
| acceptedIdea | Dorian describes Sibyl through beauty, novelty, genius or possession | Make the player passive |
| challengedHenry | Dorian can question whether beauty is enough | Make later cruelty impossible |
| studiedPortrait | Dorian connects theatre, appearances and the warning near the mouth | Reveal later stages or decide the relationship |
| avoidedPortrait | Theatre can become a new external object of attention | Lock the player out of empathy |
| Reputation | Changes social temperature, introductions and public confidence | Decide Sibyl's fate alone |
| Conscience | Changes reflective lines and the felt cost after disappointment | Create a visible good route and bad route |
| Portrait | Changes contextual pressure around Dorian | Become a new personality scale |
| three choice records | The opening and Teacher mode show continuity | Discard history at the chapter boundary |

### 3.5 Current chapter-transition limitation

The intended transition is:

~~~text
c1-closing
  -> Chapter I is marked complete
  -> the same serialised state is preserved
  -> c2-theatre-lights opens with conditional text
~~~

At present, startNewGame defaults to c1-opening, the UI reads STORY_DATA.chapters[0] for home and Teacher mode, and chapterComplete becomes true at an ending without a multi-chapter handoff. These limitations are recorded for later implementation only.

---

## 4. Chapter II scene blueprint

These are structural proposals, not final scene texts.

### Scene 1 — c2-theatre-lights

- **English title:** *The Theatre in the Evening*
- **Kind:** opening / transition.
- **Content:** Dorian leaves Basil's studio and enters a small London theatre. He notices the audience, curtain and difference between public stage and private portrait. The theatre feels exciting, not sinister.
- **Characters:** Dorian; theatre manager or box-office presence; references to Basil and Henry.
- **Entry conditions:** Chapter I complete; all eight Chapter I outcomes enter here.
- **Decisions:** none.
- **Next:** c2-prince-charming.
- **State:** no mandatory numeric change; prose reads Henry, Basil, portrait and starting values.
- **Language:** theatre vocabulary, place description, on stage versus off stage.

### Scene 2 — c2-prince-charming

- **English title:** *Prince Charming*
- **Kind:** choice.
- **Content:** Dorian meets Sibyl after a performance. She is shy and less mysterious off stage. The contrast is not that she is false; she is a real person who cannot remain every heroine at once.
- **Characters:** Dorian, Sibyl, theatre manager in the background.
- **Entry conditions:** linear continuation.
- **Decision I:** how does Dorian respond?
  - **Admire the roles:** “You were every heroine at once.” Intoxicating and sincere, but treats Sibyl as an artistic experience.
  - **Ask about Sibyl:** “What is the play like for you?” Less dramatic, and creates space for her voice.
- **Next:** c2-many-heroines.
- **State:** begins, but does not permanently fix, the relationship profile.
- **Language:** feelings, first impressions and respectful personal questions.

### Scene 3 — c2-many-heroines

- **English title:** *Many Heroines*
- **Kind:** narrative montage.
- **Content:** Dorian returns on several evenings. Sibyl appears as different heroines; between performances she is tired, excited, uncertain and eager to discuss her family.
- **Characters:** Dorian, Sibyl, audience and brief theatre staff.
- **Entry conditions:** linear; conditional references to Decision I.
- **Decisions:** none.
- **Next:** c2-tell-basil-henry.
- **State:** optional local memory sawSeveralRoles; no mandatory numeric change.
- **Language:** frequency and sequence: night after night, at first, later, while.

### Scene 4 — c2-tell-basil-henry

- **English title:** *Two Stories About Sibyl*
- **Kind:** choice.
- **Content:** Dorian tells Henry and Basil about Sibyl. Henry is interested in novelty and experiment. Basil asks whether Dorian knows the woman or only the performances.
- **Characters:** Dorian, Lord Henry, Basil.
- **Entry conditions:** linear; dialogue varies with Chapter I flags.
- **Decision II:** how does Dorian describe Sibyl?
  - **Tell the beautiful story:** all the great heroines in one; romantic and socially impressive.
  - **Defend the person:** she is more than her parts and her ordinary life matters; less brilliant to Henry.
- **Next:** c2-offstage-sibyl.
- **State:** changes Reputation, Conscience, Portrait pressure and relationship profile.
- **Language:** opinions, comparison and reported speech.

### Scene 5 — c2-offstage-sibyl

- **English title:** *When the Curtain Falls*
- **Kind:** choice.
- **Content:** Dorian sees Sibyl outside the theatre, with family, money, work and expectation. Mrs Vane may appear briefly. Sibyl speaks about what she wants, not only what she can perform.
- **Characters:** Dorian, Sibyl, optional Mrs Vane.
- **Entry conditions:** linear; conditional dialogue from Decisions I and II.
- **Decision III:** what does Dorian do with ordinary reality?
  - **Listen to her life:** ask what she wants beyond the theatre.
  - **Ask her to stay inside the dream:** return to roles, costumes and the beautiful image.
  - **Make a grand promise before listening:** promise a future while leaving actual worries unanswered.
- **Next:** c2-engagement.
- **State:** makes the relationship profile legible; no choice is labelled correct.
- **Language:** expectations, hopes, promises and uncertainty.

### Scene 6 — c2-engagement

- **English title:** *A Promise in Public*
- **Kind:** narrative / conditional dialogue.
- **Content:** Dorian announces the engagement. Basil is surprised and tries to understand. Henry treats it as an interesting development. Public certainty can conceal private uncertainty.
- **Characters:** Dorian, Basil, Lord Henry; Sibyl through a letter or remembered line.
- **Entry conditions:** after c2-offstage-sibyl.
- **Decisions:** none; the promise decision already carries the relationship cost.
- **Next:** c2-final-performance.
- **State:** sets engagementAnnounced; no new numeric relationship score.
- **Language:** future forms, certainty and doubt.

### Scene 7 — c2-final-performance

- **English title:** *The Night of Romeo and Juliet*
- **Kind:** narrative centre.
- **Content:** Dorian brings Basil and Henry to see Sibyl. She enters as Juliet and cannot produce the earlier theatrical feeling. Her love has changed her relation to imitation.
- **Characters:** Dorian, Sibyl, Basil, Lord Henry and audience.
- **Entry conditions:** engagementAnnounced is true.
- **Decisions:** none before the performance ends; the player must witness disappointment before responding.
- **Next:** c2-backstage-choice.
- **State:** no automatic death and no automatic portrait change.
- **Language:** describing performance without dehumanising a performer: flat, uncertain, convincing, disappointed, confused, hurt.

### Scene 8 — c2-backstage-choice

- **English title:** *After the Curtain*
- **Kind:** choice / decisive scene.
- **Content:** Sibyl explains that real love has changed her theatrical passion. Dorian decides whether to judge the performance, listen to the person, or ask for time.
- **Characters:** Dorian and Sibyl; Basil and Henry remain outside or react indirectly.
- **Entry conditions:** linear from c2-final-performance.
- **Decision IV:**
  - **Judge the performance:** reject Sibyl because the art he loved has disappeared.
  - **Stay and listen:** hear her explanation before deciding what the relationship can become.
  - **Ask for time and return:** avoid an immediate cruel verdict, while risking uncertainty.
- **Next:** c2-the-morning-after.
- **State:** stores final response and resolves the finite Sibyl outcome.
- **Language:** disappointment, apology, regret and consequences.

### Scene 9 — c2-the-morning-after

- **English title:** *The Morning After*
- **Kind:** ending / conditional aftermath.
- **Content:** All branches share the same aftermath structure. In the canonical-inspired route, Dorian learns of Sibyl's death through Henry and confronts the portrait's altered expression. In alternatives, Sibyl survives and either leaves the relationship or remains in a more honest but fragile arrangement.
- **Characters:** Dorian, Henry, Sibyl or Mrs Vane depending on outcome; Basil may have one conditional line.
- **Entry conditions:** all branches from c2-backstage-choice.
- **Decisions:** none; the chapter ends on consequence, not another quiz.
- **Next:** no outgoing scene until Chapter III is approved.
- **State:** chapterComplete becomes true; persist sibylOutcome, final response, portrait context and full choice history.
- **Language:** because, therefore, as a result, I should have, I did not realise, I cannot undo.

---

## 5. Decision points and consequences

### 5.1 Proposed effects

These are design proposals for later approval. They use current ranges and should be clamped by the current engine.

Delta notation is Reputation / Conscience / Portrait.

| Decision | Choice | Motivation and immediate result | Long-term consequence | Proposed story fact |
| --- | --- | --- | --- | --- |
| I | Admire the roles | Dorian is sincerely overwhelmed by Sibyl's art. Delta +1 / -1 / +1. She feels adored but not fully recognised. | Reinforces a role-first relationship. | sibylRoleFirst |
| I | Ask about Sibyl | Dorian is curious about the woman beyond the stage. Delta 0 / +1 / 0. The conversation becomes personal. | Creates a basis for treating Sibyl as an agent. | sibylPersonSeen |
| II | Tell the beautiful story | Dorian wants Henry and Basil to understand the wonder. Delta +1 / -1 / +1. Henry is pleased; Basil is concerned. | Public idealisation sharpens later disappointment. | publicIdealisation |
| II | Defend the person | Dorian resists turning Sibyl into a social performance. Delta -1 / +1 / 0. Henry may call it sentimental. | Makes a compassionate response possible without guaranteeing it. | publicPersonhood |
| III | Listen to her life | Dorian accepts family, money, fear and tiredness as part of love. Delta 0 / +1 / 0. Sibyl feels heard. | Supports alive-together only if the final response is attentive. | respectfulPromise |
| III | Ask her to stay inside the dream | Dorian wants theatre to remain the centre of the bond. Delta +1 / -1 / +1. Admiration and reduction coexist. | Strongly supports role-first. | roleIdealisation |
| III | Make a grand promise before listening | Dorian means to be loving but avoids difficult details. Delta +1 / 0 / +1. Romance hides unanswered needs. | Can produce fragile engagement and estrangement. | grandPromise |
| IV | Judge the performance | Dorian experiences failed art as the loss of the woman he imagined. Delta +1 / -2 / +1. Sibyl is rejected. | Role-first plus cruelty enters the canonical-inspired tragedy; other profiles can still produce living estrangement. | finalResponse: cruel |
| IV | Stay and listen | Dorian accepts that love may change art. Delta -1 / +1 / 0. The conversation remains painful but human. | Person-first plus a respectful promise can lead to alive-together; otherwise alive-estranged. | finalResponse: listen |
| IV | Ask for time and return | Dorian avoids an irreversible verdict, but postponement is not care. Delta 0 / 0 / +1. Sibyl remains uncertain. | Leads to alive-estranged unless a later chapter develops explicit consent. | finalResponse: delay |

### 5.2 Relationship profile

Use a qualitative resolver, not a new meter:

~~~text
role-first:
  Decision I = admire the roles
  AND Decision II = tell the beautiful story
  AND Decision III = ask her to stay inside the dream

person-first:
  Decision I = ask about Sibyl
  AND at least one of Decision II or III gives Sibyl space as a person

mixed:
  every other combination
~~~

The profile is hidden from the player. It prevents one isolated click from deciding a major character's fate.

### 5.3 Outcome resolver

The finite outcome set is:

~~~text
dead-canonical
alive-estranged
alive-together
~~~

Proposed resolution:

~~~text
role-first + finalResponse = cruel
  -> dead-canonical

person-first + finalResponse = listen + respectfulPromise
  -> alive-together

all other combinations
  -> alive-estranged
~~~

Alive-together does not mean a perfect ending. Sibyl remains alive and the relationship continues under pressure. Alive-estranged means she remains alive but the relationship is damaged, paused or ended. Both outcomes must remain visible to later chapters.

This rule requires approval because it changes a major character's status relative to the novel.

---

## 6. Alternative branches and consistency

### 6.1 Branch classes

#### A. Canonical-inspired branch

1. Dorian idealises Sibyl through her roles.
2. He treats the loss of theatrical illusion as a personal betrayal.
3. He rejects her after Romeo and Juliet.
4. The portrait carries a stronger sign of cruelty.
5. Henry brings news of Sibyl's death.
6. Dorian briefly understands that his cruelty mattered, then begins to rationalise it.

This is canonical-inspired, not a claim that every line or interactive trigger appears in Wilde's text.

#### B. Alternative living branch

If Dorian consistently makes space for Sibyl as a person and listens after the poor performance, Sibyl survives. This must not be a reward screen. She may decide that her theatre, family and future cannot be organised around Dorian's idealisation.

She may continue acting, leave the theatre or take time away. Dorian must accept that love does not give him ownership of her career.

#### C. Shared events

All branches share theatre discovery, the meeting, repeated performances, the Henry/Basil conversation, the offstage conversation, engagement, final performance and aftermath. Only interpretation, short dialogue variants and the persistent Sibyl outcome diverge.

### 6.2 Consistency rules

1. A dead-canonical Sibyl never returns as a living participant.
2. An alive-estranged Sibyl returns only through an explicit later encounter, letter, report or memory; reconciliation is never assumed.
3. An alive-together Sibyl remains a living character with independent decisions and disagreements.
4. Chapter III and later chapters read sibylOutcome before creating a Sibyl scene.
5. Later scenes cannot silently turn alive-estranged into dead-canonical because of a low Conscience value.
6. Later scenes cannot turn dead-canonical into “she left town” for convenience.
7. Portrait may reflect Dorian's treatment of Sibyl, but cannot be the sole outcome source.
8. Conditional dialogue changes tone and reflection, not the chapter's shared dramatic spine.
9. Teacher mode labels survival routes as interactive alternatives.
10. Future tests cover every sibylOutcome and later-scene access.

### 6.3 Branch-control strategy

~~~text
many Chapter I states
  -> one Chapter II opening with conditional lines
  -> four compact decision points
  -> one qualitative resolver
  -> one shared aftermath with three outcome variants
  -> later chapters read one persistent outcome
~~~

Do not create an independent scene chain for every Chapter I state, Chapter II combination, portrait stage and Sibyl outcome. Store facts and choose short variants instead of cloning whole scenes.

---

## 7. Sensitive content and school suitability

### 7.1 Proposed content note

Before c2-the-morning-after:

> **Content note:** This chapter includes emotional cruelty, grief and a character's death after a non-graphic self-inflicted poisoning in the original novel. The scene is presented without graphic detail. In a classroom, you may pause before the aftermath and discuss the character's choices and the consequences.

The wording should be reviewed by the project owner and, if needed, a teacher or safeguarding reviewer.

### 7.2 Adaptation rules

- Do not show the death, substance, body or act visually.
- Do not use sound, animation or a portrait transition as a shock.
- Do not describe death as romantic proof that Sibyl loved Dorian.
- Do not frame the death as a simple punishment for one player choice.
- Keep Dorian's responsibility and Henry's reframing visible without claiming that one conversation mechanically caused the death.
- Give the player a pause before the aftermath.
- Let a teacher omit the canonical aftermath without corrupting saved story state.
- Keep survival emotionally serious; survival is not a prize and death is not a failure state.

---

## 8. B1 English and teaching goals

### 8.1 Learning goals

Learners should be able to:

- describe feelings before and after disappointment;
- distinguish an opinion about a performance from a judgement about a person;
- express expectations and explain why they changed;
- identify cause and consequence;
- disagree, apologise and ask for time politely;
- discuss outside influence in a relationship;
- compare public image with private reality.

### 8.2 Target vocabulary

| Group | Words and phrases |
| --- | --- |
| Theatre | stage, curtain, audience, performance, rehearsal, backstage, role, scene, actress |
| Feelings | excited, captivated, nervous, proud, hopeful, confused, disappointed, hurt, ashamed, relieved |
| Relationships | admire, trust, listen, promise, forgive, reject, support, belong, understand |
| Consequences | result, effect, responsibility, regret, harm, change, remain, leave, repair |
| Contrast | real, imagined, ordinary, extraordinary, public, private, sincere, artificial |

### 8.3 Useful phrases

- I was excited because...
- I expected her to...
- I did not realise that...
- She is more than her role.
- I admire the performance, but I also want to know the person.
- I was disappointed, but that does not give me the right to be cruel.
- Please listen before you decide.
- I should have asked what she wanted.
- As a result, ...
- I cannot change what happened, but I can decide what I do next.

### 8.4 Comprehension questions

These belong in Teacher mode or after a scene group, not after every dramatic choice.

1. Why does Dorian return to the theatre night after night?
2. What is different about Sibyl when she is not performing?
3. How does Henry describe the relation between art and life?
4. Why does Basil react differently from Henry?
5. What has Dorian expected from the final performance?
6. Why has Sibyl's acting changed?
7. Which words show Dorian's disappointment and Sibyl's hurt?
8. Which matters more: the performance or Dorian's response? Explain.

### 8.5 Discussion questions

1. Can admiration become a form of control?
2. Is it possible to love someone while loving an image of them more?
3. Should a person be judged by one bad performance or one bad day?
4. Why can a dramatic promise be attractive but unsafe?
5. How does Henry influence Dorian without making the decision for him?
6. Which Chapter I choice most changes Dorian's entrance into the theatre?
7. Is the survival route more hopeful, or simply more complicated?
8. What does the portrait remember that Dorian wants to forget?

---

## 9. Portrait and graphic direction

### 9.1 Recommendation

**Do not add a new image stage in Chapter II.**

The existing three-stage system is sufficient:

- Chapter I already establishes the first disturbance and painted warning.
- Chapter II can make stage 2 meaningful through context: the warning becomes connected to how Dorian treats another person.
- Portrait may rise to 3 while the existing mapping still displays stage 2.
- Stage 3 should remain reserved for Chapter III, where a visibly larger change can begin.

Chapter II may set c2PortraitMarked for later narrative context, but that flag must not change the current asset, threshold or path.

### 9.2 Literary purpose

The portrait should:

- connect the unseen effect of Dorian's choices to a visible object;
- contrast with Sibyl's ability to change her outer role;
- remind the player that a performance can change while a person remains responsible for a response;
- prepare Chapter III without spending the visual escalation early.

### 9.3 Illustration list

No files should be generated or added in Milestone 2A.

| Priority | Proposed file | Purpose | Format | Status |
| --- | --- | --- | --- | --- |
| P0 | character-sibyl-vane-stage.webp | Sibyl as a Victorian actress | 2:3, 1600 × 2400 | Already reserved in ASSET_MANIFEST.md |
| P0 | location-theatre-stage.webp | Theatre, curtain, stage and audience | 3:2, 2400 × 1600 | Already reserved |
| P0 | location-victorian-london-rain.webp | Transition between theatre and private conversation | 3:2, 2400 × 1600 | Already reserved |
| P1 | location-theatre-backstage.webp | Less glamorous private space after the curtain | 3:2, 2400 × 1600 | New proposal |
| P1 | location-sibyls-home.webp | Modest Vane family interior | 3:2, 2400 × 1600 | New proposal |
| P1 | character-sibyl-vane-offstage.webp | Sibyl outside a theatrical role | 2:3, 1600 × 2400 | New proposal |
| P2 | object-theatre-programme.webp | Optional prop for teacher or scene detail | Optional | Not required |

The three existing Chapter I portrait assets remain unchanged. Do not use a nonexistent Chapter II portrait file.

---

## 10. Technical risks and recommendations

### 10.1 Existing architecture that can be reused

The current data-driven structure already supports most content:

- scenes have chapterId, kind, paragraphs, terms, choices, effects, requires, nextScene and sourceNote;
- choose records history and applies numeric effects and boolean flags;
- meetsRequirements supports flags and minimum values;
- chapterForScene resolves scene metadata;
- portraitStageForValue preserves stable thresholds;
- local serialisation fits the offline classroom architecture.

### 10.2 Current limitations

1. **Chapter navigation:** startNewGame starts at c1-opening; no approved handoff exists.
2. **Sticky completion:** enterScene preserves chapterComplete once true; completion must become chapter-specific.
3. **Save versioning:** normaliseState accepts only version 1; Chapter II needs a migration.
4. **Boolean-only flags:** a mutually exclusive outcome needs an allow-listed scalar fact or a controlled boolean set.
5. **Conditional dialogue:** scenes currently have one fixed paragraphs array; Chapter II needs short safe variants.
6. **Hard-coded UI chapter:** home and Teacher mode read chapters[0].
7. **Character continuity:** no current registry prevents a later accidental reintroduction of a dead character.
8. **Tests:** current tests do not cover handoff, conditional prose, outcome persistence or later exclusion.

### 10.3 Minimum recommendation before implementation

Treat these as a small Chapter II enabling patch, not a whole-app refactor:

1. Add a version-2 save migration that preserves all current values, flags, choices and visited scenes.
2. Add an active chapter or chapter-completion record that can represent Chapter I complete while Chapter II is active.
3. Add an allow-listed non-numeric storyFacts object:

~~~text
storyFacts: {
  sibylRelationship: "role-first" | "mixed" | "person-first",
  sibylOutcome: "dead-canonical" | "alive-estranged" | "alive-together",
  c2FinalResponse: "cruel" | "listen" | "delay"
}
~~~

This is narrative state, not a new personality score.

4. Add safe conditional variants keyed by approved flags or story facts. Do not allow arbitrary JavaScript expressions in story data.
5. Make home, Teacher mode and chapter transition resolve the active chapter instead of indexing chapters[0].
6. Add tests that verify:
   - all Chapter I saves migrate without losing history;
   - all Chapter II decisions reach c2-the-morning-after;
   - all three Sibyl outcomes persist;
   - dead Sibyl is never available as a living participant;
   - living routes never imply canonical death;
   - portrait thresholds remain 0, 1 and 2–3.

No implementation of these recommendations belongs in Milestone 2A.

---

## 11. Questions requiring approval

### Narrative scope

1. Should Chapter II include the non-graphic death notification in its ending, or move it to Chapter III?
2. Is the three-outcome model acceptable: dead-canonical, alive-estranged, alive-together?
3. Is an alternative survival route desired even though it departs from Wilde's plot?
4. If Sibyl survives, should alive-estranged be the default, with alive-together available only after explicit approval?

### Adaptation and safeguarding

5. Is the proposed content note suitable for ages 15–19 and classroom use?
6. Should the canonical aftermath be skippable in classroom mode while remaining in saved story state?
7. Should the teacher note use “self-inflicted poisoning” or a gentler approved wording?

### State and visuals

8. Is storyFacts preferable to namespaced boolean flags?
9. Is it approved that Chapter II can raise Portrait to 3 while displaying the existing stage 2 asset?
10. Should offstage Sibyl and backstage/home illustrations wait for a later visual milestone?

---

## 12. Summary for approval

Chapter II should begin from the player's actual Chapter I state, not a generic reset. All eight Chapter I combinations enter the same theatre opening, but Henry's influence, Basil's trust, the portrait choice and the three numeric values change the tone and available reflections.

The proposal follows Wilde's verified 1891 sequence: theatre discovery, Sibyl's roles, the engagement, Romeo and Juliet, Dorian's response, the portrait's warning and the aftermath. It introduces four decisions without creating a complete game for every combination. A qualitative relationship resolver leads to one of three persistent Sibyl outcomes and then reunites the routes in a shared aftermath.

The key decisions to approve are:

- whether Sibyl may survive in an explicitly labelled alternative route;
- whether Chapter II includes the canonical death notification;
- whether the three-outcome state is acceptable for future chapters;
- whether Portrait may reach its existing maximum of 3 without a new image stage;
- whether the content warning and classroom pause behaviour are suitable.

No Chapter II code, image, engine change, commit, push or deploy is part of Milestone 2A.
