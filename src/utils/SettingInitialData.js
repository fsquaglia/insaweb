import { Timestamp } from "firebase/firestore";

//Datos iniciales para reseteo de la BD

export const aboutInitialData = {
  descripcion:
    "En Ihara & London, creemos que el calzado y la indumentaria son más que simples prendas, son una expresión de estilo y personalidad. Nos hemos comprometido en ofrecer productos de alta calidad que combinan confort y diseño innovador.  Nos especializamos en una selección cuidadosamente curada de zapatos y ropa que se adaptan a las últimas tendencias y a las necesidades de nuestros clientes. Desde el casual diario hasta el atuendo más sofisticado, cada pieza en nuestra colección refleja nuestra pasión por la moda y la calidad.  Estamos aquí para brindarte una experiencia de compra agradable, guiándote a encontrar las piezas perfectas para completar tu estilo. Nos esforzamos por ofrecer no solo productos excepcionales, sino también un servicio al cliente de primer nivel que nos distingue en el sector.  Descubre con nosotros una forma de vestir que celebra tu individualidad y comodidad. ¡Bienvenidos a Ihara & London!",
  imagen:
    "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/about%2Fnosotros01.jpg?alt=media&token=d5c128ba-c8c1-4277-9954-533f6064c0bc",
  titulo: "Sobre nosotros",
  visible: true,
};

export const sloganInitialData = {
  imagen:
    "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/slogan%2FfondoSlogan.jpg?alt=media&token=f795872b-b144-4383-b44d-3eaa4c0de909",
  titulo: "Vive la vida",
  visible: true,
};

export const historyInitialData = {
  historia1: {
    descripcion:
      "Nuestra tienda nació de una pasión por la moda y la funcionalidad. Fundada en 2019, comenzamos como un pequeño emprendimiento familiar con el objetivo de ofrecer productos de alta calidad que combinen estilo y comodidad. Con el tiempo, nuestra dedicación a la excelencia nos ha permitido crecer y convertirnos en una referencia en el sector. Hoy, nos enorgullece ofrecer una amplia gama de productos que reflejan las últimas tendencias, sin dejar de lado la practicidad y el confort que nuestros clientes valoran.",
    imagen:
      "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/history%2Fhistoria1.jpg?alt=media&token=540ec85a-2768-40ac-a8f8-701d2d998d3d",
    titulo: "Historia",
    visible: true,
  },
  historia2: {
    descripcion:
      "Nuestra misión es inspirar a nuestros clientes a través de una experiencia de compra única, proporcionando piezas de calidad que se adapten a su estilo de vida. Nos esforzamos por ofrecer productos que no solo sean estéticamente atractivos, sino que también ofrezcan comodidad y durabilidad. Creemos en la importancia de la atención al cliente y nos comprometemos a brindar un servicio excepcional en cada interacción.",
    imagen:
      "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/history%2Fhistoria2.jpg?alt=media&token=bbb17233-d3ad-4802-b734-8fa5155e5c70",
    titulo: "Misión",
    visible: true,
  },
  historia3: {
    descripcion:
      "Nuestra visión es convertirnos en la tienda líder en la venta de indumentaria y calzado, reconocida por nuestra dedicación a la innovación, la calidad y la satisfacción del cliente. Aspiramos a expandir nuestra presencia tanto en el mercado local como zonal, mientras seguimos siendo fieles a nuestros principios de sostenibilidad y responsabilidad social. Nos imaginamos un futuro donde cada cliente se sienta empoderado y seguro con cada prenda que lleve de nuestra tienda.",
    imagen:
      "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/history%2Fhistoria3.jpg?alt=media&token=d9eb2310-d3e6-4375-a438-da204366e5e1",
    titulo: "Visión",
    visible: true,
  },
  historia4: {
    descripcion:
      "Comprometidos con la más alta calidad, seleccionamos materiales y proveedores cuidadosamente para garantizar durabilidad y confort en nuestras prendas y calzado. Nos mantenemos a la vanguardia de las tendencias de moda, incorporando diseños modernos y funcionales para satisfacer las necesidades cambiantes de nuestros clientes. Valoramos a nuestros clientes y ofrecemos una experiencia de compra excepcional, desde la consulta inicial hasta el servicio postventa. Actuamos con honestidad y transparencia en todas nuestras operaciones para mantener la confianza de clientes y proveedores.",
    imagen:
      "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/history%2Fhistoria4.jpg?alt=media&token=70de7543-32cd-4440-971e-295cbb5d1ed7",
    titulo: "Valores",
    visible: true,
  },
};

export const mainInitialData = {
  texto1: "La mejor colección",
  texto2: "Invierno hot",
  texto3: "Ofertas todas las semanas",
  imagen:
    "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/main%2Fmain01.jpg?alt=media&token=a56599f6-cf71-4329-9e13-6422c7a0f28c",
  visible: true,
};

export const teamInitialData = {
  he: {
    descripcion: "Para completar el equipo.",
    imagen:
      "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/team%2Ffer00.png?alt=media&token=2ad6c677-85e8-4fe8-a81d-6b8de170453f",
    titulo: "He/Él",
    nombre: "Fer",
    visible: true,
  },
  she: {
    descripcion: "Nacida para la moda.",
    imagen:
      "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/team%2Faye01.jpg?alt=media&token=faa81166-c3a5-4ee9-8d23-a801b6baf607",
    titulo: "She/Ella",
    nombre: "Aye",
    visible: true,
  },
  data: {
    descripcion:
      "En nuestra tienda, la calidad y la atención personalizada son nuestra prioridad. Somos un equipo apasionado, dedicado a ofrecerte la mejor experiencia de compra.",
    imagen: "",
    titulo: "El equipo",
    visible: true,
  },
};

export const contactInitialData = {
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
    cel: "543492613004",
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

export const footerInitialData = {
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

export const tipsInitialData = [
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

export const tipsCategoriesInitialData = [
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

//!datos de algunos contactos iniciales SI NO SE USA BORRAR
export const dataContactInitial = [
  {
    nombreContacto: "Fernando Squaglia",
    sobrenombre: "tucho",
    direccion: "Calle 1234",
    localidad: "San Cristóbal",
    provincia: "Santa Fe",
    email: "fernandosquaglia@gmail.com",
    password: "",
    celTE: "543408670000",
    saldo: 0,
    fechaVenceSaldo: Timestamp.fromDate(new Date("2024-12-31")),
    rol: "admin",
    imagen: "",
  },
  {
    nombreContacto: "Nombre1 Apellido1",
    sobrenombre: "loco 1",
    direccion: "Calle 321",
    localidad: "San Cristóbal",
    provincia: "Santa Fe",
    email: "email@email.com",
    password: "",
    celTE: "543408671111",
    saldo: 0,
    fechaVenceSaldo: Timestamp.fromDate(new Date("2024-12-31")),
    rol: "user",
    imagen: "",
  },
  {
    nombreContacto: "Nombre2 Apellido2",
    sobrenombre: "loco 2",
    direccion: "Calle 555",
    localidad: "San Cristóbal",
    provincia: "Santa Fe",
    email: "user@user.com  ",
    password: "",
    celTE: "543408675555",
    saldo: 0,
    fechaVenceSaldo: Timestamp.fromDate(new Date("2024-12-31")),
    rol: "user",
    imagen: "",
  },
  {
    nombreContacto: "Nombre4 Apellido4",
    sobrenombre: "loco 4",
    direccion: "Calle 999",
    localidad: "San Cristóba",
    provincia: "Santa Fe",
    email: "email999@com.com",
    password: "",
    celTE: "543408678877",
    saldo: 0,
    fechaVenceSaldo: Timestamp.fromDate(new Date("2024-12-31")),
    rol: "user",
    imagen: "",
  },
];

// Datos iniciales para el nuevo usuario que se carga desde RegisterForm
export const newUserDataInitial = (
  nombreContacto,
  email,
  passwordHash,
  rolUser,
  image
) => {
  return {
    nombreContacto: nombreContacto,
    sobrenombre: "",
    direccion: "",
    localidad: "",
    provincia: "",
    email: email,
    password: passwordHash, // Guardamos el hash de la contraseña
    celTE: "",
    saldo: 0,
    meGustaCommerce: false,
    rol: rolUser,
    fechaAlta: Timestamp.fromDate(new Date()),
    imagen: image
      ? image
      : "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/images%2FUserGeneric.png?alt=media&token=46f36e6c-9009-4641-ae30-841df4a23cde",
    fechaVenceSaldo: Timestamp.fromDate(new Date("1900-01-01")),
    fechaNacimiento: null,
  };
};

// Categorias de productos Iniciales
export const categoriesProductsInitialData = [
  {
    id: "Accesorios",
    descripcion: "El complemento indispensable para cualquier look.",
    textoSeccionWeb:
      "Los detalles hacen la diferencia. Descubre nuestra amplia variedad de accesorios que complementan cualquier outfit. Bolsos, cinturones, y más, pensados para agregar estilo y funcionalidad a tu día a día.",
    colorBase: "orange",
    imagen:
      "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/categories%2Faccesorios02.jpg?alt=media&token=d1a25704-9159-4b8a-9368-7366f6d18812",
    showLanding: true,
    tituloCard: "Accesorios",
  },
  {
    id: "Caballeros",
    descripcion:
      "La moda masculina es sutil. Un buen estilo y gusto agradable.",
    textoSeccionWeb:
      "Descubre la elegancia y sofisticación que define el estilo masculino. Nuestra colección para caballeros combina diseño y confort, con prendas ideales para destacar en cada ocasión. Renueva tu guardarropa con piezas que reflejan tu personalidad y buen gusto.",
    colorBase: "blue",
    imagen:
      "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/categories%2F_DMD9151bis.jpg?alt=media&token=a86eefdd-7203-4671-86cc-740394a6ac97",
    showLanding: true,
    tituloCard: "Para ellos",
  },
  {
    id: "Damas",
    descripcion:
      "Encuentra lo que necesitas para resaltar tu belleza de manera única.",
    textoSeccionWeb:
      "Explora nuestra exclusiva colección para damas, diseñada para realzar tu estilo y feminidad. Desde looks casuales hasta elegantes conjuntos, encontrarás prendas que se adaptan a cada ocasión, siempre con un toque de sofisticación y tendencia.",
    colorBase: "pink",
    imagen:
      "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/categories%2F405ad68e-7fb3-4073-86d5-57886500292c.jpg?alt=media&token=98f8511b-d7ea-42af-b77e-056ce6aa782d",
    showLanding: true,
    tituloCard: "Para ellas",
  },
  {
    id: "Kids",
    descripcion: "Los más peques también quieren tener su lugar.",
    textoSeccionWeb:
      "Nuestra colección para niños ofrece prendas diseñadas para brindar un toque de sofisticación y estilo a los más pequeños. Desde prendas infantiles hasta accesorios para niños, encontrarás todo lo que necesitas para brindar un momento de diversión.",
    colorBase: "green",
    imagen:
      "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/categories%2FK050A.jpg?alt=media&token=b370ec09-f12e-4e9e-8618-dd98e3dbea5a",
    showLanding: false,
    tituloCard: "Kids",
  },
  {
    id: "Unisex",
    descripcion: "La moda también tiene un lugar para compartir.",
    textoSeccionWeb:
      "Estilo sin límites. Nuestra colección unisex ofrece prendas versátiles y modernas, diseñadas para todos. Descubre piezas esenciales que combinan comodidad y tendencia, perfectas para cualquier ocasión y género.",
    colorBase: "purple",
    imagen:
      "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/categories%2Funisex.webp?alt=media&token=92dd937d-729a-40bb-85a5-4ffad7bacab4",
    showLanding: false,
    tituloCard: "Unisex",
  },
];

//? PRODUCTO BASE docBase
export const productBase = {
  codigoNro: "",
  codigoAnterior: "",
  categoria: "",
  subcategoria: "",
  nombre: "",
  detalle: "",
  marca: "Genérico",
  modelo: "",
  color: "Genérico",
  imagen: [
    "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/products%2FnoDisponible.png?alt=media&token=8f1273b7-f7d6-4179-8c8f-e1ff4ee6d871",
  ],
  magnitudDisponible: [
    {
      magnitud: "Genérico",
      stock: 1,
    },
  ],
  stockTotal: 1,
  extra1: "",
  extra2: "",
  fechaCompra: "",
  precioCompra: 0,
  precioVenta: 0,
  descEfectPorc: 10,
  esPrecioVentaDeGrupo: true,
  publicado: false,
  IDgrupoDeValores: 1, // Categoría o grupo al que pertenece
  productosRelacionados: [],
  enOferta: false,
  porcentajeDescuentoOferta: 50,
  hashtags: [],
  valoraciones: [],
  fechaCreado: Timestamp.fromDate(new Date()),
  fechaModificado: Timestamp.fromDate(new Date()),
};

//variaciones, como colores, talles, marcas, gruposValores, etc
export const variationsInitialData1 = {
  color: {
    tituloVariacion: "Colores",
    textoVariacion: "Variación correspondiente a distintos colores",
    urlImagen: "",
    esObjetoMultipleProp: false,
    data: [
      { color: "Blanco" },
      { color: "Negro" },
      { color: "Rojo" },
      { color: "Azul" },
      { color: "Verde" },
      { color: "Naranja" },
      { color: "Genérico" },
    ],
  },
  talle: {
    tituloVariacion: "Talles",
    textoVariacion: "Variación correspondiente a distintos talles",
    urlImagen: "",
    esObjetoMultipleProp: false,
    data: [
      { talle: "XS" },
      { talle: "S" },
      { talle: "M" },
      { talle: "L" },
      { talle: "XL" },
      { talle: "2XL" },
      { talle: "3XL" },
      { talle: "4XL" },
      { talle: "5XL" },
      { talle: "Único" },
      { talle: "Genérico" },
      { talle: "Extra" },
    ],
  },
  marca: {
    tituloVariacion: "Marcas",
    textoVariacion: "Variación correspondiente a distintas marcas",
    urlImagen: "",
    esObjetoMultipleProp: false,
    data: [
      { marca: "Idrogeno" },
      { marca: "Batuk" },
      { marca: "Soya" },
      { marca: "Meet Me" },
      { marca: "Las Locas" },
      { marca: "Genérico" },
    ],
  },
  grupoDeValores: {
    tituloVariacion: "Grupo de Valores",
    textoVariacion: "Variación correspondiente a distintos grupos de valores",
    urlImagen: "",
    esObjetoMultipleProp: true,
    data: [
      {
        IDgrupoDeValores: 1,
        grupoDeValores: "Grupo Genérico",
        precioLista: 0,
        descEfectPorc: 0,
      },
      {
        IDgrupoDeValores: 2,
        grupoDeValores: "Remera M.C. caballero clase A",
        precioLista: 20000,
        descEfectPorc: 10,
      },
      {
        IDgrupoDeValores: 3,
        grupoDeValores: "Remera M.C. caballero clase B",
        precioLista: 20000,
        descEfectPorc: 20,
      },
      {
        IDgrupoDeValores: 4,
        grupoDeValores: "Perfume caballero clase A",
        precioLista: 20000,
        descEfectPorc: 20,
      },
      {
        IDgrupoDeValores: 5,
        grupoDeValores: "Perfume caballero clase B",
        precioLista: 20000,
        descEfectPorc: 20,
      },
    ],
  },
  hashtag: {
    tituloVariacion: "Hashtags",
    textoVariacion: "Variación correspondiente a hashtags",
    urlImagen: "",
    esObjetoMultipleProp: false,
    data: [
      { hashtag: "#Ofertas" },
      { hashtag: "#Remeras" },
      { hashtag: "#Liquidación" },
    ],
  },
};

//! modificar de acuerdo a PRODUCTO BASE
export const dataProductInitial = [{}, {}];

export const dataConfigInitial = {
  codProdEnUso: 0,
  codProdPrefijo: "AA",
  codProdBloque: 15,
  coeficienteVenta: 1,
  multiplicadorCpraVta: 2.2,
  precioVisibleRol: 0, //0: admin, 1: users, 2: visitors
  mostrarProductosSinStock: false,
  productosPorPagina: 2,
  mostrarOfertasEnHome: false,
  mostrarTipsEnHome: false,
  mostrarHistoriaEnHome: true,
  mostrarAboutEnHome: true,
  mostrarEquipoEnHome: true,
  mostrarSocialMediaEnHome: true,
  mostrarMapaEnHome: true,
  mostrarSloganEnHome: true,
  mostrarNovedadesEnHome: true,
  mostrarMasMeGustaEnHome: true,
};
