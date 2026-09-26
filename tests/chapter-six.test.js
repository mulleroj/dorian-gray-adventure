import test from "node:test";
import assert from "node:assert/strict";

globalThis.localStorage = {
  data: new Map(),
  getItem(key) { return this.data.get(key) ?? null; },
  setItem(key, value) { this.data.set(key, value); },
  removeItem(key) { this.data.delete(key); }
};

const { STORY_DATA } = await import("../js/story-data.js");
const { STORY_FACT_DEFAULTS, loadState, normaliseState, saveState } = await import("../js/game-state.js");
const {
  canStartChapter,
  choose,
  continueFromScene,
  continueToChapter,
  portraitStage
} = await import("../js/game-engine.js");
const {
  contentWarningAction,
  contentWarningForScene,
  resolveSceneParagraphs
} = await import("../js/narrative-resolver.js");
const { CHAPTER_SIX_DECISION_CHOICE_IDS, chapterSixOutcome } = await import("../js/chapter-six-outcome.js");
const { portraitAssetForStage, portraitViewerModel } = await import("../js/portrait-viewer.js");

const chapterSixSceneIds = [
  "c6-after-the-confrontation",
  "c6-the-world-has-noticed",
  "c6-a-new-life",
  "c6-the-good-act",
  "c6-the-test-of-motive",
  "c6-the-last-proof",
  "c6-what-it-shows",
  "c6-the-final-choice",
  "c6-what-remains"
];

function chapterFiveEndingState(overrides = {}) {
  return normaliseState({
    version: 2,
    sceneId: "c5-after-the-door",
    activeChapterId: "chapter-5",
    reputation: 2,
    conscience: -1,
    portrait: 3,
    flags: { heardHenry: true, c2PublicIdealisation: true },
    storyFacts: {
      sibylRelationship: "person-first",
      sibylOutcome: "alive-estranged",
      c2FinalResponse: "listen",
      portraitLocation: "locked-schoolroom",
      basilSuspicion: "clear",
      portraitStageUnlock: "stage-5",
      yellowBookResponse: "questioned",
      basilOutcome: "alive-helping",
      ...overrides.storyFacts
    },
    choices: [
      { sceneId: "c4-house-open", choiceId: "share-the-evening", reflection: "shared" },
      { sceneId: "c4-whispers", choiceId: "ask-what-was-seen", reflection: "asked" },
      { sceneId: "c4-chosen-pleasure", choiceId: "share-the-music", reflection: "shared music" },
      { sceneId: "c4-locked-room-again", choiceId: "name-the-change", reflection: "named" }
    ],
    visitedScenes: ["c5-after-the-door"],
    completedChapters: {
      "chapter-1": true,
      "chapter-2": true,
      "chapter-3": true,
      "chapter-4": true,
      "chapter-5": true
    },
    startedAt: "2026-09-26T10:00:00.000Z",
    updatedAt: "2026-09-26T10:01:00.000Z",
    chapterComplete: true,
    ...overrides,
    storyFacts: {
      sibylRelationship: "person-first",
      sibylOutcome: "alive-estranged",
      c2FinalResponse: "listen",
      portraitLocation: "locked-schoolroom",
      basilSuspicion: "clear",
      portraitStageUnlock: "stage-5",
      yellowBookResponse: "questioned",
      basilOutcome: "alive-helping",
      ...overrides.storyFacts
    }
  });
}

function continueScene(state, expectedSceneId) {
  assert.equal(state.sceneId, expectedSceneId);
  const result = continueFromScene(state, expectedSceneId);
  assert.equal(result.ok, true, "could not continue from " + expectedSceneId);
  return result.state;
}

function chooseScene(state, expectedSceneId, choiceId) {
  assert.equal(state.sceneId, expectedSceneId);
  const result = choose(state, expectedSceneId, choiceId);
  assert.equal(result.ok, true, "could not choose " + expectedSceneId + "/" + choiceId);
  return result.state;
}

function playChapterSix(choiceIds, overrides = {}) {
  const entry = chapterFiveEndingState(overrides);
  assert.equal(canStartChapter(entry, "chapter-6"), true);
  const handoff = continueToChapter(entry, "chapter-6");
  assert.equal(handoff.ok, true);
  let state = handoff.state;
  state = continueScene(state, chapterSixSceneIds[0]);
  state = continueScene(state, chapterSixSceneIds[1]);
  state = chooseScene(state, chapterSixSceneIds[2], choiceIds[0]);
  state = continueScene(state, chapterSixSceneIds[3]);
  state = chooseScene(state, chapterSixSceneIds[4], choiceIds[1]);
  assert.equal(state.sceneId, chapterSixSceneIds[5]);
  assert.equal(state.storyFacts.portraitStageUnlock, "stage-6");
  state = continueScene(state, chapterSixSceneIds[5]);
  state = chooseScene(state, chapterSixSceneIds[6], choiceIds[2]);
  state = chooseScene(state, chapterSixSceneIds[7], choiceIds[3]);
  assert.equal(state.sceneId, chapterSixSceneIds[8]);
  return state;
}

test("Chapter VI entry preserves the Chapter V handoff and enforces its contract", () => {
  const state = chapterFiveEndingState();
  const before = structuredClone(state);
  const result = continueToChapter(state, "chapter-6");

  assert.equal(result.ok, true);
  assert.deepEqual(state, before);
  assert.equal(result.state.sceneId, "c6-after-the-confrontation");
  assert.equal(result.state.activeChapterId, "chapter-6");
  assert.deepEqual(result.state.choices, before.choices);
  assert.deepEqual(result.state.flags, before.flags);
  assert.deepEqual(result.state.storyFacts, before.storyFacts);
  assert.deepEqual(result.state.completedChapters, before.completedChapters);
  assert.deepEqual(result.state.visitedScenes.slice(0, -1), before.visitedScenes);

  for (const overrides of [
    { storyFacts: { portraitStageUnlock: "stage-4" } },
    { storyFacts: { basilOutcome: null } },
    { storyFacts: { sibylOutcome: null } },
    { storyFacts: { sibylRelationship: null } },
    { storyFacts: { c2FinalResponse: null } },
    { storyFacts: { yellowBookResponse: null } }
  ]) {
    const locked = chapterFiveEndingState(overrides);
    assert.equal(canStartChapter(locked, "chapter-6"), false);
    assert.equal(continueToChapter(locked, "chapter-6").ok, false);
  }
});

test("Chapter VI has the exact shared spine, four decisions, and nine-scene completion", () => {
  const chapter = STORY_DATA.chapters.find((item) => item.id === "chapter-6");
  assert.equal(chapter.status, "playable");
  assert.equal(chapter.available, true);
  assert.equal(chapter.firstScene, chapterSixSceneIds[0]);
  assert.deepEqual(Object.keys(STORY_DATA.scenes).filter((id) => id.startsWith("c6-")), chapterSixSceneIds);
  assert.deepEqual(Object.values(STORY_DATA.scenes).filter((scene) => scene.chapterId === "chapter-6").map((scene) => scene.title), [
    "The Quiet House",
    "A Consequence With a Witness",
    "The Claim",
    "One Example",
    "What Was the Act For?",
    "The Portrait Does Not Agree",
    "What Does It Show?",
    "The Final Choice",
    "The Last Image"
  ]);
  assert.deepEqual(CHAPTER_SIX_DECISION_CHOICE_IDS.map((ids) => ids.length), [3, 3, 3, 3]);
  assert.deepEqual(chapterSixSceneIds.filter((id) => STORY_DATA.scenes[id].choices).map((id) => STORY_DATA.scenes[id].choices.map((choice) => choice.id)), CHAPTER_SIX_DECISION_CHOICE_IDS);
  assert.equal(STORY_DATA.scenes["c6-what-remains"].nextScene, null);
});

test("all 81 Chapter VI routes share the spine, unlock Stage 6, and distribute outcomes 27/27/27", () => {
  const distribution = { "truth-faced": 0, "secret-kept": 0, "portrait-destroyed": 0 };
  let paths = 0;

  for (const first of CHAPTER_SIX_DECISION_CHOICE_IDS[0]) {
    for (const second of CHAPTER_SIX_DECISION_CHOICE_IDS[1]) {
      for (const third of CHAPTER_SIX_DECISION_CHOICE_IDS[2]) {
        for (const finalChoice of CHAPTER_SIX_DECISION_CHOICE_IDS[3]) {
          const state = playChapterSix([first, second, third, finalChoice]);
          const chapterChoices = state.choices.filter((choice) => choice.sceneId.startsWith("c6-"));
          const visited = state.visitedScenes.filter((sceneId) => sceneId.startsWith("c6-"));
          const outcome = chapterSixOutcome(state);

          assert.deepEqual(visited, chapterSixSceneIds);
          assert.equal(chapterChoices.length, 4);
          assert.equal(state.completedChapters["chapter-6"], true);
          assert.equal(state.activeChapterId, "chapter-6");
          assert.equal(state.sceneId, "c6-what-remains");
          assert.equal(state.chapterComplete, true);
          assert.equal(state.storyFacts.portraitStageUnlock, "stage-6");
          assert.equal(state.storyFacts.chapterSixOutcome, outcome);
          assert.equal(portraitStage(state), 6);
          assert.equal(outcome, finalChoice === "stop-hiding-the-truth"
            ? "truth-faced"
            : finalChoice === "cover-the-portrait-again"
              ? "secret-kept"
              : "portrait-destroyed");
          distribution[outcome] += 1;
          paths += 1;
        }
      }
    }
  }

  assert.equal(paths, 81);
  assert.deepEqual(distribution, { "truth-faced": 27, "secret-kept": 27, "portrait-destroyed": 27 });
});

test("Chapter VI decisions do not use numeric values or hidden morality thresholds", () => {
  const state = playChapterSix(CHAPTER_SIX_DECISION_CHOICE_IDS.map((ids) => ids[0]), {
    reputation: -3,
    conscience: 3,
    portrait: 0,
    flags: { heardHenry: false },
    storyFacts: { sibylOutcome: "dead-canonical", sibylRelationship: "role-first", basilOutcome: "dead-canonical" }
  });
  assert.equal(state.storyFacts.chapterSixOutcome, "truth-faced");
  assert.equal(state.reputation, -3);
  assert.equal(state.conscience, 3);
  assert.equal(state.portrait, 0);
});

test("continuity facts alter prose only across all nine Sibyl/Basil classes", () => {
  const sibylOutcomes = [
    ["dead-canonical", "role-first"],
    ["alive-estranged", "person-first"],
    ["alive-together", "mixed"]
  ];
  const basilOutcomes = ["dead-canonical", "alive-separated", "alive-helping"];

  for (const [sibylOutcome, sibylRelationship] of sibylOutcomes) {
    for (const basilOutcome of basilOutcomes) {
      const state = chapterFiveEndingState({
        storyFacts: { sibylOutcome, sibylRelationship, basilOutcome }
      });
      const text = chapterSixSceneIds
        .map((sceneId) => resolveSceneParagraphs(STORY_DATA.scenes[sceneId], state).join(" "))
        .join(" ");

      if (basilOutcome === "dead-canonical") assert.doesNotMatch(text, /Basil is alive/);
      else assert.doesNotMatch(text, /Basil's absence remains|Basil is dead/);
      if (sibylOutcome === "dead-canonical") assert.doesNotMatch(text, /Sibyl is alive/);
      else assert.doesNotMatch(text, /Sibyl's loss remains|Sibyl's loss/);
    }
  }
});

test("portrait-destroyed restores the Stage 0 display only at the terminal ending", () => {
  const destroyed = playChapterSix([
    "state-the-act-plainly",
    "protect-her-dignity",
    "face-what-it-shows",
    "destroy-the-portrait"
  ]);
  assert.equal(destroyed.storyFacts.portraitStageUnlock, "stage-6");
  assert.deepEqual(portraitViewerModel(destroyed), {
    stage: 0,
    stageText: "Untouched surface",
    asset: "assets/portraits/portrait-dorian-stage-0.webp"
  });

  const stageSixBeforeEnding = normaliseState({
    ...chapterFiveEndingState(),
    sceneId: "c6-last-proof",
    activeChapterId: "chapter-6",
    storyFacts: { ...STORY_FACT_DEFAULTS, portraitStageUnlock: "stage-6" }
  });
  assert.equal(portraitViewerModel(stageSixBeforeEnding).stage, 6);
  assert.equal(portraitAssetForStage(6), "assets/portraits/portrait-dorian-stage-final.webp");
});

test("only portrait-destroyed uses the factual non-graphic ending warning", () => {
  const destroyed = playChapterSix([
    "state-the-act-plainly",
    "protect-her-dignity",
    "face-what-it-shows",
    "destroy-the-portrait"
  ]);
  const destroyedScene = STORY_DATA.scenes[destroyed.sceneId];
  const warning = contentWarningForScene(destroyedScene, destroyed);
  assert.ok(warning);
  assert.match(warning.message, /non-graphic death/i);
  assert.equal(contentWarningAction(destroyedScene, "continue", destroyed).ok, true);
  assert.equal(contentWarningAction(destroyedScene, "skip", destroyed).ok, true);
  const skipped = resolveSceneParagraphs(destroyedScene, destroyed, { skipSensitive: true }).join(" ");
  const continued = resolveSceneParagraphs(destroyedScene, destroyed).join(" ");
  assert.match(continued, /Dorian dies/);
  assert.doesNotMatch(skipped, /Dorian dies/);
  assert.doesNotMatch(skipped, /irreversible consequence/);
  assert.match(skipped, /returns to its original young appearance/);
  assert.match(skipped, /age and damage/);

  for (const finalChoice of ["stop-hiding-the-truth", "cover-the-portrait-again"]) {
    const state = playChapterSix(["state-the-act-plainly", "protect-her-dignity", "face-what-it-shows", finalChoice]);
    assert.equal(contentWarningForScene(STORY_DATA.scenes[state.sceneId], state), null);
  }
});

test("Chapter VI ending survives save and reload without changing the Stage 6 fact", () => {
  const finalState = playChapterSix([
    "admit-the-uncertainty",
    "protect-my-image",
    "deny-it-can-judge",
    "cover-the-portrait-again"
  ]);
  saveState(finalState);
  const restored = loadState();

  assert.equal(restored.version, 2);
  assert.equal(restored.sceneId, "c6-what-remains");
  assert.equal(restored.activeChapterId, "chapter-6");
  assert.equal(restored.chapterComplete, true);
  assert.equal(restored.completedChapters["chapter-6"], true);
  assert.equal(restored.storyFacts.portraitStageUnlock, "stage-6");
  assert.equal(restored.storyFacts.chapterSixOutcome, "secret-kept");
  assert.equal(portraitViewerModel(restored).stage, 6);
});
