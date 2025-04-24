import CardOffers from "./CardOffers";
import HeaderTitle from "../../ui/HeaderTitle.js";
import { getOffersLandingFirestore } from "@/utils/firebase/fetchFirebase";

export default async function Offers() {
  const dataOffer = await getOffersLandingFirestore();
  console.log(dataOffer);

  return (
    <div className="flex flex-col text-center justify-center bg-gray-100 pb-10">
      <div className="h-24"></div>
      <div className="my-6">
        <HeaderTitle titleText={"Nuestras mejores ofertas"} />
      </div>

      <div className="px-10 py-4 container sm:mx-auto flex flex-wrap justify-center items-center">
        {dataOffer && dataOffer.length > 0 ? (
          dataOffer.map((offer) => (
            <CardOffers
              key={offer.id} // Agrega una clave única para cada elemento
              idOffer={offer.id || null}
              idProduct={offer.idProduct || null}
              image={offer.imagen || null}
              name={offer.nombre || null}
              price={offer.precioVenta || null}
              priceOffer={offer.precioOferta || null}
            />
          ))
        ) : (
          <p className="col-span-full text-center">
            Estamos preparando las ofertas
          </p>
        )}
      </div>
    </div>
  );
}
