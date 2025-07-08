import { ProfileAvatar } from "./ProfileAvatar"
import { UserProfileCard } from "./UserCard"
import  OwnedRestaurantCard  from "./OwnedRestaurantCard"
import CommetsCard from "./CommetsCard";
import ReviewsCard from "./ReviewsCard";
import FavouritesCard from "./FavouritesCard";
import type { UserResponseDto } from "@/interfaces/User/UserResponseDto"
import { FiEdit2 } from "react-icons/fi"
import { useNavigate } from "react-router-dom"

interface Props {
    user: UserResponseDto,
    onEditData: () => void,
    onEditMail: () => void,
    onEditPass: () => void
}

export const ProfilePageLayout = ({ user, onEditData, onEditMail, onEditPass }: Props) => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-[#ff6600] text-white">
            {/* Sección superior: avatar, icono editar y card en un div separado */}
            <div className="w-full flex flex-col md:flex-row items-center justify-center gap-16 pt-12 pb-8 relative">
                <div className="flex-shrink-0 flex flex-col items-center gap-4 relative">
                    <div className="relative" style={{ minHeight: 250 }}>
                        <ProfileAvatar imageUrl={user.profileImageUrl} size={300} />
                        <span className="profile-edit-icon" style={{ top: '-24px', right: '-18px' }} onClick={() => navigate("/profile/edit")}>
                            <FiEdit2 size={28} />
                        </span>
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
