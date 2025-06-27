import RegisterCard  from "@/components/Register/RegisterCard.tsx";

const RegisterPage = () => {
    return (
        <div
            className="register min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1500&q=80')",
            }}
        >
            {/* Overlay naranja */}
            <div className="absolute inset-0 bg-orange-500 opacity-40 pointer-events-none z-0" />
            <div className="z-10 paddings innerWidth flexCenter">
                <RegisterCard/>
            </div>
        </div>
    );
};

export default RegisterPage;
