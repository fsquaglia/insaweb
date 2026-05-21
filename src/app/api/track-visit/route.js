import { registerSiteVisit } from "@/utils/firebase/fetchFirebase";
import { getSiteStats } from "@/utils/firebase/fetchFirebase";

export async function POST() {
  try {
    await registerSiteVisit();
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Error al registrar visita",
        details: error.toString(),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

export async function GET() {
  try {
    const stats = await getSiteStats();
    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Error al obtener stats",
        details: error.toString(),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
