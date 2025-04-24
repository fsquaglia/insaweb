"use client";
import { getNodoRealtime } from "@/utils/firebase/fetchFirebase";
import { useEffect, useState } from "react";
import HistoryUnit from "./HistoryUnit";
import SkeletonLoader from "@/ui/SkeletonLoader";

function PageHistory() {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);

  //pedir datos al nodo historia de realtime
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNodoRealtime("historia");
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
          <HistoryUnit key={key} historyNum={values[key]} historyKey={key} />
        ))
      )}
    </div>
  );
}

export default PageHistory;
