export default function CardOffers({
  idOffer,
  idProduct,
  image,
  name,
  price,
  priceOffer,
}) {
  return (
    <div className=" max-w-sm min-w-[350px] bg-white shadow-md p-2 my-3 mx-2 cursor-pointer overflow-hidden">
      <div
        className=" relative h-[350px] w-full bg-cover bg-center "
        style={{
          backgroundImage: `url(${
            image
              ? image
              : "https://pixahive.com/wp-content/uploads/2020/10/Gym-shoes-153180-pixahive.jpg"
          })`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-800 opacity-80"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-4 text-center ">
          <p className="text-lg font-semibold text-gray-100 mb-0">
            {name || "Producto oferta"}
          </p>
          <div className="flex justify-around">
            <p className="line-through text-md text-gray-100 mt-0">
              {price ? `$${price}` : "$0.00"}
            </p>
            <p className="text-md text-gray-100 mt-0">
              {priceOffer ? `$${priceOffer}` : "$0.00"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
