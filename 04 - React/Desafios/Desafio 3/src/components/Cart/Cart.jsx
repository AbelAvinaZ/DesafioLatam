import { useState } from "react";
import { pizzaCart } from "../../data/pizzasData";
import formattedTotal from "../../utils/utility";

export const Cart = () => {

    // declaramos estados
    const [cart, setCart] = useState(pizzaCart);


    // Función para incrementar la cantidad de un ítem
    const handleIncrement = (id) => { //buscamos el item con el id especifico y aumenta su contador
        setCart(cart.map((pizza) =>
            pizza.id === id
                ? { ...pizza, count: pizza.count + 1 }
                : pizza
        ));
    };


    // Función para decrementar la cantidad de un ítem y eliminar el div si llega a 0
    const handleDecrement = (id) => {
        setCart(cart
            .map((pizza) =>
                pizza.id === id
                    ? { ...pizza, count: pizza.count - 1 }
                    : pizza
            )
            .filter((pizza) => pizza.count > 0) // Elimina el ítem si su contador es 0
        );
    };


    // Calcular el total de la orden
    const orderTotal = cart.reduce((total, pizza) => total + pizza.price * pizza.count, 0);


    return (
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>

                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                        <div className="space-y-6">
                            {cart.map((pizza) => (
                                <div key={pizza.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                        <a href="#" className="shrink-0 md:order-1">
                                            <img className="h-20 w-20 dark:hidden" src={pizza.img} alt="imac image" />
                                        </a>
                                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                                            <div className="flex items-center">
                                                <button
                                                    type="button"
                                                    onClick={() => handleDecrement(pizza.id)}
                                                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                                    ➖
                                                </button>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value={pizza.count}
                                                    className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleIncrement(pizza.id)}
                                                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
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
                                                <button type="button" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                                                    ♥️ Add to Favorites
                                                </button>

                                                <button type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
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
                        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                            <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>
                            <div className="space-y-4">
                                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                    <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                                    <dd className="text-base font-bold text-gray-900 dark:text-white">{formattedTotal(orderTotal)}</dd>
                                </dl>
                            </div>
                            <a href="#" className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Checkout</a>
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                                <a href="#" title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                                    Continue Shopping ➡️
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}