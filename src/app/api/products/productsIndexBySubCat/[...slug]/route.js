import { getDocumentById } from "@/utils/firebase/fetchFirebase";

export const revalidate = Number(process.env.NEXT_PUBLIC_REVALIDATE_LARGE);

export async function GET(req, { params }) {
  const [categoriaURI, subcategoriaURI] = params.slug;

  const categoria = decodeURIComponent(categoriaURI);
  const subcategoria = decodeURIComponent(subcategoriaURI);

  if (!categoria || !subcategoria) {
    return new Response(
      JSON.stringify({
        error: "Faltan parámetros: categoria o subcategoria",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
  //!hay que hacer los filtros
  try {
    const allProducts = await getDocumentById("indices", "indicePorIdProducto");

    if (!allProducts || allProducts.length === 0) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    //refactorizar en un array de objetos
    const productsArray = Object.entries(allProducts)
      .filter(([key]) => key !== "id") // Excluimos la clave "id"
      .map(([id, [categoria, subcategoria, nombre, imagen]]) => ({
        id,
        categoria,
        subcategoria,
        nombre,
        imagen,
      }));
    //filtrar por la categoria y subcategoria
    const products = productsArray.filter(
      (product) =>
        product.categoria === categoria && product.subcategoria === subcategoria
    );
    //ordenar alfabéticamente
    products.sort((a, b) => a.nombre.localeCompare(b.nombre));

    if (products.length === 0) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    return new Response(JSON.stringify(products), {
      status: 200,
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener productos" }),
      { status: 500 }
    );
  }
}
