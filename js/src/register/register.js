/* accediendo a los elementos el DOM */
const contentAlert = document.getElementById("alert");
const register = document.getElementById("register");

export function mesassege(mensaje, titel) {
  let alert = document.createElement("div");
  alert.innerHTML = `<div class="alert animate__animated animate__fadeInLeft">
        <div class="ico">
          <i class="fa-solid fa-triangle-exclamation"></i>
        </div>
        <div class="info-alert">
          <div>${titel}</div>
          <div>
            ${mensaje}
          </div>
        </div>
      </div>`;

  contentAlert.appendChild(alert);

  setTimeout(() => {
    alert.remove();
  }, 4000);
}

/* aray donde amacenaremos a los usuarios */
let registerData = JSON.parse(localStorage.getItem("dataUsers")) || [];

if (register) {
  register.addEventListener(`click`, (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("nameRegister");
    const lastName = document.getElementById("lastNameRegister");
    const email = document.getElementById("emailRegister");
    const passwod = document.getElementById("passwordRegister");

    const newUser = {
      id: Date.now(),
      name: nameInput.value.trim(),
      lastName: lastName.value.trim(),
      email: email.value.trim(),
      passwod: passwod.value.trim(),
      admi: false,
    };

    if (
      newUser.name === "" ||
      newUser.lastName === "" ||
      newUser.email === "" ||
      newUser.passwod === ""
    ) {
      return mesassege(`los campos no pueden estar vacios`, `Campos vacios`);
    }

    const exiteEmial = registerData.some(
      (usuario) => usuario.email === newUser.email
    );

    if (exiteEmial)
      return mesassege(
        `El correo electronico ya esta registrado`,
        `Campos duplicados`
      );

    registerData.push(newUser);

    console.log(`Registro exitiso`, registerData);
    localStorage.setItem("dataUsers", JSON.stringify(registerData));

    nameInput.value = "";
    lastName.value = "";
    email.value = "";
    passwod.value = "";

    mesassege(`Ya puedes usar el servicio`, `Registro Exitoso`);
  });
}
