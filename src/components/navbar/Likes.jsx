"use client";
import {
  getDocumentById,
  updateDocInCollection,
} from "@/utils/firebase/fetchFirebase";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import Swal from "sweetalert2";
import { Puff } from "react-loader-spinner";

function Likes({ session, status }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCommerce, setLikesCommerce] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  //obtener listado de likes de comercio
  async function fetchLikes() {
    try {
      const response = await fetch("/api/likeCommerce", {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Error al obtener los likes");
      }
      const data = await response.json();
      setLikesCommerce(data);
    } catch (error) {
      console.error("Error en componente: ", error);
      setLikesCommerce(null);
    }
  }

  useEffect(() => {
    fetchLikes();
  }, []);
  useEffect(() => {
    const fetchUser = async () => {
      const cachedUser = localStorage.getItem("userData");

      if (cachedUser) {
        setIsLiked(JSON.parse(cachedUser)?.meGustaCommerce || false);
      } else {
        try {
          const user = await getDocumentById("contactos", session?.user?.id);
          localStorage.setItem("userData", JSON.stringify(user));
          setIsLiked(user?.meGustaCommerce || false);
        } catch (error) {
          console.error("Error obteniendo likes usuario: ", error);
          setIsLiked(false);
        }
      }
    };

    session && status === "authenticated" && fetchUser();
  }, [session, status]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center size-4">
        <Puff
          height="30"
          width="30"
          color="#4fa94d"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  const handlerClickHeart = async () => {
    if (!session && status === "unauthenticated") {
      Swal.fire({
        position: "center",
        icon: "question",
        title: "Loguéate para interactuar con nosotros",
        showConfirmButton: true,
        timer: 3000,
      });
      return;
    }
    if (isLiked) return;

    const newLikes = {
      count: (likesCommerce?.count || 0) + 1, // Asegura que count sea al menos 0
      likesUsers: [
        ...(likesCommerce?.likesUsers || []), // Asegura que likesUsers sea un array vacío si es undefined
        {
          name: session?.user?.name || "Anónimo",
          image: session?.user?.image || "",
          dateLike: Timestamp.fromDate(new Date()),
        },
      ],
    };

    try {
      //actualizar los likes en el comercio
      const response = await updateDocInCollection(
        "commerce",
        "likesCommerce",
        newLikes
      );
      //actualizar meGusta en el usuario
      await updateDocInCollection("contactos", session?.user?.id, {
        meGustaCommerce: true,
      });

      setLikesCommerce(response);
      setIsLiked(true);
      const updatedUser = {
        ...session?.user,
        meGustaCommerce: true,
      };
      localStorage.setItem("userData", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error en Like: ", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error al dar like",
        showConfirmButton: true,
        timer: 3000,
      });
    }
  };

  const handleMouseEnter = () => {
    setTimeout(() => setShowPopup(true), 300);
  };

  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  return (
    <div className="relative inline-block">
      {/* Ícono de Like */}
      <div
        className="flex items-center justify-center size-4 hover:scale-125 transition-transform duration-500 ease-in-out"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handlerClickHeart}
      >
        {isLiked ? (
          <FaHeart className="text-red-700 text-2xl" />
        ) : (
          <FaHeart className="text-gray-400 text-2xl" />
        )}
      </div>

      {/* Popup dinámico con delay y transición */}
      <div
        className={`w-auto max-w-lg border absolute bg-gray-800 text-white text-sm p-2 rounded-md shadow-lg transition-opacity duration-300 ${
          showPopup ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          top: "100%", // Coloca el popup debajo del corazón
          left: "100%", // Coloca el popup a la derecha del corazón
          marginTop: "0.25rem",
          marginLeft: "0.25rem",
        }}
      >
        <div>
          {likesCommerce?.count ? (
            <div className="flex flex-row items-center gap-1 w-40">
              <FaHeart className="text-red-600 text-md shrink-0" />
              <span className="text-md">{likesCommerce?.count}</span>

              {likesCommerce?.likesUsers?.length > 0 && (
                <div className="flex-grow grow">
                  <div className="flex flex-row -space-x-2 w-auto">
                    {likesCommerce?.likesUsers
                      ?.slice(0, 10)
                      .map((user, index) => (
                        <img
                          key={index}
                          src={
                            user?.image ||
                            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj4KICA8Y2lyY2xlIGN4PSIyNSIgY3k9IjI1IiByPSIyNSIgZmlsbD0iI2NjYyIgLz4KICA8Y2lyY2xlIGN4PSIyNSIgY3k9IjE4IiByPSIxMCIgZmlsbD0iI2ZmZiIgLz4KICA8ZWxsaXBzZSBjeD0iMjUiIGN5PSI0MCIgcng9IjE1IiByeT0iMTAiIGZpbGw9IiNmZmYiIC8+Cjwvc3ZnPg=="
                          }
                          alt={`Avatar ${user?.name || "Usuario"}`}
                          className="size-6 rounded-full border border-slate-100"
                        />
                      ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="whitespace-nowrap">¡Danos el primer Like!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Likes;
