const STORAGE_KEY = "dorian-gray-portrait-secret-save-v2";
const LEGACY_STORAGE_KEY = "dorian-gray-portrait-secret-save-v1";
const CURRENT_VERSION = 2;

export const STORY_FACT_KEYS = Object.freeze({
  sibylRelationship: ["role-first", "mixed", "person-first"],
  sibylOutcome: ["dead-canonical", "alive-estranged", "alive-together"],
  c2FinalResponse: ["cruel", "listen", "delay"],
  portraitLocation: ["locked-schoolroom"],
  basilSuspicion: ["uneasy", "suspects", "clear"],
  portraitStageUnlock: ["stage-3", "stage-4", "stage-5", "stage-6"],
  yellowBookResponse: ["accepted", "questioned", "escape"],
  basilOutcome: ["dead-canonical", "alive-separated", "alive-helping"],
  chapterSixOutcome: ["portrait-destroyed", "truth-faced", "secret-kept"]
});

export const STORY_FACT_DEFAULTS = Object.freeze({
  sibylRelationship: null,
  sibylOutcome: null,
  c2FinalResponse: null,
  portraitLocation: null,
  basilSuspicion: null,
  portraitStageUnlock: null,
  yellowBookResponse: null,
  basilOutcome: null,
  chapterSixOutcome: null
});

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function boundedNumber(value, fallback, min, max) {
  return typeof value === "number" && Number.isFinite(value)
    ? Math.max(min, Math.min(max, value))
    : fallback;
}

function normaliseFlags(input) {
  return isPlainObject(input)
    ? Object.fromEntries(Object.entries(input).filter(([key, value]) => key && typeof value === "boolean"))
    : {};
}

function normaliseStoryFacts(input) {
  const facts = { ...STORY_FACT_DEFAULTS };
  if (!isPlainObject(input)) return facts;

  for (const [key, allowedValues] of Object.entries(STORY_FACT_KEYS)) {
    if (allowedValues.includes(input[key])) facts[key] = input[key];
  }
  return facts;
}

function normaliseChoices(input) {
  return Array.isArray(input)
    ? input
      .filter((choice) => isPlainObject(choice) && typeof choice.sceneId === "string" && typeof choice.choiceId === "string")
      .map((choice) => ({
        sceneId: choice.sceneId,
        choiceId: choice.choiceId,
        reflection: typeof choice.reflection === "string" ? choice.reflection : ""
      }))
    : [];
}

function normaliseVisitedScenes(input) {
  return Array.isArray(input)
    ? input.filter((sceneId) => typeof sceneId === "string")
    : [];
}

function normaliseCompletedChapters(input) {
  return isPlainObject(input)
    ? Object.fromEntries(Object.entries(input).filter(([key, value]) => key && typeof value === "boolean"))
    : {};
}

function migrateVersionOne(input, now) {
  const activeChapterId = typeof input.activeChapterId === "string" && input.activeChapterId
    ? input.activeChapterId
    : "chapter-1";
  const completedChapters = normaliseCompletedChapters(input.completedChapters);
  if (input.chapterComplete === true) completedChapters[activeChapterId] = true;

  return {
    version: CURRENT_VERSION,
    sceneId: input.sceneId,
    activeChapterId,
    reputation: boundedNumber(input.reputation, 0, -3, 3),
    conscience: boundedNumber(input.conscience, 0, -3, 3),
    portrait: boundedNumber(input.portrait, 0, 0, 3),
    flags: normaliseFlags(input.flags),
    storyFacts: normaliseStoryFacts(input.storyFacts),
    choices: normaliseChoices(input.choices),
    visitedScenes: normaliseVisitedScenes(input.visitedScenes),
    completedChapters,
    startedAt: typeof input.startedAt === "string" ? input.startedAt : now,
    updatedAt: typeof input.updatedAt === "string" ? input.updatedAt : now,
    chapterComplete: input.chapterComplete === true
  };
}

export function createInitialState(firstScene = "c1-opening", activeChapterId = "chapter-1") {
  const now = new Date().toISOString();
  return {
    version: CURRENT_VERSION,
    sceneId: firstScene,
    activeChapterId,
    reputation: 0,
    conscience: 0,
    portrait: 0,
    flags: {},
    storyFacts: { ...STORY_FACT_DEFAULTS },
    choices: [],
    visitedScenes: [],
    completedChapters: {},
    startedAt: now,
    updatedAt: now,
    chapterComplete: false
  };
}

export function normaliseState(input) {
  if (!isPlainObject(input) || ![1, CURRENT_VERSION].includes(input.version) || typeof input.sceneId !== "string") return null;

  const now = new Date().toISOString();
  if (input.version === 1) return migrateVersionOne(input, now);

  const activeChapterId = typeof input.activeChapterId === "string" && input.activeChapterId
    ? input.activeChapterId
    : "chapter-1";
  const completedChapters = normaliseCompletedChapters(input.completedChapters);
  if (input.chapterComplete === true) completedChapters[activeChapterId] = true;

  return {
    version: CURRENT_VERSION,
    sceneId: input.sceneId,
    activeChapterId,
    reputation: boundedNumber(input.reputation, 0, -3, 3),
    conscience: boundedNumber(input.conscience, 0, -3, 3),
    portrait: boundedNumber(input.portrait, 0, 0, 3),
    flags: normaliseFlags(input.flags),
    storyFacts: normaliseStoryFacts(input.storyFacts),
    choices: normaliseChoices(input.choices),
    visitedScenes: normaliseVisitedScenes(input.visitedScenes),
    completedChapters,
    startedAt: typeof input.startedAt === "string" ? input.startedAt : now,
    updatedAt: typeof input.updatedAt === "string" ? input.updatedAt : now,
    chapterComplete: input.chapterComplete === true
  };
}

export function saveState(state) {
  const next = normaliseState({ ...state, version: CURRENT_VERSION, updatedAt: new Date().toISOString() });
  if (!next) throw new Error("Cannot save an invalid game state");
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

function readStateFromKey(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return normaliseState(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function loadState() {
  return readStateFromKey(STORAGE_KEY) ?? readStateFromKey(LEGACY_STORAGE_KEY);
}

export function clearState() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(LEGACY_STORAGE_KEY);
}

export function hasSavedGame() {
  return Boolean(loadState());
}
