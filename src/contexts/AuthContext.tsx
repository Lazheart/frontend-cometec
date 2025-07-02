import { createContext, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, setToken as storeToken, removeToken, refreshCookieToken } from "@/utils/token";

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    login: (token: string, persist?: boolean) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = () => {
            const storedToken = getToken();
            if (storedToken) {
                refreshCookieToken();
            }
        };
        checkToken();
        // Escuchar cambios de almacenamiento (por si otro tab hace logout/login)
        window.addEventListener('storage', checkToken);
        return () => window.removeEventListener('storage', checkToken);
    }, []);

    // El token siempre se obtiene de la cookie en cada render
    const token = getToken();
    const isAuthenticated = !!token;

    const login = (newToken: string, persist: boolean = true) => {
        storeToken(newToken, persist);
        // No es necesario setToken, el contexto se re-renderiza automáticamente
        if (persist) refreshCookieToken();
    };

    const logout = () => {
        removeToken();
        navigate("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                token,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
