"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
//import { storage } from "./firebase"; // Asegúrate de importar correctamente
import { imagesDB as storage } from "@/utils/firebase/firebaseConfig";
import { imgSizing } from "@/utils/SettingSizing";

export default function ImageUpload({ onUploadSuccess }) {
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const maxFileSize = imgSizing?.productClassA?.maxSizeKBaccepted * 1024; // Tamaño máximo en bytes
  console.log(maxFileSize, " bytes");

  const validFormats = ["image/jpeg", "image/png", "image/gif"];

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
    <div
      {...getRootProps()}
      className="border-dashed border-2 p-4 rounded-lg cursor-pointer"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Suelta el archivo aquí...</p>
      ) : (
        <p>
          Arrastra y suelta una imagen aquí, o haz clic para seleccionar un
          archivo
        </p>
      )}

      {error && <p className="text-red-500">{error}</p>}
      {uploading && <p>Subiendo imagen...</p>}
    </div>
  );
}
