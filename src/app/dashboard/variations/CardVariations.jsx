"use client";
import React, { useEffect, useState } from "react";
import InputCustom from "@/ui/InputCustom";
import { setNodoRealtime } from "@/utils/firebase/fetchFirebase";
import Swal from "sweetalert2";
import { FaArrowUpAZ } from "react-icons/fa6";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { FaRegTimesCircle } from "react-icons/fa";
import { revalidateSomePath } from "@/utils/actions/actions";

function CardVariations({
  idVariation,
  titleVariation,
  textVariation,
  urlImage,
  isObjectMultiple,
  dataVariation,
}) {
  const [variationState, setVariationState] = useState([]);
  const [isError, setIsError] = useState(false);
  const [order, setOrder] = useState(true);

  useEffect(() => {
    setVariationState(dataVariation || []);
  }, [dataVariation]);

  const addInputNewVariation = () => {
    setVariationState([...variationState, { [idVariation]: "" }]);
  };
  const addInputNewVariationMultiple = () => {
    //buscar el valor más alto en el array de variaciones/IDgrupoDeValores
    if (isObjectMultiple) {
      const maxID = variationState.reduce(
        (max, item) =>
          item[`ID${idVariation}`] > max ? item[`ID${idVariation}`] : max,
        0
      );

      setVariationState([
        ...variationState,
        {
          precioLista: 0,
          descEfectPorc: 0,
          [idVariation]: "",
          [`ID${idVariation}`]: maxID + 1,
        },
      ]);
    }
  };

  const onChangeValue = (index, newValue) => {
    // Si es hashtag asegurarse de que el valor comience con "#"
    if (idVariation === "hashtag" && !newValue.startsWith("#")) {
      newValue = `#${newValue}`;
    }

    const updatedVariations = variationState.map((item, i) =>
      i === index ? { ...item, [idVariation]: newValue } : item
    );
    setVariationState(updatedVariations);
    dataVariation.length > 0 &&
      setIsError(variationState.some((item) => item[idVariation] === newValue));
  };

  const onChangeMultiple = (index, field, newValue) => {
    // Crear una copia del estado actual para mantener la inmutabilidad
    const updatedVariations = [...variationState];

    // Actualizar el campo específico en el objeto correspondiente
    updatedVariations[index] = {
      ...updatedVariations[index],
      [field]: newValue,
    };

    // Actualizar el estado con la nueva variación
    setVariationState(updatedVariations);

    // Si es necesario, puedes agregar lógica para validar los cambios
    setIsError(
      updatedVariations.some(
        (item) =>
          updatedVariations.filter((v) => v[field] === newValue).length > 1 // evitar duplicados
      )
    );
  };

  const sortVariations = () => {
    const sortedArray = [...variationState].sort((a, b) => {
      const valueA = a[idVariation]?.toLowerCase() || "";
      const valueB = b[idVariation]?.toLowerCase() || "";

      if (order) {
        if (valueA < valueB) return -1;
        if (valueA > valueB) return 1;
        return 0;
      } else {
        if (valueA < valueB) return 1;
        if (valueA > valueB) return -1;
        return 0;
      }
    });
    setOrder(!order);
    setVariationState(sortedArray);
  };

  const deleteVariation = (index) => {
    if (
      variationState.length === 1 ||
      variationState[index][idVariation] === "Genérico" ||
      variationState[index][idVariation] === "Grupo Genérico"
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "No puedes eliminar Genérico ni todas las variaciones.",
        showConfirmButton: false,
        timer: 2500,
      });
      return;
    }
    const updatedVariations = variationState.filter((_, i) => i !== index);
    setVariationState(updatedVariations);
    setIsError(false);
  };

  const onSubmit = async () => {
    //eliminar elementos vacíos del array
    const cleanArray = variationState.filter(
      (item) => item[idVariation] !== ""
    );
    //verificar si existe Genérico y si no agregarlo
    const hasGeneric = cleanArray.some(
      (item) => item[idVariation] === "Genérico"
    );
    if (!hasGeneric) {
      cleanArray.push({ [idVariation]: "Genérico" });
    }
    //ordenar alfabéticamente
    const sortedArray = cleanArray.sort((a, b) => {
      const valueA = a[idVariation]?.toLowerCase() || "";
      const valueB = b[idVariation]?.toLowerCase() || "";

      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    });

    //eliminar los duplicados
    const uniqueValues = new Set();
    for (let index = 0; index < sortedArray.length; index++) {
      uniqueValues.add(sortedArray[index][idVariation]);
    }

    const uniqueArray = Array.from(uniqueValues, (elem) => ({
      [idVariation]: elem,
    }));

    setVariationState(uniqueArray);

    try {
      //actualizamos los valores existentes de variaciones
      await setNodoRealtime(`variaciones/${idVariation}/data`, uniqueArray);
      await revalidateSomePath("dashboard/variations");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Listo!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error! ", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Algo está mal...",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const onSubmitMultiple = async () => {
    //eliminar elementos vacíos del array
    const cleanArray = variationState.filter(
      (item) => item[idVariation] !== ""
    );
    //verificar si existe Genérico y si no agregarlo
    const hasGeneric = cleanArray.some(
      (item) => item[idVariation] === "Grupo Genérico"
    );
    if (!hasGeneric) {
      const maxID = variationState.reduce(
        (max, item) =>
          item[`ID${idVariation}`] > max ? item[`ID${idVariation}`] : max,
        0
      );
      cleanArray.push({
        precioLista: 0,
        descEfectPorc: 0,
        [idVariation]: "Grupo Genérico",
        [`ID${idVariation}`]: maxID + 1,
      });
    }

    //ordenar alfabéticamente
    const sortedArray = cleanArray.sort((a, b) => {
      const valueA = a[idVariation]?.toLowerCase() || "";
      const valueB = b[idVariation]?.toLowerCase() || "";

      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    });

    //eliminar los duplicados
    let uniqueArray = [];
    for (let index = 0; index < sortedArray.length; index++) {
      const item = sortedArray[index];
      const isDuplicate = uniqueArray.some(
        (uniqueItem) => uniqueItem[idVariation] === item[idVariation]
      );
      if (!isDuplicate) {
        uniqueArray.push(item);
      }
    }

    setVariationState(uniqueArray);

    try {
      //actualizamos los valores existentes de variaciones
      await setNodoRealtime(`variaciones/${idVariation}/data`, uniqueArray);
      await revalidateSomePath("/dashboard/variations");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Listo!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error! ", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Algo está mal...",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="flex flex-col m-2 p-2 w-96 bg-gray-100 hover:bg-gray-200">
      {/* DIV de contenido que toma el espacio disponible */}
      <div className="flex-grow text-center">
        <h3 className="text-blue-700 font-semibold underline underline-offset-2 underline-blue-500">
          {titleVariation}
        </h3>
        <p className="h-16 text-slate-700 text-sm">{textVariation}</p>
        {urlImage ? <img src={urlImage} alt={urlImage || "Imagen"} /> : null}
        {/*Variaciones de objeto múltiple */}
        {isObjectMultiple && variationState ? (
          <div className="block flex flex-col border h-60 overflow-y-auto p-2">
            {variationState.length > 0 && (
              <div className="overflow-x-hidden">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr>
                      <th className="px-1 py-2 border-b text-xs">Id</th>
                      <th className="px-1 py-2 border-b text-xs">Grupo</th>
                      <th className="px-1 py-2 border-b text-xs">
                        Precio Lista ($)
                      </th>
                      <th className="px-1 py-2 border-b text-xs">
                        Descto. (%)
                      </th>
                      <th className="px-1 py-2 border-b text-xs">
                        <FaRegTimesCircle />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {variationState.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        {/*id numérico */}
                        <td className="py-2 border-b text-xs text-end">
                          {item[`ID${idVariation}`]}
                        </td>
                        {/*Grupo de valores*/}
                        <td className="py-2 border-b  text-xs">
                          <input
                            className="p-1"
                            type="text"
                            name={`${index}-${item[idVariation]}`}
                            id={`${index}-${item[idVariation]}`}
                            value={item[idVariation]}
                            maxLength={30}
                            placeholder={"Agregar variación"}
                            onChange={(e) =>
                              onChangeMultiple(
                                index,
                                "grupoDeValores",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        {/*Precio de lista*/}
                        <td className="py-2 border-b text-center text-xs">
                          <input
                            onChange={(e) =>
                              onChangeMultiple(
                                index,
                                "precioLista",
                                e.target.value
                              )
                            }
                            className="w-16 text-end p-1"
                            type="number"
                            name={`${index}-${item.precioLista}`}
                            id={`${index}-${item.precioLista}`}
                            value={item.precioLista}
                            style={{
                              WebkitAppearance: "none",
                              MozAppearance: "textfield",
                            }}
                          />
                        </td>
                        {/*Descuento efectivo*/}
                        <td className="py-2 border-b text-center text-xs">
                          <input
                            onChange={(e) =>
                              onChangeMultiple(
                                index,
                                "descEfectPorc",
                                e.target.value
                              )
                            }
                            className="w-10 text-end p-1"
                            type="number"
                            name={`${index}-${item.descEfectPorc}`}
                            id={`${index}-${item.descEfectPorc}`}
                            value={item.descEfectPorc}
                            style={{
                              WebkitAppearance: "none",
                              MozAppearance: "textfield",
                            }}
                          />
                        </td>
                        {/*Eliminar variación*/}
                        <td className="py-2 border-b text-center text-xs">
                          <FaRegTimesCircle
                            color="red"
                            title="Eliminar"
                            className="cursor-pointer"
                            onClick={() => deleteVariation(index)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : null}
        {/*Variaciones de objeto plano */}
        {!isObjectMultiple && variationState ? (
          <div className="block flex flex-col border h-60 overflow-y-auto p-2">
            {variationState.length > 0 &&
              variationState.map((item, index) => (
                <div
                  className="w-full gap-2 flex flex-row items-center"
                  key={index}
                >
                  <div className="w-full flex flex-col">
                    <InputCustom
                      labelText={""}
                      name={`variation-${idVariation}-${index}`}
                      inputValue={item[idVariation]}
                      charLimit={30}
                      onChange={(e) => onChangeValue(index, e.target.value)}
                      placeholder={"Agregar variación"}
                    />
                  </div>
                  <span
                    className="border"
                    onClick={() => deleteVariation(index)}
                  >
                    <FaRegTimesCircle color="red" size={18} />
                  </span>
                </div>
              ))}
          </div>
        ) : null}
      </div>

      {/* Botón fijo en la parte inferior */}
      <div className="mt-auto">
        <div className="w-full flex flex-row items-center justify-around pt-4">
          <button
            className="flex items-center justify-center bg-blue-500 text-white rounded w-20 hover:bg-blue-400"
            onClick={sortVariations}
            title="Ordenar"
          >
            <FaArrowUpAZ className="font-light m-2" size={20} />
          </button>
          <button
            className="flex items-center justify-center bg-blue-500 text-white rounded w-20 hover:bg-blue-400"
            onClick={
              isObjectMultiple
                ? addInputNewVariationMultiple
                : addInputNewVariation
            }
            title="Agregar nuevo..."
          >
            <MdOutlinePlaylistAdd className="font-light m-2" size={20} />
          </button>
          <button
            className={`flex items-center justify-center bg-blue-500 text-white rounded w-20 hover:bg-blue-400 ${
              isError ? "opacity-50" : ""
            }`}
            onClick={isObjectMultiple ? onSubmitMultiple : onSubmit}
            disabled={isError}
            title="Guardar"
          >
            <FaSave className="font-light m-2" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardVariations;
