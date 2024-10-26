import { getAllUsers } from "@/utils/firebase/fetchFirebase";

export async function GET() {
  try {
    const users = await getAllUsers();

    // Verifica si se encontraron usuarios
    if (!users || users.length === 0) {
      return new Response(
        JSON.stringify({ error: "No se encontrarons usuarios" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(users), {
      status: 200,
    });
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener categorías" }),
      { status: 500 }
    );
  }
}
