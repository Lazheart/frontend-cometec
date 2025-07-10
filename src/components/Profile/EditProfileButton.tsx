import { Button } from "@/components/ui/button"
import React, { useRef } from "react"
import { updateProfileImage } from "@/services/User/updateProfileImage"

export const EditProfileButton = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const formData = new FormData()
    formData.append("image", file)
    try {
      await updateProfileImage(formData)
      // Aquí podrías agregar lógica para actualizar la UI o mostrar un mensaje de éxito
    } catch (error) {
      // Manejo de errores
      console.error(error)
    }
  }

  return (
    <>
      <Button onClick={handleButtonClick} variant="default" size="default">
        Editar imagen
      </Button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </>
  )
}
