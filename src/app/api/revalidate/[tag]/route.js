import { revalidateTag } from "next/cache";

export async function POST(req, { params }) {
  try {
    const { tag } = params;

    if (!tag) {
      return new Response(JSON.stringify({ error: "Falta el tag" }), {
        status: 400,
      });
    }
    // console.log(`Revalidando tag: ${tag}`);

    revalidateTag(tag); // Invalida la cache de ese tag

    return new Response(JSON.stringify({ revalidated: true, tag }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error revalidando:", error);
    return new Response(JSON.stringify({ error: "Error interno" }), {
      status: 500,
    });
  }
}
