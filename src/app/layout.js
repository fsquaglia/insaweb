import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Agency from "../components/agency/Agency";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ihara y London",
  description: "Indumentaria y calzado para damas y caballeros",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div className="bg-gray-100 bg-opacity-90 shadow-md fixed top-0 left-0 right-0 z-20">
          <Navbar />
        </div>
        <div>{children}</div>
        <Footer />
        <Agency />
      </body>
    </html>
  );
}
