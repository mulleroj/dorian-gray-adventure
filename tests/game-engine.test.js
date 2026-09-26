import test from "node:test";
import assert from "node:assert/strict";

globalThis.localStorage = {
  data: new Map(),
  getItem(key) { return this.data.get(key) ?? null; },
  setItem(key, value) { this.data.set(key, value); },
  removeItem(key) { this.data.delete(key); }
};

const { STORY_DATA } = await import("../js/story-data.js");
const { createInitialState, loadState, saveState } = await import("../js/game-state.js");
const {
  canEnterScene,
  applyEffects,
  choose,
  continueFromScene,
  getScene,
  portraitStage,
  portraitStageForValue
} = await import("../js/game-engine.js");

test("approved Chapter III room event can atomically set location and Stage 3 unlock", () => {
  const initialState = createInitialState();
  const nextState = applyEffects(initialState, {
    storyFacts: {
      portraitLocation: "locked-schoolroom",
      portraitStageUnlock: "stage-3"
    }
  });

  assert.equal(nextState.storyFacts.portraitLocation, "locked-schoolroom");
  assert.equal(nextState.storyFacts.portraitStageUnlock, "stage-3");
  assert.equal(portraitStage(nextState), 3);
});

function moveToFirstDecision() {
  let state = createInitialState();
  state = continueFromScene(state, "c1-opening").state;
  state = continueFromScene(state, "c1-basil-studio").state;
  return state;
}

function playPath(firstChoice, secondChoice, portraitChoice) {
  let state = moveToFirstDecision();
  state = choose(state, "c1-henry-arrives", firstChoice).state;
  state = choose(state, "c1-youth-question", secondChoice).state;
  state = choose(state, "c1-portrait-unveiled", portraitChoice).state;
  if (portraitChoice === "study-portrait") {
    assert.equal(state.sceneId, "c1-hidden-canvas");
    state = continueFromScene(state, "c1-hidden-canvas").state;
  }
  return state;
}

test("every first-chapter path reaches the closing scene", () => {
  const paths = [
    [["listen-to-henry", "ask-about-youth", "study-portrait"], [2, -3, 3]],
    [["listen-to-henry", "ask-about-youth", "turn-away"], [3, -1, 2]],
    [["listen-to-henry", "question-henry", "study-portrait"], [0, -1, 2]],
    [["listen-to-henry", "question-henry", "turn-away"], [1, 1, 1]],
    [["defend-basil", "ask-about-youth", "study-portrait"], [1, -1, 2]],
    [["defend-basil", "ask-about-youth", "turn-away"], [2, 1, 1]],
    [["defend-basil", "question-henry", "study-portrait"], [-1, 1, 1]],
    [["defend-basil", "question-henry", "turn-away"], [0, 3, 0]]
  ];

  for (const [path, expected] of paths) {
    const state = playPath(...path);
    assert.equal(state.sceneId, "c1-closing");
    assert.equal(state.chapterComplete, true);
    assert.equal(state.choices.length, 3);
    assert.deepEqual([state.reputation, state.conscience, state.portrait], expected, path.join(" / "));
  }
});

test("the hidden canvas is gated by the portrait choice", () => {
  assert.equal(canEnterScene(createInitialState(), "c1-hidden-canvas"), false);
  const state = playPath("defend-basil", "question-henry", "study-portrait");
  assert.equal(canEnterScene(state, "c1-hidden-canvas"), true);
});

test("portrait image stages use stable numeric thresholds", () => {
  assert.equal(portraitStageForValue(0), 0);
  assert.equal(portraitStageForValue(1), 1);
  assert.equal(portraitStageForValue(2), 2);
  assert.equal(portraitStageForValue(3), 2);
  assert.equal(portraitStage({ portrait: 1, flags: {} }), 1);
  assert.equal(portraitStage({ portrait: 2, flags: {} }), 2);
  assert.equal(portraitStage({ portrait: 0, storyFacts: { portraitStageUnlock: "stage-3" } }), 3);
  assert.equal(portraitStage({ portrait: 0, storyFacts: { portraitStageUnlock: "stage-4" } }), 4);
  assert.equal(portraitStage({ portrait: 0, storyFacts: { portraitStageUnlock: "stage-5" } }), 5);
  assert.equal(portraitStage({ portrait: 3, storyFacts: { portraitStageUnlock: "stage-4" } }), 4);
  assert.equal(portraitStage({ portrait: 3, storyFacts: { portraitStageUnlock: "stage-5" } }), 5);
  assert.equal(portraitStage({ portrait: 3, storyFacts: {} }), 2);
  assert.deepEqual(Object.keys(STORY_DATA.assets.portraitStages), ["0", "1", "2", "3", "4", "5"]);
  assert.equal(STORY_DATA.assets.portraitStages[0], "assets/portraits/portrait-dorian-stage-0.webp");
  assert.equal(STORY_DATA.assets.portraitStages[1], "assets/portraits/portrait-dorian-stage-1.webp");
  assert.equal(STORY_DATA.assets.portraitStages[2], "assets/portraits/portrait-dorian-stage-2.webp");
  assert.equal(STORY_DATA.assets.portraitStages[3], "assets/portraits/portrait-dorian-stage-3.webp");
  assert.equal(STORY_DATA.assets.portraitStages[4], "assets/portraits/portrait-dorian-stage-4.webp");
  assert.equal(STORY_DATA.assets.portraitStages[5], "assets/portraits/portrait-dorian-stage-5.webp");
});

test("all declared scene targets exist and the ending has no outgoing edge", () => {
  for (const [sceneId, scene] of Object.entries(STORY_DATA.scenes)) {
    if (scene.nextScene) assert.ok(getScene(scene.nextScene), `${sceneId} points to a missing scene`);
    for (const choice of scene.choices ?? []) {
      assert.ok(getScene(choice.nextScene), `${sceneId}/${choice.id} points to a missing scene`);
    }
  }
  assert.equal(STORY_DATA.scenes["c1-closing"].nextScene, null);
});

test("every glossary term referenced by a scene has a definition", () => {
  for (const [sceneId, scene] of Object.entries(STORY_DATA.scenes)) {
    for (const term of scene.terms ?? []) {
      assert.equal(typeof STORY_DATA.glossary[term], "string", `${sceneId} references undefined term: ${term}`);
    }
  }
});

test("partial, malformed, and incompatible saves are safe", () => {
  localStorage.data.clear();
  localStorage.setItem("dorian-gray-portrait-secret-save-v1", JSON.stringify({
    version: 1,
    sceneId: "c1-closing",
    reputation: "broken",
    flags: null,
    choices: [{ sceneId: "c1-henry-arrives", choiceId: "listen-to-henry" }]
  }));
  const repaired = loadState();
  assert.equal(repaired.sceneId, "c1-closing");
  assert.equal(repaired.reputation, 0);
  assert.deepEqual(repaired.flags, {});
  assert.equal(repaired.choices[0].reflection, "");

  localStorage.setItem("dorian-gray-portrait-secret-save-v1", "not-json");
  assert.equal(loadState(), null);
  localStorage.setItem("dorian-gray-portrait-secret-save-v1", JSON.stringify({ version: 99, sceneId: "c1-closing" }));
  assert.equal(loadState(), null);
  assert.doesNotThrow(() => saveState(createInitialState()));
});
