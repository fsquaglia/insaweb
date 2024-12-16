import React from "react";
import { getNodoRealtime } from "@/utils/firebase/fetchFirebase";
import VariationsPage from "./Variations";
import SkeletonLoader from "@/ui/SkeletonLoader";

async function PageVariations() {
  let variations = null;
  try {
    variations = await getNodoRealtime("variaciones");
  } catch (error) {
    console.error("Error fetching variations:", error);
  }

  return (
    <div className="container">
      {variations ? (
        <VariationsPage variations={variations} />
      ) : (
        <SkeletonLoader />
      )}
    </div>
  );
}

export default PageVariations;
