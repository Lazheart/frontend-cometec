import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card.tsx"
import Restaurante1 from '../../assets/Restaurante1.png';
import Restaurante2 from '../../assets/Restaurante2.png';
import Restaurante3 from '../../assets/Restaurante3.png';
import "../../styles/JoinUs.css";

const cardsData = [
    {
        title: "Únete a nosotros",
        description: "Sé parte de nuestro equipo",
        image: Restaurante1,
        content: "¿Te gustaría formar parte de nuestro equipo? ¡Súmate hoy!",
        buttonText: "Postúlate",
        buttonLink: "/unete"
    },
    {
        title: "Se parte de la comunidad",
        description: "Descubre y puntua cientos de lugares",
        image: Restaurante2,
        content: "Se parte de esta comunidad y descubre nuevas cartas y platillos todos los dias .",
        buttonText: "Unete a ComeTec",
        buttonLink: "/register"
    },
    {
        title: "Registra tu restaurante",
        description: "Desarrolla tu potencial con nosotros",
        image: Restaurante3,
        content: "Accede a cientos de usuarios y maneja tu restaurante de manera mas facil.",
        buttonText: "Registra tu restaurante",
        buttonLink: "/register-restaurant"
    }
];

const JoinUs = () => {
    return (
        <section className="JoinUs-wrapper">
            <section className="paddings innerWidth flexCenter JoinUs">
                <div className="paddings innerWidth flexCenter j-title">
                    <span className="thin-text"> Unete a <span className="bold-text"> ComeTec</span> </span>
                </div>
                <div className="paddings innerWidth flexCenter JoinUs-cards">
                    {cardsData.map((card, idx) => (
                        <Card className="JoinUs-card" key={idx}>
                            <CardHeader>
                                <img src={card.image} alt={card.title} className="JoinUs-card-image" />
                                <CardTitle>{card.title}</CardTitle>
                                <CardDescription>{card.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="flexCenter paddings">{card.content}</p>
                            </CardContent>
                            <CardFooter className="flexCenter">
                                <a href={card.buttonLink}>
                                    <button className="JoinUs-button">{card.buttonText}</button>
                                </a>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>
        </section>
    );
}

export default JoinUs;