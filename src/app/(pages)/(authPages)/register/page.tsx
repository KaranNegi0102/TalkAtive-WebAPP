"use client";

import React from "react";
import Navbar from "@/components/navbar";
import { useForm } from "react-hook-form";
import Link from "next/link";
import axios from "axios";
import image from "../../../../../public/coffee.jpg";

type RegisterFormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    // console.log(data);
    try {
      const response = await axios.post("/api/auth/register", data);

      // console.log("response in register page --> ", response);

      if (response.data.success) {
        console.log("User registered successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50 flex flex-col "
      style={{
        backgroundImage: `url(${image.src})`,
        backgroundSize: "cover",
      }}
    >
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md p-6 sm:p-9 rounded-xl shadow-xl space-y-8 sm:space-y-8 relative bg-white/90 backdrop-blur-sm">
          <div>
            <h2 className="text-center text-3xl sm:text-3xl font-bold tracking-tight text-[#333234]">
              Create your account
            </h2>
            <p className="text-center underline text-md sm:text-sm italic mt-2 text-[#333234]">
              Join us today
            </p>
          </div>

          <form
            className="mt-6 sm:mt-8 space-y-4 sm:space-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-4 sm:space-y-7 rounded-md">
              <div>
                <label
                  htmlFor="name"
                  className="block text-md ml-2 sm:text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="mt-1 sm:mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-md sm:text-base text-gray-900 placeholder-gray-500 focus:border-[#333234] focus:outline-none focus:ring-[#333234]"
                  placeholder="Enter your full name"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />
                {errors.name && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-md ml-2 sm:text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  className="mt-1 sm:mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-md sm:text-base text-gray-900 placeholder-gray-500 focus:border-[#333234] focus:outline-none focus:ring-[#333234]"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-md ml-2 sm:text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="text"
                  className="mt-1 sm:mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-md sm:text-base text-gray-900 placeholder-gray-500 focus:border-[#333234] focus:outline-none focus:ring-[#333234]"
                  placeholder="Enter your phone number"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-md ml-2 sm:text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="mt-1 sm:mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-md sm:text-base text-gray-900 placeholder-gray-500 focus:border-[#333234] focus:outline-none focus:ring-[#333234]"
                  placeholder="Create a password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-md ml-2 sm:text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  className="mt-1 sm:mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-md sm:text-base text-gray-900 placeholder-gray-500 focus:border-[#333234] focus:outline-none focus:ring-[#333234]"
                  placeholder="Confirm your password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="text-center mt-6 mb-6">
              <p className="text-md sm:text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-md sm:text-sm text-[#333234] hover:text-black hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex text-xl italic sm:text-sm w-full justify-center rounded-md border border-transparent bg-[#333234] px-4 py-2 font-medium text-white hover:bg-black cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#333234] focus:ring-offset-2 transition-colors duration-200"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
