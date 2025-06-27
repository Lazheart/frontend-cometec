import '../../styles/Hero.css';
import Carrusel from '../Carrusel';
import Restaurante1 from '../../assets/Restaurante1.png';
import Restaurante2 from '../../assets/Restaurante2.png';
import Restaurante3 from '../../assets/Restaurante3.png';
import CountUp from "react-countup";

const images = [Restaurante1, Restaurante2, Restaurante3];


const Hero = () => {

   return (
          <section className="hero-wrapper">
              <div className="paddings innerWidth flexCenter hero-container " >
                  <div className="flexColStart hero-left">
                      <div className="hero-title">
                          <h1>
                              Disfruta los Mejores<br/>
                               Restaurantes y Platos
                              <br/>en ComeTec.
                          </h1>
                      </div>
                      <div className="flexColStart hero-des">
                            <span>
                                Descubre , crea y administra tu propio restaurante con ComeTec
                            </span>
                            <span>
                                Explora una amplia variedad de platillos y restaurantes
                                <br/>para satisfacer todos tus antojos.
                            </span>
                      </div>
                      <div className="flexCenter stats">
                          <div className="flexColCenter stat">
              <span>
                <CountUp start={0} end={90} duration={4} /> <span>+</span>
              </span>
                              <span className="secondaryText">Cartas Publicadas</span>
                          </div>

                          <div className="flexColCenter stat">
              <span>
                <CountUp start={0} end={40} duration={4} /> <span>+</span>
              </span>
                              <span className="secondaryText">Usuarios Felices</span>
                          </div>

                          <div className="flexColCenter stat">
              <span>
                <CountUp start={0} end={28} duration={4}/> <span>+</span>
              </span>
                              <span className="secondaryText">Lugares Registrados</span>
                          </div>
                      </div>
                  </div>
                  <div className="flexCenter hero-right">
                      <div className="image-container">
                          <Carrusel images={images} />
                      </div>

                  </div>
              </div>
          </section>

   );
}


export default Hero;