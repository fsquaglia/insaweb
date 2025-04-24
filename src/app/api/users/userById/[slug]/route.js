import { getDocumentById } from "@/utils/firebase/fetchFirebase";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  const userId = params.slug;
  try {
    // Obtener el encabezado personalizado
    const noCache = req.headers.get("x-no-cache") === "true";
    const fullData = req.headers.get("x-full-data") === "true"; // Nuevo header para controlar la visibilidad

    // Obtener el documento del usuario desde Firebase
    const user = await getDocumentById("contactos", userId);

    // Verifica si se encontró el usuario
    if (!user) {
      return new Response(
        JSON.stringify({ error: "No se encontró el usuario" }),
        { status: 404 }
      );
    }

    // Determinar qué datos devolver
    const safeUser = fullData
      ? user
      : (({ password, rol, ...rest }) => rest)(user);

    // Configura encabezados dinámicos
    const headers = new Headers();
    headers.set("Content-Type", "application/json");

    if (noCache) {
      headers.set("Cache-Control", "no-store, max-age=0, must-revalidate");
    } else {
      headers.set(
        "Cache-Control",
        `s-maxage=${process.env.NEXT_PUBLIC_REVALIDATE_LARGE}, stale-while-revalidate`
      );
    }

    return new Response(JSON.stringify(safeUser), {
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
