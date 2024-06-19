import CardTips from "./CardTips";
import { getTipsLandingFirestore } from "../../utils/firebase/fetchFirebase";
import Header from "../../ui/HeaderTitle";

export default async function Tips() {
  const dataTips = await getTipsLandingFirestore();

  return (
    <div className="container  text-center">
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-2 sm:py-6">
        <div className="m-10 flex flex-col items-center justify-center mx-auto max-w-screen-lg">
          <Header titleText={"Ya viste nuestros tips?"} />
          <div className="grid w-full gap-10 grid-cols-3">
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
