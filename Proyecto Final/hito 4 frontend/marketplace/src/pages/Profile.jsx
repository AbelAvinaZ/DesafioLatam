import { useAuth } from "../context/AuthContext";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [categoriaForm, setCategoriaForm] = useState({ nombre: "" });
  const [categoriaError, setCategoriaError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/publicaciones`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const userPosts = response.data.filter(
          (post) => post.usuario_id === user.id
        );
        setPosts(userPosts);
      } catch (error) {
        setError("Error al cargar publicaciones");
        console.error(error);
      }
    };
    if (user) fetchPosts();
  }, [user]);

  const handleCategoriaSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/categorias`,
        categoriaForm,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setCategoriaError("");
      setCategoriaForm({ nombre: "" });
      alert("Categoría creada exitosamente");
    } catch (error) {
      setCategoriaError(error.response?.data || "Error al crear categoría");
    }
  };

  const handleCategoriaChange = (e) => {
    setCategoriaForm({ nombre: e.target.value });
  };

  return (
    <div className="mt-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Mi Perfil</h1>
      <div className="flex items-center mb-6">
        <div>
          <p className="text-xl font-semibold">{user?.nombre || "Usuario"}</p>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>
      <button
        onClick={() => {
          logout();
          localStorage.removeItem("token");
        }}
        className="mb-6 bg-red-500 text-white px-4 py-2 rounded"
      >
        Cerrar Sesión
      </button>
      <h2 className="text-2xl font-semibold mb-4">Crear Nueva Categoría</h2>
      <form onSubmit={handleCategoriaSubmit} className="mb-6">
        {categoriaError && (
          <p className="text-red-500 mb-4">{categoriaError}</p>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Nombre de la Categoría</label>
          <input
            type="text"
            name="nombre"
            value={categoriaForm.nombre}
            onChange={handleCategoriaChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Crear Categoría
        </button>
      </form>
      <h2 className="text-2xl font-semibold mb-4">Mis Publicaciones</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {posts.length === 0 ? (
        <p>No tienes publicaciones.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
