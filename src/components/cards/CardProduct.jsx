import React from "react";

function CardProduct({ product }) {
  return (
    <div className="container mx-auto bg-gray-100 py-10 flex justify-center">
      <div className="bg-white w-80 shadow-lg cursor-pointer rounded transform hover:scale-105 duration-300 ease-in-out">
        <div className="">
          <img
            src="https://picsum.photos/400/300"
            alt=""
            className="rounded-t"
          />
        </div>
        <div className="flex justify-around w-full transform -translate-y-5 px-4">
          <div className="rounded-full shadow w-10 h-10 flex justify-center items-center bg-gray-100">
            1
          </div>
          <div className="rounded-full shadow w-10 h-10 flex justify-center items-center bg-gray-100">
            2
          </div>
          <div className="rounded-full shadow w-10 h-10 flex justify-center items-center bg-gray-100">
            3
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-2xl uppercase">Item a</h2>
          <p className="font-light text-gray-500 text-lg my-2">29,99 &euro;</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt
          </p>
          <a
            href="#"
            className="block bg-gray-300 py-2 px-2 text-gray-600 text-center rounded shadow-lg uppercase font-light mt-6 hover:bg-gray-400 hover:text-white duration-300 ease-in-out"
          >
            Add to cart
          </a>
        </div>
      </div>
    </div>
  );
}

export default CardProduct;
