import "../../styles/RecoveryCard.css"
import { Card, CardTitle } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import React, { useState } from "react";
import { recovery, verifyRecoveryCode, resetPassword } from "@/services/authService.ts";
import { Link} from "react-router-dom";
import LogoCometec from "@/assets/LogoCometec.png";



const RecoveryCard = () => {
    const [form, setForm] = useState({
        email: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: correo, 2: código, 3: nueva pass, 4: éxito
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        if (step === 1) {
            try {
                const res = await recovery(form);
                setSuccess(res.message || "Te enviamos un código de seguridad a tu correo.");
                setStep(2);
            } catch {
                setError("Error al recuperar la cuenta. Intenta de nuevo.");
            } finally {
                setLoading(false);
            }
        } else if (step === 2) {
            if (!code) {
                setError("Ingresa el código de seguridad.");
                setLoading(false);
                return;
            }
            try {
                const res = await verifyRecoveryCode(form.email, code);
                setSuccess(res.message || "Código verificado correctamente.");
                setStep(3);
            } catch {
                setError("El código es incorrecto o expiró.");
            } finally {
                setLoading(false);
            }
        } else if (step === 3) {
            if (!newPassword || !confirmPassword) {
                setError("Completa todos los campos.");
                setLoading(false);
                return;
            }
            if (newPassword !== confirmPassword) {
                setError("Las contraseñas no coinciden.");
                setLoading(false);
                return;
            }
            try {
                const res = await resetPassword(form.email, code, newPassword);
                setSuccess(res.message);
                setStep(4);
            } catch {
                setError("Error al cambiar la contraseña. Intenta de nuevo.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="recovery-card-container flex justify-center items-center min-h-screen">
            <Card className="register-card recovery-card bg-white shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <CardTitle className="register-title flex-1 text-left">Recuperar contraseña</CardTitle>
                    <Link to="/" className="ml-2">
                        <img src={LogoCometec} alt="Logo Cometec" className="w-12 h-12" />
                    </Link>
                </div>
                <div className="mb-2 text-gray-500 text-sm text-center">
                    {step === 1 && "Ingresa tu correo electrónico para recuperar tu cuenta"}
                    {step === 2 && "Ingresa el código de seguridad enviado a tu correo"}
                    {step === 3 && "Ingresa tu nueva contraseña"}
                    {step === 4 && "¡Listo!"}
                </div>
                {step === 1 && (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <Input
                            type="email"
                            name="email"
                            placeholder="Correo electrónico"
                            value={form.email}
                            onChange={handleChange}
                            className="register-input"
                            required
                        />
                        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                        {success && <div className="text-green-600 text-sm text-center">{success}</div>}
                        <button
                            type="submit"
                            className="register-btn mt-2"
                            disabled={loading}
                        >
                            {loading ? "Enviando..." : "Enviar código"}
                        </button>
                    </form>
                )}
                {step === 2 && (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <Input
                            type="text"
                            name="code"
                            placeholder="Código de seguridad"
                            value={code}
                            onChange={e => setCode(e.target.value)}
                            className="register-input"
                            required
                        />
                        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                        {success && <div className="text-green-600 text-sm text-center">{success}</div>}
                        <button
                            type="submit"
                            className="register-btn mt-2"
                            disabled={loading}
                        >
                            {loading ? "Verificando..." : "Verificar código"}
                        </button>
                    </form>
                )}
                {step === 3 && (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <Input
                            type="password"
                            name="newPassword"
                            placeholder="Nueva contraseña"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            className="register-input"
                            required
                        />
                        <Input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirmar contraseña"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            className="register-input"
                            required
                        />
                        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                        {success && <div className="text-green-600 text-sm text-center">{success}</div>}
                        <button
                            type="submit"
                            className="register-btn mt-2"
                            disabled={loading}
                        >
                            {loading ? "Cambiando..." : "Cambiar contraseña"}
                        </button>
                    </form>
                )}
                {step === 4 && (
                    <div className="flex flex-col items-center gap-4">
                        <div className="text-green-600 text-lg font-semibold">¡Contraseña cambiada correctamente!</div>
                        <div className="text-gray-500 text-sm text-center">Ya puedes iniciar sesión con tu nueva contraseña.</div>
                    </div>
                )}
                <div className="flex justify-center mt-4">
                    <Link to="/login" className="text-orange-500 hover:underline text-sm font-semibold">Iniciar sesión</Link>
                </div>
            </Card>
        </div>
    );

}

export default RecoveryCard;