import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import type { UserResponseDto } from "@/interfaces/User/UserResponseDto";
import { updateMail } from "@/services/User/updateMail";

interface Props {
  user: UserResponseDto;
  onClose: () => void;
}

const UpdateMailCard: React.FC<Props> = ({ user, onClose }) => {
  const [form, setForm] = useState({
    email: user.email,
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await updateMail({
        name: user.name,
        lastname: user.lastname,
        phone: user.phone,
        email: form.email,
        password: form.password,
      });
      setSuccess("Correo actualizado correctamente.");
      setTimeout(onClose, 1200);
    } catch {
      setError("No se pudo actualizar el correo. Verifica tu contraseña.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="usercard-modal-bg">
      <Card className="usercard-modal">
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Modificar correo</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input
              name="email"
              type="email"
              placeholder="Nuevo correo electrónico"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="Ingresa tu contraseña para cambiar el correo"
              value={form.password}
              onChange={handleChange}
              required
            />
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            {success && <div className="text-green-600 text-sm text-center">{success}</div>}
            <div className="flex gap-2 mt-2">
              <button type="button" className="usercard-cancel-btn" onClick={onClose} disabled={loading}>Cancelar</button>
              <button type="submit" className="usercard-save-btn" disabled={loading}>
                {loading ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateMailCard;
