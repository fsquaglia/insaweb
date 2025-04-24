"use client";
import ComboCustom from "@/ui/ComboCustom";
import { setNodoRealtime } from "@/utils/firebase/fetchFirebase";
import { useState } from "react";
import Swal from "sweetalert2";
import { revalidateSomePath } from "@/utils/actions/actions";

export default function TeamUnit({ sectionTeam, teamKey }) {
  const [values, setValues] = useState({ ...sectionTeam });

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

  const urlImgReturn = (data) => {
    data ? setValues({ ...values, imagen: data }) : null;
  };

  //Button Actualizar
  const onclick = async () => {
    try {
      await setNodoRealtime(`team/${teamKey}`, values);
      await revalidateSomePath("/");
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
    <div className="p-2 m-2 border rounded-xl flex flex-col text-center items-center">
      <h3>Subsección: {teamKey}</h3>
      <ComboCustom
        title={values?.titulo || ""}
        name={teamKey === "data" ? null : values?.nombre || ""}
        description={values?.descripcion || ""}
        handleChange={handleChange}
        img={values?.imagen || ""}
        section={"team"}
        urlImgReturn={urlImgReturn}
        onclick={onclick}
        switchLabel={"Visible en Home:"}
        initialValue={values?.visible}
        onToggle={onToggle}
      />
    </div>
  );
}
