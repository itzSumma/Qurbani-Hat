import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata = {
  title: "QurbaniHat",
  description: "Livestock Booking Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${outfit.className} min-h-full flex flex-col bg-gray-900 text-white antialiased`}
      >

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}
