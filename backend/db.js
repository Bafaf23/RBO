import mongoose from "mongoose";

let isConect = false;

export async function conectDB() {
  if (isConect) {
    console.log("Ya exite una coneccion establecida");
    return mongoose.connection;
  }

  try {
    const uri = process.env.MONGODB_URI;

    await mongoose.connect(uri);

    isConect = true;
    console.log("Coneccion establecida");
  } catch (e) {
    throw console.error(e);
  }
}

export async function disconectDB() {
  if (!isConect) {
    console.log("No hay una coneccion para cerrar");
    return;
  }

  try {
    await mongoose.disconnect;
    isConect = false;
    console.log("Desconecion exitosa!");
  } catch (e) {
    throw console.log(e);
  }
}
