"use client";
import React, { useState, useRef, useEffect } from "react";
import InputCustom from "@/ui/InputCustom.jsx";
import ButtonDashboard from "@/ui/ButtonDashboard.jsx";
import {
  getNodoRealtime,
  setImageStorage,
  setMainRealtime,
} from "@/utils/firebase/fetchFirebase";
import Swal from "sweetalert2";
import validateImage from "@/utils/ImageValidator";

export default function Page() {
  //Nombre del comercio
  const nameCommerce = "Ihara & London";
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

  //pedir datos al nodo MAIN de realtime
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNodoRealtime("main");
        if (data) {
          setInputValues((prevValues) => ({
            ...prevValues,
            primera: data.texto1 || "",
            segunda: data.texto2 || "",
            tercera: data.texto3 || "",
            imagen: data.imagen || "",
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    //console.log(inputValues);
  }, []);

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
    <div className="container flex flex-col border bg-green-500">
      <div className="flex flex-row flex-wrap justify-center items-center gap-4">
        {/*div de la imagen*/}
        <div className="w-96 h-96 border rounded-lg shadow-lg bg-gray-100 flex items-center justify-center">
          <div
            className="h-[216px] w-[384px] flex items-center justify-center bg-gray-200 cursor-pointer shadow-md"
            onClick={handleImageClick}
          >
            <img
              src={inputValues.imagen}
              alt={`${nameCommerce} imagen principal`}
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
        </div>
        {/*div de los input*/}
        <div className="w-96 h-96 flex flex-col justify-center border rounded-lg p-4 shadow-lg">
          {/* <label className="text-sm text-left ml-2 mb-1 text-gray-600">
            Primera línea
          </label>
          <input
            type="text"
            name="primera"
            value={inputValues.primera}
            onChange={handleChange}
            id="primera"
            className="rounded-md border font-sans font-normal text-blue-gray-700 outline outline-offset-2 p-1"
          />
          <span className="block text-right text-xs text-blue-gray-600 mt-1">
            {34} de {45}
          </span> */}

          <InputCustom
            labelText="Primera línea"
            name="primera"
            inputValue={inputValues.primera}
            onChange={handleChange}
            charLimit={maxLengthText1}
          />
          <InputCustom
            labelText="Segunda línea"
            name="segunda"
            inputValue={inputValues.segunda}
            onChange={handleChange}
            charLimit={maxLengthText2}
          />
          <InputCustom
            labelText="Tercera línea"
            name="tercera"
            inputValue={inputValues.tercera}
            onChange={handleChange}
            charLimit={maxLengthText3}
          />
          <ButtonDashboard onclick={onclick} textButton={"Actualizar"} />
          {/* <button
            className="h-[50px] mt-6 block w-full select-none rounded-lg bg-blue-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            data-ripple-light="true"
            onClick={onclick}
          >
            Actualizar
          </button> */}
        </div>
      </div>
    </div>
  );
}
