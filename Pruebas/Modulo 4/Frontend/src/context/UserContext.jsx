import axios from "axios";
import { createContext, useContext, useState } from "react";
import { CartContext } from "./CartContext";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const { clearCart, saveCartForUser, loadCartForUser } = useContext(CartContext);

    const login = async (email, password) => {

        //we sent only the values on email and pass, because they are not full objects
        const res = await axios.post("http://localhost:5000/api/auth/login", {
            email: email.value,
            password: password.value,
        });
        // Guardar token y establece el usuario actual
        localStorage.setItem("token", res.data.token);
        setUser({ email });

        // Cargar carrito del usuario si existe
        loadCartForUser(email);
    };

    const register = async (email, password) => {
        const res = await axios.post("http://localhost:5000/api/auth/register", { email, password });
        return res.data;
    };

    const logout = () => {
        if (user?.email) {
            saveCartForUser(user.email); // Guarda el carrito del usuario en localStorage
        }
        localStorage.removeItem("token"); // Borra el token
        setUser(null); // Limpia el usuario actual
        clearCart(); // Limpia el carrito en memoria
    };

    const fetchProfile = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            const res = await axios.get("http://localhost:5000/api/auth/me", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser({ email: res.data.email });
        }
    };


    return (
        <UserContext.Provider value={{ user, login, register, logout, fetchProfile }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;