import Link from "next/link";
import CardImage from "./CardImage";
import BackButton from "@/ui/BackButton";
import BubbleWhatsApp from "@/components/whatsapp/BubbleWhatsApp";

async function fetchProduct(category, subcategory, productId) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  try {
    const res = await fetch(
      `${apiUrl}/api/products/productById/${category}/${subcategory}/${productId}`,
      {
        next: {
          tags: ["products", `product-${productId}`],
        },
      },
    );

    if (!res.ok) throw new Error("Error mostrando el producto");
    return res.json();
  } catch (error) {
    console.error(
      "Error al obtener el producto de la BDD: ",
      error,
      error.message,
    );
    return null;
  }
}

export async function generateMetadata({ params }) {
  const [cat, subcat, productId] = params.slug;

  const category = decodeURIComponent(cat);
  const subcategory = decodeURIComponent(subcat);

  const data = await fetchProduct(category, subcategory, productId);

  if (!data) {
    return {
      title: "Producto | Insa Rafaela SA",
      description: "Equipos y repuestos para el agro",
    };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.insarafaela.com.ar";
  const productUrl = `${siteUrl}/product-category/productDetail/${cat}/${subcat}/${productId}`;
  const imagen = data?.imagen?.[0] || null; // primera imagen del producto

  return {
    title: `${data.nombre} | Insa Rafaela SA`,
    description: data.detalle || "Equipos y repuestos para el agro",
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title: `${data.nombre} | Insa Rafaela SA`,
      description: data.detalle || "Equipos y repuestos para el agro",
      url: productUrl,
      siteName: "Insa Rafaela SA",
      type: "website",
      ...(imagen && {
        images: [{ url: imagen, width: 1200, height: 630, alt: data.nombre }],
      }),
    },
    // Tags adicionales con name= para compatibilidad con WhatsApp
    other: {
      "og:title": `${data.nombre} | Insa Rafaela SA`,
      "og:description": data.detalle || "Equipos y repuestos para el agro",
      "og:url": productUrl,
      "og:site_name": "Insa Rafaela SA",
      "og:type": "website",
      ...(imagen && {
        "og:image": imagen,
        // "og:image:width": "1200",
        // "og:image:height": "630",
        "og:image:alt": data.nombre,
      }),
    },
  };
}

export default async function PageProductDetail({ params }) {
  const [cat, subcat, productId] = params.slug;

  const category = decodeURIComponent(cat);
  const subcategory = decodeURIComponent(subcat);

  const data = await fetchProduct(category, subcategory, productId);
  // console.log("Page productDetail data: ", data);

  if (!data) {
    return (
      <div className="w-full min-h-screen bg-slate-50 text-center pt-20 flex justify-center">
        No se pudo cargar el producto.
      </div>
    );
  }

  const images = data?.imagen || [];
  const textAlt = data?.nombre || "Producto";

  //JSON-LD para SEO como un producto para mostrar en Google
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.insarafaela.com.ar";
  const productUrl = `${siteUrl}/product-category/productDetail/${cat}/${subcat}/${productId}`;
  const imagen = data?.imagen?.[0] || null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: data.nombre,
    description: data.detalle || "Equipos y repuestos para el agro",
    url: productUrl,
    brand: {
      "@type": "Brand",
      name: "Insa Rafaela SA",
    },
    ...(imagen && { image: imagen }),
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-col items-stretch items-center justify-center lg:flex-row lg:flex-wrap mt-4 sm:m-8">
        {/*Volver atrás mostrado sólo en pantallas pequeñas*/}
        <div className="w-full h-8 flex items-center justify-end lg:hidden mb-4 pr-4">
          <BackButton />
        </div>
        {/*--- div de las imágenes---- */}
        <div className="w-full lg:w-2/5">
          <CardImage images={images} altText={textAlt} />
        </div>

        {/*----div de los textos---- */}
        <div className="w-full lg:w-3/5 flex flex-col sm:px-8 my-4 lg:my-0">
          <div className="h-20 lg:flex lg:items-end lg:justify-end hidden">
            {/*Volver atrás mostrado sólo en pantallas grandes*/}
            <BackButton />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            {/* BREADCRUMBS */}
            <p className="bg-slate-400 text-slate-50 text-xs sm:text-sm p-1">
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
            </div>
          </div>
          <div className="text-xs text-slate-400 my-12 text-center">
            *Las imágenes son meramente ilustrativas. El producto puede variar
            en color, forma y tamaño. Para más información sobre este producto,
            no dudes en contactarnos.
          </div>
        </div>
        {/* Componente flotante de WhatsApp */}
        <BubbleWhatsApp />
      </div>
    </>
  );
}
