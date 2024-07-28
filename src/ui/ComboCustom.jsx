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
  text1,
  text2,
  text3,
}) {
  //restricciones de string extraidas de SettingSizing
  let maxLengthTitle,
    maxLengthDescription,
    maxLengthText1,
    maxLengthText2,
    maxLengthText3;

  // Asigna valores a las variables dentro de los bloques condicionales
  if (section === "main") {
    ({ maxLengthText1, maxLengthText2, maxLengthText3 } =
      stringSizing[section]);
  } else {
    ({ maxLengthTitle, maxLengthDescription } = stringSizing[section]);
  }

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
        {text1 !== undefined && text1 !== null && (
          <InputCustom
            labelText="Texto 1"
            name="texto1"
            inputValue={text1}
            onChange={handleChange}
            charLimit={maxLengthText1}
          />
        )}

        {text2 !== undefined && text2 !== null && (
          <InputCustom
            labelText="Texto 2"
            name="texto2"
            inputValue={text2}
            onChange={handleChange}
            charLimit={maxLengthText2}
          />
        )}

        {text3 !== undefined && text3 !== null && (
          <InputCustom
            labelText="Texto 3"
            name="texto3"
            inputValue={text3}
            onChange={handleChange}
            charLimit={maxLengthText3}
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
