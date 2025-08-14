"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
//import { storage } from "./firebase"; // Asegúrate de importar correctamente
import { imagesDB as storage } from "@/utils/firebase/firebaseConfig";
import { imgSizing } from "@/utils/SettingSizing";
import { CldUploadWidget } from "next-cloudinary";
import { FaRegImage } from "react-icons/fa6";

export default function ImageUpload({ onUploadSuccess }) {
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const maxFileSize = imgSizing?.productClassA?.maxSizeKBaccepted * 1024; // Tamaño máximo en bytes
  // console.log(maxFileSize, " bytes");

  const validFormats = ["image/jpeg", "image/png", "image/gif", "image/webp"];

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (!validFormats.includes(file.type)) {
      setError("Formato no permitido. Usa JPEG, PNG o GIF.");
      return;
    }

    if (file.size > maxFileSize) {
      setError(
        `El archivo excede el tamaño máximo permitido de ${imgSizing?.productClassA?.maxSizeKBaccepted} kB.`
      );
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (
        img.width > imgSizing?.productClassA?.maxWidthAccepted ||
        img.height > imgSizing?.productClassA?.maxHeigthAccepted
      ) {
        setError(
          `Las dimensiones de la imagen superan el límite de ${imgSizing?.productClassA?.maxWidthAccepted}x${imgSizing?.productClassA?.maxHeigthAccepted} px.`
        );
        return;
      }
      uploadImage(file);
    };
  };

  const uploadImage = async (file) => {
    setError(null);
    setUploading(true);

    try {
      const storageRef = ref(storage, `products/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      // Llama a una función para almacenar la URL en Firestore o Realtime Database
      onUploadSuccess(downloadURL);
    } catch (error) {
      setError("Error al subir la imagen.");
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      {/* <div
      {...getRootProps()}
      className="border-dashed border-2 p-4 rounded-lg cursor-pointer"
    > */}
      {/* <input {...getInputProps()} />
      {isDragActive ? (
        <p>Suelta el archivo aquí...</p>
      ) : (
        <p>
          Arrastra y suelta una imagen aquí, o haz clic para seleccionar un
          archivo
        </p>
      )} */}

      {/*** Widget de Cloudinary ***/}
      <CldUploadWidget
        uploadPreset="tspeblqq"
        options={{
          folder: "productos",
          multiple: false,
          sources: ["local", "url", "camera"],
          maxFileSize: 1 * 1024 * 1024, // 1MB como ejemplo
          resource_type: "image",
        }}
        onSuccess={(result) => {
          // console.log("✅ Imagen subida a Cloudinary:", result?.info?.secure_url);
          const url = result?.info?.secure_url || "";
          // urlImgReturn(url);
          // setImageUrl(url);
          onUploadSuccess(url);
        }}
      >
        {({ open }) => {
          return (
            <div>
              {/* <div
              className="relative bg-gray-200 shadow-lg flex justify-center items-center "
              style={{
                width: 384,
                height: 384,
                overflow: "hidden",
                position: "relative",
              }}
              // onClick={openWidget}
            > */}
              {/* {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={`${nameCommerce} ${section}`}
                      fill
                      sizes={`${imageStyle.width}px`}
                      className="absolute inset-0 z-0 object-contain"
                    />
                  )} */}
              <button
                className="rounded-full p-4 bg-blue-400 text-slate-100 flex justify-center items-center hover:bg-blue-500 transition"
                onClick={() => open()}
              >
                <FaRegImage size={20} />
              </button>
            </div>
          );
        }}
      </CldUploadWidget>
      {/*** Widget de Cloudinary ***/}

      {error && <p className="text-red-500">{error}</p>}
      {uploading && <p>Subiendo imagen...</p>}
    </div>
  );
}
