import { hashPassaword } from "../utils/hash.js";
import { validacionInput, PATTERNS } from "../utils/regex.js";
import { showIOSNotification } from "../UI/showIOSNotification.js";

/* accediendo a los elementos el DOM */
const register = document.getElementById("register");

let registerData = JSON.parse(localStorage.getItem("dataUsers")) || [];

if (register) {
  register.addEventListener(`click`, async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("nameRegister");
    const lastName = document.getElementById("lastNameRegister");
    const email = document.getElementById("emailRegister");
    const passwod = document.getElementById("passwordRegister");
    const passConfi = document.getElementById("passwordRegister2");

    let rawPassword = passwod.value.trim();
    let rawLastName = lastName.value.trim();
    let rawEmail = email.value.trim();
    let rawName = nameInput.value.trim();

    if (
      rawPassword === "" ||
      rawLastName === "" ||
      rawEmail === "" ||
      rawName === ""
    ) {
      return showIOSNotification(
        `Opss!`,
        `Los campos no pueden estar vacios`,
        `error`
      );
    }

    if (!validacionInput(rawEmail, PATTERNS.EMAIL)) {
      return showIOSNotification(
        `Opss!`,
        `El formato de la emial no es valido`,
        `warning`
      );
    }
    if (!validacionInput(rawPassword, PATTERNS.PASS)) {
      return showIOSNotification(
        `Opsss!`,
        `La comtraseña no comple con los requisitos`,
        "warning"
      );
    }

    if (passwod !== passConfi)
      return showIOSNotification(
        "Opss!",
        "Verifica la contrasena. No son iguales",
        "info"
      );

    const exiteEmial = registerData.some(
      (usuario) => usuario.email === rawEmail
    );
    if (exiteEmial)
      return showIOSNotification(
        "Este correo ya está registrado.",
        "¿Tal vez querías iniciar sesión?",
        "info"
      );

    let passawordSegura = await hashPassaword(rawPassword);

    const newUser = {
      id: Date.now(),
      name: rawName,
      lastName: rawLastName,
      email: rawEmail,
      passwod: passawordSegura,
      admi: false,
      trans: [],
      saldo: 0,
    };

    registerData.push(newUser);

    console.log(`Registro exitiso`, registerData);
    localStorage.setItem("dataUsers", JSON.stringify(registerData));

    nameInput.value = "";
    lastName.value = "";
    email.value = "";
    passwod.value = "";

    showIOSNotification(
      "¡Bienvenido!",
      "Tu cuenta en REBO ha sido creada con éxito."
    );

    setTimeout(() => {
      window.location.href = `../login/login.html`;
    }, 4000);
  });
}

const btnMostarPass = document.getElementById("mostarPass");

if (btnMostarPass) {
  btnMostarPass.addEventListener(`click`, () => {
    const passInput = document.getElementById("passwordRegister");
    let typeInput = passInput.type;

    if (typeInput === `password`) {
      passInput.type = `text`;
    } else {
      passInput.type = `password`;
    }
  });
}

async function cargarVersionDeLaApp() {
  try {
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
cargarVersionDeLaApp();
