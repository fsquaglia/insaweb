"use client";
import { links } from "@/utils/linksDashboard";
import { usePathname } from "next/navigation";

export default function HeaderDashboard() {
  const pathname = usePathname();
  const head = links.find((link) => link.href === pathname);

  return (
    <div className="flex flex-col w-full my-2">
      <h2 className="font-sans underline leading-tight text-blue-600 leading-relaxed antialiased text-2xl font-semibold my-2">
        {head ? head.head?.title : "?"}
      </h2>
      <div className="container">
        <p className="text-sm w-full md:w-3/4 my-2 mx-auto">
          {head ? head.head?.description : "?"}
        </p>
      </div>
    </div>
  );
}
