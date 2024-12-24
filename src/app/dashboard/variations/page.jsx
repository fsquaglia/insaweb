// import { getNodoRealtime } from "@/utils/firebase/fetchFirebase";
import VariationsPage from "./Variations";
import SkeletonLoader from "@/ui/SkeletonLoader";
import { Suspense } from "react";
import MessageComponent from "@/ui/MessageComponent";

export const dynamic = "force-dynamic";

async function PageVariations() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  let variations = null;
  try {
    const variationsResp = await fetch(`${apiUrl}/api/variations`);
    if (variationsResp.ok) {
      variations = await variationsResp.json();
    } else {
      throw new Error("Error obteniendo datos para variaciones");
    }
  } catch (error) {
    console.error("Error fetching variations:", error);
    return (
      <div className="flex mx-auto my-4">
        <MessageComponent
          message="Error al cargar los datos. Intenta recargar la página."
          type="error"
        />
      </div>
    );
  }

  return (
    <div className="container">
      <Suspense fallback={<SkeletonLoader />}>
        <VariationsPage variations={variations} />
      </Suspense>
    </div>
  );
}

export default PageVariations;
