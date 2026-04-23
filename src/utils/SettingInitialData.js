import { Timestamp } from "firebase/firestore";

//Datos iniciales para reseteo de la BD

export const aboutInitialData = {
  descripcion:
    "En Insa Rafaela, fabricamos equipos de alta calidad para la elaboración de alimento balanceado, ofreciendo soluciones innovadoras que optimizan la producción agroindustrial. Nuestro compromiso es proporcionar tecnología eficiente y duradera, junto con un asesoramiento especializado que impulse el crecimiento de nuestros clientes. Nos destacamos por entender las necesidades del sector y desarrollar productos que combinan rendimiento, confiabilidad y soporte técnico. Más que proveedores, somos aliados estratégicos que acompañan cada etapa del proceso productivo, garantizando excelencia y eficiencia en cada solución.",
  imagen:
    "https://res.cloudinary.com/foodexpressimg/image/upload/v1743270394/insarafaela/gvltrpog1ghybppbtem1.jpg",
  titulo: "Sobre nosotros",
  visible: true,
};

export const sloganInitialData = {
  imagen:
    "https://res.cloudinary.com/foodexpressimg/image/upload/v1745262113/insarafaela/slogan_d3yhfj.jpg",
  titulo: "Tecnología para el campo",
  visible: true,
};

export const historyInitialData = {
  historia1: {
    descripcion:
      "Nacimos con la necesidad de brindar soluciones concretas al sector agroindustrial. Desde nuestros primeros desarrollos, nos enfocamos en ofrecer equipos confiables, duraderos y eficientes que acompañen el crecimiento del campo argentino.",
    imagen:
      "https://res.cloudinary.com/foodexpressimg/image/upload/v1744157323/insarafaela/historia1_n0hoh5.png",
    titulo: "Historia",
    visible: true,
  },
  historia2: {
    descripcion:
      "Fabricar maquinaria de calidad que optimice la elaboración de alimento balanceado, brindando asesoramiento técnico y soluciones adaptadas a las necesidades del productor agropecuario.",
    imagen:
      "https://res.cloudinary.com/foodexpressimg/image/upload/v1744157338/insarafaela/historia2_ri096i.png",
    titulo: "Misión",
    visible: true,
  },
  historia3: {
    descripcion:
      "Ser referentes en innovación y eficiencia en la industria de maquinaria agrícola, expandiendo nuestra presencia con tecnología de vanguardia y un servicio que marque la diferencia.",
    imagen:
      "https://res.cloudinary.com/foodexpressimg/image/upload/v1744157325/insarafaela/historia3_jlxnow.png",
    titulo: "Visión",
    visible: true,
  },
  historia4: {
    descripcion:
      "Compromiso con el cliente, innovación constante, calidad en cada detalle, cercanía con el sector agropecuario y responsabilidad en cada etapa del proceso productivo.",
    imagen:
      "https://res.cloudinary.com/foodexpressimg/image/upload/v1744157327/insarafaela/historia4_akjshp.png",
    titulo: "Valores",
    visible: true,
  },
};

export const mainInitialData = {
  texto1: "Tecnología que rinde",
  texto2: "Pensado para el agro",
  texto3: "Asistencia técnica siempre cerca",
  imagen:
    "https://res.cloudinary.com/foodexpressimg/image/upload/v1744079505/insarafaela/pu7rot5g5xxsorkkg0gs.jpg",
  visible: true,
};

export const teamInitialData = {
  he: {
    descripcion: "Ventas región sur.",
    imagen:
      "https://res.cloudinary.com/foodexpressimg/image/upload/v1744998066/insarafaela/marcelo01_jhf4tk.png",
    titulo: "Ventas",
    nombre: "Marcelo",
    visible: true,
  },
  she: {
    descripcion: "Ventas región centro/norte.",
    imagen:
      "https://res.cloudinary.com/foodexpressimg/image/upload/v1744998066/insarafaela/nicolas01_chc5eb.png",
    titulo: "Comercial/Ventas",
    nombre: "Nicolás",
    visible: true,
  },
  data: {
    descripcion: "Un equipo de trabajo puesto a disposición del cliente",
    imagen: "",
    titulo: "Nuestro equipo",
    visible: true,
  },
};

export const contactInitialData = {
  ubicacion: {
    direccion: "Bv. Julio A. Roca 455 Oficina 7",
    localidad: "Rafaela",
    provincia: "Santa Fe",
  },
  legal: {
    fantasia: "Insa S.A.",
    razonSocial: "Nicolás Andorno",
    logoURL: "",
  },
  medios: {
    cel: "543492396684",
    TE: "",
    email: "insa.rafaela@gmail.com",
  },
  socialMedia: {
    imagenFondoSocialMedia:
      "https://res.cloudinary.com/foodexpressimg/image/upload/v1745019896/insarafaela/Anotaci%C3%B3n_2025-04-18_204232_z2o0su.jpg",
    tituloSocialMedia: "Seguinos",
    facebook1: "",
    facebook2: "",
    instagram1: "https://www.instagram.com/insa.rafaela/",
    instagram2: "",
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
  image,
  usuarioVerificado = false
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
      : "https://res.cloudinary.com/foodexpressimg/image/upload/v1776694089/generic_user_bxd24y.png",
    fechaVenceSaldo: Timestamp.fromDate(new Date("1900-01-01")),
    fechaNacimiento: null,
    likesIDproductos: [],
    usuarioVerificado: usuarioVerificado,
  };
};

// Categorias de productos Iniciales
export const categoriesProductsInitialData = [];

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
    "https://res.cloudinary.com/foodexpressimg/image/upload/v1776692158/generic_product_pspkso.jpg",
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
  likesCount: 0,
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

// Imagen genérica para Categorías de productos y otros
export const urlGenerica = `https://res.cloudinary.com/foodexpressimg/image/upload/v1755090679/insarafaela/generic01_ozlb5m.png`;
