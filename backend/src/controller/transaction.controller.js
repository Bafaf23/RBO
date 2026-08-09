import { Transaction } from "../model/Transaction.model.js";
import jwt from "jsonwebtoken";
import { conectDB, disconectDB } from "../../db.js";

export const create = async (req, res) => {
  // Validación básica del body
  if (!req.body || Object.keys(req.body).length === 0) {
    console.log("Sin informacion para continuar");
    return res.status(400).json({
      success: false,
      message: "No se encontro informacion para realizar el registro",
    });
  }

  try {
    await conectDB();
    // Lectura de token
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No hay sesión activa",
      });
    }

    // Decodificar JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id || decoded._id;

    // Crear y guardar documento
    const newTransaction = new Transaction({
      ...req.body,
      userId,
    });

    const savedTransaction = await newTransaction.save();

    console.log("✅ Registro Exitoso en MongoDB ID:", savedTransaction._id);

    // NO llamar a disconectDB() aquí
    return res.status(201).json({
      success: true,
      message: "Registro procesado con éxito",
      data: savedTransaction,
    });
  } catch (e) {
    console.error("❌ Error registrando transacción:", e);
    return res.status(500).json({
      success: false,
      message: "Ocurrió un error intentando registrar la transacción",
      error: e.message,
    });
  } finally {
    await disconectDB();
  }
};
