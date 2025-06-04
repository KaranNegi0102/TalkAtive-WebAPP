"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/app/hooks/hooks";
import { useAppDispatch } from "@/app/hooks/hooks";
import { logout, fetchUserData } from "@/app/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useSocket } from "@/app/socketProvider/socketProvider";
import axios from "axios";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoggedIn, userData } = useAppSelector((state: any) => state.auth);
  const { socket } = useSocket();

  // console.log("in navbarr ki bakchodi", isLoggedIn);

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

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  async function handleLogout() {
    try {
      const response = await axios.get("/api/auth/logout", {
        withCredentials: true,
      });
      if (response.data.success) {
        console.log("user logged out successfully");
        dispatch(logout());

        if (socket && userData?.data?.userId) {
          socket.emit("user_disconnected", { userId: userData.data.userId });
          socket.disconnect();
        }
        router.push("/login");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  return (
    <nav
      className={`w-full z-50 transition-all duration-300 ${
        isHomePage
          ? "md:fixed " + (isScrolled ? " text-white " : "bg-transparent ")
          : "bg-[#333234] text-white shadow-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className={`text-2xl font-bold ${
                isHomePage ? "text-[#333234]" : "text-white"
              } hover:text-white`}
            >
              TalkAtive
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/"
              className={`${
                isHomePage ? "text-[#333234]" : "text-white"
              } hover:text-[#ddedcff5] font-medium`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`${
                isHomePage ? "text-[#333234]" : "text-white"
              } hover:text-[#ddedcff5] font-medium`}
            >
              About Us
            </Link>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className={`${
                  isHomePage ? "text-[#333234]" : "text-white"
                } hover:text-red-700 font-medium cursor-pointer`}
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`${
                    isHomePage ? "text-[#333234]" : "text-white"
                  } hover:text-[#ddedcff5] font-medium`}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={`${
                    isHomePage ? "text-[#333234]" : "text-white"
                  } hover:text-[#ddedcff5] font-medium`}
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${
                isHomePage ? "text-[#333234]" : "text-white"
              } hover:text-gray-300 focus:outline-none`}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${
            isMobileMenuOpen ? "block" : "hidden"
          } transition-all duration-300 ease-in-out`}
        >
          <div className="px-2 ">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isHomePage ? "text-[#333234] text-xs" : "text-white"
              } hover:bg-gray-700 hover:text-white`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isHomePage ? "text-[#333234] text-xs" : "text-white"
              } hover:bg-gray-700 hover:text-white`}
            >
              About Us
            </Link>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  isHomePage ? "text-[#333234] text-xs" : "text-white"
                } hover:bg-gray-700 hover:text-red-700`}
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isHomePage ? "text-[#333234] text-xs" : "text-white"
                  } hover:bg-gray-700 hover:text-white`}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isHomePage ? "text-[#333234] text-xs" : "text-white"
                  } hover:bg-gray-700 hover:text-white`}
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
