"use client";
import Navbar from "@/components/navbar";
import Link from "next/link";
import Footer from "@/components/footer";
import image2 from "../../public/front2.jpg";
import { useAppSelector } from "@/app/hooks/hooks";

export default function Home() {
  const { isLoggedIn } = useAppSelector((state: any) => state.auth);

  return (
    <div>
      <Navbar />

      {/* Video Hero Section */}
      <div className="relative w-full h-screen hidden md:block">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/video2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Content Overlay */}
        <div className="absolute inset-0">
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-5xl text-shadow-[2px_2px_0_rgb(0,0,0)] md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Welcome to TalkAtive
            </h1>
            <p className="text-xl md:text-2xl  text-gray-800 max-w-2xl mb-8 animate-fade-in-delay">
              Experience seamless video calls and real-time chat in one place
            </p>
            <div className="flex gap-4 animate-fade-in-delay-2">
              {isLoggedIn ? (
                <Link
                  href="/chattingPage"
                  className="px-8 py-3 bg-[#333234] text-white rounded-md font-semibold hover:text-black hover:bg-gray-200 transition-colors"
                >
                  Start Chatting
                </Link>
              ) : (
                <>
                  <Link
                    href="/register"
                    className="px-8 py-3 bg-[#333234] text-white rounded-full font-semibold hover:bg-gray-200 hover:text-black transition-colors"
                  >
                    Get Started
                  </Link>
                  <Link
                    href="/login"
                    className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-colors"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl bg-[#f7f7f7] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 pt-20 md:pt-27 relative min-h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: `url(${image2.src})`,
            backgroundPosition: "top",
            backgroundSize: "cover",
          }}
        />
        <div className="relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-16 md:mb-24">
            <h1 className="text-3xl md:text-5xl font-bold text-[#333234] mb-4 md:mb-6">
              Connect and Chat in Real-Time
            </h1>
            <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8 px-4 md:px-0">
              TalkAtive is the ultimate platform for seamless, real-time
              communication. Join now and start chatting with friends, family,
              and colleagues.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:space-x-4 sm:hidden">
              {isLoggedIn ? (
                <Link
                  href="/chattingPage"
                  className="bg-[#333234] hover:bg-black text-white font-semibold py-2 md:py-3 px-4 sm:px-6 rounded-lg shadow-md transition duration-200 text-sm md:text-base w-[140px] sm:w-auto text-center"
                >
                  Start Chatting
                </Link>
              ) : (
                <>
                  <Link
                    href="/chattingPage"
                    className="bg-[#333234] hover:bg-black text-white font-semibold py-2 md:py-3 px-4 sm:px-6 rounded-lg shadow-md transition duration-200 text-sm md:text-base w-[140px] sm:w-auto text-center"
                  >
                    Get Started
                  </Link>
                  <Link
                    href="/login"
                    className="border border-[#333234] text-[#333234] hover:bg-blue-50 font-semibold py-2 md:py-3 px-4 sm:px-6 rounded-lg transition duration-200 text-sm md:text-base w-[140px] sm:w-auto text-center"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-transparent p-6 md:p-8 ">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#333234] mb-8 md:mb-12">
              Why Choose TalkAtive?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Feature 1 */}
              <div className="text-center p-4">
                <div className="bg-[#333234] rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  Real-Time Messaging
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  Instantly send and receive messages with friends and
                  colleagues.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="text-center p-4">
                <div className="bg-[#333234] rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  Easy to Use
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  A simple and intuitive interface designed for everyone.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="text-center p-4">
                <div className="bg-[#333234] rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  Secure & Reliable
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  Your data is safe with our advanced security features.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
