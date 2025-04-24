"use client";
import { getNodoRealtime } from "@/utils/firebase/fetchFirebase";
import { useEffect, useState } from "react";
import SkeletonLoader from "@/ui/SkeletonLoader";
import ComboInputs from "@/ui/ComboInputs";
import SocialMediaImgs from "./SocialMediaImgs";

function PageSocialMedia() {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);

  //pedir datos al nodo contacto de realtime
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNodoRealtime("contacto");
        if (data) {
          setValues(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="container flex flex-row flex-wrap gap-2 justify-center">
      {loading ? (
        <>
          <SkeletonLoader />
        </>
      ) : (
        <>
          {Object.keys(values).map((key) => (
            <ComboInputs
              key={key}
              section={"contact"}
              sectionFirebase={"contacto"}
              subSection={key}
              subObject={values[key]}
              pathToRevalidate={"/"}
            />
          ))}
          <SocialMediaImgs valuesData={values} />
        </>
      )}
    </div>
  );
}

export default PageSocialMedia;
