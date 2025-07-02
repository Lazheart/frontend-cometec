import {Link} from "react-router-dom";
import "../styles/NotFoundPage.css";

const NotFoundPage = () => {
    return (
        <div className="nfp-wrapper notfound-bg" style={{minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <h1 className="notfound-title">404</h1>
            <p className="notfound-subtitle">Página no encontrada</p>
            <Link to="/" className="notfound-btn" style={{textDecoration: 'none'}}>Volver al inicio</Link>
            <Link to="/dashboard" className="notfound-dashboard-link">Ir al dashboard</Link>
        </div>
    );
};

export default NotFoundPage;