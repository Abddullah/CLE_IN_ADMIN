// "use client";

// import React, { useState } from "react";

// const Sidebar = () => {
//   const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
//   const [termCondition, setTermCondition] = useState(false);
//   const [showMessageWindow, setShowMessageWindow] = useState(true);

//   return (
//     <>
//       <div className="bg-[#F5F7FA] min-h-screen w-full flex flex-col md:flex-row pt-2">
//         <div className="w-[348px] mx-auto mt-6 border md:w-[30%] bg-white p-4 md:p-6 px-4 sm:px-6 flex flex-col justify-start shadow-md md:shadow-none lg:ml-4">
//           <h2
//             className="text-md font-semibold mb-4 cursor-pointer"
//             onClick={() => {
//               setShowPrivacyPolicy(true);
//               setTermCondition(false);
//               setShowMessageWindow(false);
//             }}
//           >
//             Privacy Policy
//           </h2>
//           <h2
//             className="text-md font-semibold mb-4 cursor-pointer"
//             onClick={() => {
//               setShowPrivacyPolicy(false);
//               setTermCondition(true);
//               setShowMessageWindow(false);
//             }}
//           >
//             Terms and Conditions
//           </h2>
//         </div>

//         <div className="w-full md:w-[100%] p-4 md:p-6 flex flex-col md:flex-row justify-start">
//           <div
//             className={`w-full md:w-[100%] bg-white p-4 md:p-6 px-6 md:px-10 border mt-4 md:mt-0 md:ml-4 transition-all duration-500 ${
//               showPrivacyPolicy ? "block" : "hidden"
//             }`}
//           >
//             <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
//             <p>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
//               eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
//               ipsum dolor sit amet consectetur adipisicing elit. At earum
//               officiis animi libero quo consectetur minima distinctio
//               exercitationem iste totam veniam fugiat harum saepe, voluptate
//               laborum facilis nostrum quia veritatis.
//             </p>
//           </div>

//           <div
//             className={`w-full md:w-[90%] bg-white p-4 md:p-6 px-6 md:px-10 border mt-4 md:mt-0 md:ml-4 transition-all duration-500 ${
//               termCondition ? "block" : "hidden"
//             }`}
//           >
//             <h2 className="text-2xl font-semibold mb-4">Terms & Conditions</h2>
//             <p>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
//               eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
//               ipsum dolor sit amet consectetur adipisicing elit. Nisi,
//               perspiciatis. Repudiandae est vel tenetur error illum nihil optio,
//               numquam praesentium commodi dolorum ducimus fugiat! Eum, est.
//               Vitae optio natus adipisci.
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;








































"use client";

import React, { useState } from "react";

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState("privacyPolicy");

  return (
    <div className="bg-[#F5F7FA] min-h-screen flex flex-col md:flex-row pt-1">
      {/* Sidebar Menu */}
      <div className="w-[348px] mx-auto mt-6  border-2  md:w-[30%] bg-white  p-4 md:p-6 flex flex-col shadow-md md:shadow-none lg:ml-4">
        <button
          className={`text-md font-semibold mb-4 text-left transition-colors duration-200 ${
            activeSection === "privacyPolicy" ? "text-[#00BFFF]" : "text-gray-800"
          }`}
          onClick={() => setActiveSection("privacyPolicy")}
        >
          Privacy Policy
        </button>
        <button
          className={`text-md font-semibold mb-4 text-left transition-colors duration-200 ${
            activeSection === "terms" ? "text-[#00BFFF]" : "text-gray-800"
          }`}
          onClick={() => setActiveSection("terms")}
        >
          Terms and Conditions
        </button>
      </div>

      {/* Content Area */}
      <div className="w-full  md:w-[100%] p-4 md:p-6 flex flex-col md:flex-row justify-start ">
        {/* Privacy Policy Section */}
        <div
          className={`w-full bg-white p-4 md:p-6 px-6 md:px-10 border shadow-sm rounded-lg transition-transform duration-500 ${
            activeSection === "privacyPolicy" ? "block" : "hidden"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
          <p className="text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. At earum officiis
            animi libero quo consectetur minima distinctio exercitationem iste
            totam veniam fugiat harum saepe, voluptate laborum facilis nostrum
            quia veritatis.
          </p>
        </div>

        {/* Terms & Conditions Section */}
        <div
          className={`w-full bg-white p-4 md:p-6 px-6 md:px-10 border shadow-sm rounded-lg transition-transform duration-500 ${
            activeSection === "terms" ? "block" : "hidden"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-4">Terms & Conditions</h2>
          <p className="text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Nisi,
            perspiciatis. Repudiandae est vel tenetur error illum nihil optio,
            numquam praesentium commodi dolorum ducimus fugiat! Eum, est. Vitae
            optio natus adipisci.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
