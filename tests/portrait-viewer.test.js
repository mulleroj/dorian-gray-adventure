import test from "node:test";
import assert from "node:assert/strict";

const { portraitAssetForStage, portraitStageText, portraitViewerModel } = await import("../js/portrait-viewer.js");

test("portrait viewer derives its stage from the current game state", () => {
  assert.deepEqual(portraitViewerModel({ portrait: 0 }), {
    stage: 0,
    stageText: "Untouched surface",
    asset: "assets/portraits/portrait-dorian-stage-0.webp"
  });
  assert.equal(portraitViewerModel({ portrait: 1 }).stage, 1);
  assert.equal(portraitViewerModel({ portrait: 2 }).stage, 2);
  assert.equal(portraitViewerModel({ portrait: 3 }).stage, 2);
});

test("portrait viewer maps the approved Stage 3 asset and handles missing stages", () => {
  assert.equal(portraitAssetForStage(3), "assets/portraits/portrait-dorian-stage-3.webp");
  assert.equal(portraitAssetForStage(99), null);
  assert.equal(portraitStageText(99), "Untouched surface");
  assert.equal(portraitViewerModel({ portrait: 3 }).asset, "assets/portraits/portrait-dorian-stage-2.webp");
});

test("logical Stage 3 uses the approved runtime artwork", () => {
  assert.deepEqual(portraitViewerModel({
    portrait: 0,
    storyFacts: { portraitStageUnlock: "stage-3" }
  }), {
    stage: 3,
    stageText: "The first visible change",
    asset: "assets/portraits/portrait-dorian-stage-3.webp"
  });
});
