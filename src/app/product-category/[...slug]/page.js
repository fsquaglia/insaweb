import Link from "next/link";
import Products from "./Products";

async function getCategoryById(id) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  try {
    const res = await fetch(
      `${apiUrl}/api/categories/categoryById?categoria=${id}`,
      {
        // cache: "revalidate",
        // next: { revalidate: 3600 }, // ISR: revalida cada hora
      }
    );

    if (!res.ok) throw new Error("Error fetching categorías");
    return res.json();
  } catch (error) {
    console.error(error);
    return {};
  }
}

export default async function Page({ params }) {
  const [category, subcategory] = params.slug;
  // categoría y subcategoría vienen codificadas en la URL
  const categoriaURL = decodeURIComponent(category);
  const subcategoriaURL = decodeURIComponent(subcategory || "desconocida");

  // esta imagen puede utilizarse como fondo de sección
  const imageBgUrl =
    "https://res.cloudinary.com/foodexpressimg/image/upload/v1745019896/insarafaela/Anotaci%C3%B3n_2025-04-18_204232_z2o0su.jpg";

  //! MANEJO DE ERROR EN LA RESPUESTA AQUI ??!!
  const categoryData = await getCategoryById(categoriaURL);

  return (
    <div className="w-full min-h-screen bg-white rounded p-6 md:p-12 flex flex-col gap-4">
      {/* BreadCrumb */}
      <p className="text-slate-400 text-sm">
        <Link href="/">Home</Link>
        {` / ${categoriaURL} / ${subcategoriaURL} `}
      </p>
      {/*Titulo*/}
      {/* <span className="text-3xl md:text-5xl font-bold my-6 md:my-10 capitalize">
        {categoryData?.docData?.id}
      </span> */}
      {/*Descripcion*/}
      <p className="text-slate-500 text-justify">
        {categoryData?.docData?.textoSeccionWeb ||
          "Productos o equipos a mostrar"}
      </p>
      {/*Productos*/}
      <div className="my-8">
        <Products category={categoriaURL} subCategory={subcategoriaURL} />
      </div>
    </div>
  );
}
