# DORIAN GRAY — MILESTONE 2B

## Approved Narrative Decisions & Multi-Chapter Foundation

**Status:** approved foundation. Chapter II scenes are not implemented.

This document records the decisions approved for the next implementation milestone and converts them into technical constraints. It does not replace the narrative blueprint; it is the authoritative decision record for Milestone 2B.

---

## 1. Sibyl Vane outcomes

Chapter II has three possible long-term outcomes:

- dead-canonical
- alive-estranged
- alive-together

The canonical-inspired route preserves Sibyl's death in the sequence of Wilde's novel. Alternative routes may let Sibyl survive, but survival is not a reward and death is not a punishment for one click.

The outcome must be produced by cumulative relationship decisions. Sibyl remains an independent character in every living route, with her own wishes, boundaries and later decisions. A living outcome never automatically means a happy relationship with Dorian.

Technical rule:

- store the outcome in storyFacts;
- do not use Reputation, Conscience or Portrait as a direct outcome selector;
- later chapters must read the stored outcome before presenting Sibyl;
- no later chapter may reintroduce a living Sibyl after dead-canonical.

---

## 2. Chapter II ending

Sibyl's complete story arc is closed in Chapter II.

The canonical-inspired route must reveal Sibyl's death before the Chapter II ending. The alternative routes must also resolve to a persistent living outcome before the ending. Chapter III starts from the stored result and must not infer it from a numeric value.

The ending is non-graphic. No scene may show the act, the method, a body or a stylised death image.

---

## 3. Portrait

Chapter II adds no image stage.

The current mapping is fixed:

- Portrait 0 → Stage 0;
- Portrait 1 → Stage 1;
- Portrait 2 or 3 → Stage 2.

No existing portrait file, threshold or asset path may change in this milestone.

Chapter II consequences may be stored as narrative facts, such as a future portrait context flag, so that Chapter III can use them when the next approved visual transformation is designed. The portrait itself must never decide Sibyl's outcome.

---

## 4. Sensitive content

Before the canonical aftermath, the player receives a factual, non-graphic content warning.

The warning must provide:

1. continue reading;
2. skip the sensitive description;
3. pause and return to the title screen.

Skipping removes only marked sensitive text. It does not alter choices, flags, values, storyFacts, completion or future outcomes. Pausing preserves the existing save and shows the warning again on resume.

The death must not be graphically shown or romanticised. The wording must not imply that a student mechanically caused a suicide with one click.

---

## 5. Persistent storyFacts contract

The v2 state contains this allow-listed structure:

~~~js
storyFacts: {
  sibylRelationship: null,
  sibylOutcome: null,
  c2FinalResponse: null
}
~~~

Allowed values:

~~~text
sibylRelationship: role-first | mixed | person-first
sibylOutcome: dead-canonical | alive-estranged | alive-together
c2FinalResponse: cruel | listen | delay
~~~

Null means that Chapter II has not yet determined the fact.

No arbitrary strings, JavaScript expressions or dynamic evaluation are allowed in story data. The Milestone 2B engine prepares validation only; it does not calculate these facts before Chapter II exists.

---

## 6. Conditional narrative contract

Short conditional variants may read:

- Chapter I flags;
- recorded choice history;
- Reputation, Conscience and Portrait;
- future storyFacts.

They must use declarative allow-listed conditions. They may change displayed text, but never mutate the game state. Unknown conditions resolve to false. Story content cannot execute JavaScript.

---

## 7. Chapter-aware UI contract

The application must not assume that chapters[0] is always the active chapter.

The story map now shows:

- Chapter I as playable or in progress;
- Chapter II as “In preparation” and unavailable.

No fictional Chapter II scenes or completion state are exposed. The general chapter handoff is prepared for the moment a playable firstScene is approved.

---

## 8. Save and migration contract

Save version 1 remains readable. Migration to version 2 preserves:

- Reputation;
- Conscience;
- Portrait;
- all boolean flags;
- choice history and reflections;
- visited scenes;
- timestamps;
- Chapter I completion.

Each chapter has an independent completion entry in completedChapters. A completed Chapter I must not make a future Chapter II immediately complete.

Malformed or incompatible data returns safely as no usable save. A valid legacy save is not silently deleted.

---

## 9. Scope boundary

Milestone 2B does not:

- add Chapter II scenes;
- calculate Sibyl's outcome;
- change Chapter I prose or choices;
- change portrait assets or thresholds;
- generate images;
- add AI APIs, backend, database or accounts;
- create external runtime dependencies;
- commit, push or deploy.

The next milestone may implement the approved Chapter II scene data only after the outcome resolver, sensitive-content wording and classroom behaviour have been accepted.
