import Link from "next/link";

async function getCategorias() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  try {
    const res = await fetch(`${apiUrl}/api/categories/categories`, {
      // cache: "revalidate",
      // next: { revalidate: 3600 }, // ISR: revalida cada hora
    });

    if (!res.ok) throw new Error("Error fetching categorías");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

function MessageNotFound({
  title = "Título",
  message = "Hubo un error",
  linkHref = "/categories",
  linkText = "Volver a Categorías",
}) {
  return (
    <div>
      <div className="h-24"></div>
      <div className="p-8 flex flex-col gap-8 items-center text-center">
        <h2 className="text-2xl font-semibold mb-4 text-slate-500">{title}</h2>
        <p className="text-slate-500">{message}</p>
        <Link
          href={linkHref}
          className="bg-green-400 rounded p-4 text-white hover:bg-green-500 transition"
        >
          {linkText}
        </Link>
      </div>
    </div>
  );
}

export default async function layout({ children, params }) {
  const [category, subcategory] = params.slug;
  // categoría y subcategoría vienen codificadas en la URL
  const categoriaURL = decodeURIComponent(category);
  const subcategoriaURL = decodeURIComponent(subcategory || "desconocida");

  // Obtener todas las categorías de la BDD y ordenarlas alfabéticamente
  // [ 'Equipos', 'Galpones', 'Plantas', 'Repuestos', 'Silos', 'Vehículos' ]
  const categorias = await getCategorias();
  //! MANEJO DE ERROR EN LA RESPUESTA DEL FETCH 👆

  const categoriesOrdered = (categorias || [])
    .map((cat) => cat.docData.id)
    .sort((a, b) => a.localeCompare(b));

  // Verificar si la categoría de la URL existe
  if (!categoriesOrdered.includes(categoriaURL)) {
    const message = `La categoría "${categoriaURL}" no existe. Por favor, verifica la URL.`;
    return (
      <MessageNotFound title="Categoría no encontrada" message={message} />
    );
  }

  // Si la categoría existe, verificar si la subcategoría existe dentro de esa categoría
  const categoriaData = categorias.find(
    (cat) => cat.docData.id === categoriaURL
  );
  const subcategoriesList = (categoriaData.docData.subcategorias || []).sort(
    (a, b) => a.localeCompare(b)
  );

  if (!subcategoriesList.includes(subcategoriaURL)) {
    const message = `La subcategoría "${subcategoriaURL}" no existe dentro de la categoría "${categoriaURL}". Por favor, verifica la URL o regresa a la página de Categorías.`;
    return (
      <MessageNotFound title="Subcategoría no encontrada" message={message} />
    );
  }

  return (
    <div>
      <div className="h-24"></div>
      <div className="container max-w-7xl py-6 md:py-8 flex flex-col md:flex-row gap-2 lg:gap-12">
        {/* Sidebar con categorías y subcategorías */}
        <div className="flex flex-col gap-4 my-4 md:my-12 text-slate-800 md:w-1/4 mx-4">
          {/* Título de categoría */}
          <span className="text-lg md:text-3xl md:mb-6 mb-2 font-bold text-slate-500">
            {categoriaURL}
          </span>
          {/* Subcategorías */}
          {subcategoriesList.length > 0 &&
            subcategoriesList.map((item, index) => (
              <Link
                key={index}
                href={`/product-category/${categoriaURL}/${item}`}
                className={`cursor-pointer ms-4 ${
                  item === subcategoriaURL &&
                  "bg-gray-700 text-gray-50 rounded p-2"
                }`}
              >
                {item}
              </Link>
            ))}
        </div>
        {/* Contenido dinámico */}
        <div className="md:w-3/4">{children}</div>
      </div>
    </div>
  );
}
