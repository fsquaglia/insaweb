import React from "react";
import { pinyonScript } from "@/ui/fonts";

function FirstPicture() {
  return (
    <div className="h-[480px] bg-gradient-to-b from-neutral-500 from-30% via-neutral-400 via-50% to-neutral-500 to-80% flex items-center justify-center">
      <div className="flex flex-col justify-center items-center text-slate-100 antialiased text-center">
        <div className="my-8">
          <div className="text-6xl font-light font-serif uppercase">
            <p>Beautiful</p>
            <p>Love</p>
          </div>
          <div className={`${pinyonScript.className} text-6xl`}>
            <p>Wonderful</p>
            <p>Life</p>
          </div>
        </div>
        <p className="text-xl my-4 underline underline-offset-8 decoration-2 tracking-wider font-mono">
          DRESS UP
        </p>
      </div>
    </div>
  );
}

export default FirstPicture;
