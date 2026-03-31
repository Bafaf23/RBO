/**
 * Servicio para obtener datos financieros externos.
 *
 * @returns {JSON}  JOSN con el balace del precio BCV del dolar.
 */
export async function getData() {
  try {
    const response = await fetch("https://ve.dolarapi.com/v1/dolares/oficial");
    let data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(`Ops!, algo salio mal`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
