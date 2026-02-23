"use client";

import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center justify-end text-slate-500 my-8 cursor-pointer hover:text-slate-700 transition-colors"
    >
      <IoArrowBack className="mr-2" />
      <span>Atrás</span>
    </button>
  );
}
