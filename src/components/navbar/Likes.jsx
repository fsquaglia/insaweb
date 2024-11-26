import { useState } from "react";
import { useSession } from "next-auth/react";
import { FaHeart } from "react-icons/fa"; //icono relleno
import { FaRegHeart } from "react-icons/fa"; //icono vacío

function Likes({}) {
  const [isLiked, setIsLiked] = useState(false);

  const handlerClickHeart = () => {
    setIsLiked(true);
  };
  return (
    <div
      className="flex items-center justify-center size-4 hover:scale-125 transition-transform duration-500 ease-in-out"
      onClick={handlerClickHeart}
    >
      <FaHeart
        className={`size-full ${isLiked ? "text-red-700" : "text-white"}`}
      />
    </div>
  );
}

export default Likes;
