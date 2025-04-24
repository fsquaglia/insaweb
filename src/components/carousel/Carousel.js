import style from "./Carousel.module.css";
import CardCarousel from "./CardCarousel";
import { getFolderStorage } from "@/utils/firebase/fetchFirebase";

const imgsCarousel = [
  "https://res.cloudinary.com/foodexpressimg/image/upload/v1744994580/insarafaela/rotormolino01_pjzxvp.png",
  "https://res.cloudinary.com/foodexpressimg/image/upload/v1744994579/insarafaela/zaranda01_zq8yqc.png",
  "https://res.cloudinary.com/foodexpressimg/image/upload/v1744994580/insarafaela/matriz01_m8gg97.png",
  "https://res.cloudinary.com/foodexpressimg/image/upload/v1744994580/insarafaela/rotormezcla01_ltkjo3.png",
  "https://res.cloudinary.com/foodexpressimg/image/upload/v1744994579/insarafaela/cangilon01_hmjaxj.png",
  "https://res.cloudinary.com/foodexpressimg/image/upload/v1744994579/insarafaela/correas_miad6r.png",
  "https://res.cloudinary.com/foodexpressimg/image/upload/v1744994579/insarafaela/martillos01_qrnxyv.png",
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
