import axios from "axios";
/**
 * Serviocio de registrp de cuenta
 * @param User - Objeto de Usuario
 */
export async function register(user) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user`,
      user,
    );
    return response.data;
  } catch (e) {
    console.error("Error al crear el usuario:", e);
    return e.response.data;
  }
}
