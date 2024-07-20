import React from "react";
import ImgCustom from "./ImgCustom";
import ButtonDashboard from "./ButtonDashboard";
import InputCustom from "./InputCustom";

function ComboCustom({ title, description, img }) {
  return (
    <div className="flex flex-row flex-wrap justify-center items-center gap-4  w-fit my-4 border rounded-xl p-6 bg-gray-100">
      {/*div de la imagen */}
      <div className="w-96 h-96 bg-gray-200 rounded-lg shadow-lg">
        <img src={img} alt="" className="w-96 h-96 " />
      </div>
      {/*div de los input */}
      <div className="w-96 h-96 flex flex-col justify-center border rounded-lg p-4 shadow-lg bg-gray-50">
        <InputCustom
          labelText="Título"
          name="titulo"
          inputValue={title}
          // onChange={handleChange}
          charLimit={maxLengthTitle}
        />
        <InputCustom
          labelText="Descripción"
          name="descripcion"
          type="area"
          inputValue={description}
          // onChange={handleChange}
          charLimit={maxLengthDescription}
        />
        <ButtonDashboard textButton={"Actualizar"} />
      </div>
    </div>
  );
}

export default ComboCustom;
