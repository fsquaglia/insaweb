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
import MultiSelect from "./MultiSelect";
import ImageUpload from "./ImageUpload";
import { doc, setDoc } from "firebase/firestore";
import {
  getProductByID,
  updateProductByID,
} from "@/utils/firebase/fetchFirebase";
import { set } from "zod";

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
const sections = (
  variations,
  onChange,
  values,
  onClickSwitch,
  handleUpdateStock,
  onClickSwitchPrecioVenta,
  onClickSwitchOferta,
  handleHashtagsChange,
  handleUploadSuccess
) => [
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
          charLimit={20}
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
      <div>
        {values?.imagen?.length >= 2 ? (
          <div className="mx-auto bg-gray-200 p-1 text-center  my-1 text-red-400 rounded">
            Llegaste al límite de dos imágenes, elimina alguna para poder subir
            otra.
          </div>
        ) : (
          <ImageUpload onUploadSuccess={handleUploadSuccess} />
        )}

        <div className="flex gap-4 my-2">
          {values?.imagen && values.imagen.length > 0 ? (
            values.imagen.map((imgUrl, index) => (
              <div key={index} className="w-1/2">
                <img
                  src={imgUrl}
                  alt={`Imagen ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))
          ) : (
            <p className="mx-auto text-slate-500 my-2">
              No hay imágenes para mostrar
            </p>
          )}
        </div>
      </div>
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

        {/*! * */}
        <div className="flex flex-row">
          <div className="flex flex-col w-1/2">
            <InputCustom
              name={"precioVenta"}
              labelText={"Precio de venta "}
              inputType={"number"}
              placeHolder={"0"}
              inputValue={values?.precioVenta || values?.precioCompra * 2 || 0}
              onChange={onChange}
              showCharLimits={false}
              disabled={values?.esPrecioVentaDeGrupo || false}
            />
          </div>
          <SwitchVisible
            switchLabel={"Precio venta de grupo "}
            name={"esPrecioVentaDeGrupo"}
            initialValue={values?.esPrecioVentaDeGrupo}
            onToggle={onClickSwitchPrecioVenta}
          />
        </div>
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
            updateStock={handleUpdateStock}
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
        <InputCustom
          name={"extra1"}
          labelText={"Dato extra 1 "}
          onChange={onChange}
          inputValue={values?.extra1 || ""}
          charLimit={40}
          placeHolder={"Algún dato extra del producto?"}
        />
        <InputCustom
          name={"extra2"}
          labelText={"Dato extra 2 "}
          onChange={onChange}
          inputValue={values?.extra2 || ""}
          charLimit={40}
          placeHolder={"Otro dato extra del producto?"}
        />
        <SwitchVisible
          switchLabel={"En Oferta"}
          name={"enOferta"}
          initialValue={values?.enOferta || false}
          onToggle={onClickSwitchOferta}
        />
        <InputCustom
          name={"porcentajeDescuentoOferta"}
          labelText={"Descuento (%) "}
          inputType={"number"}
          showCharLimits={false}
          inputValue={values?.porcentajeDescuentoOferta || 50}
          onChange={onChange}
          disabled={!values?.enOferta}
        />
        <InputCustom
          name={"productosRelacionados"}
          labelText={"Productos relacionados "}
          onChange={onChange}
          inputValue={values?.productosRelacionados || ""}
          disabled={true}
        />

        <MultiSelect
          labelText="Hashtags#"
          name="hashtags"
          options={
            variations?.hashtag || [{ value: "default", label: "Default" }]
          }
          defaultValue={values?.hashtags || []}
          onChange={handleHashtagsChange}
        />
      </>
    ),
  },
];

function ProductPage({ params }) {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [productID, setProductID] = useState("");
  const [openTab, setOpenTab] = useState(1);
  const [variations, setVariations] = useState({});
  const [values, setValues] = useState({
    codigoNro: "",
    nombre: "",
    detalle: "",
    marca: "Genérico",
    modelo: "",
    color: "Genérico",
    stockTotal: 1,
    extra1: "",
    extra2: "",
    fechaCompra: getYesterdayDate(),
    precioCompra: 0,
    precioVenta: 0,
    esPrecioVentaDeGrupo: true,
    publicado: false,
    magnitudDisponible: [
      {
        magnitud: "Genérico",
        stock: 1,
      },
    ],
    IDgrupoDeValores: 1,
    productosRelacionados: [],
    enOferta: false,
    porcentajeDescuentoOferta: 50,
    hashtags: [],
    imagen: [],
    valoraciones: [],
  });

  useEffect(() => {
    //cargar las variaciones del storage (o de la BDD) al state variations
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

    //traer el producto de la BDD
    const getProduct = async () => {
      if (params?.slug) {
        const decoded = params.slug.map((part) => decodeURIComponent(part));
        const [category, subcategory, product] = decoded;
        setCategory(category);
        setSubcategory(subcategory);
        setProductID(product);
        const productSelected = await getProductByID(
          category,
          subcategory,
          product
        );
        //!verificar esto
        console.log(productSelected);

        setValues(productSelected);
      }
    };

    getVariations();
    getProduct();
  }, []);

  //manejador de eventos del multiselect de los hashtags
  const handleHashtagsChange = (selectedOptions) => {
    setValues((prevValues) => ({
      ...prevValues,
      hashtags: selectedOptions.map((option) => option.value),
    }));
  };

  //manejador de eventos de inputs y selects
  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  //manejador de stock y magnitudes (pasado al subcomponente)
  const handleUpdateStock = (quantities, newStockTotal) => {
    setValues((prevValues) => ({
      ...prevValues,
      magnitudDisponible: quantities,
      stockTotal: newStockTotal,
    }));
  };

  //eventos del conmutador Borrador / Publicado
  const onClickSwitch = (value) => {
    setValues((prevValues) => ({ ...prevValues, publicado: value }));
  };

  //evento del conmutador de esPrecioVentaDeGrupo
  const onClickSwitchPrecioVenta = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      esPrecioVentaDeGrupo: value,
    }));
  };
  //evento del conmutador de esPrecioVentaDeGrupo
  const onClickSwitchOferta = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      enOferta: value,
    }));
  };

  //manejador de subida de imagen
  const handleUploadSuccess = async (downloadURL) => {
    setValues((prevValues) => ({
      ...prevValues,
      imagen: [...prevValues.imagen, downloadURL],
    }));
  };

  //submit principal del formulario
  const onSubmitValues = async () => {
    // const code = await getCodeToUse();
    // values.codigoNro = code;
    console.log(values);
    //!!! agregar try catch y hacer validaciones antes de enviar
    //!! agregar key value en el producto/document de la categoria y subcategoria a la que pertenece
    await updateProductByID(category, subcategory, productID, values);
    alert("Producto actualizado");
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
            {sections(
              variations,
              onChange,
              values,
              onClickSwitch,
              handleUpdateStock,
              onClickSwitchPrecioVenta,
              onClickSwitchOferta,
              handleHashtagsChange,
              handleUploadSuccess
            ).map(
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
