import "../../styles/Footer.css";
import Variante1 from "../../assets/Variante1.svg";
const Footer = () => {
    return(
        <div className="f-wrapper">
            <div className="paddings innerWidth flexCenter f-container">
                {/* left side */}
                <div className="flexColStart f-left">
                    <img src={Variante1} alt="Variante1" width={120} />
                    <span className="flexColStart">
                        En ComeTec, nuestra visión es facilitar el acceso a las cartas<br/>
                        y menús con una interfaz sencilla y amigable para el usuario.
                     </span>
                </div>

                <div className="flexColStart f-right">
                    <span className="primaryText">Informacion del Proyecto</span>
                    <span className="f-description">Checa Nuestra Documentacion en GitHub</span>
                    <div className="flexCenter f-menu">
                            <span><a href="https://github.com/Lazheart/web-cometec" target="_blank" rel="noopener noreferrer">Repositorio</a></span>
                            <span><a href="https://github.com/Lazheart/web-cometec/blob/main/README.md" target="_blank" rel="noopener noreferrer">README</a></span>
                            <span><a href="https://github.com/Lazheart/web-cometec/issues" target="_blank" rel="noopener noreferrer">Issues</a></span>
                            <span><a href="https://github.com/Lazheart/web-cometec/pulls" target="_blank" rel="noopener noreferrer">Pull Requests</a></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;