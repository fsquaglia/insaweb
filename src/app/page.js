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
  //console.log("pasando");
  //console.log(data);
  return (
    <main className="w-full flex flex-col items-center justify-center">
      <section id="main" className="w-full">
        {/*Main recibe data de Realtime*/}
        <Main main={data ? data.main : null} />
      </section>
      <section id="carousel" className="w-full">
        {/*Carousel toma imgs de Storage, carpeta Carousel. SACAR LA PETICION FUERA DEL COMPONENTE*/}
        <Carousel />
      </section>
      <section id="categories" className="w-full">
        {/*Categories toma los datos de la BD Firestore. SACAR LA PETICION FUERA DEL COMPONENTE */}
        <Categories />
      </section>
      <section id="offers" className="w-full">
        <Offers />
      </section>
      <section id="tips" className="w-full">
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
        <SocialMedia socialMedia={data ? data.contacto.socialMedia : null} />
      </section>
      <section id="contact" className="w-full">
        {/*Contact recibe data de Realtime, dentro del nodo contacto*/}
        <Contact
          medios={data ? data.contacto.medios : null}
          ubicacion={data ? data.contacto.ubicacion : null}
        />
      </section>
      <Slogan slogan={data ? data.eslogan : null} />
    </main>
  );
}
