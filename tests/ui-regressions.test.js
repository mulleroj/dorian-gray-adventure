import test from "node:test";
import assert from "node:assert/strict";

import { STORY_DATA } from "../js/story-data.js";
import { scrollToSceneStart } from "../js/scene-navigation.js";
import { teacherFacingText } from "../js/teacher-copy.js";

test("scene transition scroll helper brings the rendered scene heading into view", () => {
  const calls = [];
  const heading = {
    scrollIntoView(options) {
      calls.push(options);
    }
  };
  const root = { querySelector(selector) {
    assert.equal(selector, "#scene-title");
    return heading;
  } };

  assert.equal(scrollToSceneStart(root), true);
  assert.deepEqual(calls, [{ behavior: "auto", block: "start" }]);
});

test("scene transition scroll helper safely handles a missing scene heading", () => {
  assert.equal(scrollToSceneStart({ querySelector: () => null }), false);
});

test("Teacher mode presents readable outcome and continuity labels", () => {
  const rawTeacherText = JSON.stringify(STORY_DATA.chapters.find((chapter) => chapter.id === "chapter-6")?.teacherNotes);
  const renderedTeacherText = teacherFacingText(rawTeacherText);

  for (const internalTerm of [
    "truth-faced",
    "secret-kept",
    "portrait-destroyed",
    "dead-canonical",
    "alive-estranged",
    "alive-together",
    "milestone milestone",
    "derived Chapter IV behaviour profile"
  ]) {
    assert.doesNotMatch(renderedTeacherText, new RegExp(internalTerm.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&"), "i"));
  }

  assert.match(teacherFacingText("truth-faced / secret-kept / portrait-destroyed"), /Dorian faces the truth/);
  assert.match(teacherFacingText("truth-faced / secret-kept / portrait-destroyed"), /Dorian keeps the secret/);
  assert.match(teacherFacingText("truth-faced / secret-kept / portrait-destroyed"), /Dorian destroys the portrait/);
  assert.match(renderedTeacherText, /pattern of choices in Chapter IV/i);
});

test("Teacher notes follow each chapter's runtime scene spine and decision groups", () => {
  for (const chapter of STORY_DATA.chapters) {
    const runtimeScenes = Object.values(STORY_DATA.scenes).filter((scene) => scene.chapterId === chapter.id);
    const runtimeDecisionScenes = runtimeScenes.filter((scene) => Array.isArray(scene.choices) && scene.choices.length > 0);

    assert.deepEqual(
      chapter.teacherNotes.scenes.map((scene) => scene.title),
      runtimeScenes.map((scene) => scene.title),
      `Teacher scene titles diverge in Chapter ${chapter.number}`
    );
    assert.equal(
      chapter.teacherNotes.decisions.length,
      runtimeDecisionScenes.length,
      `Teacher decision count diverges in Chapter ${chapter.number}`
    );
  }
});

test("Teacher notes keep canon-only warnings aligned with runtime branches", () => {
  const warningCases = [
    {
      chapterId: "chapter-2",
      sceneId: "c2-the-morning-after",
      fact: { key: "sibylOutcome", value: "dead-canonical" },
      note: /canonical death outcome only/i
    },
    {
      chapterId: "chapter-5",
      sceneId: "c5-after-the-door",
      fact: { key: "basilOutcome", value: "dead-canonical" },
      note: /canonical Basil-death outcome only/i
    },
    {
      chapterId: "chapter-6",
      sceneId: "c6-what-remains",
      fact: { key: "chapterSixOutcome", value: "portrait-destroyed" },
      note: /portrait-destroyed ending only/i
    }
  ];

  for (const { chapterId, sceneId, fact, note } of warningCases) {
    const chapter = STORY_DATA.chapters.find((item) => item.id === chapterId);
    const runtimeWarning = STORY_DATA.scenes[sceneId].contentWarning;

    assert.deepEqual(runtimeWarning.when.storyFact, fact);
    assert.equal(runtimeWarning.canSkip, true);
    assert.match(chapter.teacherNotes.contentWarning, note);
  }
});

test("Teacher notes describe the canonical Chapter II resolver and Chapter III timing", () => {
  const chapterTwo = STORY_DATA.chapters.find((chapter) => chapter.id === "chapter-2");
  assert.match(
    chapterTwo.teacherNotes.canonAndAlternatives,
    /admire the roles, tell the beautiful story, stay inside the dream, and then judge the failed performance/i
  );
  assert.match(
    chapterTwo.teacherNotes.canonAndAlternatives,
    /asking about Sibyl, listening to her life, and staying to listen/i
  );

  const chapterThree = STORY_DATA.chapters.find((chapter) => chapter.id === "chapter-3");
  const roomNote = chapterThree.teacherNotes.scenes.find((scene) => scene.title === "The Room With a Key");
  assert.match(roomNote.focus, /first clear change appears in the following scene/i);
  assert.match(STORY_DATA.scenes["c3-rules-of-secrecy"].paragraphs[1], /For the first time, the image gives back more than a warning/i);
});

test("Teacher notes expose no runtime identifiers across chapters", () => {
  const renderedTeacherText = teacherFacingText(JSON.stringify(STORY_DATA.chapters.map((chapter) => chapter.teacherNotes)));

  for (const internalTerm of [
    "defendedBasil",
    "dead-canonical",
    "alive-estranged",
    "alive-together",
    "stage-4",
    "stage-5",
    "stage-6",
    "derived Chapter IV behaviour profile",
    "procedural subplots",
    "not implemented"
  ]) {
    assert.doesNotMatch(renderedTeacherText, new RegExp(internalTerm.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&"), "i"));
  }
});
