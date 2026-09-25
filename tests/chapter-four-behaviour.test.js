import test from "node:test";
import assert from "node:assert/strict";

const {
  CHAPTER_FOUR_BEHAVIOUR_PROFILES,
  CHAPTER_FOUR_CHOICE_CLASSIFICATION,
  CHAPTER_FOUR_DECISION_CHOICE_IDS,
  chapterFourBehaviourProfile
} = await import("../js/chapter-four-behaviour.js");

test("Chapter IV reserves the approved four-decision classification map", () => {
  assert.deepEqual(CHAPTER_FOUR_DECISION_CHOICE_IDS, [
    ["share-the-evening", "shape-the-evening", "charm-as-shield"],
    ["ask-what-was-seen", "calmly-deflect", "joke-about-rumour"],
    ["share-the-music", "control-the-memory", "beauty-as-shield"],
    ["name-the-change", "control-the-comparison", "cover-and-return"]
  ]);

  assert.deepEqual(CHAPTER_FOUR_CHOICE_CLASSIFICATION, {
    "share-the-evening": "reflection",
    "shape-the-evening": "control",
    "charm-as-shield": "escape",
    "ask-what-was-seen": "reflection",
    "calmly-deflect": "control",
    "joke-about-rumour": "escape",
    "share-the-music": "reflection",
    "control-the-memory": "control",
    "beauty-as-shield": "escape",
    "name-the-change": "reflection",
    "control-the-comparison": "control",
    "cover-and-return": "escape"
  });
});

test("the resolver classifies all 81 future Chapter IV choice combinations", () => {
  let combinations = 0;

  for (const first of CHAPTER_FOUR_DECISION_CHOICE_IDS[0]) {
    for (const second of CHAPTER_FOUR_DECISION_CHOICE_IDS[1]) {
      for (const third of CHAPTER_FOUR_DECISION_CHOICE_IDS[2]) {
        for (const fourth of CHAPTER_FOUR_DECISION_CHOICE_IDS[3]) {
          const choiceIds = [first, second, third, fourth];
          const reflectionCount = choiceIds.filter((choiceId) => CHAPTER_FOUR_CHOICE_CLASSIFICATION[choiceId] === "reflection").length;
          const escapeCount = choiceIds.filter((choiceId) => CHAPTER_FOUR_CHOICE_CLASSIFICATION[choiceId] === "escape").length;
          const expected = reflectionCount >= 3
            ? CHAPTER_FOUR_BEHAVIOUR_PROFILES.REFLECTION
            : escapeCount >= 3
              ? CHAPTER_FOUR_BEHAVIOUR_PROFILES.ESCAPE
              : CHAPTER_FOUR_BEHAVIOUR_PROFILES.DIVIDED;

          assert.equal(
            chapterFourBehaviourProfile({
              choices: choiceIds.map((choiceId, index) => ({
                sceneId: `future-decision-${index + 1}`,
                choiceId
              }))
            }),
            expected,
            choiceIds.join(" / ")
          );
          combinations += 1;
        }
      }
    }
  }

  assert.equal(combinations, 81);
});

test("the resolver ignores earlier chapters, unknown IDs and malformed records", () => {
  const state = {
    storyFacts: { chapterFourBehaviour: "must-not-be-read" },
    choices: [
      { sceneId: "c1-henry-arrives", choiceId: "listen-to-henry" },
      { sceneId: "c2-prince-charming", choiceId: "admire-the-roles" },
      { sceneId: "c3-basil-arrives", choiceId: "defend-basil" },
      { sceneId: "unknown", choiceId: "not-a-chapter-four-choice" },
      null,
      42,
      { sceneId: "future-decision", choiceId: 17 },
      { sceneId: "future-decision", choiceId: "" }
    ]
  };

  assert.equal(chapterFourBehaviourProfile(state), CHAPTER_FOUR_BEHAVIOUR_PROFILES.DIVIDED);
});

test("empty, old and malformed saves safely resolve to divided without mutation", () => {
  const states = [
    undefined,
    {},
    { choices: [] },
    { choices: null },
    { choices: "not-an-array" },
    { choices: [{ sceneId: "old-scene", choiceId: "old-choice" }] }
  ];

  for (const state of states) {
    assert.equal(chapterFourBehaviourProfile(state), CHAPTER_FOUR_BEHAVIOUR_PROFILES.DIVIDED);
  }

  const state = {
    choices: [{ sceneId: "future-decision", choiceId: "share-the-evening" }],
    storyFacts: { portraitStageUnlock: "stage-3" }
  };
  const before = structuredClone(state);

  assert.equal(chapterFourBehaviourProfile(state), CHAPTER_FOUR_BEHAVIOUR_PROFILES.DIVIDED);
  assert.deepEqual(state, before);
});
