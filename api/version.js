/**
 * Retorna la versión actual de la aplicación desde las variables de entorno.
 * * @param {import('express').Request} req - Objeto de petición de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {void}
 */
export const getVersion = (req, res) => {
  console.log("Petición recibida en la API");
  res.json({
    version: process.env.APP_VERSION || "1.0.0",
    status: "online",
    environment: process.env.NODE_ENV || "development",
  });
};
