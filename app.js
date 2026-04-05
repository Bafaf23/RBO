import express from "express";
import dotenv from "dotenv";
import { getVersion } from "./api/version.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/api/version", getVersion);

app.use(express.static("src/app/"));

if (process.env.NODE_ENV === "development") {
  console.log("🛠️ Modo desarrollo: Mostrando errores detallados en consola.");
} else {
  console.log("🌐 Modo producción: Errores ocultos por seguridad.");
}

app.listen(PORT, () => {
  console.log(`El puerto esta activo 'http://localhost:${PORT}`);
});
