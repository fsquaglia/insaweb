"use client";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

function CardProduct({ product, category, subCategory }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Función para cambiar la imagen al hacer clic en el botón
  const handleNextImage = (e) => {
    e.stopPropagation(); // Detiene que el clic llegue al Link
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product?.docData.imagen.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="container w-72 h-fit flex flex-col justify-center bg-white shadow-lg rounded transform hover:scale-105 transition-transform duration-500 ease-in-out">
      {/*Imágenes del producto */}
      <div className="relative">
        {product && product?.docData.imagen.length > 0 && (
          <Link
            href={`/product-category/productDetail/${category}/${subCategory}/${product?.docID}`}
          >
            <Image
              src={product.docData.imagen[currentImageIndex]}
              alt={product.docData.nombre}
              width={300}
              height={300}
              className="rounded-t object-contain w-72 h-72"
              priority
            />
          </Link>
        )}
        {/*-----Botón de cambio de imagen */}
        {product?.docData.imagen.length > 1 && (
          <div className="absolute bottom-0 right-0 z-50">
            <div
              className="w-0 h-0 border-l-[50px] border-l-transparent border-b-[50px] border-b-emerald-100 flex justify-center items-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleNextImage}
            >
              <FaArrowRight />
            </div>
          </div>
        )}
      </div>

      {/*-----Nombre del producto----- */}
      <div className="p-2 text-center bg-stone-50">
        {product && <h2 className="">{product?.docData.nombre || "Equipo"}</h2>}
      </div>
    </div>
  );
}

export default CardProduct;
