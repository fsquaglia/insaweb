import { getAllUsers } from "@/utils/firebase/fetchFirebase";

export const revalidate = false;

export async function GET() {
  try {
    const users = await getAllUsers(true);

    // Verifica si se encontraron usuarios
    if (!users || users.length === 0) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    return new Response(
      JSON.stringify({ error: "Error en route obteniendo usuarios" }),
      { status: 500 }
    );
  }
}
