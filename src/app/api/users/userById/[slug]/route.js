import { getDocumentById } from "@/utils/firebase/fetchFirebase";

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

    // Excluir propiedades sensibles
    const { password, rol, ...safeUser } = user;

    // Configura encabezados dinámicos
    const headers = new Headers();
    if (noCache) {
      headers.set("Cache-Control", "no-store, max-age=0, must-revalidate");
      headers.set("Content-Type", "application/json");
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
