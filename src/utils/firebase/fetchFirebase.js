import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import {
  firestoreDB,
  realtimeDB,
  imagesDB,
} from "../../utils/firebase/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  doc,
  setDoc,
  addDoc,
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
} from "../SettingInitialData";

//!FIRESTORE
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
//agregar un documento a una coleccion (ej. una categoría a colección productos, productos/categorias, colección/documento)
export async function setDocInCollection(nameCollection, nameDoc, dataDoc) {
  try {
    await setDoc(doc(firestoreDB, nameCollection, nameDoc), dataDoc);
    console.log("Documento guardado correctamente.");
  } catch (error) {
    console.error("Error al guardar el documento: ", error);
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
    console.log("Categorías de productos creadas");
  } catch (error) {
    console.log("Error al crear categorías de productos: ", error);
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
    console.log("Categorías de tips creadas");
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
    console.log("Tips creados");
  } catch (e) {
    console.error("Error agregando Tips: ", e);
    throw e;
  }
}

//?ESCRIBIR DATOS EN FIRESTORE
//Agregar un nuevo CONTACTO/CLIENTE
export async function addNewContactFirestore(dataObject) {
  /*dataObject debe ser
  {nombreContacto:"Nombre Apellido",
  sobrenombre: "tucho",
  direccion: "",
  localidad:"",
  provincia:"",
  email:"",
  celTE:"",
  saldo: 0,
  }
  */
  try {
    // Agrega un nuevo doc a la colección "contactos"
    const docRef = await addDoc(
      collection(firestoreDB, "contactos"),
      dataObject
    );
    console.log("Contacto agregado: ", docRef.id);
  } catch (error) {
    console.error("Error al agregar contacto: ", error);
    throw error;
  }
}

//Agregar nuevo PRODUCTO
export async function addNewProductFirestore(
  coleccion,
  categoria = "",
  subCategoria = "",
  dataObject
) {
  /*dataObject debe ser
  {
  Artículo_Nro:"",
  Color:["Negro", "Suela"],
  Extra_1:"Algún dato extra",
  Estra_2:"Algún dato extra 2",
  FechaCompra: Timestamp.fromDate(new Date("2024-06-06")),
  Imagen: ["urls imagenes"],
  Marca: "Puerto Blue",
  Modelo: "Milan",
  Nombre:"Zapato de vestir caballero Milan"
  Numero: ["42", "44"],
  Talle: ["42", "44"],
  PrecioCompra: 100,
  PrecioVenta: 200,
  Publicado: true,
  Stock: 1,
  GrupoValores: "Zapatos PB",
  *idProducto: productos/Caballeros/Calzado Caballeros/KIcFk5axys0ZpAuOHovr SOLO PARA TABLA DE OFERTAS
  }
  */
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
    console.log("Producto agregado: ", docRef.id);
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
    console.log(`Información almacenada en ${nodo}`);
  } catch (e) {
    console.error(`Error almacenando en ${nodo}. `, e);
    throw e;
  }
}

//almacenar datos en el nodo CONTACT de Realtime. Serán los datos iniciales de la BD
export async function setContactRealtime() {
  const contacto = {
    ubicacion: {
      direccion: "Ituzaingó 1393",
      localidad: "San Cristobal",
      provincia: "Santa Fe",
    },
    legal: {
      fantasia: "Ihara & London",
      razonSocial: "Compagnon, M. Ayelén",
      logoURL: "",
    },
    medios: {
      cel: "54 3492 613004",
      TE: "",
      email: "ayecompagnon@gmail.com",
    },
    socialMedia: {
      imagenFondoSocialMedia:
        "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/socialmedia%2Fsocial01.jpg?alt=media&token=811605db-4bff-417e-a0ee-9d77c0668dc9",
      tituloSocialMedia: "Síguenos",
      facebook1: "https://www.facebook.com/londonestilo",
      facebook2: "",
      instagram1: "https://www.instagram.com/london_sc/",
      instagram2: "https://www.instagram.com/ihara_calzado/",
    },
  };

  try {
    const refAbout = realtimeRef(realtimeDB, "contacto");
    await set(refAbout, contacto);

    console.log("Contacto y social media creado");
  } catch (e) {
    console.error("Error al crear el Contacto: ", e);
    throw e;
  }
}

//almacenar datos en el nodo FOOTER de Realtime. Serán los datos iniciales de la BD
export async function setFooterRealtime() {
  const footer = {
    condicionesSitio:
      "Al navagar este sitio usdted acepta nuestras condiciones de privacidad",
    privacidad:
      "Los datos de terceros que recopilamos son exclusivamente para mejorar la navegación del sitio. En caso de solicitarle información será sólo para enviarle novedades.",
    avisoPrecios:
      "No se realizan ventas en el sitio. El mismo es de carácter informativo y los precios pueden variar sin previo aviso. Las imágenes de productos son de carácter informativo. Las ofertas aplican sólo a pagos en efectivo en el local.",
    servicioCliente:
      "Para más información comuníquese con nosotros vía email o Whatsapp a los datos informados en la sección Contacto.",
    imagenLogo:
      "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/logosIharaLondon%2Flogo_blanco01.png?alt=media&token=92d797fd-31b6-42de-85d4-f93b662ab7c4",
  };

  try {
    const refFooter = realtimeRef(realtimeDB, "footer");
    await set(refFooter, footer);

    console.log("Footer creado");
  } catch (e) {
    console.error("Error al crear el Footer: ", e);
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
      setContactRealtime(),
      setFooterRealtime(),
      setTipsCategoryFirestore(),
      setTipsFirestore(),
      setProductsCategoryFirestore(),
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
