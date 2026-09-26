import test from "node:test";
import assert from "node:assert/strict";

globalThis.localStorage = {
  data: new Map(),
  getItem(key) { return this.data.get(key) ?? null; },
  setItem(key, value) { this.data.set(key, value); },
  removeItem(key) { this.data.delete(key); }
};

const { STORY_DATA } = await import("../js/story-data.js");
const { normaliseState, loadState } = await import("../js/game-state.js");
const {
  canEnterScene,
  choose,
  continueFromScene,
  continueToChapter,
  portraitStage
} = await import("../js/game-engine.js");
const { chapterFiveBasilOutcome, CHAPTER_FIVE_DECISION_CHOICE_IDS } = await import("../js/chapter-five-outcome.js");
const {
  contentWarningAction,
  contentWarningForScene,
  resolveSceneParagraphs
} = await import("../js/narrative-resolver.js");
const { chapterFourBehaviourProfile } = await import("../js/chapter-four-behaviour.js");

const chapterFiveSceneIds = [
  "c5-fog-at-the-door",
  "c5-what-people-say",
  "c5-answer-basil",
  "c5-show-you-the-truth",
  "c5-the-locked-room",
  "c5-basil-sees",
  "c5-basil-asks-for-change",
  "c5-after-the-truth",
  "c5-final-response",
  "c5-after-the-door"
];

const chapterFiveDecisionSceneIds = [
  "c5-answer-basil",
  "c5-the-locked-room",
  "c5-after-the-truth",
  "c5-final-response"
];

const chapterFourDecisionSceneIds = [
  "c4-house-open",
  "c4-whispers",
  "c4-chosen-pleasure",
  "c4-locked-room-again"
];

const chapterFourProfiles = {
  "self-examining": ["share-the-evening", "ask-what-was-seen", "share-the-music", "name-the-change"],
  divided: ["share-the-evening", "calmly-deflect", "control-the-memory", "name-the-change"],
  "pleasure-as-escape": ["charm-as-shield", "joke-about-rumour", "beauty-as-shield", "cover-and-return"]
};

function chapterFourHandoff(overrides = {}) {
  const storyFacts = {
    portraitLocation: "locked-schoolroom",
    portraitStageUnlock: "stage-4",
    basilSuspicion: "uneasy",
    sibylOutcome: "alive-estranged",
    yellowBookResponse: "questioned",
    basilOutcome: null,
    ...(overrides.storyFacts ?? {})
  };
  const choices = [
    { sceneId: "c4-house-open", choiceId: "share-the-evening", reflection: "shared" },
    { sceneId: "c4-whispers", choiceId: "ask-what-was-seen", reflection: "observed" },
    { sceneId: "c4-chosen-pleasure", choiceId: "share-the-music", reflection: "shared" },
    { sceneId: "c4-locked-room-again", choiceId: "name-the-change", reflection: "named" }
  ];
  const profileChoices = overrides.behaviourProfile
    ? chapterFourProfiles[overrides.behaviourProfile]
    : null;
  if (profileChoices) {
    profileChoices.forEach((choiceId, index) => {
      choices[index] = {
        sceneId: chapterFourDecisionSceneIds[index],
        choiceId,
        reflection: choiceId
      };
    });
  }
  return normaliseState({
    version: 2,
    sceneId: "c4-threshold",
    activeChapterId: "chapter-4",
    reputation: overrides.reputation ?? 0,
    conscience: overrides.conscience ?? 0,
    portrait: overrides.portrait ?? 0,
    flags: { heardHenry: true, defendedBasil: true, ...(overrides.flags ?? {}) },
    storyFacts,
    choices,
    visitedScenes: ["c4-threshold"],
    completedChapters: { "chapter-1": true, "chapter-2": true, "chapter-3": true, "chapter-4": true },
    startedAt: "2026-09-25T10:00:00.000Z",
    updatedAt: "2026-09-25T10:01:00.000Z",
    chapterComplete: true
  });
}

function advance(state, sceneId) {
  assert.equal(state.sceneId, sceneId);
  const result = continueFromScene(state, sceneId);
  assert.equal(result.ok, true, "could not continue from " + sceneId);
  return result.state;
}

function chooseFrom(state, sceneId, choiceId) {
  assert.equal(state.sceneId, sceneId);
  const result = choose(state, sceneId, choiceId);
  assert.equal(result.ok, true, "could not choose " + sceneId + "/" + choiceId);
  return result.state;
}

function enterChapterFive(overrides = {}) {
  localStorage.data.clear();
  const handoff = chapterFourHandoff(overrides);
  const entered = continueToChapter(handoff, "chapter-5");
  assert.equal(entered.ok, true);
  return entered.state;
}

function playChapterFive(choiceIds, overrides = {}) {
  let state = enterChapterFive(overrides);
  const visited = [state.sceneId];
  state = advance(state, "c5-fog-at-the-door");
  visited.push(state.sceneId);
  state = advance(state, "c5-what-people-say");
  visited.push(state.sceneId);
  state = chooseFrom(state, "c5-answer-basil", choiceIds[0]);
  visited.push(state.sceneId);
  state = advance(state, "c5-show-you-the-truth");
  visited.push(state.sceneId);
  const beforeReveal = state;
  assert.equal(portraitStage(state), 4);
  state = chooseFrom(state, "c5-the-locked-room", choiceIds[1]);
  visited.push(state.sceneId);
  const afterReveal = state;
  assert.equal(state.sceneId, "c5-basil-sees");
  assert.equal(portraitStage(state), 5);
  assert.equal(state.storyFacts.basilOutcome, null);
  state = advance(state, "c5-basil-sees");
  visited.push(state.sceneId);
  state = advance(state, "c5-basil-asks-for-change");
  visited.push(state.sceneId);
  state = chooseFrom(state, "c5-after-the-truth", choiceIds[2]);
  visited.push(state.sceneId);
  assert.equal(state.storyFacts.basilOutcome, null);
  state = chooseFrom(state, "c5-final-response", choiceIds[3]);
  visited.push(state.sceneId);
  assert.equal(state.sceneId, "c5-after-the-door");
  assert.equal(state.storyFacts.basilOutcome, chapterFiveBasilOutcome(state));
  state = advance(state, "c5-after-the-door");
  assert.equal(state.sceneId, "c5-after-the-door");
  assert.equal(state.completedChapters["chapter-5"], true);
  assert.deepEqual(state.visitedScenes.filter((sceneId) => sceneId.startsWith("c5-")), chapterFiveSceneIds);
  assert.deepEqual(visited, chapterFiveSceneIds);
  return { state, beforeReveal, afterReveal };
}

test("Chapter V story-data matches the central four-decision contract", () => {
  const choiceIds = chapterFiveDecisionSceneIds.map((sceneId) => STORY_DATA.scenes[sceneId].choices.map((choice) => choice.id));
  assert.deepEqual(choiceIds, CHAPTER_FIVE_DECISION_CHOICE_IDS);
  assert.equal(new Set(choiceIds.flat()).size, 12);
  assert.deepEqual(Object.keys(STORY_DATA.scenes).filter((sceneId) => sceneId.startsWith("c5-")), chapterFiveSceneIds);
});

test("all 81 Chapter V local paths reach the universal witness and completion", () => {
  const distribution = { "dead-canonical": 0, "alive-separated": 0, "alive-helping": 0 };
  let paths = 0;

  for (const first of CHAPTER_FIVE_DECISION_CHOICE_IDS[0]) {
    for (const second of CHAPTER_FIVE_DECISION_CHOICE_IDS[1]) {
      for (const third of CHAPTER_FIVE_DECISION_CHOICE_IDS[2]) {
        for (const finalChoice of CHAPTER_FIVE_DECISION_CHOICE_IDS[3]) {
          const result = playChapterFive([first, second, third, finalChoice]);
          const state = result.state;
          const chapterChoices = state.choices.filter((choice) => choice.sceneId.startsWith("c5-"));
          assert.equal(chapterChoices.length, 4);
          assert.deepEqual(chapterChoices.map((choice) => choice.choiceId), [first, second, third, finalChoice]);
          assert.equal(state.storyFacts.basilOutcome, chapterFiveBasilOutcome(state));
          assert.equal(state.completedChapters["chapter-5"], true);
          assert.equal(state.completedChapters["chapter-6"], undefined);
          assert.equal(state.activeChapterId, "chapter-5");
          assert.equal(canEnterScene(state, "c5-after-the-door"), true);
          assert.equal(STORY_DATA.chapters.some((chapter) => chapter.id === "chapter-6"), false);
          distribution[state.storyFacts.basilOutcome] += 1;
          paths += 1;
        }
      }
    }
  }

  assert.equal(paths, 81);
  assert.deepEqual(distribution, {
    "dead-canonical": 14,
    "alive-separated": 52,
    "alive-helping": 15
  });
});

test("Chapter V records the final outcome only after Decision IV", () => {
  let state = enterChapterFive();
  state = advance(state, "c5-fog-at-the-door");
  state = advance(state, "c5-what-people-say");
  state = chooseFrom(state, "c5-answer-basil", "ask-what-you-actually-saw");
  state = advance(state, "c5-show-you-the-truth");
  state = chooseFrom(state, "c5-the-locked-room", "admit-partial-truth");
  assert.equal(state.storyFacts.basilOutcome, null);
  state = advance(state, "c5-basil-sees");
  state = advance(state, "c5-basil-asks-for-change");
  state = chooseFrom(state, "c5-after-the-truth", "listen-and-answer");
  assert.equal(state.storyFacts.basilOutcome, null);
  state = chooseFrom(state, "c5-final-response", "accept-basil-help");
  assert.equal(state.storyFacts.basilOutcome, "alive-helping");
  assert.equal(state.choices.filter((choice) => choice.choiceId === "accept-basil-help").length, 1);
});

test("Stage 4 becomes Stage 5 universally and survives numeric variation", () => {
  for (const portrait of [0, 1, 2, 3]) {
    const result = playChapterFive([
      "ask-what-you-actually-saw",
      "warn-before-the-door",
      "listen-and-answer",
      "end-the-conversation"
    ], { portrait });
    assert.equal(portraitStage(result.beforeReveal), 4);
    assert.equal(portraitStage(result.afterReveal), 5);
    assert.equal(loadState().storyFacts.portraitStageUnlock, "stage-5");
    assert.equal(loadState().portrait, portrait);
  }
});

test("Basil knowledge boundary is preserved before and after the witness scene", () => {
  const preState = chapterFourHandoff({ storyFacts: { basilSuspicion: "clear" } });
  const beforeText = [
    "c5-fog-at-the-door",
    "c5-what-people-say",
    "c5-answer-basil",
    "c5-show-you-the-truth",
    "c5-the-locked-room"
  ].flatMap((sceneId) => resolveSceneParagraphs(STORY_DATA.scenes[sceneId], preState)).join(" ");
  assert.doesNotMatch(beforeText, /Basil (?:has )?seen the (?:changed )?portrait|Basil understood the supernatural secret|Basil entered the room earlier/i);
  assert.match(beforeText, /has not seen the portrait|does not know about the portrait/i);

  const afterText = ["c5-basil-sees", "c5-basil-asks-for-change", "c5-after-the-truth"]
    .flatMap((sceneId) => resolveSceneParagraphs(STORY_DATA.scenes[sceneId], { ...preState, storyFacts: { ...preState.storyFacts, portraitStageUnlock: "stage-5" } }))
    .join(" ");
  assert.match(afterText, /Basil sees the changed portrait|recognises Dorian/i);
  assert.doesNotMatch(afterText, /has not seen it|only guessing whether a portrait exists/i);
});

test("representative continuity classes keep Sibyl, yellow-book and behaviour semantics", () => {
  const yellowBook = ["accepted", "questioned", "escape"];
  const sibyl = ["dead-canonical", "alive-estranged", "alive-together"];
  const profiles = ["self-examining", "divided", "pleasure-as-escape"];
  let classes = 0;

  for (const yellowBookResponse of yellowBook) {
    for (const sibylOutcome of sibyl) {
      for (const behaviourProfile of profiles) {
        const state = chapterFourHandoff({
          behaviourProfile,
          storyFacts: { yellowBookResponse, sibylOutcome, basilSuspicion: "suspects" }
        });
        const text = resolveSceneParagraphs(STORY_DATA.scenes["c5-what-people-say"], state).join(" ");
        assert.match(text, behaviourProfile === "self-examining"
          ? /looking for specifics/
          : behaviourProfile === "divided"
            ? /Public control and private fear/
            : /polished answer/);
        assert.match(text, yellowBookResponse === "accepted"
          ? /elegant idea/
          : yellowBookResponse === "questioned"
            ? /attractive idea/
            : /abstraction/);
        if (sibylOutcome === "dead-canonical") {
          assert.match(text, /memory of loss/);
          assert.doesNotMatch(text, /Sibyl is alive|Sibyl remains alive/);
        } else if (sibylOutcome === "alive-estranged") {
          assert.match(text, /Sibyl is alive and independent/);
          assert.doesNotMatch(text, /marriage|children|permanent happiness/);
        } else {
          assert.match(text, /Sibyl remains part of your life/);
          assert.doesNotMatch(text, /marriage|children|perfect happiness/);
        }
        assert.equal(chapterFourBehaviourProfile(state), behaviourProfile);
        classes += 1;
      }
    }
  }

  assert.equal(classes, 27);
  for (const [choiceIds, expected] of [
    [["attack-the-gossip", "warn-before-the-door", "reject-his-judgement", "silence-the-witness"], "dead-canonical"],
    [["ask-what-you-actually-saw", "warn-before-the-door", "listen-and-answer", "end-the-conversation"], "alive-separated"],
    [["ask-what-you-actually-saw", "admit-partial-truth", "listen-and-answer", "accept-basil-help"], "alive-helping"]
  ]) {
    assert.equal(playChapterFive(choiceIds, { storyFacts: { sibylOutcome: "alive-together" } }).state.storyFacts.basilOutcome, expected);
  }
});

test("Chapter V warning is canonical-only, safe, and skip preserves the fact", () => {
  const dead = playChapterFive([
    "attack-the-gossip",
    "warn-before-the-door",
    "reject-his-judgement",
    "silence-the-witness"
  ]).state;
  const ending = STORY_DATA.scenes["c5-after-the-door"];
  const warning = contentWarningForScene(ending, dead);
  assert.equal(warning.canSkip, true);
  assert.match(warning.message, /non-graphic/);
  for (const action of ["continue", "skip", "pause"]) {
    assert.deepEqual(contentWarningAction(ending, action, dead), { ok: true, action });
  }
  const continued = resolveSceneParagraphs(ending, dead);
  const skipped = resolveSceneParagraphs(ending, dead, { skipSensitive: true });
  assert.ok(continued.some((paragraph) => /breaking point/.test(paragraph)));
  assert.ok(skipped.some((paragraph) => /Basil is dead/.test(paragraph)));
  assert.ok(!skipped.some((paragraph) => /breaking point/.test(paragraph)));
  assert.equal(dead.storyFacts.basilOutcome, "dead-canonical");

  for (const outcomeChoices of [
    ["ask-what-you-actually-saw", "warn-before-the-door", "listen-and-answer", "end-the-conversation"],
    ["ask-what-you-actually-saw", "admit-partial-truth", "listen-and-answer", "accept-basil-help"]
  ]) {
    const living = playChapterFive(outcomeChoices).state;
    assert.equal(contentWarningForScene(ending, living), null);
  }
});

test("Chapter V prose avoids graphic or procedural safeguarding leaks", () => {
  const texts = [];
  for (const sceneId of chapterFiveSceneIds) {
    const scene = STORY_DATA.scenes[sceneId];
    for (const basilOutcome of ["dead-canonical", "alive-separated", "alive-helping"]) {
      texts.push(resolveSceneParagraphs(scene, {
        storyFacts: {
          basilOutcome,
          basilSuspicion: "clear",
          sibylOutcome: "alive-estranged",
          yellowBookResponse: "questioned",
          portraitStageUnlock: "stage-5"
        }
      }).join(" "));
    }
  }
  const prose = texts.join(" ");
  assert.doesNotMatch(prose, /weapon|stabbing|stabbed|blood|wound|corpse|body position|forensic|servant deception|investigation walkthrough/i);
  assert.match(prose, /Basil is dead/);
  assert.match(prose, /Basil survives and leaves/);
});

test("Chapter V save and reload preserves entry, Stage 5, outcome and completion", () => {
  let state = enterChapterFive();
  assert.equal(loadState().activeChapterId, "chapter-5");
  assert.equal(loadState().storyFacts.basilOutcome, null);
  state = advance(state, "c5-fog-at-the-door");
  state = advance(state, "c5-what-people-say");
  state = chooseFrom(state, "c5-answer-basil", "ask-what-you-actually-saw");
  state = advance(state, "c5-show-you-the-truth");
  state = chooseFrom(state, "c5-the-locked-room", "admit-partial-truth");
  assert.equal(loadState().storyFacts.portraitStageUnlock, "stage-5");
  state = advance(state, "c5-basil-sees");
  state = advance(state, "c5-basil-asks-for-change");
  state = chooseFrom(state, "c5-after-the-truth", "listen-and-answer");
  assert.equal(loadState().storyFacts.basilOutcome, null);
  state = chooseFrom(state, "c5-final-response", "accept-basil-help");
  assert.equal(loadState().storyFacts.basilOutcome, "alive-helping");
  state = advance(state, "c5-after-the-door");
  assert.equal(loadState().completedChapters["chapter-5"], true);
  assert.equal(loadState().storyFacts.portraitStageUnlock, "stage-5");
});
