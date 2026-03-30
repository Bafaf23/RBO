window.addEventListener("scroll", () => {
  const nav = document.getElementById("nav");

  if (window.scrollY > 50) {
    nav.classList.add(
      "bg-white/60",
      "backdrop-blur-md",
      "shadow-2xl",
      "border-b",
      "border-white/10"
    );
  } else {
    nav.classList.remove(
      "bg-white/60",
      "backdrop-blur-md",
      "shadow-2xl",
      "border-b",
      "border-white/10"
    );
    nav.classList.add("bg-transparent", "shadow-no");
  }
});

console.log("archivo conectado");
