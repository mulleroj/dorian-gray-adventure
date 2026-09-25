import { STORY_FACT_KEYS } from "./game-state.js";
import { chapterFourBehaviourProfile } from "./chapter-four-behaviour.js";

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function choiceWasMade(state, choice) {
  return isPlainObject(choice)
    && typeof choice.sceneId === "string"
    && typeof choice.choiceId === "string"
    && state.choices?.some((item) => item.sceneId === choice.sceneId && item.choiceId === choice.choiceId);
}

function storyFactMatches(state, requirement) {
  if (!isPlainObject(requirement) || typeof requirement.key !== "string") return false;
  if (!Object.prototype.hasOwnProperty.call(STORY_FACT_KEYS, requirement.key)) return false;
  return state.storyFacts?.[requirement.key] === requirement.value;
}

export function matchesNarrativeCondition(state = {}, condition = {}) {
  if (!isPlainObject(condition)) return false;

  const checks = [];
  if (typeof condition.flag === "string") {
    checks.push(state.flags?.[condition.flag] === (condition.value ?? true));
  }
  if (condition.choice) checks.push(choiceWasMade(state, condition.choice));
  if (condition.storyFact) checks.push(storyFactMatches(state, condition.storyFact));
  if (condition.minReputation !== undefined) checks.push(state.reputation >= condition.minReputation);
  if (condition.minConscience !== undefined) checks.push(state.conscience >= condition.minConscience);
  if (condition.minPortrait !== undefined) checks.push(state.portrait >= condition.minPortrait);
  if (typeof condition.behaviourProfile === "string") {
    checks.push(chapterFourBehaviourProfile(state) === condition.behaviourProfile);
  }
  if (Array.isArray(condition.all)) checks.push(condition.all.every((item) => matchesNarrativeCondition(state, item)));
  if (Array.isArray(condition.any)) checks.push(condition.any.some((item) => matchesNarrativeCondition(state, item)));
  if (condition.not) checks.push(!matchesNarrativeCondition(state, condition.not));

  return checks.length > 0 && checks.every(Boolean);
}

function normaliseSegment(segment) {
  if (typeof segment === "string") return { text: segment, sensitive: false };
  if (!isPlainObject(segment) || typeof segment.text !== "string") return null;
  return {
    text: segment.text,
    sensitive: segment.sensitive === true,
    when: segment.when
  };
}

export function resolveSceneParagraphs(scene, state = {}, options = {}) {
  if (!scene) return [];
  const skipSensitive = options.skipSensitive === true;
  const base = (scene.paragraphs ?? [])
    .map(normaliseSegment)
    .filter(Boolean)
    .filter((segment) => !segment.when || matchesNarrativeCondition(state, segment.when))
    .filter((segment) => !(skipSensitive && segment.sensitive))
    .map((segment) => segment.text);

  const conditional = (scene.conditionalText ?? [])
    .map(normaliseSegment)
    .filter(Boolean)
    .filter((segment) => matchesNarrativeCondition(state, segment.when))
    .filter((segment) => !(skipSensitive && segment.sensitive))
    .map((segment) => segment.text);

  return [...base, ...conditional];
}

export function contentWarningForScene(scene, state = {}) {
  if (!isPlainObject(scene?.contentWarning)) return null;
  const warning = scene.contentWarning;
  if (typeof warning.title !== "string" || typeof warning.message !== "string") return null;
  if (warning.when && !matchesNarrativeCondition(state, warning.when)) return null;
  return {
    title: warning.title,
    message: warning.message,
    canSkip: warning.canSkip !== false
  };
}

export function contentWarningAction(scene, action, state = {}) {
  const warning = contentWarningForScene(scene, state);
  const allowedActions = ["continue", "skip", "pause"];
  if (!warning || !allowedActions.includes(action)) return { ok: false, reason: "warning-action-not-available" };
  if (action === "skip" && !warning.canSkip) return { ok: false, reason: "warning-skip-not-available" };
  return { ok: true, action };
}
