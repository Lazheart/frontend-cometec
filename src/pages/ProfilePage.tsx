import { useEffect, useState } from "react"
import { getMe } from "@/services/User/getMe"
import { ProfilePageLayout } from "@/components/Profile/ProfilePageLayout"
import type { UserResponseDto } from "@/interfaces/User/UserResponseDto"
import UpdateUserCard from "@/components/Profile/UpdateUserCard"
import UpdateMailCard from "@/components/Profile/UpdateMailCard"
import UpdatePasswordCard from "@/components/Profile/UpdatePasswordCard"

const ProfilePage = () => {
  const [user, setUser] = useState<UserResponseDto | null>(null)
  const [showEdit, setShowEdit] = useState(false)
  const [showMail, setShowMail] = useState(false)
  const [showPass, setShowPass] = useState(false)

  useEffect(() => {
    getMe().then(setUser).catch(console.error)
  }, [])

  const handleEditData = () => setShowEdit(true)
  const handleEditMail = () => setShowMail(true)
  const handleEditPass = () => setShowPass(true)
  const closeAll = () => {
    setShowEdit(false)
    setShowMail(false)
    setShowPass(false)
  }

  if (!user) return <p>Cargando...</p>

  return (
    <div className="min-h-screen bg-[#ff6600] text-white">
      <div style={{ height: 40 }} />
      <ProfilePageLayout
        user={user}
        onEditData={handleEditData}
        onEditMail={handleEditMail}
        onEditPass={handleEditPass}
      />
      {(showEdit || showMail || showPass) && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(255,255,255,0.7)", // Cambiado a blanco translúcido
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {showEdit && <UpdateUserCard user={user} onClose={closeAll} />}
          {showMail && <UpdateMailCard user={user} onClose={closeAll} />}
          {showPass && <UpdatePasswordCard onClose={closeAll} />}
        </div>
      )}
    </div>
  )
}

export default ProfilePage
