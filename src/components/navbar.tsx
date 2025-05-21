"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    if (isHomePage) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isHomePage]);

  return (
    <nav
      className={`w-full z-50 transition-all duration-300 ${
        isHomePage
          ? "fixed " +
            (isScrolled
              ? "bg-white/80 backdrop-blur-md shadow-lg"
              : "bg-transparent")
          : "bg-white shadow-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-blue-600 hover:text-blue-700"
            >
              TalkAtive
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-gray-900 hover:text-blue-600 font-medium"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-gray-900 hover:text-blue-600 font-medium"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
