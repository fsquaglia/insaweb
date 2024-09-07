import React from "react";
import { getNodoRealtime } from "@/utils/firebase/fetchFirebase";
import VariationsPage from "./Variations";
import SkeletonLoader from "@/ui/SkeletonLoader";

async function PageVariations() {
  let variations = undefined;
  try {
    variations = await getNodoRealtime("variaciones");
  } catch (error) {
    console.error("Error fetching variations:", error);
  }

  return (
    <div className="container">
      {variations === undefined ? (
        <SkeletonLoader />
      ) : (
        <VariationsPage variations={variations} />
      )}
    </div>
  );
}

export default PageVariations;
