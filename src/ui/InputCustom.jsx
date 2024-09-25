"use client";

import React from "react";

function TypeShow({
  typeParam,
  name,
  placeHolder,
  inputValue,
  onChange,
  charLimit,
  inputType = "text",
}) {
  switch (typeParam) {
    case "input":
      return (
        <input
          className="rounded-md border font-sans font-normal text-blue-gray-700 p-1"
          name={name}
          placeholder={placeHolder}
          value={inputValue}
          onChange={onChange}
          maxLength={charLimit}
          id={`id${name}`}
          type={inputType === "text" ? "text" : "number"}
        />
      );
    case "textarea":
      return (
        <textarea
          className="rounded-md border font-sans font-normal text-blue-gray-700 p-1 overflow-y-auto"
          name={name}
          placeholder={placeHolder}
          value={inputValue}
          onChange={onChange}
          maxLength={charLimit}
          id={`id${name}`}
          rows="5"
          cols="30"
        />
      );
    case "select":
      return (
        <select
          className="rounded-md border font-sans font-normal text-blue-gray-700 p-1"
          name={name}
          placeholder={placeHolder}
          value={inputValue}
          onChange={onChange}
          maxLength={charLimit}
          id={`id${name}`}
        />
      );
    default:
      return <input />;
  }
}

export default function InputCustom({
  labelText = "Label",
  name,
  inputValue = "",
  onChange,
  charLimit = 10,
  showCharLimits = true,
  type = "input",
  placeHolder = "",
}) {
  return (
    <>
      <label
        className="text-sm text-left ml-2 mb-1 text-gray-600"
        htmlFor={`id${name}`}
      >
        {labelText}
      </label>

      <TypeShow
        typeParam={type}
        name={name}
        placeHolder={placeHolder}
        inputValue={inputValue}
        onChange={onChange}
        charLimit={charLimit}
      />

      {showCharLimits && type != "select" ? (
        <span className="block text-right text-xs text-blue-gray-600 mt-1">
          {inputValue.length} de {charLimit}
        </span>
      ) : null}
    </>
  );
}
