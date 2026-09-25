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
  createInitialState,
  loadState,
  normaliseState,
  saveState
} = await import("../js/game-state.js");
const {
  canEnterScene,
  canStartChapter,
  choose,
  continueFromScene,
  continueToChapter,
  portraitStage,
  portraitStageForValue
} = await import("../js/game-engine.js");
const { resolveSceneParagraphs } = await import("../js/narrative-resolver.js");
const { portraitViewerModel } = await import("../js/portrait-viewer.js");

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

const chapterTwoChoices = [
  ["admire-the-roles", "tell-beautiful-story", "listen-to-her-life", "judge-the-performance"],
  ["admire-the-roles", "tell-beautiful-story", "stay-inside-the-dream", "judge-the-performance"],
  ["ask-about-sibyl", "defend-the-person", "listen-to-her-life", "stay-and-listen"],
  ["ask-about-sibyl", "tell-beautiful-story", "make-grand-promise", "ask-for-time"]
];

const chapterTwoDecisionOptions = [
  ["admire-the-roles", "ask-about-sibyl"],
  ["tell-beautiful-story", "defend-the-person"],
  ["listen-to-her-life", "stay-inside-the-dream", "make-grand-promise"],
  ["judge-the-performance", "stay-and-listen", "ask-for-time"]
];

const chapterThreeChoices = [
  ["speak-plainly", "face-the-image-alone", "move-it-alone", "accept-the-book"],
  ["repeat-the-explanation", "let-him-see-the-cover", "tell-basil-there-is-a-private-reason", "question-the-book"],
  ["ask-for-trust", "name-the-danger-without-showing-it", "delay-but-keep-the-key", "use-it-as-an-escape"]
];

const chapterThreeDecisionOptions = [
  ["speak-plainly", "repeat-the-explanation", "ask-for-trust"],
  ["face-the-image-alone", "let-him-see-the-cover", "name-the-danger-without-showing-it"],
  ["move-it-alone", "tell-basil-there-is-a-private-reason", "delay-but-keep-the-key"],
  ["accept-the-book", "question-the-book", "use-it-as-an-escape"]
];

const chapterThreeSceneIds = [
  "c3-morning-quiet",
  "c3-basil-arrives",
  "c3-basil-questions",
  "c3-behind-the-screen",
  "c3-the-expression",
  "c3-the-old-schoolroom",
  "c3-rules-of-secrecy",
  "c3-henrys-note",
  "c3-the-book-on-the-table"
];

function advance(state, sceneId) {
  const result = continueFromScene(state, sceneId);
  assert.equal(result.ok, true, `could not continue from ${sceneId}`);
  return result.state;
}

function chooseFrom(state, sceneId, choiceId) {
  const result = choose(state, sceneId, choiceId);
  assert.equal(result.ok, true, `could not choose ${sceneId}/${choiceId}`);
  return result.state;
}

function completeChapterOne(path) {
  let state = createInitialState();
  state = advance(state, "c1-opening");
  state = advance(state, "c1-basil-studio");
  state = chooseFrom(state, "c1-henry-arrives", path[0]);
  state = chooseFrom(state, "c1-youth-question", path[1]);
  state = chooseFrom(state, "c1-portrait-unveiled", path[2]);
  if (path[2] === "study-portrait") state = advance(state, "c1-hidden-canvas");
  assert.equal(state.sceneId, "c1-closing");
  return state;
}

function playChapterTwo(c1Path, choices) {
  let state = completeChapterOne(c1Path);
  state = continueToChapter(state, "chapter-2").state;
  state = advance(state, "c2-theatre-lights");
  state = chooseFrom(state, "c2-prince-charming", choices[0]);
  state = advance(state, "c2-many-heroines");
  state = chooseFrom(state, "c2-tell-basil-henry", choices[1]);
  state = chooseFrom(state, "c2-offstage-sibyl", choices[2]);
  state = advance(state, "c2-engagement");
  state = advance(state, "c2-final-performance");
  state = chooseFrom(state, "c2-backstage-choice", choices[3]);
  assert.equal(state.sceneId, "c2-the-morning-after");
  return state;
}

function playChapterThree(state, choices) {
  state = continueToChapter(state, "chapter-3").state;
  state = advance(state, "c3-morning-quiet");
  state = chooseFrom(state, "c3-basil-arrives", choices[0]);
  state = advance(state, "c3-basil-questions");
  state = chooseFrom(state, "c3-behind-the-screen", choices[1]);
  state = advance(state, "c3-the-expression");
  state = chooseFrom(state, "c3-the-old-schoolroom", choices[2]);
  state = advance(state, "c3-rules-of-secrecy");
  state = chooseFrom(state, "c3-henrys-note", choices[3]);
  assert.equal(state.sceneId, "c3-the-book-on-the-table");
  return state;
}

function sceneText(state) {
  return chapterThreeSceneIds
    .map((sceneId) => resolveSceneParagraphs(STORY_DATA.scenes[sceneId], state).join(" "))
    .join(" ");
}

function assertSibylContinuity(state) {
  const text = sceneText(state);
  if (state.storyFacts.sibylOutcome === "dead-canonical") {
    assert.match(text, /grief|death|dead/i);
    assert.doesNotMatch(text, /Sibyl is alive|Sibyl remains alive|Sibyl is still close/i);
  } else if (state.storyFacts.sibylOutcome === "alive-estranged") {
    assert.match(text, /Sibyl is alive|Sibyl remains alive/i);
    assert.doesNotMatch(text, /Sibyl is dead|Sibyl's death/i);
  } else {
    assert.match(text, /Sibyl is alive|Sibyl remains alive/i);
    assert.doesNotMatch(text, /Sibyl is dead|Sibyl's death/i);
  }
}

test("Chapter III exposes the approved nine-scene spine and four decisions", () => {
  const chapter = STORY_DATA.chapters.find((item) => item.id === "chapter-3");
  assert.equal(chapter.status, "playable");
  assert.equal(chapter.available, true);
  assert.equal(chapter.firstScene, "c3-morning-quiet");
  assert.deepEqual(Object.keys(STORY_DATA.scenes).filter((sceneId) => sceneId.startsWith("c3-")), chapterThreeSceneIds);
  assert.deepEqual(chapterThreeSceneIds.map((sceneId) => STORY_DATA.scenes[sceneId].title), [
    "Morning Without an Answer",
    "Basil at Breakfast",
    "What Basil Wants to Know",
    "The Portrait Behind the Screen",
    "The Face That Answers",
    "The Room With a Key",
    "Rules Around the Secret",
    "The Book That Was Waiting",
    "A Book for the Next Life"
  ]);
  assert.deepEqual([
    STORY_DATA.scenes["c3-basil-arrives"].choices.length,
    STORY_DATA.scenes["c3-behind-the-screen"].choices.length,
    STORY_DATA.scenes["c3-the-old-schoolroom"].choices.length,
    STORY_DATA.scenes["c3-henrys-note"].choices.length
  ], [3, 3, 3, 3]);
  assert.equal(chapter.teacherNotes.scenes.length, 9);
  assert.equal(chapter.teacherNotes.decisions.length, 4);
  assert.equal(chapter.teacherNotes.comprehension.length, 8);
  assert.match(chapter.teacherNotes.canonAndAlternatives, /interactive extensions/i);
});

test("Chapter III uses the approved runtime visuals in context", () => {
  const assets = STORY_DATA.assets.chapterThree;
  assert.deepEqual(Object.keys(assets.locations), ["dorianHouse", "secretRoom"]);
  for (const asset of Object.values(assets.locations)) {
    assert.match(asset.src, /^assets\/locations\/[^/]+\.webp$/);
    assert.equal(typeof asset.alt, "string");
    assert.ok(asset.alt.length > 20);
    assert.ok(existsSync(asset.src), `missing runtime asset: ${asset.src}`);
  }
  assert.equal(STORY_DATA.scenes["c3-morning-quiet"].visual.location, "dorianHouse");
  assert.equal(STORY_DATA.scenes["c3-basil-arrives"].visual.location, "dorianHouse");
  assert.equal(STORY_DATA.scenes["c3-basil-questions"].visual.location, "dorianHouse");
  assert.equal(STORY_DATA.scenes["c3-behind-the-screen"].visual.location, "dorianHouse");
  assert.equal(STORY_DATA.scenes["c3-the-expression"].visual.location, "dorianHouse");
  assert.equal(STORY_DATA.scenes["c3-the-old-schoolroom"].visual.location, "secretRoom");
  assert.equal(STORY_DATA.scenes["c3-rules-of-secrecy"].visual.location, "secretRoom");
  assert.equal(STORY_DATA.scenes["c3-henrys-note"].visual.location, "dorianHouse");
  assert.equal(STORY_DATA.scenes["c3-the-book-on-the-table"].visual.location, "dorianHouse");
});

test("Chapter III entry requires Chapter II and preserves all prior history", () => {
  const locked = createInitialState();
  assert.equal(canStartChapter(locked, "chapter-3"), false);

  for (const outcome of ["dead-canonical", "alive-estranged", "alive-together"]) {
    const state = normaliseState({
      version: 2,
      sceneId: "c2-the-morning-after",
      activeChapterId: "chapter-2",
      completedChapters: { "chapter-1": true, "chapter-2": true },
      flags: { defendedBasil: true, heardHenry: true },
      choices: [
        { sceneId: "c1-henry-arrives", choiceId: "defend-basil", reflection: "one" },
        { sceneId: "c2-backstage-choice", choiceId: "ask-for-time", reflection: "two" }
      ],
      visitedScenes: ["c1-opening", "c1-closing", "c2-the-morning-after"],
      storyFacts: { sibylRelationship: "person-first", sibylOutcome: outcome, c2FinalResponse: "delay" },
      chapterComplete: true
    });
    assert.equal(canStartChapter(state, "chapter-3"), true);
    const entered = continueToChapter(state, "chapter-3");
    assert.equal(entered.ok, true);
    assert.equal(entered.state.sceneId, "c3-morning-quiet");
    assert.equal(entered.state.activeChapterId, "chapter-3");
    assert.equal(entered.state.reputation, state.reputation);
    assert.equal(entered.state.conscience, state.conscience);
    assert.equal(entered.state.portrait, state.portrait);
    assert.deepEqual(entered.state.choices, state.choices);
    assert.deepEqual(entered.state.visitedScenes.slice(0, 3), state.visitedScenes);
    assert.equal(entered.state.storyFacts.sibylOutcome, outcome);
  }
});

test("the four Chapter III decisions use the approved effects and shared spine", () => {
  const basil = STORY_DATA.scenes["c3-basil-arrives"].choices;
  assert.deepEqual(basil.map(({ id, effects }) => ({ id, effects })), [
    { id: "speak-plainly", effects: { reputation: -1, conscience: 1, portrait: 0, storyFacts: { basilSuspicion: "uneasy" } } },
    { id: "repeat-the-explanation", effects: { reputation: 1, conscience: -1, portrait: 1, storyFacts: { basilSuspicion: "suspects" } } },
    { id: "ask-for-trust", effects: { reputation: 0, conscience: 0, portrait: 1, storyFacts: { basilSuspicion: "uneasy" } } }
  ]);
  const screen = STORY_DATA.scenes["c3-behind-the-screen"].choices;
  assert.deepEqual(screen.map(({ id, effects }) => ({ id, effects })), [
    { id: "face-the-image-alone", effects: { conscience: 1, portrait: 1 } },
    { id: "let-him-see-the-cover", effects: { reputation: -1, storyFacts: { basilSuspicion: "suspects" } } },
    { id: "name-the-danger-without-showing-it", effects: { conscience: 1, portrait: 1, storyFacts: { basilSuspicion: "clear" } } }
  ]);
  const room = STORY_DATA.scenes["c3-the-old-schoolroom"].choices;
  room.forEach((choice) => {
    assert.equal(choice.effects.storyFacts.portraitLocation, "locked-schoolroom");
    assert.equal(choice.effects.storyFacts.portraitStageUnlock, "stage-3");
  });
  const book = STORY_DATA.scenes["c3-henrys-note"].choices;
  assert.deepEqual(book.map(({ id, effects }) => ({ id, effects })), [
    { id: "accept-the-book", effects: { reputation: 1, conscience: -1, portrait: 1, storyFacts: { yellowBookResponse: "accepted" } } },
    { id: "question-the-book", effects: { reputation: -1, conscience: 1, storyFacts: { yellowBookResponse: "questioned" } } },
    { id: "use-it-as-an-escape", effects: { reputation: 1, portrait: 1, storyFacts: { yellowBookResponse: "escape" } } }
  ]);
});

test("Sibyl continuity, Basil continuity, and reveal boundary remain safe", () => {
  const dead = playChapterThree(playChapterTwo(chapterOnePaths[0], chapterTwoChoices[1]), chapterThreeChoices[0]);
  const estranged = playChapterThree(playChapterTwo(chapterOnePaths[1], chapterTwoChoices[3]), chapterThreeChoices[1]);
  const together = playChapterThree(playChapterTwo(chapterOnePaths[4], chapterTwoChoices[2]), chapterThreeChoices[2]);
  assertSibylContinuity(dead);
  assertSibylContinuity(estranged);
  assertSibylContinuity(together);

  const defended = playChapterThree(playChapterTwo(chapterOnePaths[4], chapterTwoChoices[0]), chapterThreeChoices[0]);
  const defendedText = resolveSceneParagraphs(STORY_DATA.scenes["c3-basil-questions"], defended).join(" ");
  assert.match(defendedText, /You stood beside me once/);
  const cautious = playChapterThree(playChapterTwo(chapterOnePaths[0], chapterTwoChoices[1]), chapterThreeChoices[0]);
  const cautiousText = resolveSceneParagraphs(STORY_DATA.scenes["c3-basil-questions"], cautious).join(" ");
  assert.match(cautiousText, /Perhaps I no longer know/);

  for (const state of [dead, estranged, together]) {
    assert.equal(Object.prototype.hasOwnProperty.call(state.storyFacts, "portraitWitness"), false);
    const screenText = resolveSceneParagraphs(STORY_DATA.scenes["c3-behind-the-screen"], state).join(" ");
    assert.doesNotMatch(screenText, /Basil (?:sees|saw) the (?:changed|painted) face/i);
  }
  assert.deepEqual([dead.storyFacts.basilSuspicion, estranged.storyFacts.basilSuspicion, together.storyFacts.basilSuspicion], ["uneasy", "clear", "clear"]);
});

test("Stage 3 remains locked before the room event and unlocks atomically with artwork", () => {
  let state = playChapterTwo(chapterOnePaths[7], chapterTwoChoices[3]);
  state = { ...state, portrait: 0 };
  state = continueToChapter(state, "chapter-3").state;
  state = advance(state, "c3-morning-quiet");
  state = chooseFrom(state, "c3-basil-arrives", "speak-plainly");
  state = advance(state, "c3-basil-questions");
  state = chooseFrom(state, "c3-behind-the-screen", "face-the-image-alone");
  state = advance(state, "c3-the-expression");
  assert.equal(portraitStage(state), 1);
  assert.equal(canEnterScene(state, "c3-rules-of-secrecy"), false);

  state = chooseFrom(state, "c3-the-old-schoolroom", "move-it-alone");
  assert.equal(state.storyFacts.portraitLocation, "locked-schoolroom");
  assert.equal(state.storyFacts.portraitStageUnlock, "stage-3");
  assert.equal(state.portrait, 2);
  assert.equal(portraitStage(state), 3);
  assert.equal(portraitStageForValue(3), 2);
  assert.equal(portraitViewerModel(state).asset, "assets/portraits/portrait-dorian-stage-3.webp");
  assert.equal(canEnterScene(state, "c3-rules-of-secrecy"), true);
});

test("all yellow-book responses complete Chapter III and preserve the locked room", () => {
  for (const [choice, response] of [["accept-the-book", "accepted"], ["question-the-book", "questioned"], ["use-it-as-an-escape", "escape"]]) {
    const c3Choices = ["speak-plainly", "face-the-image-alone", "move-it-alone", choice];
    const state = playChapterThree(playChapterTwo(chapterOnePaths[0], chapterTwoChoices[0]), c3Choices);
    assert.equal(state.storyFacts.yellowBookResponse, response);
    assert.equal(state.storyFacts.portraitLocation, "locked-schoolroom");
    assert.equal(state.storyFacts.portraitStageUnlock, "stage-3");
    assert.equal(state.completedChapters["chapter-1"], true);
    assert.equal(state.completedChapters["chapter-2"], true);
    assert.equal(state.completedChapters["chapter-3"], true);
    assert.equal(state.chapterComplete, true);
    assert.equal(state.activeChapterId, "chapter-3");
    assert.equal(Object.prototype.hasOwnProperty.call(state.completedChapters, "chapter-4"), false);
  }
});

test("save and restore preserves Chapter III before and after the locked-room event", () => {
  let state = playChapterTwo(chapterOnePaths[2], chapterTwoChoices[2]);
  state = continueToChapter(state, "chapter-3").state;
  state = advance(state, "c3-morning-quiet");
  state = chooseFrom(state, "c3-basil-arrives", "ask-for-trust");
  state = advance(state, "c3-basil-questions");
  state = chooseFrom(state, "c3-behind-the-screen", "let-him-see-the-cover");
  state = advance(state, "c3-the-expression");
  state = chooseFrom(state, "c3-the-old-schoolroom", "tell-basil-there-is-a-private-reason");
  const beforeRestore = saveState(state);
  const restored = loadState();
  assert.deepEqual(restored.storyFacts, beforeRestore.storyFacts);
  assert.deepEqual(restored.choices, beforeRestore.choices);
  assert.deepEqual(restored.visitedScenes, beforeRestore.visitedScenes);
  assert.equal(restored.storyFacts.portraitStageUnlock, "stage-3");

  let completed = restored;
  completed = advance(completed, "c3-rules-of-secrecy");
  completed = chooseFrom(completed, "c3-henrys-note", "question-the-book");
  const afterRestore = loadState();
  assert.equal(afterRestore.sceneId, "c3-the-book-on-the-table");
  assert.equal(afterRestore.storyFacts.yellowBookResponse, "questioned");
  assert.equal(afterRestore.completedChapters["chapter-3"], true);
  assert.equal(afterRestore.completedChapters["chapter-2"], true);
});

test("all 23,328 Chapter I plus Chapter II plus Chapter III paths preserve continuity", () => {
  let combinations = 0;
  for (const c1Path of chapterOnePaths) {
    for (const first of chapterTwoDecisionOptions[0]) {
      for (const second of chapterTwoDecisionOptions[1]) {
        for (const third of chapterTwoDecisionOptions[2]) {
          for (const fourth of chapterTwoDecisionOptions[3]) {
            const chapterTwoState = playChapterTwo(c1Path, [first, second, third, fourth]);
            for (const basil of chapterThreeDecisionOptions[0]) {
              for (const screen of chapterThreeDecisionOptions[1]) {
                for (const room of chapterThreeDecisionOptions[2]) {
                  for (const book of chapterThreeDecisionOptions[3]) {
                    const state = playChapterThree(chapterTwoState, [basil, screen, room, book]);
                    combinations += 1;
                    assert.equal(state.completedChapters["chapter-1"], true);
                    assert.equal(state.completedChapters["chapter-2"], true);
                    assert.equal(state.completedChapters["chapter-3"], true);
                    assert.equal(state.activeChapterId, "chapter-3");
                    assert.equal(state.chapterComplete, true);
                    assert.equal(state.storyFacts.portraitLocation, "locked-schoolroom");
                    assert.equal(state.storyFacts.portraitStageUnlock, "stage-3");
                    assert.ok(["uneasy", "suspects", "clear"].includes(state.storyFacts.basilSuspicion));
                    assert.ok(["accepted", "questioned", "escape"].includes(state.storyFacts.yellowBookResponse));
                    assert.equal(portraitStage(state), 3);
                    assert.equal(state.choices.length, 11);
                    assert.equal(new Set(state.visitedScenes).size, state.visitedScenes.length);
                    assert.equal(canEnterScene(state, "c3-the-book-on-the-table"), true);
                    assertSibylContinuity(state);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  assert.equal(combinations, 8 * 36 * 81);
  assert.equal(STORY_DATA.chapters.some((chapter) => chapter.id === "chapter-4"), false);
});
