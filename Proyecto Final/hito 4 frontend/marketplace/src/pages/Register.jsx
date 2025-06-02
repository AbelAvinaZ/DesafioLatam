import { useState } from "react";
import axios from "axios";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    contrasena: "",
    direccion: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/usuarios`,
        formData
      );
      console.log("Registro exitoso:", response.data);
      setError("");
      navigate("/login");
    } catch (error) {
      setError(error.response?.data || "Error al registrarse");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fields = [
    { name: "nombre", label: "Nombre", type: "text", placeholder: "Tu nombre" },
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
    {
      name: "direccion",
      label: "Dirección",
      type: "text",
      placeholder: "Calle 123",
    },
  ];

  return (
    <div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <Form
        fields={fields}
        onSubmit={handleSubmit}
        buttonText="Registrarme"
        linkTo="/login"
        linkText="¿Ya tienes cuenta? Inicia sesión"
        onChange={handleChange}
      />
    </div>
  );
};

export default Register;
