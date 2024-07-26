import React from "react";
import ButtonDashboard from "./ButtonDashboard";
import InputCustom from "./InputCustom";
import ImgCustom from "./ImgCustom";
import { stringSizing } from "@/utils/SettingSizing";
import SwitchVisible from "./SwitchVisible";

export default function ComboCustom({
  title,
  description,
  img,
  section,
  urlImgReturn,
  handleChange,
  onclick,
  switchLabel,
  initialValue,
  onToggle,
}) {
  //restricciones de img extraidas de SettingSizing
  const { maxLengthTitle, maxLengthDescription } = stringSizing[section];

  return (
    <div className="block flex flex-row flex-wrap justify-center my-4 bg-gray-100 p-6">
      {/*div de la imagen */}

      <ImgCustom img={img} section={section} urlImgReturn={urlImgReturn} />

      {/*div de los input */}
      <div className="w-96 h-96 flex flex-col justify-center border p-4 shadow-lg bg-gray-50">
        {title !== undefined && title !== null && (
          <InputCustom
            labelText="Título"
            name="titulo"
            inputValue={title}
            onChange={handleChange}
            charLimit={maxLengthTitle}
          />
        )}
        {description !== undefined && description !== null && (
          <InputCustom
            labelText="Descripción"
            name="descripcion"
            type="area"
            inputValue={description}
            onChange={handleChange}
            charLimit={maxLengthDescription}
          />
        )}
        <SwitchVisible
          switchLabel={switchLabel}
          initialValue={initialValue}
          onToggle={onToggle}
        />

        <ButtonDashboard textButton={"Actualizar"} onclick={onclick} />
      </div>
    </div>
  );
}
