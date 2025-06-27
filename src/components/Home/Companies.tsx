import { useRef, useEffect, useState } from "react";
import '../../styles/Companies.css';
import Logo1 from "../../../public/Logo1.png";
import Logo2 from "../../../public/Logo2.png";
import Logo3 from "../../../public/Logo3.png";
import Logo4 from "../../../public/Logo4.png";


const logos = [
  { src: Logo1, alt: "Rufos.png" },
  { src: Logo2, alt: "DonMario.png" },
  { src: Logo3, alt: "VacaNegra.png" },
  { src: Logo4, alt: "Piatto.png" },
];

const Companies = () => {
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
        <section className="c-wrapper">
            <h1 className="paddings innerWidth flexCenter c-title">Empresas que confían en nosotros</h1>
            <div
                className="paddings innerWidth flexCenter c-container"
                ref={sectionRef}
            >
                {logos.map((logo, idx) => (
                    <img
                        key={logo.alt}
                        src={logo.src}
                        alt={logo.alt}
                        className={`c-logo${visible ? " c-logo-animate" : ""}`}
                        style={visible ? { animationDelay: `${idx * 0.3}s` } : {}}
                    />
                ))}
            </div>
        </section>
    );
};

export default Companies;

//Este codigo se puede hacer modular para que sea mas facil de mantener y reutilizar