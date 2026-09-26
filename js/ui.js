import { STORY_DATA } from "./story-data.js";
import { loadState } from "./game-state.js";
import {
  canEnterScene,
  canStartChapter,
  chapterForScene,
  choose,
  continueFromScene,
  continueToChapter,
  getChapter,
  getScene,
  nextChapterAfter,
  startNewGame
} from "./game-engine.js";
import { contentWarningForScene, resolveSceneParagraphs } from "./narrative-resolver.js";
import { portraitViewerModel } from "./portrait-viewer.js";

const app = document.querySelector("#app");
const settingsDialog = document.querySelector("#settings-dialog");
const teacherDialog = document.querySelector("#teacher-dialog");
const teacherContent = document.querySelector("#teacher-content");
const portraitDialog = document.querySelector("#portrait-dialog");
const portraitViewerStage = document.querySelector("#portrait-viewer-stage");
const portraitViewerCaption = document.querySelector("#portrait-viewer-caption");
const footerChapter = document.querySelector("#footer-chapter");
let state = loadState();
let contentWarningState = null;
const dialogReturnFocus = new WeakMap();
const portraitViewerState = { stage: 0, mode: "full", imageFailed: false };

const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
}[character]));

function termsIn(text, terms = []) {
  let output = escapeHtml(text);
  terms.forEach((term) => {
    const escaped = escapeHtml(term);
    const definition = STORY_DATA.glossary[term];
    if (!definition) return;
    output = output.replace(new RegExp(`\\b(${escaped})\\b`, "gi"), `<button class="glossary-term" type="button" data-term="${escaped}">$1</button>`);
  });
  return output;
}

function sceneParagraphs(scene) {
  const skipSensitive = contentWarningState !== null
    && contentWarningState.sceneId === state.sceneId
    && contentWarningState.skipSensitive === true;
  return resolveSceneParagraphs(scene, state, { skipSensitive })
    .map((paragraph) => `<p>${termsIn(paragraph, scene.terms)}</p>`)
    .join("");
}

function valueBar(label, value, detail) {
  const normalized = Math.round(((value + 3) / 6) * 100);
  return `<div class="stat-row"><div class="stat-label"><span>${label}</span><strong>${value > 0 ? "+" : ""}${value}</strong></div><div class="stat-track"><span style="width:${normalized}%"></span></div><small>${detail}</small></div>`;
}

function portraitPlaceholderMarkup(stage) {
  return `<div class="portrait-glow"></div><div class="portrait-head"><span class="portrait-hair"></span><span class="portrait-face"></span><span class="portrait-neck"></span></div><span class="portrait-crack crack-one"></span><span class="portrait-crack crack-two"></span>`;
}

function heroPlaceholderMarkup() {
  return `<span class="portrait-hair"></span><span class="portrait-face"></span><span class="portrait-neck"></span><span class="hero-crack"></span>`;
}

function portraitPanel() {
  const portrait = portraitViewerModel(state);
  const { stage, stageText, asset: portraitAsset } = portrait;
  const portraitVisual = portraitAsset
    ? `<img class="portrait-image" data-portrait-image="true" src="${escapeHtml(portraitAsset)}" alt="Dorian's portrait: ${escapeHtml(stageText)}" />`
    : portraitPlaceholderMarkup(stage);
  return `<aside class="portrait-panel" aria-label="Portrait status">
    <div class="portrait-heading"><span class="eyebrow">The portrait</span><span class="portrait-stage">Stage ${stage}</span></div>
    <button class="portrait-trigger" type="button" data-action="examine-portrait" aria-label="Examine the current portrait: ${escapeHtml(stageText)}">
      <div class="portrait-frame stage-${stage}" data-stage="${stage}" role="img" aria-label="${portraitAsset ? `Dorian's portrait: ${stageText}` : `A CSS placeholder portrait: ${stageText}`}" data-renderer="${portraitAsset ? "image" : "placeholder"}">
        ${portraitVisual}
      </div>
    </button>
    <p class="portrait-caption">${stageText}. The face remains yours. The painting remembers.</p>
  </aside>`;
}

function statePanel() {
  return `<section class="state-panel" aria-labelledby="state-title"><div class="section-heading"><span class="eyebrow">What follows you</span><h2 id="state-title">Your state</h2></div>
    ${valueBar("Reputation", state.reputation, "How society may see you")}
    ${valueBar("Conscience", state.conscience, "How you face your choices")}
    ${valueBar("Portrait", state.portrait, "The pressure inside the image")}
    <button class="subtle-button" type="button" data-action="save">Save progress</button>
  </section>`;
}

function sceneVisualMarkup(scene) {
  const visual = scene.visual;
  if (!visual) return "";
  const chapterAssets = scene.chapterId === "chapter-2"
    ? STORY_DATA.assets?.chapterTwo
    : STORY_DATA.assets?.chapterThree;
  const location = visual.location ? chapterAssets?.locations?.[visual.location] : null;
  const character = visual.character ? chapterAssets?.characters?.[visual.character] : null;
  if (!location && !character) return "";
  const figures = [];
  if (location) {
    figures.push(`<figure class="scene-visual-frame scene-visual-frame-location" data-scene-visual-frame data-renderer="image"><img data-scene-image="true" src="${escapeHtml(location.src)}" alt="${escapeHtml(location.alt)}" loading="lazy" decoding="async" /></figure>`);
  }
  if (character) {
    figures.push(`<figure class="scene-visual-frame scene-visual-frame-character" data-scene-visual-frame data-renderer="image"><img data-scene-image="true" src="${escapeHtml(character.src)}" alt="${escapeHtml(character.alt)}" loading="lazy" decoding="async" /></figure>`);
  }
  const layout = location && character ? "scene-visual-composite" : location ? "scene-visual-location" : "scene-visual-character";
  const chapterLabel = scene.chapterId === "chapter-2"
    ? "Chapter II"
    : scene.chapterId === "chapter-3"
      ? "Chapter III"
      : scene.chapterId === "chapter-5"
        ? "Chapter V"
      : "Chapter IV";
  return `<div class="scene-visual ${layout}" aria-label="${chapterLabel} scene illustration">${figures.join("")}</div>`;
}

function chapterListMarkup(activeChapterId = state?.activeChapterId) {
  const chapters = STORY_DATA.chapters.map((chapter) => {
    const completed = state?.completedChapters?.[chapter.id] === true;
    const active = activeChapterId === chapter.id;
    const canStart = Boolean(state && canStartChapter(state, chapter.id));
    const status = completed
      ? "Completed"
      : active
        ? "In progress"
        : chapter.available === true
          ? canStart ? "Available" : "Locked"
          : "In preparation";
    return `<li class="${active ? "is-active" : ""}"><span>Chapter ${escapeHtml(chapter.number)}</span><strong>${escapeHtml(chapter.title)}</strong><small>${status}</small></li>`;
  }).join("");
  return `<section class="chapter-list" aria-labelledby="chapter-list-title"><p class="eyebrow">Story map</p><h2 id="chapter-list-title">Chapters</h2><ol>${chapters}</ol></section>`;
}

function homeScreen() {
  const chapter = getChapter(state?.activeChapterId) ?? STORY_DATA.chapters[0];
  const heroPortrait = portraitViewerModel(state ?? {});
  const { stage: heroStage, asset: heroAsset } = heroPortrait;
  const heroVisual = heroAsset
    ? `<img class="hero-portrait-image" data-portrait-image="true" src="${escapeHtml(heroAsset)}" alt="" />`
    : heroPlaceholderMarkup();
  const resume = state ? `<button class="button button-primary" type="button" data-action="resume">Continue the story <span aria-hidden="true">→</span></button>` : "";
  return `<section class="home-screen" aria-labelledby="home-title">
    <div class="hero-copy"><p class="eyebrow">An interactive reading adventure · B1 English</p><h1 id="home-title">The Portrait's<br /><em>Secret</em></h1><p class="hero-lead">Your face never changes.<br /><strong>Your portrait remembers everything.</strong></p><p class="hero-description">Step into Oscar Wilde's world of beauty, influence and hidden consequences. Read, decide, and discover what your choices leave behind.</p><div class="hero-actions">${resume}<button class="button ${state ? "button-secondary" : "button-primary"}" type="button" data-action="new-game">${state ? "Start a new chapter" : "Begin Chapter I"} <span aria-hidden="true">→</span></button></div></div>
    <div class="hero-art" aria-hidden="true"><div class="hero-orbit orbit-one"></div><div class="hero-orbit orbit-two"></div><div class="hero-portrait" data-stage="${heroStage}" data-renderer="${heroAsset ? "image" : "placeholder"}">${heroVisual}</div><p>Chapter ${chapter.number}<br /><span>${chapter.title}</span></p></div>
    <div class="home-note"><span class="note-line"></span><span>Every choice changes the story's atmosphere.</span></div>
    ${chapterListMarkup()}
  </section>`;
}

function contentWarningBlock(warning) {
  const skipButton = warning.canSkip
    ? `<button class="button button-secondary" type="button" data-action="continue" data-warning-mode="skip">Skip sensitive description</button>`
    : "";
  return `<section class="choice-block content-warning" aria-labelledby="content-warning-title"><p class="eyebrow">Content note</p><h2 id="content-warning-title">${escapeHtml(warning.title)}</h2><p>${escapeHtml(warning.message)}</p><div class="hero-actions"><button class="button button-primary" type="button" data-action="continue" data-warning-mode="continue">Continue reading</button>${skipButton}<button class="subtle-button" type="button" data-action="home" data-warning-mode="pause">Pause and return to title</button></div></section>`;
}

function gameScreen(scene) {
  const chapter = chapterForScene(scene);
  const isEnding = scene.kind === "ending";
  const warning = contentWarningForScene(scene, state);
  const warningPending = Boolean(warning && (contentWarningState === null || contentWarningState.sceneId !== state.sceneId));
  const storyContent = warningPending ? contentWarningBlock(warning) : `<div class="story-text">${sceneParagraphs(scene)}</div>`;
  const sceneActions = warningPending ? "" : `${scene.kind === "choice" ? choiceBlock(scene) : continueBlock(scene, isEnding)}${isEnding ? summaryBlock() : ""}`;
  return `<section class="game-layout" aria-labelledby="scene-title">
    <div class="story-column"><div class="story-meta"><span>${escapeHtml(scene.eyebrow)}</span><span>${escapeHtml(scene.location)}</span></div><h1 id="scene-title">${escapeHtml(scene.title)}</h1>${sceneVisualMarkup(scene)}${storyContent}${sceneActions}<p class="source-note"><span>Story note</span> ${escapeHtml(scene.sourceNote)}</p></div>
    <div class="side-column">${portraitPanel()}${statePanel()}</div>
  </section>`;
}

function handleWarningAction(warningAction) {
  if (!["continue", "skip", "pause"].includes(warningAction)) return;
  if (warningAction === "pause") {
    contentWarningState = null;
    window.location.hash = "#home";
    render();
    return;
  }
  contentWarningState = { sceneId: state.sceneId, skipSensitive: warningAction === "skip" };
  render();
}

function choiceBlock(scene) {
  return `<section class="choice-block" aria-labelledby="choice-prompt"><p class="decision-label">${escapeHtml(scene.decisionLabel)}</p><h2 id="choice-prompt">${escapeHtml(scene.prompt)}</h2><div class="choice-list">${scene.choices.map((choice, index) => `<button class="choice-card" type="button" data-choice-id="${choice.id}"><span class="choice-number">0${index + 1}</span><span><strong>${escapeHtml(choice.label)}</strong><small>${escapeHtml(choice.description)}</small></span><span class="choice-arrow" aria-hidden="true">→</span></button>`).join("")}</div></section>`;
}

function continueBlock(scene, isEnding) {
  if (isEnding) return "";
  return `<div class="continue-row"><button class="button button-primary" type="button" data-action="continue">Continue <span aria-hidden="true">→</span></button></div>`;
}

function summaryBlock() {
  const reflections = state.choices.map((choice, index) => `<li><span>0${index + 1}</span>${escapeHtml(choice.reflection)}</li>`).join("");
  const nextChapter = nextChapterAfter(state.activeChapterId);
  const nextButton = nextChapter && canStartChapterForUi(nextChapter.id)
    ? `<button class="button button-primary" type="button" data-action="next-chapter" data-chapter-id="${escapeHtml(nextChapter.id)}">Continue to Chapter ${escapeHtml(nextChapter.number)} <span aria-hidden="true">→</span></button>`
    : "";
  return `<section class="summary-block" aria-labelledby="summary-title"><p class="eyebrow">What you leave behind</p><h2 id="summary-title">Your decisions</h2><ol>${reflections || "<li>No decisions recorded yet.</li>"}</ol><div class="hero-actions">${nextButton}<button class="button button-secondary" type="button" data-action="home">Return to title</button></div></section>`;
}

function canStartChapterForUi(chapterId) {
  return Boolean(state && canStartChapter(state, chapterId));
}

function render() {
  updateFooterChapter();
  if (!state || window.location.hash === "#home") {
    app.innerHTML = homeScreen();
    return;
  }
  const scene = getScene(state.sceneId);
  if (!scene || !canEnterScene(state, state.sceneId)) {
    state = null;
    app.innerHTML = homeScreen();
    return;
  }
  app.innerHTML = gameScreen(scene);
  app.focus({ preventScroll: true });
}

function updateFooterChapter() {
  const chapter = getChapter(state?.activeChapterId) ?? STORY_DATA.chapters[0];
  footerChapter.textContent = `Chapter ${chapter.number} · ${chapter.title}`;
}

function showGlossary(term, source) {
  const old = document.querySelector(".glossary-popover");
  old?.remove();
  const definition = STORY_DATA.glossary[term];
  if (!definition) return;
  const popover = document.createElement("span");
  popover.className = "glossary-popover";
  popover.setAttribute("role", "status");
  popover.innerHTML = `<strong>${escapeHtml(term)}</strong><span>${escapeHtml(definition)}</span>`;
  source.insertAdjacentElement("afterend", popover);
}

function teacherMarkup() {
  const activeChapter = getChapter(state?.activeChapterId) ?? STORY_DATA.chapters[0];
  const notes = activeChapter?.teacherNotes;
  if (!notes) {
    return `<p class="eyebrow">Teacher mode</p><h2 id="teacher-title">${escapeHtml(activeChapter?.title ?? "The story")}</h2><p class="modal-intro">Teacher materials for this chapter are not available yet. The chapter remains in preparation.</p>`;
  }
  const sceneList = notes.scenes?.length ? `<div><h3>Scene sequence</h3><ol>${notes.scenes.map((item) => `<li><strong>${escapeHtml(item.title)}</strong><br /><span>${escapeHtml(item.focus)}</span></li>`).join("")}</ol></div>` : "";
  const decisions = notes.decisions?.length ? `<div><h3>Decision map</h3><ul>${notes.decisions.map((item) => "<li>" + escapeHtml(item) + "</li>").join("")}</ul></div>` : "";
  const comprehension = notes.comprehension?.length ? `<div><h3>Comprehension</h3><ul>${notes.comprehension.map((item) => "<li>" + escapeHtml(item) + "</li>").join("")}</ul></div>` : "";
  const distinction = notes.canonAndAlternatives ? `<p class="source-note"><span>Canon and alternatives</span> ${escapeHtml(notes.canonAndAlternatives)}</p>` : "";
  const continuity = notes.continuity ? `<p class="source-note"><span>Chapter II continuity</span> ${escapeHtml(notes.continuity)}</p>` : "";
  const warning = notes.contentWarning ? `<p class="source-note"><span>Content guidance</span> ${escapeHtml(notes.contentWarning)}</p>` : "";
  return `<p class="eyebrow">Teacher mode · Chapter ${escapeHtml(activeChapter.number)}</p><h2 id="teacher-title">${escapeHtml(activeChapter.title)}</h2><p class="modal-intro">${escapeHtml(notes.literaryBasis)}</p><div class="teacher-grid"><div><h3>Learning goals</h3><ul>${notes.goals.map((item) => "<li>" + escapeHtml(item) + "</li>").join("")}</ul></div><div><h3>Target vocabulary</h3><div class="tag-list">${notes.vocabulary.map((item) => "<span>" + escapeHtml(item) + "</span>").join("")}</div></div><div><h3>Discussion</h3><ul>${notes.discussion.map((item) => "<li>" + escapeHtml(item) + "</li>").join("")}</ul></div>${comprehension}${sceneList}${decisions}</div>${distinction}${continuity}${warning}<p class="source-note"><span>Adaptation note</span> ${escapeHtml(notes.adaptation)}</p>`;
}

function openDialog(dialog) {
  dialogReturnFocus.set(dialog, document.activeElement);
  if (dialog === teacherDialog) teacherContent.innerHTML = teacherMarkup();
  dialog.showModal();
  document.body.classList.add("modal-open");
  window.requestAnimationFrame(() => {
    dialog.querySelector("button, input, [tabindex]:not([tabindex='-1'])")?.focus({ preventScroll: true });
  });
}

function closeDialog(dialog) {
  if (dialog?.open) dialog.close();
}

function restoreDialogFocus(dialog) {
  const returnFocus = dialogReturnFocus.get(dialog);
  dialogReturnFocus.delete(dialog);
  if (![...document.querySelectorAll("dialog")].some((candidate) => candidate.open)) {
    document.body.classList.remove("modal-open");
  }
  if (returnFocus instanceof HTMLElement && document.contains(returnFocus)) {
    returnFocus.focus({ preventScroll: true });
  }
}

function portraitViewerFallback() {
  const portrait = portraitViewerModel({ stage: portraitViewerState.stage });
  return `<div class="portrait-viewer-fallback" role="img" aria-label="A CSS placeholder portrait: ${escapeHtml(portrait.stageText)}">${portraitPlaceholderMarkup(portrait.stage)}</div>`;
}

function portraitViewerImage() {
  const portrait = portraitViewerModel({ stage: portraitViewerState.stage });
  const { stageText, asset } = portrait;
  if (!asset || portraitViewerState.imageFailed) return portraitViewerFallback();
  return `<img class="portrait-viewer-image" data-portrait-viewer-image="true" src="${escapeHtml(asset)}" alt="Dorian's portrait: ${escapeHtml(stageText)}" />`;
}

function renderPortraitViewer() {
  const isFace = portraitViewerState.mode === "face";
  portraitViewerStage.className = `portrait-viewer-stage mode-${portraitViewerState.mode}`;
  portraitViewerStage.dataset.stage = String(portraitViewerState.stage);
  portraitViewerStage.innerHTML = `<div class="portrait-viewer-image-shell">${portraitViewerImage()}</div>`;
  portraitViewerCaption.textContent = isFace
    ? "A closer study of Dorian's eyes and mouth, using the same current portrait."
    : "The complete 4:5 portrait, held in its original proportions.";
  document.querySelectorAll("[data-portrait-mode]").forEach((button) => {
    const selected = button.dataset.portraitMode === portraitViewerState.mode;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

function openPortraitViewer() {
  portraitViewerState.stage = portraitViewerModel(state).stage;
  portraitViewerState.mode = "full";
  portraitViewerState.imageFailed = false;
  renderPortraitViewer();
  openDialog(portraitDialog);
}

document.addEventListener("error", (event) => {
  const image = event.target;
  if (image instanceof HTMLImageElement && image.matches("[data-portrait-viewer-image]")) {
    portraitViewerState.imageFailed = true;
    renderPortraitViewer();
    return;
  }
  if (image instanceof HTMLImageElement && image.matches("[data-scene-image]")) {
    const frame = image.closest("[data-scene-visual-frame]");
    if (!frame) return;
    frame.dataset.renderer = "placeholder";
    frame.innerHTML = `<div class="scene-visual-fallback" role="img" aria-label="Illustration unavailable: ${escapeHtml(image.alt)}"></div>`;
    return;
  }
  if (!(image instanceof HTMLImageElement) || !image.matches("[data-portrait-image]")) return;
  const frame = image.closest(".portrait-frame, .hero-portrait");
  if (!frame) return;
  frame.dataset.renderer = "placeholder";
  frame.innerHTML = frame.classList.contains("portrait-frame")
    ? portraitPlaceholderMarkup(Number(frame.dataset.stage ?? 0))
    : heroPlaceholderMarkup();
}, true);

document.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.term) {
    showGlossary(button.dataset.term, button);
    return;
  }
  const choiceId = button.dataset.choiceId;
  if (choiceId) {
    const result = choose(state, state.sceneId, choiceId);
    if (result.ok) {
      state = result.state;
      contentWarningState = null;
      window.location.hash = `#scene/${state.sceneId}`;
      render();
    }
    return;
  }
  const warningMode = button.getAttribute("data-warning-mode");
  if (warningMode) {
    handleWarningAction(warningMode);
    return;
  }
  const action = button.dataset.action;
  if (action === "examine-portrait") {
    openPortraitViewer();
  } else if (action === "new-game") {
    state = startNewGame();
    contentWarningState = null;
    window.location.hash = `#scene/${state.sceneId}`;
    render();
  } else if (action === "resume") {
    window.location.hash = `#scene/${state.sceneId}`;
    render();
  } else if (action === "continue") {
    const result = continueFromScene(state, state.sceneId);
    if (result.ok) {
      state = result.state;
      contentWarningState = null;
      window.location.hash = `#scene/${state.sceneId}`;
      render();
    }
  } else if (action === "next-chapter") {
    const result = continueToChapter(state, button.dataset.chapterId);
    if (result.ok) {
      state = result.state;
      contentWarningState = null;
      window.location.hash = `#scene/${state.sceneId}`;
      render();
    }
  } else if (action === "home") {
    window.location.hash = "#home";
    render();
  } else if (action === "save") {
    const notice = document.createElement("div");
    notice.className = "save-notice";
    notice.textContent = "Progress saved on this device.";
    document.body.append(notice);
    window.setTimeout(() => notice.remove(), 2200);
  }
});

document.querySelector("#settings-button").addEventListener("click", () => openDialog(settingsDialog));
document.querySelector("#teacher-mode-button").addEventListener("click", () => openDialog(teacherDialog));
document.querySelector("#reduce-motion-toggle").addEventListener("change", (event) => {
  document.documentElement.classList.toggle("reduce-motion", event.target.checked);
  localStorage.setItem("dorian-gray-reduce-motion", event.target.checked ? "true" : "false");
});
document.querySelectorAll("[data-close-dialog]").forEach((button) => button.addEventListener("click", () => {
  const dialog = document.getElementById(button.dataset.closeDialog);
  closeDialog(dialog);
}));
document.querySelectorAll("[data-portrait-mode]").forEach((button) => button.addEventListener("click", () => {
  portraitViewerState.mode = button.dataset.portraitMode;
  renderPortraitViewer();
}));
document.querySelectorAll("dialog").forEach((dialog) => dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closeDialog(dialog);
}));
document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("close", () => restoreDialogFocus(dialog));
  dialog.addEventListener("keydown", (event) => {
    if (!dialog.open) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeDialog(dialog);
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = [...dialog.querySelectorAll("button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex='-1'])")]
      .filter((element) => element instanceof HTMLElement && element.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
});
window.addEventListener("hashchange", render);

if (localStorage.getItem("dorian-gray-reduce-motion") === "true") {
  document.documentElement.classList.add("reduce-motion");
  document.querySelector("#reduce-motion-toggle").checked = true;
}

render();
