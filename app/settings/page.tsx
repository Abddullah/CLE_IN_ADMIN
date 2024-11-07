"use client";

import React, { useState } from "react";

const Sidebar = () => {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [termCondition, setTermCondition] = useState(false);
  const [showMessageWindow, setShowMessageWindow] = useState(true);

  const users = [
    "User 1",
    "User 2",
    "User 3",
    "User 4",
    "User 5",
    "User 6",
    "User 7",
    "User 8",
    "User 9",
    "User 10",
  ];

  return (
    <div className="bg-[#F5F7FA] min-h-screen w-full flex flex-col md:flex-row items-start justify-start p-4 md:pt-2">
      {/* Sidebar */}
      <div className="h-full md:h-screen w-full md:w-[30%] bg-white p-4 md:p-6 flex flex-col justify-start shadow-md md:shadow-none">
        <h2
          className="text-md font-semibold mb-4 cursor-pointer"
          onClick={() => {
            setShowPrivacyPolicy(true);
            setTermCondition(false);
            setShowMessageWindow(false);
          }}
        >
          Privacy Policy
        </h2>
        <h2
          className="text-md font-semibold mb-4 cursor-pointer"
          onClick={() => {
            setShowPrivacyPolicy(false);
            setTermCondition(true);
            setShowMessageWindow(false);
          }}
        >
          Terms and Conditions
        </h2>
        <h2
          className="text-md font-semibold mb-4 cursor-pointer"
          onClick={() => {
            setShowPrivacyPolicy(false);
            setTermCondition(false);
            setShowMessageWindow(true);
          }}
        >
          Message
        </h2>
      </div>

      {/* Privacy Policy Content */}
      <div
        className={`h-full md:h-screen w-full md:w-[60%] bg-white p-4 md:p-6 px-6 md:px-10 border mt-4 md:mt-0 ml-0 md:ml-4 transition-all duration-500 ${
          showPrivacyPolicy ? "block" : "hidden"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      {/* Terms & Conditions Content */}
      <div
        className={`h-full md:h-screen w-full md:w-[60%] bg-white p-4 md:p-6 px-6 md:px-10 border mt-4 md:mt-0 ml-0 md:ml-4 transition-all duration-500 ${
          termCondition ? "block" : "hidden"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-4">Terms & Conditions</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      {/* Message Window Content */}
      <div
        className={`h-full md:h-screen w-full md:w-[60%] bg-white p-4 md:p-6 px-6 md:px-10 border mt-4 md:mt-0 ml-0 md:ml-4 transition-all duration-500 ${
          showMessageWindow ? "block" : "hidden"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-4">Users List</h2>

        <div className="space-y-2">
          {users.map((user, index) => (
            <div key={index} className="p-2 bg-gray-100 rounded-md">
              <p>{user}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
