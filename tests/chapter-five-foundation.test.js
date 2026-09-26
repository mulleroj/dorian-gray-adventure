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

test("Chapter V exposes the exact playable ten-scene spine and four decisions", () => {
  const chapterFive = STORY_DATA.chapters.find((chapter) => chapter.id === "chapter-5");

  assert.equal(chapterFive.status, "playable");
  assert.equal(chapterFive.available, true);
  assert.equal(chapterFive.firstScene, "c5-fog-at-the-door");
  assert.equal(chapterFive.teacherNotes.scenes.length, 10);
  assert.equal(chapterFive.teacherNotes.decisions.length, 4);
  assert.equal(chapterFive.teacherNotes.comprehension.length, 8);
  assert.match(chapterFive.teacherNotes.literaryBasis, /Chapters XII and XIII/);
  assert.match(chapterFive.teacherNotes.canonAndAlternatives, /alive-separated/);
  assert.match(chapterFive.teacherNotes.canonAndAlternatives, /not presented as Wilde's canon/);

  const chapterFiveScenes = Object.values(STORY_DATA.scenes).filter((scene) => scene.chapterId === "chapter-5");
  assert.deepEqual(chapterFiveScenes.map((scene) => scene.id ?? Object.keys(STORY_DATA.scenes).find((id) => STORY_DATA.scenes[id] === scene)), [
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
  ]);
  assert.deepEqual(chapterFiveScenes.map((scene) => scene.title), [
    "Fog at the Door",
    "What People Say",
    "Answer Basil",
    "I Will Show You the Truth",
    "The Locked Room",
    "Basil Sees",
    "Basil Asks for Change",
    "After the Truth",
    "The Final Response",
    "After the Door"
  ]);
  assert.deepEqual(chapterFiveScenes.filter((scene) => scene.choices).map((scene) => scene.choices.length), [3, 3, 3, 3]);
});

test("Chapter V requirement contract gates entry and starts without resetting the handoff", () => {
  const chapterFive = STORY_DATA.chapters.find((chapter) => chapter.id === "chapter-5");
  const complete = completeChapterFourState();
  const missingFact = completeChapterFourState({ storyFacts: { portraitStageUnlock: null } });
  const wrongStage = completeChapterFourState({ storyFacts: { portraitStageUnlock: "stage-3" } });
  const incomplete = completeChapterFourState({ completedChapters: { "chapter-1": true, "chapter-2": true, "chapter-3": true }, chapterComplete: false });

  assert.equal(chapterRequirementsMet(complete, chapterFive), true);
  assert.equal(chapterRequirementsMet(missingFact, chapterFive), false);
  assert.equal(chapterRequirementsMet(wrongStage, chapterFive), false);
  assert.equal(chapterRequirementsMet(incomplete, chapterFive), false);
  assert.equal(isChapterAvailable("chapter-5"), true);
  assert.equal(canStartChapter(complete, "chapter-5"), true);
  assert.equal(continueToChapter(complete, "chapter-5").state.sceneId, "c5-fog-at-the-door");
  assert.equal(continueToChapter(missingFact, "chapter-5").reason, "chapter-locked");
  assert.equal(startNewGame("chapter-5"), null);
});

test("Chapter V entry preserves the existing handoff state", () => {
  const state = completeChapterFourState();
  const before = structuredClone(state);
  const result = continueToChapter(state, "chapter-5");

  assert.equal(result.ok, true);
  assert.deepEqual(state, before);
  assert.equal(result.state.activeChapterId, "chapter-5");
  assert.equal(result.state.sceneId, "c5-fog-at-the-door");
  assert.deepEqual(result.state.choices, before.choices);
  assert.deepEqual(result.state.storyFacts, before.storyFacts);
  assert.deepEqual(result.state.completedChapters, before.completedChapters);
  assert.deepEqual(result.state.visitedScenes.slice(0, -1), before.visitedScenes);
  assert.equal(result.state.completedChapters["chapter-5"], undefined);
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

test("Stage 5 is logically supported and maps to the approved runtime asset", () => {
  const state = normaliseState({
    version: 2,
    sceneId: "c4-threshold",
    storyFacts: { portraitStageUnlock: "stage-5" }
  });

  assert.equal(portraitStage(state), 5);
  assert.equal(portraitAssetForStage(5), "assets/portraits/portrait-dorian-stage-5.webp");
  assert.deepEqual(portraitViewerModel(state), {
    stage: 5,
    stageText: "The witnessed damage",
    asset: "assets/portraits/portrait-dorian-stage-5.webp"
  });
  assert.deepEqual(applyEffects(state, { storyFacts: { portraitStageUnlock: "stage-5" } }).storyFacts, {
    ...STORY_FACT_DEFAULTS,
    portraitStageUnlock: "stage-5"
  });
});
