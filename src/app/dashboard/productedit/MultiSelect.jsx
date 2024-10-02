"use client";

import { useState, useEffect } from "react";
import Select from "react-select";

function MultiSelect({
  options,
  name = "MultiSelect",
  labelText = "Selecciona ",
  defaultValue = [],
  onChange, // Agregar el prop para manejar los cambios desde el padre si lo deseas
}) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [formattedOptions, setFormattedOptions] = useState([]);
  const [formattedDefaultValue, setFormattedDefaultValue] = useState([]);

  useEffect(() => {
    // Formatear las opciones como objetos con value y label
    const formattedOptions = options.map((opt) => ({
      value: opt,
      label: opt,
    }));
    const formattedDefaultValue = defaultValue.map((opt) => ({
      value: opt,
      label: opt,
    }));
    setFormattedOptions(formattedOptions);
    setFormattedDefaultValue(formattedDefaultValue);
    setSelectedOptions(formattedDefaultValue);
  }, [defaultValue]);

  // Manejar el evento onChange
  const handleChange = (selected) => {
    setSelectedOptions(selected);

    if (onChange) {
      // Si se pasa una función onChange desde el padre, también se ejecuta
      onChange(selected);
    }
  };

  return (
    <div>
      <label
        className="text-sm text-left ml-2 mb-1 text-gray-600"
        htmlFor={`id${name}`}
      >
        {labelText}
      </label>
      <Select
        defaultValue={
          formattedDefaultValue.length > 0 ? formattedDefaultValue : null
        }
        isMulti
        name={name}
        options={formattedOptions}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
        value={selectedOptions} // Sincronizar las opciones seleccionadas con el estado
      />
    </div>
  );
}

export default MultiSelect;
