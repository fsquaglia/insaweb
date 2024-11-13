"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CardComponent from "@/ui/CardComponent";
import ScrollableContainer from "@/ui/ScrollableContainer";
import SkeletonLoader from "@/ui/SkeletonLoader";
import {
  addNewProductFirestore,
  getAllDocsColection,
  setIndexProduct,
  updateDocInCollection,
} from "@/utils/firebase/fetchFirebase";
import Swal from "sweetalert2";
import { productBase } from "@/utils/SettingInitialData";
import MessageComponent from "@/ui/MessageComponent";

function CategorySelect({ data }) {
  const router = useRouter();

  const [values, setValues] = useState([...data]); //es un array de objetos, todas las categorías
  const [categorySelected, setCategorySelected] = useState(values[0]); //es un objeto, lo que se estará editando o creando
  const [subCategories, setSubcategories] = useState(
    values.length > 0 ? values[0].docData.subcategorias || [] : []
  ); //es un array de nombres de subcategorias
  const [subCatSelected, setSubCatSelected] = useState(null);
  const [products, setProducts] = useState(null);

  const fetchArrayProductos = async (fullCollection) => {
    try {
      const response = await fetch(
        `/api/products/productsIndexBySubCat/${fullCollection}`,
        {
          cache: "no-store",
        }
      );
      if (!response.ok)
        throw new Error("Error al cargar las categorías de productos");

      const products = await response.json();

      return products;
    } catch (error) {
      console.error("Error al obtener los productos: ", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Algo está mal...",
        showConfirmButton: false,
        timer: 1500,
      });
      return [];
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (subCategories.length > 0) {
        const fetchedProdcuts = await fetchArrayProductos(
          `${categorySelected.docID}/${subCategories[0]}`
        );
        setSubCatSelected(subCategories[0]);
        setProducts(fetchedProdcuts);
        // console.log(fetchedProdcuts);
      } else {
        setSubCatSelected(null);
      }
    };
    fetchProducts();
  }, [subCategories]);

  const onclickCard = (id) => {
    const elem = values.find((e) => e.docID === id);
    setCategorySelected(elem);
    setSubcategories(elem.docData.subcategorias || []);
  };

  const onClickSubCard = async (id) => {
    setSubCatSelected(id);
    const fetchedProdcuts = await fetchArrayProductos(
      `${categorySelected.docID}/${id}`
    );
    setProducts(fetchedProdcuts);
  };

  //handle de clic sobre card de producto
  const handleOnclickProduct = async (product) => {
    if (product.id === "docBase") {
      //se hizo clic sobre la Card para AGREGAR NUEVO PRODUCTO
      //crear un producto en la categoría/subcategoría y redirigir a esa ruta para editarlo
      try {
        const newProduct = await addNewProductFirestore(
          "productos",
          categorySelected.docID,
          subCatSelected,
          {
            ...product.docData,
            categoria: categorySelected.docID,
            subcategoria: subCatSelected,
          }
        );
        //updateDocInCollection me crea otro producto, esto es experimental para manejar en un futuro de otra forma los productos
        await updateDocInCollection("items", newProduct.id, {
          ...product.docData,
          docID: newProduct.id,
          categoria: categorySelected.docID,
          subcategoria: subCatSelected,
        });

        await setIndexProduct("indicePorIdProducto", newProduct.id, [
          categorySelected.docID,
          subCatSelected,
          "",
          product.docData.imagen[0],
        ]);

        const newRoute = `/dashboard/productedit/${categorySelected.docID}/${subCatSelected}/${newProduct.id}`;
        router.push(newRoute);
      } catch (error) {
        console.error("Error al agregar un doc a Firestore :", error);
        alert("Error al agregar un doc a Firestore");
      }
    } else {
      //se hizo clic sobre un producto existente, redirigir para editarlo
      const newRoute = `/dashboard/productedit/${categorySelected.docID}/${subCatSelected}/${product.id}`;
      router.push(newRoute);
    }
  };

  return (
    <div className="container flex flex-col justify-center">
      {values ? (
        values.length > 0 ? (
          <div className="flex flex-col justify-center p-2 min-h-64 bg-gradient-to-b from-gray-100 to-gray-300">
            {/*Cards que muestran todas las categorias*/}
            <span className="text-center">Selecciona una categoría</span>
            <ScrollableContainer>
              {values.map((value, index) => (
                <CardComponent
                  key={index}
                  id={value.docID}
                  name={value.docData.id}
                  img={value.docData.imagen}
                  onclickCard={onclickCard}
                  idSelected={categorySelected.docID}
                />
              ))}
            </ScrollableContainer>
          </div>
        ) : (
          <span className="flex text-center  items-center w-full justify-center my-4">
            No hay categorías para mostrar, deberás crear al menos una.
          </span>
        )
      ) : (
        <SkeletonLoader />
      )}

      {subCategories ? (
        subCategories.length > 0 ? (
          <>
            <div className="flex flex-col justify-center text-center p-2 min-h-64 bg-gradient-to-b from-gray-100 to-gray-300">
              <span className="text-center">Selecciona una subcategoría</span>
              <ScrollableContainer>
                {subCategories &&
                  subCategories.map((cat, index) => (
                    <CardComponent
                      key={index}
                      id={cat}
                      name={cat}
                      idSelected={subCatSelected}
                      onclickCard={onClickSubCard}
                    />
                  ))}
              </ScrollableContainer>
            </div>
            <div className="flex flex-col justify-center text-center p-2 min-h-64 bg-gradient-to-b from-gray-100 to-gray-300">
              <div>
                <span className="text-center">Productos incluidos</span>
                <button
                  className="rounded p-1 mx-2 text-sm cursor-pointer hover:shadow bg-blue-200 text-slate-600"
                  onClick={() =>
                    handleOnclickProduct({
                      id: "docBase",
                      docData: productBase,
                    })
                  }
                >
                  Agregar
                </button>
              </div>
              {products && products.length > 0 ? (
                <ScrollableContainer>
                  {products.map((prod, index) => (
                    <CardComponent
                      key={index}
                      id={prod?.id}
                      name={prod?.nombre || "Prod. sin nombre"}
                      // idSelected={subCatSelected}
                      onclickCard={() => handleOnclickProduct(prod)}
                      img={prod?.imagen || null}
                    />
                  ))}
                </ScrollableContainer>
              ) : (
                <div className="flex justify-center mt-4">
                  <MessageComponent
                    message={"Crea un nuevo producto"}
                    type={"info"}
                  />
                </div>
              )}
            </div>
          </>
        ) : (
          <span className="flex text-center  items-center w-full justify-center my-4">
            No hay subcategorías para mostrar, deberás crear al menos una.
          </span>
        )
      ) : (
        <SkeletonLoader />
      )}
    </div>
  );
}

export default CategorySelect;
