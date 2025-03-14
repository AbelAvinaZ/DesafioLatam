import { Link } from "react-router";
import "./PizzeriaNavbar.css";
import formattedTotal from "../../utils/utility";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";

export default function PizzeriaNavbar() {
    const { pizzaCart } = useContext(CartContext);
    const { user, logout } = useContext(UserContext);

    // usamos reduce para llevar la sumatoria del precio de las pizzas
    const total = pizzaCart.reduce((acc, pizza) => acc + pizza.price * pizza.count, 0);

    // const toggleToken = () => {
    //     setUser((prevUser) => !prevUser); //tomamos el valor anterior del user y lo cambiamos
    // };


    return (
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
                        {user ? (
                            <>
                                <Link
                                    to="/profile"
                                    className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                >
                                    Profile 🙍

                                </Link>
                                <button
                                    className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                    onClick={logout}
                                >
                                    Logout 🔐
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/register"
                                    className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                >
                                    Register 🙍

                                </Link>
                                <Link
                                    to="/login"
                                    className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                >
                                    Login 🔐
                                </Link>
                            </>
                        )
                        }
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
