"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "All Animals", href: "/animals" },
  ];

  return (
    <nav className="bg-white shadow-md">
      
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* LOGO */}
        <Link href="/" className="text-2xl font-bold text-teal-600">
          Qurbani
          <span className="text-purple-700 text-3xl font-bold">Market</span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex text-xl font-medium items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-white bg-purple-400 border border-zinc-400 px-2 py-1 rounded-lg"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* AUTH (DESKTOP) */}
        <div className="hidden md:block">
          {user ? (
            <div className="flex items-center gap-3">
              <Image
                src={user?.photo || "/avatar.png"}
                width={40}
                height={40}
                className="rounded-full"
                alt="user"
              />
              <button className="bg-red-500 text-white px-3 py-1 rounded">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link href="/login">
                <button className="border px-3 py-1 rounded">Login</button>
              </Link>

              <Link href="/register">
                <button className="bg-purple-400 text-lg font-medium px-3 py-1 rounded">
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3">

          {/* LINKS */}
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-purple-400 text-white px-3 py-2 rounded"
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <hr />

          {/* AUTH MOBILE */}
          {user ? (
            <button className="bg-red-500 text-white px-3 py-2 rounded w-full">
              Logout
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <Link href="/login">
                <button className="border px-3 py-2 rounded ">
                  Login
                </button>
              </Link>

              <Link href="/register">
                <button className="bg-purple-600 text-white px-3 py-2 rounded ">
                  Register
                </button>
              </Link>
            </div>
          )}

        </div>
      )}
    </nav>
  );
};

export default Navbar;