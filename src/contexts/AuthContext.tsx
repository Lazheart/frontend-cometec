import { createContext, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, setToken as storeToken, removeToken } from "@/utils/token";

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = getToken();
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const login = (newToken: string) => {
        storeToken(newToken);
        setToken(newToken);
    };

    const logout = () => {
        removeToken();
        setToken(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!token,
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
