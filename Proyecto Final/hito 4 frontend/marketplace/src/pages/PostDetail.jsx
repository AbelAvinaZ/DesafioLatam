import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/publicaciones/${id}`
        );
        setPost(response.data);
        setError("");
      } catch (error) {
        setError("Error al cargar publicación");
        console.error(error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post && !error) return <div>Cargando...</div>;

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="mt-10 max-w-4xl mx-auto grid justify-center text-center">
      <h1 className="text-3xl font-bold mb-4">{post.titulo}</h1>
      <img
        src={post.imagen}
        alt={post.titulo}
        className="w-96 h-96 object-cover rounded"
      />
      <p className="text-2xl text-gray-700 mt-4">${post.precio}</p>
      <p className="mt-4">{post.descripcion}</p>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Enviar mensaje al vendedor
      </button>
    </div>
  );
};

export default PostDetail;
