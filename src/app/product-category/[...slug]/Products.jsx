"use client";
import React, { useEffect, useState } from "react";
import CardProduct from "@/components/cards/CardProduct";
import { getConfig } from "@/utils/local_session_storage.js/local_session_storage";
import LoadingDiv from "@/ui/LoadingDiv";
import MessageComponent from "@/ui/MessageComponent";
import { useSession } from "next-auth/react";
import {
  likeProductToUser,
  getUserByEmail,
  addEventToHistory,
} from "@/utils/firebase/fetchFirebase";
import Swal from "sweetalert2";
const defaultProductsByPage = 2;

function Products({ category, subCategory }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastVisible, setLastVisible] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [updateTotalPages, setUpdateTotalPages] = useState(false);
  const [myListIdProducts, setMyListIdProducts] = useState([]);
  const { data: session, status } = useSession();

  const fetchProducts = async (startAfter = null, reset = false) => {
    try {
      setLoading(true);
      const configurations = await getConfig();
      const url = new URL(
        "/api/products/productsBySubCat",
        window.location.origin
      );
      url.searchParams.append("categoria", encodeURIComponent(category));
      url.searchParams.append("subcategoria", encodeURIComponent(subCategory));
      url.searchParams.append(
        "includeProductsWithoutStock",
        configurations?.mostrarProductosSinStock || false
      );
      url.searchParams.append(
        "limit",
        Number(configurations?.productosPorPagina) || defaultProductsByPage
      );

      if (startAfter) {
        url.searchParams.append("startAfter", startAfter);
      }

      const res = await fetch(url);
      const data = await res.json();

      if (res.ok && data && !data.hasOwnProperty("error")) {
        const newProducts = data.products.filter(
          (newProduct) =>
            !products.some((prod) => prod.docID === newProduct.docID)
        );

        setProducts((prevProducts) =>
          reset ? newProducts : [...prevProducts, ...newProducts]
        );
        setLastVisible(data.lastVisible);

        if (!updateTotalPages) {
          setTotalProducts(data?.totalDocs);
          setUpdateTotalPages(true);
        }
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error al obtener los productos: ", error);
      setError("Ha ocurrido un error al obtener los productos...");
    } finally {
      setLoading(false);
    }
  };
  const fetchLikesUser = async () => {
    try {
      if (!session) {
        setMyListIdProducts([]); // No hay sesión, limpiar la lista
        return;
      }
      const data = await getUserByEmail(session.user.email);
      if (data.length > 0) {
        const foundUser = data[0];
        setMyListIdProducts(foundUser.likesIDproductos || []);
      } else {
        setMyListIdProducts([]);
      }
    } catch (error) {
      console.error("Error al obtener los likes del usuario:", error);
      setMyListIdProducts([]); // Limpiar lista en caso de error
    }
  };

  useEffect(() => {
    setProducts([]); // Limpiar productos cuando cambia la categoría o subcategoría
    fetchProducts(null, true);
    fetchLikesUser(); // Siempre intenta obtener likes del usuario
  }, [category, subCategory]);

  // Manejar la carga de más productos
  const handleLoadMore = () => {
    fetchProducts(lastVisible);
  };

  // Manejar el like de un producto
  const toggleLike = async (idProduct, nameProduct, imageProduct) => {
    if (!session && status === "unauthenticated") {
      Swal.fire({
        position: "center",
        icon: "question",
        title: "Inicia sesión para interactuar con nosotros",
        showConfirmButton: true,
        timer: 3000,
      });
      return;
    }

    //sumar o restar un like al producto en mi lista en el estado local
    setMyListIdProducts(
      (prev) =>
        prev.includes(idProduct)
          ? prev.filter((id) => id !== idProduct) // Eliminar del array
          : [...prev, idProduct] // Agregar al array
    );

    //verificar si estoy agregando o eliminando un like
    const action = myListIdProducts.includes(idProduct) ? "remove" : "add";

    if (action === "add") {
      //sumar un like al producto en el estado local
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.docID === idProduct
            ? {
                ...product,
                docData: {
                  ...product.docData,
                  likesCount: (product.docData.likesCount || 0) + 1,
                },
              }
            : product
        )
      );
    } else {
      //eliminar el like del producto en el estado local
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.docID === idProduct
            ? {
                ...product,
                docData: {
                  ...product.docData,
                  likesCount: Math.max(
                    (product.docData.likesCount || 0) - 1,
                    0
                  ),
                },
              }
            : product
        )
      );
    }

    try {
      await likeProductToUser(
        action,
        session.user?.id,
        idProduct,
        nameProduct,
        category,
        subCategory,
        imageProduct
      );
      await addEventToHistory(
        session.user?.id,
        `${session.user?.name || "Anónimo"} - (${session.user?.email})`,
        "like",
        action === "add"
          ? `Le gusta el producto ${nameProduct}`
          : `Ya no le gusta el producto ${nameProduct}`,
        idProduct
      );
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error al agregar/quitar like",
        showConfirmButton: true,
        timer: 3000,
      });
      console.error("Error al agregar/quitar like: ", error);
    }
  };

  if (loading) {
    return <LoadingDiv />;
  }
  if (error) {
    return <MessageComponent message={error} type={"error"} />;
  }
  if (products.length === 0) {
    return (
      <MessageComponent
        message={"No hay productos para mostrar aún..."}
        type={"info"}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-wrap gap-6 flex-grow">
        {products.map((product) => (
          <CardProduct
            key={product.docID}
            product={product}
            category={category}
            subCategory={subCategory}
            isLiked={myListIdProducts.includes(product.docID)}
            onToggleLike={toggleLike}
            likesCount={product?.docData?.likesCount || 0}
          />
        ))}
      </div>
      <div className="flex justify-center items-center mt-6">
        {products.length < totalProducts && (
          <button
            onClick={handleLoadMore}
            className="border rounded shadow-lg p-2 font-light text-slate-500 bg-emerald-200 hover:shadow-xl"
          >
            Mostrar más
          </button>
        )}
      </div>
    </div>
  );
}

export default Products;
