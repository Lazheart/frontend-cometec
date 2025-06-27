// src/components/auth/LoginCard.tsx
import "@/styles/LoginCard.css";
import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { login } from "@/services/authService.ts";
import { useAuth } from "@/hooks/useAuth.ts";
import { Button } from "../ui/button";
import {
    Card, CardContent, CardFooter, CardHeader, CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { isTokenExpired} from "@/utils/token";

const LoginCard = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { login: setAuthToken } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Enviar la contraseña tal cual, sin firmar con JWT
            const res = await login({ email, password });
            if (isTokenExpired(res.token)) {
                alert("El token ha expirado. Por favor, inicia sesión de nuevo.");
                return;
            }
            setAuthToken(res.token);
            // Si necesitas datos del usuario:
            // const userData = jwtDecode(res.token);
            navigate("/dashboard");
        } catch (err) {
            console.error("Error al iniciar sesión:", err);
            alert("Credenciales inválidas");
        }
    };

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="flexCenter paddings innerWidth"> <h2>Iniciar sesión en ComeTec</h2> </CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="paddings flexStart">Correo</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="correo@ejemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="paddings flexCenter rounded-md p-2 border-2"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password" className="paddings flexStart">Contraseña</Label>
                            <div className="flex items-center relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="paddings flexStart rounded-tr-2xl pr-10"
                                />
                                {password && (
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-xl text-gray-500 hover:text-primary focus:text-primary focus:outline-none bg-transparent border-none p-0"
                                        tabIndex={-1}
                                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                        style={{ transform: 'none', transition: 'none' }}
                                    >
                                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                    </button>
                                )}
                            </div>

                        </div>
                        <div className="flexCenter gap-2">
                            <Button type="submit" className="b-submit LoginCard-btn">
                                Iniciar sesión
                            </Button>
                        </div>

                    </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center innerWidth gap paddings mt-6">
                    <Link to="/recovery" className="hover:underline LoginCard-btn text-left">Recuperar Cuenta</Link>
                    <Link to="/register" className="hover:underline LoginCard-btn text-right">Registrate</Link>
                </CardFooter>
            </form>
        </Card>
    );
};

export default LoginCard;
