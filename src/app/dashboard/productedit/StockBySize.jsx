"use client";

import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import InputCustom from "@/ui/InputCustom";
import ButtonDashboard from "@/ui/ButtonDashboard";

function CustomSelect({ options }) {
  const customOptions = options.map((option) => ({
    label: option,
    value: option,
  }));

  return (
    <div className="border p-2 rounded flex flex-row flex-wrap">
      {/* Contenedor izquierdo */}
      <div className="flex flex-col w-1/2 p-2">
        <div className="flex flex-row items-center w-full gap-2 mb-2">
          <label htmlFor="size" className="text-sm mx-2 w-24">
            Tamaño
          </label>
          <CreatableSelect
            isClearable
            options={customOptions}
            placeholder="Selecciona o tipea..."
            className="w-full text-sm"
          />
        </div>

        <div className="flex flex-row items-center w-full gap-2 mb-2">
          <label htmlFor="amount" className="text-sm mx-2 w-24">
            Cantidad
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="1"
            className="w-full border rounded p-1 text-sm p-2"
          />
        </div>

        <div className="flex mx-auto">
          <ButtonDashboard textButton={"Agregar"} />
        </div>
      </div>

      {/* Contenedor derecho */}
      <div className=" w-1/2 p-2 flex justify-center border">
        <p className="text-sm mx-auto border">
          Selecciona un tamaño y cantidad para agregarlo
        </p>
      </div>
    </div>
  );
}

export default CustomSelect;
