const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener(`click`, () => {
    localStorage.removeItem("userSession");
    window.location.href = "../index.html";
  });
}
