"use client";
import { useState, useEffect, use } from "react";
import InputCustom from "@/ui/InputCustom";
import SliderPoint from "./SliderPoint";
import {
  getConfig,
  updateConfig,
} from "@/utils/local_session_storage.js/local_session_storage";
import ButtonDashboard from "@/ui/ButtonDashboard";
import Swal from "sweetalert2";
import SwitchVisible from "@/ui/SwitchVisible";
import { InfinitySpin } from "react-loader-spinner";

function PageConfig() {
  //agregar en componente edit product tomar
  //multiplicador compra venta desde BDD o sessionStorage
  const [configurations, setConfigurations] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true);
        setConfigurations(await getConfig());
      } catch (error) {
        console.error("Error al obtener la configuración:", error);
        setConfigurations({});
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setConfigurations({ ...configurations, [name]: value });
  };

  //handle para el slider de precio visible
  const handleChangeSlider = (value) => {
    if (value !== null && value !== undefined) {
      setConfigurations({ ...configurations, precioVisibleRol: value });
    }
  };

  //handle para el switch de mostrar productos sin stock
  const handleChangeSwitch = (value, name) => {
    setConfigurations({
      ...configurations,
      [name]: value,
      // mostrarProductosSinStock: value,
    });
  };

  //handle botón submit para actualizar datos en la BBDD
  const handleSubmit = async () => {
    console.log(configurations.productosPorPagina);

    const newValues = {
      codProdPrefijo: configurations.codProdPrefijo,
      multiplicadorCpraVta: parseFloat(configurations.multiplicadorCpraVta),
      coeficienteVenta: parseFloat(configurations.coeficienteVenta),
      precioVisibleRol: configurations.precioVisibleRol,
      mostrarProductosSinStock: configurations.mostrarProductosSinStock,
      productosPorPagina: parseInt(configurations.productosPorPagina),
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

  return loading ? (
    <div className="w-full min-h-screen bg-slate-50 text-center pt-20 flex justify-center">
      <InfinitySpin
        visible={true}
        width="200"
        color="#4fa94d"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  ) : (
    <div className="flex justify-center">
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
        <InputCustom
          labelText={"Prods. por página"}
          name={"productosPorPagina"}
          inputValue={configurations.productosPorPagina || 8}
          onChange={handleChange}
          placeHolder={"Ctos. prods. por página mostrar?"}
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

        <SwitchVisible
          switchLabel={"Mostrar productos sin stock: "}
          name={"mostrarProductosSinStock"}
          initialValue={configurations.mostrarProductosSinStock || false}
          onToggle={handleChangeSwitch}
        />

        <div className="border rounded my-2 flex flex-col justify-center items-center">
          <p className="text-slate-800">Mostrar secciones en Home</p>
          <div className="flex flex-col justify-center">
            <SwitchVisible
              switchLabel={"Ofertas "}
              name={"mostrarOfertasEnHome"}
              initialValue={configurations.mostrarOfertasEnHome || false}
              onToggle={handleChangeSwitch}
            />
            <SwitchVisible
              switchLabel={"Tips "}
              name={"mostrarTipsEnHome"}
              initialValue={configurations.mostrarTipsEnHome || false}
              onToggle={handleChangeSwitch}
            />
            <SwitchVisible
              switchLabel={"Historia "}
              name={"mostrarHistoriaEnHome"}
              initialValue={configurations.mostrarHistoriaEnHome || true}
              onToggle={handleChangeSwitch}
            />
            <SwitchVisible
              switchLabel={"About "}
              name={"mostrarAboutEnHome"}
              initialValue={configurations.mostrarAboutEnHome || true}
              onToggle={handleChangeSwitch}
            />
            <SwitchVisible
              switchLabel={"Equipo "}
              name={"mostrarEquipoEnHome"}
              initialValue={configurations.mostrarEquipoEnHome || true}
              onToggle={handleChangeSwitch}
            />
            <SwitchVisible
              switchLabel={"Social Media "}
              name={"mostrarSocialMediaEnHome"}
              initialValue={configurations.mostrarSocialMediaEnHome || true}
              onToggle={handleChangeSwitch}
            />
            <SwitchVisible
              switchLabel={"Mapa "}
              name={"mostrarMapaEnHome"}
              initialValue={configurations.mostrarMapaEnHome || true}
              onToggle={handleChangeSwitch}
            />
            <SwitchVisible
              switchLabel={"Slogan "}
              name={"mostrarSloganEnHome"}
              initialValue={configurations.mostrarSloganEnHome || true}
              onToggle={handleChangeSwitch}
            />
            <SwitchVisible
              switchLabel={"Novedades "}
              name={"mostrarNovedadesEnHome"}
              initialValue={configurations.mostrarNovedadesEnHome || true}
              onToggle={handleChangeSwitch}
            />
            <SwitchVisible
              switchLabel={"Mas Me Gusta "}
              name={"mostrarMasMeGustaEnHome"}
              initialValue={configurations.mostrarMasMeGustaEnHome || true}
              onToggle={handleChangeSwitch}
            />
          </div>
        </div>

        <ButtonDashboard onclick={handleSubmit} textButton={"Actualizar"} />
      </div>
    </div>
  );
}

export default PageConfig;
