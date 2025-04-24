import { getDocumentsOfCollection } from "@/utils/firebase/fetchFirebase";

export async function GET() {
  try {
    const events = await getDocumentsOfCollection("historial", 5);

    if (!events || events.length === 0) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(events), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al obtener los eventos:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener los eventos" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
