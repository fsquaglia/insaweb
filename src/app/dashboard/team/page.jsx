"use client";

import { getNodoRealtime } from "@/utils/firebase/fetchFirebase";
import { useEffect, useState } from "react";
import InputCustom from "@/ui/InputCustom.jsx";
import ButtonDashboard from "@/ui/ButtonDashboard.jsx";

//Nombre del comercio
const nameCommerce = "Ihara & London";
//configuración de la sección
const titulo = "Sección Team";
const description = [
  "En esta sección podrás mencionar a los miembors de tu equipo.",
  "Las imágenes que subas de cada uno serán redondeadas automáticamente.",
];
//configuramos longitudes de cadenas (caracteres) para los input
const maxLengthTitle = 22;
const maxLengthDescription = 50;

function PageTeam() {
  const [values, setValues] = useState({});

  //pedir datos al nodo about de realtime
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNodoRealtime("team");
        if (data) {
          setValues(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  console.log(values);
  return (
    <div className="container flex flex-col items-center text-center">
      <div className="flex flex-col items-center">
        {Object.keys(values).map((v) => (
          <TeamUnit
            title={values[v].titulo}
            description={values[v].descripcion}
            img={values[v].imagen}
            name={values[v]?.nombre || null}
          />
        ))}
      </div>
    </div>
  );
}

export default PageTeam;

function TeamUnit({ title, description, img, name = null }) {
  return (
    <div className="flex flex-row flex-wrap justify-center items-center gap-4  w-fit my-4 border rounded-xl p-6 bg-gray-100">
      {/*div de la imagen */}
      <div className="w-96 h-96 bg-gray-200 rounded-lg shadow-lg">
        {img ? <img src={img} alt="" className="w-96 h-96 " /> : null}
      </div>
      {/*div de los input */}
      <div className="w-96 h-96 flex flex-col justify-center border rounded-lg p-4 shadow-lg bg-gray-50">
        <InputCustom
          labelText="Título"
          name="titulo"
          inputValue={title}
          // onChange={handleChange}
          charLimit={maxLengthTitle}
        />
        {name ? (
          <InputCustom
            labelText="Nombre"
            name="nombre"
            inputValue={name}
            // onChange={handleChange}
            charLimit={maxLengthTitle}
          />
        ) : null}

        <InputCustom
          labelText="Descripción"
          name="descripcion"
          type="area"
          inputValue={description}
          // onChange={handleChange}
          charLimit={maxLengthDescription}
        />
        <ButtonDashboard textButton={"Actualizar"} />
      </div>
    </div>
  );
}
