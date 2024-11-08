"use client";

import React, { useState } from "react";
import MessageInterface from "../components/settingsComponents/MessageInterface";


const Sidebar = () => {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [termCondition, setTermCondition] = useState(false);
  const [showMessageWindow, setShowMessageWindow] = useState(true);

  return (
    <>
   
    <div className="bg-[#F5F7FA] min-h-screen w-full flex flex-col md:flex-row pt-2">
      <div className="w-[348px] mx-auto mt-6 border md:w-[30%] bg-white p-4 md:p-6 px-4 sm:px-6 flex flex-col justify-start shadow-md md:shadow-none lg:ml-4">
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

      <div className="w-full md:w-[70%] p-4 md:p-6 flex flex-col md:flex-row justify-start">
        <div
          className={`w-full md:w-[90%] bg-white p-4 md:p-6 px-6 md:px-10 border mt-4 md:mt-0 md:ml-4 transition-all duration-500 ${
            showPrivacyPolicy ? "block" : "hidden"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div
          className={`w-full md:w-[90%] bg-white p-4 md:p-6 px-6 md:px-10 border mt-4 md:mt-0 md:ml-4 transition-all duration-500 ${
            termCondition ? "block" : "hidden"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-4">Terms & Conditions</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div
          className={`w-full md:w-[90%] bg-white p-4 md:p-3 px-6 md:px-5 border md:mt-0 md:ml-8 transition-all duration-500 lg:h-full lg:mb-8 ${
            showMessageWindow ? "block" : "hidden"
          }`}
        >
          <MessageInterface />
        </div>
      </div>
    </div>
    </>
  );
};

export default Sidebar;
