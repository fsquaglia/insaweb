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
  options = [], // Agregado para manejar las opciones del select
  disabled = false,
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
          disabled={disabled}
        />
      );
    case "textarea":
    // return (
    //   <textarea
    //     className="rounded-md border font-sans font-normal text-blue-gray-700 p-1 overflow-y-auto"
    //     name={name}
    //     placeholder={placeHolder}
    //     value={inputValue}
    //     onChange={onChange}
    //     maxLength={charLimit}
    //     id={`id${name}`}
    //     rows="5"
    //     cols="30"
    //     disabled={disabled}
    //   />
    // );
    case "area":
      return (
        <textarea
          className="rounded-md border font-sans font-normal text-blue-gray-700 p-1 overflow-y-auto"
          name={name}
          placeholder={placeHolder}
          value={inputValue}
          onChange={onChange}
          maxLength={charLimit}
          id={`id${name}`}
          rows="3"
          cols="30"
          disabled={disabled}
        />
      );
    case "select":
      return (
        <select
          className="rounded-md border font-sans font-normal text-blue-gray-700 p-1"
          name={name}
          disabled={disabled}
          value={inputValue}
          onChange={onChange}
          id={`id${name}`}
        >
          <option value="" disabled>
            {placeHolder}
          </option>
          {options.map((option, index) => {
            return typeof option === "object" ? (
              <option key={index} value={option.IDgrupoDeValores}>
                {option.grupoDeValores}
              </option>
            ) : (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
        </select>
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
  options = [], // Agregado para manejar las opciones en el componente principal
  disabled = false,
  inputType = "text",
}) {
  return (
    <>
      <label
        className="text-xs text-left ml-2 mt-2 mb-1 text-gray-600"
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
        options={options} // Pasar el prop de opciones a TypeShow
        disabled={disabled}
        inputType={inputType}
      />

      {showCharLimits && type !== "select" ? (
        <span className="block text-right text-xs text-gray-600 my-1">
          {inputValue.length} de {charLimit}
        </span>
      ) : null}
    </>
  );
}
