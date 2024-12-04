import { useEffect, useState } from "react";
import CardPizza from "../components/CardPizza/CardPizza";
// import { pizzasData } from "../data/pizzasData";

export const Home = () => {

    const [pizzaData, setPizzaData] = useState([]);

    useEffect(() => {

        // consultamos la api dentro del ue 
        const consultApi = async () => {
            const url = "http://localhost:5000/api/pizzas";
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            
            // extraemos la informacion de la api
            const selectedPizzas = data.map((pizza) => ({
                name: pizza.name,
                key: pizza.id,
                desc: pizza.desc,
                img: pizza.img,
                price: pizza.price,
                ingredients: pizza.ingredients,
            }))

            // actualizamos el estado con los datos de las pizzas
            setPizzaData(selectedPizzas);
        }

        // llamamos la fn que consume la API al momento de montar el componente
        consultApi();
    }, [pizzaData]);



    return (
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 justify-between pt-10 pb-5 text-center">
            {pizzaData.map((pizza) => (
                <CardPizza
                    key={pizza.id}
                    desc={pizza.desc}
                    img={pizza.img}
                    price={pizza.price}
                    name={pizza.name.toUpperCase()}
                    ingredients={pizza.ingredients}
                />
            ))}
        </div>
    );
}