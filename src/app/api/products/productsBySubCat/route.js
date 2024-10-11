import { getAllDocsColection } from "@/utils/firebase/fetchFirebase";

export const revalidate = 21600; // Cachea la respuesta por 6 horas

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const categoria = searchParams.get("categoria");
  const subcategoria = searchParams.get("subcategoria");

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

    // Realiza la consulta a Firebase con la ruta dinámica
    const products = await getAllDocsColection(collectionPath);

    // Verifica si se encontraron productos
    if (!products || products.length === 0) {
      return new Response(
        JSON.stringify({ error: "No se encontraron productos" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    // Captura cualquier error ocurrido durante la consulta
    console.error("Error al obtener productos:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener productos" }),
      { status: 500 }
    );
  }
}
