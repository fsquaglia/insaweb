import { getAllDocsColection } from "@/utils/firebase/fetchFirebase";

//si recibe una query ?landing=true filtra las categorias que tienen showLanding en true
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const filterLanding = searchParams.get("landing"); // "true" o null

    // Realiza la consulta a Firestore
    const categories = await getAllDocsColection("productos");

    // Verifica si se encontraron productos
    if (!categories || categories.length === 0) {
      return new Response(
        JSON.stringify({ error: "No se encontrarons las categorías" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    let result = categories;

    // Si llega ?landing=true -> filtrar
    if (filterLanding === "true") {
      result = categories.filter((cat) => cat.docData.showLanding === true);
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Captura cualquier error ocurrido durante la consulta
    // console.error("Error completo al obtener las categorías:", error);
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
