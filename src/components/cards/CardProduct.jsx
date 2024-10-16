import React, { useState } from "react";
import { FaRegHeart, FaHeart, FaArrowRight } from "react-icons/fa";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

function CardProduct({ product, category, subCategory }) {
  const { data: session, status } = useSession();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  console.log(product);

  // Función para cambiar la imagen al hacer clic en el botón
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product?.docData.imagen.length - 1 ? 0 : prevIndex + 1
    );
  };

  //handle click corazzón de Like en producto
  const handleLikeProduct = () => {
    if (!session) {
      alert("Debes iniciar sesión para marcar un producto como favorito");
      return;
    }
    //!continuar con la lógica para saber si ya marcó este producto como favorito
  };

  return (
    <div className="container w-72  flex justify-center">
      <div className="bg-white  shadow-lg  rounded transform hover:scale-105 duration-300 ease-in-out">
        {/*Imágenes del producto y LIKE */}
        <div className="relative">
          {/* <span className="absolute top-0 left-0 bg-yellow-500 text-white text-xs font-semibold py-1 px-2 rounded-br">
            New
          </span> */}

          <FaRegHeart
            className="absolute top-0 right-0 m-2 cursor-pointer text-gray-500"
            size={25}
          />
          {product && product?.docData.imagen.length > 0 && (
            <Image
              src={product.docData.imagen[currentImageIndex]}
              alt={product.docData.nombre}
              width={300}
              height={300}
              className="rounded-t"
              objectFit="cover"
            />
          )}
        </div>
        {/*-----Botón de cambio de imagen */}
        {product?.docData.imagen.length > 1 && (
          <div className="flex justify-around w-full transform -translate-y-5 px-4">
            <div
              className="rounded-full shadow w-10 h-10 flex justify-center items-center bg-gray-100 cursor-pointer"
              onClick={handleNextImage}
            >
              <FaArrowRight />
            </div>
          </div>
        )}

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
          <p className="font-light text-gray-500 text-lg my-2">29,99 &euro;</p>
          {/*Detalle del producto */}
          {product && (
            <p className="text-slate-600">
              {product?.docData.detalle.length > 60
                ? product?.docData.detalle.slice(0, 60) + "..."
                : product?.docData.detalle}
            </p>
          )}
          {/*Marca del producto */}

          {product && (
            <p className="bg-gray-600 font-light text-slate-50 text-md my-2 mx-4 py-2 rounded">
              {product?.docData.marca}
            </p>
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
