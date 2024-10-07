"use client";
import { useState, useEffect } from "react";
import InputCustom from "@/ui/InputCustom";
import SliderPoint from "./SliderPoint";
import {
  getConfig,
  updateConfig,
} from "@/utils/local_session_storage.js/local_session_storage";
import ButtonDashboard from "@/ui/ButtonDashboard";
import Swal from "sweetalert2";

function PageConfig() {
  //agregar en componente edit product tomar
  //multiplicador compra venta desde BDD o sessionStorage
  const [configurations, setConfigurations] = useState({});

  useEffect(() => {
    const fetchConfig = async () => {
      setConfigurations(await getConfig());
    };
    fetchConfig();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setConfigurations({ ...configurations, [name]: value });
  };

  const handleChangeSlider = (value) => {
    if (value !== null && value !== undefined) {
      setConfigurations({ ...configurations, precioVisibleRol: value });
    }
  };

  const handleSubmit = async () => {
    const newValues = {
      codProdPrefijo: configurations.codProdPrefijo,
      multiplicadorCpraVta: parseFloat(configurations.multiplicadorCpraVta),
      coeficienteVenta: parseFloat(configurations.coeficienteVenta),
      precioVisibleRol: configurations.precioVisibleRol,
    };

    try {
      await updateConfig(newValues);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Configuración actualizada, reinicia tu sesión para aplicarlas",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error al actualizar la configuración:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error al actualizar la configuración",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="w-96 flex flex-col m-4 ">
      <InputCustom
        labelText={"Prefijo Código Producto"}
        name={"codProdPrefijo"}
        inputValue={configurations.codProdPrefijo || ""}
        onChange={handleChange}
        placeHolder={"Prefijo"}
        charLimit={3}
      />
      <InputCustom
        labelText={"Multiplicador precio Cpra/Vta"}
        name={"multiplicadorCpraVta"}
        inputValue={configurations.multiplicadorCpraVta || 2}
        onChange={handleChange}
        placeHolder={"Multiplicador"}
        inputType={"number"}
        showCharLimits={false}
      />
      <InputCustom
        labelText={"Coeficiente precio"}
        name={"coeficienteVenta"}
        inputValue={configurations.coeficienteVenta || 1}
        onChange={handleChange}
        placeHolder={"Coeficiente"}
        // type={"number"}
        inputType={"number"}
        showCharLimits={false}
      />
      <div className="px-2 my-4">
        <SliderPoint
          actualPoint={configurations.precioVisibleRol || 0}
          onChangeValue={handleChangeSlider}
        />
      </div>
      <ButtonDashboard onclick={handleSubmit} textButton={"Actualizar"} />
    </div>
  );
}

export default PageConfig;
