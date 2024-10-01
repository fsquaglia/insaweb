"use client";
import { useState, useEffect } from "react";
import InputCustom from "@/ui/InputCustom";
import SwitchVisible from "@/ui/SwitchVisible";
import ButtonDashboard from "@/ui/ButtonDashboard";
import CustomSelect from "./StockBySize";
import {
  getCodeToUse,
  getVariationsFromStorage,
} from "@/utils/local_session_storage.js/local_session_storage";
import Swal from "sweetalert2";
import SwitchPublished from "@/ui/SwitchPublished";

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
const sections = (variations, onChange, values, onClickSwitch) => [
  {
    name: "Principal",
    id: 1,
    description: "Comencemos por los datos principales del producto.",
    content: (
      <>
        <InputCustom
          name={"codigoNro"}
          labelText={"Código "}
          onChange={onChange}
          inputValue={values?.codigoNro || ""}
          charLimit={10}
          placeHolder={"Se ingresará automático"}
          disabled={true}
        />
        <InputCustom
          name={"nombre"}
          labelText={"Nombre del producto "}
          onChange={onChange}
          inputValue={values?.nombre || ""}
          charLimit={25}
          placeHolder="Ingresa un nombre"
        />
        <InputCustom
          name={"detalle"}
          labelText={"Detalle largo"}
          type={"textarea"}
          onChange={onChange}
          inputValue={values?.detalle || ""}
          charLimit={100}
          placeHolder="Detalle largo del producto"
        />
        <InputCustom
          labelText="Marca "
          name="marca"
          type="select"
          placeHolder="Elige una opción"
          inputValue={values?.marca || "Genérico"}
          options={variations?.marca || []} // Asegurarse que no sea undefined
          onChange={onChange}
        />
        <InputCustom
          name={"modelo"}
          labelText={"Modelo "}
          placeHolder={"Modelo para esa Marca"}
          inputValue={values?.modelo || ""}
          onChange={onChange}
        />
        <InputCustom
          name={"color"}
          labelText={"Color "}
          type={"select"}
          placeHolder="Elige una opción"
          inputValue={values?.color || "Genérico"}
          options={variations?.color || []}
          onChange={onChange}
        />
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
          placeHolder={"0"}
          inputValue={values?.precioCompra || 0}
          onChange={onChange}
          showCharLimits={false}
        />
        <InputCustom
          name={"precioVenta"}
          labelText={"Precio de venta "}
          inputType={"number"}
          placeHolder={"0"}
          inputValue={values?.precioVenta || values?.precioCompra * 2 || 0}
          onChange={onChange}
          showCharLimits={false}
        />
        <InputCustom
          name={"fechaCompra"}
          labelText={"Fecha de compra AAAAMMDD "}
          inputType={"number"}
          showCharLimits={false}
          placeHolder={getYesterdayDate()}
          inputValue={values?.fechaCompra || getYesterdayDate()}
          onChange={onChange}
        />
        <InputCustom
          name={"IDgrupoDeValores"}
          type={"select"}
          labelText={"Grupo de Valores "}
          options={variations?.grupoDeValores || []}
          placeHolder={"Elige una opción"}
          inputValue={values?.IDgrupoDeValores || 1}
          onChange={onChange}
          showCharLimits={false}
        />
        <div className="my-4">
          <CustomSelect
            options={variations?.talle || ["Genérico"]}
            quantities={
              values?.magnitudDisponible || [
                {
                  magnitud: "Genérico",
                  stock: 1,
                },
              ]
            }
          />
        </div>
        <div className="my-4">
          <SwitchPublished
            published={values?.publicado}
            onClick={onClickSwitch}
          />
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

function ProductPage() {
  const [openTab, setOpenTab] = useState(1);
  const [variations, setVariations] = useState({});
  const [values, setValues] = useState({
    codigoNro: "",
    nombre: "",
    detalle: "",
    marca: "Genérico",
    modelo: "",
    color: "Genérico",
    stockTotal: 0,
    extra1: "",
    extra2: "",
    fechaCompra: getYesterdayDate(),
    precioCompra: 0,
    precioVenta: 0,
    publicado: false,
    magnitudDisponible: [
      {
        magnitud: "Genérico",
        stock: 1,
      },
      {
        magnitud: "XL",
        stock: 2,
      },
    ],
    IDgrupoDeValores: 1,
  });

  useEffect(() => {
    const getVariations = async () => {
      const variationsGet = await getVariationsFromStorage();
      setVariations(variationsGet);
      if (Object.keys(variationsGet).length === 0) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Deberás configurar variaciones primero.",
          showConfirmButton: true,
        });
      }
    };
    getVariations();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const onClickSwitch = (value) => {
    setValues((prevValues) => ({ ...prevValues, publicado: value }));
  };

  const onSubmitValues = async () => {
    const code = await getCodeToUse();
    values.codigoNro = code;
    console.log(values);
  };

  return (
    <div className="bg-gray-100 font-sans flex h-screen justify-center w-full">
      <div className="py-8 w-full lg:w-3/4 xl:w-1/2">
        <div className="w-full">
          {/* Encabezado y Tabs con botones */}
          <div className="mb-4 flex space-x-4 p-2 bg-white rounded-lg shadow-md">
            {sections(variations).map((section) => (
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
            {sections(variations, onChange, values, onClickSwitch).map(
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
              <ButtonDashboard
                textButton={"Guardar"}
                onclick={onSubmitValues}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
