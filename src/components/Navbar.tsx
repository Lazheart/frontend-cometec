import SearchBar from './ui/searchBar';
import { Link, useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import Variante1 from "../assets/Variante1.svg";
import '../styles/Navbar.css'
import { AuthContext } from '@/contexts/AuthContext';
import { useContext, useEffect, useRef, useState } from 'react';
import { getMe } from '@/services/User/getMe';
import type { UserResponseDto } from '@/interfaces/User/UserResponseDto';

const Navbar = () => {
    const { logout } = useContext(AuthContext) ?? {};
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useState<UserResponseDto | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    useEffect(() => {
        setDropdownOpen(false);
    }, [location]);

    useEffect(() => {
        getMe().then(setUser).catch(() => setUser(null));
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <section className="nav-wrapper">
            <div className="flexCenter paddings innerWidth nav-container justify-between w-full">
                {/* Logo */}
                <Link to="/dashboard">
                    <img src={Variante1} alt="LogoCometec" width={100} />
                </Link>
                {/* SearchBar en el centro */}
                <div className="flex-grow flex justify-center px-4">
                    <SearchBar />
                </div>
                {/* Icono de usuario y nombre (link al perfil) + flecha desplegable */}
                <div className="relative flex items-center" ref={dropdownRef}>
                    <Link to="/me" className="flex items-center mr-8 hover:text-orange-700">
                        <FaUserCircle className="text-4xl text-orange-600 hover:text-gray-600" />
                        <span className="ml-6 font-semibold text-orange-700">{user?.name || ''}</span>
                    </Link>
                    <span
                        onClick={() => setDropdownOpen((open) => !open)}
                        className="cursor-pointer flex items-center ml-6"
                    >
                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                    {dropdownOpen && (
                        <div className="fixed right-8 top-[70px] w-56 bg-white rounded-md shadow-lg z-50 py-2 text-gray-800"
                             style={{ minWidth: '220px' }}>
                            <div
                                onClick={() => { setDropdownOpen(false); window.location.href = '/recovery'; }}
                                className="px-4 py-2 hover:bg-orange-100 cursor-pointer flex items-center"
                            >
                                <span className="text-orange-600 font-medium">Cambiar contraseña</span>
                            </div>
                            <div
                                onClick={() => { setDropdownOpen(false); if (logout) { logout(); } }}
                                className="px-4 py-2 hover:bg-orange-100 cursor-pointer flex items-center"
                            >
                                <span className="text-orange-600 font-medium">Cerrar sesión</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
export default Navbar;