"use client";

import React from "react";
import Navbar from "@/components/navbar";
import { useForm } from "react-hook-form";
import Link from "next/link";
import axios from "axios";
import { useSocket } from "@/app/socketProvider/socketProvider";
import { useRouter } from "next/navigation";
import image from "../../../../../public/coffee.jpg";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { socket } = useSocket();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post("/api/auth/login", data);

      console.log("this is response in login page", response);

      if (response.data.success) {
        const userData = response.data.data.userData;
        console.log("this is userId", userData.userId);

        // Emit user connected event to socket server
        if (socket) {
          socket.emit("user_connected", { userId: userData.userId });
          console.log("Socket connected for user:", userData.userId);
        }

        // Redirect to home page or dashboard
        router.push("/chattingPage");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50 "
      style={{
        backgroundImage: `url(${image.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Navbar />

      <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full p-9 max-w-md  rounded-md shadow-xl space-y-8 relative bg-white/90 backdrop-blur-sm">
          <div>
            <h2 className="text-center text-3xl font-bold tracking-tight text-[#333234]">
              Welcome Back Amigos !!
            </h2>
            <p className="text-center text-sm italic mt-2 text-[#333234]">login to your account </p>
          </div>

          <form className="mt-8 space-y-5 " onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-7 rounded-md">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  className="mt-2 block w-full  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#333234] focus:outline-none focus:ring-[#333234] sm:text-sm"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is Required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-medium text-[#333234] hover:text-black hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#333234] px-4 py-2 text-sm font-medium text-white hover:bg-black cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
