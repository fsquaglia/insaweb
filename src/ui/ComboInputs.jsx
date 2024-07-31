"use client";
import React, { useState } from "react";
import ButtonDashboard from "./ButtonDashboard";
import InputCustom from "./InputCustom";
import { stringSizing } from "@/utils/SettingSizing";
import { setNodoRealtime } from "@/utils/firebase/fetchFirebase";
import Swal from "sweetalert2";

export default function ComboInputs({
  section,
  subSection,
  subObject,
  sectionFirebase,
}) {
  const [values, setValues] = useState({ ...subObject });

  //restricciones de string extraidas de SettingSizing
  const {
    maxLengthFantasy,
    maxLengthRazon,
    maxLengthPhone,
    maxLengthCelPhone,
    maxLengthEmail,
    maxLengthFace1,
    maxLengthFace2,
    maxLengthInsta1,
    maxLengthInsta2,
    maxLengthTitleSocial,
    maxLengthAddress,
    maxLengthLocation,
    maxLengthProvince,
  } = stringSizing[section];

  // Crear un arreglo de inputs dinámicamente
  const inputs = [
    {
      label: "Nombre de fantasía",
      maxLength: maxLengthFantasy,
      name: "fantasia",
    },
    {
      label: "Razón social",
      maxLength: maxLengthRazon,
      name: "razonSocial",
    },
    { label: "Teléfono", maxLength: maxLengthPhone, name: "TE" },
    {
      label: "Celular",
      maxLength: maxLengthCelPhone,
      name: "cel",
    },
    { label: "Email", maxLength: maxLengthEmail, name: "email" },
    {
      label: "Facebook 1",
      maxLength: maxLengthFace1,
      name: "facebook1",
    },
    {
      label: "Facebook 2",
      maxLength: maxLengthFace2,
      name: "facebook2",
    },
    {
      label: "Instaram 1",
      maxLength: maxLengthInsta1,
      name: "instagram1",
    },
    {
      label: "Instagram 2",
      maxLength: maxLengthInsta2,
      name: "instagram2",
    },
    {
      label: "Título sección",
      maxLength: maxLengthTitleSocial,
      name: "tituloSocialMedia",
    },
    {
      label: "Dirección",
      maxLength: maxLengthAddress,
      name: "direccion",
    },
    {
      label: "Localidad",
      maxLength: maxLengthLocation,
      name: "localidad",
    },
    {
      label: "Provincia",
      maxLength: maxLengthProvince,
      name: "provincia",
    },
  ].filter((input) => subObject[input.name] !== undefined);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const urlImgReturn = (data) => {
    data ? setValues({ ...values, imagen: data }) : null;
  };

  //Button Actualizar
  const onclick = async () => {
    try {
      await setNodoRealtime(`${sectionFirebase}/${subSection}`, values);
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
    <div className="block flex flex-col flex-wrap  items-center my-4 bg-gray-100 p-6">
      <h3 className="mb-2">SubSección: {subSection}</h3>
      <div className="w-96 min-h-96 flex flex-col  border p-4 shadow-lg bg-gray-50">
        <div className="flex flex-col min-h-96">
          {inputs.map((input, index) => (
            <InputCustom
              key={index}
              labelText={input.label}
              name={input.name}
              inputValue={values[input.name]}
              onChange={handleChange}
              charLimit={input.maxLength}
            />
          ))}
        </div>
        <div>
          <ButtonDashboard textButton={"Actualizar"} onclick={onclick} />
        </div>
      </div>
    </div>
  );
}
