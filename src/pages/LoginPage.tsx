import { useRef, useEffect, useState } from "react";
import LoginCard from "../components/Login/LoginCard";
import  LogoCometec from "../assets/LogoCometec.webp";
import {Link} from "react-router-dom";
const LoginPage = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new window.IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true);
            },
            { threshold: 0.3 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            className="login min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1500&q=80')",
            }}
        >
            {/* Overlay naranja */}
            <div className="absolute inset-0 bg-orange-500 opacity-40 pointer-events-none z-0" />
            <div className="paddings innerWidth flexCenter z-10" ref={sectionRef}>
                <div className={`w-40 md:w-56 flex justify-center items-center logo-rotate login-animate${visible ? " login-animate-active" : ""}`}>
                    <Link to = "/">
                        <img
                            src={LogoCometec}
                            alt="Logo Cometec"
                            className="w-full h-auto"
                        />
                    </Link>
                </div>
            </div>
            <div className={`z-10 paddings innerWidth flexCenter login-animate${visible ? " login-animate-active" : ""}`}>
                <div className="paddings innerWidth flexCenter">
                    <LoginCard />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
