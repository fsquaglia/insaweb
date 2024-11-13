import { getNodoRealtime } from "@/utils/firebase/fetchFirebase";

export const revalidate = 21600; // Cachea la respuesta por 6 horas

export async function GET(req) {
  try {
    // Realiza la consulta a Realtime
    const home = await getNodoRealtime("");
    if (!home) throw new Error("Error obteniendo datos para Home");
    return new Response(JSON.stringify(home), { status: 200 });
  } catch (error) {
    console.error("Error obteniendo home:", error);
    return new Response(JSON.stringify({}), { status: 500 });
  }
}
