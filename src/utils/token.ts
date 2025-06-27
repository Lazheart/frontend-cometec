import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token";

export const setToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

export interface DecodedToken {
    exp: number;
    [key: string]: unknown;
}

export const decodeToken = (token: string): DecodedToken | null => {
    try {
        return jwtDecode(token);
    } catch {
        return null;
    }
};

// NOTA DE SEGURIDAD:
// No uses decodeToken para mostrar datos personales del usuario en el frontend.
// Usa este método solo para verificar expiración de sesión.
// Para obtener datos sensibles, consulta siempre al backend usando el token en el header Authorization.

export const isTokenExpired = (token: string): boolean => {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
};
