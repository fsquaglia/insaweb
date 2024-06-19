import CardOffers from "./CardOffers";
import HeaderTitle from "../../ui/HeaderTitle.js";

export default function Offers() {
  return (
    <div className="flex flex-col text-center justify-center bg-gray-100">
      <div className="h-24"></div>
      <div className="my-6">
        <HeaderTitle titleText={"Nuestras mejores ofertas"} />
      </div>

      <div className="container flex justify-center bg-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
          <CardOffers />
          <CardOffers />
          <CardOffers />
          <CardOffers />
        </div>
      </div>
    </div>
  );
}
