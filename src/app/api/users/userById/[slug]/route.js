import { getDocumentById } from "@/utils/firebase/fetchFirebase";
export const revalidate = Number(process.env.NEXT_PUBLIC_REVALIDATE_LARGE);

export async function GET(req, { params }) {
  const userId = params.slug;

  try {
    const user = await getDocumentById("contactos", userId);

    // Verifica si se encontraron usuarios
    if (!user) {
      return new Response(
        JSON.stringify({ error: "No se encontró el usuario" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener el usuario" }),
      { status: 500 }
    );
  }
}
