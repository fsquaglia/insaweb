import style from "./Carousel.module.css";
import CardCarousel from "./CardCarousel";
import { getFolderStorage } from "@/utils/firebase/fetchFirebase";

const imgsCarousel = [
  "https://res.cloudinary.com/foodexpressimg/image/upload/v1753917352/insarafaela/carousel/Zarandas_tr4ynb.png",
  "https://res.cloudinary.com/foodexpressimg/image/upload/v1753917352/insarafaela/carousel/Matriz_zvnfb7.png",
  "https://res.cloudinary.com/foodexpressimg/image/upload/v1753917352/insarafaela/carousel/Martillos_rcfzqt.png",
  "https://res.cloudinary.com/foodexpressimg/image/upload/v1753917352/insarafaela/carousel/Tornillo_paao7d.png",
  "https://res.cloudinary.com/foodexpressimg/image/upload/v1753917352/insarafaela/carousel/celdas_bt1xnm.png",
  "https://res.cloudinary.com/foodexpressimg/image/upload/v1753917352/insarafaela/carousel/Repuestos_ewprzf.png",
  "https://res.cloudinary.com/foodexpressimg/image/upload/v1753917351/insarafaela/carousel/cangilon_xgkvei.png",
];

export default async function Carousel() {
  // let imageUrls = [];
  // try {
  //   imageUrls = await getFolderStorage("carousel");
  // } catch (error) {
  //   console.error("Error al obtener imágenes: ", error);
  // }
  const photos = [...imgsCarousel, ...imgsCarousel];

  return (
    <div className="w-full sm:container sm:mx-auto my-10">
      <div className={`overflow-hidden w-full ${style["carousel-gradient"]}`}>
        <div className="flex whitespace.nowrap animate-scroll">
          {photos.length > 0 ? (
            photos.map((photo, index) => (
              <CardCarousel photo={photo} key={index} />
            ))
          ) : (
            <p className="mx-auto text-center">Esperando el carrusel...</p>
          )}
        </div>
      </div>
    </div>
  );
}
