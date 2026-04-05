/**
 * Valida si un valor cumple con un patrón específico (Regex).
 *
 * @param {string|Number} value - El dato ingresado por el usuario.
 * @param {RegExp} regex - La expresión regular para validar.
 * @returns {boolean} True si es válido, false si no cumple.
 */
export function validacionInput(value, regex) {
  return regex.test(value);
}

/**
 * Patrones de expresiones regulares para validaciones de usuario en RBO.
 *
 * @type {{ SOLO_NUMEROS: RegExp, SOLO_LETRAS: RegExp, EMAIL: RegExp, PASS: RegExp }}
 */
export const PATTERNS = {
  SOLO_NUMEROS: /^[0-9]+$/,
  SOLO_LETRAS: /^[a-zA-ZáéíóúñÁÉÍÓÚÑ][a-zA-ZáéíóúñÁÉÍÓÚÑ0-9_]{5,29}$/,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PASS: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};
