import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import type { UserResponseDto } from "@/interfaces/User/UserResponseDto";
import { updateMe } from "@/services/User/updateMe";
import "@/styles/UpdateUserCard.css";

interface Props {
  user: UserResponseDto;
  onClose: () => void;
}

const UpdateUserCard: React.FC<Props> = ({ user, onClose }) => {
  const [form, setForm] = useState({
    name: user.name,
    lastname: user.lastname,
    phone: user.phone,
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
      await updateMe(form);
      setSuccess("Datos actualizados correctamente.");
      setTimeout(onClose, 1200);
    } catch {
      setError("No se pudieron actualizar los datos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="update-user-card">
      <CardContent className="p-0">
        <h3 className="profile-title update-user-title">Modificar datos</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            required
            className="input-update-user"
          />
          <Input
            name="lastname"
            placeholder="Apellido"
            value={form.lastname}
            onChange={handleChange}
            required
            className="input-update-user"
          />
          <Input
            name="phone"
            placeholder="Teléfono"
            value={form.phone}
            onChange={handleChange}
            required
            className="input-update-user"
          />
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center">{success}</div>}
          <div className="update-user-btns">
            <button type="button" className="btn-cancel-update-user" onClick={onClose} disabled={loading}>Cancelar</button>
            <button type="submit" className="btn-update-user" disabled={loading}>
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateUserCard;
