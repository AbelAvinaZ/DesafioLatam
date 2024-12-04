import { useEffect, useState } from "react";
import formattedTotal from "../../utils/utility";



export const Pizza = () => {

    const [pizza, setPizza] = useState(null);

    useEffect(() => {
        const consultAPI = async () => {
            const url = "http://localhost:5000/api/pizzas/p001";
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            // extraemos la informacion de la api
            setPizza(data);
        }
        consultAPI();
    }, []);

    // Manejo de estado inicial
    if (!pizza) {
        return <p className="text-center">Cargando pizza...</p>; // Mensaje de carga mientras esperas la respuesta
    }


    return (

        <div className="flex bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center">
            <a href="#">
                <img className="p-8 rounded-t-lg" src={pizza.img} alt="product image" />
            </a>
            <div className="px-5 pb-5">
                <a href="#">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{pizza.name.toUpperCase()}</h5>
                </a>
                <div className="flex items-center mt-2.5 mb-5">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse text-justify">
                        {pizza.desc}
                    </div>

                </div>
                <div className="text-center mb-5">
                    <h3 className="font-semibold">Ingredientes:</h3>
                    <ul className="text-gray-700 dark:text-gray-300">
                        {pizza.ingredients.map((ingredient) => (
                            <li key={pizza.id}>🍕 {ingredient}</li>
                        ))}
                    </ul>
                </div>
                <div className="flex items-center justify-evenly">
                    <span className="text-xl font-medium text-gray-900 dark:text-white">Precio: {formattedTotal(pizza.price)}</span>
                    <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart 🛒</a>
                </div>
            </div>
        </div>

    );
}