const CHAPTER_FOUR_CHOICE_DEFINITIONS = Object.freeze([
  Object.freeze([
    Object.freeze({ id: "share-the-evening", stance: "reflection" }),
    Object.freeze({ id: "shape-the-evening", stance: "control" }),
    Object.freeze({ id: "charm-as-shield", stance: "escape" })
  ]),
  Object.freeze([
    Object.freeze({ id: "ask-what-was-seen", stance: "reflection" }),
    Object.freeze({ id: "calmly-deflect", stance: "control" }),
    Object.freeze({ id: "joke-about-rumour", stance: "escape" })
  ]),
  Object.freeze([
    Object.freeze({ id: "share-the-music", stance: "reflection" }),
    Object.freeze({ id: "control-the-memory", stance: "control" }),
    Object.freeze({ id: "beauty-as-shield", stance: "escape" })
  ]),
  Object.freeze([
    Object.freeze({ id: "name-the-change", stance: "reflection" }),
    Object.freeze({ id: "control-the-comparison", stance: "control" }),
    Object.freeze({ id: "cover-and-return", stance: "escape" })
  ])
]);

export const CHAPTER_FOUR_DECISION_CHOICE_IDS = Object.freeze(
  CHAPTER_FOUR_CHOICE_DEFINITIONS.map((decision) => Object.freeze(decision.map((choice) => choice.id)))
);

export const CHAPTER_FOUR_CHOICE_CLASSIFICATION = Object.freeze(
  Object.fromEntries(
    CHAPTER_FOUR_CHOICE_DEFINITIONS
      .flat()
      .map(({ id, stance }) => [id, stance])
  )
);

export const CHAPTER_FOUR_BEHAVIOUR_PROFILES = Object.freeze({
  REFLECTION: "self-examining",
  DIVIDED: "divided",
  ESCAPE: "pleasure-as-escape"
});

function isChoiceRecord(value) {
  return value !== null
    && typeof value === "object"
    && !Array.isArray(value)
    && typeof value.choiceId === "string";
}

export function chapterFourBehaviourProfile(state = {}) {
  const choices = Array.isArray(state?.choices) ? state.choices : [];
  let reflectionCount = 0;
  let escapeCount = 0;

  for (const choice of choices) {
    if (!isChoiceRecord(choice)) continue;

    const stance = CHAPTER_FOUR_CHOICE_CLASSIFICATION[choice.choiceId];
    if (stance === "reflection") reflectionCount += 1;
    if (stance === "escape") escapeCount += 1;
  }

  if (reflectionCount >= 3) return CHAPTER_FOUR_BEHAVIOUR_PROFILES.REFLECTION;
  if (escapeCount >= 3) return CHAPTER_FOUR_BEHAVIOUR_PROFILES.ESCAPE;
  return CHAPTER_FOUR_BEHAVIOUR_PROFILES.DIVIDED;
}
