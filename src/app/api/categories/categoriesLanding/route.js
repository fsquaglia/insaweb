import { getAllDocsColection } from "@/utils/firebase/fetchFirebase";

export const revalidate = 21600; // Cachea la respuesta por 6 horas

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
    //filtrar por las categorías marcadas como ver en Landing
    //luego verificar si existen más o menos de tres para mostrar
    let categoriesShowLanding = categories.filter(
      (cat) => cat.docData.showLanding === true
    );
    if (categoriesShowLanding.length > 3) {
      categoriesShowLanding = categoriesShowLanding.slice(0, 3);
    } else if (categoriesShowLanding.length < 3) {
      categoriesShowLanding = categories.slice(0, 3);
    }

    //orden inverso, para nuestro caso de indumentari solamente
    categoriesShowLanding.reverse();

    return new Response(JSON.stringify(categoriesShowLanding), { status: 200 });
  } catch (error) {
    // Captura cualquier error ocurrido durante la consulta
    console.error("Error al obtener las categorías:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener categorías" }),
      { status: 500 }
    );
  }
}
