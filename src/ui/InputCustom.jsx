"use client";

import React from "react";

export default function InputCustom({
  labelText = "Label",
  name,
  inputValue = "",
  onChange,
  charLimit = 10,
  type = "input",
  placeHolder = "",
}) {
  return (
    <>
      <label className="text-sm text-left ml-2 mb-1 text-gray-600">
        {labelText}
      </label>
      {type === "input" ? (
        <input
          className="rounded-md border font-sans font-normal text-blue-gray-700 outline outline-offset-2 p-1"
          name={name}
          placeholder={placeHolder}
          value={inputValue}
          onChange={onChange}
          maxLength={charLimit}
          id={`id${name}`}
        />
      ) : (
        <textarea
          className="rounded-md border font-sans font-normal text-blue-gray-700 outline outline-offset-2 p-1 overflow-y-auto"
          name={name}
          placeholder={placeHolder}
          value={inputValue}
          onChange={onChange}
          maxLength={charLimit}
          id={`id${name}`}
          rows="5"
          cols="30"
        />
      )}

      <span className="block text-right text-xs text-blue-gray-600 mt-1">
        {inputValue.length} de {charLimit}
      </span>
    </>
  );
}
