import { useNavigate } from "react-router"

export default function Navbar() {

    const handleSignOut = () => {
        localStorage.removeItem("authentication")
        console.log("you are signout")
        navigate("/")
    }


    const navigate = useNavigate();
    return (

        <div className="flex w-full justify-between items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md fixed top-0 left-0 z-50">
            {/* Left side */}
            <div className="text-white text-lg font-semibold tracking-wide">
                👋 Hi, welcome sir
            </div>

            {/* Right side */}
            <div className="flex space-x-3">
                <button
                    onClick={() => navigate("/signup")}
                    className="bg-white text-blue-600 font-medium text-sm px-5 py-2 rounded-lg shadow hover:bg-gray-100 transition"
                >
                    Sign Up
                </button>
                <button
                    onClick={() => navigate("/signin")}
                    className="bg-black text-white font-medium text-sm px-5 py-2 rounded-lg shadow hover:bg-gray-900 transition"
                >
                    Sign In
                </button>
                <button
                    onClick={handleSignOut}
                    className="bg-black text-white font-medium text-sm px-5 py-2 rounded-lg shadow hover:bg-gray-900 transition"
                >
                    sign out
                </button>
            </div>
        </div>

    )
}