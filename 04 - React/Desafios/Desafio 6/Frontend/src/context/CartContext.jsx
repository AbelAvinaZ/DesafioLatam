import { createContext, useState } from "react";

// creamos el context
export const CartContext = createContext();
// proveedor del context
const CartProvider = ({ children }) => {
    const [pizzaCart, setPizzaCart] = useState([]);

    // Función para agregar una pizza
    const addPizzaToCart = (pizza) => {
        setPizzaCart((prevCart) => {
            const existingPizza = prevCart.find((item) => item.id === pizza.id);
            if (existingPizza) {
                return prevCart.map((item) =>
                    item.id === pizza.id
                        ? { ...item, count: item.count + 1 }
                        : item
                );
            }
            return [...prevCart, { ...pizza, count: 1 }];
        });
    };

    // Función para eliminar una pizza
    const removePizzaFromCart = (id) => {
        setPizzaCart((prevCart) =>
            prevCart.filter((pizza) => pizza.id !== id)
        );
    };

    return (
        <CartContext.Provider
            value={{
                pizzaCart,
                addPizzaToCart,
                removePizzaFromCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;


