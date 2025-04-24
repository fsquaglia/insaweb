"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  getNodoRealtime,
  setNodoRealtime,
} from "@/utils/firebase/fetchFirebase";
import Swal from "sweetalert2";
import ComboCustom from "@/ui/ComboCustom";
import SkeletonLoader from "@/ui/SkeletonLoader";
import { revalidateSomePath } from "@/utils/actions/actions";

export default function SloganPage() {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);

  //pedir datos al nodo eslogan de realtime
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNodoRealtime("eslogan");
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

  const urlImgReturn = (data) => {
    data ? setValues({ ...values, imagen: data }) : null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const onToggle = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      visible: value,
    }));
  };

  //Button Actualizar
  const onclick = async () => {
    try {
      await setNodoRealtime("eslogan", values);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Listo!",
        showConfirmButton: false,
        timer: 1500,
      });
      await revalidateSomePath("/");
    } catch (error) {
      console.error("Error! ", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Algo está mal...",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="container flex flex-col items-center text-center">
      {loading ? (
        <SkeletonLoader />
      ) : (
        <ComboCustom
          title={values?.titulo || ""}
          description={null}
          handleChange={handleChange}
          img={values?.imagen || ""}
          section={"slogan"}
          urlImgReturn={urlImgReturn}
          onclick={onclick}
          switchLabel={"Visible en Home:"}
          initialValue={values?.visible}
          onToggle={onToggle}
        />
      )}
    </div>
  );
}
