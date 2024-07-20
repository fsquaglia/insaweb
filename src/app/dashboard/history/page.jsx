"use client";
import { getNodoRealtime } from "@/utils/firebase/fetchFirebase";
import { useEffect, useState } from "react";
import InputCustom from "@/ui/InputCustom.jsx";
import ButtonDashboard from "@/ui/ButtonDashboard.jsx";

//configuración de la sección
const titulo = "Sección Historia";
const description = ["Deberás armar tu Historia, Misión, Visión y Valores."];
//configuramos longitudes de cadenas (caracteres) para los input
const maxLengthTitle = 22;
const maxLengthDescription = 600;

function PageHistory() {
  const [values, setValues] = useState({});

  //pedir datos al nodo historia de realtime
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNodoRealtime("historia");
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
    <div className="flex flex-col items-center">
      {Object.keys(values).map((v) => (
        <HistoryUnit
          title={values[v].titulo}
          description={values[v].descripcion}
          img={values[v].imagen}
        />
      ))}
    </div>
  );
}

export default PageHistory;

function HistoryUnit({ title, description, img }) {
  return (
    <div className="flex flex-row flex-wrap justify-center items-center gap-4  w-fit my-4 border rounded-xl p-6 bg-gray-100">
      {/*div de la imagen */}
      <div className="w-96 h-96 bg-gray-200 rounded-lg shadow-lg">
        <img src={img} alt="" className="w-96 h-96 " />
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
