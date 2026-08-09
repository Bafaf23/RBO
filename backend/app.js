import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./src/router/user.route.js";
import authRouter from "./src/router/auth.route.js";
import transactionRouter from "./src/router/transaction.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.get("/", (_req, res) => {
  res.json({
    name: "Backend rbo",
    version: "1.0.0",
  });
});

// rutas
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/transaction", transactionRouter);

if (process.env.NODE_ENV === "dev") {
  console.log("🛠️ Modo desarrollo: Mostrando errores detallados en consola.");
} else {
  console.log("🌐 Modo producción: Errores ocultos por seguridad.");
}

app.listen(PORT, () => {
  console.log(`El puerto esta activo 'http://localhost:${PORT}`);
});
