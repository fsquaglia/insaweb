"use client";

import { getNodoRealtime } from "@/utils/firebase/fetchFirebase";
import { useEffect, useState } from "react";
import TeamUnit from "./TeamUnit";
import SkeletonLoader from "@/ui/SkeletonLoader";

function PageTeam() {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);

  //pedir datos al nodo about de realtime
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNodoRealtime("team");
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
    <div className="container flex flex-col items-center">
      {loading ? (
        <SkeletonLoader />
      ) : (
        Object.keys(values).map((key) => (
          <TeamUnit key={key} sectionTeam={values[key]} teamKey={key} />
        ))
      )}
    </div>
  );
}

export default PageTeam;
