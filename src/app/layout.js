import { Inter } from "next/font/google";
import "./globals.css";
// import Navbar from "../components/navbar/Navbar";
// import Footer from "../components/footer/Footer";
import Agency from "../components/agency/Agency";
import { Providers } from "./Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ihara y London",
  description: "Indumentaria y calzado para damas y caballeros",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Providers>
          {/* <div className="bg-slate-900 text-gray-200 bg-opacity-90 shadow-md fixed top-0 left-0 right-0 z-20">
            <Navbar />
          </div> */}
          <div>{children}</div>
          {/* <Footer /> */}
          <div className="z-50 bg-green-500">
            <Agency />
          </div>
        </Providers>
      </body>
    </html>
  );
}
