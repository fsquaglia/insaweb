"use client";
import React, { useEffect, useState } from "react";
import ButtonDashboard from "@/ui/ButtonDashboard";
import InputCustom from "@/ui/InputCustom";
import { setNodoRealtime } from "@/utils/firebase/fetchFirebase";
import Swal from "sweetalert2";

function CardVariations({
  idVariation,
  titleVariation,
  textVariation,
  urlImage,
  isObjectMultiple,
  dataVariation,
}) {
  const [variationState, setVariationState] = useState([]);
  const [newVariant, setNewVariant] = useState("");
  const [isError, setIsError] = useState(false);
  const [newVariantMultiple, setNewVariantMultiple] = useState({
    precioLista: 0,
    descEfectPorc: 0,
    [idVariation]: "",
  });
  const [order, setOrder] = useState(true);

  useEffect(() => {
    setVariationState(dataVariation || []);
  }, [dataVariation]);

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
      setIsError(
        variationState.some((item) => item[idVariation] === newValue) ||
          newValue.trim() === ""
      );
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
          item[field] === "" || // validar campos vacíos
          updatedVariations.filter((v) => v[field] === newValue).length > 1 // evitar duplicados
      )
    );
  };

  const onChangeNew = (newValue) => {
    setNewVariant(newValue);
    dataVariation.length > 0 &&
      setIsError(
        variationState.some(
          (item) => item[idVariation].toLowerCase() === newValue.toLowerCase()
        )
      );
  };

  const onChangeNewMultiple = (field, newValue) => {
    setNewVariantMultiple((prev) => ({
      ...prev,
      [field]: newValue,
    }));

    //verificar ingreso duplicado
    dataVariation.length > 0 &&
      field === idVariation &&
      setIsError(
        variationState.some(
          (item) => item[idVariation].toLowerCase() === newValue.toLowerCase()
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

  const onSubmit = async () => {
    try {
      if (newVariant.trim() !== "") {
        //hay un nuevo valor de variación
        const addValue =
          idVariation === "hashtag" && !newVariant.startsWith("#")
            ? `#${newVariant}`
            : newVariant;

        const updateVariation = [
          ...variationState,
          { [idVariation]: addValue },
        ];

        //verificar si hay duplicados y eliminarlos
        const uniqueValues = new Set();

        for (let index = 0; index < updateVariation.length; index++) {
          uniqueValues.add(updateVariation[index][idVariation]);
        }

        const uniqueArray = Array.from(uniqueValues, (elem) => ({
          [idVariation]: elem,
        }));

        await setNodoRealtime(`variaciones/${idVariation}/data`, uniqueArray);
        setNewVariant("");
        setVariationState(uniqueArray);
      } else {
        //actualizamos los valores existentes de variaciones
        await setNodoRealtime(
          `variaciones/${idVariation}/data`,
          variationState
        );
      }
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Listo!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error! ", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Algo está mal...",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const onSubmitMultiple = async () => {
    // console.log(variationState);
    // console.log(newVariantMultiple);
    // console.log(maxID);

    //fn para verificar duplicados en el array
    function hasDuplicates(array) {
      const seenValues = new Set();
      return array.some((item) => {
        const lowerCaseValue = item[idVariation].toLowerCase(); // Acceso dinámico
        if (seenValues.has(lowerCaseValue)) {
          return true; // Si se encuentra un duplicado, se retorna true
        }
        seenValues.add(lowerCaseValue); // Si no es duplicado, se agrega al Set
        return false; // Si no hay duplicado, se sigue verificando
      });
    }

    try {
      if (newVariantMultiple[idVariation]?.trim() !== "") {
        //se está agregando un nuevo grupoDeValores

        //obtener el último id de grupoDeValores
        const maxID = variationState
          ? variationState.reduce((max, item) => {
              return item.IDgrupoDeValores > max ? item.IDgrupoDeValores : max;
            }, 0)
          : 0;
        const newID = parseInt(maxID) + 1;

        //armar el array con lo existente y lo nuevo
        const { precioLista, grupoDeValores, descEfectPorc } =
          newVariantMultiple;
        const updateVariation = [
          ...variationState,
          {
            [`ID${idVariation}`]: newID,
            precioLista,
            grupoDeValores,
            descEfectPorc,
          },
        ];

        //verificar si hay duplicados
        if (hasDuplicates(updateVariation)) {
          //hay duplicados, avisar y detener
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Hay grupos duplicados, revisa por favor.",
            showConfirmButton: false,
            timer: 1500,
          });
          return;
        } else {
          //no hay duplicados, continuar
          await setNodoRealtime(
            `variaciones/${idVariation}/data`,
            updateVariation
          );
          setNewVariantMultiple({
            precioLista: 0,
            descEfectPorc: 0,
            [idVariation]: "",
          });
          setVariationState(updateVariation);
        }
      } else {
        //no hay nuevo valor agregado, sólo modificar
        await setNodoRealtime(
          `variaciones/${idVariation}/data`,
          variationState
        );
      }
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Listo!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error! ", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Algo está mal...",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="flex flex-col m-2 p-2 w-96 bg-gray-100 hover:bg-gray-200">
      {/* Contenedor de contenido que toma el espacio disponible */}
      <div className="flex-grow h-80">
        <h3 className="text-blue-700 font-semibold underline underline-offset-2">
          {titleVariation}
        </h3>
        <p className="h-16">{textVariation}</p>
        {urlImage ? <img src={urlImage} alt={urlImage || "Imagen"} /> : null}
        {/*Variaciones de objeto múltiple */}
        {isObjectMultiple && variationState ? (
          <div className="block flex flex-col border h-60 overflow-y-auto p-2">
            {variationState.length > 0 && (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr>
                      <th className="px-1 py-2 border-b text-xs">Id</th>
                      <th className="px-1 py-2 border-b text-xs">Grupo</th>
                      <th className="px-1 py-2 border-b text-xs">
                        Precio Lista
                      </th>
                      <th className="px-1 py-2 border-b text-xs">
                        Descto. (%)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {variationState.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        <td className="px-1 py-2 border-b text-xs text-end">
                          {item[`ID${idVariation}`]}
                        </td>
                        <td className="px-1 py-2 border-b  text-xs">
                          <input
                            className="p-1"
                            type="text"
                            name={`${index}-${item[idVariation]}`}
                            id={`${index}-${item[idVariation]}`}
                            value={item[idVariation]}
                            maxLength={30}
                            onChange={(e) =>
                              onChangeMultiple(
                                index,
                                "grupoDeValores",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td className="px-1 py-2 border-b text-center text-xs">
                          <div className="flex items-center justify-center">
                            <span>$</span>
                            <input
                              onChange={(e) =>
                                onChangeMultiple(
                                  index,
                                  "precioLista",
                                  e.target.value
                                )
                              }
                              className="ml-1 w-16 text-end p-1"
                              type="number"
                              name={`${index}-${item.precioLista}`}
                              id={`${index}-${item.precioLista}`}
                              value={item.precioLista}
                              style={{
                                WebkitAppearance: "none",
                                MozAppearance: "textfield",
                              }}
                            />
                          </div>
                        </td>

                        <td className="px-1 py-2 border-b text-center text-xs">
                          <div className="flex items-center justify-center">
                            <input
                              onChange={(e) =>
                                onChangeMultiple(
                                  index,
                                  "descEfectPorc",
                                  e.target.value
                                )
                              }
                              className="ml-1 w-10 text-end p-1"
                              type="number"
                              name={`${index}-${item.descEfectPorc}`}
                              id={`${index}-${item.descEfectPorc}`}
                              value={item.descEfectPorc}
                              style={{
                                WebkitAppearance: "none",
                                MozAppearance: "textfield",
                              }}
                            />
                            <span>%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {/*input para agregar datos */}
                    <tr className="hover:bg-gray-100">
                      <td className="px-1 py-2 border-b text-xs text-end">#</td>
                      <td className="px-1 py-2 border-b text-xs">
                        <input
                          className="p-1"
                          type="text"
                          name="grupoDeValores"
                          id="newGrupoDeValores"
                          maxLength={30}
                          value={newVariantMultiple.grupoDeValores || ""}
                          onChange={(e) =>
                            onChangeNewMultiple(idVariation, e.target.value)
                          }
                        />
                      </td>
                      <td className="px-1 py-2 border-b text-xs text-end">
                        <div className="flex items-center justify-center">
                          <span>$</span>
                          <input
                            className="ml-1 w-16 text-end p-1"
                            type="number"
                            name="precioLista"
                            id="newPrecioLista"
                            value={newVariantMultiple.precioLista || 0}
                            onChange={(e) =>
                              onChangeNewMultiple("precioLista", e.target.value)
                            }
                            style={{
                              WebkitAppearance: "none",
                              MozAppearance: "textfield",
                            }}
                          />
                        </div>
                      </td>
                      <td className="px-1 py-2 border-b text-xs text-end">
                        <div className="flex items-center justify-center">
                          <input
                            className="ml-1 w-10 text-end p-1"
                            type="number"
                            name="descEfectPorc"
                            id="newDescEfectPorc"
                            value={newVariantMultiple.descEfectPorc || 0}
                            onChange={(e) =>
                              onChangeNewMultiple(
                                "descEfectPorc",
                                e.target.value
                              )
                            }
                            style={{
                              WebkitAppearance: "none",
                              MozAppearance: "textfield",
                            }}
                          />
                          <span>%</span>
                        </div>
                      </td>
                    </tr>
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
                <InputCustom
                  key={index}
                  labelText={""}
                  name={`variation-${idVariation}-${index}`}
                  inputValue={item[idVariation]}
                  charLimit={30}
                  onChange={(e) => onChangeValue(index, e.target.value)}
                />
              ))}
            <InputCustom
              labelText={""}
              name={`${idVariation}-newVariation`}
              charLimit={30}
              placeHolder={"Agregar variación"}
              onChange={(e) => onChangeNew(e.target.value)}
              inputValue={newVariant}
            />
          </div>
        ) : null}
      </div>

      {/* Botón fijo en la parte inferior */}
      <div className="mt-auto">
        <div className="w-full flex flex-row gap-2">
          <div className="flex-1">
            <ButtonDashboard textButton={"Ordenar"} onclick={sortVariations} />
          </div>
          <div className="flex-1">
            <ButtonDashboard
              textButton={"Actualizar"}
              disabled={isError}
              onclick={isObjectMultiple ? onSubmitMultiple : onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardVariations;
