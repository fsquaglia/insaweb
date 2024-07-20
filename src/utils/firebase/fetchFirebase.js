import { v4 as uuidv4 } from "uuid";
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

//!FIRESTORE
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
  //Categoría Accesorios
  const docDataAccesorios = {
    descripcion: "El complemento indispensable para cualquier look.",
    imagen:
      "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/categories%2Faccesorios02.jpg?alt=media&token=d1a25704-9159-4b8a-9368-7366f6d18812",
    showLanding: true,
    tituloCard: "Accesorios",
  };
  //Categoría Caballeros
  const docDataCaballeros = {
    descripcion:
      "La moda masculina es sutil. Un buen estilo y gusto agradable.",
    imagen:
      "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/categories%2F_DMD9151bis.jpg?alt=media&token=a86eefdd-7203-4671-86cc-740394a6ac97",
    showLanding: true,
    tituloCard: "Para ellos",
  };
  //Categoría Damas
  const docDataDamas = {
    descripcion:
      "Encuentra lo que necesitas para resaltar tu belleza de manera única.",
    imagen:
      "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/categories%2F405ad68e-7fb3-4073-86d5-57886500292c.jpg?alt=media&token=98f8511b-d7ea-42af-b77e-056ce6aa782d",
    showLanding: true,
    tituloCard: "Para ellas",
  };
  //Categoría Niños
  const docDataNinos = {
    descripcion: "Los más peques también quieren tener su lugar.",
    imagen:
      "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/categories%2FK050A.jpg?alt=media&token=b370ec09-f12e-4e9e-8618-dd98e3dbea5a",
    showLanding: false,
    tituloCard: "Kids",
  };
  //Categoría Unisex
  const docDataUnisex = {
    descripcion: "La moda también tiene un lugar para compartir.",
    imagen:
      "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/categories%2Funisex.webp?alt=media&token=92dd937d-729a-40bb-85a5-4ffad7bacab4",
    showLanding: false,
    tituloCard: "Unisex",
  };

  try {
    await setDoc(
      doc(firestoreDB, "productos", "Accesorios"),
      docDataAccesorios
    );
    await setDoc(
      doc(firestoreDB, "productos", "Caballeros"),
      docDataCaballeros
    );
    await setDoc(doc(firestoreDB, "productos", "Damas"), docDataDamas);
    await setDoc(doc(firestoreDB, "productos", "Kids"), docDataNinos);
    await setDoc(doc(firestoreDB, "productos", "Unisex"), docDataUnisex);
    console.log("Categorias de productos creadas");
  } catch (error) {
    console.log("Error al crear categorías de productos: ", error);
    throw error;
  }
}

//agregar datos iniciales para Colección CATEGORIAS TIPS. Serán solo datos para iniciar la BD
export async function setTipsCategoryFirestore() {
  // Array de datos de las categorías de tips
  const categories = [
    {
      descripcion: "Las mejores recomendaciones para vestirse bien",
      imagen:
        "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/tips%2FConsejoEstilo.png?alt=media&token=049f0f86-01a7-4041-b731-ae0da08c4626",
      titulo: "Consejos de estilo",
    },
    {
      descripcion: "Recomendaciones sobre sostenibilidad",
      imagen:
        "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/tips%2Fsostenibilidad.svg?alt=media&token=430743f6-0651-41c4-9435-fbf2d71eb158",
      titulo: "Sostenibilidad en la moda",
    },
    {
      descripcion:
        "Para ayudarte a resolver tus dudas a la hora de tomar desiciones",
      imagen:
        "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/tips%2FGuiaCompra.svg?alt=media&token=eb0b3fd0-7d61-4bc1-a337-14bc06842b8c",
      titulo: "Guías de compra",
    },
    {
      descripcion: "Todo resuelto a la hora de dejar la ropa como nueva",
      imagen:
        "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/tips%2FCuidadoRopa.png?alt=media&token=46e8f146-8e1b-4864-982d-475a9db2466a",
      titulo: "Cuidado de la ropa",
    },
    {
      descripcion: "Mantener un calzado como nuevo será una tarea simple",
      imagen:
        "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/tips%2FCuidadoCalzado.svg?alt=media&token=e21b1365-4af1-47fd-b6b2-bcbe4de4dd07",
      titulo: "Cuidado del calzado",
    },
    {
      descripcion: "Te mantenemos al día con lo que se viene en el rubro Modas",
      imagen:
        "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/tips%2FTendencias.svg?alt=media&token=f5940315-4e3f-45f2-9f84-0e8f7a1c53cb",
      titulo: "Tendencias de moda",
    },
  ];

  try {
    // Usar `Promise.all` para esperar a que todas las promesas se resuelvan
    await Promise.all(
      categories.map((category) =>
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
  // Array de datos de Tips
  const tips = [
    {
      categoria: "Guías de compra",
      detalle:
        "Al comprar calzado, asegúrate de probarlo al final del día cuando tus pies están más hinchados. Verifica que haya espacio suficiente en la punta y que no rocen en los laterales. Camina con ellos por la tienda para asegurarte de que no hay puntos de presión.",
      fecha: Timestamp.fromDate(new Date("2024-06-06")),
      imagen:
        "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/tips%2Fprobarcalzado.jpg?alt=media&token=7c7e9502-9eff-4945-af82-c42e50c80213",
      titulo: "Como comprar calzado que se ajuste perfectamente",
      visible: true,
    },
    {
      categoria: "Cuidado de la ropa",
      detalle:
        "Si tienes una mancha de vino en tu ropa, actúa rápido. Cubre la mancha con sal para absorber el líquido. Luego, enjuaga con agua fría y lava la prenda como de costumbre. Este método ayuda a evitar que la mancha se fije permanentemente en la tela.",
      fecha: Timestamp.fromDate(new Date("2024-06-02")),
      imagen:
        "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/tips%2Fmancha-vino-ropa.webp?alt=media&token=b98e0301-d005-4593-8f01-23c044c7e012",
      titulo: "Elimina manchas de vino en la ropa",
      visible: true,
    },
    {
      categoria: "Consejos de estilo",
      detalle:
        "Para crear un atuendo equilibrado, usa la regla del 60-30-10: 60% de un color dominante, 30% de un color secundario y 10% de un color de acento. Esta fórmula ayuda a combinar colores de manera armoniosa y atractiva, evitando combinaciones desentonadas.",
      fecha: Timestamp.fromDate(new Date("2024-06-03")),
      imagen:
        "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/tips%2Fconsejos.webp?alt=media&token=36ab1f4e-9e6a-49c3-8b5e-5897e90988da",
      titulo: "Combinar colores en la vestimenta",
      visible: true,
    },
    {
      categoria: "Tendencias de moda",
      detalle:
        "Este verano, los colores pastel como el lavanda y el verde menta están en auge, al igual que los tonos vibrantes como el coral y el amarillo neón. Incorporar estos colores en tu vestimenta puede actualizar tu estilo y mantenerlo fresco y a la moda.",
      fecha: Timestamp.fromDate(new Date("2024-06-04")),
      imagen:
        "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/tips%2Ftendencias_2024.jpg.webp?alt=media&token=d1f516f8-177c-439d-a4a4-ae708c5aab46",
      titulo: "Tendencias de colores para verano 2024",
      visible: true,
    },
    {
      categoria: "Cuidado del calzado",
      detalle:
        "Para limpiar el calzado de cuero, usa un paño húmedo y jabón neutro. Frota suavemente para quitar la suciedad. Luego, aplica una crema hidratante específica para cuero para mantener la flexibilidad y el brillo. Evita el uso de productos químicos agresivos que pueden dañar el material.",
      fecha: Timestamp.fromDate(new Date("2024-06-01")),
      imagen:
        "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/tips%2Fcomo-limpiar-botas-de-piel.webp?alt=media&token=0b98be8a-0c84-4b9c-adbd-c734efe4cc17",
      titulo: "Cómo limpiar calzado de cuero",
      visible: true,
    },
  ];

  try {
    // Usar `Promise.all` para esperar a que todas las promesas se resuelvan
    await Promise.all(
      tips.map((elem) => addDoc(collection(firestoreDB, "tips"), elem))
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
  articulo:"",
  color:["Negro", "Suela"],
  data1:"Algún dato extra",
  data2:"Algún dato extra 2",
  fechaCompra: Timestamp.fromDate(new Date("2024-06-06")),
  imagen: ["urls imagenes"],
  marca: "Puerto Blue",
  Modelo: "Milan",
  nombre:"Zapato de vestir caballero Milan"
  num_talle: ["42", "44"],
  precioCompra: 100,
  precioVenta: 200,
  publicado: true,
  stock: 1,
  grupoValores: "Zapatos PB",
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
//?Traer datos de un nodo de realtime
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

//almacenar datos en el nodo HISTORIA de Realtime. Serán los datos iniciales de la BD
export async function setHistoryRealtime() {
  const historia = [
    {
      historia1: {
        descripcion:
          "Nuestra tienda nació de una pasión por la moda y la funcionalidad. Fundada en 2019, comenzamos como un pequeño emprendimiento familiar con el objetivo de ofrecer productos de alta calidad que combinen estilo y comodidad. Con el tiempo, nuestra dedicación a la excelencia nos ha permitido crecer y convertirnos en una referencia en el sector. Hoy, nos enorgullece ofrecer una amplia gama de productos que reflejan las últimas tendencias, sin dejar de lado la practicidad y el confort que nuestros clientes valoran.",
        imagen:
          "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/history%2Fhistoria1.jpg?alt=media&token=540ec85a-2768-40ac-a8f8-701d2d998d3d",
        titulo: "Historia",
        visible: true,
      },
    },
    {
      historia2: {
        descripcion:
          "Nuestra misión es inspirar a nuestros clientes a través de una experiencia de compra única, proporcionando piezas de calidad que se adapten a su estilo de vida. Nos esforzamos por ofrecer productos que no solo sean estéticamente atractivos, sino que también ofrezcan comodidad y durabilidad. Creemos en la importancia de la atención al cliente y nos comprometemos a brindar un servicio excepcional en cada interacción.",
        imagen:
          "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/history%2Fhistoria2.jpg?alt=media&token=bbb17233-d3ad-4802-b734-8fa5155e5c70",
        titulo: "Misión",
        visible: true,
      },
    },
    {
      historia3: {
        descripcion:
          "Nuestra visión es convertirnos en la tienda líder en la venta de indumentaria y calzado, reconocida por nuestra dedicación a la innovación, la calidad y la satisfacción del cliente. Aspiramos a expandir nuestra presencia tanto en el mercado local como zonal, mientras seguimos siendo fieles a nuestros principios de sostenibilidad y responsabilidad social. Nos imaginamos un futuro donde cada cliente se sienta empoderado y seguro con cada prenda que lleve de nuestra tienda.",
        imagen:
          "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/history%2Fhistoria3.jpg?alt=media&token=d9eb2310-d3e6-4375-a438-da204366e5e1",
        titulo: "Visión",
        visible: true,
      },
    },
    {
      historia4: {
        descripcion:
          "Comprometidos con la más alta calidad, seleccionamos materiales y proveedores cuidadosamente para garantizar durabilidad y confort en nuestras prendas y calzado. Nos mantenemos a la vanguardia de las tendencias de moda, incorporando diseños modernos y funcionales para satisfacer las necesidades cambiantes de nuestros clientes. Valoramos a nuestros clientes y ofrecemos una experiencia de compra excepcional, desde la consulta inicial hasta el servicio postventa. Actuamos con honestidad y transparencia en todas nuestras operaciones para mantener la confianza de clientes y proveedores.",
        imagen:
          "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/history%2Fhistoria4.jpg?alt=media&token=70de7543-32cd-4440-971e-295cbb5d1ed7",
        titulo: "Valores",
        visible: true,
      },
    },
  ];

  try {
    // Usar `Promise.all` para esperar a que todas las promesas se resuelvan
    await Promise.all(
      historia.map(async (historiaObj) => {
        const key = Object.keys(historiaObj)[0];
        const data = historiaObj[key];
        const refHistory = realtimeRef(realtimeDB, `historia/${key}`);
        await set(refHistory, data);
      })
    );
    console.log("Historia creada");
  } catch (e) {
    console.error("Error al crear la historia: ", e);
    throw e;
  }
}

//almacenar datos en el nodo TEAM de Realtime. Serán los datos iniciales de la BD
export async function setTeamRealtime() {
  const team = [
    {
      he: {
        descripcion: "Para completar el equipo.",
        imagen:
          "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/team%2Ffer00.png?alt=media&token=2ad6c677-85e8-4fe8-a81d-6b8de170453f",
        titulo: "He/Él",
        nombre: "Fer",
      },
    },
    {
      she: {
        descripcion: "Nacida para la moda.",
        imagen:
          "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/team%2Faye01.jpg?alt=media&token=faa81166-c3a5-4ee9-8d23-a801b6baf607",
        titulo: "She/Ella",
        nombre: "Aye",
      },
    },
    {
      data: {
        descripcion:
          "En nuestra tienda, la calidad y la atención personalizada son nuestra prioridad. Somos un equipo apasionado, dedicado a ofrecerte la mejor experiencia de compra.",
        imagen: "",
        titulo: "El equipo",
      },
    },
  ];

  try {
    // Usar `Promise.all` para esperar a que todas las promesas se resuelvan
    await Promise.all(
      team.map(async (elem) => {
        const key = Object.keys(elem)[0];
        const data = elem[key];
        const refTeam = realtimeRef(realtimeDB, `team/${key}`);
        await set(refTeam, data);
      })
    );
    console.log("Team creado");
  } catch (e) {
    console.error("Error al crear el Team: ", e);
    throw e;
  }
}

//almacenar datos en el nodo ABOUT de Realtime. Serán los datos iniciales de la BD
export async function setAboutRealtime() {
  const about = {
    descripcion:
      "En Ihara & London, creemos que el calzado y la indumentaria son más que simples prendas, son una expresión de estilo y personalidad. Nos hemos comprometido en ofrecer productos de alta calidad que combinan confort y diseño innovador.  Nos especializamos en una selección cuidadosamente curada de zapatos y ropa que se adaptan a las últimas tendencias y a las necesidades de nuestros clientes. Desde el casual diario hasta el atuendo más sofisticado, cada pieza en nuestra colección refleja nuestra pasión por la moda y la calidad.  Estamos aquí para brindarte una experiencia de compra agradable, guiándote a encontrar las piezas perfectas para completar tu estilo. Nos esforzamos por ofrecer no solo productos excepcionales, sino también un servicio al cliente de primer nivel que nos distingue en el sector.  Descubre con nosotros una forma de vestir que celebra tu individualidad y comodidad. ¡Bienvenidos a Ihara & London!",
    imagen:
      "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/about%2Fnosotros01.jpg?alt=media&token=d5c128ba-c8c1-4277-9954-533f6064c0bc",
    titulo: "Sobre nosotros",
  };

  try {
    const refAbout = realtimeRef(realtimeDB, "about");
    await set(refAbout, about);

    console.log("About creado");
  } catch (e) {
    console.error("Error al crear el About: ", e);
    throw e;
  }
}

//MAIN
//Guardar datos en el nodo main de Realtime.Si no se pasan valores, toma los que serán los datos iniciales de la BD
export async function setMainRealtime(
  primera = "La mejor colección",
  segunda = "Invierno hot",
  tercera = "Ofertas todas las semanas",
  imagen = "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/main%2Fmain01.jpg?alt=media&token=a56599f6-cf71-4329-9e13-6422c7a0f28c"
) {
  const main = {
    texto1: primera,
    texto2: segunda,
    texto3: tercera,
    imagen: imagen,
  };
  try {
    const refMain = realtimeRef(realtimeDB, "main");
    await set(refMain, main);

    console.log("Main creado");
  } catch (e) {
    console.error("Error al crear Main: ", e);
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

//almacenar datos en el nodo ESLOGAN de Realtime. Serán los datos iniciales de la BD
export async function setSloganRealtime() {
  const slogan = {
    texto: "Vive la vida",
    imagen:
      "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/slogan%2FfondoSlogan.jpg?alt=media&token=f795872b-b144-4383-b44d-3eaa4c0de909",
  };

  try {
    const refSlogan = realtimeRef(realtimeDB, "eslogan");
    await set(refSlogan, slogan);

    console.log("Eslogan creado");
  } catch (e) {
    console.error("Error al crear el Eslogan: ", e);
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

//? almacenar todos los datos iniciales par ala página
export async function loadDataInitFirebase() {
  try {
    // Ejecutar funciones en paralelo
    await Promise.all([
      setHistoryRealtime(),
      setTeamRealtime(),
      setAboutRealtime(),
      setMainRealtime(),
      setContactRealtime(),
      setSloganRealtime(),
      setFooterRealtime(),
      setTipsCategoryFirestore(),
      setTipsFirestore(),
      setProductsCategoryFirestore(),
    ]);
    console.log("Funciones ejecutadas con éxito");
  } catch (e) {
    console.error("Error al ejecutar funciones: ", e);
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
