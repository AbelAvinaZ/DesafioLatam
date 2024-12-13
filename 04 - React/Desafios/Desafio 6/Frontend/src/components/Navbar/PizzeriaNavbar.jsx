// import { useState } from 'react';
import { Link } from "react-router";
import "./PizzeriaNavbar.css";
import formattedTotal from "../../utils/utility";

export default function PizzeriaNavbar() {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // //este es para simular que si le da iniciar sesion entraria a la sesion y cambiaria a cerrar sesion
    // const logIn = () => setIsLoggedIn(!isLoggedIn);

    const total = 25000;


    return (
        // le quite la clase fixed para el navbar
        <nav className="bg-black/50 w-full top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <span className="text-white text-xl font-bold">Pizzeria Mamma Mia!</span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link
                            to="/"
                            className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                        >
                            Home 🍕
                        </Link>
                        <Link
                            to="/profile"
                            className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                        >
                            {/* {isLoggedIn ? "Register 🔑" : "Profile 🙍"} */}
                            Profile 🙍

                        </Link>
                        <Link
                            to="/login"
                            /*onClick={logIn}*/
                            className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                        >
                            {/* {isLoggedIn ? "Login 🔑" : "Logout 🔐"} */}
                            Logout 🔐
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <Link
                            to="/cart"
                            className="text-white font-bold"
                        >
                            🛒 Total: ${formattedTotal(total)}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};
