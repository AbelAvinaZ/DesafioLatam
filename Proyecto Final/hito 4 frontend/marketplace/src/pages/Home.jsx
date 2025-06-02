import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState("");

  // Obtener publicaciones del backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/publicaciones`
        );
        // Limitar a 3 publicaciones
        setPosts(response.data.slice(0, 3));
        setError("");
      } catch (error) {
        setError("Error al cargar publicaciones destacadas");
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  // Movimiento automático del carrusel
  useEffect(() => {
    if (posts.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
      }, 5000); // Cambia cada 5 segundos
      return () => clearInterval(interval);
    }
  }, [posts]);

  return (
    <div className="mt-10 text-center">
      <h1 className="text-4xl font-bold mb-4">Bienvenido al Marketplace</h1>
      <p className="text-lg text-gray-600 mb-6">
        Explora miles de productos únicos
      </p>

      {/* Carrusel */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {posts.length === 0 && !error ? (
        <p className="text-gray-600 mb-6">No hay publicaciones disponibles.</p>
      ) : (
        <div className="relative w-full max-w-4xl mx-auto mb-8 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {posts.map((post) => (
              <div key={post.id} className="w-full flex-shrink-0 mb-3">
                <PostCard post={post} />
              </div>
            ))}
          </div>
          {/* Indicadores */}
          {posts.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {posts.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentIndex ? "bg-blue-500" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                ></button>
              ))}
            </div>
          )}
        </div>
      )}

      <Link
        to="/posts"
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
      >
        Explorar Productos
      </Link>
    </div>
  );
};

export default Home;
