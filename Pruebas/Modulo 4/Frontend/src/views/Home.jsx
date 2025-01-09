import CardPizza from "../components/CardPizza/CardPizza";
import { useContext } from "react";
import { PizzaContext } from "../context/PizzaContext";

export const Home = () => {
    const { pizzaData } = useContext(PizzaContext);

    return (
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 justify-between pt-10 pb-5 text-center">
            {pizzaData.map((pizza) => (
                <CardPizza
                    key={pizza.id}
                    id={pizza.id}
                    desc={pizza.desc}
                    img={pizza.img}
                    price={pizza.price}
                    name={pizza.name}
                    ingredients={pizza.ingredients}
                />
            ))}
        </div>
    );
};