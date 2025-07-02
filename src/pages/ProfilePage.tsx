import { useEffect, useState } from "react"
import { getMe } from "@/services/User/getMe"
import { ProfilePageLayout } from "@/components/Profile/ProfilePageLayout"
import type { UserResponseDto } from "@/interfaces/User/UserResponseDto"

const ProfilePage = () => {
  const [user, setUser] = useState<UserResponseDto | null>(null)

  useEffect(() => {
    getMe().then(setUser).catch(console.error)
  }, [])

  if (!user) return <p>Cargando...</p>

  return (
    <div className="min-h-screen bg-[#ff6600] text-white">
      <div style={{ height: 40 }} />
      <ProfilePageLayout user={user} />
    </div>
  )
}

export default ProfilePage
