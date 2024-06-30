import Main from "../components/main/Main";
import Carousel from "../components/carousel/Carousel";
import Categories from "../components/categories/Categories";
import Offers from "../components/offers/Offers";
import Tips from "../components/tips/Tips";
import History from "../components/history/History";
import Team from "../components/team/Team";
import About from "../components/about/About";
import SocialMedia from "../components/socialMedia/SocialMedia";
import Contact from "../components/contact/Contact";
import Slogan from "../components/slogan/Slogan";
import { getDataFromFirebaseWithCache } from "../utils/firebase/firebaseCache";

export default async function Home() {
  const data = await getDataFromFirebaseWithCache();

  return (
    <main className="w-full flex flex-col items-center justify-center">
      <section id="main" className="w-full">
        {/*Main recibe data de Realtime*/}
        <Main main={data ? data.main : null} />
      </section>
      <section id="carousel" className="w-full">
        {/*Carousel toma imgs de Storage, carpeta Carousel*/}
        <Carousel />
      </section>
      <section id="categories" className="w-full">
        {/*Categories recibe datos de BD Firestore*/}
        <Categories />
      </section>
      <section id="offers" className="w-full">
        {/*offers recibe datos de BD Firestore */}
        <Offers />
      </section>
      <section id="tips" className="w-full">
        {/*tips recibe datos de BD Firestore */}
        <Tips />
      </section>
      <section id="history" className="w-full">
        {/*History recibe data de Realtime*/}
        <History historia={data ? data.historia : null} />
      </section>
      <section id="about" className="w-full">
        {/*About recibe data de Realtime*/}
        <About about={data ? data.about : null} />
      </section>
      {/*Team recibe data de Realtime*/}
      <Team team={data ? data.team : null} />
      <section id="social-media" className="w-full">
        {/*SocialMedia recibe data de Realtime, dentro del nodo contacto*/}
        <SocialMedia socialMedia={data?.contacto?.socialMedia ?? null} />
      </section>
      <section id="contact" className="w-full">
        {/*Contact recibe data de Realtime, dentro del nodo contacto*/}
        <Contact
          medios={data ? data?.contacto?.medios : null}
          ubicacion={data ? data?.contacto?.ubicacion : null}
        />
      </section>
      {/*Slogan recibe data de Realtime*/}
      <Slogan slogan={data ? data.eslogan : null} />
    </main>
  );
}
