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
  createInitialState,
  loadState,
  normaliseState,
  saveState
} = await import("../js/game-state.js");
const {
  canEnterScene,
  canStartChapter,
  chapterRequirementsMet,
  continueFromScene,
  continueToChapter,
  enterScene,
  isChapterComplete,
  isChapterAvailable,
  startNewGame
} = await import("../js/game-engine.js");
const {
  contentWarningAction,
  contentWarningForScene,
  matchesNarrativeCondition,
  resolveSceneParagraphs
} = await import("../js/narrative-resolver.js");

const LEGACY_KEY = "dorian-gray-portrait-secret-save-v1";
const CURRENT_KEY = "dorian-gray-portrait-secret-save-v2";

const chapterOnePaths = [
  { values: [2, -3, 3], flags: ["heardHenry", "acceptedIdea", "studiedPortrait"] },
  { values: [3, -1, 2], flags: ["heardHenry", "acceptedIdea", "avoidedPortrait"] },
  { values: [0, -1, 2], flags: ["heardHenry", "challengedHenry", "studiedPortrait"] },
  { values: [1, 1, 1], flags: ["heardHenry", "challengedHenry", "avoidedPortrait"] },
  { values: [1, -1, 2], flags: ["defendedBasil", "acceptedIdea", "studiedPortrait"] },
  { values: [2, 1, 1], flags: ["defendedBasil", "acceptedIdea", "avoidedPortrait"] },
  { values: [-1, 1, 1], flags: ["defendedBasil", "challengedHenry", "studiedPortrait"] },
  { values: [0, 3, 0], flags: ["defendedBasil", "challengedHenry", "avoidedPortrait"] }
];

function legacySave(path) {
  return {
    version: 1,
    sceneId: "c1-closing",
    reputation: path.values[0],
    conscience: path.values[1],
    portrait: path.values[2],
    flags: Object.fromEntries(path.flags.map((flag) => [flag, true])),
    choices: [
      { sceneId: "c1-henry-arrives", choiceId: path.flags.includes("heardHenry") ? "listen-to-henry" : "defend-basil", reflection: "one" },
      { sceneId: "c1-youth-question", choiceId: path.flags.includes("acceptedIdea") ? "ask-about-youth" : "question-henry", reflection: "two" },
      { sceneId: "c1-portrait-unveiled", choiceId: path.flags.includes("studiedPortrait") ? "study-portrait" : "turn-away", reflection: "three" }
    ],
    visitedScenes: ["c1-opening", "c1-closing"],
    startedAt: "2026-09-24T10:00:00.000Z",
    updatedAt: "2026-09-24T10:01:00.000Z",
    chapterComplete: true
  };
}

test("all eight Chapter I v1 saves migrate without losing state", () => {
  for (const path of chapterOnePaths) {
    localStorage.data.clear();
    localStorage.setItem(LEGACY_KEY, JSON.stringify(legacySave(path)));
    const migrated = loadState();

    assert.equal(migrated.version, 2);
    assert.deepEqual([migrated.reputation, migrated.conscience, migrated.portrait], path.values);
    assert.deepEqual(Object.keys(migrated.flags).sort(), [...path.flags].sort());
    assert.equal(migrated.choices.length, 3);
    assert.deepEqual(migrated.visitedScenes, ["c1-opening", "c1-closing"]);
    assert.equal(migrated.chapterComplete, true);
    assert.equal(migrated.completedChapters["chapter-1"], true);
    assert.deepEqual(migrated.storyFacts, {
      sibylRelationship: null,
      sibylOutcome: null,
      c2FinalResponse: null,
      portraitLocation: null,
      basilSuspicion: null,
      portraitStageUnlock: null,
      yellowBookResponse: null
    });
  }
});

test("new saves use v2 while legacy saves remain readable", () => {
  localStorage.data.clear();
  const initial = createInitialState();
  const saved = saveState(initial);
  assert.equal(saved.version, 2);
  assert.ok(localStorage.getItem(CURRENT_KEY));
  assert.deepEqual(loadState(), saved);

  localStorage.setItem(LEGACY_KEY, JSON.stringify(legacySave(chapterOnePaths[0])));
  assert.deepEqual(loadState(), saved);
});

test("chapter completion is independent for each chapter", () => {
  localStorage.data.clear();
  let state = createInitialState();
  state = continueFromScene(state, "c1-closing").state;

  assert.equal(state.chapterComplete, true);
  assert.equal(isChapterComplete(state, "chapter-1"), true);
  assert.equal(isChapterComplete(state, "chapter-2"), false);
  assert.equal(isChapterAvailable("chapter-2"), true);
  assert.equal(canStartChapter(state, "chapter-2"), true);
  const chapterTwo = continueToChapter(state, "chapter-2");
  assert.equal(chapterTwo.ok, true);
  assert.equal(chapterTwo.state.activeChapterId, "chapter-2");
  assert.equal(chapterTwo.state.sceneId, "c2-theatre-lights");

  const reopened = enterScene(state, "c1-opening");
  assert.equal(reopened.chapterComplete, false);
  assert.equal(reopened.completedChapters["chapter-1"], true);
});

test("Chapter II exposes exactly the approved nine-scene route and Chapter III is available after its handoff", () => {
  const chapterTwo = STORY_DATA.chapters.find((chapter) => chapter.id === "chapter-2");
  const chapterThree = STORY_DATA.chapters.find((chapter) => chapter.id === "chapter-3");
  const chapterTwoScenes = Object.entries(STORY_DATA.scenes).filter(([, scene]) => scene.chapterId === "chapter-2");
  assert.equal(chapterTwo.available, true);
  assert.equal(chapterTwo.firstScene, "c2-theatre-lights");
  assert.deepEqual(chapterTwoScenes.map(([sceneId]) => sceneId), [
    "c2-theatre-lights",
    "c2-prince-charming",
    "c2-many-heroines",
    "c2-tell-basil-henry",
    "c2-offstage-sibyl",
    "c2-engagement",
    "c2-final-performance",
    "c2-backstage-choice",
    "c2-the-morning-after"
  ]);
  assert.equal(chapterThree.status, "playable");
  assert.equal(chapterThree.available, true);
  assert.equal(chapterThree.firstScene, "c3-morning-quiet");
  assert.deepEqual(chapterThree.requiresCompletedChapters, ["chapter-2"]);
  assert.deepEqual(chapterThree.requiresStoryFacts, ["sibylRelationship", "sibylOutcome", "c2FinalResponse"]);
  assert.equal(chapterThree.teacherNotes.scenes.length, 9);
  assert.equal(chapterThree.teacherNotes.decisions.length, 4);
  assert.equal(Object.keys(STORY_DATA.scenes).filter((sceneId) => sceneId.startsWith("c3-")).length, 9);
  assert.equal(canStartChapter(createInitialState(), "chapter-3"), false);
  assert.equal(canEnterScene(createInitialState(), "c2-theatre-lights"), false);
  assert.equal(startNewGame("chapter-2"), null);
});

test("Chapter IV metadata is unavailable and cannot be started before its scenes exist", () => {
  const chapterFour = STORY_DATA.chapters.find((chapter) => chapter.id === "chapter-4");
  const completeChapterThree = {
    completedChapters: { "chapter-1": true, "chapter-2": true, "chapter-3": true },
    storyFacts: {
      portraitLocation: "locked-schoolroom",
      portraitStageUnlock: "stage-3",
      yellowBookResponse: "questioned",
      basilSuspicion: "clear",
      sibylOutcome: "alive-estranged"
    }
  };

  assert.equal(chapterFour.status, "in-preparation");
  assert.equal(chapterFour.available, false);
  assert.equal(Object.prototype.hasOwnProperty.call(chapterFour, "firstScene"), false);
  assert.deepEqual(chapterFour.requiresCompletedChapters, ["chapter-3"]);
  assert.deepEqual(chapterFour.requiresStoryFacts, ["portraitLocation", "portraitStageUnlock", "yellowBookResponse", "basilSuspicion", "sibylOutcome"]);
  assert.equal(Object.values(STORY_DATA.scenes).filter((scene) => scene.chapterId === "chapter-4").length, 0);
  assert.equal(chapterRequirementsMet(completeChapterThree, chapterFour), true);
  assert.equal(isChapterAvailable("chapter-4"), false);
  assert.equal(canStartChapter(completeChapterThree, "chapter-4"), false);
  assert.deepEqual(continueToChapter(completeChapterThree, "chapter-4"), { ok: false, reason: "chapter-unavailable" });
  assert.equal(startNewGame("chapter-4"), null);
});

test("future Chapter III handoff requires Chapter II completion and resolved facts", () => {
  const chapterThree = STORY_DATA.chapters.find((chapter) => chapter.id === "chapter-3");
  const incomplete = {
    completedChapters: { "chapter-2": true },
    storyFacts: { sibylRelationship: "person-first", sibylOutcome: "alive-together", c2FinalResponse: null }
  };
  const complete = {
    completedChapters: { "chapter-2": true },
    storyFacts: { sibylRelationship: "person-first", sibylOutcome: "alive-together", c2FinalResponse: "listen" }
  };

  assert.equal(chapterRequirementsMet(incomplete, chapterThree), false);
  assert.equal(chapterRequirementsMet(complete, chapterThree), true);
  assert.equal(canStartChapter(complete, "chapter-3"), true);
});

test("storyFacts use the approved allow-list and reject arbitrary values", () => {
  const state = normaliseState({
    version: 2,
    sceneId: "c1-closing",
    storyFacts: {
      sibylRelationship: "person-first",
      sibylOutcome: "not-approved",
      c2FinalResponse: "listen",
      run: "globalThis.__storyFactProbe = true"
    }
  });

  assert.deepEqual(state.storyFacts, {
    sibylRelationship: "person-first",
    sibylOutcome: null,
    c2FinalResponse: "listen",
    portraitLocation: null,
    basilSuspicion: null,
    portraitStageUnlock: null,
    yellowBookResponse: null
  });
  assert.equal(globalThis.__storyFactProbe, undefined);
});

test("Chapter III story facts accept only the approved finite values", () => {
  const valid = normaliseState({
    version: 2,
    sceneId: "c2-the-morning-after",
    storyFacts: {
      portraitLocation: "locked-schoolroom",
      basilSuspicion: "clear",
      portraitStageUnlock: "stage-3",
      yellowBookResponse: "accepted"
    }
  });
  assert.deepEqual(valid.storyFacts, {
    sibylRelationship: null,
    sibylOutcome: null,
    c2FinalResponse: null,
    portraitLocation: "locked-schoolroom",
    basilSuspicion: "clear",
    portraitStageUnlock: "stage-3",
    yellowBookResponse: "accepted"
  });

  const invalid = normaliseState({
    version: 2,
    sceneId: "c2-the-morning-after",
    storyFacts: {
      portraitLocation: "visible",
      basilSuspicion: "certain",
      portraitStageUnlock: "stage-5",
      yellowBookResponse: "ignored"
    }
  });
  assert.equal(invalid.storyFacts.portraitLocation, null);
  assert.equal(invalid.storyFacts.basilSuspicion, null);
  assert.equal(invalid.storyFacts.portraitStageUnlock, null);
  assert.equal(invalid.storyFacts.yellowBookResponse, null);

  const stageFour = normaliseState({
    version: 2,
    sceneId: "c3-the-book-on-the-table",
    storyFacts: { portraitStageUnlock: "stage-4" }
  });
  assert.equal(stageFour.storyFacts.portraitStageUnlock, "stage-4");
});

test("conditional narrative is declarative, state-aware and side-effect free", () => {
  const scene = {
    paragraphs: ["Base paragraph."],
    conditionalText: [
      { when: { flag: "heardHenry" }, text: "Henry's voice returns." },
      { when: { choice: { sceneId: "c1-henry-arrives", choiceId: "defend-basil" } }, text: "Basil's trust remains present." },
      { when: { storyFact: { key: "sibylOutcome", value: "dead-canonical" } }, text: "This fact is not active yet." },
      { when: { code: "globalThis.__narrativeProbe = true" }, text: "Must never execute." }
    ]
  };
  const state = {
    flags: { heardHenry: true },
    choices: [],
    storyFacts: { sibylOutcome: null },
    reputation: 0,
    conscience: 0,
    portrait: 0
  };

  assert.deepEqual(resolveSceneParagraphs(scene, state), ["Base paragraph.", "Henry's voice returns."]);
  assert.equal(matchesNarrativeCondition(state, { code: "globalThis.__narrativeProbe = true" }), false);
  assert.equal(globalThis.__narrativeProbe, undefined);
});

test("future Chapter III story-fact conditions support the approved contract", () => {
  const state = {
    storyFacts: {
      portraitLocation: "locked-schoolroom",
      basilSuspicion: "clear",
      portraitStageUnlock: "stage-3",
      yellowBookResponse: "questioned",
      sibylOutcome: "alive-together"
    }
  };

  assert.equal(matchesNarrativeCondition(state, { storyFact: { key: "portraitLocation", value: "locked-schoolroom" } }), true);
  assert.equal(matchesNarrativeCondition(state, { storyFact: { key: "basilSuspicion", value: "clear" } }), true);
  assert.equal(matchesNarrativeCondition(state, { storyFact: { key: "portraitStageUnlock", value: "stage-3" } }), true);
  assert.equal(matchesNarrativeCondition(state, {
    all: [
      { storyFact: { key: "portraitLocation", value: "locked-schoolroom" } },
      { any: [
        { storyFact: { key: "yellowBookResponse", value: "accepted" } },
        { storyFact: { key: "yellowBookResponse", value: "questioned" } }
      ] },
      { storyFact: { key: "sibylOutcome", value: "alive-together" } }
    ]
  }), true);
  assert.equal(matchesNarrativeCondition(state, { not: { storyFact: { key: "portraitStageUnlock", value: null } } }), true);
});

test("content warnings support continue, skip and pause without changing game state", () => {
  const scene = {
    paragraphs: [
      "A safe paragraph.",
      { text: "A sensitive paragraph.", sensitive: true }
    ],
    contentWarning: {
      title: "Sensitive content",
      message: "This is a factual, non-graphic warning.",
      canSkip: true
    }
  };
  const state = createInitialState();
  const before = JSON.stringify(state);

  assert.deepEqual(contentWarningForScene(scene), {
    title: "Sensitive content",
    message: "This is a factual, non-graphic warning.",
    canSkip: true
  });
  assert.deepEqual(contentWarningAction(scene, "continue"), { ok: true, action: "continue" });
  assert.deepEqual(contentWarningAction(scene, "skip"), { ok: true, action: "skip" });
  assert.deepEqual(contentWarningAction(scene, "pause"), { ok: true, action: "pause" });
  assert.deepEqual(resolveSceneParagraphs(scene, state, { skipSensitive: true }), ["A safe paragraph."]);
  assert.equal(JSON.stringify(state), before);
});

test("portrait thresholds remain unchanged", () => {
  assert.equal(STORY_DATA.assets.portraitStages[0], "assets/portraits/portrait-dorian-stage-0.webp");
  assert.equal(STORY_DATA.assets.portraitStages[1], "assets/portraits/portrait-dorian-stage-1.webp");
  assert.equal(STORY_DATA.assets.portraitStages[2], "assets/portraits/portrait-dorian-stage-2.webp");
  assert.equal(STORY_DATA.assets.portraitStages[3], "assets/portraits/portrait-dorian-stage-3.webp");
});
