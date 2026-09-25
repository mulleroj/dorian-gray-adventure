import { STORY_DATA } from "./story-data.js";
import { createInitialState, saveState, STORY_FACT_DEFAULTS, STORY_FACT_KEYS } from "./game-state.js";

function sceneFor(sceneId) {
  return STORY_DATA.scenes[sceneId] ?? null;
}

export function getScene(sceneId) {
  return sceneFor(sceneId);
}

export function getChapter(chapterId) {
  return STORY_DATA.chapters.find((chapter) => chapter.id === chapterId) ?? null;
}

export function chapterForScene(scene) {
  return getChapter(scene?.chapterId) ?? STORY_DATA.chapters[0] ?? null;
}

export function getChapterStart(chapterId) {
  const chapter = getChapter(chapterId);
  return chapter?.available === true && typeof chapter.firstScene === "string"
    ? chapter.firstScene
    : null;
}

export function isChapterAvailable(chapterId) {
  return Boolean(getChapterStart(chapterId));
}

export function isChapterComplete(state = {}, chapterId = state.activeChapterId) {
  return state.completedChapters?.[chapterId] === true;
}

function storyFactsAreResolved(state = {}, requiredFacts = []) {
  return requiredFacts.every((key) => (
    Object.prototype.hasOwnProperty.call(STORY_FACT_KEYS, key)
    && state.storyFacts?.[key] !== null
    && state.storyFacts?.[key] !== undefined
  ));
}

export function chapterRequirementsMet(state = {}, chapter = null) {
  if (!chapter) return false;
  return (chapter.requiresCompletedChapters ?? []).every((requiredId) => isChapterComplete(state, requiredId))
    && storyFactsAreResolved(state, chapter.requiresStoryFacts ?? []);
}

export function nextChapterAfter(chapterId) {
  const index = STORY_DATA.chapters.findIndex((chapter) => chapter.id === chapterId);
  return index >= 0 ? STORY_DATA.chapters[index + 1] ?? null : null;
}

export function canStartChapter(state = {}, chapterId) {
  const chapter = getChapter(chapterId);
  if (!chapter || !isChapterAvailable(chapterId) || isChapterComplete(state, chapterId)) return false;
  return chapterRequirementsMet(state, chapter);
}

export function continueToChapter(state, chapterId) {
  const firstScene = getChapterStart(chapterId);
  if (!firstScene) return { ok: false, reason: "chapter-unavailable" };
  if (!canStartChapter(state, chapterId)) return { ok: false, reason: "chapter-locked" };
  const entered = enterScene(state, firstScene);
  return entered ? { ok: true, state: entered } : { ok: false, reason: "chapter-start-locked" };
}

export function meetsRequirements(state = {}, requirements = {}) {
  if (requirements.flags?.some((flag) => !state.flags?.[flag])) return false;
  if (requirements.minReputation !== undefined && state.reputation < requirements.minReputation) return false;
  if (requirements.minConscience !== undefined && state.conscience < requirements.minConscience) return false;
  if (requirements.minPortrait !== undefined && state.portrait < requirements.minPortrait) return false;
  if (requirements.resolvedStoryFacts && !storyFactsAreResolved(state, requirements.resolvedStoryFacts)) return false;
  if (requirements.storyFacts !== undefined) {
    if (requirements.storyFacts === null || typeof requirements.storyFacts !== "object" || Array.isArray(requirements.storyFacts)) return false;
    for (const [key, value] of Object.entries(requirements.storyFacts)) {
      if (!Object.prototype.hasOwnProperty.call(STORY_FACT_KEYS, key) || state.storyFacts?.[key] !== value) return false;
    }
  }
  return true;
}

export function canEnterScene(state, sceneId) {
  const scene = sceneFor(sceneId);
  const chapter = chapterForScene(scene);
  return Boolean(scene && chapter?.available === true && chapterRequirementsMet(state, chapter) && meetsRequirements(state, scene.requires));
}

function clamp(value, min = -3, max = 3) {
  return Math.max(min, Math.min(max, value));
}

export function applyEffects(state, effects = {}) {
  const storyFacts = { ...(state.storyFacts ?? STORY_FACT_DEFAULTS) };
  for (const [key, allowedValues] of Object.entries(STORY_FACT_KEYS)) {
    if (allowedValues.includes(effects.storyFacts?.[key])) storyFacts[key] = effects.storyFacts[key];
  }
  const next = {
    ...state,
    reputation: clamp(state.reputation + (effects.reputation ?? 0)),
    conscience: clamp(state.conscience + (effects.conscience ?? 0)),
    portrait: clamp(state.portrait + (effects.portrait ?? 0), 0, 3),
    flags: { ...state.flags, ...(effects.flags ?? {}) },
    storyFacts
  };
  return next;
}

function choiceWasMade(state, sceneId, choiceId) {
  return state.choices?.some((choice) => choice.sceneId === sceneId && choice.choiceId === choiceId) === true;
}

export function resolveChapterTwoOutcome(state) {
  const roleFirst = choiceWasMade(state, "c2-prince-charming", "admire-the-roles")
    && choiceWasMade(state, "c2-tell-basil-henry", "tell-beautiful-story")
    && choiceWasMade(state, "c2-offstage-sibyl", "stay-inside-the-dream");
  const personFirst = choiceWasMade(state, "c2-prince-charming", "ask-about-sibyl")
    && (choiceWasMade(state, "c2-tell-basil-henry", "defend-the-person")
      || choiceWasMade(state, "c2-offstage-sibyl", "listen-to-her-life"));
  const relationship = roleFirst ? "role-first" : personFirst ? "person-first" : "mixed";
  const finalResponse = state.storyFacts?.c2FinalResponse;
  const outcome = relationship === "role-first" && finalResponse === "cruel"
    ? "dead-canonical"
    : relationship === "person-first" && finalResponse === "listen" && state.flags?.c2RespectfulPromise === true
      ? "alive-together"
      : "alive-estranged";
  return {
    ...state,
    storyFacts: {
      ...(state.storyFacts ?? STORY_FACT_DEFAULTS),
      sibylRelationship: relationship,
      sibylOutcome: outcome
    }
  };
}

export function startNewGame(chapterId = "chapter-1") {
  const firstScene = getChapterStart(chapterId);
  const chapter = getChapter(chapterId);
  if (!firstScene || chapter?.requiresCompletedChapters?.length) return null;
  return saveState(createInitialState(firstScene, chapterId));
}

export function enterScene(state, sceneId) {
  if (!canEnterScene(state, sceneId)) return null;
  const visitedScenes = state.visitedScenes.includes(sceneId)
    ? state.visitedScenes
    : [...state.visitedScenes, sceneId];
  const scene = sceneFor(sceneId);
  const chapterId = scene.chapterId;
  const completedChapters = { ...state.completedChapters };
  const isEnding = scene.kind === "ending";
  if (isEnding) completedChapters[chapterId] = true;

  let nextState = {
    ...state,
    sceneId,
    activeChapterId: chapterId,
    visitedScenes,
    completedChapters,
    chapterComplete: isEnding
  };
  if (sceneId === "c2-the-morning-after") nextState = resolveChapterTwoOutcome(nextState);
  return saveState(nextState);
}

export function choose(state, sceneId, choiceId) {
  const scene = sceneFor(sceneId);
  const choice = scene?.choices?.find((candidate) => candidate.id === choiceId);
  if (!choice || !meetsRequirements(state, choice.requires)) return { ok: false, reason: "choice-not-available" };

  let next = applyEffects(state, choice.effects);
  next = {
    ...next,
    choices: [...next.choices, { sceneId, choiceId, reflection: choice.reflection }]
  };

  if (choice.nextScene) {
    const entered = enterScene(next, choice.nextScene);
    if (!entered) return { ok: false, reason: "next-scene-locked" };
    next = entered;
  }

  return { ok: true, state: next, choice };
}

export function continueFromScene(state, sceneId) {
  const scene = sceneFor(sceneId);
  if (!scene?.nextScene) {
    const chapterId = scene?.chapterId ?? state.activeChapterId;
    return {
      ok: true,
      state: saveState({
        ...state,
        activeChapterId: chapterId,
        completedChapters: { ...state.completedChapters, [chapterId]: true },
        chapterComplete: true
      })
    };
  }
  const entered = enterScene(state, scene.nextScene);
  return entered ? { ok: true, state: entered } : { ok: false, reason: "next-scene-locked" };
}

export function portraitStageForValue(portraitValue = 0) {
  if (portraitValue >= 2) return 2;
  if (portraitValue >= 1) return 1;
  return 0;
}

export function portraitStage(state = {}) {
  if (state.storyFacts?.portraitStageUnlock === "stage-3") return 3;
  return portraitStageForValue(state.portrait);
}
