import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar/Navbar";
import Agency from "../components/agency/Agency";
import { Providers } from "./Providers";
import MessageComponent from "@/ui/MessageComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ihara y London",
  description: "Indumentaria y calzado para damas y caballeros",
};

export default async function RootLayout({ children }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  let configurations;

  try {
    const configResponse = await fetch(`${apiUrl}/api/configurations`);

    if (!configResponse.ok) throw new Error("Error al cargar la configuración");

    configurations = await configResponse.json();
  } catch (error) {
    console.error("Error en las solicitudes:", error);
    return (
      <div className="flex mx-auto my-4">
        <MessageComponent
          message="Error al cargar los datos. Intenta recargar la página."
          type={"error"}
        />
      </div>
    );
  }

  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Providers>
          <div className="bg-slate-900 text-gray-200 bg-opacity-100 md:bg-opacity-90 shadow-md fixed top-0 left-0 right-0 z-50">
            <Navbar configurations={configurations} />
          </div>
          <div className="flex-grow">{children}</div>
          {/* <Footer /> */}
          <div className="z-50">
            <Agency />
          </div>
        </Providers>
      </body>
    </html>
  );
}
