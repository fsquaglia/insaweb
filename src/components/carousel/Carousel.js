import style from "./Carousel.module.css";
import CardCarousel from "./CardCarousel";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { imagesDB } from "../../utils/firebase/firebaseConfig";

export default async function Carousel() {
  let downloadUrls;

  try {
    const storageRef = ref(imagesDB, "carousel");
    const { items } = await listAll(storageRef);
    downloadUrls = await Promise.all(
      items.map(async (item) => {
        return await getDownloadURL(item);
      })
    );
  } catch (error) {
    console.error("Cargando imgs Carousel. Error: ", error);
  }

  const photos = [...downloadUrls, ...downloadUrls];

  return (
    <div className="w-full sm:container sm:mx-auto my-10">
      <div className={`overflow-hidden w-full ${style["carousel-gradient"]}`}>
        <div className="flex whitespace.nowrap animate-scroll">
          {photos.map((photo, index) => (
            <CardCarousel photo={photo} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
