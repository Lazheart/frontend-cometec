import "../../styles/RecoveryCard.css"
import { Card, CardTitle } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import React, { useState } from "react";
import { recovery, verifyRecoveryCode, resetPassword } from "@/services/authService.ts";
import LogoCometec from "@/assets/LogoCometec.png";

interface Props {
    onClose: () => void;
}

const UpdatePasswordCard: React.FC<Props> = ({ onClose }) => {
    const [form, setForm] = useState({ email: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: correo, 2: código, 3: nueva pass, 4: éxito
    const [codeState, setCodeState] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isCodeVerified, setIsCodeVerified] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        if (step === 1) {
            setLoading(true);
            try {
                const res = await recovery(form);
                setSuccess(res.message || "Te enviamos un código de seguridad a tu correo.");
                setStep(2);
            } catch {
                setError("Error al recuperar la cuenta. Intenta de nuevo.");
            } finally {
                setLoading(false);
            }
        }
    };

    // Nuevo handler solo para verificar el código
    const handleVerifyCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        if (!codeState) {
            setError("Ingresa el código de seguridad.");
            return;
        }
        setLoading(true);
        try {
            const isValid = await verifyRecoveryCode(form.email, codeState);
            if (isValid) {
                setSuccess("Código verificado correctamente.");
                setError("");
                setIsCodeVerified(true);
                setStep(3);
            } else {
                setError("Código incorrecto");
                setIsCodeVerified(false);
                setStep(2);
            }
        } catch {
            setError("Error al verificar el código");
            setIsCodeVerified(false);
            setStep(2);
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);
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
            const res = await resetPassword(form.email, codeState, newPassword);
            if (res) {
                setSuccess("¡Contraseña cambiada correctamente!");
                setStep(4);
                setTimeout(() => {
                    onClose();
                }, 2000);
            } else {
                setError("No se pudo cambiar la contraseña. Intenta de nuevo.");
            }
        } catch {
            setError("Error al cambiar la contraseña. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.7)' }}
        >
            <div onClick={e => e.stopPropagation()}>
                <Card className="update-user-card bg-white shadow-md">
                    <div className="flex items-center justify-between mb-4">
                        <CardTitle className="profile-title update-user-title flex-1 text-left">Cambiar contraseña</CardTitle>
                        <img src={LogoCometec} alt="Logo Cometec" className="w-12 h-12 ml-2" />
                    </div>
                    <div className="mb-2 text-gray-500 text-sm text-center">
                        {step === 1 && "Ingresa tu correo para cambiar tu contraseña"}
                        {step === 2 && "Ingresa el código de seguridad enviado a tu correo"}
                        {step === 3 && isCodeVerified && "Ingresa tu nueva contraseña"}
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
                                className="input-update-user"
                                required
                            />
                            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                            {success && <div className="text-green-600 text-sm text-center">{success}</div>}
                            <button
                                type="submit"
                                className="btn-update-user"
                                disabled={loading}
                            >
                                {loading ? "Enviando..." : "Enviar código"}
                            </button>
                        </form>
                    )}
                    {step === 2 && (
                        <form onSubmit={handleVerifyCode} className="flex flex-col gap-3">
                            <Input
                                type="text"
                                name="code"
                                placeholder="Código de seguridad"
                                value={codeState}
                                onChange={e => setCodeState(e.target.value)}
                                className="input-update-user"
                                required
                                disabled={loading}
                            />
                            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                            {success && <div className="text-green-600 text-sm text-center">{success}</div>}
                            <button
                                type="submit"
                                className="btn-update-user"
                                disabled={loading}
                            >
                                {loading ? "Verificando..." : "Verificar código"}
                            </button>
                        </form>
                    )}
                    {step === 3 && isCodeVerified && (
                        <form onSubmit={handleResetPassword} className="flex flex-col gap-3">
                            <Input
                                type="password"
                                name="newPassword"
                                placeholder="Nueva contraseña"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                className="input-update-user"
                                required
                            />
                            <Input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirmar contraseña"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                className="input-update-user"
                                required
                            />
                            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                            {success && <div className="text-green-600 text-sm text-center">{success}</div>}
                            <button
                                type="submit"
                                className="btn-update-user"
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
                    {(step === 1 || step === 2 || (step === 3 && isCodeVerified)) && (
                        <button
                            type="button"
                            className="btn-cancel-update-user bg-gray-300 text-gray-700 mt-2"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                    )}
                </Card>
            </div>
        </div>
    );
}

export default UpdatePasswordCard;
