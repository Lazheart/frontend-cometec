import React from "react"

type Props = {
    imageUrl?: string
    size?: number // Tamaño en px
}

export const ProfileAvatar: React.FC<Props> = ({ imageUrl, size = 128 }) => {
    return (
        <div
        className="bg-gray-200 rounded-full overflow-hidden flex items-center justify-center text-black font-bold"
        style={{ width: size, height: size }}
        >
        {imageUrl ? (
            <img
            src={imageUrl}
            alt="Foto de perfil"
            className="w-full h-full object-cover"
            />
        ) : (
            <span className="text-center text-sm">Sin foto</span>
        )}
        </div>
    )
}
