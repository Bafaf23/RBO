window.addEventListener(`load`, () => {
  const loader = document.getElementById("loader");
  const appContent = document.getElementById("appContent");

  loader.classList.add("opacity-0");
  appContent.classList.remove("invisible");

  setTimeout(() => {
    loader.remove();
  }, 500);
});
