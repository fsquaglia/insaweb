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

      <div className="w-full sm:container sm:mx-auto flex flex-wrap justify-center items-center py-2 sm:py-6">
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
          <p className="text-gray-800 my-20 text-center">
            Estamos preparando los tips.
          </p>
        )}
      </div>
    </div>
  );
}
