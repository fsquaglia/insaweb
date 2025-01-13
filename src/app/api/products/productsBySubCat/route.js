import { getProductItemsFirestore } from "@/utils/firebase/fetchFirebase";

//!ver si podemos usar params en lugar de search params para usar revalidate y rutas estáticas
// export const revalidate = 21600;

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const categoria = decodeURIComponent(searchParams.get("categoria"));
  const subcategoria = decodeURIComponent(searchParams.get("subcategoria"));
  const includeProductsWithoutStock =
    searchParams.get("includeProductsWithoutStock") === "true";
  const limit = parseInt(searchParams.get("limit")) || 12;
  const startAfter = searchParams.get("startAfter") || null;

  if (!categoria || !subcategoria) {
    return new Response(
      JSON.stringify({ error: "Faltan parámetros: categoria o subcategoria" }),
      { status: 400 }
    );
  }

  try {
    const collectionPath = `productos/${categoria}/${subcategoria}`;
    const { products, lastVisible, totalDocs } = await getProductItemsFirestore(
      collectionPath,
      categoria,
      subcategoria,
      limit,
      startAfter,
      includeProductsWithoutStock
    );

    if (!products || products.length === 0) {
      return new Response(
        JSON.stringify({ error: "No se encontraron productos" }),
        { status: 404 }
      );
    }
    // console.log(
    //   `lastVisible api ${lastVisible?._document.data.value.mapValue.fields.docID.stringValue}`
    // );
    console.log(lastVisible);

    return new Response(JSON.stringify({ products, lastVisible, totalDocs }), {
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
