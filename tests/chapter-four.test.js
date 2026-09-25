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
const { loadState, normaliseState } = await import("../js/game-state.js");
const {
  canEnterScene,
  canStartChapter,
  choose,
  continueFromScene,
  continueToChapter,
  enterScene,
  portraitStage
} = await import("../js/game-engine.js");
const {
  CHAPTER_FOUR_BEHAVIOUR_PROFILES,
  CHAPTER_FOUR_CHOICE_CLASSIFICATION,
  CHAPTER_FOUR_DECISION_CHOICE_IDS,
  chapterFourBehaviourProfile
} = await import("../js/chapter-four-behaviour.js");
const {
  contentWarningForScene,
  resolveSceneParagraphs
} = await import("../js/narrative-resolver.js");

const chapterFourSceneIds = [
  "c4-years-begin",
  "c4-the-book-as-habit",
  "c4-house-open",
  "c4-whispers",
  "c4-chosen-pleasure",
  "c4-locked-room-again",
  "c4-face-in-mirror",
  "c4-later-invitation",
  "c4-threshold"
];

const chapterFourDecisionSceneIds = [
  "c4-house-open",
  "c4-whispers",
  "c4-chosen-pleasure",
  "c4-locked-room-again"
];

const chapterThreeHandoffChoices = [
  { sceneId: "c1-henry-arrives", choiceId: "listen-to-henry", reflection: "one" },
  { sceneId: "c1-youth-question", choiceId: "ask-about-youth", reflection: "two" },
  { sceneId: "c1-portrait-unveiled", choiceId: "study-portrait", reflection: "three" },
  { sceneId: "c2-prince-charming", choiceId: "ask-about-sibyl", reflection: "four" },
  { sceneId: "c2-tell-basil-henry", choiceId: "defend-the-person", reflection: "five" },
  { sceneId: "c2-offstage-sibyl", choiceId: "listen-to-her-life", reflection: "six" },
  { sceneId: "c2-backstage-choice", choiceId: "stay-and-listen", reflection: "seven" },
  { sceneId: "c3-basil-arrives", choiceId: "speak-plainly", reflection: "eight" },
  { sceneId: "c3-behind-the-screen", choiceId: "face-the-image-alone", reflection: "nine" },
  { sceneId: "c3-the-old-schoolroom", choiceId: "move-it-alone", reflection: "ten" },
  { sceneId: "c3-henrys-note", choiceId: "accept-the-book", reflection: "eleven" }
];

function chapterThreeHandoff(overrides = {}) {
  const storyFacts = {
    sibylRelationship: "person-first",
    sibylOutcome: "alive-together",
    c2FinalResponse: "listen",
    portraitLocation: "locked-schoolroom",
    portraitStageUnlock: "stage-3",
    basilSuspicion: "uneasy",
    yellowBookResponse: "accepted",
    ...(overrides.storyFacts ?? {})
  };
  return normaliseState({
    version: 2,
    sceneId: "c3-the-book-on-the-table",
    activeChapterId: "chapter-3",
    reputation: overrides.reputation ?? 0,
    conscience: overrides.conscience ?? 0,
    portrait: overrides.portrait ?? 1,
    flags: { heardHenry: true, defendedBasil: true, acceptedIdea: true, ...(overrides.flags ?? {}) },
    storyFacts,
    choices: overrides.choices ?? chapterThreeHandoffChoices,
    visitedScenes: overrides.visitedScenes ?? ["c3-morning-quiet", "c3-the-book-on-the-table"],
    completedChapters: overrides.completedChapters ?? { "chapter-1": true, "chapter-2": true, "chapter-3": true },
    startedAt: "2026-09-25T10:00:00.000Z",
    updatedAt: "2026-09-25T10:01:00.000Z",
    chapterComplete: overrides.chapterComplete ?? true
  });
}

function advance(state, sceneId) {
  assert.equal(state.sceneId, sceneId, `expected current scene ${sceneId}, got ${state.sceneId}`);
  const result = continueFromScene(state, sceneId);
  assert.equal(result.ok, true, `could not continue from ${sceneId}`);
  return result.state;
}

function chooseFrom(state, sceneId, choiceId) {
  assert.equal(state.sceneId, sceneId, `expected current scene ${sceneId}, got ${state.sceneId}`);
  const result = choose(state, sceneId, choiceId);
  assert.equal(result.ok, true, `could not choose ${sceneId}/${choiceId}`);
  return result.state;
}

function expectedProfile(choiceIds) {
  const reflectionCount = choiceIds.filter((choiceId) => CHAPTER_FOUR_CHOICE_CLASSIFICATION[choiceId] === "reflection").length;
  const escapeCount = choiceIds.filter((choiceId) => CHAPTER_FOUR_CHOICE_CLASSIFICATION[choiceId] === "escape").length;
  if (reflectionCount >= 3) return CHAPTER_FOUR_BEHAVIOUR_PROFILES.REFLECTION;
  if (escapeCount >= 3) return CHAPTER_FOUR_BEHAVIOUR_PROFILES.ESCAPE;
  return CHAPTER_FOUR_BEHAVIOUR_PROFILES.DIVIDED;
}

function playChapterFour(handoff, choiceIds) {
  let state = continueToChapter(handoff, "chapter-4").state;
  state = advance(state, "c4-years-begin");
  state = advance(state, "c4-the-book-as-habit");
  state = chooseFrom(state, "c4-house-open", choiceIds[0]);
  state = chooseFrom(state, "c4-whispers", choiceIds[1]);
  state = chooseFrom(state, "c4-chosen-pleasure", choiceIds[2]);
  const beforeStage4 = state;
  const beforeStage4Saved = loadState();
  assert.equal(portraitStage(beforeStage4), 3);
  state = chooseFrom(state, "c4-locked-room-again", choiceIds[3]);
  const afterStage4 = state;
  const afterStage4Saved = loadState();
  assert.equal(state.sceneId, "c4-face-in-mirror");
  assert.equal(portraitStage(state), 4);
  state = advance(state, "c4-face-in-mirror");
  state = advance(state, "c4-later-invitation");
  state = advance(state, "c4-threshold");
  return { state, beforeStage4, beforeStage4Saved, afterStage4, afterStage4Saved };
}

test("Chapter IV exposes the approved shared nine-scene spine and teacher mode contract", () => {
  const chapter = STORY_DATA.chapters.find((item) => item.id === "chapter-4");
  assert.equal(chapter.title, "A Life of Pleasure");
  assert.equal(chapter.status, "playable");
  assert.equal(chapter.available, true);
  assert.equal(chapter.firstScene, "c4-years-begin");
  assert.deepEqual(Object.keys(STORY_DATA.scenes).filter((sceneId) => sceneId.startsWith("c4-")), chapterFourSceneIds);
  assert.deepEqual(chapterFourSceneIds.map((sceneId) => STORY_DATA.scenes[sceneId].title), [
    "The Years Begin",
    "The Book Becomes a Habit",
    "A House Open to the World",
    "Whispers at the Edge of the Room",
    "A Pleasure for Forgetting",
    "The Locked Room, Again",
    "The Face in the Mirror",
    "An Invitation Withheld",
    "The Door Before the Next Chapter"
  ]);
  assert.deepEqual(chapterFourDecisionSceneIds.map((sceneId) => STORY_DATA.scenes[sceneId].choices.length), [3, 3, 3, 3]);
  assert.equal(chapter.teacherNotes.scenes.length, 9);
  assert.equal(chapter.teacherNotes.decisions.length, 4);
  assert.equal(chapter.teacherNotes.comprehension.length, 8);
  assert.match(chapter.teacherNotes.literaryBasis, /Chapter XI/);
  assert.match(chapter.teacherNotes.literaryBasis, /Chapter XII/);
  assert.match(chapter.teacherNotes.adaptation, /long time compression/i);
  assert.match(chapter.teacherNotes.canonAndAlternatives, /interactive additions/i);
  for (const term of ["rumour", "habit", "influence", "reputation", "appearance", "evidence", "invitation", "avoid", "compare", "unchanged", "private", "public", "consequence", "behaviour", "distance"]) {
    assert.equal(typeof STORY_DATA.glossary[term], "string", `missing Chapter IV glossary term: ${term}`);
  }
});

test("Chapter IV uses exactly the reserved choice IDs and central classification contract", () => {
  const storyChoiceIds = chapterFourDecisionSceneIds.map((sceneId) => STORY_DATA.scenes[sceneId].choices.map((choice) => choice.id));
  assert.deepEqual(storyChoiceIds, CHAPTER_FOUR_DECISION_CHOICE_IDS);
  assert.equal(new Set(Object.keys(CHAPTER_FOUR_CHOICE_CLASSIFICATION)).size, 12);
  assert.equal(Object.keys(CHAPTER_FOUR_CHOICE_CLASSIFICATION).length, 12);
  assert.deepEqual(
    new Set(storyChoiceIds.flat()),
    new Set(Object.keys(CHAPTER_FOUR_CHOICE_CLASSIFICATION))
  );
});

test("Chapter IV entry requires Chapter III and preserves the handoff", () => {
  const locked = chapterThreeHandoff({ completedChapters: { "chapter-1": true, "chapter-2": true }, chapterComplete: false });
  assert.equal(canStartChapter(locked, "chapter-4"), false);
  assert.equal(continueToChapter(locked, "chapter-4").ok, false);

  const handoff = chapterThreeHandoff();
  const before = structuredClone(handoff);
  const entered = continueToChapter(handoff, "chapter-4");
  assert.equal(entered.ok, true);
  assert.equal(entered.state.activeChapterId, "chapter-4");
  assert.equal(entered.state.sceneId, "c4-years-begin");
  assert.deepEqual(entered.state.choices, before.choices);
  assert.deepEqual(entered.state.storyFacts, before.storyFacts);
  assert.deepEqual(entered.state.visitedScenes.slice(0, 2), before.visitedScenes);
  assert.deepEqual([entered.state.reputation, entered.state.conscience, entered.state.portrait], [before.reputation, before.conscience, before.portrait]);
  assert.equal(entered.state.completedChapters["chapter-3"], true);
  assert.equal(entered.state.completedChapters["chapter-4"], undefined);
});

test("all 81 Chapter IV local paths complete the shared spine", () => {
  let paths = 0;
  for (const first of CHAPTER_FOUR_DECISION_CHOICE_IDS[0]) {
    for (const second of CHAPTER_FOUR_DECISION_CHOICE_IDS[1]) {
      for (const third of CHAPTER_FOUR_DECISION_CHOICE_IDS[2]) {
        for (const fourth of CHAPTER_FOUR_DECISION_CHOICE_IDS[3]) {
          const choiceIds = [first, second, third, fourth];
          localStorage.data.clear();
          const result = playChapterFour(chapterThreeHandoff(), choiceIds);
          const state = result.state;
          const chapterFourChoices = state.choices.filter((choice) => choice.sceneId.startsWith("c4-"));
          assert.equal(chapterFourChoices.length, 4, choiceIds.join(" / "));
          assert.deepEqual(chapterFourChoices.map((choice) => choice.choiceId), choiceIds);
          assert.deepEqual(state.visitedScenes.filter((sceneId) => sceneId.startsWith("c4-")), chapterFourSceneIds, choiceIds.join(" / "));
          assert.equal(state.sceneId, "c4-threshold");
          assert.equal(state.completedChapters["chapter-4"], true);
          assert.equal(state.completedChapters["chapter-5"], undefined);
          assert.equal(state.activeChapterId, "chapter-4");
          assert.equal(portraitStage(state), 4);
          assert.equal(chapterFourBehaviourProfile(state), expectedProfile(choiceIds));
          assert.equal(canEnterScene(state, "c4-threshold"), true);
          paths += 1;
        }
      }
    }
  }
  assert.equal(paths, 81);
});

test("Stage 4 is gated by all four decisions, unlocks universally, and survives save/reload", () => {
  const incomplete = chapterThreeHandoff();
  assert.equal(enterScene(incomplete, "c4-face-in-mirror"), null);

  for (const portrait of [0, 1, 2, 3]) {
    localStorage.data.clear();
    const result = playChapterFour(chapterThreeHandoff({ portrait }), [
      "share-the-evening",
      "ask-what-was-seen",
      "share-the-music",
      "name-the-change"
    ]);
    assert.equal(portraitStage(result.beforeStage4), 3);
    assert.equal(portraitStage(result.beforeStage4Saved), 3);
    assert.equal(result.beforeStage4Saved.storyFacts.portraitStageUnlock, "stage-3");
    assert.equal(portraitStage(result.afterStage4), 4);
    assert.equal(portraitStage(result.afterStage4Saved), 4);
    assert.equal(result.afterStage4Saved.storyFacts.portraitStageUnlock, "stage-4");
    assert.equal(portraitStage(loadState()), 4);
    assert.equal(loadState().completedChapters["chapter-4"], true);
    assert.equal(result.state.portrait, Math.min(3, portrait + 1));
  }

  assert.equal(STORY_DATA.assets.portraitStages[4], "assets/portraits/portrait-dorian-stage-4.webp");
  assert.equal(existsSync("assets/portraits/portrait-dorian-stage-4.webp"), true);
});

test("the 27 continuity classes preserve yellow-book, Sibyl and Basil semantics", () => {
  const yellowBookResponses = ["accepted", "questioned", "escape"];
  const sibylOutcomes = ["dead-canonical", "alive-estranged", "alive-together"];
  const basilSuspicionValues = ["uneasy", "suspects", "clear"];
  let classes = 0;

  for (const yellowBookResponse of yellowBookResponses) {
    for (const sibylOutcome of sibylOutcomes) {
      for (const basilSuspicion of basilSuspicionValues) {
        const state = chapterThreeHandoff({
          storyFacts: { yellowBookResponse, sibylOutcome, basilSuspicion },
          flags: { challengedHenry: true, studiedPortrait: true },
          choices: [
            ...chapterThreeHandoffChoices,
            { sceneId: "c4-house-open", choiceId: "share-the-evening", reflection: "shared" },
            { sceneId: "c4-whispers", choiceId: "ask-what-was-seen", reflection: "observed" },
            { sceneId: "c4-chosen-pleasure", choiceId: "share-the-music", reflection: "shared music" },
            { sceneId: "c4-locked-room-again", choiceId: "name-the-change", reflection: "named" }
          ]
        });
        const text = ["c4-years-begin", "c4-the-book-as-habit", "c4-whispers", "c4-threshold"]
          .flatMap((sceneId) => resolveSceneParagraphs(STORY_DATA.scenes[sceneId], state))
          .join(" ");

        if (yellowBookResponse === "accepted") assert.match(text, /elegant and attractive|philosophy you can carry/i);
        if (yellowBookResponse === "questioned") assert.match(text, /argue with the book|Questioning the book/i);
        if (yellowBookResponse === "escape") assert.match(text, /deliberately|look away/i);

        if (sibylOutcome === "dead-canonical") {
          assert.match(text, /grief|responsibility/i);
          assert.doesNotMatch(text, /Sibyl is alive|Sibyl remains alive/i);
        }
        if (sibylOutcome === "alive-estranged") {
          assert.match(text, /Sibyl is alive|Sibyl remains alive/i);
          assert.match(text, /independent life|distance/i);
          assert.doesNotMatch(text, /marriage|children|permanent romantic happiness|(?:is|remains) waiting for you/i);
        }
        if (sibylOutcome === "alive-together") {
          assert.match(text, /Sibyl remains part|Sibyl remains alive/i);
          assert.match(text, /boundaries|ordinary questions|changed the relationship/i);
          assert.doesNotMatch(text, /marriage|children|permanent romantic happiness/i);
        }

        if (basilSuspicion === "uneasy") assert.match(text, /unease/i);
        if (basilSuspicion === "suspects") assert.match(text, /deliberately hiding something serious/i);
        if (basilSuspicion === "clear") assert.match(text, /had not seen the portrait/i);
        assert.equal(state.storyFacts.c2FinalResponse, "listen");
        classes += 1;
      }
    }
  }
  assert.equal(classes, 27);
});

test("representative Chapter III relationship, response and history variants survive the Chapter IV handoff", () => {
  for (const sibylRelationship of ["role-first", "mixed", "person-first"]) {
    for (const c2FinalResponse of ["cruel", "listen", "delay"]) {
      const handoff = chapterThreeHandoff({
        storyFacts: { sibylRelationship, c2FinalResponse, sibylOutcome: "alive-estranged" },
        flags: {
          heardHenry: c2FinalResponse !== "cruel",
          acceptedIdea: c2FinalResponse === "cruel",
          challengedHenry: c2FinalResponse === "delay",
          defendedBasil: sibylRelationship === "person-first"
        }
      });
      const entered = continueToChapter(handoff, "chapter-4");
      assert.equal(entered.ok, true);
      assert.equal(entered.state.storyFacts.sibylRelationship, sibylRelationship);
      assert.equal(entered.state.storyFacts.c2FinalResponse, c2FinalResponse);
      assert.equal(entered.state.flags.challengedHenry, c2FinalResponse === "delay");
      assert.equal(entered.state.flags.defendedBasil, sibylRelationship === "person-first");
      assert.equal(chapterFourBehaviourProfile(entered.state), CHAPTER_FOUR_BEHAVIOUR_PROFILES.DIVIDED);
    }
  }
});

test("Chapter IV has no player-facing content warning and preserves the Basil reveal boundary", () => {
  const state = chapterThreeHandoff({
    choices: [
      ...chapterThreeHandoffChoices,
      { sceneId: "c4-house-open", choiceId: "charm-as-shield", reflection: "shield" },
      { sceneId: "c4-whispers", choiceId: "joke-about-rumour", reflection: "joke" },
      { sceneId: "c4-chosen-pleasure", choiceId: "beauty-as-shield", reflection: "beauty" },
      { sceneId: "c4-locked-room-again", choiceId: "cover-and-return", reflection: "cover" }
    ],
    storyFacts: { basilSuspicion: "clear" }
  });
  const text = chapterFourSceneIds
    .flatMap((sceneId) => resolveSceneParagraphs(STORY_DATA.scenes[sceneId], state))
    .join(" ");
  for (const sceneId of chapterFourSceneIds) assert.equal(contentWarningForScene(STORY_DATA.scenes[sceneId], state), null, sceneId);
  assert.match(text, /has not seen the portrait/);
  assert.match(text, /not.*entered the secret room/);
  assert.doesNotMatch(text, /Basil saw the portrait|Basil has seen the portrait|Basil entered the secret room|showed Basil the portrait|full confrontation|Basil in the fog/i);
});
