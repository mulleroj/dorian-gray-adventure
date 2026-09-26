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
