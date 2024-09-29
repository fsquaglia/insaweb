"use client";
import { useState } from "react";
import InputCustom from "@/ui/InputCustom";
import SwitchVisible from "@/ui/SwitchVisible";
import SwitchText from "@/ui/SwitchText";
import ButtonDashboard from "@/ui/ButtonDashboard";
import CustomSelect from "./StockBySize";

//obtener la fecha de ayer en formato string AAAAMMDD
function getYesterdayDate() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, "0");
  const day = String(yesterday.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}

//Configuración UI de las secciones
const Section = ({ title, description, children }) => (
  <div className="transition-all duration-300 bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-600">
    <h2 className="text-2xl font-semibold mb-2 text-blue-600">{title}</h2>
    <p className="text-gray-700 mb-1">{description}</p>
    <hr className="border-gray-300 my-2" />
    <div className="w-full flex flex-col">{children}</div>
  </div>
);

//data de las secciones
const sections = [
  {
    name: "Principal",
    id: 1,
    description: "Comencemos por los datos principales del producto.",
    content: (
      <>
        <InputCustom name={"codigoNro"} labelText={"Código "} />
        <InputCustom name={"nombre"} labelText={"Nombre del producto "} />
        <InputCustom
          name={"detalle"}
          labelText={"Detalle largo"}
          type={"textarea"}
        />
        <InputCustom name={"marca"} labelText={"Marca "} type={"select"} />
        <InputCustom name={"modelo"} labelText={"Modelo "} />
        <InputCustom name={"color"} labelText={"Color "} type={"select"} />
      </>
    ),
  },
  {
    name: "Imagen",
    id: 2,
    description: "Agrega una imagen a tu producto.",
    content: (
      <p> Aquí irán los inputs y componentes para la sección de imagen </p>
    ),
  },
  {
    name: "Control stock",
    id: 3,
    description: "Control de stock y magnitudes.",
    content: (
      <>
        <InputCustom
          name={"precioCompra"}
          labelText={"Precio de compra "}
          inputType={"number"}
        />
        <InputCustom
          name={"precioVenta"}
          labelText={"Precio de venta "}
          inputType={"number"}
        />
        <InputCustom
          name={"fechaCompra"}
          labelText={"Fecha de compra AAAAMMDD "}
          inputType={"number"}
          placeHolder={getYesterdayDate()}
        />
        <InputCustom
          name={"IDgrupoDeValores"}
          type={"select"}
          labelText={"Grupo de Valores "}
        />
        <div className="my-4">
          <CustomSelect
            options={["Apple", "Banana", "Cherry", "Date", "Grape"]}
          />
        </div>
        <div className="my-4">
          <SwitchText text1={"Borrador"} text2={"Publicado"} />
        </div>
      </>
    ),
  },
  {
    name: "Extras",
    id: 4,
    description: "Agreguemos más información a tu producto",
    content: (
      <>
        <InputCustom name={"extra1"} labelText={"Dato extra 1 "} />
        <InputCustom name={"extra2"} labelText={"Dato extra 2 "} />
        <SwitchVisible switchLabel={"En Oferta"} />
        <InputCustom
          name={"porcentajeDescuentoOferta"}
          labelText={"Descuento (%) "}
          inputType={"number"}
        />
        <InputCustom
          name={"productosRelacionados"}
          labelText={"Productos relacionados "}
        />
        <InputCustom name={"hashtags"} labelText={"Hashtags# "} />
      </>
    ),
  },
];

function TabComponent() {
  const [openTab, setOpenTab] = useState(1);

  return (
    <div className="bg-gray-100 font-sans flex h-screen justify-center w-full">
      <div className="py-8 w-full lg:w-3/4 xl:w-1/2">
        <div className="w-full">
          {/* Encabezado y Tabs con botones*/}
          <div className="mb-4 flex space-x-4 p-2 bg-white rounded-lg shadow-md">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setOpenTab(section.id)}
                className={`flex-1 py-2 px-4 rounded-md focus:outline-none transition-all duration-300 ${
                  openTab === section.id ? "bg-blue-600 text-white" : ""
                }`}
              >
                {section.name}
              </button>
            ))}
          </div>

          {/* Aquí van los inputs y componentes de las secciones */}
          <div>
            {sections.map(
              (section) =>
                openTab === section.id && (
                  <Section
                    key={section.id}
                    title={section.name}
                    description={section.description}
                  >
                    {section.content}
                  </Section>
                )
            )}
          </div>

          {/* Botón Guardar */}
          <div className="mt-4 flex pb-2 bg-white rounded-lg shadow-md">
            <div className="flex justify-center items-center mx-auto">
              <ButtonDashboard textButton={"Guardar"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabComponent;
