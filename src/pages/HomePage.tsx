import Header from '../components/Home/Header';
import About from '../components/Home/About.tsx';
import Hero from '../components/Home/Hero.tsx';
import Companies from "../components/Home/Companies.tsx";
import Footer from "../components/Home/Footer.tsx";
import JoinUs from "../components/Home/JoinUs.tsx";

const HomePage = () => {
    return (
        <div>
            <Header/>
            <Hero/>
            <div className="bg-white w-full">
                <Companies />
            </div>
            <div className="bg-gray-100 w-full">
                <About />
            </div>
            <JoinUs/>
            <div className="bg-white w-full">
                <Footer/>
            </div>
        </div>
    );
};

export default HomePage;
