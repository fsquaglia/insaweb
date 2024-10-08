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
  textoSeccionWeb,
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
  const {
    maxLengthTitle,
    maxLengthDescription,
    maxLengthTitleCard,
    maxLengthTextoSeccionWeb,
  } = stringSizing[section];

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
        <div className="columns-2">
          <div className="flex flex-col">
            {docID !== undefined && docID !== null && (
              <InputCustom
                labelText="Doc. ID"
                name="docID"
                inputValue={docID}
                onChange={handleChange}
                charLimit={maxLengthTitle}
              />
            )}
          </div>
          <div className="flex flex-col">
            {titleID !== undefined && titleID !== null && (
              <InputCustom
                labelText="Nombre"
                name="id"
                inputValue={titleID}
                onChange={handleChange}
                charLimit={maxLengthTitle}
              />
            )}
          </div>
        </div>

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

        {textoSeccionWeb !== undefined && textoSeccionWeb !== null && (
          <InputCustom
            labelText="Texto Portal"
            name="textoSeccionWeb"
            type="area"
            inputValue={textoSeccionWeb}
            onChange={handleChange}
            charLimit={maxLengthTextoSeccionWeb}
          />
        )}
        <div className=" flex flex-row items-center">
          <div className="flex flex-col">
            {titleCard !== undefined && titleCard !== null && (
              <InputCustom
                labelText="Texto Home"
                name="tituloCard"
                inputValue={titleCard}
                onChange={handleChange}
                charLimit={maxLengthTitleCard}
              />
            )}
          </div>
          <div className="flex flex-col">
            <SwitchVisible
              switchLabel={switchLabel}
              initialValue={initialValue}
              onToggle={onToggle}
            />
          </div>
        </div>

        <ButtonDashboard
          textButton={textButton || "Actualizar"}
          onclick={onclick}
        />
      </div>
    </div>
  );
}
