import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PrivateRoute from "./router/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import RecoveryPage from "./pages/RecoveryPage.tsx";
import './App.css';
import RegisterPage from "./pages/RegisterPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx"
import { refreshCookieToken } from "@/utils/token";
import ProtectedLayout from "@/components/ProtectedLayout";
import RestaurantDetailPage from "@/pages/RestaurantDetailPage.tsx";

export default function App() {
    const location = useLocation();
    useEffect(() => {
        refreshCookieToken(); // Refresca el token en cada cambio de ruta
    }, [location]);

    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/recovery" element={<RecoveryPage/>}/>
                <Route path="*" element={<NotFoundPage />} />
                {/* Agrupamos rutas protegidas bajo ProtectedLayout */}
                <Route element={<PrivateRoute><ProtectedLayout /></PrivateRoute>}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/me" element={<ProfilePage />} />
                    <Route path= "/restaurants/:id" element={ <RestaurantDetailPage/> } />
                </Route>
            </Routes>
        </>
    );
}
