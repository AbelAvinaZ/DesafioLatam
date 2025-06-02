import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img
        src={post.imagen || "https://picsum.photos/200/300"}
        alt={post.titulo}
        className="w-full h-80 object-cover rounded"
      />
      <h2 className="text-xl font-semibold mt-2">{post.titulo}</h2>
      <p className="text-gray-600">${post.precio}</p>
      <Link
        to={`/posts/${post.id}`}
        className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded"
      >
        Ver Detalle
      </Link>
    </div>
  );
};

export default PostCard;
