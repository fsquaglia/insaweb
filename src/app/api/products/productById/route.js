import { getProductByID } from "@/utils/firebase/fetchFirebase";

export const revalidate = 21600; // Cachea la respuesta por 6 horas

export async function GET(req) {
  try {
    // Extrae los parámetros de la URL
    const { searchParams } = new URL(req.url);
    const categoria = searchParams.get("categoria");
    const subcategoria = searchParams.get("subcategoria");
    const productId = searchParams.get("productId");

    // Verifica si los parámetros están presentes
    if (!categoria || !subcategoria || !productId) {
      return new Response(
        JSON.stringify({
          error: "Faltan parámetros: categoria, subcategoria o productId",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Realiza la consulta a Firestore
    const product = await getProductByID(categoria, subcategoria, productId);

    // Verifica si se encontró el producto
    if (!product) {
      return new Response(
        JSON.stringify({ error: "No se encontró el producto" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Devuelve el producto encontrado
    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Captura cualquier error ocurrido durante la consulta
    console.error("Error al obtener producto:", error);
    return new Response(
      JSON.stringify({ error: "Error interno al obtener el producto" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
