import { useEffect, useState } from "react";
import { useParams } from "react-router";
import formattedTotal from "../../utils/utility";



export const Pizza = () => {

    const [pizza, setPizza] = useState(null);
    // sirve para poder hacer dinamica la url 
    const { id } = useParams();

    useEffect(() => {
        const consultAPI = async () => {
            try {
                const url = `http://localhost:5000/api/pizzas/${id}`;
                const response = await fetch(url);
                const data = await response.json();
                console.log(data);
                // extraemos la informacion de la api
                setPizza(data);
            }

            catch (error) {
                console.log(error)
            }
        }
        consultAPI();
    }, [id]);

    // Manejo de estado inicial
    if (!pizza) {
        return <p className="text-center">Loading pizza...</p>; // Mensaje de carga mientras esperas la respuesta
    }


    return (

        <div className="flex items-center justify-center min-h-screen  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center">
            <div className="flex flex-col max-w-3xl rounded-lg border border-gray-500 shadow-lg dark:bg-gray-800  dark:border-gray-700 bg-white mt-5 ">
                <img className="p-8 rounded-t-lg" src={pizza.img} alt="product image" />
                <div className="px-5 pb-5">
                    <a href="#">
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-t-2">{pizza.name.toUpperCase()}</h5>
                    </a>
                    <div className="flex items-center mt-2.5 mb-5">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse text-justify border-t-2">
                            {pizza.desc}
                        </div>

                    </div>
                    <div className="text-center mb-5">
                        <h3 className="font-semibold border-t-2">Ingredients 🍕:</h3>
                        <ul className="text-gray-700 dark:text-gray-300 list-none">
                            {pizza.ingredients.map((ingredient) => (
                                <li key={pizza.id}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex items-center justify-evenly border-t-2 pt-2">
                        <span className="text-xl font-medium text-gray-900 dark:text-white">Price: {formattedTotal(pizza.price)}</span>
                        <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart 🛒</a>
                    </div>
                </div>
            </div>
        </div>

    );
}