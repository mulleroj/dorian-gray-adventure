export function scrollToSceneStart(root = document) {
  const heading = root.querySelector("#scene-title");
  if (!heading || typeof heading.scrollIntoView !== "function") return false;
  heading.scrollIntoView({ behavior: "auto", block: "start" });
  return true;
}
