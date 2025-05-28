import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Form from "../components/Form";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        formData
      );
      login(response.data.usuario);
      navigate("/profile");
    } catch (error) {
      console.error("Error en login:", error);
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
  ];

  return (
    <Form
      fields={fields}
      onSubmit={handleSubmit}
      buttonText="Iniciar Sesión"
      linkTo="/register"
      linkText="Volver"
      onChange={handleChange}
    />
  );
};

export default Login;
