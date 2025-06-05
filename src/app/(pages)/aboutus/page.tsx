import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* About Us Content */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About Our Platform
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We&apos;re dedicated to revolutionizing the way people connect through
              video and chat
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600">
                To create a platform that brings people together through
                high-quality video calls and real-time chat, making
                communication more personal and engaging.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600">
                To revolutionize online communication by providing a platform
                that combines cutting-edge technology with user-friendly design.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Our Values
              </h3>
              <p className="text-gray-600">
                Innovation, user experience, and security are at the core of
                everything we do. We believe in creating meaningful connections
                through technology.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Key Features
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <h4 className="font-semibold text-gray-900">
                    High-Quality Video
                  </h4>
                  <p className="text-gray-600 text-sm mt-2">
                    Crystal clear video calls
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <h4 className="font-semibold text-gray-900">
                    Real-Time Chat
                  </h4>
                  <p className="text-gray-600 text-sm mt-2">
                    Instant messaging
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <h4 className="font-semibold text-gray-900">User-Friendly</h4>
                  <p className="text-gray-600 text-sm mt-2">
                    Easy to use interface
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <h4 className="font-semibold text-gray-900">Secure</h4>
                  <p className="text-gray-600 text-sm mt-2">
                    End-to-end encryption
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
