import { getDocumentById } from "@/utils/firebase/fetchFirebase";
export const revalidate = Number(process.env.NEXT_PUBLIC_REVALIDATE_LARGE);

export async function GET(req, { params }) {
  const userId = params.slug;

  try {
    // Obtener el encabezado personalizado
    const noCache = req.headers.get("x-no-cache") === "true";

    // Obtener el documento del usuario desde Firebase
    const user = await getDocumentById("contactos", userId);

    // Verifica si se encontró el usuario
    if (!user) {
      return new Response(
        JSON.stringify({ error: "No se encontró el usuario" }),
        { status: 404 }
      );
    }

    // Configura encabezados dinámicos
    const headers = new Headers();
    if (noCache) {
      headers.set("Cache-Control", "no-store"); // No cachear si se solicita
    } else {
      headers.set(
        "Cache-Control",
        `s-maxage=${process.env.NEXT_PUBLIC_REVALIDATE_LARGE}, stale-while-revalidate`
      );
    }

    return new Response(JSON.stringify(user), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener el usuario" }),
      { status: 500 }
    );
  }
}
