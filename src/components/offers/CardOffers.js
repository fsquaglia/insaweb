export default function CardOffers({
  idOffer,
  idProduct,
  image,
  name,
  price,
  priceOffer,
}) {
  return (
    <div>
      <div className=" max-w-sm min-w-[300px] bg-white shadow-md rounded-3xl p-2 my-3 mx-2 cursor-pointer">
        <div className="overflow-x-hidden rounded-2xl">
          <img
            className="h-40 rounded-2xl w-full object-cover"
            src={
              image
                ? image
                : "https://pixahive.com/wp-content/uploads/2020/10/Gym-shoes-153180-pixahive.jpg"
            }
            alt={`Oferta producto ${idOffer}`}
          />
        </div>
        {/*sigue div Name y precio */}
        <div className="bg-gradient-to-b from-transparent to-red-500 opacity-80 mt-4 pl-2 mb-2 flex justify-center border">
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900 mb-0">
              {name || "Producto oferta"}
            </p>
            <div className="flex justify-around">
              <p className="text-md text-gray-500 mt-0">
                {price ? `$${price}` : "$0.00"}
              </p>
              <p className="text-md text-gray-800 mt-0">
                {priceOffer ? `$${priceOffer}` : "$0.00"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
