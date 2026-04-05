export function backdropDinamic() {
  // Imagenes dinamicas
  const fondos = [
    `https://lagranaldea.com/wp-content/uploads/2021/04/21-04-2021-CCS.jpg`,
    `https://images.unsplash.com/photo-1714594923299-e915b7d71701?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyYWNhc3xlbnwwfHwwfHx8MA%3D%3D`,
    `https://images.pexels.com/photos/4148187/pexels-photo-4148187.jpeg?cs=srgb&dl=pexels-walcouyi-4148187.jpg&fm=jpg`,
    `https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fHww`,
    `https://walpaper.es/wallpaper/2017/04/imagenes-de-paisajes-relajantes.jpg`,
  ];

  let fondoRando = Math.floor(Math.random() * fondos.length);
  const fondoSelct = fondos[fondoRando];
  const loader = document.getElementById("loader");
  const mainContent = document.getElementById("appContent");

  if (!mainContent) return;

  let pantalla = document.getElementById("display");
  pantalla.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${fondoSelct})`;
  pantalla.style.backgroundSize = "cover";
  pantalla.style.backgroundPosition = "center";
  pantalla.style.backgroundRepeat = "no-repeat";
  pantalla.style.backgroundAttachment = "fixed";

  setTimeout(() => {
    if (loader) {
      loader.classList.add("opacity-0");
      if (mainContent) {
        mainContent.classList.remove("invisible");
        mainContent.classList.add("opacity-100");
      }
    }

    if (mainContent) {
      mainContent.classList.remove("invisible");
      mainContent.classList.add("opacity-100"); // Aparece suavemente
    }
  }, 100);

  setTimeout(() => {
    loader.style.display = "none";
  }, 600);
}

backdropDinamic();
