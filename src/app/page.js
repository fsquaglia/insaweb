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

  // ** Peticiones para datos de la Landing **
  const [data, configurations, dataCategories] = await Promise.all([
    fetcherWithTags(`${apiUrl}/api/home`, "landingPage"),
    fetcherWithTags(`${apiUrl}/api/configurations`, "configurations"),
    fetcherWithTags(
      `${apiUrl}/api/categories/categories?landing=true`,
      "categories"
    ),
  ]);

  if (!data || !configurations || !dataCategories) {
    return (
      <div className="flex mx-auto my-4">
        <MessageComponent
          message="Error al cargar los datos. Intenta recargar la página."
          type="error"
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
      component: <Categories dataCategories={dataCategories} />,
      condition: true,
    },
    {
      id: "offers",
      component: <Offers />,
      // condition: configurations?.mostrarOfertasEnHome,
      condition: false,
    },
    {
      id: "tips",
      component: <Tips />,
      // condition: configurations?.mostrarTipsEnHome,
      condition: false,
    },
    {
      id: "history",
      component: <History historia={data ? data.historia : null} />,
      condition: configurations?.mostrarHistoriaEnHome,
    },
    {
      id: "about",
      component: <About about={data ? data.about : null} />,
      // condition: configurations?.mostrarAboutEnHome,
      condition: true,
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
      // condition: configurations?.mostrarSloganEnHome,
      condition: true,
    },
  ];

  return (
    <div>
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

//helper function to fetch data with error handling and caching
async function fetcherWithTags(url, tag) {
  try {
    const res = await fetch(url, { next: { tags: [tag] } });
    if (!res.ok) throw new Error(`Error al cargar ${url}`);
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
