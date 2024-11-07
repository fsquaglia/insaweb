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
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default async function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const data = await getDataFromFirebaseWithCache();
  let configurations;
  try {
    const response = await fetch(`${apiUrl}/api/configurations`, {
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Error al cargar la configuración");
    configurations = await response.json();
  } catch (error) {
    console.error("Error al cargar la configuración:", error);
    return (
      <div className="flex mx-auto my-4">
        <MessageComponent
          message="Error al cargar la configuración. Intenta recarga la página."
          type={"error"}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="bg-slate-900 text-gray-200 bg-opacity-90 shadow-md fixed top-0 left-0 right-0 z-20">
        <Navbar configurations={configurations} />
      </div>
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
        {configurations?.mostrarOfertasEnHome && (
          <section id="offers" className="w-full">
            {/*offers recibe datos de BD Firestore */}
            <Offers />
          </section>
        )}
        {configurations?.mostrarTipsEnHome && (
          <section id="tips" className="w-full">
            {/*tips recibe datos de BD Firestore */}
            <Tips />
          </section>
        )}
        {configurations?.mostrarHistoriaEnHome && (
          <section id="history" className="w-full">
            {/*History recibe data de Realtime*/}
            <History historia={data ? data.historia : null} />
          </section>
        )}
        {configurations?.mostrarAboutEnHome && (
          <section id="about" className="w-full">
            {/*About recibe data de Realtime*/}
            <About about={data ? data.about : null} />
          </section>
        )}

        {/*Team recibe data de Realtime*/}
        {configurations?.mostrarEquipoEnHome && (
          <Team team={data ? data.team : null} />
        )}

        {configurations?.mostrarSocialMediaEnHome && (
          <section id="social-media" className="w-full">
            {/*SocialMedia recibe data de Realtime, dentro del nodo contacto*/}
            <SocialMedia socialMedia={data?.contacto?.socialMedia ?? null} />
          </section>
        )}

        <section id="contact" className="w-full">
          {/*Contact recibe data de Realtime, dentro del nodo contacto*/}
          <Contact
            medios={data ? data?.contacto?.medios : null}
            ubicacion={data ? data?.contacto?.ubicacion : null}
            showMap={configurations?.mostrarMapaEnHome ?? false}
          />
        </section>

        {/*Slogan recibe data de Realtime*/}
        {configurations?.mostrarSloganEnHome && (
          <Slogan slogan={data ? data.eslogan : null} />
        )}
      </main>
      <Footer />
    </div>
  );
}
