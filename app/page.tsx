// import React from "react";
// import Image from "next/image";
// import Link from "next/link";

// export default function Login() {
//   return (
//     <div className="flex items-center justify-center min-h-screen px-4 sm:px-0">
//       <div className="absolute inset-0 bg-opacity-50 z-0"></div>

//       <div className="relative w-full max-w-md p-8 space-y-6 bg-white bg-opacity-90 rounded-3xl shadow-2xl z-10 border-2 border-[#00BFFF] sm:p-10">
//         <div className="flex items-center justify-center mb-6">
//           <Image
//             src="/assets/Logo.png"
//             alt="Company Logo"
//             width={70}
//             height={70}
//             className="object-contain"
//           />
//         </div>

//         <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-800">
//           Admin Login
//         </h2>
//         <p className="text-center text-gray-600">
//           Please Enter Your Credentials
//         </p>

//         <form className="space-y-6">
//           <div className="flex flex-col space-y-1">
//             <label className="text-sm font-medium text-gray-700">
//               Email Address
//             </label>
//             <input
//               type="email"
//               className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BFFF] transition duration-300"
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           <div className="flex flex-col space-y-1">
//             <label className="text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BFFF] transition duration-300"
//               placeholder="Enter your password"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-3 text-white bg-[#00BFFF] rounded-lg shadow-lg hover:bg-[#00A4D3] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-100 transform hover:scale-100 font-semibold"
//             >
//           <Link href={"/dashboard"}>
//             Log In
//             </Link>
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


































import React from "react";
import Image from "next/image";
import Link from "next/link";

const LoginScreen = () => {
  return (
    <div className="min-h-screen flex bg-[#00BFFF]">
      {/* Left Section - Welcome Admin (Visible only on larger screens) */}
      <div className="hidden md:flex w-1/2 flex-col justify-center items-center text-white p-10">
        <h1 className="text-5xl font-extrabold mb-4">Welcome Admin</h1>
        <p className="text-xl font-medium mb-6">
          Manage your platform with ease and security.
        </p>
        <Image
          src="/assets/security-log.gif"
          alt="Company Logo"
          width={200}
          height={120}
          className="object-contain"
        />
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white px-2 py-10 sm:px-10">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-lg border border-gray-400 p-8 sm:p-12">
          {/* Logo at the top of the form */}
          <div className="flex justify-center mb-6">
            <Image
              src="/assets/Logo.png"
              alt="Company Logo"
              width={70}
              height={70}
              className="object-contain"
            />
          </div>

          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-4">
            Admin Login
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Please enter your credentials
          </p>
          
          <form className="space-y-6">
            {/* Email Input */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BFFF] transition duration-300"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BFFF] transition duration-300"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Login Button */}
            <Link href="/dashboard">
            <button
              type="submit"
              className="w-full py-3 text-white bg-[#00BFFF] rounded-lg shadow-lg hover:bg-[#00A4D3] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 transform hover:scale-105 font-semibold"
            >
             
                Log In
            </button>
              </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
