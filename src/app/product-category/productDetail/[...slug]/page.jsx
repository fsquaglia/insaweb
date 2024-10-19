"use client";
import { useEffect, useState } from "react";
import { IoIosColorPalette } from "react-icons/io";
import { GiBodyHeight } from "react-icons/gi";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { InfinitySpin } from "react-loader-spinner";
import { useSession } from "next-auth/react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  getConfig,
  getVariationsFromStorage,
} from "@/utils/local_session_storage.js/local_session_storage";

function PageProductDetail({ params }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log(session);

  const [visibleAdmin, setVisibleAdmin] = useState(false);
  const [cat, subcat, productId] = params.slug;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [variations, setVariations] = useState(null);
  const [configurations, setConfigurations] = useState({});
  const category = decodeURIComponent(cat);
  const subcategory = decodeURIComponent(subcat);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const variations = await getVariationsFromStorage();
        setVariations(variations);
        const config = await getConfig();
        setConfigurations(config);
        const res = await fetch(
          `/api/products/productById/${category}/${subcategory}/${productId}`
        );

        if (res.ok) {
          const data = await res.json();
          setProduct(data);
          setCurrentImage(data?.imagen?.[0] || null); // *** Asignar la primera imagen como predeterminada ***
        } else {
          console.error("Error:", response.statusText);
          setError(response.statusText);
        }
      } catch (error) {
        console.error("Error al obtener el producto de la BDD: ", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, []);

  if (error) {
    return (
      <div className="w-full min-h-screen bg-slate-50 text-center pt-20 flex justify-center">
        {error}
      </div>
    );
  }
  // Mostrar el loader si está cargando o si no hay datos en categoryData
  if (loading || !product) {
    return <LoadingDiv />;
  }

  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-br from-yellow-200 to-orange-100 flex items-center p-5 lg:p-10 overflow-hidden ">
      <div className="w-full max-w-6xl rounded bg-white shadow-xl  mx-auto text-gray-800  md:text-left">
        <div className="flex flex-col md:flex-row md:flex-wrap ">
          {/*--- div de las imágenes---- */}
          <div className="w-full md:w-2/5 bg-slate-50 p-8">
            {product?.imagen && product.imagen.length > 0 ? (
              <div className=" flex justify-center items-center h-full">
                <div className="">
                  {/* *** Imagen grande principal *** */}
                  <div className="mb-4">
                    <Image
                      src={currentImage} // *** Mostrar la imagen seleccionada ***
                      alt={`Imagen de ${product.nombre}`}
                      width={500}
                      height={500}
                      className="rounded-lg object-cover"
                      priority={true}
                    />
                  </div>

                  {/* *** Mostrar las miniaturas si hay más de una imagen *** */}
                  {product.imagen.length > 1 && (
                    <div className="flex justify-around ">
                      {product.imagen.map((imgUrl, index) => (
                        <div key={index} className="">
                          <Image
                            src={imgUrl}
                            alt={`Miniatura ${index + 1}`}
                            width={100}
                            height={100}
                            className="cursor-pointer rounded-lg border-2 border-gray-200 object-cover"
                            onClick={() => setCurrentImage(imgUrl)} // *** Cambiar la imagen grande al hacer clic ***
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <span className="text-center my-12 text-slate-600">
                No hay imagen disponible
              </span> // *** Mostrar mensaje si no hay imágenes ***
            )}
          </div>
          {/*----div de los textos---- */}
          <div className="w-full md:w-3/5 flex flex-col p-8">
            {/*Volver atrás */}

            <div
              className="flex items-center justify-end text-slate-500 my-8 cursor-pointer"
              onClick={() => router.back()}
            >
              <IoArrowBack className="mr-2" />
              <span>Atrás</span>
            </div>

            {/* BREADCRUMBS */}
            <p className="bg-slate-400 text-slate-50 text-sm p-1">
              <Link href={"/"}>
                <span>{`Home > `} </span>
              </Link>
              {`${category} > ${subcategory} > ${productId}`}
            </p>
            {/* NOMBRE */}
            <div className="ms-2">
              {product && (
                <h1 className="text-2xl text-slate-700 font-bold my-6">
                  {product.nombre}
                </h1>
              )}

              <hr className="my-2" />
              {/* MARCA y MODELO */}
              <div>
                <span className="text-slate-500">Marca: </span>
                <span className="font-bold">{product?.marca}</span>
                <span className="text-slate-500"> - Modelo: </span>
                <span className="font-bold">{product?.modelo}</span>
              </div>
              <hr className="my-2" />
              {/* CODIGOS */}
              <div className="inline-flex bg-slate-200 text-slate-800 text-sm p-1 my-2">
                <span className="me-2">{`Código ${product?.codigoNro}`}</span>
                {product?.codigoAnterior && (
                  <span className="me-2">{`Código anterior: ${product?.codigoAnterior}`}</span>
                )}
              </div>
              {/*Visible sólo ADMIN (session) */}
              {session && session.user?.role === "admin" && (
                <div className="bg-indigo-100 rounded w-full text-slate-500">
                  <div
                    className="border-b-2 border-gray-100 px-4 py-1 cursor-pointer"
                    onClick={() => setVisibleAdmin(!visibleAdmin)}
                  >
                    <div className="flex justify-between items-center text-lg font-light">
                      <span>Visible sólo admin</span>
                      <div>
                        {visibleAdmin ? <IoIosArrowUp /> : <IoIosArrowDown />}
                      </div>
                    </div>
                  </div>
                  {/* Animación de desplazamiento */}
                  <div
                    className={`transition-all duration-500 overflow-hidden ${
                      visibleAdmin ? "max-h-screen" : "max-h-0"
                    }`}
                  >
                    {visibleAdmin && (
                      <AdminDiv
                        product={product}
                        variations={variations}
                        configurations={configurations}
                      />
                    )}
                  </div>
                </div>
              )}

              <p className="text-slate-500 my-6">{product?.detalle}</p>
              {/* COLOR */}
              <hr className="my-2" />
              <p className="my-2 flex flex-row items-center">
                <IoIosColorPalette className="text-red-400 me-1" size={20} />
                <span className="inline-block w-20 font-mono font-bold text-md">
                  COLOR:{" "}
                </span>
                <span className="font-light text-lg uppercase">
                  {product?.color}
                </span>
              </p>
              {/* TALLAS */}
              <p className="my-2 flex flex-row items-center">
                <GiBodyHeight className="text-blue-400 me-1" size={20} />
                <span className="inline-block w-20 font-mono font-bold text-md">
                  TALLAS*:{" "}
                </span>
                {product &&
                  product?.magnitudDisponible
                    .filter((talle) => talle.stock > 0)
                    .map((talle, index) => (
                      <span
                        key={index}
                        className="font-light text-lg uppercase me-2"
                      >
                        {`${talle.magnitud} (${talle.stock})`}
                      </span>
                    ))}
              </p>

              <hr className="my-2" />
              {/* NOTAS */}
              {product?.extra1 || product?.extra2 ? (
                <div className="my-4">
                  <p className="text-slate-600">Notas</p>
                  <div className="ms-2 text-sm text-slate-400">
                    <p>{product?.extra1}</p>
                    <p>{product?.extra2}</p>
                  </div>

                  <hr className="my-2" />
                </div>
              ) : null}

              {product &&
                product?.hashtags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-slate-400 text-slate-50 text-sm p-2 m-4"
                  >
                    {tag}
                  </span>
                ))}
              <div className="text-xs text-slate-400 my-12">
                *Disponibilidad de talles y números sujeta al stock en tienda
                física. Las imágenes en ocasiones pueden ser solo ilustrativas.
                Para más información sobre este producto, no dudes en
                contactarnos.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageProductDetail;

const LoadingDiv = () => {
  return (
    <div className="w-full min-h-screen bg-slate-50 text-center pt-20 flex justify-center">
      <InfinitySpin
        visible={true}
        width="200"
        color="#4fa94d"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
};

const AdminDiv = ({ product, variations, configurations }) => {
  // console.log(variations);

  const grupoDeValores = variations?.grupoDeValores?.find(
    (varItem) => varItem.IDgrupoDeValores === product?.IDgrupoDeValores
  ) ?? { grupoDeValores: "No disponible", precioLista: 0, descEfectPorc: 0 };

  return (
    <div className="flex flex-col justify-center p-2">
      {/*--- Oferta ? ---- */}
      <div className="flex flex-row flex-wrap ">
        <span>Producto en Oferta? : {product?.enOferta ? "Sí" : "No"}</span>
        {product?.enOferta && (
          <span>{`Descuento Oferta: ${product?.porcentajeDescuentoOferta} %`}</span>
        )}
      </div>

      {/* -- Precios -- */}
      <div className="flex flex-col ">
        <span>{`Precio de compra: $${product?.precioCompra} - Fecha compra: ${product?.fechaCompra}`}</span>
        <hr className="border border-gray-100 my-2" />
        {/* Coeficiente de  venta */}
        <div className="flex flex-row flex-wrap italic">
          <span>{`Coeficiente de venta: ${configurations?.coeficienteVenta}`}</span>
        </div>
        <div className="flex flex-row flex-wrap">
          {product?.esPrecioVentaDeGrupo ? (
            // precio de venta grupal
            <div className="w-full">
              <div>
                <span>Precio de venta asociado al grupo: </span>
                <span className="italic">{grupoDeValores.grupoDeValores}</span>
              </div>
              <div className="flex flex-row items-center gap-4">
                <div>
                  <span>Precios: Lista $</span>
                  <span className="font-bold text-xl">
                    {grupoDeValores.precioLista *
                      (configurations?.coeficienteVenta || 1)}
                    .00
                  </span>
                </div>
                <div>
                  <span>Dcto Efec.: </span>
                  <span>{grupoDeValores.descEfectPorc}%</span>
                </div>
                <div>
                  <span>Efectivo $</span>
                  <span className="font-bold text-xl">
                    {grupoDeValores.precioLista *
                      (configurations?.coeficienteVenta || 1) *
                      (1 - grupoDeValores.descEfectPorc / 100)}
                    .00
                  </span>
                </div>
              </div>
            </div>
          ) : (
            // precio de venta individual

            <div className="w-full">
              <div>
                <span>Precio de venta individual. </span>
              </div>
              <div className="flex flex-row items-center gap-4">
                <div>
                  <span>Precios: Lista $</span>
                  <span className="font-bold text-xl">
                    {product?.precioVenta *
                      (configurations?.coeficienteVenta || 1)}
                    .00
                  </span>
                </div>
                <div>
                  <span>Dcto Efec.: </span>
                  <span>{product?.descEfectPorc || 10}%</span>
                </div>
                <div>
                  <span>Efectivo $</span>
                  <span className="font-bold text-xl">
                    {product?.precioVenta *
                      (configurations?.coeficienteVenta || 1) *
                      (1 - (product?.descEfectPorc || 10) / 100)}
                    .00
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* -- Stock total -- */}
      <hr className="border border-gray-100 my-2" />
      <span className="">{`Stock total en todos las tallas: ${product?.stockTotal} un`}</span>
      <hr className="border border-gray-100 my-2" />

      {/*--- Botones --- */}
      <Link
        href={`/dashboard/productedit/${product.categoria}/${product.subcategoria}/${product?.docID}`}
        className="inline-block mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded px-2"
      >
        Editar Producto
      </Link>
      {!product?.publicado && (
        <p className="m-4 text-red-700 font-bold">Producto no publicado</p>
      )}
    </div>
  );
};
