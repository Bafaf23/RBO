import { mesassege } from "../register/register.js";
import { hashPassaword } from "../hash/hash.js";
import { validacionInput, emailPattern } from "../regex/regex.js";

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
      return mesassege(`Los campos no pueden estar vacios`, `Campos vacios`);
    }

    //buscando al usurio por el emal
    const user = userData.find((u) => u.email === emial);

    if (!validacionInput(emial, emailPattern)) {
      mesassege(`Formato de correo invalido`, `Correo`);
    }

    //comoprovaciones
    if (!user) return mesassege(`El usuario no esta registrado`, `Registrate`);

    if (user && user.passwod === passawordSegura) {
      localStorage.setItem("userSession", JSON.stringify(user));
      setTimeout(() => {
        window.location.href = `../dashboard.html`;
      }, 2000);
    } else {
      mesassege(`Usuario o contrasena errada`, `Error de acceso`);
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
