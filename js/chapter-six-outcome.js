const CHAPTER_SIX_DECISION_DEFINITIONS = Object.freeze([
  Object.freeze([
    "state-the-act-plainly",
    "use-it-as-proof",
    "admit-the-uncertainty"
  ]),
  Object.freeze([
    "protect-her-dignity",
    "protect-my-image",
    "refuse-the-question"
  ]),
  Object.freeze([
    "face-what-it-shows",
    "call-it-a-curse",
    "deny-it-can-judge"
  ]),
  Object.freeze([
    "stop-hiding-the-truth",
    "cover-the-portrait-again",
    "destroy-the-portrait"
  ])
]);

export const CHAPTER_SIX_DECISION_CHOICE_IDS = Object.freeze(
  CHAPTER_SIX_DECISION_DEFINITIONS.map((decision) => Object.freeze([...decision]))
);

const CHAPTER_SIX_CHOICE_TO_DECISION = Object.freeze(
  Object.fromEntries(
    CHAPTER_SIX_DECISION_CHOICE_IDS
      .flatMap((decision, decisionIndex) => decision.map((choiceId) => [choiceId, decisionIndex]))
  )
);

const CHAPTER_SIX_FINAL_OUTCOMES = Object.freeze({
  "stop-hiding-the-truth": "truth-faced",
  "cover-the-portrait-again": "secret-kept",
  "destroy-the-portrait": "portrait-destroyed"
});

function isChoiceRecord(value) {
  return value !== null
    && typeof value === "object"
    && !Array.isArray(value)
    && typeof value.choiceId === "string";
}

function latestChapterSixChoices(state = {}) {
  const selected = [null, null, null, null];
  const choices = Array.isArray(state?.choices) ? state.choices : [];

  for (const choice of choices) {
    if (!isChoiceRecord(choice)) continue;
    const decisionIndex = CHAPTER_SIX_CHOICE_TO_DECISION[choice.choiceId];
    if (decisionIndex === undefined) continue;
    selected[decisionIndex] = choice.choiceId;
  }

  return selected;
}

/**
 * Resolve the approved Chapter VI outcome without changing game state.
 * Decision IV is the only source of the final outcome; Decisions I–III
 * remain available for interpretation, reflection, and future Teacher mode.
 */
export function chapterSixOutcome(state = {}) {
  const [, , , finalChoice] = latestChapterSixChoices(state);
  return finalChoice ? CHAPTER_SIX_FINAL_OUTCOMES[finalChoice] ?? null : null;
}
