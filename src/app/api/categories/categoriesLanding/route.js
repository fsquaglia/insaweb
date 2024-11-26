import { getAllDocsColection } from "@/utils/firebase/fetchFirebase";

export const revalidate = 21600; // Cachea la respuesta por 6 horas

export async function GET(req) {
  try {
    // Realiza la consulta a Firestore
    const categories = await getAllDocsColection("productos");

    // Verifica si se encontraron productos
    if (!categories || categories.length === 0) {
      console.log("No se encontraron categorías");
      return new Response(
        JSON.stringify({ error: "No se encontraron las categorías" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Filtrar por las categorías marcadas como ver en Landing
    let categoriesShowLanding = categories.filter(
      (cat) => cat.docData.showLanding === true
    );

    if (categoriesShowLanding.length > 3) {
      categoriesShowLanding = categoriesShowLanding.slice(0, 3);
    } else if (categoriesShowLanding.length < 3) {
      categoriesShowLanding = categories.slice(0, 3);
    }

    return new Response(JSON.stringify(categoriesShowLanding), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // Captura cualquier error ocurrido durante la consulta
    console.error("Error completo al obtener las categorías:", error);
    return new Response(
      JSON.stringify({
        error: "Error al obtener categorías",
        details: error.toString(),
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
