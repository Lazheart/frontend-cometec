import { Card, CardContent } from "@/components/ui/card"
import { FiLock } from "react-icons/fi"
import type { UserResponseDto } from "@/interfaces/User/UserResponseDto"
import "@/styles/UserCard.css"

// Estilos similares a login/register: sombra, padding, bordes, fondo blanco
export const UserProfileCard: React.FC<{ user: UserResponseDto }> = ({ user }) => {
    return (
        <div className="usercard-outer-container">
            <Card className="usercard-main-card usercard-wide">
                <CardContent className="usercard-content">
                    <div className="usercard-field">
                        <label className="usercard-label">Nombre</label>
                        <p className="usercard-value">{user.name}</p>
                    </div>
                    <div className="usercard-field">
                        <label className="usercard-label">Apellido</label>
                        <p className="usercard-value">{user.lastname}</p>
                    </div>
                    <div className="usercard-field">
                        <label className="usercard-label">Teléfono</label>
                        <p className="usercard-value">{user.phone}</p>
                    </div>
                    <div className="usercard-field">
                        <label className="usercard-label flex items-center gap-1">Correo electrónico <FiLock className="usercard-lock" title="Dato sensible" /></label>
                        <p className="usercard-value usercard-value-locked flex items-center gap-2">{user.email}</p>
                    </div>
                    <div className="usercard-field">
                        <label className="usercard-label flex items-center gap-1">Contraseña <FiLock className="usercard-lock" title="Dato sensible" /></label>
                        <p className="usercard-value usercard-value-locked flex items-center gap-2">********</p>
                    </div>
                </CardContent>
                <div className="usercard-footer usercard-footer-row">
                    <span className="usercard-footer-label">Miembro desde</span>
                    <span className="usercard-footer-value">{new Date(user.createdAt).toLocaleDateString()}</span>
                    <button className="usercard-cred-btn" onClick={() => window.location.href = '/recovery'}>
                        Modificar credenciales
                    </button>
                </div>
            </Card>
        </div>
    )
}
