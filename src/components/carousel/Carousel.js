import style from "./Carousel.module.css";
import CardCarousel from "./CardCarousel";
import { getFolderStorage } from "@/utils/firebase/fetchFirebase";

export default async function Carousel() {
  let imageUrls = [];
  try {
    imageUrls = await getFolderStorage("carousel");
  } catch (error) {
    console.error("Error al obtener imágenes: ", error);
  }
  const photos = [...imageUrls, ...imageUrls];

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
