import axios from "axios";

/**
 * servico de inico de session
 */
export async function login(dataUser) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      dataUser,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (e) {
    console.error(e);
    return e.response.data;
  }
}
