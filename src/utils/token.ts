import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const TOKEN_KEY = "token";
const SESSION_TOKEN_KEY = "session_token";
const COOKIE_TOKEN_KEY = "auth_token";
const COOKIE_EXPIRE_HOURS = 3;

export const setToken = (token: string, persist: boolean = true) => {
    if (persist) {
        // Guardar en cookie con expiración de 3 horas
        Cookies.set(COOKIE_TOKEN_KEY, token, {
            expires: COOKIE_EXPIRE_HOURS / 24, // en días
            sameSite: 'strict',
            secure: true
        });
        localStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem(SESSION_TOKEN_KEY);
        // Mensaje de consola para depuración
        console.log("[TOKEN] Cookie guardada:", Cookies.get(COOKIE_TOKEN_KEY));
    } else {
        sessionStorage.setItem(SESSION_TOKEN_KEY, token);
        localStorage.removeItem(TOKEN_KEY);
        // No eliminar la cookie aquí
        console.log("[TOKEN] Token guardado solo en sessionStorage");
    }
};

export const getToken = (): string | null => {
    // Prioridad: cookie > localStorage > sessionStorage
    const cookieToken = Cookies.get(COOKIE_TOKEN_KEY);
    if (cookieToken) return cookieToken;
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(SESSION_TOKEN_KEY);
};

// Elimina la cookie solo en logout o cuando la sesión expira explícitamente
export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(SESSION_TOKEN_KEY);
    Cookies.remove(COOKIE_TOKEN_KEY);
};

export const refreshCookieToken = () => {
    const token = Cookies.get(COOKIE_TOKEN_KEY);
    if (token) {
        Cookies.set(COOKIE_TOKEN_KEY, token, {
            expires: COOKIE_EXPIRE_HOURS / 24,
            sameSite: 'strict',
            secure: true
        });
    }
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

export const isTokenExpired = (token: string): boolean => {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
};
