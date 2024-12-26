import { createContext, useState, useEffect } from "react";

// Crear el contexto
export const PizzaContext = createContext();

export const PizzaProvider = ({ children }) => {
    const [pizzaData, setPizzaData] = useState([]);

    // Consumir la API
    useEffect(() => {
        const consultApi = async () => {
            try {
                const url = "http://localhost:5000/api/pizzas";
                const response = await fetch(url);
                const data = await response.json();

                // Formatear los datos
                const selectedPizzas = data.map((pizza) => ({
                    name: pizza.name,
                    id: pizza.id,
                    desc: pizza.desc,
                    img: pizza.img,
                    price: pizza.price,
                    ingredients: pizza.ingredients,
                }));

                setPizzaData(selectedPizzas);
            } catch (error) {
                console.error("Error fetching pizzas:", error);
            }
        };
        // llamamos la fn que consume la API al momento de montar el componente
        consultApi();
    }, []);

    return (
        <PizzaContext.Provider value={{ pizzaData }}>
            {children}
        </PizzaContext.Provider>
    );
};
