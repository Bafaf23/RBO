import { hashPassaword } from "../hash/hash.js";
import { validacionInput, emailPattern } from "../regex/regex.js";
import { showIOSNotification } from "../UI/showIOSNotification.js";

let userData = JSON.parse(localStorage.getItem("dataUsers")) || [];

const loginbtn = document.getElementById("loginBtn");

if (loginbtn) {
  loginbtn.addEventListener(`click`, async (e) => {
    e.preventDefault();

    const emilInput = document.getElementById("UserEmail");
    const passInput = document.getElementById("pasUser");

    const emial = emilInput.value.trim();
    const pass = passInput.value;

    //comparando la calve del usurio con la encritada almacenada en la base de datos
    const passawordSegura = await hashPassaword(pass);

    //comporvando los campos vacios
    if (emial === `` || pass === ``) {
      return showIOSNotification(
        "Campos vacios",
        "Los campos no pueden estar vacios.",
        "error"
      );
    }

    //buscando al usurio por el emal
    const user = userData.find((u) => u.email === emial);

    if (!validacionInput(emial, emailPattern)) {
      showIOSNotification(
        "Formato",
        "El correo ingresado es incorrecto",
        "error"
      );
    }

    //comoprovaciones
    if (!user)
      return showIOSNotification(
        "Correo registrado",
        "El correo ya esta registrado",
        "info"
      );

    if (user && user.passwod === passawordSegura) {
      localStorage.setItem("userSession", JSON.stringify(user));
      setTimeout(() => {
        window.location.href = `../dashboard.html`;
      }, 2000);
    } else {
      showIOSNotification(
        `Datos errados`,
        `Usuario o contraseña incorrectos.`,
        `error`
      );
    }
  });
}

//Mostar pass
const btnMostarPass = document.getElementById("mostarPass");
btnMostarPass.addEventListener(`click`, () => {
  const passInput = document.getElementById("pasUser");
  let typeInput = passInput.type;

  if (typeInput === `password`) {
    passInput.type = `text`;
  } else {
    passInput.type = `password`;
  }
});

async function cargarVersionDeLaApp() {
  try {
    // ✅ PIDE LA RUTA QUE CREASTE EN EL SERVER.JS
    const response = await fetch("/api/version");
    const data = await response.json();

    const versionSpan = document.getElementById("version");
    if (versionSpan) {
      versionSpan.innerText = `v${data.version}`;
    }
  } catch (err) {
    console.error("Error conectando con el servidor:", err);
  }
}

// Llama a la función al cargar el script
cargarVersionDeLaApp();
