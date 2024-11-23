import MessageComponent from "@/ui/MessageComponent";
import FirstPicture from "@/components/categories/FirstPicture";
import SecondPicture from "@/components/categories/SecondPicture";
import FirstCategory from "@/components/categories/FirstCategory";
import SecondCategory from "@/components/categories/SecondCategory";
import ThirdCategory from "@/components/categories/ThirdCategory";

export default async function PageCategories() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const urlFragment = `${apiUrl}/product-category`;

  let dataCategories = [];
  try {
    const response = await fetch(`${apiUrl}/api/categories/categories`);
    dataCategories = await response.json();
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
    <div
      className="bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/images%2FbgGrayAbstractCategories.jpg?alt=media&token=b8283055-84a5-4555-bf06-4a072b3c3cb5')`,
      }}
    >
      <div className="xl:container py-8 antialiased">
        {/*contenedor de la grilla */}
        <div className="max-w-3xl flex flex-col justify-center mx-auto lg:max-w-full  lg:grid grid-rows-6 grid-cols-2 gap-16">
          {/*Primer categoría */}
          {dataCategories.length > 0 && (
            <FirstCategory
              category={dataCategories[0]}
              urlFragment={urlFragment}
            />
          )}

          <div className="col-start-2 row-start-2 row-span-2 drop-shadow-lg">
            <FirstPicture />
          </div>

          {/*Segunda categoría */}
          {dataCategories.length > 1 && (
            <SecondCategory
              category={dataCategories[1]}
              urlFragment={urlFragment}
            />
          )}

          <div className="col-start-2 row-start-4 row-span-2 drop-shadow-lg">
            <SecondPicture />
          </div>

          {/*Tercera categoría */}
          {dataCategories.length > 2 && (
            <ThirdCategory
              category={dataCategories[2]}
              urlFragment={urlFragment}
            />
          )}
        </div>
      </div>
    </div>
  );
}
