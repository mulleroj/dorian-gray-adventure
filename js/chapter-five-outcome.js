const CHAPTER_FIVE_DECISION_DEFINITIONS = Object.freeze([
  Object.freeze([
    "ask-what-you-actually-saw",
    "defend-the-public-name",
    "attack-the-gossip"
  ]),
  Object.freeze([
    "warn-before-the-door",
    "challenge-him-to-look",
    "admit-partial-truth"
  ]),
  Object.freeze([
    "listen-and-answer",
    "blame-the-portrait-and-basil",
    "reject-his-judgement"
  ]),
  Object.freeze([
    "accept-basil-help",
    "end-the-conversation",
    "silence-the-witness"
  ])
]);

export const CHAPTER_FIVE_DECISION_CHOICE_IDS = Object.freeze(
  CHAPTER_FIVE_DECISION_DEFINITIONS.map((decision) => Object.freeze([...decision]))
);

const CHAPTER_FIVE_CHOICE_TO_DECISION = Object.freeze(
  Object.fromEntries(
    CHAPTER_FIVE_DECISION_CHOICE_IDS
      .flatMap((decision, decisionIndex) => decision.map((choiceId) => [choiceId, decisionIndex]))
  )
);

function isChoiceRecord(value) {
  return value !== null
    && typeof value === "object"
    && !Array.isArray(value)
    && typeof value.choiceId === "string";
}

function latestChapterFiveChoices(state = {}) {
  const selected = [null, null, null, null];
  const choices = Array.isArray(state?.choices) ? state.choices : [];

  // Choice history semantics are deterministic: the most recent valid record
  // for a decision replaces an earlier record for that same decision.
  for (const choice of choices) {
    if (!isChoiceRecord(choice)) continue;
    const decisionIndex = CHAPTER_FIVE_CHOICE_TO_DECISION[choice.choiceId];
    if (decisionIndex === undefined) continue;
    selected[decisionIndex] = choice.choiceId;
  }

  return selected;
}

/**
 * Resolve the approved Chapter V Basil outcome without changing game state.
 * The result is intentionally not written to storyFacts here; a future
 * Chapter V final scene may persist the result after this pure calculation.
 */
export function chapterFiveBasilOutcome(state = {}) {
  const [decisionOne, decisionTwo, decisionThree, finalChoice] = latestChapterFiveChoices(state);
  if (!decisionOne || !decisionTwo || !decisionThree || !finalChoice) return null;

  if (finalChoice === "accept-basil-help") {
    return decisionTwo === "admit-partial-truth" || decisionThree === "listen-and-answer"
      ? "alive-helping"
      : "alive-separated";
  }

  if (finalChoice === "end-the-conversation") return "alive-separated";

  if (finalChoice === "silence-the-witness") {
    const escalated = decisionOne === "attack-the-gossip"
      || decisionThree === "blame-the-portrait-and-basil"
      || decisionThree === "reject-his-judgement";
    return decisionTwo !== "admit-partial-truth" && escalated
      ? "dead-canonical"
      : "alive-separated";
  }

  return null;
}
