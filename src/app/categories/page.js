import React from "react";

const formatDiv = "border-4 border-slate-100 p-2 h-60";

export default function PageCategories({ categories }) {
  return (
    <div className="container my-8">
      page categorias
      <div className={`flex flex-col justify-center items-center`}>
        {/*imagen apaisada principal */}
        <div
          className={`flex flex-row flex-wrap h-[420px] w-full border-4 border-slate-100 p-2`}
        >
          <div className="bg-neutral-100 w-2/3 h-full"></div>
          {/*textos */}
          <div className="bg-gradient-to-b from-neutral-500 from-30% via-neutral-400 via-50% to-neutral-500 to-80% w-1/3 h-full flex items-center justify-center">
            <div className="flex flex-col justify-center items-center text-slate-100 antialiased text-center">
              <div className="my-8">
                <div className="text-6xl font-light font-serif uppercase">
                  <p>Titulo</p>
                  <p>Titulo</p>
                </div>
                <p>texto1</p>
                <p>texto2</p>
              </div>
              <p className="text-xl my-4 underline underline-offset-8 decoration-2 tracking-wider font-mono">
                DRESS UP
              </p>
            </div>
          </div>
        </div>
        {/*segunda linea horizontal */}
        <div className="flex flex-row flex-wrap w-full">
          <div className={`w-1/3 ${formatDiv}`}></div>
          <div className={`w-1/3 ${formatDiv}`}></div>
          <div className={`w-1/3 ${formatDiv}`}></div>
        </div>
        {/*tercera linea horizontal */}
        <div className="flex flex-row flex-wrap w-full">
          <div className={`w-2/5 ${formatDiv}`}></div>
          <div className={`w-2/5 ${formatDiv}`}></div>
          <div className={`w-1/5 ${formatDiv}`}></div>
        </div>
      </div>
    </div>
  );
}
