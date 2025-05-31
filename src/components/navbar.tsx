"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/app/hooks/hooks";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { isLoggedIn } = useAppSelector((state: any) => state.auth);

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
          : "bg-[#333234] shadow-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-white hover:text-white"
            >
              TalkAtive
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-white hover:text-blue-600 font-medium"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-white hover:text-blue-600 font-medium"
            >
              About Us
            </Link>
            {isLoggedIn ? (
              <Link
                href="/logout"
                className="text-white hover:text-blue-600 font-medium"
              >
                Logout
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-white hover:text-blue-600 font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-white hover:text-blue-600 font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
