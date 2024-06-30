"use client";
import React, { useState, useRef } from "react";
import HeaderCustomize from "@/ui/HeaderCustomize";
import IntroCustomize from "@/ui/IntroCustomize";
import Input from "@/ui/input";
import ButtonDashboard from "@/ui/ButtonDashboard";
import {
  setImageStorage,
  setMainRealtime,
} from "@/utils/firebase/fetchFirebase";
import Swal from "sweetalert2";
import validateImage from "@/utils/ImageValidator";

export default function Page() {
  //configuramos las medidas en px y tamaño en kB min y max aceptados para las imágenes
  const minWidthAccepted = 1900;
  const maxWidthAccepted = 1950;
  const minHeightAccepted = 1000;
  const maxHeigthAccepted = 1100;
  const minSizeKBaccepted = 150;
  const maxSizeKBaccepted = 500;
  //configuramos longitudes de cadenas (caracteres) para los input
  const maxLengthText1 = 25;
  const maxLengthText2 = 25;
  const maxLengthText3 = 40;
  //configuración de la sección
  const titulo = "Sección Principal";
  const description = [
    "Aquí podrás configurar la sección principal de tu página, tanto los textos como la imagen de fondo.",
    `Medidas aceptadas para la imagen:`,
    `Ancho: 1920px,`,
    `Altura: 1080px,`,
    `Tamaño: ${minSizeKBaccepted}KB a ${maxSizeKBaccepted}KB.`,
  ];

  const [inputValues, setInputValues] = useState({
    primera: "",
    segunda: "",
    tercera: "",
    imagen:
      "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/main%2Fmain01.jpg?alt=media&token=a56599f6-cf71-4329-9e13-6422c7a0f28c",
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  //Button Actualizar
  const onclick = async () => {
    try {
      const { primera, segunda, tercera, imagen } = inputValues;
      await setMainRealtime(primera, segunda, tercera, imagen);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Listo!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error! ", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Algo está mal...",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

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
      const downloadURL = await setImageStorage(file, "main");
      setInputValues((prevValues) => ({
        ...prevValues,
        imagen: downloadURL,
      }));
    } catch (error) {
      console.error("Error al subir archivo: ", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al subir la imagen, intenta de nuevo.",
        //footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  return (
    <div className="container flex flex-col justify-center text-center">
      <HeaderCustomize titulo={titulo} />
      <IntroCustomize description={description} />
      <div className="flex flex-col lg:flex-row justify-center items-center gap-2">
        {/*div de la imagen*/}
        <div
          className="h-[216px] w-[384px] flex items-center justify-center bg-gray-200 cursor-pointer"
          onClick={handleImageClick}
        >
          <img
            src={inputValues.imagen}
            alt="Ihara & London imagen principal"
            className="w-full h-full object-cover"
          />
          <input
            ref={fileInputRef}
            className="hidden"
            type="file"
            id="fileInput"
            accept=".jpg, .jpeg, .png, .webp"
            onChange={handleFileChange}
          />
        </div>
        {/*div de los input*/}
        <div className="w-80 flex flex-col">
          <Input
            labelText="Primera línea"
            name="primera"
            inputValue={inputValues.primera}
            onChange={handleChange}
            charLimit={maxLengthText1}
          />
          <Input
            labelText="Segunda línea"
            name="segunda"
            inputValue={inputValues.segunda}
            onChange={handleChange}
            charLimit={maxLengthText2}
          />
          <Input
            labelText="Tercera línea"
            name="tercera"
            inputValue={inputValues.tercera}
            onChange={handleChange}
            charLimit={maxLengthText3}
          />
          <ButtonDashboard onclick={onclick} />
        </div>
      </div>
    </div>
  );
}
