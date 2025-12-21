import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import CardImage from "./CardImage";

async function fetchProduct(category, subcategory, productId) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  try {
    const res = await fetch(
      `${apiUrl}/api/products/productById/${category}/${subcategory}/${productId}`,
      {
        next: {
          tags: ["products", `product-${productId}`],
        },
      }
    );

    if (!res.ok) throw new Error("Error mostrando el producto");
    return res.json();
  } catch (error) {
    console.error(
      "Error al obtener el producto de la BDD: ",
      error,
      error.message
    );
    return null;
  }
}

export default async function PageProductDetail({ params }) {
  const [cat, subcat, productId] = params.slug;

  const category = decodeURIComponent(cat);
  const subcategory = decodeURIComponent(subcat);

  const data = await fetchProduct(category, subcategory, productId);
  console.log("Page productDetail data: ", data);

  if (!data) {
    return (
      <div className="w-full min-h-screen bg-slate-50 text-center pt-20 flex justify-center">
        No se pudo cargar el producto.
      </div>
    );
  }

  const images = data?.imagen || [];
  const textAlt = data?.nombre || "Producto";

  return (
    <div className="min-w-screen flex items-center p-5 lg:p-10 overflow-hidden ">
      <div className="w-full max-w-6xl rounded bg-white shadow-xl  mx-auto text-gray-800  md:text-left">
        <div className="flex flex-col md:flex-row md:flex-wrap ">
          {/*--- div de las imágenes---- */}
          <CardImage images={images} altText={textAlt} />

          {/*----div de los textos---- */}
          <div className="w-full md:w-3/5 flex flex-col p-8">
            {/*Volver atrás */}
            <a
              href="javascript:history.back()"
              className="flex items-center justify-end text-slate-500 my-8 cursor-pointer hover:text-slate-700 transition-colors"
            >
              <IoArrowBack className="mr-2" />
              <span>Atrás</span>
            </a>

            {/* BREADCRUMBS */}
            <p className="bg-slate-400 text-slate-50 text-sm p-1">
              <Link href={"/"}>
                <span>{`Home > `} </span>
              </Link>
              {`${category} > ${subcategory} > ${productId}`}
            </p>
            {/* DETALLES Y NOTAS DEL PRODUCTO */}
            <div className="ms-2">
              {/* NOMBRE DEL PRODUCTO*/}
              {data && (
                <h1 className="text-2xl text-slate-700 font-bold my-6">
                  {data.nombre}
                </h1>
              )}
              <hr className="my-2" />
              {/* DETALLE DEL PRODUCTO */}
              <p className="text-slate-500 my-6">
                {data?.detalle || "Detalle"}
              </p>
              <hr className="my-2" />
              {/* NOTAS */}
              <div className="text-xs text-slate-400 my-12">
                *Las imágenes son meramente ilustrativas. El producto puede
                variar en color, forma y tamaño. Para más información sobre este
                producto, no dudes en contactarnos.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
