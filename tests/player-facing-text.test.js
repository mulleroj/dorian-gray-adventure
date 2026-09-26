import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { STORY_DATA } = await import("../js/story-data.js");
const { normaliseState } = await import("../js/game-state.js");
const { contentWarningForScene, resolveSceneParagraphs } = await import("../js/narrative-resolver.js");

const forbiddenPlayerFacingTerms = [
  /\bstage\s*[0-6]\b/i,
  /\bstage-[0-6]\b/i,
  /portraitStageUnlock/i,
  /chapterSixOutcome/i,
  /basilOutcome/i,
  /sibylOutcome/i,
  /interactive ending/i,
  /not described/i,
  /canonical route/i,
  /choice id/i,
  /\bdecision[ \t]+[ivx]+\b/i,
  /\b(outcome|branch|route|runtime|resolver|fallback|save state|chapter complete|profile|game|player)\b/i,
  /\binteractive\b/i,
  /\bcanonical\b/i,
  /\balternative\b/i
];

function assertNoForbiddenTerms(text, context) {
  for (const pattern of forbiddenPlayerFacingTerms) {
    assert.doesNotMatch(text, pattern, `${context} contains ${pattern}`);
  }
}

function playerFacingSceneText(scene, state) {
  const warning = contentWarningForScene(scene, state);
  const choices = (scene.choices ?? []).flatMap((choice) => [
    choice.label,
    choice.description,
    choice.reflection
  ]);
  return [
    scene.eyebrow,
    scene.title,
    scene.location,
    ...resolveSceneParagraphs(scene, state),
    scene.prompt,
    scene.decisionLabel,
    ...choices,
    scene.sourceNote,
    warning?.title,
    warning?.message
  ].filter((value) => typeof value === "string").join("\n");
}

function stateForFacts(overrides = {}) {
  return normaliseState({
    version: 2,
    activeChapterId: "chapter-6",
    sceneId: "c6-what-remains",
    choices: [],
    storyFacts: {
      sibylOutcome: "alive-estranged",
      basilOutcome: "alive-helping",
      chapterSixOutcome: "secret-kept",
      ...overrides
    }
  });
}

test("resolved player-facing scene text contains no internal stage or runtime terminology", () => {
  const outcomeVariants = [
    stateForFacts({ sibylOutcome: "dead-canonical", basilOutcome: "dead-canonical", chapterSixOutcome: "portrait-destroyed" }),
    stateForFacts({ sibylOutcome: "alive-estranged", basilOutcome: "alive-separated", chapterSixOutcome: "truth-faced" }),
    stateForFacts({ sibylOutcome: "alive-together", basilOutcome: "alive-helping", chapterSixOutcome: "secret-kept" })
  ];
  const choiceVariants = Object.entries(STORY_DATA.scenes).flatMap(([sceneId, scene]) =>
    (scene.choices ?? []).map((choice) => normaliseState({
      ...stateForFacts(),
      choices: [{ sceneId, choiceId: choice.id }]
    }))
  );

  for (const [sceneId, scene] of Object.entries(STORY_DATA.scenes)) {
    for (const state of [...outcomeVariants, ...choiceVariants]) {
      assertNoForbiddenTerms(playerFacingSceneText(scene, state), `scene ${sceneId}`);
    }
  }
});

test("all Chapter II, V and VI ending prose stays player-facing", () => {
  const endings = [
    ["Chapter II", "c2-the-morning-after", ["dead-canonical", "alive-estranged", "alive-together"], "sibylOutcome"],
    ["Chapter V", "c5-after-the-door", ["dead-canonical", "alive-separated", "alive-helping"], "basilOutcome"],
    ["Chapter VI", "c6-what-remains", ["portrait-destroyed", "truth-faced", "secret-kept"], "chapterSixOutcome"]
  ];

  for (const [chapter, sceneId, values, factKey] of endings) {
    const scene = STORY_DATA.scenes[sceneId];
    for (const value of values) {
      const text = playerFacingSceneText(scene, stateForFacts({ [factKey]: value }));
      assertNoForbiddenTerms(text, `${chapter} ${sceneId} (${value})`);
    }
  }
});

test("Must-fix story wording contains no player-facing metatext", () => {
  const chapterFour = resolveSceneParagraphs(STORY_DATA.scenes["c4-face-in-mirror"], stateForFacts()).join(" ");
  const chapterFive = resolveSceneParagraphs(STORY_DATA.scenes["c5-basil-sees"], stateForFacts({ basilOutcome: "alive-helping" })).join(" ");
  const chapterSix = resolveSceneParagraphs(STORY_DATA.scenes["c6-what-remains"], stateForFacts({ chapterSixOutcome: "portrait-destroyed" })).join(" ");

  assert.doesNotMatch(chapterFour, /one click|trigger|milestone/i);
  assert.doesNotMatch(chapterFive, /does not transform because he looked|trigger|milestone/i);
  assert.doesNotMatch(chapterSix, /not described|irreversible consequence/i);
  assert.match(chapterFive, /Basil's gaze only reveals what the portrait has been carrying/i);
  assert.match(chapterSix, /Dorian is dead\./);
});

test("THE END is the final story paragraph for every Chapter VI ending", () => {
  for (const chapterSixOutcome of ["truth-faced", "secret-kept", "portrait-destroyed"]) {
    const text = resolveSceneParagraphs(
      STORY_DATA.scenes["c6-what-remains"],
      stateForFacts({ chapterSixOutcome })
    );
    assert.equal(text.at(-1), "THE END", chapterSixOutcome);
    assert.equal(text.slice(0, -1).includes("THE END"), false, chapterSixOutcome);
  }
});

test("the ordinary portrait panel does not expose its internal numeric stage", () => {
  const uiSource = readFileSync(new URL("../js/ui.js", import.meta.url), "utf8");
  assert.doesNotMatch(uiSource, /portrait-stage[^>]*>Stage\s*\$\{stage\}/i);
  assert.doesNotMatch(uiSource, /portrait-stage[^>]*>Stage\s*[0-6]/i);
});

test("restart wording warns before erasing progress and Chapter I starts available", () => {
  const uiSource = readFileSync(new URL("../js/ui.js", import.meta.url), "utf8");
  assert.match(uiSource, /Start a new game\? Your current progress will be erased\./);
  assert.match(uiSource, /Start a new game/);
  assert.match(uiSource, /chapter\.id === "chapter-1"/);
  assert.match(uiSource, /portraitDisplayState/);
});
