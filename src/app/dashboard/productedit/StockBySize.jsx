"use client";
import Swal from "sweetalert2";
import { RiDeleteBin6Line } from "react-icons/ri";
import CreatableSelect from "react-select/creatable";
import ButtonDashboard from "@/ui/ButtonDashboard";
import { useState, useEffect } from "react";

function CustomSelect({ options, quantities }) {
  const [amount, setAmount] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantitiesLocal, setQuantitiesLocal] = useState([]);

  useEffect(() => {
    setQuantitiesLocal(quantities);
  }, [quantities]);

  const customOptions = options.map((option) => ({
    label: option,
    value: option,
  }));

  const onClickAdd = () => {
    if (!selectedSize?.value || amount < 1) return;

    // Verificar si la magnitud ya existe en quantitiesLocal
    const exists = quantitiesLocal.some(
      (item) => item.magnitud === selectedSize.value
    );

    if (exists) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Ya existe esa variación",
        showConfirmButton: false,
        timer: 2500,
      });
      return;
    }

    const newSize = {
      magnitud: selectedSize.value,
      stock: amount,
    };

    setQuantitiesLocal([...quantitiesLocal, newSize]);
    // Resetear los valores después de agregar
    setSelectedSize(null);
    setAmount(1);
  };

  const handleDelete = (index) => {
    // Lógica para eliminar la cantidad seleccionada
    if (quantitiesLocal.length <= 1) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "No puedes eliminar todas las variaciones",
        showConfirmButton: false,
        timer: 2500,
      });
      return;
    }
    const updatedQuantities = quantitiesLocal.filter(
      (item) => item.magnitud !== index
    );
    setQuantitiesLocal(updatedQuantities);
  };

  const handleQuantityChange = (name, method) => {
    // Evita valores negativos
    const updatedQuantities = quantitiesLocal.map((item) => {
      if (item.magnitud === name) {
        const newStock =
          method === "increment" ? item.stock + 1 : item.stock - 1;

        // Asegúrate de que el stock no sea negativo
        return {
          ...item,
          stock: newStock >= 1 ? newStock : 1,
        };
      }
      return item;
    });

    // Actualiza el estado con las nuevas cantidades
    setQuantitiesLocal(updatedQuantities);
  };

  return (
    <div className="border p-2 rounded flex flex-row flex-wrap">
      {/* Contenedor izquierdo */}
      <div className="flex flex-col w-1/2 p-2">
        <div className="flex flex-row items-center w-full gap-2 mb-2">
          <label htmlFor="size" className="text-sm w-1/3">
            Tamaño
          </label>
          <div className="w-2/3">
            <CreatableSelect
              isClearable
              options={customOptions}
              placeholder="Selecciona o tipea..."
              className="text-sm"
              value={selectedSize} // Asigna el valor del estado
              onChange={(newValue) => setSelectedSize(newValue)} // Actualiza el estado
              styles={{
                control: (base) => ({
                  ...base,
                  minHeight: "32px", // Ajusta la altura mínima para alinear el input con los botones
                }),
              }}
            />
          </div>
        </div>

        <div className="flex flex-row items-center w-full gap-2 mb-2">
          <label htmlFor="amount" className="text-sm w-1/3">
            Cantidad
          </label>
          <div className="flex flex-row w-2/3 items-center gap-1 border rounded">
            <button
              type="button"
              className="p-1 bg-gray-200 text-black w-6"
              onClick={() => setAmount((prev) => Math.max(prev - 1, 1))} // Asegura que no sea negativo
            >
              -
            </button>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              placeholder="1"
              className="w-full p-1 text-sm text-right"
              onChange={(e) => setAmount(e.target.value)}
            />
            <button
              type="button"
              className="p-1 bg-gray-200 text-black w-6 "
              onClick={() => setAmount((prev) => prev + 1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="flex mx-auto">
          <ButtonDashboard textButton={"Agregar"} onclick={onClickAdd} />
        </div>
      </div>

      {/* Contenedor derecho */}
      <div className=" flex flex-col w-1/2 p-2 overflow-y-auto">
        {quantitiesLocal && quantitiesLocal.length > 0 ? (
          quantitiesLocal?.map((item, index) => (
            <div
              key={index}
              className="flex flex-row w-full border rounded items-center gap-1 px-1 mb-1"
            >
              <p className="text-sm w-24">{item.magnitud}</p>

              <div className="flex flex-row w-2/3 items-center gap-1 border rounded">
                <button
                  type="button"
                  className="p-1 bg-gray-200 text-black w-6"
                  onClick={() => handleQuantityChange(item.magnitud, "dec")}
                >
                  -
                </button>

                <input
                  type="number"
                  name="stock"
                  id="stock"
                  value={item.stock}
                  className="w-full p-1 text-sm text-right"
                />
                <button
                  type="button"
                  className="p-1 bg-gray-200 text-black w-6 "
                  onClick={() =>
                    handleQuantityChange(item.magnitud, "increment")
                  }
                >
                  +
                </button>
              </div>

              <RiDeleteBin6Line
                className="text-red-500 text-xl cursor-pointer"
                onClick={() => handleDelete(item.magnitud)}
              />
            </div>
          ))
        ) : (
          <p className="text-sm mx-auto border">
            Selecciona un tamaño y cantidad para agregarlo
          </p>
        )}
      </div>
    </div>
  );
}

export default CustomSelect;
