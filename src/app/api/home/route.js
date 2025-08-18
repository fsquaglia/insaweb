import { getNodoRealtime } from "@/utils/firebase/fetchFirebase";

// export const revalidate = Number(process.env.NEXT_PUBLIC_REVALIDATE_LARGE);

export async function GET(req) {
  try {
    // Realiza la consulta a Realtime
    const home = await getNodoRealtime("");
    console.log("Datos obtenidos para Home:");

    if (!home) throw new Error("Error obteniendo datos para Home");
    return new Response(JSON.stringify(home), { status: 200 });
  } catch (error) {
    console.error("Error obteniendo home:", error);
    return new Response(JSON.stringify({}), { status: 500 });
  }
}
