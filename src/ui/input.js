"use client";

import React, { useState, useEffect } from "react";

export default function Input({
  labelText = "Label",
  inputValue = "",
  charLimit = 10,
}) {
  const [value, setValue] = useState(inputValue);

  useEffect(() => {
    setValue(inputValue);
  }, [inputValue]);

  const handleChange = (e) => {
    if (e.target.value.length <= charLimit) {
      setValue(e.target.value);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col text-left">
        <label className="text-sm font-normal text-blue-gray-400 ps-2">
          {labelText}
        </label>
        <input
          className="h-10 rounded-md border border-blue-gray-200 bg-transparent font-sans font-normal text-blue-gray-700 outline outline-offset-2 px-2 py-1"
          placeholder=""
          value={value}
          onChange={handleChange}
          maxLength={charLimit}
        />
      </div>
      <div className="flex justify-end p-2">
        <span className="block text-right text-xs text-blue-gray-600">
          {value.length} de {charLimit}
        </span>
      </div>
    </div>
  );
}
