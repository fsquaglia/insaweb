"use client";
import { getNodoRealtime } from "@/utils/firebase/fetchFirebase";
import { useEffect, useState } from "react";
import InputCustom from "@/ui/InputCustom.jsx";
import ButtonDashboard from "@/ui/ButtonDashboard.jsx";

//Nombre del comercio
const nameCommerce = "Ihara & London";
//configuración de la sección
const titulo = "Contacto y Social Media";
const description = [
  "Aquí colocarás los datos de contacto y redes sociales.",
  "Verifica que la información que incluyes sea correcta, de lo contrario",
  "no podrán ubicarte y puede que pierdas clientes.",
];
//configuramos longitudes de cadenas (caracteres) para los input
const maxLengthFantasia = 25;
const maxLengthRazonSocial = 35;

function PageSocialMedia() {
  const [values, setValues] = useState({});

  //pedir datos al nodo about de realtime
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNodoRealtime("contacto");
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
      <div className="flex flex-row flex-wrap justify-center items-center gap-4  max-w-4xl my-4 border rounded-xl p-6 bg-gray-100">
        {/*div de los input de LEGALES*/}
        <div className="w-96 h-96 flex flex-col justify-center border rounded-lg p-4 shadow-lg bg-gray-50">
          <p className="my-1">Datos legales</p>
          <InputCustom
            labelText="Nombre de fantasía"
            name="fantasia"
            inputValue={values?.legal?.fantasia || ""}
            // onChange={handleChange}
            charLimit={maxLengthFantasia}
          />
          <InputCustom
            labelText="Razón Social"
            name="razonSocial"
            inputValue={values?.legal?.razonSocial || ""}
            // onChange={handleChange}
            charLimit={maxLengthRazonSocial}
          />
          <InputCustom
            labelText="Logo (a futuro...)"
            name="logoURL"
            inputValue={""}
            // onChange={handleChange}
            charLimit={maxLengthRazonSocial}
          />
        </div>

        {/*div de los input de UBICACION*/}
        <div className="w-96 h-96 flex flex-col justify-center border rounded-lg p-4 shadow-lg bg-gray-50">
          <p className="my-1">Ubicación</p>
          <InputCustom
            labelText="Dirección"
            name="direccion"
            inputValue={values?.ubicacion?.direccion || ""}
            // onChange={handleChange}
            charLimit={maxLengthFantasia}
          />
          <InputCustom
            labelText="Localidad"
            name="localidad"
            inputValue={values?.ubicacion?.localidad || ""}
            // onChange={handleChange}
            charLimit={maxLengthRazonSocial}
          />
          <InputCustom
            labelText="Provincia"
            name="provincia"
            inputValue={values?.ubicacion?.provincia || ""}
            // onChange={handleChange}
            charLimit={maxLengthRazonSocial}
          />
        </div>

        {/*div de los input de CONTACTO*/}
        <div className="w-96 h-96 flex flex-col justify-center border rounded-lg p-4 shadow-lg bg-gray-50">
          <p className="my-1">Datos de contacto</p>
          <InputCustom
            labelText="Teléfono"
            name="TE"
            inputValue={values?.medios?.TE || ""}
            // onChange={handleChange}
            charLimit={maxLengthFantasia}
          />
          <InputCustom
            labelText="Celular"
            name="cel"
            inputValue={values?.medios?.cel || ""}
            // onChange={handleChange}
            charLimit={maxLengthRazonSocial}
          />
          <InputCustom
            labelText="Email"
            name="email"
            inputValue={values?.medios?.email || ""}
            // onChange={handleChange}
            charLimit={maxLengthRazonSocial}
          />
        </div>

        {/*div de la imagen BORRADOR*/}
        <div className="w-96 h-96 bg-gray-200 rounded-lg shadow-lg">
          {/* <img src={img} alt="" className="w-96 h-96 " /> */}
        </div>

        {/*div de Social Media */}
        <div className="border rounded-lg bg-gray-100 py-2">
          <p className="my-1">Social Media</p>

          <div className=" flex flex-row flex-wrap gap-4 items-center justify-center">
            {/*Div de los input */}
            <div className="w-96 flex flex-col justify-center border rounded-lg p-4 shadow-lg bg-gray-50">
              <InputCustom
                labelText="Título sección"
                name="tituloSocialMedia"
                inputValue={values?.socialMedia?.tituloSocialMedia || ""}
                // onChange={handleChange}
                charLimit={maxLengthFantasia}
              />
              <InputCustom
                labelText="Facebook 1"
                name="facebook1"
                inputValue={values?.socialMedia?.facebook1 || ""}
                // onChange={handleChange}
                charLimit={maxLengthFantasia}
              />
              <InputCustom
                labelText="Facebook 2"
                name="facebook2"
                inputValue={values?.socialMedia?.facebook2 || ""}
                // onChange={handleChange}
                charLimit={maxLengthFantasia}
              />
              <InputCustom
                labelText="Instagram 1"
                name="instagram1"
                inputValue={values?.socialMedia?.instagram1 || ""}
                // onChange={handleChange}
                charLimit={maxLengthFantasia}
              />
              <InputCustom
                labelText="Instagram 2"
                name="instagram2"
                inputValue={values?.socialMedia?.instagram2 || ""}
                // onChange={handleChange}
                charLimit={maxLengthFantasia}
              />
            </div>
            {/*div de la imagen */}
            <div className="w-96 h-96 bg-gray-200 rounded-lg shadow-lg">
              {values?.socialMedia?.imagenFondoSocialMedia ? (
                <img
                  src={values?.socialMedia?.imagenFondoSocialMedia}
                  alt={`Background Social Media ${nameCommerce}`}
                  className="w-full h-full object-contain"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageSocialMedia;
