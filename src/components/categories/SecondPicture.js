import React from "react";
import { pinyonScript } from "@/ui/fonts";

function SecondPicture() {
  return (
    <div className="h-[480px] bg-gradient-to-b from-green-100 via-green-200 to-green-100 flex items-center justify-center p-8 border border-green-300 shadow-inner">
      <div className="flex flex-col justify-center items-center text-green-800 antialiased text-center">
        <div className="my-8 p-6 border border-green-400 bg-green-50">
          <div className="text-5xl font-light font-serif uppercase tracking-wide">
            <p>Greatest</p>
            <p>Moments</p>
          </div>
          <div className={`${pinyonScript.className} text-5xl mt-4`}>
            <p>Feel</p>
            <p>Unique</p>
          </div>
        </div>
        <p className="text-lg my-4 underline underline-offset-4 decoration-2 tracking-wider font-mono uppercase">
          Good Vibes
        </p>
      </div>
    </div>
  );
}

export default SecondPicture;
