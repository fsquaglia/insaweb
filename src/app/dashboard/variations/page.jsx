import { getNodoRealtime } from "@/utils/firebase/fetchFirebase";
import VariationsPage from "./Variations";
import SkeletonLoader from "@/ui/SkeletonLoader";
import { Suspense } from "react";

async function PageVariations() {
  let variations = null;
  try {
    variations = await getNodoRealtime("variaciones");
  } catch (error) {
    console.error("Error fetching variations:", error);
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
