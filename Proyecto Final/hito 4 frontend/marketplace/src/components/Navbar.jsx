import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:underline">
            Inicio
          </Link>
        </li>
        <li>
          <Link to="/posts" className="hover:underline">
            Publicaciones
          </Link>
        </li>
        {!user ? (
          <>
            <li>
              <Link to="/register" className="hover:underline">
                Registro
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/profile" className="hover:underline">
                Mi Perfil
              </Link>
            </li>
            <li>
              <Link to="/create-post" className="hover:underline">
                Crear Publicación
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  logout();
                  localStorage.removeItem("token");
                }}
                className="hover:underline"
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
