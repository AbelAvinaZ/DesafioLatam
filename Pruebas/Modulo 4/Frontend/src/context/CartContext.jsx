import { createContext, useEffect, useState } from "react";

// creamos el context
export const CartContext = createContext();
// proveedor del context
const CartProvider = ({ children }) => {
    const [pizzaCart, setPizzaCart] = useState([]);

    // Cargar el carrito del localStorage al iniciar
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setPizzaCart(storedCart);
    }, []);

    // Guardar el carrito en localStorage cada vez que cambia
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(pizzaCart));
    }, [pizzaCart]);

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

    // Función para decrementar la cantidad de un ítem y eliminar el div si llega a 0
    const decreasePizzaFromCart = (id) => {
        setPizzaCart((prevCart) =>
            prevCart
                .map((pizza) =>
                    pizza.id === id ? { ...pizza, count: pizza.count - 1 } : pizza
                )
                .filter((pizza) => pizza.count > 0)
        );
    };

    // Función para eliminar una pizza
    const removePizzaFromCart = (id) => {
        setPizzaCart((prevCart) =>
            prevCart.filter((pizza) => pizza.id !== id)
        );
    };

    // limpiar carrito
    const clearCart = () => {
        setPizzaCart([]);
        localStorage.removeItem("cart"); // Limpia el carrito global
    };

    // guardar carrito para la sesion
    const saveCartForUser = (email) => {
        if (typeof email === "string" && email.trim() !== "") {
            localStorage.setItem(`cart_${email}`, JSON.stringify(pizzaCart));
        }
    };

    // cargar carrito para la sesion
    const loadCartForUser = (email) => {
        const storedCart = JSON.parse(localStorage.getItem(`cart_${email}`)) || [];
        setPizzaCart(storedCart);
    };


    return (
        <CartContext.Provider
            value={{
                pizzaCart,
                addPizzaToCart,
                removePizzaFromCart,
                decreasePizzaFromCart,
                clearCart,
                saveCartForUser,
                loadCartForUser,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;


