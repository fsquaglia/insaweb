"use client";

import CardComponent from "@/ui/CardComponent";
import { useState, useEffect } from "react";
import SkeletonLoader from "@/ui/SkeletonLoader";
import ComboCategory from "@/ui/ComboCategory";
import Swal from "sweetalert2";
import {
  getAllDocsColection,
  setDocInCollection,
} from "@/utils/firebase/fetchFirebase";

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
  },
};

function CategoryLoader({ data }) {
  const [values, setValues] = useState([...data, newCategory]); //es un array de objetos, todas las categorías
  const [valuesEdit, setValuesEdit] = useState(values[values.length - 1]); //es un objeto, lo que se estará editando o creando

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
      const newLoaderCategories = [...categoriesProducts, newCategory];
      setValues(newLoaderCategories);

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
    <div className="container flex flex-col justify-center">
      {/*Cards que muestran todas las categorias*/}
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
              />
            ))
          ) : (
            <SkeletonLoader />
          )}
        </div>
      </div>
      <div className="my-2 flex flex-row flex-wrap justify-center">
        <ComboCategory
          docID={valuesEdit.docID}
          titleID={valuesEdit.docData.id}
          description={valuesEdit.docData.descripcion}
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
      </div>
    </div>
  );
}

export default CategoryLoader;
