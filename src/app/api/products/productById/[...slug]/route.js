import { getProductByID } from "@/utils/firebase/fetchFirebase";

export const revalidate = Number(process.env.NEXT_PUBLIC_REVALIDATE_LARGE);

export async function GET(req, { params }) {
  const [categoria, subcategoria, productId] = params.slug;

  if (!categoria || !subcategoria || !productId) {
    return new Response(
      JSON.stringify({
        error: "Faltan parámetros: categoria, subcategoria o productId",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const product = await getProductByID(categoria, subcategoria, productId);

    if (!product) {
      return new Response(
        JSON.stringify({ error: "No se encontró el producto" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al obtener producto:", error);
    return new Response(
      JSON.stringify({ error: "Error interno al obtener el producto" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
