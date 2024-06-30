"use client";

import React from "react";

export default function Input({
  labelText = "Label",
  name,
  inputValue = "",
  onChange,
  charLimit = 10,
}) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col text-left">
        <label className="text-sm font-normal text-blue-gray-400 ps-2">
          {labelText}
        </label>
        <input
          className="h-10 rounded-md border font-sans font-normal text-blue-gray-700 outline outline-offset-2 px-2 py-1 "
          name={name}
          placeholder=""
          value={inputValue}
          onChange={onChange}
          maxLength={charLimit}
        />
      </div>
      <div className="flex justify-end p-2">
        <span className="block text-right text-xs text-blue-gray-600">
          {inputValue.length} de {charLimit}
        </span>
      </div>
    </div>
  );
}
