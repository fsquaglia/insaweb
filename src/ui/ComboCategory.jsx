import React from "react";
import ButtonDashboard from "./ButtonDashboard";
import InputCustom from "./InputCustom";
import ImgCustom from "./ImgCustom";
import { stringSizing } from "@/utils/SettingSizing";
import SwitchVisible from "./SwitchVisible";

export default function ComboCategory({
  docID,
  titleID,
  description,
  titleCard,
  switchLabel,
  initialValue,
  onToggle,
  img,
  section,
  folderStorage,
  urlImgReturn,
  handleChange,
  onclick,
  textButton,
}) {
  //restricciones de string extraidas de SettingSizing
  const { maxLengthTitle, maxLengthDescription, maxLengthTitleCard } =
    stringSizing[section];

  return (
    <div className="block flex flex-row flex-wrap justify-center my-4 bg-gray-100 p-6">
      {/*div de la imagen */}

      <ImgCustom
        img={img}
        section={section}
        urlImgReturn={urlImgReturn}
        folderStorage={folderStorage}
        imageFormat={"vertical"}
      />

      {/*div de los input */}
      <div className="w-96 min-h-96 flex flex-col justify-center border p-4 shadow-lg bg-gray-50">
        {docID !== undefined && docID !== null && (
          <InputCustom
            labelText="Doc. ID"
            name="docID"
            inputValue={docID}
            onChange={handleChange}
            charLimit={maxLengthTitle}
          />
        )}
        {titleID !== undefined && titleID !== null && (
          <InputCustom
            labelText="Nombre"
            name="id"
            inputValue={titleID}
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
        {titleCard !== undefined && titleCard !== null && (
          <InputCustom
            labelText="Texto Home"
            name="tituloCard"
            inputValue={titleCard}
            onChange={handleChange}
            charLimit={maxLengthTitleCard}
          />
        )}

        <SwitchVisible
          switchLabel={switchLabel}
          initialValue={initialValue}
          onToggle={onToggle}
        />

        <ButtonDashboard
          textButton={textButton || "Actualizar"}
          onclick={onclick}
        />
      </div>
    </div>
  );
}
