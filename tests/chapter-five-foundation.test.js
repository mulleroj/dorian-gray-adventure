import test from "node:test";
import assert from "node:assert/strict";

globalThis.localStorage = {
  data: new Map(),
  getItem(key) { return this.data.get(key) ?? null; },
  setItem(key, value) { this.data.set(key, value); },
  removeItem(key) { this.data.delete(key); }
};

const { STORY_DATA } = await import("../js/story-data.js");
const {
  STORY_FACT_DEFAULTS,
  loadState,
  normaliseState,
  saveState
} = await import("../js/game-state.js");
const {
  applyEffects,
  canStartChapter,
  chapterRequirementsMet,
  continueToChapter,
  isChapterAvailable,
  portraitStage,
  startNewGame
} = await import("../js/game-engine.js");
const { portraitAssetForStage, portraitViewerModel } = await import("../js/portrait-viewer.js");

function completeChapterFourState(overrides = {}) {
  return normaliseState({
    version: 2,
    sceneId: "c4-threshold",
    activeChapterId: "chapter-4",
    reputation: 1,
    conscience: -1,
    portrait: 2,
    flags: { heardHenry: true, defendedBasil: true },
    storyFacts: {
      portraitLocation: "locked-schoolroom",
      portraitStageUnlock: "stage-4",
      basilSuspicion: "clear",
      sibylOutcome: "alive-estranged",
      yellowBookResponse: "questioned",
      ...overrides.storyFacts
    },
    choices: [{ sceneId: "c4-locked-room-again", choiceId: "name-the-change", reflection: "named" }],
    visitedScenes: ["c4-threshold"],
    completedChapters: { "chapter-1": true, "chapter-2": true, "chapter-3": true, "chapter-4": true },
    startedAt: "2026-09-25T10:00:00.000Z",
    updatedAt: "2026-09-25T10:01:00.000Z",
    chapterComplete: true,
    ...overrides
  });
}

test("Chapter V metadata is in preparation and has no runtime scenes or choices", () => {
  const chapterFive = STORY_DATA.chapters.find((chapter) => chapter.id === "chapter-5");

  assert.deepEqual(chapterFive, {
    id: "chapter-5",
    number: "V",
    title: "The Confrontation",
    subtitle: "A private truth becomes a witnessed truth.",
    status: "in-preparation",
    available: false,
    requiresCompletedChapters: ["chapter-4"],
    requiresStoryFacts: ["portraitLocation", "portraitStageUnlock", "basilSuspicion", "sibylOutcome", "yellowBookResponse"]
  });
  assert.equal(Object.values(STORY_DATA.scenes).filter((scene) => scene.chapterId === "chapter-5").length, 0);
  assert.equal(Object.values(STORY_DATA.scenes).filter((scene) => scene.chapterId === "chapter-5").flatMap((scene) => scene.choices ?? []).length, 0);
});

test("Chapter V requirement contract is testable but cannot start while unavailable", () => {
  const chapterFive = STORY_DATA.chapters.find((chapter) => chapter.id === "chapter-5");
  const complete = completeChapterFourState();
  const missingFact = completeChapterFourState({ storyFacts: { portraitStageUnlock: null } });
  const incomplete = completeChapterFourState({ completedChapters: { "chapter-1": true, "chapter-2": true, "chapter-3": true }, chapterComplete: false });

  assert.equal(chapterRequirementsMet(complete, chapterFive), true);
  assert.equal(chapterRequirementsMet(missingFact, chapterFive), false);
  assert.equal(chapterRequirementsMet(incomplete, chapterFive), false);
  assert.equal(isChapterAvailable("chapter-5"), false);
  assert.equal(canStartChapter(complete, "chapter-5"), false);
  assert.equal(continueToChapter(complete, "chapter-5").reason, "chapter-unavailable");
  assert.equal(startNewGame("chapter-5"), null);
});

test("Chapter V foundation preserves the existing handoff state", () => {
  const state = completeChapterFourState();
  const before = structuredClone(state);
  const result = continueToChapter(state, "chapter-5");

  assert.equal(result.ok, false);
  assert.deepEqual(state, before);
  assert.deepEqual(state.completedChapters, {
    "chapter-1": true,
    "chapter-2": true,
    "chapter-3": true,
    "chapter-4": true
  });
  assert.equal(state.activeChapterId, "chapter-4");
  assert.equal(state.sceneId, "c4-threshold");
  assert.deepEqual(state.choices, [{ sceneId: "c4-locked-room-again", choiceId: "name-the-change", reflection: "named" }]);
});

test("basilOutcome accepts only the three approved finite values", () => {
  for (const basilOutcome of ["dead-canonical", "alive-separated", "alive-helping"]) {
    const state = normaliseState({ version: 2, sceneId: "c4-threshold", storyFacts: { basilOutcome } });
    assert.equal(state.storyFacts.basilOutcome, basilOutcome);
  }

  const persisted = saveState(normaliseState({
    version: 2,
    sceneId: "c4-threshold",
    storyFacts: { basilOutcome: "alive-helping", portraitStageUnlock: "stage-5" }
  }));
  assert.equal(persisted.storyFacts.basilOutcome, "alive-helping");
  assert.equal(loadState().storyFacts.basilOutcome, "alive-helping");

  const invalid = normaliseState({
    version: 2,
    sceneId: "c4-threshold",
    storyFacts: { basilOutcome: "basil-killed", violenceMeter: 3 }
  });
  assert.equal(invalid.storyFacts.basilOutcome, null);
  assert.equal(Object.hasOwn(invalid.storyFacts, "violenceMeter"), false);
  assert.equal(STORY_FACT_DEFAULTS.basilOutcome, null);
});

test("old saves remain readable with basilOutcome unset", () => {
  const migrated = normaliseState({
    version: 1,
    sceneId: "c4-threshold",
    activeChapterId: "chapter-4",
    storyFacts: { portraitStageUnlock: "stage-4" },
    chapterComplete: true
  });

  assert.equal(migrated.version, 2);
  assert.equal(migrated.storyFacts.portraitStageUnlock, "stage-4");
  assert.equal(migrated.storyFacts.basilOutcome, null);
});

test("Stage 5 is logically supported with fallback safety but has no asset mapping", () => {
  const state = normaliseState({
    version: 2,
    sceneId: "c4-threshold",
    storyFacts: { portraitStageUnlock: "stage-5" }
  });

  assert.equal(portraitStage(state), 5);
  assert.equal(portraitAssetForStage(5), null);
  assert.deepEqual(portraitViewerModel(state), {
    stage: 5,
    stageText: "The witnessed damage",
    asset: null
  });
  assert.deepEqual(applyEffects(state, { storyFacts: { portraitStageUnlock: "stage-5" } }).storyFacts, {
    ...STORY_FACT_DEFAULTS,
    portraitStageUnlock: "stage-5"
  });
});
