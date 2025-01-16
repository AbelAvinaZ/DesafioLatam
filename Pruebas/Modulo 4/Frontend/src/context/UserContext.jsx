import axios from "axios";
import { createContext, useContext, useState } from "react";
import { CartContext } from "./CartContext";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const { clearCart, saveCartForUser, loadCartForUser } = useContext(CartContext);

    /**
     * Método para iniciar sesión
     * @param {string} email - Correo electrónico del usuario
     * @param {string} password - Contraseña del usuario
     */

    const login = async (email, password) => {
        try {

            //we sent only the values on email and pass, because they are not full objects
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email: email.value,
                password: password.value,
            });
            // Guardar token y establece el usuario actual
            localStorage.setItem("token", res.data.token);
            setUser({ email });

            clearCart();

            // Obtiene el carrito global y el carrito del usuario
            const globalCart = JSON.parse(localStorage.getItem("cart")) || [];
            const userCart = JSON.parse(localStorage.getItem(`cart_${email}`)) || [];

            // Combina los carritos global y del usuario
            const combinedCart = [...userCart, ...globalCart];

            // Elimina duplicados (por ID) y actualiza las cantidades
            const uniqueCart = combinedCart.reduce((acc, item) => {
                const existingItem = acc.find((cartItem) => cartItem.id === item.id);
                if (existingItem) {
                    existingItem.count += item.count;
                } else {
                    acc.push(item);
                }
                return acc;
            }, []);

            // Guarda el carrito combinado bajo la clave del usuario
            localStorage.setItem(`cart_${email}`, JSON.stringify(uniqueCart));

            // Limpia el carrito global
            localStorage.removeItem("cart");

            // Carga el carrito del usuario en el estado global
            loadCartForUser(email);
        } catch (error) {
            console.error("Error during login:", error);
            throw error; // Reenvía el error al componente que lo llame

        }
    };


    /**
         * Método para registrar un usuario
         * @param {string} email - Correo electrónico del usuario
         * @param {string} password - Contraseña del usuario
         */

    const register = async (email, password) => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                email,
                password,
            });

            // Guardar token y establecer el usuario registrado
            localStorage.setItem("token", res.data.token);
            setUser({ email });

            // Inicializar el carrito del usuario en localStorage
            localStorage.setItem(`cart_${email}`, JSON.stringify([]));
        } catch (error) {
            console.error("Error during registration:", error);
            throw error; // Reenvía el error al componente que lo llame
        }
    };

    const logout = () => {
        if (user?.email) {
            saveCartForUser(user.email); // Guarda el carrito del usuario en localStorage
        }
        localStorage.removeItem("token"); // Borra el token
        setUser(null); // Limpia el usuario actual
        clearCart(); // Limpia el carrito en memoria
    };

    /**
     * Método para obtener el perfil del usuario autenticado
     */
    const fetchProfile = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const res = await axios.get("http://localhost:5000/api/auth/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser({ email: res.data.email });
                loadCartForUser(res.data.email); // Cargar carrito del usuario al recuperar perfil
            } catch (error) {
                console.error("Error fetching profile:", error);
                logout(); // Si el token es inválido, cerramos sesión
            }
        }
    };

    return (
        <UserContext.Provider value={{ user, login, register, logout, fetchProfile }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;