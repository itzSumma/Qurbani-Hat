"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout, isReady } = useAuth();

  const links = [
    { name: "Home", href: "/" },
    { name: "All Animals", href: "/animals" },
    ...(user ? [{ name: "My Profile", href: "/my-profile" }] : []),
  ];

  const getLinkClass = (href) =>
    `rounded-full px-3 py-2 text-sm md:text-base transition ${
      pathname === href
        ? "bg-[#10b981] text-[#052e2b]"
        : "text-white hover:bg-[#1f2937]"
    }`;

  const closeMenu = () => setOpen(false);

  return (
    <nav className="border-b border-[#1f2937] bg-[#0f172a] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="text-xl font-bold tracking-wide md:text-2xl lg:text-3xl">
          Qurbani
          <span className="text-[#10b981]">Hat</span>
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={getLinkClass(link.href)}>
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          {!isReady ? null : user ? (
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#374151] bg-emerald-500/15 text-sm font-bold text-emerald-200">
                {(user.name || "U").slice(0, 1).toUpperCase()}
              </div>

              <button
                type="button"
                onClick={logout}
                className="rounded-full bg-red-500 px-4 py-2 text-sm transition hover:bg-red-600 md:text-base">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                href="/login"
                className="rounded-full border border-[#374151] px-4 py-2 text-sm transition hover:bg-[#1f2937] md:text-base">
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-[#10b981] px-4 py-2 text-sm text-[#052e2b] transition hover:bg-[#059669] md:text-base">
                Register
              </Link>
            </div>
          )}
        </div>

        <button
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          className="md:hidden"
          onClick={() => setOpen((prev) => !prev)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-8 w-8">
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6l12 12M18 6L6 18"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 7h16M4 12h16M4 17h16"
              />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <div className="space-y-3 border-t border-[#1f2937] px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-2 pt-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={getLinkClass(link.href)}>
                {link.name}
              </Link>
            ))}
          </div>

          <hr className="border-[#374151]" />

          {!isReady ? null : user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-2xl bg-[#111827] px-3 py-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#374151] bg-emerald-500/15 text-sm font-bold text-emerald-200">
                  {(user.name || "U").slice(0, 1).toUpperCase()}
                </div>

                <div>
                  <p className="font-semibold">
                    {user.name || "Logged in user"}
                  </p>
                  <p className="text-sm text-slate-300">
                    {user.email || "Profile active"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="w-full rounded-full bg-red-500 px-3 py-2 text-sm md:text-base">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                href="/login"
                onClick={closeMenu}
                className="rounded-full border border-[#374151] px-3 py-2 text-center text-sm hover:bg-[#1f2937] md:text-base">
                Login
              </Link>

              <Link
                href="/register"
                onClick={closeMenu}
                className="rounded-full bg-[#10b981] px-3 py-2 text-center text-sm text-[#052e2b] hover:bg-[#059669] md:text-base">
                Register
              </Link>
            </div>
          )}
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
