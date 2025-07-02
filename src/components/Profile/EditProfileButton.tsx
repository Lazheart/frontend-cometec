import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export const EditProfileButton = () => {
  const navigate = useNavigate()

  return (
    <Button onClick={() => navigate("/profile/edit")} variant="default" size="default">
      Editar perfil
    </Button>
  )
}
