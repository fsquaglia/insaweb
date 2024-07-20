import React from "react";
import Image from "next/image";

function ImgCustom({ img }) {
  return (
    <div className="w-96 h-96 bg-gray-200 rounded-lg shadow-lg">
      <Image
        src={img}
        alt={`Ihara & London ${img}`}
        width={384}
        height={384}
        className="w-96 h-96 object-cover"
      />
    </div>
  );
}

export default ImgCustom;
