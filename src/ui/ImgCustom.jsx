"use client";
import { CldUploadWidget } from "next-cloudinary";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Swal from "sweetalert2";

const nameCommerce = process.env.NEXT_PUBLIC_NAME_COMMERCE;

export default function ImgCustom({
  img,
  section,
  urlImgReturn,
  imageFormat = "cuadrado", // cuadrado, apaisado, vertical
}) {
  let imageStyle;
  switch (imageFormat) {
    case "apaisado":
      imageStyle = { width: 600, height: 384 };
      break;
    case "vertical":
      imageStyle = { width: 384, height: 538 };
      break;
    default:
      imageStyle = { width: 384, height: 384 };
      break;
  }

  const [imageUrl, setImageUrl] = useState(img);

  // Si cambia la prop `img`, actualizamos el estado también
  useEffect(() => {
    setImageUrl(img);
  }, [img]);

  return (
    <CldUploadWidget
      uploadPreset="tspeblqq"
      options={{
        folder: section,
        multiple: false,
        sources: ["local", "url", "camera"],
        maxFileSize: 1 * 1024 * 1024, // 5MB como ejemplo
        resource_type: "image",
      }}
      onSuccess={(result) => {
        // console.log("✅ Imagen subida a Cloudinary:", result?.info?.secure_url);
        const url = result?.info?.secure_url || "";
        urlImgReturn(url);
        setImageUrl(url);
      }}
    >
      {({ open }) => {
        return (
          <div
            className="relative bg-gray-200 shadow-lg flex justify-center items-center "
            style={{ ...imageStyle, overflow: "hidden", position: "relative" }}
            // onClick={openWidget}
          >
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={`${nameCommerce} ${section}`}
                fill
                sizes={`${imageStyle.width}px`}
                className="absolute inset-0 z-0 object-contain"
              />
            )}
            <button
              className="rounded-xl p-2 bg-blue-400 absolute bottom-2 right-2 z-10 text-slate-100"
              onClick={() => open()}
            >
              Imagen
            </button>
          </div>
        );
      }}
    </CldUploadWidget>
  );
}
