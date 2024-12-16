import { useContext } from "react";
import formattedTotal from "../../utils/utility";
import { useNavigate } from "react-router";
import { CartContext } from "../../context/CartContext";


export default function CardPizza({ desc, img, ingredients, name, price, id }) {
    // se toma la fn addPizzaToCart del cartContext
    const { addPizzaToCart } = useContext(CartContext);
    // sirve para navegar dentro de las paginas
    const navigate = useNavigate();


    const handleAddPizza = () => {
        addPizzaToCart({ id, name, img, price });
        alert("Pizza agregada al carrito!");
    };

    // Sirve para checar cada una de las opciones de la API
    const handleReadMore = () => {
        navigate(`/pizza/${id}`)
    }

    return (
        <div className=" max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-10">
            <img className="rounded-t-lg" src={img} alt="" />
            <div className="p-0 w-full">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {name.toUpperCase()}
                </h5>
                <p className="border-t-2 text-gray-500 font-bold">Description:</p>
                <p className="text-justify truncate">{desc}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 border-t-2">
                </p>
                <strong className="text-gray-500">Ingredients 🍕:</strong>
                <ul className="list-none">
                    {ingredients.map((i, idx) => (
                        <li key={idx} className="mb-1">{i}</li>
                    ))}
                </ul>
                <p className="mb-3 font-normal text-gray-700 border-t-2 dark:text-gray-400">
                    <span className="text-gray-500 font-bold">Price: </span> ${formattedTotal(price)}
                </p>
                <button
                    onClick={handleReadMore}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 "
                >
                    Read more ➡️
                </button>
                <button
                    onClick={handleAddPizza}
                    className="text-white bg-gray-800 hover:bg-gray-900  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mx-10"
                >
                    Add 🛒
                </button>
            </div>
        </div >

    );
}

