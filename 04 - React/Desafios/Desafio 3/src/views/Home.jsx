import CardPizza from "../components/CardPizza/CardPizza";
import { pizzasData } from "../data/pizzasData";

export const Home = () => {
    // declaramos los estados


    return (
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 justify-between pt-10 pb-5 text-center">
            {pizzasData.map((pizza) => (
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