import React, { useRef } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import validateImage from "@/utils/ImageValidator";
import { imgSizing } from "@/utils/SettingSizing";
import { setImageStorage } from "@/utils/firebase/fetchFirebase";
import { setImageCloudinary } from "@/utils/firebase/fetchCloudinary";

//Nombre del comercio
const nameCommerce = process.env.NEXT_PUBLIC_NAME_COMMERCE;

export default function ImgCustom({
  img,
  section,
  urlImgReturn,
  folderStorage,
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

  // Si recibe folderStorage guarda la imagen en esa carpeta, si no guarda la imagen en la carpeta section

  const fileInputRef = useRef(null);
  // restricciones de img extraídas de SettingSizing
  const {
    minWidthAccepted,
    maxWidthAccepted,
    minHeightAccepted,
    maxHeigthAccepted,
    minSizeKBaccepted,
    maxSizeKBaccepted,
  } = imgSizing[section];

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) {
        urlImgReturn(null);
        return;
      }

      // Verificar si la extensión del archivo es válida
      const validExtensions = ["jpg", "jpeg", "png", "webp"];
      const extension = file.name.split(".").pop().toLowerCase();
      if (
        !validExtensions.includes(extension) ||
        file.type.indexOf("image/") !== 0
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Extensión de archivo no válida o tipo de archivo incorrecto. Solo se permiten imágenes jpg, jpeg, webp y png.",
        });
        urlImgReturn(null);
        return;
      }

      // Llama a la función de validación antes de subir la imagen
      // validamos ancho, alto y tamaño de la imagen. Si todo está bien, continua la ejecución. Si no, va al bloque catch.
      await validateImage(
        file,
        minWidthAccepted,
        maxWidthAccepted,
        minHeightAccepted,
        maxHeigthAccepted,
        minSizeKBaccepted,
        maxSizeKBaccepted
      );

      // subir la imagen al Storage de Firebase
      const folder = folderStorage ?? section;

      const downloadURL = await setImageCloudinary(file, folder);
      urlImgReturn(downloadURL);
    } catch (error) {
      console.error("Error al subir archivo: ", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al subir la imagen, intenta de nuevo.",
      });
    }
  };

  return (
    <div
      className="relative bg-gray-200 shadow-lg flex justify-center items-center cursor-pointer"
      style={{ ...imageStyle, overflow: "hidden", position: "relative" }}
      onClick={handleImageClick}
    >
      {img && (
        <Image
          src={img}
          alt={`${nameCommerce} ${section}`}
          fill
          sizes={`${imageStyle.width}px`}
          className="absolute inset-0 z-0 object-contain"
        />
      )}
      <input
        ref={fileInputRef}
        className="hidden"
        type="file"
        id="fileInput"
        accept=".jpg, .jpeg, .png, .webp"
        onChange={handleFileChange}
      />
    </div>
  );
}
