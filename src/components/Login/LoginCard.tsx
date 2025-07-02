// src/components/auth/LoginCard.tsx
import "@/styles/LoginCard.css";
import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { login } from "@/services/authService.ts";
import { useAuth } from "@/hooks/useAuth.ts";
import {
    Card, CardHeader, CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { isTokenExpired} from "@/utils/token";

const LoginCard = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [keepSession, setKeepSession] = useState(false);
    const { login: setAuthToken } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await login({ email, password });
            if (!res || !res.token) {
                setError("Hubo un error. Intenta de nuevo.");
                setLoading(false);
                return;
            }
            if (isTokenExpired(res.token)) {
                setError("Hubo un error. Intenta de nuevo.");
                setLoading(false);
                return;
            }
            setAuthToken(res.token, keepSession);
            navigate("/dashboard");
        } catch (err) {
            const status = (err && typeof err === 'object' && 'response' in err) ? (err as { response?: { status?: number } }).response?.status : undefined;
            if (status === 401 || status === 400) {
                setError("Credenciales inválidas");
            } else if (status === 500 || status === 503) {
                setError("El servidor no está disponible. Intenta más tarde.");
            } else {
                setError("Hubo un error. Intenta de nuevo.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="register-card">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <CardHeader>
                    <CardTitle className="register-title">Iniciar sesión</CardTitle>
                </CardHeader>
                <Input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="register-input"
                    required
                />
                <div className="relative">
                    <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="register-input pr-12"
                        required
                    />
                    {password && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(prev => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-500 hover:text-primary focus:text-primary focus:outline-none bg-transparent border-none p-0 transition-none shadow-none outline-none"
                            tabIndex={-1}
                            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                            style={{ lineHeight: 0, border: 'none', background: 'transparent', boxShadow: 'none', padding: 0 }}
                        >
                            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </button>
                    )}
                </div>
                {error && <div className="register-error">{error}</div>}
                <button type="submit" className="register-btn" disabled={loading}>
                    {loading ? "Iniciando..." : "Iniciar sesión"}
                </button>
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="keepSession"
                        checked={keepSession}
                        onChange={e => setKeepSession(e.target.checked)}
                        className="accent-orange-500"
                    />
                    <label htmlFor="keepSession" className="text-sm select-none cursor-pointer">Mantener sesión abierta</label>
                </div>
                <div className="register-link flex flex-col gap-1">
                    <Link to="/recovery">¿Olvidaste tu contraseña?</Link>
                    <span>¿No tienes cuenta? <Link to="/register">Regístrate</Link></span>
                </div>
            </form>
        </Card>
    );
};

export default LoginCard;
