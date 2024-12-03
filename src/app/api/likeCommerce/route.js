import { getDocumentById } from "@/utils/firebase/fetchFirebase";

export const revalidate = false;

export async function GET(req) {
  try {
    const data = await getDocumentById("commerce", "likesCommerce");

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error al obtener el documento:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener el doc. commerce" }),
      { status: 500 }
    );
  }
}
