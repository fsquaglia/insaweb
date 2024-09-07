import React from "react";
import Image from "next/image";

function CardComponent({ id, name, img, onclickCard, idSelected }) {
  // console.log(idSelected);

  return (
    <div
      className={`relative bg-gray-100 w-28 h-40 shadow hover:border-4 hover:border-blue-800 cursor-pointer flex flex-col overflow-hidden  ${
        idSelected === id ? "border border-2 border-blue-600" : null
      }`}
      onClick={() => onclickCard(id)}
    >
      {img ? (
        <Image
          src={img}
          alt={name}
          fill
          sizes="112px"
          className="absolute inset-0 z-0 object-cover"
        />
      ) : null}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10"
        onClick={() => onclickCard(id)}
      ></div>
      <div className="relative z-20 p-2 mt-auto text-white">
        <span className="block text-xs">{name || "¿Categoría?"}</span>
      </div>
      {id === "newCategory" && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-55">
            <span className="text-black text-2xl">+</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardComponent;
