import { useState } from "react";
import axios from "axios";
import Form from "../components/Form";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    avatar: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simular llamada a la API (usar el endpoint /api/usuarios del Hito 1)
      const response = await axios.post(
        "http://localhost:3000/api/usuarios",
        formData
      );
      console.log("Registro exitoso:", response.data);
    } catch (error) {
      console.error("Error en registro:", error);
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
    { name: "password", label: "Password", type: "password", placeholder: "" },
    {
      name: "avatar",
      label: "Avatar URL",
      type: "url",
      placeholder: "https://example.com/avatar.jpg",
    },
  ];

  return (
    <Form
      fields={fields}
      onSubmit={handleSubmit}
      buttonText="Registrarme"
      linkTo="/login"
      linkText="Volver"
      onChange={handleChange}
    />
  );
};

export default Register;
