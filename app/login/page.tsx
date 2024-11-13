import React from "react";
import Image from "next/image";
import logo from "../../assets/Logo.png";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="absolute inset-0 bg-grey bg-opacity-50 z-0"></div>

      <div className="relative w-full border-4 border-grey max-w-md p-8 space-y-6 bg-white bg-opacity-20 rounded-2xl shadow-2xl z-10">
        <div className="flex items-center justify-center mb-6">
          <Image
            src={logo}
            alt="Company Logo"
            width={70}
            height={70}
            className="object-contain"
          />
        </div>

        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Admin Login
        </h2>
        <p className="text-center text-gray-600">
          Please Enter Your Credentials
        </p>

        <form className="space-y-6">
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BFFF] transition duration-300"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BFFF] transition duration-300"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full font-semibold py-3 text-white bg-[#00BFFF] rounded-lg shadow-lg hover:bg-[#00A4D3] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 transform hover:scale-105"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
