import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Simular llamada a la API (usar /api/publicaciones del Hito 1)
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/publicaciones"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error al cargar publicaciones:", error);
        // Datos simulados como respaldo
        setPosts([
          {
            id: 1,
            title: "Producto 1",
            price: 100,
            image: "https://picsum.photos/200/300",
          },
          {
            id: 2,
            title: "Producto 2",
            price: 200,
            image: "https://picsum.photos/200/300",
          },
        ]);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        Galería de Publicaciones
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
