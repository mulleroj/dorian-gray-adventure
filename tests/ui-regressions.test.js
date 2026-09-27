import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { STORY_DATA } from "../js/story-data.js";
import { scrollToSceneStart } from "../js/scene-navigation.js";
import { teacherFacingText } from "../js/teacher-copy.js";

const uiSource = readFileSync(new URL("../js/ui.js", import.meta.url), "utf8");
const indexSource = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const styleSource = readFileSync(new URL("../styles.css", import.meta.url), "utf8");

test("root entry renders one isolated book cover before the existing story", () => {
  assert.match(uiSource, /function bookCoverScreen\(\)/);
  assert.match(uiSource, /window\.location\.hash === ""/);
  assert.match(uiSource, /data-action="open-book"/);
  assert.match(uiSource, /Open the book/);
  assert.doesNotMatch(uiSource, /Chapter I\s*[—-]\s*A Quiet Studio/);
  assert.match(styleSource, /\.book-cover-screen/);
});

test("book cover opens the existing Chapter I state without duplicating story content", () => {
  assert.match(uiSource, /renderSceneTransition\(state \?\? startNewGame\(\)\)/);
  assert.match(uiSource, /const targetHash = `#scene\/\$\{state\.sceneId\}`/);
  assert.equal((uiSource.match(/data-action="open-book"/g) ?? []).length, 1);
});

test("book cover keeps Teacher Mode available and keeps its existing dialog route", () => {
  assert.match(indexSource, /id="teacher-mode-button"/);
  assert.match(uiSource, /document\.querySelector\("#teacher-mode-button"\)\.addEventListener/);
  assert.match(uiSource, /openDialog\(teacherDialog\)/);
});

test("book cover progress controls reuse existing resume and new-game actions", () => {
  assert.match(uiSource, /data-action="resume"/);
  assert.match(uiSource, /data-action="new-game"/);
  assert.doesNotMatch(uiSource, /localStorage\.(getItem|setItem|removeItem).*cover/i);
});

test("cover transition is short and respects reduced motion", () => {
  assert.match(uiSource, /transition: true/);
  assert.match(styleSource, /@keyframes view-fade-in/);
  assert.match(styleSource, /prefers-reduced-motion/);
});

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
