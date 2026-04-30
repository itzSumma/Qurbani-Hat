import Link from "next/link";
import { LogoFacebook } from "@gravity-ui/icons";
import { FaInstagram, FaYoutube } from "react-icons/fa";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: <LogoFacebook className="h-4 w-4" />,
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: <FaInstagram className="h-4 w-4" />,
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: <FaYoutube className="h-4 w-4" />,
  },
];

const Footer = () => {
  return (
    <footer className="mt-12 border-t border-[#1f2937] bg-[#0b1220] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Qurbani<span className="text-[#10b981]">Hat</span>
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-400">
              A modern livestock booking platform for families who want a simple
              and trusted way to explore cows and goats for Qurbani.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">About</h3>

            <p className="text-sm leading-7 text-slate-400">
              We connect buyers with reliable farms, clear animal details, and
              a smooth booking journey before Eid-ul-Adha.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">Quick Links</h3>

            <div className="flex flex-col gap-3 text-sm">
              <Link href="/" className="transition hover:text-[#10b981]">
                Home
              </Link>
              <Link href="/animals" className="transition hover:text-[#10b981]">
                All Animals
              </Link>
              <Link href="/login" className="transition hover:text-[#10b981]">
                Login
              </Link>
              <Link href="/register" className="transition hover:text-[#10b981]">
                Register
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">Contact</h3>

            <div className="space-y-2 text-sm text-slate-400">
              <p>Location: Naogaon, Bangladesh</p>
              <p>Email: support@qurbanihat.com</p>
              <p>Phone: +880 1874-760967</p>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-[#10b981] hover:bg-[#10b981]/10 hover:text-[#10b981]"
                >
                  {link.icon}
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-1 border-t border-[#1f2937] pt-5 text-center text-xs text-slate-500">
          <p>Copyright {new Date().getFullYear()} QurbaniHat. All rights reserved.</p>
          <p>
            Made with care by{" "}
            <span className="font-medium text-[#10b981]">Sharmin Sultana Summa</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
