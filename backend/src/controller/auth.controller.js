/*
 * Controlodaor de inicio de secion y cierre de la misma
 */
import { User } from "../model/User.model.js";
import { conectDB, disconectDB } from "../../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, pass } = req.body;

  if (!email || !pass) {
    return res.status(400).json({
      success: false,
      message: "Por favor, ingresa el correo y la contraseña.",
    });
  }

  try {
    await conectDB();

    const user = await User.findOne({ email });

    if (!user) {
      console.log("Cuenta no registrada");
      return res.status(404).json({
        success: false,
        message: "Parece que aún no tienes cuenta, regístrate.",
      });
    }

    const isPasswordValid = await bcrypt.compare(pass, user.pass);

    if (!isPasswordValid) {
      console.log("Usuario o contraseña incorrectos");
      return res.status(400).json({
        success: false,
        message:
          "Alguno de los datos ingresados es incorrecto, verifícalos e inténtalo de nuevo.",
      });
    }

    console.log(`Generando token de inicio de sesion...`);

    const token = jwt.sign(
      {
        userName: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
    });

  } catch (e) {
    console.error(e);
  } finally {
    await disconectDB();
  }
};
