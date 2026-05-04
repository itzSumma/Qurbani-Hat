import "./globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "QurbaniHat",
  description: "Livestock Booking Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col bg-gray-950 text-white antialiased">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
            {children}
          </main>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </AuthProvider>
      </body>
    </html>
  );
}
