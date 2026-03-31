/**
 * Pide la version de la app
 *
 * @param {string} req
 * @param {string} res
 */
export const getVersion = (req, res) => {
  console.log("Petición recibida en la API");
  res.json({
    version: process.env.APP_VERSION || "1.0.0",
  });
};
