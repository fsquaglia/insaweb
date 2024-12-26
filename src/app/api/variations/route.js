import { getNodoRealtime } from "@/utils/firebase/fetchFirebase";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const variations = await getNodoRealtime("variaciones");
    if (!variations) throw new Error("Error obteniendo datos para variaciones");

    return new Response(JSON.stringify(variations), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Error obteniendo variations:", error);
    return new Response(JSON.stringify({}), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
