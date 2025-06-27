import { useEffect, useState, useRef } from 'react';
import '../../styles/About.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import utensilio_X from '../../assets/utensilio_X.svg';
import type { Swiper as SwiperType } from 'swiper';

const About = () => {
    const swiperRef = useRef<SwiperType | null>(null);
    const handleMouseEnter = () => {
        swiperRef.current?.autoplay?.stop();
    };

    const handleMouseLeave = () => {
        swiperRef.current?.autoplay?.start();
    };

    const [animateUtensils, setAnimateUtensils] = useState(false);
    const aboutSectionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new window.IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setAnimateUtensils(true);
                }
            },
            { threshold: 0.3 }
        );
        const currentRef = aboutSectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <section id="about" className="about-section" ref={aboutSectionRef}>
            <img
                src={utensilio_X}
                alt="Utensilios cruzados"
                className={`about-utensils-crossed left ${animateUtensils ? 'animate-utensils' : ''}`}
                draggable="false"
            />
            <img
                src={utensilio_X}
                alt="Utensilios cruzados"
                className={`about-utensils-crossed right ${animateUtensils ? 'animate-utensils' : ''}`}
                draggable="false"
            />
            <div className="AboutContainer innerWidth paddings flexCenter">
                <Swiper
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    style={{ width: '100%', maxWidth: 600 }}
                    onSwiper={(swiper) => { swiperRef.current = swiper; }}
                >
                    <SwiperSlide>
                        <div
                            className="card about-content"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <h1 className="about-title">¿Qué es ComeTec?</h1>
                            <p>
                                ComeTec es una plataforma diseñada para compartir, administrar y descubrir restaurantes y sus cartas.
                                Te permite explorar una amplia variedad de opciones gastronómicas, desde los restaurantes más populares hasta tesoros culinarios escondidos.
                            </p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            className="card about-content"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <h1 className="about-title">¿Por qué usar ComeTec?</h1>
                            <p>
                                Porque facilita la gestión de restaurantes y la búsqueda de nuevos lugares para comer.
                                Ofrece una experiencia única para usuarios y dueños de restaurantes, conectando a las personas con la mejor oferta gastronómica.
                            </p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            className="card about-content"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <h1 className="about-title">Sobre Nosostros</h1>
                            <p>
                                Somos un equipo apasionado por la gastronomía y la tecnología, comprometido en mejorar la experiencia de comer fuera.
                                Nuestro objetivo es crear una comunidad donde los amantes de la comida puedan descubrir y compartir sus experiencias culinarias.
                            </p>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    );
};

export default About;
