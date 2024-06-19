import CardTips from "./CardTips";
import { getTipsLandingFirestore } from "../../utils/firebase/fetchFirebase";
import HeaderTitle from "../../ui/HeaderTitle";

export default async function Tips() {
  const dataTips = await getTipsLandingFirestore();

  return (
    <div className="flex flex-col text-center justify-center bg-gray-50">
      <div className="h-24"></div>
      <div className="my-6">
        <HeaderTitle titleText={"Ya viste nuestros tips?"} />
      </div>

      <div className="container relative flex flex-col justify-center overflow-hidden py-2 sm:py-6">
        <div className="m-10 flex flex-col items-center justify-center mx-auto max-w-screen-lg">
          <div className="grid w-full gap-10 grid-cols-1 sm:grid-cols-3">
            {dataTips && dataTips.length > 0 ? (
              dataTips.map((tip) => (
                <CardTips
                  key={tip.id}
                  title={tip.titulo}
                  detail={tip.detalle}
                  date={tip.fecha}
                  img={tip.imagen}
                />
              ))
            ) : (
              <p>No hay tips disponibles.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
