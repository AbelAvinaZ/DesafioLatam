import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="mt-10 text-center">
      <h1 className="text-4xl font-bold mb-4">Bienvenido al Marketplace</h1>
      <p className="text-lg text-gray-600 mb-6">
        Explora miles de productos únicos
      </p>
      <Link to="/posts" className="bg-blue-500 text-white px-6 py-3 rounded-lg">
        Explorar Productos
      </Link>
    </div>
  );
};

export default Home;
