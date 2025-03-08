import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import bcrypt from "bcryptjs";
import {
  firestoreDB,
  realtimeDB,
  imagesDB,
} from "../../utils/firebase/firebaseConfig";
import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  doc,
  setDoc,
  addDoc,
  runTransaction,
  startAfter,
  getCountFromServer,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
  writeBatch,
  Timestamp,
} from "firebase/firestore";

import {
  ref as realtimeRef,
  set,
  get as realtimeGet,
  child,
} from "firebase/database";

import {
  ref as refStorage,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";

//Datos iniciales de la BD
import {
  aboutInitialData,
  historyInitialData,
  sloganInitialData,
  teamInitialData,
  mainInitialData,
  tipsInitialData,
  tipsCategoriesInitialData,
  categoriesProductsInitialData,
  footerInitialData,
  productBase,
  contactInitialData,
  dataConfigInitial,
  variationsInitialData1,
} from "../SettingInitialData";

import { revalidateSomePath } from "../actions/actions";

//!FIRESTORE

// Agregar un nuevo usuario al listado de emailsPromocionales
export async function addEmailPromotional(email, nombre) {
  try {
    const docRef = doc(firestoreDB, "emailsPromocionales", "emailsActive");

    // Construimos el objeto de actualización manualmente
    const updateData = {};
    updateData["users"] = {};
    updateData["users"][email] = nombre;

    await setDoc(docRef, updateData, { merge: true });
    console.log("Email agregado con éxito.");
  } catch (error) {
    console.error("Error al agregar el email: ", error);
    throw error;
  }
}

// Agregar un LikeProduct a los likes de productos del usuario
export async function likeProductToUser(
  action = "add",
  userID,
  productID,
  nameProduct,
  category,
  subcategory,
  image
) {
  if (!userID || !productID || !nameProduct || !category || !subcategory) {
    throw new Error(
      "Todos los argumentos (userID, productID, nameProduct, category, subcategory) son requeridos"
    );
  }

  const isAddAction = action === "add";
  const arrayOperation = isAddAction ? arrayUnion : arrayRemove;
  const likeIncrement = isAddAction ? 1 : -1;

  try {
    // Referencias a los documentos
    const docRefLikesIdProductUser = doc(firestoreDB, `contactos/${userID}`);
    const docRefLikeProductUser = doc(
      firestoreDB,
      `contactos/${userID}/LikesProduct/documentoDeLikes`
    );
    const docRefProduct = doc(firestoreDB, "items", productID);

    // Detalle del nuevo like
    const newLike = {
      productID,
      name: nameProduct,
      category,
      subcategory,
      image: image || "",
    };

    // Actualizar lista de likes por ID
    await updateDoc(docRefLikesIdProductUser, {
      likesIDproductos: arrayOperation(productID),
    });

    // Actualizar lista de productos con detalles mínimos
    await updateDoc(docRefLikeProductUser, {
      likes: arrayOperation(newLike),
    });

    // Actualizar contador de likes del producto
    await updateDoc(docRefProduct, {
      likesCount: increment(likeIncrement),
    });

    console.log(
      isAddAction ? "Like agregado con éxito." : "Like quitado con éxito."
    );
  } catch (error) {
    console.error("Error al procesar el like del usuario: ", error);
    throw error;
  }
}

// Agregar un evento al historial general de la tienda
// Función para obtener la fecha en la zona horaria del usuario
const getFechaLocal = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); // Ajusta a la zona horaria local
  return now.toISOString().split("T")[0]; // "2025-01-28"
};
// Función para obtener la hora en la zona horaria del usuario
const getHoraLocal = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); // Ajusta a la zona horaria local
  return now.toISOString(); // "2025-01-28T15:30:00.123Z"
};

export const addEventToHistory = async (
  usuarioID,
  nameEmail,
  tipo,
  detalles,
  refID
) => {
  const fechaHoy = getFechaLocal(); // Fecha local del usuario
  const horaLocal = getHoraLocal(); // Hora local del usuario

  const accion = {
    nameEmail,
    tipo,
    fecha: horaLocal,
    detalles,
    refID,
  };

  try {
    const docRef = doc(firestoreDB, "historial", fechaHoy);
    // Usamos setDoc con merge: true para agregar el campo si no existe o actualizarlo si ya está.
    await setDoc(
      docRef,
      {
        [usuarioID]: arrayUnion(accion),
      },
      { merge: true } // Garantiza que no se sobrescriba el documento existente.
    );
  } catch (error) {
    console.error("Error al registrar la acción:", error);
  }
};

//?crear un batch de escritura para actualizar varios documentos en Firestore, en este caso para actualizar campos nuevos en los contactos ya dados de alta en la BDD FIrestore
export const actualizarUsuarios = async () => {
  try {
    // Obtener todos los documentos de la colección "contactos"
    const contactosSnapshot = await getDocs(
      collection(firestoreDB, "contactos")
    );

    if (contactosSnapshot.empty) {
      console.log("No se encontraron usuarios en la colección 'contactos'.");
      return;
    }

    // Crear un batch para realizar las operaciones
    const batch = writeBatch(firestoreDB);

    contactosSnapshot.forEach((docSnapshot) => {
      const userRef = doc(firestoreDB, "contactos", docSnapshot.id);

      // Agregar el campo "usuarioVerificado"
      batch.update(userRef, { usuarioVerificado: false });

      // Crear la subcolección "historialAcciones/documentoDeAcciones"
      const historialRef = doc(
        firestoreDB,
        `contactos/${docSnapshot.id}/historialAcciones/documentoDeAcciones`
      );
      batch.set(historialRef, { historialUsuario: [] });
    });

    // Confirmar el batch
    await batch.commit();
    console.log("Usuarios actualizados con éxito.");
  } catch (error) {
    console.error("Error al actualizar los usuarios:", error);
  }
};

//crear documento de Configuraciones
export async function createDocConfig() {
  try {
    const docRef = doc(firestoreDB, "configuraciones", "configuraciones");
    await setDoc(docRef, dataConfigInitial);
    // console.log("Documento de configuraciones creado correctamente.");
    Swal.fire({
      icon: "success",
      title: "Documento de configuraciones creado correctamente.",
      showConfirmButton: false,
      position: "center",
      timer: 2000,
    });
  } catch (error) {
    console.error("Error al crear el documento de configuraciones: ", error);
    throw error;
  }
}

//crear documento de historial de acciones
export async function createDocHistory() {
  try {
    const docRef = doc(firestoreDB, "historial", "historial");
    await setDoc(docRef, { acciones: [] });
    // console.log("Documento de historial creado correctamente.");
    Swal.fire({
      icon: "success",
      title: "Documento de historial creado correctamente.",
      showConfirmButton: false,
      position: "center",
      timer: 2000,
    });
  } catch (error) {
    console.error("Error al crear el documento de historial: ", error);
    throw error;
  }
}
//obtener todos los usuarios
export async function getAllUsers(onlyBalances = false) {
  try {
    let usersQuery;

    if (onlyBalances) {
      // Filtra por saldo mayor a 0
      usersQuery = query(
        collection(firestoreDB, "contactos"),
        where("saldo", ">", 0)
      );
    } else {
      // No se aplica ningún filtro, simplemente obtén todos los usuarios
      usersQuery = query(collection(firestoreDB, "contactos"));
    }

    const querySnapshot = await getDocs(usersQuery);

    // Verifica si la consulta devolvió datos
    if (querySnapshot.empty) {
      // console.log("No se encontraron usuarios.");
      return [];
    }

    // Recoge los datos de los usuarios
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Ordena los usuarios en JavaScript después de obtenerlos
    if (onlyBalances) {
      // Ordena los usuarios por fecha de vencimiento del saldo (fechaVenceSaldo) en orden ascendente
      users.sort((a, b) => {
        if (a.fechaVenceSaldo < b.fechaVenceSaldo) return -1;
        if (a.fechaVenceSaldo > b.fechaVenceSaldo) return 1;
        return 0;
      });
    } else {
      // Ordena los usuarios por rol y luego por nombre
      users.sort((a, b) => {
        if (a.rol < b.rol) return -1;
        if (a.rol > b.rol) return 1;
        if (a.nombreContacto < b.nombreContacto) return -1;
        if (a.nombreContacto > b.nombreContacto) return 1;
        return 0;
      });
    }

    return users;
  } catch (error) {
    console.error("Error en fetchFirebase al obtener los usuarios: ", error);
    throw new Error("Error en fetchFirebase al obtener los usuarios.");
  }
}

//obtener un documento por su ID de una colección
export async function getDocumentById(collectionPath, docId) {
  const docRef = doc(firestoreDB, collectionPath, docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    // console.log("No such document!");
    return null;
  }
}
//obtener un usuario o contacto por el email
export async function getUserByEmail(email) {
  const q = query(
    collection(firestoreDB, "contactos"),
    where("email", "==", email)
  );

  const querySnapshot = await getDocs(q);
  const users = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    users.push({ id: doc.id, ...doc.data() });
  });

  return users;
}

//obtener todos los documentos de una colección
export async function getAllDocsColection(nameCollection) {
  const querySnapshot = await getDocs(collection(firestoreDB, nameCollection));
  let arrayData = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    arrayData.push({ docID: doc.id, docData: doc.data() });
  });
  return arrayData;
}

//obtener un producto de Firestore y aplicar los filtros de paginación
export async function getProductFirestore(
  collectionPath,
  limitNumber,
  startAfterDoc = null,
  includeProductsWithoutStock
) {
  // console.log("startAfterDoc", startAfterDoc);
  try {
    const collectionRef = collection(firestoreDB, collectionPath);

    // Crear la query base
    let q = query(
      collectionRef,
      where("publicado", "==", true),
      orderBy("nombre"),
      limit(limitNumber)
    );

    // Filtro para excluir productos sin stock
    if (!includeProductsWithoutStock) {
      q = query(q, where("stockTotal", ">", 0));
    }

    // Agregar paginación
    if (startAfterDoc) {
      q = query(q, startAfter(startAfterDoc));
    }

    // Ejecutar la query para obtener documentos
    const snapshot = await getDocs(q);

    // Consultar el total de documentos solo en la primera consulta
    let totalDocs = null;
    if (!startAfterDoc) {
      const totalQuery = [where("publicado", "==", true)];
      if (!includeProductsWithoutStock) {
        totalQuery.push(where("stockTotal", ">", 0));
      }

      // Obtener el conteo total de documentos sin limit ni startAfter
      const totalDocsInQuery = await getCountFromServer(
        query(collectionRef, ...totalQuery)
      );
      totalDocs = totalDocsInQuery.data().count;
    }

    // Mapeo de resultados
    const products = snapshot.docs.map((doc) => ({
      docID: doc.id,
      docData: doc.data(),
    }));

    const lastVisible =
      products.length > 0 ? products[products.length - 1].docData.nombre : null;

    return {
      products,
      lastVisible,
      // lastVisible: snapshot.docs[snapshot.docs.length - 1],
      totalDocs, // Solo contiene el total en la primera consulta
    };
  } catch (error) {
    console.error("Error al obtener productos de Firestore:", error);
    throw error;
  }
}

export async function getProductItemsFirestore(
  collectionPath,
  category,
  subcategory,
  limitNumber,
  startAfterDoc = null,
  includeProductsWithoutStock
) {
  // console.log("startAfterDoc", startAfterDoc);
  try {
    const collectionRef = collection(firestoreDB, "items");
    const allVisible = includeProductsWithoutStock ? ">=" : ">";
    // Crear la query base
    let q = query(
      collectionRef,
      where("publicado", "==", true),
      where("categoria", "==", category),
      where("subcategoria", "==", subcategory),
      where("stockTotal", allVisible, 0),
      orderBy("nombre"),
      limit(limitNumber)
    );

    // Filtro para excluir productos sin stock
    // if (!includeProductsWithoutStock) {
    //   q = query(q, where("stockTotal", ">", 0));
    // }

    // Agregar paginación
    if (startAfterDoc) {
      q = query(q, startAfter(startAfterDoc));
    }

    // Ejecutar la query para obtener documentos
    const snapshot = await getDocs(q);

    // Consultar el total de documentos solo en la primera consulta
    let totalDocs = null;
    if (!startAfterDoc) {
      const totalQuery = [where("publicado", "==", true)];
      if (!includeProductsWithoutStock) {
        totalQuery.push(where("stockTotal", ">", 0));
      }

      // Obtener el conteo total de documentos sin limit ni startAfter
      const totalDocsInQuery = await getCountFromServer(
        query(collectionRef, ...totalQuery)
      );
      totalDocs = totalDocsInQuery.data().count;
    }

    // Mapeo de resultados
    const products = snapshot.docs.map((doc) => ({
      docID: doc.id,
      docData: doc.data(),
    }));

    const lastVisible =
      products.length > 0 ? products[products.length - 1].docData.nombre : null;

    return {
      products,
      lastVisible,
      // lastVisible: snapshot.docs[snapshot.docs.length - 1],
      totalDocs, // Solo contiene el total en la primera consulta
    };
  } catch (error) {
    console.error("Error al obtener productos de Firestore:", error);
    throw error;
  }
}

//obtener documento de configuraciones
export async function getDocConfig() {
  try {
    const docRef = doc(firestoreDB, "configuraciones", "configuraciones");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      //si el doc de configuraciones no existe, crearlo
      await createDocConfig();
      // console.log("Se creó el doc de configuraciones porque no existía");
      return dataConfigInitial;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
}
//obtener un producto por su ID de Firestore (un producto de productos/categoria/subcat/poducto)
export async function getProductByID(category, subcategory, idDocument) {
  try {
    if (!category || !subcategory || !idDocument) {
      throw new Error(
        "Todos los argumentos (categoría, subcategoría, idDocumento) son requeridos"
      );
    }

    const docRef = doc(
      firestoreDB,
      "productos",
      category,
      subcategory,
      idDocument
    );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { docID: docSnap.id, ...docSnap.data() };
    } else {
      // console.log("No such document!");
      throw new Error("No encontramos el documento");
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    throw error;
  }
}

//actualizar datos de un producto según ID
//lo actualizamos también en colección items
export async function updateProductByID(
  category,
  subcategory,
  idDocument,
  newData
) {
  try {
    if (!category || !subcategory || !idDocument || !newData) {
      throw new Error(
        "Todos los argumentos (categoría, subcategoría, idDocumento, newData) son requeridos"
      );
    }

    const docRef = doc(
      firestoreDB,
      "productos",
      category,
      subcategory,
      idDocument
    );
    const docItemsRef = doc(firestoreDB, "items", idDocument);

    await setDoc(docRef, newData, { merge: true });
    await setDoc(docItemsRef, newData, { merge: true });
    // console.log("Producto actualizado correctamente.");
  } catch (error) {
    console.error("Error al actualizar el producto: ", error);
    throw error;
  }
}

//transacción de Firestore para actualizar el bloque de código para productos
export const getUpdateCodeProd = async () => {
  const configDocRef = doc(firestoreDB, "configuraciones", "configuraciones");
  try {
    let sfDoc;
    await runTransaction(firestoreDB, async (transaction) => {
      sfDoc = await transaction.get(configDocRef);

      if (!sfDoc.exists()) {
        // console.log("Document does not exist!");
        // Crear el documento si no existe
        await setDoc(configDocRef, dataConfigInitial);
        // Volver a obtener el documento después de crearlo
        sfDoc = await transaction.get(configDocRef);
      }

      const newProdInUse =
        sfDoc.data().codProdEnUso + sfDoc.data().codProdBloque;
      transaction.update(configDocRef, { codProdEnUso: newProdInUse });
    });

    // console.log("Transaction successfully committed!");
    return sfDoc.data();
  } catch (e) {
    console.error("Transaction failed: ", e);
    throw new Error("Transaction failed: ");
  }
};

//transacción de Firestore para agregar el código de producto al índice general
export const setIndexProduct = async (nameIndex, code, productData) => {
  const indexRef = doc(firestoreDB, "indices", nameIndex);

  try {
    await runTransaction(firestoreDB, async (transaction) => {
      const sfDoc = await transaction.get(indexRef);

      if (!sfDoc.exists()) {
        // console.log("Document does not exist, creating it!");
        // Crear el documento vacío si no existe
        await transaction.set(indexRef, { [code]: productData });
      } else {
        // Obtener los datos actuales del índice
        const currentIndex = sfDoc.data() || {};

        // Actualizar o agregar el nuevo código
        const newIndex = { ...currentIndex, [code]: productData };

        // Actualizar el documento con el nuevo índice
        transaction.update(indexRef, newIndex);
      }
    });

    // console.log("Transaction successfully committed!");
    return { success: true };
  } catch (e) {
    console.error("Transaction failed: ", e);
    throw new Error("Transaction failed: " + e.message);
  }
};

// transacción de Firestore para cambiar la contraseña actual del usuario
export async function changePassword(userId, currentPassword, newPassword) {
  const userDocRef = doc(firestoreDB, "contactos", userId);

  try {
    // Inicia una transacción
    await runTransaction(firestoreDB, async (transaction) => {
      const userDoc = await transaction.get(userDocRef);
      if (!userDoc.exists()) {
        throw new Error("Usuario no encontrado");
      }

      const storedHashedPassword = userDoc.data().password;

      // Comparar la contraseña proporcionada con la almacenada (hasheada)
      const isMatch = await bcrypt.compare(
        currentPassword,
        storedHashedPassword
      );
      if (!isMatch) {
        throw new Error("La contraseña actual es incorrecta");
      }

      // Si la contraseña actual es correcta, actualizamos la contraseña
      const hashedNewPassword = await bcrypt.hash(newPassword, 10); // Hashear la nueva contraseña

      // Realizar la actualización
      transaction.update(userDocRef, {
        password: hashedNewPassword,
      });
    });

    // console.log("Contraseña actualizada correctamente");
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    throw error;
  }
}

// actualizar información de un documento en una colección
export async function updateDocInCollection(nameCollection, nameDoc, newData) {
  try {
    const docRef = doc(firestoreDB, nameCollection, nameDoc);
    await setDoc(docRef, newData, { merge: true });

    // Obtener el documento actualizado
    const updatedDoc = await getDoc(docRef);

    if (updatedDoc.exists()) {
      return { id: updatedDoc.id, ...updatedDoc.data() }; // Devuelve los datos del documento
    } else {
      throw new Error("El documento no existe después de la actualización.");
    }
  } catch (error) {
    console.error("Error al actualizar el documento: ", error);
    throw error;
  }
}

//agregar un documento a una coleccion (ej. una categoría a colección productos, productos/categorias, colección/documento)
export async function setDocInCollection(nameCollection, nameDoc, dataDoc) {
  try {
    await setDoc(doc(firestoreDB, nameCollection, nameDoc), dataDoc);
    // console.log("Documento guardado correctamente.");
  } catch (error) {
    console.error("Error al guardar el documento: ", error);
    throw error;
  }
}

//agregar una SUBCATEGORIA (se agregará un documento genérico en la subcategoría y debemos agregar el nombre de la subcategoría, al array que lleva el índice en el documento padre (es decir en la categoría)
export async function createSubcollection(
  categoryID,
  nameSubCat,
  arrayIndexSubCat
) {
  try {
    if (!categoryID || !nameSubCat || !arrayIndexSubCat) {
      throw new Error(
        "Todos los argumentos (categoryID, nameSubCat, arrayIndexSubCat) son requeridos"
      );
    }

    // agregar el array índice al documento padre de Categoría
    const docCategoryRef = doc(firestoreDB, "productos", categoryID);
    await setDoc(
      docCategoryRef,
      { subcategorias: arrayIndexSubCat },
      { merge: true }
    );
    //agregar un producto base genérico y crear automáticamente la subcategoría
    const docSubCategoryRef = doc(
      firestoreDB,
      "productos",
      categoryID,
      nameSubCat,
      "docBase"
    );
    const document = {
      ...productBase,
      categoria: categoryID,
      subcategoria: nameSubCat,
    };
    await setDoc(docSubCategoryRef, document);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getOffersLandingFirestore() {
  try {
    const q = query(collection(firestoreDB, "ofertas"), limit(6));
    const querySnapshot = await getDocs(q);

    // Mapear los documentos del snapshot a un array de datos
    const offers = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return offers;
  } catch (error) {
    console.error("Error obteniendo ofertas: ", error);
    return [];
  }
}

//obtener una categoría de producto
export async function getCategoryProduct(categoryID) {
  try {
    const docRef = doc(firestoreDB, "productos", categoryID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { docID: docSnap.id, docData: docSnap.data() };
    } else {
      // console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
}
//obtener los tres Tips para la Landing
export async function getTipsLandingFirestore() {
  try {
    const q = query(
      collection(firestoreDB, "tips"),
      where("visible", "==", true),
      orderBy("fecha", "desc"),
      limit(3)
    );

    const querySnapshot = await getDocs(q);
    const tips = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      fecha: doc.data().fecha.toDate().toISOString(), // Convertir el timestamp a una cadena ISO
    }));

    return tips;
  } catch (error) {
    console.error("Error fetching tips:", error);
    return [];
  }
}

//obtener los datos de Categorías principales de productos para Landing
export async function getCategoriesLandingFirestore() {
  try {
    const q = query(
      collection(firestoreDB, "productos"),
      where("showLanding", "==", true),
      orderBy("__name__", "desc"),
      limit(3)
    );

    const querySnapshot = await getDocs(q);
    const categories = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    const categories = [];
    return categories;
  }
}

//agregar datos iniciales para Colección PRODUCTOS. Serán solo datos para iniciar la BD
export async function setProductsCategoryFirestore() {
  //Categorías en categoriesProductsInitialData
  try {
    // Map through the categoriesData and create an array of promises
    const promises = categoriesProductsInitialData.map((category) => {
      return setDoc(doc(firestoreDB, "productos", category.id), category);
    });
    // Use Promise.all to run all setDoc operations in parallel
    await Promise.all(promises);
    // console.log("Categorías de productos creadas");
  } catch (error) {
    // console.log("Error al crear categorías de productos: ", error);
    throw error;
  }
}

//agregar datos iniciales para Colección CATEGORIAS TIPS. Serán solo datos para iniciar la BD
export async function setTipsCategoryFirestore() {
  // Array de datos de las categorías de tips en tipsCategoriesInitialData
  try {
    // Usar `Promise.all` para esperar a que todas las promesas se resuelvan
    await Promise.all(
      tipsCategoriesInitialData.map((category) =>
        addDoc(collection(firestoreDB, "tipsCategoria"), category)
      )
    );
    // console.log("Categorías de tips creadas");
  } catch (e) {
    console.error("Error agregando categorías: ", e);
    throw e;
  }
}

//agregar datos iniciales para Colección TIPS. Serán solo datos para iniciar la BD
export async function setTipsFirestore() {
  // Array de datos de Tips en tipsInitialData
  try {
    // Usar `Promise.all` para esperar a que todas las promesas se resuelvan
    await Promise.all(
      tipsInitialData.map((elem) =>
        addDoc(collection(firestoreDB, "tips"), elem)
      )
    );
    // console.log("Tips creados");
  } catch (e) {
    console.error("Error agregando Tips: ", e);
    throw e;
  }
}

//?ESCRIBIR DATOS EN FIRESTORE
//Agregar un nuevo CONTACTO/CLIENTE/USUARIO
export async function addNewContactFirestore(dataObject) {
  /*dataObject debe ser
  {nombreContacto:"Nombre Apellido",
  sobrenombre: "tucho",
  direccion: "",
  localidad:"",
  provincia:"",
  email:"",
  password:"",
  celTE:"",
  saldo: 0,...
  }
  */
  try {
    // Agrega un nuevo doc a la colección "contactos"
    const docRef = await addDoc(
      collection(firestoreDB, "contactos"),
      dataObject
    );
    //Agregar también la colección de likes inicializada en [], de aquí podremos mostrar los productos que le gustan al usuario
    await setDoc(
      doc(firestoreDB, `contactos/${docRef.id}/LikesProduct/documentoDeLikes`),
      { likesProductos: [], misLikesCount: 0, likes: [] }
    );
    //Agregar evento de registro en el historial
    await addEventToHistory(
      docRef.id,
      `${dataObject.nombreContacto || "Anónimo"} - (${dataObject.email})`,
      "Registro",
      "Se registró en la página",
      docRef.id
    );
    //Agregar el nuevo email a la lista de emailsPromocionales
    await addEmailPromotional(dataObject.email, dataObject.nombreContacto);

    //revalidar la ruta de userManagement para que se revaliden los cambios
    revalidateSomePath("/dashboard/userManagement");

    console.log("Contacto agregado: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error al agregar contacto: ", error);
    throw error;
  }
}

//Agregar nuevo PRODUCTO y Firestore crea el ID
export async function addNewProductFirestore(
  coleccion,
  categoria = "",
  subCategoria = "",
  dataObject
) {
  //dataObject debe como  productBase

  let ruta = coleccion; // Colección siempre es obligatoria
  if (categoria) {
    ruta += `/${categoria}`;
  }
  if (subCategoria) {
    ruta += `/${subCategoria}`;
  }

  try {
    // Agrega un nuevo doc a la colección "coleccion"
    const docRef = await addDoc(collection(firestoreDB, ruta), dataObject);
    // console.log("Producto agregado: ", docRef.id);
    return docRef;
  } catch (error) {
    console.error("Error al agregar producto: ", error);
    throw error;
  }
}

//!REALTIME
//?Traer datos de un nodo específico de realtime
export async function getNodoRealtime(nodo) {
  try {
    const snapShot = await realtimeGet(
      child(realtimeRef(realtimeDB), `/${nodo}`)
    );
    if (snapShot.exists()) {
      //console.log(snapShot.val());
      return snapShot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

//?Almacena datos en un nodo específico de Realtime.
export async function setNodoRealtime(nodo, dataNodo) {
  try {
    const refNodo = realtimeRef(realtimeDB, nodo);
    await set(refNodo, dataNodo);
    // console.log(`Información almacenada en ${nodo}`);
  } catch (e) {
    console.error(`Error almacenando en ${nodo}. `, e);
    throw e;
  }
}

//? almacenar todos los datos iniciales para la página
export async function loadDataInitFirebase() {
  try {
    // Ejecutar funciones en paralelo
    await Promise.all([
      setNodoRealtime("about", aboutInitialData),
      setNodoRealtime("historia", historyInitialData),
      setNodoRealtime("team", teamInitialData),
      setNodoRealtime("main", mainInitialData),
      setNodoRealtime("eslogan", sloganInitialData),
      setNodoRealtime("footer", footerInitialData),
      setNodoRealtime("contacto", contactInitialData),
      setNodoRealtime("variaciones", variationsInitialData1),
      setTipsCategoryFirestore(),
      setTipsFirestore(),
      setProductsCategoryFirestore(),
      createDocConfig(), //documento de Firestore
    ]);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Funciones ejecutadas con éxito",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (e) {
    console.error("Error! ", error);
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Algo está mal...",
      showConfirmButton: false,
      timer: 1500,
    });
  }
}

//! STORAGE de imágenes
//almacenar imágen en una carpeta en STORAGE. Devuelve la url remota de la imagen subida
export async function setImageStorage(file, folder) {
  if (!file) {
    throw new Error("No se proporcionó ningún archivo");
  }

  // Genera un nombre de archivo único usando UUID
  const uniqueFileName = `${folder}/${uuidv4()}_${file.name}`;

  // Referencia a la ubicación del archivo en el almacenamiento
  const fileRef = refStorage(imagesDB, uniqueFileName);

  try {
    // Cargar el archivo
    await uploadBytes(fileRef, file);

    // Obtener la URL de descarga
    const downloadURL = await getDownloadURL(fileRef);

    return downloadURL;
  } catch (error) {
    // Manejo de errores
    console.error("Error durante la carga del archivo:", error);
    throw error;
  }
}

//obtener todas las imágenes de una carpeta específica. Devuelve un array de imgs
export async function getFolderStorage(folder) {
  try {
    const folderRef = refStorage(imagesDB, folder);
    const { items } = await listAll(folderRef);
    const downloadUrls = await Promise.all(
      items.map((item) => getDownloadURL(item))
    );
    return downloadUrls;
  } catch (error) {
    console.error(`Error descargando imágenes de ${folder}: `, error);
    throw error;
  }
}
