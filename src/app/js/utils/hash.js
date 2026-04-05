/**
 * Genera un hash SHA-256 a partir de una cadena de texto (password).
 * Útil para comparar credenciales sin almacenar texto plano.
 *
 * @param {string} password - La contraseña en texto plano.
 * @returns {Promise<string>} El hash en formato hexadecimal.
 */

export async function hashPassaword(passwod) {
  const encoder = new TextEncoder();
  const data = encoder.encode(passwod);

  // Genera el hash usando el algoritmo SHA-256
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Convierte el resultado a un string hexadecimal para guardarlo
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
