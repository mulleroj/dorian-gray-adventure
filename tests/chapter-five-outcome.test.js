import test from "node:test";
import assert from "node:assert/strict";

const {
  CHAPTER_FIVE_DECISION_CHOICE_IDS,
  chapterFiveBasilOutcome
} = await import("../js/chapter-five-outcome.js");

const approvedOutcomes = new Set(["dead-canonical", "alive-separated", "alive-helping"]);

function stateFor(choiceIds, overrides = {}) {
  return {
    reputation: 0,
    conscience: 0,
    portrait: 0,
    flags: {},
    storyFacts: {
      basilSuspicion: "uneasy",
      sibylOutcome: "alive-estranged",
      yellowBookResponse: "questioned"
    },
    choices: choiceIds.map((choiceId, index) => ({
      sceneId: `c5-decision-${index + 1}`,
      choiceId
    })),
    ...overrides
  };
}

function expectedOutcome([decisionOne, decisionTwo, decisionThree, finalChoice]) {
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

test("Chapter V exposes exactly four decision groups and twelve unique choice IDs", () => {
  assert.equal(CHAPTER_FIVE_DECISION_CHOICE_IDS.length, 4);
  assert.deepEqual(CHAPTER_FIVE_DECISION_CHOICE_IDS.map((decision) => decision.length), [3, 3, 3, 3]);

  const choiceIds = CHAPTER_FIVE_DECISION_CHOICE_IDS.flat();
  assert.equal(new Set(choiceIds).size, 12);
  assert.deepEqual(choiceIds, [
    "ask-what-you-actually-saw",
    "defend-the-public-name",
    "attack-the-gossip",
    "warn-before-the-door",
    "challenge-him-to-look",
    "admit-partial-truth",
    "listen-and-answer",
    "blame-the-portrait-and-basil",
    "reject-his-judgement",
    "accept-basil-help",
    "end-the-conversation",
    "silence-the-witness"
  ]);
});

test("all 81 Chapter V Basil outcome combinations resolve deterministically", () => {
  const distribution = {
    "dead-canonical": 0,
    "alive-separated": 0,
    "alive-helping": 0
  };
  let combinations = 0;

  for (const decisionOne of CHAPTER_FIVE_DECISION_CHOICE_IDS[0]) {
    for (const decisionTwo of CHAPTER_FIVE_DECISION_CHOICE_IDS[1]) {
      for (const decisionThree of CHAPTER_FIVE_DECISION_CHOICE_IDS[2]) {
        for (const finalChoice of CHAPTER_FIVE_DECISION_CHOICE_IDS[3]) {
          const choiceIds = [decisionOne, decisionTwo, decisionThree, finalChoice];
          const state = stateFor(choiceIds);
          const before = structuredClone(state);
          const result = chapterFiveBasilOutcome(state);

          assert.equal(result, expectedOutcome(choiceIds), choiceIds.join(" / "));
          assert.equal(approvedOutcomes.has(result), true, choiceIds.join(" / "));
          assert.equal(chapterFiveBasilOutcome(state), result, choiceIds.join(" / "));
          assert.deepEqual(state, before, choiceIds.join(" / "));
          distribution[result] += 1;
          combinations += 1;
        }
      }
    }
  }

  assert.equal(combinations, 81);
  assert.equal(Object.values(distribution).reduce((sum, count) => sum + count, 0), 81);
  assert.ok(distribution["dead-canonical"] > 0);
  assert.ok(distribution["alive-separated"] > 0);
  assert.ok(distribution["alive-helping"] > 0);
});

test("outcome ignores numeric state, continuity facts, behaviour inputs, older choices and flags", () => {
  const choiceIds = ["attack-the-gossip", "warn-before-the-door", "reject-his-judgement", "silence-the-witness"];
  const expected = chapterFiveBasilOutcome(stateFor(choiceIds));
  const varied = stateFor(choiceIds, {
    reputation: -3,
    conscience: 3,
    portrait: 3,
    flags: { heardHenry: true, defendedBasil: false, challengedHenry: true },
    storyFacts: {
      basilSuspicion: "clear",
      sibylOutcome: "dead-canonical",
      yellowBookResponse: "accepted"
    },
    choices: [
      { sceneId: "c1-henry-arrives", choiceId: "listen-to-henry" },
      { sceneId: "c2-final-performance", choiceId: "judge-the-performance" },
      ...stateFor(choiceIds).choices
    ]
  });

  assert.equal(expected, "dead-canonical");
  assert.equal(chapterFiveBasilOutcome(varied), expected);
});

test("incomplete, unknown and malformed histories return null safely", () => {
  const cases = [
    undefined,
    {},
    { choices: [] },
    { choices: null },
    { choices: "not-an-array" },
    { choices: [{ sceneId: "c1-old", choiceId: "listen-to-henry" }] },
    { choices: [{ choiceId: "ask-what-you-actually-saw" }] },
    { choices: [null, 42, { choiceId: 17 }, { choiceId: "not-a-chapter-five-choice" }] },
    { choices: [{ sceneId: "c5-decision-1", choiceId: "ask-what-you-actually-saw" }, { sceneId: "c5-decision-2", choiceId: "warn-before-the-door" }] },
    { choices: [{ sceneId: "c5-decision-1", choiceId: "ask-what-you-actually-saw" }, { sceneId: "c5-decision-2", choiceId: "warn-before-the-door" }, { sceneId: "c5-decision-3", choiceId: "listen-and-answer" }] }
  ];

  for (const state of cases) assert.equal(chapterFiveBasilOutcome(state), null);
});

test("duplicate valid decision records use the most recent valid choice", () => {
  const state = stateFor([
    "attack-the-gossip",
    "warn-before-the-door",
    "reject-his-judgement",
    "silence-the-witness"
  ]);

  assert.equal(chapterFiveBasilOutcome(state), "dead-canonical");
  state.choices.push({ sceneId: "c5-decision-2-latest", choiceId: "admit-partial-truth" });
  assert.equal(chapterFiveBasilOutcome(state), "alive-separated");
});

test("resolver does not write basilOutcome or mutate the input", () => {
  const state = stateFor([
    "ask-what-you-actually-saw",
    "admit-partial-truth",
    "listen-and-answer",
    "accept-basil-help"
  ]);
  const before = structuredClone(state);

  assert.equal(chapterFiveBasilOutcome(state), "alive-helping");
  assert.deepEqual(state, before);
  assert.equal(Object.hasOwn(state, "basilOutcome"), false);
});
