"use client";

import CardComponent from "@/ui/CardComponent";
import { useState } from "react";
import SkeletonLoader from "@/ui/SkeletonLoader";
import ComboCategory from "@/ui/ComboCategory";
import Swal from "sweetalert2";
import {
  getAllDocsColection,
  setDocInCollection,
} from "@/utils/firebase/fetchFirebase";
import { productBase } from "@/utils/SettingInitialData";
import SubCategory from "./SubCategory";
import SwitchText from "@/ui/SwitchText";
import { revalidateSomePath } from "@/utils/actions/actions";

const nameCommerce = "Ihara+y+London";
const urlGenerica = `https://via.placeholder.com/600?text=${nameCommerce}`;
const newCategory = {
  docID: "newCategory",
  docData: {
    descripcion: "",
    id: "",
    imagen: urlGenerica,
    showLanding: false,
    tituloCard: "",
    textoSeccionWeb: "",
    colorBase: "slate",
  },
};

function CategoryLoader({ data }) {
  // console.log(data);

  const [values, setValues] = useState([...data, newCategory]); //es un array de objetos, todas las categorías
  const [valuesEdit, setValuesEdit] = useState(values[values.length - 1]); //es un objeto, lo que se estará editando o creando
  const [changeView, setChangeView] = useState(true);

  const reloadData = async () => {
    try {
      // Obtener categorías de productos
      const categoriesProducts = await getAllDocsColection("productos");
      // ordenar alfabéticamente
      categoriesProducts.sort((a, b) => a.docID.localeCompare(b.docID));
      setValues([...categoriesProducts, newCategory]);
    } catch (error) {
      console.error("Error! ", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Algo está mal...",
        showConfirmButton: false,
        timer: 1500,
      });
      setValues([newCategory]);
    }
  };

  const onclickCard = (id) => {
    const elem = values.find((e) => e.docID === id);
    setValuesEdit(elem);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValuesEdit((prevValuesEdit) => ({
      ...prevValuesEdit,
      docData: {
        ...prevValuesEdit.docData,
        [name]: value,
      },
    }));
  };

  const onToggle = (value) => {
    setValuesEdit((prevValuesEdit) => ({
      ...prevValuesEdit,
      docData: {
        ...prevValuesEdit.docData,
        showLanding: value,
      },
    }));
  };

  const urlImgReturn = (data) => {
    setValuesEdit((prevValuesEdit) => ({
      ...prevValuesEdit,
      docData: {
        ...prevValuesEdit.docData,
        imagen: data,
      },
    }));
  };

  //Button Actualizar
  const onclick = async () => {
    //verificar que todos los campos tengan valores
    if (
      valuesEdit.docData.descripcion === "" ||
      valuesEdit.docData.id === "" ||
      valuesEdit.docData.tituloCard === ""
    ) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Llena todos los campos!",
        showConfirmButton: true,
        timer: 3000,
      });
      return;
    }

    //si es nueva categoría colocar docID igual que Nombre
    //y verificar que no sea duplicado el nombre
    if (valuesEdit.docID === "newCategory") {
      const isRepeat = values.some((e) => e.docID === valuesEdit.docData.id);

      if (isRepeat) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${valuesEdit.docData.id} no puede utilizarse como Nombre`,
          showConfirmButton: true,
          timer: 3000,
        });
        return;
      }
      valuesEdit.docID = valuesEdit.docData.id;
    }

    try {
      await setDocInCollection(
        "productos",
        valuesEdit.docID,
        valuesEdit.docData
      );
      const categoriesProducts = await getAllDocsColection("productos");
      categoriesProducts.sort((a, b) => a.docID.localeCompare(b.docID));
      const newLoaderCategories = [...categoriesProducts, newCategory];
      setValues(newLoaderCategories);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Listo!",
        showConfirmButton: false,
        timer: 1500,
      });
      await revalidateSomePath("/");
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

  //agregar subcategoría
  // const onClickAddSubcategory = async () => {
  //   await setDocInCollection(
  //     "productos/Caballeros/Pantalon caballeros",
  //     "productBase",
  //     productBase
  //   );
  //   console.log("ok");
  // };

  const onClickSwitch = () => {
    setChangeView(!changeView);
  };

  return (
    <div className="container flex flex-col justify-center">
      {/*Cards que muestran todas las categorias*/}
      <div className="flex justify-center">
        <div
          className="flex justify-start overflow-x-auto mx-2"
          style={{
            overscrollBehaviorX: "contain",
            scrollSnapType: "x proximity",
          }}
        >
          <div className="flex flex-row gap-2 justify-center items-center text-center my-4">
            {values && values.length > 0 ? (
              values.map((value, index) => (
                <CardComponent
                  key={index}
                  id={value.docID}
                  name={value.docData.id}
                  img={value.docData.imagen}
                  onclickCard={onclickCard}
                  idSelected={valuesEdit.docID}
                />
              ))
            ) : (
              <SkeletonLoader />
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <div className="w-full max-w-lg">
          <SwitchText
            text1={"Categorías"}
            text2={"Subcategorías"}
            onClick={onClickSwitch}
            activeTextInitial={"Categorías"}
          />
        </div>
      </div>
      <div className="my-2 flex justify-center">
        {changeView ? (
          <>
            <ComboCategory
              docID={valuesEdit.docID}
              titleID={valuesEdit.docData.id}
              description={valuesEdit.docData.descripcion}
              textoSeccionWeb={valuesEdit.docData.textoSeccionWeb || ""}
              titleCard={valuesEdit.docData.tituloCard}
              handleChange={handleChange}
              switchLabel={"Mostrar en Home"}
              initialValue={valuesEdit.docData.showLanding}
              onToggle={onToggle}
              section={"categoryProducts"}
              folderStorage={"image"}
              img={valuesEdit.docData.imagen}
              urlImgReturn={urlImgReturn}
              onclick={onclick}
            />
          </>
        ) : (
          <SubCategory categoryObject={valuesEdit} reloadData={reloadData} />
        )}
      </div>
    </div>
  );
}

export default CategoryLoader;
