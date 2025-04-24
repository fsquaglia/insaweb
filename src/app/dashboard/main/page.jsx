"use client";
import React, { useState, useEffect } from "react";
import {
  getNodoRealtime,
  setNodoRealtime,
} from "@/utils/firebase/fetchFirebase";
import Swal from "sweetalert2";
import SkeletonLoader from "@/ui/SkeletonLoader";
import ComboCustom from "@/ui/ComboCustom";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({});

  //pedir datos al nodo MAIN de realtime
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNodoRealtime("main");
        if (data) {
          setValues(data);
          // console.log(data);
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
      await setNodoRealtime("main", values);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Listo!",
        showConfirmButton: false,
        timer: 1500,
      });
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
          title={null}
          description={null}
          text1={values?.texto1}
          text2={values?.texto2}
          text3={values?.texto3}
          handleChange={handleChange}
          img={values?.imagen || ""}
          section={"main"}
          urlImgReturn={urlImgReturn}
          onclick={onclick}
          switchLabel={"Visible en Home:"}
          initialValue={values?.visible || false}
          onToggle={onToggle}
        />
      )}
    </div>
  );
}
