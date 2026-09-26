import { STORY_DATA } from "./story-data.js";
import { portraitStage } from "./game-engine.js";

const STAGE_TEXT = [
  "Untouched surface",
  "A troubling detail",
  "The painted warning",
  "A deeper visible change",
  "The established damage",
  "The witnessed damage",
  "The final evidence"
];

export function portraitStageText(stage) {
  return STAGE_TEXT[stage] ?? STAGE_TEXT[0];
}

export function portraitAssetForStage(stage) {
  const asset = STORY_DATA.assets?.portraitStages?.[stage];
  return typeof asset === "string" && asset.trim() ? asset : null;
}

function portraitDisplayStage(state = {}) {
  const restoredAtEnding = state.activeChapterId === "chapter-6"
    && state.sceneId === "c6-what-remains"
    && state.storyFacts?.chapterSixOutcome === "portrait-destroyed";
  if (restoredAtEnding) return 0;
  return Number.isInteger(state.stage) ? state.stage : portraitStage(state);
}

export function portraitViewerModel(state = {}) {
  const stage = portraitDisplayStage(state);
  return {
    stage,
    stageText: portraitStageText(stage),
    asset: portraitAssetForStage(stage)
  };
}
