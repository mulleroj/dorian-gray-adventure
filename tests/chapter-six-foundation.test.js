import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";

globalThis.localStorage = {
  data: new Map(),
  getItem(key) { return this.data.get(key) ?? null; },
  setItem(key, value) { this.data.set(key, value); },
  removeItem(key) { this.data.delete(key); }
};

const { STORY_DATA } = await import("../js/story-data.js");
const {
  STORY_FACT_DEFAULTS,
  STORY_FACT_KEYS,
  loadState,
  normaliseState,
  saveState
} = await import("../js/game-state.js");
const {
  canStartChapter,
  isChapterAvailable,
  portraitStage,
  startNewGame
} = await import("../js/game-engine.js");
const {
  CHAPTER_SIX_DECISION_CHOICE_IDS,
  chapterSixOutcome
} = await import("../js/chapter-six-outcome.js");
const { portraitAssetForStage, portraitStageText, portraitViewerModel } = await import("../js/portrait-viewer.js");

function stateFor(choiceIds, overrides = {}) {
  return {
    version: 2,
    sceneId: "c5-after-the-door",
    activeChapterId: "chapter-5",
    reputation: 0,
    conscience: 0,
    portrait: 0,
    flags: {},
    storyFacts: { ...STORY_FACT_DEFAULTS },
    choices: choiceIds.map((choiceId, index) => ({
      sceneId: `c6-decision-${index + 1}`,
      choiceId
    })),
    visitedScenes: ["c5-after-the-door"],
    completedChapters: { "chapter-5": true },
    chapterComplete: true,
    ...overrides
  };
}

test("Chapter VI metadata is present but unavailable and has no runtime scenes", () => {
  const chapterSix = STORY_DATA.chapters.find((chapter) => chapter.id === "chapter-6");

  assert.ok(chapterSix);
  assert.equal(chapterSix.number, "VI");
  assert.equal(chapterSix.title, "The Final Choice");
  assert.equal(chapterSix.status, "in-preparation");
  assert.equal(chapterSix.available, false);
  assert.equal(Object.hasOwn(chapterSix, "firstScene"), false);
  assert.equal(Object.values(STORY_DATA.scenes).some((scene) => scene.chapterId === "chapter-6"), false);
  assert.equal(Object.keys(STORY_DATA.scenes).some((sceneId) => sceneId.startsWith("c6-")), false);
  assert.equal(isChapterAvailable("chapter-6"), false);
  assert.equal(canStartChapter(createInitialStateForChapterFive(), "chapter-6"), false);
  assert.equal(startNewGame("chapter-6"), null);
});

function createInitialStateForChapterFive() {
  return normaliseState({
    version: 2,
    sceneId: "c5-after-the-door",
    activeChapterId: "chapter-5",
    completedChapters: { "chapter-1": true, "chapter-2": true, "chapter-3": true, "chapter-4": true, "chapter-5": true },
    storyFacts: {
      sibylRelationship: "person-first",
      sibylOutcome: "alive-estranged",
      c2FinalResponse: "listen",
      portraitStageUnlock: "stage-5",
      yellowBookResponse: "questioned",
      basilOutcome: "alive-helping"
    },
    chapterComplete: true
  });
}

test("Chapter VI story fact and Stage 6 contracts remain in save v2", () => {
  assert.deepEqual(STORY_FACT_KEYS.chapterSixOutcome, ["portrait-destroyed", "truth-faced", "secret-kept"]);
  assert.equal(STORY_FACT_DEFAULTS.chapterSixOutcome, null);

  for (const chapterSixOutcomeValue of ["portrait-destroyed", "truth-faced", "secret-kept"]) {
    const state = normaliseState({
      version: 2,
      sceneId: "c5-after-the-door",
      storyFacts: {
        chapterSixOutcome: chapterSixOutcomeValue,
        portraitStageUnlock: "stage-6"
      }
    });

    assert.equal(state.version, 2);
    assert.equal(state.storyFacts.chapterSixOutcome, chapterSixOutcomeValue);
    assert.equal(state.storyFacts.portraitStageUnlock, "stage-6");
  }

  const invalid = normaliseState({
    version: 2,
    sceneId: "c5-after-the-door",
    portrait: 99,
    storyFacts: {
      chapterSixOutcome: "redeemed",
      portraitStageUnlock: "stage-7",
      moralityScore: 10
    }
  });
  assert.equal(invalid.portrait, 3);
  assert.equal(invalid.storyFacts.chapterSixOutcome, null);
  assert.equal(invalid.storyFacts.portraitStageUnlock, null);
  assert.equal(Object.hasOwn(invalid.storyFacts, "moralityScore"), false);

  const saved = saveState(normaliseState({
    version: 2,
    sceneId: "c5-after-the-door",
    storyFacts: { chapterSixOutcome: "truth-faced", portraitStageUnlock: "stage-6" }
  }));
  assert.equal(saved.version, 2);
  assert.equal(loadState().version, 2);
  assert.equal(loadState().storyFacts.chapterSixOutcome, "truth-faced");
  assert.equal(loadState().storyFacts.portraitStageUnlock, "stage-6");

  const migrated = normaliseState({
    version: 1,
    sceneId: "c5-after-the-door",
    storyFacts: { chapterSixOutcome: "secret-kept", portraitStageUnlock: "stage-6" }
  });
  assert.equal(migrated.version, 2);
  assert.equal(migrated.storyFacts.chapterSixOutcome, "secret-kept");
  assert.equal(migrated.storyFacts.portraitStageUnlock, "stage-6");
});

test("Chapter VI exposes four exact decision groups and direct final mapping", () => {
  assert.deepEqual(CHAPTER_SIX_DECISION_CHOICE_IDS, [
    ["state-the-act-plainly", "use-it-as-proof", "admit-the-uncertainty"],
    ["protect-her-dignity", "protect-my-image", "refuse-the-question"],
    ["face-what-it-shows", "call-it-a-curse", "deny-it-can-judge"],
    ["stop-hiding-the-truth", "cover-the-portrait-again", "destroy-the-portrait"]
  ]);
  assert.equal(CHAPTER_SIX_DECISION_CHOICE_IDS.flat().length, 12);
  assert.equal(new Set(CHAPTER_SIX_DECISION_CHOICE_IDS.flat()).size, 12);

  const distribution = { "truth-faced": 0, "secret-kept": 0, "portrait-destroyed": 0 };
  for (const first of CHAPTER_SIX_DECISION_CHOICE_IDS[0]) {
    for (const second of CHAPTER_SIX_DECISION_CHOICE_IDS[1]) {
      for (const third of CHAPTER_SIX_DECISION_CHOICE_IDS[2]) {
        for (const finalChoice of CHAPTER_SIX_DECISION_CHOICE_IDS[3]) {
          const result = chapterSixOutcome(stateFor([first, second, third, finalChoice]));
          const expected = finalChoice === "stop-hiding-the-truth"
            ? "truth-faced"
            : finalChoice === "cover-the-portrait-again"
              ? "secret-kept"
              : "portrait-destroyed";
          assert.equal(result, expected);
          distribution[result] += 1;
        }
      }
    }
  }

  assert.deepEqual(distribution, {
    "truth-faced": 27,
    "secret-kept": 27,
    "portrait-destroyed": 27
  });
});

test("Chapter VI outcome resolver is pure, latest-choice based, and safe for incomplete history", () => {
  assert.equal(chapterSixOutcome(), null);
  assert.equal(chapterSixOutcome({ choices: [] }), null);
  assert.equal(chapterSixOutcome({ choices: [{ choiceId: "state-the-act-plainly" }] }), null);

  const state = stateFor([
    "state-the-act-plainly",
    "protect-her-dignity",
    "face-what-it-shows",
    "destroy-the-portrait"
  ], {
    reputation: -3,
    conscience: 3,
    portrait: 3,
    flags: { heardHenry: true },
    storyFacts: { chapterSixOutcome: "truth-faced" }
  });
  const before = structuredClone(state);
  assert.equal(chapterSixOutcome(state), "portrait-destroyed");
  assert.deepEqual(state, before);

  state.choices.push({ sceneId: "c6-final-choice-latest", choiceId: "stop-hiding-the-truth" });
  assert.equal(chapterSixOutcome(state), "truth-faced");
});

test("Stage 6 is logically supported without runtime artwork", () => {
  assert.equal(portraitStage({ portrait: 0, storyFacts: { portraitStageUnlock: "stage-6" } }), 6);
  assert.equal(portraitStage({ portrait: 3, storyFacts: { portraitStageUnlock: "stage-6" } }), 6);
  assert.equal(portraitStageText(6), "The final evidence");
  assert.equal(portraitAssetForStage(6), null);
  assert.deepEqual(portraitViewerModel({
    portrait: 0,
    storyFacts: { portraitStageUnlock: "stage-6" }
  }), {
    stage: 6,
    stageText: "The final evidence",
    asset: null
  });
  assert.equal(existsSync("assets/portraits/portrait-dorian-stage-final.webp"), false);
});
