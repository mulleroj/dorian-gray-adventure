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
const { createInitialState, loadState, saveState } = await import("../js/game-state.js");
const {
  choose,
  continueFromScene,
  continueToChapter,
  portraitStageForValue
} = await import("../js/game-engine.js");
const {
  contentWarningForScene,
  resolveSceneParagraphs,
  resolveStoryNote
} = await import("../js/narrative-resolver.js");

const chapterOnePaths = [
  ["listen-to-henry", "ask-about-youth", "study-portrait"],
  ["listen-to-henry", "ask-about-youth", "turn-away"],
  ["listen-to-henry", "question-henry", "study-portrait"],
  ["listen-to-henry", "question-henry", "turn-away"],
  ["defend-basil", "ask-about-youth", "study-portrait"],
  ["defend-basil", "ask-about-youth", "turn-away"],
  ["defend-basil", "question-henry", "study-portrait"],
  ["defend-basil", "question-henry", "turn-away"]
];

const decisionOne = ["admire-the-roles", "ask-about-sibyl"];
const decisionTwo = ["tell-beautiful-story", "defend-the-person"];
const decisionThree = ["listen-to-her-life", "stay-inside-the-dream", "make-grand-promise"];
const decisionFour = ["judge-the-performance", "stay-and-listen", "ask-for-time"];

function advance(state, sceneId) {
  const result = continueFromScene(state, sceneId);
  assert.equal(result.ok, true, `could not continue from ${sceneId}`);
  return result.state;
}

function completeChapterOne(path) {
  let state = createInitialState();
  state = advance(state, "c1-opening");
  state = advance(state, "c1-basil-studio");
  state = choose(state, "c1-henry-arrives", path[0]).state;
  state = choose(state, "c1-youth-question", path[1]).state;
  state = choose(state, "c1-portrait-unveiled", path[2]).state;
  if (path[2] === "study-portrait") state = advance(state, "c1-hidden-canvas");
  assert.equal(state.sceneId, "c1-closing");
  return state;
}

function playChapterTwo(c1Path, choices) {
  let state = completeChapterOne(c1Path);
  state = continueToChapter(state, "chapter-2").state;
  state = advance(state, "c2-theatre-lights");
  state = choose(state, "c2-prince-charming", choices[0]).state;
  state = advance(state, "c2-many-heroines");
  state = choose(state, "c2-tell-basil-henry", choices[1]).state;
  state = choose(state, "c2-offstage-sibyl", choices[2]).state;
  state = advance(state, "c2-engagement");
  state = advance(state, "c2-final-performance");
  state = choose(state, "c2-backstage-choice", choices[3]).state;
  assert.equal(state.sceneId, "c2-the-morning-after");
  return state;
}

function expectedRelationship(choices) {
  if (choices[0] === "admire-the-roles" && choices[1] === "tell-beautiful-story" && choices[2] === "stay-inside-the-dream") return "role-first";
  if (choices[0] === "ask-about-sibyl" && (choices[1] === "defend-the-person" || choices[2] === "listen-to-her-life")) return "person-first";
  return "mixed";
}

function expectedOutcome(choices) {
  const relationship = expectedRelationship(choices);
  if (relationship === "role-first" && choices[3] === "judge-the-performance") return "dead-canonical";
  if (relationship === "person-first" && choices[3] === "stay-and-listen" && choices[2] === "listen-to-her-life") return "alive-together";
  return "alive-estranged";
}

test("all 288 Chapter I plus Chapter II combinations reach a resolved ending", () => {
  let combinations = 0;
  const outcomes = new Set();
  for (const c1Path of chapterOnePaths) {
    for (const first of decisionOne) {
      for (const second of decisionTwo) {
        for (const third of decisionThree) {
          for (const fourth of decisionFour) {
            const choices = [first, second, third, fourth];
            const state = playChapterTwo(c1Path, choices);
            combinations += 1;
            outcomes.add(state.storyFacts.sibylOutcome);
            assert.equal(state.activeChapterId, "chapter-2");
            assert.equal(state.chapterComplete, true);
            assert.equal(state.completedChapters["chapter-1"], true);
            assert.equal(state.completedChapters["chapter-2"], true);
            assert.equal(state.storyFacts.sibylRelationship, expectedRelationship(choices), choices.join(" / "));
            assert.equal(state.storyFacts.sibylOutcome, expectedOutcome(choices), choices.join(" / "));
            assert.equal(state.storyFacts.c2FinalResponse, fourth === "judge-the-performance" ? "cruel" : fourth === "stay-and-listen" ? "listen" : "delay");
            assert.equal(state.choices.length, 7);
            assert.equal(new Set(state.visitedScenes).size, state.visitedScenes.length);
            assert.equal(portraitStageForValue(state.portrait), state.portrait >= 2 ? 2 : state.portrait);
          }
        }
      }
    }
  }
  assert.equal(combinations, 8 * 2 * 2 * 3 * 3);
  assert.deepEqual([...outcomes].sort(), ["alive-estranged", "alive-together", "dead-canonical"]);
});

test("the canonical warning is branch-aware and skip removes only sensitive text", () => {
  const canonical = playChapterTwo(chapterOnePaths[0], ["admire-the-roles", "tell-beautiful-story", "stay-inside-the-dream", "judge-the-performance"]);
  const alternative = playChapterTwo(chapterOnePaths[0], ["ask-about-sibyl", "defend-the-person", "listen-to-her-life", "stay-and-listen"]);
  const scene = STORY_DATA.scenes["c2-the-morning-after"];
  const warning = contentWarningForScene(scene, canonical);
  assert.equal(warning.canSkip, true);
  assert.equal(contentWarningForScene(scene, alternative), null);
  const full = resolveSceneParagraphs(scene, canonical);
  const skipped = resolveSceneParagraphs(scene, canonical, { skipSensitive: true });
  assert.ok(full.some((paragraph) => paragraph.includes("Sibyl Vane is dead")));
  assert.ok(full.some((paragraph) => paragraph.includes("Lord Henry treats")));
  assert.ok(skipped.some((paragraph) => paragraph.includes("Sibyl Vane is dead")));
  assert.equal(skipped.some((paragraph) => paragraph.includes("Lord Henry treats")), false);
});

test("Chapter II save and restore preserves the resolved ending and Chapter I history", () => {
  localStorage.data.clear();
  const state = playChapterTwo(chapterOnePaths[7], ["ask-about-sibyl", "tell-beautiful-story", "make-grand-promise", "ask-for-time"]);
  const saved = saveState(state);
  assert.deepEqual(loadState(), saved);
  assert.equal(loadState().choices.filter((choice) => choice.sceneId.startsWith("c1-")).length, 3);
  assert.equal(loadState().choices.filter((choice) => choice.sceneId.startsWith("c2-")).length, 4);
});

test("Chapter II has teacher material and Chapter III is now playable", () => {
  const chapterTwo = STORY_DATA.chapters.find((chapter) => chapter.id === "chapter-2");
  const chapterThree = STORY_DATA.chapters.find((chapter) => chapter.id === "chapter-3");
  assert.equal(chapterTwo.status, "playable");
  assert.equal(chapterTwo.teacherNotes.scenes.length, 9);
  assert.equal(chapterTwo.teacherNotes.decisions.length, 4);
  assert.equal(chapterThree.status, "playable");
  assert.equal(chapterThree.available, true);
  assert.equal(chapterThree.firstScene, "c3-morning-quiet");
  assert.equal(chapterThree.teacherNotes.scenes.length, 9);
  assert.equal(chapterThree.teacherNotes.decisions.length, 4);
  assert.equal(Object.keys(STORY_DATA.scenes).filter((sceneId) => sceneId.startsWith("c3-")).length, 9);
});

test("Chapter II has comprehension questions and branch-specific story notes", () => {
  const chapterTwo = STORY_DATA.chapters.find((chapter) => chapter.id === "chapter-2");
  assert.ok(chapterTwo.teacherNotes.comprehension.length >= 4);
  const ending = STORY_DATA.scenes["c2-the-morning-after"];
  assert.match(resolveStoryNote(ending, { storyFacts: { sibylOutcome: "dead-canonical" } }), /Sibyl's death/);
  assert.match(resolveStoryNote(ending, { storyFacts: { sibylOutcome: "alive-estranged" } }), /distance/);
  assert.doesNotMatch(resolveStoryNote(ending, { storyFacts: { sibylOutcome: "alive-together" } }), /Sibyl's death/);
});

test("Chapter II approved visual assets map only to compatible scenes", () => {
  const assets = STORY_DATA.assets.chapterTwo;
  const expectedAssets = [
    assets.characters.sibylStage,
    assets.characters.sibylOffstage,
    assets.locations.theatreStage,
    assets.locations.theatreBackstage
  ];
  expectedAssets.forEach((asset) => {
    assert.match(asset.src, /^assets\/(portraits|locations)\/[^/]+\.webp$/);
    assert.equal(existsSync(asset.src), true, `missing runtime asset: ${asset.src}`);
    assert.ok(asset.alt.length > 20);
    assert.equal(asset.src.includes("MASTER"), false);
  });

  assert.deepEqual(STORY_DATA.scenes["c2-theatre-lights"].visual, { location: "theatreStage" });
  assert.deepEqual(STORY_DATA.scenes["c2-many-heroines"].visual, { location: "theatreStage", character: "sibylStage" });
  assert.deepEqual(STORY_DATA.scenes["c2-final-performance"].visual, { location: "theatreStage", character: "sibylStage" });
  assert.deepEqual(STORY_DATA.scenes["c2-offstage-sibyl"].visual, { character: "sibylOffstage" });
  assert.deepEqual(STORY_DATA.scenes["c2-backstage-choice"].visual, { location: "theatreBackstage", character: "sibylOffstage" });
  assert.equal(Object.entries(STORY_DATA.scenes).some(([sceneId, scene]) => sceneId === "c2-backstage-choice" && scene.visual?.character === "sibylStage"), false);
  assert.equal(Object.values(STORY_DATA.scenes).some((scene) => scene.chapterId === "chapter-1" && scene.visual), false);
});
