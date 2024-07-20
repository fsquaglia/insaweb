"use client";
import { getNodoRealtime } from "@/utils/firebase/fetchFirebase";
import { useEffect, useState } from "react";
import InputCustom from "@/ui/InputCustom.jsx";
import ButtonDashboard from "@/ui/ButtonDashboard.jsx";

//Nombre del comercio
const nameCommerce = "Ihara & London";
//configuración de la sección
const titulo = "Sección About";
const description = [
  "La sección About o Sobre Nosotros presenta a las personas detrás de la empresa,",
  "sus roles, experiencias y valores, ayudando a los visitantes a conocer el equipo y sus contribuciones.",
];
//configuramos longitudes de cadenas (caracteres) para los input
const maxLengthTitle = 22;
const maxLengthDescription = 926;

function PageAbout() {
  const [values, setValues] = useState({});

  //pedir datos al nodo about de realtime
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNodoRealtime("about");
        if (data) {
          setValues(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container flex flex-col items-center text-center">
      <div className="flex flex-row flex-wrap justify-center items-center gap-4  w-fit my-4 border rounded-xl p-6 bg-gray-100">
        {/*div de la imagen */}
        <div className="w-96 h-96 bg-gray-200 rounded-lg shadow-lg">
          <img
            src={values.imagen}
            alt={`About ${nameCommerce}`}
            className="w-96 h-96 "
          />
        </div>
        {/*div de los input */}
        <div className="w-96 h-96 flex flex-col justify-center border rounded-lg p-4 shadow-lg bg-gray-50">
          <InputCustom
            labelText="Título"
            name="titulo"
            inputValue={values.titulo}
            // onChange={handleChange}
            charLimit={maxLengthTitle}
          />
          <InputCustom
            labelText="Descripción"
            name="descripcion"
            type="area"
            inputValue={values.descripcion}
            // onChange={handleChange}
            charLimit={maxLengthDescription}
          />
          <ButtonDashboard textButton={"Actualizar"} />
        </div>
      </div>
    </div>
  );
}

export default PageAbout;
