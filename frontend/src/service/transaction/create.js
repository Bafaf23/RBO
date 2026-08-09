import axios from "axios";

/**
 * Guarda una transsacion en la db
 */
export async function create(data) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/transaction`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
}
