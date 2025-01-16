import formattedTotal from "../../utils/utility";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { Link } from "react-router";

export const Cart = () => {

    const { user } = useContext(UserContext);
    const { pizzaCart, clearCart, addPizzaToCart, removePizzaFromCart, decreasePizzaFromCart, } = useContext(CartContext);


    //fn to show a success msg when completing the buying
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

    const proceedToCheckout = async () => {
        const token = localStorage.getItem("token");
        if (!token) return alert("Please login to checkout.");

        if (!user?.email) {
            console.error("No email found for the user.");
            return alert("User email is missing. Please log in again.");
        }

        try {
            const res = await axios.post(
                "http://localhost:5000/api/checkouts",
                { cart: pizzaCart, user: { email: user.email } },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.status === 200) {
                setIsSuccessModalVisible(true); // Muestra el modal en caso de éxito
                clearCart(); //if you proceed, it will clean the cart
            }
        } catch (e) {
            console.error("Error en el checkout:", e);
            alert("Checkout fallido.");
        }
    };

    // Calcular el total de la orden
    const orderTotal = pizzaCart.reduce((total, pizza) => total + pizza.price * pizza.count, 0);


    return (
        <section className="bg-white py-8 antialiased md:py-16 min-h-screen">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Shopping Cart</h2>

                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                        <div className="space-y-6">
                            {pizzaCart.map((pizza) => (
                                <div key={pizza.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                        <a href="#" className="shrink-0 md:order-1">
                                            <img className="h-20 w-20 dark:hidden" src={pizza.img} alt="imac image" />
                                        </a>
                                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                                            <div className="flex items-center">
                                                <button
                                                    type="button"
                                                    onClick={() => decreasePizzaFromCart(pizza.id)}
                                                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200">
                                                    ➖
                                                </button>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value={pizza.count}
                                                    className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => addPizzaToCart(pizza)}
                                                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200"
                                                >
                                                    ➕
                                                </button>
                                            </div>
                                            <div className="text-end md:order-4 md:w-32">
                                                <p className="text-base font-bold text-gray-900 dark:text-white">
                                                    {formattedTotal(pizza.price * pizza.count)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                            <a href="#" className="text-base font-medium text-gray-900 hover:underline dark:text-white">
                                                {pizza.name}
                                            </a>

                                            <div className="flex items-center gap-4">
                                                <button type="button" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline">
                                                    ♥️ Add to Favorites
                                                </button>

                                                <button
                                                    onClick={() => removePizzaFromCart(pizza.id)}
                                                    type="button"
                                                    className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                                                >
                                                    ❌ Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                            <p className="text-xl font-semibold text-gray-900">Order summary</p>
                            <div className="space-y-4">
                                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                                    <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                                    <dd className="text-base font-bold text-gray-900">{formattedTotal(orderTotal)}</dd>
                                </dl>
                            </div>
                            <button
                                disabled={!user}
                                className={user ?
                                    "flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800"
                                    :
                                    "flex w-full items-center justify-center rounded-lg bg-gray-700 px-5 py-2.5 text-sm font-medium text-white"
                                }
                                onClick={proceedToCheckout}
                            >
                                Proceed to Checkout
                            </button>
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-sm font-normal text-gray-500"> or </span>
                                <Link
                                    to="/"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline"
                                >
                                    Continue Shopping ➡️
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal de éxito */}
            {isSuccessModalVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 text-center space-y-4 shadow-lg">
                        <h2 className="text-2xl font-bold text-green-600">Checkout Successful!</h2>
                        <p className="text-gray-600">Your order has been placed successfully.</p>
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                            onClick={() => setIsSuccessModalVisible(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}