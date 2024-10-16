"use client";
import { useState, useEffect } from "react";
import InputCustom from "@/ui/InputCustom";
import SwitchVisible from "@/ui/SwitchVisible";
import ButtonDashboard from "@/ui/ButtonDashboard";
import CustomSelect from "./StockBySize";
import {
  getCodeToUse,
  getVariationsFromStorage,
  getConfig,
} from "@/utils/local_session_storage.js/local_session_storage";
import Swal from "sweetalert2";
import SwitchPublished from "@/ui/SwitchPublished";
import MultiSelect from "./MultiSelect";
import ImageUpload from "./ImageUpload";
import {
  getProductByID,
  updateProductByID,
} from "@/utils/firebase/fetchFirebase";

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
  configurations,
  onChange,
  values,
  onClickSwitch,
  handleUpdateStock,
  onClickSwitchPrecioVenta,
  onClickSwitchOferta,
  handleHashtagsChange,
  handleUploadSuccess,
  handleDeleteImage
) => [
  {
    name: "Principal",
    id: 1,
    description: "Comencemos por los datos principales del producto.",
    content: (
      <>
        <div className="columns-2">
          <div className="flex flex-col">
            <InputCustom
              name={"codigoNro"}
              labelText={"Código "}
              onChange={onChange}
              inputValue={values?.codigoNro || ""}
              charLimit={10}
              placeHolder={"Se ingresará automático"}
              disabled={true}
            />
          </div>
          <div className="flex flex-col">
            <InputCustom
              name={"codigoAnterior"}
              labelText={"Código anterior"}
              onChange={onChange}
              inputValue={values?.codigoAnterior || ""}
              charLimit={10}
              placeHolder={"Código del sistema anterior"}
            />
          </div>
        </div>
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
              <div key={index} className="w-1/2 relative">
                <img
                  src={imgUrl}
                  alt={`Imagen ${index + 1}`}
                  className="w-full h-auto object-cover"
                  onLoad={(e) =>
                    e.target.nextSibling.classList.remove("invisible")
                  } // Mostrar botón al cargar la imagen
                />
                <button
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 invisible" // Inicialmente invisible
                  onClick={() => handleDeleteImage(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
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

        <div className="flex flex-row gap-2">
          <div className="flex flex-col w-1/3">
            <InputCustom
              name={"precioVenta"}
              labelText={"Precio de venta "}
              inputType={"number"}
              placeHolder={"0"}
              inputValue={
                values?.precioVenta ||
                values?.precioCompra * configurations?.multiplicadorCpraVta ||
                0
              }
              onChange={onChange}
              showCharLimits={false}
              disabled={values?.esPrecioVentaDeGrupo || false}
            />
          </div>

          <div className="flex flex-col w-1/3">
            <InputCustom
              name={"descEfectPorc"}
              labelText={"Descto pago Efect. "}
              inputType={"number"}
              placeHolder={"10"}
              inputValue={values?.descEfectPorc}
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
  const [configurations, setConfigurations] = useState({});
  const [values, setValues] = useState({
    codigoNro: "",
    codigoAnterior: "",
    categoria: "",
    subcategoria: "",
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
    descEfectPorc: 10,
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

    //cargar las configuraciones desde la BDD
    const getConfigurations = async () => {
      const configurationsGet = await getConfig();
      setConfigurations(configurationsGet);
      if (Object.keys(configurationsGet).length === 0) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Deberás revisar las Configuraciones primero.",
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
        try {
          const productSelected = await getProductByID(
            category,
            subcategory,
            product
          );
          //si no tiene código, asignarle uno
          if (productSelected.codigoNro === "") {
            const code = await getCodeToUse();
            productSelected.codigoNro = code;
          }
          setValues(productSelected);
        } catch (error) {
          console.error("Error fetching product:", error);
          setValues(null);
        }
      }
    };
    getConfigurations();
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
  //handle para eliminar imagen del array de imágenes del producto
  const handleDeleteImage = (item) => {
    if (values.imagen.length <= 1) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "No puedes eliminar todas las imágenes.",
        showConfirmButton: true,
      });
      return;
    }
    const newImages = values.imagen.filter((_, index) => index !== item);
    setValues((prevValues) => ({ ...prevValues, imagen: newImages }));
    console.log(values.imagen);
  };

  //submit principal del formulario
  const onSubmitValues = async () => {
    try {
      await updateProductByID(category, subcategory, productID, values);
      console.log(values);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Producto actualizado",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Hubo un error",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="bg-gray-100 font-sans flex h-screen justify-center w-full">
      {values ? (
        <div className="py-8 w-full lg:w-3/4 xl:w-1/2">
          <div className="flex items-center justify-center border rounded shadow my-2 bg-gray-700">
            <span className="text-xs text-gray-100 my-2">{`Categoría: ${category} - Subcategoría: ${subcategory} - Producto ID: ${productID}`}</span>
          </div>
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
                configurations,
                onChange,
                values,
                onClickSwitch,
                handleUpdateStock,
                onClickSwitchPrecioVenta,
                onClickSwitchOferta,
                handleHashtagsChange,
                handleUploadSuccess,
                handleDeleteImage
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
      ) : (
        <div className="mx-auto my-4">
          Buscando el producto, si no lo encontramos deberás volver a
          intentarlo...
        </div>
      )}
    </div>
  );
}

export default ProductPage;
