import React, { useState } from "react";
import { FaRegHeart, FaHeart, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

function CardProduct({
  product,
  category,
  subCategory,
  isLiked,
  likesCount,
  onToggleLike,
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Función para cambiar la imagen al hacer clic en el botón
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product?.docData.imagen.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="container w-72  flex justify-center h-fit">
      <div className="bg-white  shadow-lg  rounded transform hover:drop-shadow-xl hover:shadow-emerald-200  duration-500 ease-in-out">
        {/*Imágenes del producto y LIKE */}
        <div className="relative">
          {/* <span className="absolute top-0 left-0 bg-yellow-500 text-white text-xs font-semibold py-1 px-2 rounded-br">
            New
          </span> */}

          {likesCount > 0 && (
            <div className="absolute top-0 left-0 text-sm font-semibold m-2 flex flex-row items-center h-8 gap-1">
              <span className="text-slate-500">{likesCount}</span>
              <FaHeart className="text-red-500" />
            </div>
          )}
          <div className="absolute top-0 right-0 m-2 flex flex-row items-center justify-center h-8 text-lg">
            <button
              onClick={() =>
                onToggleLike(
                  product?.docID,
                  product?.docData?.nombre,
                  product?.docData?.imagen[0]
                )
              }
            >
              {isLiked ? "💖" : "🤍"}
            </button>
          </div>

          {product && product?.docData.imagen.length > 0 && (
            <Image
              src={product.docData.imagen[currentImageIndex]}
              alt={product.docData.nombre}
              width={300}
              height={300}
              className="rounded-t object-cover"
              priority
            />
          )}
          {/*-----Botón de cambio de imagen */}
          {product?.docData.imagen.length > 1 && (
            <div className="absolute bottom-0 right-0">
              <div
                className="w-0 h-0 border-l-[50px] border-l-transparent border-b-[50px] border-b-emerald-100 flex justify-center items-center  cursor-pointer"
                onClick={handleNextImage}
              >
                <FaArrowRight />
              </div>
            </div>
          )}
        </div>

        {/*-----Datos del producto----- */}
        <div className="p-2 text-center">
          {/*Nombre de producto */}
          <Link
            href={`/product-category/productDetail/${category}/${subCategory}/${product?.docID}`}
          >
            {product && (
              <h2 className="text-lg uppercase">{product?.docData.nombre}</h2>
            )}
          </Link>
          {/*Precio de producto */}
          {/* <p className="font-light text-gray-500 text-lg my-2">29,99 &euro;</p> */}
          {/*Detalle del producto */}
          {/* {product && (
            <p className="text-slate-600">
              {product?.docData.detalle.length > 60
                ? product?.docData.detalle.slice(0, 60) + "..."
                : product?.docData.detalle}
            </p>
          )} */}
        </div>
        <div>
          {/*Marca del producto */}
          {product && (
            <div className=" text-center bg-emerald-200 font-light text-slate-500 text-md w-full p-2">
              {product?.docData.marca}
            </div>
          )}

          {/* <a
            href="#"
            className="block bg-gray-300 py-2 px-2 text-gray-600 text-center rounded shadow-lg uppercase font-light mt-6 hover:bg-gray-400 hover:text-white duration-300 ease-in-out"
          >
            Add to cart
          </a> */}
        </div>
      </div>
    </div>
  );
}

export default CardProduct;
