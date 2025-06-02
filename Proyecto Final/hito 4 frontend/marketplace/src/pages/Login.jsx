import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Form from "../components/Form";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", contrasena: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        formData
      );
      login(response.data.usuario);
      localStorage.setItem("token", response.data.token);
      setError("");
      navigate("/profile");
    } catch (error) {
      setError(error.response?.data || "Error al iniciar sesión");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "name@example.com",
    },
    {
      name: "contrasena",
      label: "Contraseña",
      type: "password",
      placeholder: "",
    },
  ];

  return (
    <div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <Form
        fields={fields}
        onSubmit={handleSubmit}
        buttonText="Iniciar Sesión"
        linkTo="/register"
        linkText="¿No tienes cuenta? Regístrate"
        onChange={handleChange}
      />
    </div>
  );
};

export default Login;
