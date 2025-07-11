import React, { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "@/services/authService.ts";
import LogoCometec from "../../assets/LogoCometec.webp";
import "../../styles/RegisterCard.css";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";


const RegisterCard = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
        name: "",
        lastname: "",
        phone: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);
        try {
            await register({ ...form, role: "USER" });
            setSuccess(true);
        } catch {
            setError("Error al registrar. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register min-h-screen flex flex-col items-center justify-center">
            <div className="paddings innerWidth flexCenter">
                <div className="w-40 md:w-56 flex justify-center items-center logo-rotate">
                    <Link to="/">
                        <img
                            src={LogoCometec}
                            alt="Logo Cometec"
                            className="w-full h-auto"
                        />
                    </Link>
                </div>
            </div>
            <div className="paddings innerWidth flexCenter">
                <Card className="register-card">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <CardHeader>
                            <CardTitle className="register-title">Registro</CardTitle>
                        </CardHeader>
                        <Input
                            type="text"
                            name="name"
                            placeholder="Nombre"
                            value={form.name}
                            onChange={handleChange}
                            className="register-input"
                            required
                        />
                        <Input
                            type="text"
                            name="lastname"
                            placeholder="Apellido"
                            value={form.lastname}
                            onChange={handleChange}
                            className="register-input"
                            required
                        />
                        <Input
                            type="email"
                            name="email"
                            placeholder="Correo electrónico"
                            value={form.email}
                            onChange={handleChange}
                            className="register-input"
                            required
                        />
                        <Input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={form.password}
                            onChange={handleChange}
                            className="register-input"
                            required
                        />
                        <Input
                            type="tel"
                            name="phone"
                            placeholder="Teléfono"
                            value={form.phone}
                            onChange={handleChange}
                            className="register-input"
                            required
                        />
                        {error && <div className="register-error">{error}</div>}
                        {success && <div className="register-success">¡Registro exitoso!</div>}
                        <button type="submit" className="register-btn" disabled={loading}>
                            {loading ? "Registrando..." : "Registrarse"}
                        </button>
                        <div className="register-link">
                            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};


export default RegisterCard;