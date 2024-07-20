import HeaderCustomize from "@/ui/HeaderCustomize";
import IntroCustomize from "@/ui/IntroCustomize";

//Nombre del comercio
const nameCommerce = "Ihara & London";
//configuramos las medidas en px y tamaño en kB min y max aceptados para las imágenes
const minWidthAccepted = 1900;
const maxWidthAccepted = 1950;
const minHeightAccepted = 1000;
const maxHeigthAccepted = 1100;
const minSizeKBaccepted = 150;
const maxSizeKBaccepted = 500;
//configuramos longitudes de cadenas (caracteres) para los input
const maxLengthText1 = 25;
const maxLengthText2 = 25;
const maxLengthText3 = 40;
//configuración de la sección
const titulo = "Sección Categorías de productos";
const description = [
  "Podrás crear y administrar categorías de productos.",
  "Trata de no hacer cambios radicales cuando modificas categorías ya creadas.",
  //   `Medidas aceptadas para la imagen:`,
  //   `Ancho: 1920px,`,
  //   `Altura: 1080px,`,
  //   `Tamaño: ${minSizeKBaccepted}KB a ${maxSizeKBaccepted}KB.`,
];

function PageCategory() {
  return (
    <div className="container flex flex-col justify-center text-center">
      <HeaderCustomize titulo={titulo} />
      <IntroCustomize description={description} />
    </div>
  );
}
export default PageCategory;
