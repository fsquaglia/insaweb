import { getAllDocsColection } from "@/utils/firebase/fetchFirebase";

export const revalidate = false;

export async function GET(req) {
  try {
    // Realiza la consulta a Firestore
    const categories = await getAllDocsColection("productos");

    // Verifica si se encontraron productos
    if (!categories || categories.length === 0) {
      return new Response(
        JSON.stringify({ error: "No se encontrarons las categorías" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    // Captura cualquier error ocurrido durante la consulta
    console.error("Error al obtener las categorías:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener categorías" }),
      { status: 500 }
    );
  }
}
