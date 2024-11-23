"use client";

import React, { useState } from "react";

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState("privacyPolicy");

  return (
    <div className="bg-[#F5F7FA] min-h-screen flex flex-col md:flex-row">
      {/* Sidebar Menu */}
      <div className="w-full max-w-[348px] md:w-1/4 bg-white p-6 border-r border-gray-200 shadow-sm">
        <nav className="space-y-4 sticky top-6">
          <button
            className={`w-full text-left px-6 py-3 rounded-lg font-medium text-lg transition-all duration-200 hover:bg-gray-50 ${
              activeSection === "privacyPolicy"
                ? "text-blue-600 bg-blue-50 border-l-4 border-blue-500"
                : "text-gray-700"
            }`}
            onClick={() => setActiveSection("privacyPolicy")}
          >
            Privacy Policy
          </button>
          <button
            className={`w-full text-left px-6 py-3 rounded-lg font-medium text-lg transition-all duration-200 hover:bg-gray-50 ${
              activeSection === "terms"
                ? "text-blue-600 bg-blue-50 border-l-4 border-blue-500"
                : "text-gray-700"
            }`}
            onClick={() => setActiveSection("terms")}
          >
            Terms and Conditions
          </button>
        </nav>
      </div>

      {/* Content Area */}
      <main className="flex-1 p-8 bg-[#EFF3F8]">
        <div className="max-w-4xl mx-auto">
          {/* Privacy Policy Section */}
          {activeSection === "privacyPolicy" && (
            <section
              className="bg-white p-8 rounded-xl shadow-lg transition-all duration-300 transform translate-y-0"
              key="privacyPolicy"
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Privacy Policy
              </h1>
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. At earum officiis
                animi libero quo consectetur minima distinctio exercitationem iste
                totam veniam fugiat harum saepe, voluptate laborum facilis nostrum
                quia veritatis.
              </p>
            </section>
          )}

          {/* Terms & Conditions Section */}
          {activeSection === "terms" && (
            <section
              className="bg-white p-8 rounded-xl shadow-lg transition-all duration-300 transform translate-y-0"
              key="terms"
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Terms & Conditions
              </h1>
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Nisi,
                perspiciatis. Repudiandae est vel tenetur error illum nihil optio,
                numquam praesentium commodi dolorum ducimus fugiat! Eum, est. Vitae
                optio natus adipisci.
              </p>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default Sidebar;
