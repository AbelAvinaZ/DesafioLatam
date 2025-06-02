import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/publicaciones`
        );
        setPosts(response.data);
        setError("");
      } catch (error) {
        setError("Error al cargar publicaciones");
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        Galería de Publicaciones
      </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {posts.length === 0 && !error ? (
        <p className="text-center">No hay publicaciones disponibles.</p>
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

export default Posts;
