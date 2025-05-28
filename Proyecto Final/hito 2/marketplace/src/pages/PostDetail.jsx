import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/publicaciones/${id}`
        );
        setPost(response.data);
      } catch (error) {
        console.error("Error al cargar publicación:", error);
        setPost({
          id,
          title: "Producto Ejemplo",
          price: 100,
          description: "Descripción",
          image: "https://picsum.photos/200/300",
        });
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <div>Cargando...</div>;

  return (
    <div className="mt-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-64 object-cover rounded"
      />
      <p className="text-2xl text-gray-700 mt-4">${post.price}</p>
      <p className="mt-4">{post.description}</p>
      <div className="mt-4 h-64 bg-gray-200 rounded">Mapa (Placeholder)</div>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Enviar mensaje al vendedor
      </button>
    </div>
  );
};

export default PostDetail;
