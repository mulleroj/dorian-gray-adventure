import { STORY_DATA } from "./story-data.js";
import { portraitStage } from "./game-engine.js";

const STAGE_TEXT = [
  "Untouched surface",
  "A troubling detail",
  "The painted warning",
  "The first visible change",
  "The established damage"
];

export function portraitStageText(stage) {
  return STAGE_TEXT[stage] ?? STAGE_TEXT[0];
}

export function portraitAssetForStage(stage) {
  const asset = STORY_DATA.assets?.portraitStages?.[stage];
  return typeof asset === "string" && asset.trim() ? asset : null;
}

export function portraitViewerModel(state = {}) {
  const stage = Number.isInteger(state.stage) ? state.stage : portraitStage(state);
  return {
    stage,
    stageText: portraitStageText(stage),
    asset: portraitAssetForStage(stage)
  };
}
