import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import React, {useState, useEffect} from "react";
import {verifyPassword} from "@/services/User/verifyPassword";
import {getMe} from "@/services/User/getMe";
import {updateMail} from "@/services/User/updateMail";
import "@/styles/UpdateUserCard.css";
import type {UserResponseDto} from "@/interfaces/User/UserResponseDto.ts";

interface Props {
    onClose: () => void,
    user?: UserResponseDto
}

const UpdateMailCard: React.FC<Props> = ({onClose}) => {
    const [step, setStep] = useState<"verify" | "change">("verify");
    const [userId, setUserId] = useState<number | null>(null);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        getMe().then(user => setUserId(user.id));
    }, []);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            if (!userId) throw new Error("No se pudo obtener el usuario");
            const valid = await verifyPassword(userId, password);
            if (valid) {
                setStep("change");
                setError("");
            } else {
                setError("Contraseña incorrecta.");
            }
        } catch {
            setError("Error al verificar la contraseña.");
        } finally {
            setLoading(false);
        }
    };

    const handleChangeMail = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            if (!userId) throw new Error("No se pudo obtener el usuario");
            await updateMail({
                email,
                name: "",
                lastname: "",
                phone: "",
                password: ""
            });
            setSuccess("Correo actualizado correctamente.");
            setTimeout(onClose, 1200);
        } catch {
            setError("No se pudo actualizar el correo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="update-user-card">
            <CardContent className="p-0">
                <h3 className="profile-title update-user-title">Modificar correo</h3>
                {step === "verify" ? (
                    <form onSubmit={handleVerify} className="flex flex-col gap-3">
                        <div className="text-sm text-gray-600 mb-2 text-center">
                            Para cambiar tu correo primero valida tu contraseña
                        </div>
                        <Input
                            name="password"
                            type="password"
                            placeholder="Contraseña actual"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="input-update-user"
                        />
                        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                        <div className="update-user-btns">
                            <button type="button" className="btn-cancel-update-user" onClick={onClose}
                                    disabled={loading}>Cancelar
                            </button>
                            <button type="submit" className="btn-update-user" disabled={loading}>
                                {loading ? "Validando..." : "Validar"}
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleChangeMail} className="flex flex-col gap-3">
                        <Input
                            name="email"
                            type="email"
                            placeholder="Nuevo correo electrónico"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className="input-update-user"
                        />
                        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                        {success && <div className="text-green-600 text-sm text-center">{success}</div>}
                        <div className="update-user-btns">
                            <button type="button" className="btn-cancel-update-user" onClick={onClose}
                                    disabled={loading}>Cancelar
                            </button>
                            <button type="submit" className="btn-update-user" disabled={loading}>
                                {loading ? "Guardando..." : "Guardar"}
                            </button>
                        </div>
                    </form>
                )}
            </CardContent>
        </Card>
    );
};

export default UpdateMailCard;
