"use client";
import React, { useState } from "react";
import ImgCustom from "@/ui/ImgCustom";
import ButtonDashboard from "@/ui/ButtonDashboard";
import { setNodoRealtime } from "@/utils/firebase/fetchFirebase";
import Swal from "sweetalert2";
import { revalidateSomePath } from "@/utils/actions/actions";

function SocialMediaImgs({ valuesData }) {
  const [values, setValues] = useState(valuesData);

  const urlImgReturnFondo = (data) => {
    if (data) {
      setValues((prevValues) => ({
        ...prevValues,
        socialMedia: {
          ...prevValues.socialMedia,
          imagenFondoSocialMedia: data,
        },
      }));
    }
  };

  //Button Actualizar
  const onclickFondo = async () => {
    try {
      await setNodoRealtime("contacto/socialMedia", values.socialMedia);
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
    <div className="container flex flex-row flex-wrap gap-2 justify-center">
      <div className="block flex flex-col flex-wrap  items-center my-4 bg-gray-100 p-6">
        <h3 className="mb-2">Imagen de fondo</h3>
        <ImgCustom
          img={values?.socialMedia?.imagenFondoSocialMedia}
          section={"contact"}
          urlImgReturn={urlImgReturnFondo}
        />
        <ButtonDashboard textButton={"Actualizar"} onclick={onclickFondo} />
      </div>
      <div className="block flex flex-col flex-wrap  items-center my-4 bg-gray-100 p-6">
        <h3 className="mb-2">Logo comercio ...a futuro</h3>
        <ImgCustom img={""} section={"contactLogo"} />
        <ButtonDashboard textButton={"Actualizar"} />
      </div>
    </div>
  );
}

export default SocialMediaImgs;
