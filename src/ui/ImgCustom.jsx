import React, { useRef } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import validateImage from "@/utils/ImageValidator";
import { imgSizing } from "@/utils/SettingSizing";
import { setImageStorage } from "@/utils/firebase/fetchFirebase";

//Nombre del comercio
const nameCommerce = process.env.NEXT_PUBLIC_NAME_COMMERCE;

export default function ImgCustom({ img, section, urlImgReturn }) {
  const fileInputRef = useRef(null);
  //restricciones de img extraidas de SettingSizing
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
          //footer: '<a href="#">Why do I have this issue?</a>',
        });
        urlImgReturn(null);
        return;
      }

      // Llama a la función de validación antes de subir la imagen
      //validamos ancho, alto y tamaño de la imagen. Si todo está bien continua la ejecución. Si no, va al bloque catch.
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
      const downloadURL = await setImageStorage(file, section);
      urlImgReturn(downloadURL);
    } catch (error) {
      console.error("Error al subir archivo: ", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al subir la imagen, intenta de nuevo.",
        //footer: '<a href="#">Why do I have this issue?</a>',
      });
      urlImgReturn(null);
    }
  };

  return (
    <div
      className="w-96 h-96 bg-gray-200 shadow-lg flex justify-center items-center cursor-pointer"
      onClick={handleImageClick}
    >
      {img && (
        <Image
          src={img}
          alt={`${nameCommerce} ${section}`}
          width={384}
          height={384}
          className="object-cover"
          // priority={ true}
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
