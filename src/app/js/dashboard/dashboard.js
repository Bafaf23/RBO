import { addTrans } from "../utils/addTrans.js";

let user = JSON.parse(localStorage.getItem("userSession"));

/** funcion control de acceso
 *
 *
 */
(function checkAccess() {
  const pathname = window.location.pathname;

  const isPageLogin = pathname.includes(`login.html`) || pathname.endsWith("/");

  if (!user) {
    if (!isPageLogin) {
      // Si no hay sesión, volver al login
      window.location.href = "../../page/login.html";
    }
  } else {
    //si hay sesion, no ir al login
    if (isPageLogin) {
      window.location.href = "../dashboard.html";
    }
  }
})();

if (!user) throw new Error("No hay sesión activa");

const helloUser = document.getElementById("welcome");
const userDestok = document.getElementById("userDesktop");
const avatar = document.getElementById("avatar");
/* const dolar = document.getElementById("dolar"); */
const typeUser = document.getElementById("isAdmin");
const linkAdmin = document.getElementById("pnAdmi");
const btnPanel = document.getElementById("pcMovil");

//cerrar secion
const logoutBtn = document.getElementById("logoutBtn");
const logoutBtnDes = document.getElementById("logoutBtnDes");

//cerrar seccion movil
if (logoutBtn) {
  logoutBtn.addEventListener(`click`, () => {
    localStorage.removeItem("userSession");
    window.location.href = "login/login.html";
  });
}

//cerrar seccion nav-destoktop
if (logoutBtnDes) {
  logoutBtnDes.addEventListener(`click`, () => {
    localStorage.removeItem("userSession");
    window.location.href = "login/login.html";
  });
}

let nameUser = user.name;

//Saludar al usurio
if (helloUser) helloUser.textContent = `¡Hola!, ${user.name}`;
if (avatar) avatar.textContent = getAvatar(nameUser);
let isAdmin = user.admi;
if (typeUser) {
  if (isAdmin === false) {
    typeUser.style.color = `gray`;
    typeUser.style.fontStyle = `italic`;
    typeUser.innerHTML = `Cliente`;
  } else if (isAdmin === true) {
    typeUser.style.color = `gray`;
    typeUser.style.fontStyle = `italic`;
    typeUser.innerHTML = `Administrador`;
  }
}

if (userDestok) userDestok.textContent = ` ${user.name}`;

/**
 * funcion que crea el avatar con la inicial del nombre del usurio
 *
 * @function @param {*} nameUser
 * @returns {string} inical en mayuscula
 */
export function getAvatar(nameUser) {
  const parts = nameUser.trim().split(``);
  let inicial = "";

  if (parts.length > 0) {
    inicial += parts[0];
  }

  return inicial.toUpperCase();
}

//llamndo a dolarApi para mostar precio del dolar BCV
/* getData("https://ve.dolarapi.com/v1/dolares/oficial").then((data) => {
  renderDolar(data);
}); */

/**
 * funcion para renderisar el precio del dolar
 * @param {object} data
 */
function renderDolar(data) {
  if (data && data.promedio !== undefined) {
    if (dolar) {
      let dolarMoneda = data.promedio;
      dolar.textContent = dolarMoneda;
    }
  } else {
    console.error("Los datos recibidos de la API no son válidos:", data);
  }
}

//Mustra en el nav-desktop el link del panel de control para los Admin
if (linkAdmin) {
  if (!user.admi && linkAdmin) {
    linkAdmin.style.display = `none`;
  }
}
//mustra el btn del panel de control para los Admin en vista moviles
if (btnPanel) {
  if (!user.admi && btnPanel) {
    btnPanel.style.display = `none`;
  }
}

/* modal */
const modal = document.getElementById("miModal");
if (modal) {
  const btnOpenModal = document.getElementById("openModalIngreso");
  const btnOpenModalMovil = document.getElementById("openModalIngresoMovil");
  const btnCloseModal = document.querySelector(".close-btn");

  //btn abril modal movil
  btnOpenModalMovil.addEventListener(`click`, () => {
    modal.style.display = `flex`;
  });

  //btn abril modal desktop
  btnOpenModal.addEventListener(`click`, () => {
    modal.style.display = `flex`;
  });

  //btn Cerrar modal
  btnCloseModal.addEventListener(`click`, () => {
    modal.style.display = `none`;
  });

  //cierra la modal a escuchar un click fuera de la caja
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = `none`;
    }
  };

  const btnGuardar = document.getElementById("ingreso");
  btnGuardar.addEventListener("click", (e) => {
    const data = {
      monto: document.getElementById("monto").value,
      tipo: "ingreso",
      cargo: document.getElementById("cargo").value,
      fecha: document.getElementById("fecha").value,
    };

    addTrans(e, data);
  });
}

//===========================================================================
/* nav movil intereactiva */
//===========================================================================

document.addEventListener(`DOMContentLoaded`, () => {
  // 1. Obtenemos la página actual (manejando el caso de "/" o index)
  const urlActual =
    window.location.pathname.split(`/`).pop() || "dashboard.html";

  const navMovil = document.querySelector(".nav-movil");
  const navDesktop = document.querySelector(".nav-desktop");

  // 2. Solo ejecutamos si navMovil existe
  if (navMovil) {
    const enlacesMovil = navMovil.querySelectorAll(`ul a`);
    enlacesMovil.forEach((enlace) => {
      if (enlace.getAttribute(`href`) === urlActual) {
        enlace.classList.add(
          `bg-white/20`,
          "backdrop-blur-2xl",
          "border",
          "border-white/20",
        );
      }
    });
  }

  // 3. Solo ejecutamos si navDesktop existe
  if (navDesktop) {
    const enlacesDes = navDesktop.querySelectorAll(`ul a`);
    enlacesDes.forEach((enlace) => {
      // Usamos includes por si la ruta tiene parámetros o carpetas
      if (enlace.getAttribute(`href`) === urlActual) {
        enlace.classList.add(`active`);
      }
    });
  }
});
