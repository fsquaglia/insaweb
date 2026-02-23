"use client";
import Image from "next/image";
import { useState } from "react";

export default function CardImage({ images = [], altText = "Producto" }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const urlGenericImage =
    "https://res.cloudinary.com/foodexpressimg/image/upload/v1755090679/insarafaela/generic01_ozlb5m.png";

  const imageList = images.length > 0 ? images : [urlGenericImage];
  const currentImage = imageList[selectedIndex];

  return (
    <div className=" flex flex-col justify-center items-center h-full">
      {/* Imagen principal */}
      <div className="w-full h-full flex justify-center items-center mb-4">
        <Image
          src={currentImage}
          alt={`Imagen de ${altText}`}
          width={600}
          height={600}
          className="sm:rounded-lg object-contain aspect-square"
          priority
        />
      </div>

      {/* Miniaturas */}
      {imageList.length > 1 && (
        <div className="flex gap-3 overflow-x-auto w-full h-full justify-center">
          {imageList.map((imgUrl, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`flex-shrink-0 w-20 h-20 flex justify-center items-center rounded-lg transition-all ${
                selectedIndex === index
                  ? "border-2 border-blue-500 bg-blue-50"
                  : "border-2 border-gray-200 hover:border-gray-300"
              }`}
              aria-label={`Ver imagen ${index + 1}`}
            >
              <Image
                src={imgUrl}
                alt={`Miniatura ${index + 1}`}
                width={100}
                height={100}
                className="object-contain aspect-square"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
