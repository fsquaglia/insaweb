import { getDocumentsOfCollection } from "@/utils/firebase/fetchFirebase";

export async function GET(req, { params }) {
  const userId = params.slug;
  try {
    const collectionPath = `contactos/${userId}/historialAcciones`;

    const events = await getDocumentsOfCollection(collectionPath, 5);

    // Verifica si se encontraron documentos
    if (!events || events.length === 0) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    // const eventsData = [];
    // for (const event of events) {
    //   if (event.historialDiario != null) {
    //     // Asegura que no sea null o undefined
    //     for (const element in event.historialDiario) {
    //       eventsData.push(event.historialDiario[element]);
    //     }
    //   }
    // }
    // aplanar el array de objetos anidados
    const eventsData = events.flatMap((event) => event.historialDiario ?? []);
    // Ordena los eventos por fecha de forma descendente
    eventsData.sort((a, b) => {
      const dateA = new Date(a.fecha);
      const dateB = new Date(b.fecha);
      return dateB - dateA;
    });
    return new Response(JSON.stringify(eventsData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al obtener los eventos:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener los eventos" }),
      { status: 500 }
    );
  }
}
