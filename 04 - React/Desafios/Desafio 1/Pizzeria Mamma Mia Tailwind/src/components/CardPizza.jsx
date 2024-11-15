import formattedTotal from "../utils/utility";


export default function CardPizza({ name, price, ingredients, img }) {
    return (

        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-10">
            <img className="rounded-t-lg" src={img} alt="" />
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {name}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 border-t-2">
                    <strong className="text-gray-500">Ingredients 🍕:</strong>
                    <ul className="list-none">
                        {ingredients.map((i, index) => (
                            <li key={index} className="mb-1">{i}</li>
                        ))}
                    </ul>
                </p>
                <p className="mb-3 font-normal text-gray-700 border-t-2 dark:text-gray-400">
                    Price ${formattedTotal(price)}
                </p>
                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
                <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mx-10 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                    Add 🛒
                </button>
            </div>
        </div>

    );
}

