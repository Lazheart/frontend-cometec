import { ProfileAvatar } from "./ProfileAvatar"
import { UserProfileCard } from "./UserCard"
import  OwnedRestaurantCard  from "./OwnedRestaurantCard"
import CommetsCard from "./CommetsCard";
import ReviewsCard from "./ReviewsCard";
import FavouritesCard from "./FavouritesCard";
import type { UserResponseDto } from "@/interfaces/User/UserResponseDto"
import { FiEdit2 } from "react-icons/fi"
import React, { useRef, useState } from "react"
import { updateProfileImage } from "@/services/User/updateProfileImage"

interface Props {
    user: UserResponseDto,
    onEditData: () => void,
    onEditMail: () => void,
    onEditPass: () => void
}

export const ProfilePageLayout = ({ user, onEditData, onEditMail, onEditPass }: Props) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [profileImageUrl, setProfileImageUrl] = useState(user.profileImageUrl);

    const handleEditIconClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("profileImage", file); // Cambiado a "profileImage"
        try {
            const updatedUser = await updateProfileImage(formData);
            setProfileImageUrl(updatedUser.profileImageUrl);
            // Opcional: mostrar mensaje de éxito
        } catch (error) {
            // Manejo de errores
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-[#ff6600] text-white">
            {/* Sección superior: avatar, icono editar y card en un div separado */}
            <div className="w-full flex flex-col md:flex-row items-center justify-center gap-16 pt-12 pb-8 relative">
                <div className="flex-shrink-0 flex flex-col items-center gap-4 relative">
                    <div className="relative" style={{ minHeight: 250 }}>
                        <ProfileAvatar imageUrl={profileImageUrl} size={300} />
                        <span className="profile-edit-icon" style={{ top: '-24px', right: '-18px' }} onClick={handleEditIconClick}>
                            <FiEdit2 size={28} />
                        </span>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                    </div>
                    <h2 className="profile-title">Mi perfil</h2>
                </div>
                <div className="flex flex-col items-center gap-4 w-full max-w-3xl">
                    <UserProfileCard user={user} onEditData={onEditData} onEditMail={onEditMail} onEditPass={onEditPass} />
                </div>
            </div>
            {/* Separación visual entre secciones */}
            <div className="h-10" />
            {/* Sección inferior: Mis restaurantes en otro div */}
            <div className="w-full flex flex-col items-center">
                <div className="owner-restaurants-title">Mis Restaurantes</div>
                <hr className="owner-restaurants-title-divider" />
                <OwnedRestaurantCard/>
            </div>
            <div className="w-full flex flex-col items-center mt-10">
                <div className="owner-restaurants-title">Mis Comentarios</div>
                <hr className="owner-restaurants-title-divider" />
                <CommetsCard/>
            </div>
            <div className="w-full flex flex-col items-center mt-10">
                <div className="owner-restaurants-title">Mis Reseñas</div>
                <hr className="owner-restaurants-title-divider" />
                <ReviewsCard/>
            </div>
            <div className="w-full flex flex-col items-center mt-10">
                <div className="owner-restaurants-title">Restaurantes Favoritos</div>
                <hr className="owner-restaurants-title-divider" />
                <FavouritesCard/>
            </div>
        </div>
    )
}
