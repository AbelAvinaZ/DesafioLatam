import { useAuth } from "../context/AuthContext";
import PostCard from "../components/PostCard";

const Profile = () => {
  const { user, logout } = useAuth();
  const posts = [
    {
      id: 1,
      title: "Mi Producto",
      price: 150,
      image: "https://picsum.photos/200/300",
    },
  ]; // Simulado, reemplazar con API

  return (
    <div className="mt-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Mi Perfil</h1>
      <div className="flex items-center mb-6">
        <img
          src={user?.avatar || "https://picsum.photos/200/300"}
          alt="Avatar"
          className="w-24 h-24 rounded-full mr-4"
        />
        <div>
          <p className="text-xl font-semibold">{user?.nombre || "Usuario"}</p>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>
      <button
        onClick={logout}
        className="mb-6 bg-red-500 text-white px-4 py-2 rounded"
      >
        Cerrar Sesión
      </button>
      <h2 className="text-2xl font-semibold mb-4">Mis Publicaciones</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
