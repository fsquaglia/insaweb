"use client";
import { Timestamp } from "firebase/firestore";
import { Hourglass } from "react-loader-spinner";
import { useState, useEffect } from "react";
import InputCustom from "@/ui/InputCustom";
// import SwitchVisible from "@/ui/SwitchVisible";
import ButtonDashboard from "@/ui/ButtonDashboard";
// import CustomSelect from "./StockBySize";
import {
  getCodeToUse,
  getVariationsFromStorage,
  getConfig,
} from "@/utils/local_session_storage.js/local_session_storage";
import Swal from "sweetalert2";
import SwitchPublished from "@/ui/SwitchPublished";
// import MultiSelect from "./MultiSelect";
import ImageUpload from "./ImageUpload";
import {
  getProductByID,
  setIndexProduct,
  updateDocInCollection,
  updateProductByID,
} from "@/utils/firebase/fetchFirebase";
import { revalidateSomePath } from "@/utils/actions/actions";

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
  handleDeleteImage,
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
              labelText={"Código automático "}
              onChange={onChange}
              inputValue={values?.codigoNro || ""}
              charLimit={10}
              placeHolder={"Se ingresará automático"}
              disabled={true}
            />
          </div>
        </div>
        <InputCustom
          name={"nombre"}
          labelText={"Nombre del producto "}
          onChange={onChange}
          inputValue={values?.nombre || ""}
          charLimit={825}
          placeHolder="Ingresa un nombre"
        />
        <InputCustom
          name={"detalle"}
          labelText={"Detalle largo"}
          type={"textarea"}
          onChange={onChange}
          inputValue={values?.detalle || ""}
          charLimit={360}
          placeHolder="Detalle largo del producto"
        />
      </>
    ),
  },
  {
    name: "Imagen",
    id: 2,
    description: "Agrega una imagen a tu producto.",
    content: (
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="flex gap-4 my-2">
          {values?.imagen && values.imagen.length > 0 ? (
            values.imagen.map((imgUrl, index) => (
              <div key={index} className="w-1/2 aspect-square relative">
                <img
                  src={imgUrl}
                  alt={`Imagen ${index + 1}`}
                  className="w-full aspect-square object-cover"
                  onLoad={(e) => {
                    e?.target.nextSibling &&
                      e.target.nextSibling.classList.remove("invisible");
                  }} // Mostrar botón al cargar la imagen
                />
                {values.imagen.length > 1 && (
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
                )}
              </div>
            ))
          ) : (
            <p className="mx-auto text-slate-500 my-2">
              No hay imágenes para mostrar
            </p>
          )}
        </div>
        {values?.imagen?.length >= 2 ? (
          <div className="mx-auto bg-gray-200 p-1 text-center  my-1 text-red-400 rounded">
            Llegaste al límite de dos imágenes, elimina alguna para poder subir
            otra.
          </div>
        ) : (
          <ImageUpload onUploadSuccess={handleUploadSuccess} />
        )}
      </div>
    ),
  },
  {
    name: "Publicar",
    id: 3,
    description: "Publicar o guardar como borrador.",
    content: (
      <>
        <div className="my-4">
          <SwitchPublished
            published={values?.publicado}
            onClick={onClickSwitch}
          />
        </div>
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
  const [saving, setSaving] = useState(false);
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
    fechaModificado: Timestamp.fromDate(new Date()),
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
            product,
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
  };

  //fn para actualizar documento de índice de Firestore con códigos de productos
  const indexCodeProducts = async (nameIndex, values) => {
    if (nameIndex === "indicePorArticuloProducto") {
      try {
        if (values?.codigoNro != "") {
          //almacenar índice de código nuevo
          await setIndexProduct(nameIndex, values.codigoNro, [
            values.docID,
            values.categoria,
            values.subcategoria,
            values.nombre,
          ]);
        }
        if (values?.codigoAnterior != "") {
          //almacenar índice de código anterior
          await setIndexProduct(nameIndex, values.codigoAnterior, [
            values.docID,
            values.categoria,
            values.subcategoria,
            values.nombre,
          ]);
        }
      } catch (error) {
        Swal({
          position: "center",
          icon: "error",
          title: "Error en documento de índices",
          showConfirmButton: true,
        });
      }
    }

    if (nameIndex === "indicePorIdProducto") {
      try {
        if (values?.docID != "") {
          //almacenar índice de código nuevo
          await setIndexProduct(nameIndex, values.docID, [
            values.categoria,
            values.subcategoria,
            values.nombre,
            values.imagen[0],
          ]);
        }
      } catch (error) {
        Swal({
          position: "center",
          icon: "error",
          title: "Error en documento de índices",
          showConfirmButton: true,
        });
      }
    }
  };

  //submit principal del formulario
  const onSubmitValues = async () => {
    if (values.publicado) {
      // Aquí el producto se PUBLICA
      // verificar que values.nombre tenga por lo menos 3 caracteres, que values.detalle tenga por lo menos 10 caracteres
      if (values.nombre.length < 3) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "El nombre del producto debe tener al menos 3 caracteres.",
          showConfirmButton: true,
        });
        return;
      } else if (values.detalle.length < 10) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "El detalle del producto debe tener al menos 10 caracteres.",
          showConfirmButton: true,
        });
        return;
      }

      const result = await Swal.fire({
        title: "Publicar producto",
        icon: "warning",
        text: "Revisa que toda la info esté correcta",
        showCancelButton: true,
        confirmButtonText: "Sí, publicar",
        cancelButtonText: "Cancelar",
      });

      if (!result.isConfirmed) return; // ← aborta si cancela
    }
    const showMessage = values.publicado
      ? "Producto actualizado y publicado"
      : "Producto GUARDADO, no publicado";

    try {
      setSaving(true);
      //actualiza el producto en la colección productos/categ.../subcat..
      await updateProductByID(category, subcategory, productID, values);
      //actualiza el producto en el índice por ARTICULO (para búsqueda de producto por artículo)
      await indexCodeProducts("indicePorArticuloProducto", values);
      //actualiza el producto en el índice (resumen) por ID de Firestore
      await indexCodeProducts("indicePorIdProducto", values);
      //actualiza el producto en la colección items (esto es experimental para manejar en un futuro de otra forma los productos)
      await updateDocInCollection("items", productID, values);

      revalidateSomePath(
        `/product-category/${encodeURIComponent(category)}/${encodeURIComponent(
          subcategory,
        )}`,
      );
      revalidateSomePath("/", "layout");

      Swal.fire({
        position: "center",
        icon: "success",
        title: showMessage || "Algo está mal por aquí...",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Hubo un error",
        showConfirmButton: true,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="font-sans flex min-h-80 justify-center w-full">
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
                handleDeleteImage,
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
                  ),
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
      {saving && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-black bg-opacity-50"
          style={{ zIndex: 9999 }}
        >
          <div className="flex items-center justify-center min-h-screen ">
            <div className="bg-slate-200 p-4 rounded shadow-lg mx-auto mt-28">
              <Hourglass
                visible={true}
                height="52"
                width="52"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass="mx-auto"
                colors={["#306cce", "#72a1ed"]}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
