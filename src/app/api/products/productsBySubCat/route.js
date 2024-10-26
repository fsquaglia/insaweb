import { getProductFirestore } from "@/utils/firebase/fetchFirebase";

// export const revalidate = 21600;

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const categoria = decodeURIComponent(searchParams.get("categoria"));
  const subcategoria = decodeURIComponent(searchParams.get("subcategoria"));
  // Obtener el valor del query "includeProductsWithoutStock" y convertirlo a booleano
  const includeProductsWithoutStock =
    searchParams.get("includeProductsWithoutStock") === "true";
  const limit = parseInt(searchParams.get("limit")) || 12; // Cantidad de productos por página (default 12)
  const startAfter = searchParams.get("startAfter") || null; // Cursor para la paginación

  // Verifica si los parámetros están presentes
  if (!categoria || !subcategoria) {
    return new Response(
      JSON.stringify({ error: "Faltan parámetros: categoria o subcategoria" }),
      { status: 400 }
    );
  }

  try {
    // Concatena la ruta completa de la colección
    const collectionPath = `productos/${categoria}/${subcategoria}`;

    // Obtener los productos paginados desde Firestore
    const { products, lastVisible } = await getProductFirestore(
      collectionPath,
      limit,
      startAfter,
      includeProductsWithoutStock
    );

    // Realiza la consulta a Firebase con la ruta dinámica
    /* const productsWithdocBase = await getAllDocsColection(collectionPath);
     let products = [];
     if (includeProductsWithoutStock) {
      
      products = productsWithdocBase.filter(
        (prod) => prod.docID !== "docBase" && prod.docData.publicado === true
      );
    } else {
            products = productsWithdocBase.filter(
        (prod) =>
          prod.docID !== "docBase" &&
          prod.docData.publicado === true &&
          prod.docData.stockTotal > 0
      );
    } */

    // Verifica si se encontraron productos
    if (!products || products.length === 0) {
      return new Response(
        JSON.stringify({ error: "No se encontraron productos" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ products, lastVisible }), {
      status: 200,
    });
  } catch (error) {
    // Captura cualquier error ocurrido durante la consulta
    console.error("Error al obtener productos:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener productos" }),
      { status: 500 }
    );
  }
}
