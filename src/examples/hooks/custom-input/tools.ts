export const runFade = (id: string) => {
  document.getElementById(id)?.classList.add("fadeBorderRed");
  setTimeout(() => document.getElementById(id)?.classList.remove("fadeBorderRed"), 1000);
}

export const runFadeField = (id: string) => {
  document.getElementById(id)?.classList.add("fieldFadeBorderRed");
  setTimeout(() => document.getElementById(id)?.classList.remove("fieldFadeBorderRed"), 1000);
}