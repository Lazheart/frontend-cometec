import { Link } from 'react-router-dom';
import Variante1 from "../../assets/Variante1.svg";
import '../../styles/Header.css';

const Header = () => {
    return (
         <section className="h-wrapper">
             <div className="flexCenter paddings innerWidth h-container">
                    <div className="h-logo-dashboard">
                        <Link to = "/" className="h-logo-link">
                            <img src={Variante1} alt="LogoCometec" width={100} ></img>
                        </Link>
                        <a href="/dashboard" className="h-dashboard-link">Dashboard</a>
                    </div>
                     <div className="h-menu">
                         <a href="#about" >Sobre Nosotros</a>
                         <Link to="/login">
                             <button >
                                 Iniciar Sesión
                             </button>
                         </Link>
                         <Link to="/register">
                             <button >
                                 Registrarse
                             </button>
                         </Link>
                 </div>

             </div>
         </section>
    );
};

export default Header;
