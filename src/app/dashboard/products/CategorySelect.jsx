"use client";
import React, { useState, useEffect } from "react";
import CardComponent from "@/ui/CardComponent";
import ScrollableContainer from "@/ui/ScrollableContainer";
import SkeletonLoader from "@/ui/SkeletonLoader";
import { getAllDocsColection } from "@/utils/firebase/fetchFirebase";
import Swal from "sweetalert2";

function CategorySelect({ data }) {
  const [values, setValues] = useState([...data]); //es un array de objetos, todas las categorías
  const [categorySelected, setCategorySelected] = useState(values[0]); //es un objeto, lo que se estará editando o creando
  const [subCategories, setSubcategories] = useState(
    values.length > 0 ? values[0].docData.subcategorias || [] : []
  ); //es un array de nombres de subcategorias
  const [subCatSelected, setSubCatSelected] = useState(null);
  const [products, setProducts] = useState(null);

  const fetchArrayProductos = async (fullCollection) => {
    try {
      const products = await getAllDocsColection(fullCollection);
      // console.log(fullCollection);

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
          `productos/${categorySelected.docID}/${subCategories[0]}`
        );
        setSubCatSelected(subCategories[0]);
        setProducts(fetchedProdcuts);
        console.log(fetchedProdcuts);
      } else {
        setSubCatSelected(null);
      }
    };
    fetchProducts();
  }, [subCategories]);

  // console.log(products);

  const onclickCard = (id) => {
    const elem = values.find((e) => e.docID === id);
    setCategorySelected(elem);
    setSubcategories(elem.docData.subcategorias || []);
  };

  const onClickSubCard = async (id) => {
    setSubCatSelected(id);

    const fetchedProdcuts = await fetchArrayProductos(
      `productos/${categorySelected.docID}/${id}`
    );

    setProducts(fetchedProdcuts);
    console.log(fetchedProdcuts);
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
              <span className="text-center">Productos incluidos</span>
              <ScrollableContainer>
                {products &&
                  products.map((prod, index) => (
                    <CardComponent
                      key={index}
                      id={prod.docID}
                      name={prod.docData.id}
                      // idSelected={subCatSelected}
                      // onclickCard={onClickSubCard}
                    />
                  ))}
              </ScrollableContainer>
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
