import express from "express";
import dotenv from "dotenv";
import { getVersion } from "./api/version.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/api/version", getVersion);

app.use(express.static("src/app/"));

app.listen(PORT, () => {
  console.log(`El puerto esta activo 'http://localhost:${PORT}`);
});
