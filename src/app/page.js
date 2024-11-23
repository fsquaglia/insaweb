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
import Footer from "@/components/footer/Footer";
import MessageComponent from "@/ui/MessageComponent";

export default async function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  let configurations, data;

  try {
    // Realizamos ambas peticiones de forma paralela
    const [homeResponse, configResponse] = await Promise.all([
      fetch(`${apiUrl}/api/home`),
      fetch(`${apiUrl}/api/configurations`),
    ]);

    // Validamos ambas respuestas
    if (!homeResponse.ok) throw new Error("Error al cargar home");
    if (!configResponse.ok) throw new Error("Error al cargar la configuración");

    // Obtenemos los datos de ambas respuestas
    data = await homeResponse.json();
    configurations = await configResponse.json();
  } catch (error) {
    console.error("Error en las solicitudes:", error);
    return (
      <div className="flex mx-auto my-4">
        <MessageComponent
          message="Error al cargar los datos. Intenta recargar la página."
          type={"error"}
        />
      </div>
    );
  }

  const sections = [
    {
      id: "main",
      component: <Main main={data ? data.main : null} />,
      condition: true,
    },
    {
      id: "carousel",
      component: <Carousel />,
      condition: true,
    },
    {
      id: "categories",
      component: <Categories />,
      condition: true,
    },
    {
      id: "offers",
      component: <Offers />,
      condition: configurations?.mostrarOfertasEnHome,
    },
    {
      id: "tips",
      component: <Tips />,
      condition: configurations?.mostrarTipsEnHome,
    },
    {
      id: "history",
      component: <History historia={data ? data.historia : null} />,
      condition: configurations?.mostrarHistoriaEnHome,
    },
    {
      id: "about",
      component: <About about={data ? data.about : null} />,
      condition: configurations?.mostrarAboutEnHome,
    },
    {
      id: "team",
      component: <Team team={data ? data.team : null} />,
      condition: configurations?.mostrarEquipoEnHome,
    },
    {
      id: "social-media",
      component: (
        <SocialMedia socialMedia={data?.contacto?.socialMedia ?? null} />
      ),
      condition: configurations?.mostrarSocialMediaEnHome,
    },
    {
      id: "contact",
      component: (
        <Contact
          medios={data ? data?.contacto?.medios : null}
          ubicacion={data ? data?.contacto?.ubicacion : null}
          showMap={configurations?.mostrarMapaEnHome ?? false}
        />
      ),
      condition: true,
    },
    {
      id: "slogan",
      component: <Slogan slogan={data ? data.eslogan : null} />,
      condition: configurations?.mostrarSloganEnHome,
    },
  ];

  return (
    <div>
      {/* <div className="bg-slate-900 text-gray-200 bg-opacity-90 shadow-md fixed top-0 left-0 right-0 z-20">
        <Navbar configurations={configurations} />
      </div> */}
      <main className="w-full flex flex-col items-center justify-center">
        {sections
          .filter((section) => section.condition)
          .map((section) => (
            <section key={section.id} id={section.id} className="w-full">
              {section.component}
            </section>
          ))}
      </main>
      <Footer />
    </div>
  );
}
