"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/app/hooks/hooks";
import { useAppDispatch } from "@/app/hooks/hooks";
import { logout } from "@/app/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useSocket } from "@/app/socketProvider/socketProvider";
import axios from "axios";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoggedIn, userData } = useAppSelector((state: any) => state.auth);
  const { socket } = useSocket();

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

  async function handleLogout() {
    try {
      // First disconnect socket if connected
      if (socket && userData?.data?.userId) {
        socket.emit("user_disconnected", { userId: userData.data.userId });
        socket.disconnect();
      }

      const response = await axios.post("/api/auth/logout",
        { withCredentials: true }
      );
      if(response.data.success){
        console.log("user logged out successfully")
        dispatch(logout());
        router.push("/login");
      }

    } catch (error) {
      console.error("Error during logout:", error);
      // Still try to redirect even if there's an error
      router.push("/login");
    }
  }

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
              <button
                onClick={handleLogout}
                className="text-white hover:text-blue-600 font-medium"
              >
                Logout
              </button>
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
