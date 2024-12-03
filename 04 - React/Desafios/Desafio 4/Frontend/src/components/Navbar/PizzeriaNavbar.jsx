import { useState } from 'react';
import "./PizzeriaNavbar.css";
import formattedTotal from "../../utils/utility";

export default function PizzeriaNavbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // //este es para simular que si le da iniciar sesion entraria a la sesion y cambiaria a cerrar sesion
    const logIn = () => setIsLoggedIn(!isLoggedIn);
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
                        <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                            Home 🍕
                        </button>
                        <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            {isLoggedIn ? "Register 🔑" : "Profile 🙍"}
                        </button>
                        <button onClick={logIn} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                            {isLoggedIn ? "Login 🔑" : "Logout 🔐"}
                        </button>
                    </div>
                    <div className="flex items-center">
                        <span className="text-white font-bold">
                            🛒 Total: ${formattedTotal(total)}
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    );
};
