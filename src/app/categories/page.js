import MessageComponent from "@/ui/MessageComponent";
import FirstCategory from "@/components/categories/FirstCategory";
import CardCategoryPortrait from "@/components/categories/CardCategoryPortrait";

const words = [
  "Durabilidad",
  "Eficiencia",
  "Calidad",
  "Confiabilidad",
  "Precisión",
  "Innovación",
];
const colors = [
  "bg-blue-700",
  "bg-green-700",
  "bg-teal-700",
  "bg-blue-700",
  "bg-green-700",
  "bg-teal-700",
];

export default async function PageCategories() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const urlFragment = `${apiUrl}/product-category`;

  let dataCategories = [];
  try {
    const response = await fetch(`${apiUrl}/api/categories/categories`, {
      next: {
        tags: ["categories, categoriesLanding, subcategories"],
      },
    });
    if (!response.ok) {
      throw new Error("Error al obtener las categorías");
    }
    dataCategories = await response.json();
    // console.log("Categorías obtenidas:", dataCategories);
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    return (
      <div className="flex justify-center items-center">
        <MessageComponent
          message={"Aún no tenemos las categorías"}
          type={"error"}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full pt-4 pb-8 px-2">
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/foodexpressimg/image/upload/v1745019896/insarafaela/Anotaci%C3%B3n_2025-04-18_204232_z2o0su.jpg')`,
        }}
      />

      {/* Desktop */}
      <div className="hidden sm:block">
        <CardLandscape
          dataCategories={dataCategories}
          urlFragment={urlFragment}
        />
      </div>

      {/* Mobile: recorre todas las categorías */}
      <div className="flex flex-col gap-4 sm:hidden">
        <CardPortrait
          dataCategories={dataCategories}
          urlFragment={urlFragment}
        />
      </div>
    </div>
  );
}

function CardLandscape({ dataCategories, urlFragment }) {
  return (
    <div className="z-10 w-full grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4 mb-8 place-items-center">
      {dataCategories && dataCategories.length > 0 ? (
        dataCategories.map((category, index) => (
          <div key={index} className="z-20 w-full max-w-2xl">
            <FirstCategory
              category={category}
              urlFragment={urlFragment}
              word={words[index]}
              color={colors[index]}
            />
          </div>
        ))
      ) : (
        <div className="col-span-full flex justify-center items-center">
          <MessageComponent
            message="Aún no tenemos las categorías"
            type="error"
          />
        </div>
      )}
    </div>
  );
}

function CardPortrait({ dataCategories, urlFragment }) {
  return (
    <div className="z-10 w-full flex flex-col gap-4 items-center justify-center">
      {dataCategories && dataCategories.length > 0 ? (
        dataCategories.map((category, index) => (
          <div key={index} className="z-20 w-full max-w-2xl">
            <CardCategoryPortrait
              category={category}
              urlFragment={urlFragment}
              word={words[index]}
              color={colors[index]}
            />
          </div>
        ))
      ) : (
        <div className="col-span-full flex justify-center items-center">
          <MessageComponent
            message="Aún no tenemos las categorías"
            type="error"
          />
        </div>
      )}
    </div>
  );
}
