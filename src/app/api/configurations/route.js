import { getDocConfig } from "@/utils/firebase/fetchFirebase";

export const revalidate = 10800; // Cachea la respuesta por 3 horas

export async function GET(req) {
  try {
    // Realiza la consulta a Firestore
    const configurations = await getDocConfig();
    if (!configurations) throw new Error("Error obteniendo configuraciones");
    return new Response(JSON.stringify(configurations), { status: 200 });
  } catch (error) {
    console.error("Error obteniendo configuraciones:", error);
    return new Response(
      JSON.stringify({ error: "Error obteniendo configuraciones" }),
      { status: 500 }
    );
  }
}
