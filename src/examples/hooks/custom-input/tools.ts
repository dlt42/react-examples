export const runFade = (name: string) => {
  const elem = document.getElementById(name);
  elem?.classList.add("fadeBorder");
  setTimeout(() => {
    const elem = document.getElementById(name);
    elem?.classList.remove("fadeBorder");
  }, 1000);
}