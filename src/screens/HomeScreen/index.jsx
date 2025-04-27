import { useNavigate } from "react-router-dom";
import { BgImage } from "../../assets/icons";
import Navbar from "../../components/NavBar";

export default function HomeScreen() {
    const navigate = useNavigate();

    return (

        <div className="h-screen bg-gradient-to-b from-secondary to-primary relative overflow-hidden">
            <Navbar />
            <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{
                    backgroundImage: `url(${BgImage})`,
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
                <h1 className="text-4xl tracking-tight font-extrabold text-text-primary sm:text-5xl md:text-6xl text-center">
                    <span>Organize your ideas with</span>
                    <br />
                    <span className="text-blue-600">Planero</span>
                </h1>
                <p className="mt-6 text-text-secondary text-lg sm:text-xl max-w-2xl text-center">
                    The simple, flexible, and powerful way to manage your projects. Collaborate with your team, track tasks, and achieve your goals.
                </p>
                <button
                    onClick={() => navigate("/auth")}
                    className="mt-10 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Get Started - It's Free
                </button>
            </div>
        </div>
    );
}
