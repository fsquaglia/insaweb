import { getCategoryProduct } from "@/utils/firebase/fetchFirebase";
import { get } from "firebase/database";

export const revalidate = 21600; // Cachea la respuesta por 6 horas

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const categoria = searchParams.get("categoria");

  // Verifica si los parámetros están presentes
  if (!categoria) {
    return new Response(
      JSON.stringify({ error: "Falta parámetro categoria" }),
      { status: 400 }
    );
  }

  try {
    // Realiza la consulta a Firestore
    const category = await getCategoryProduct(categoria);

    // Verifica si se encontraron productos
    if (!category || Object.keys(category).length === 0) {
      return new Response(
        JSON.stringify({ error: "No se encontró categoría" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(category), { status: 200 });
  } catch (error) {
    // Captura cualquier error ocurrido durante la consulta
    console.error("Error al obtener pcategoría:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener categoría" }),
      { status: 500 }
    );
  }
}
