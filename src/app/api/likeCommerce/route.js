import { getDocumentById } from "@/utils/firebase/fetchFirebase";

// export const revalidate = false;

export async function GET(req) {
  try {
    // Obtener los datos desde Firebase
    const data = await getDocumentById("commerce", "likesCommerce");
    console.log("data en route: ", data);

    // Configurar encabezados para evitar cualquier tipo de caché
    const headers = new Headers();
    headers.set("Cache-Control", "no-store");

    return new Response(JSON.stringify(data), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Error al obtener el documento:", error);

    return new Response(
      JSON.stringify({ error: "Error al obtener el doc. commerce" }),
      {
        status: 500,
        headers: { "Cache-Control": "no-store" }, // También aplicar no-store en errores
      }
    );
  }
}
