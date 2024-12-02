// "use client";

// import React, { useState } from "react";
// import {useTranslations} from 'next-intl';
// import LanguageDropdown from "../components/LanguageDropdown";

// const Sidebar = () => {
//   const t = useTranslations('Settings');
//   const [activeSection, setActiveSection] = useState("privacyPolicy");

//   return (
//     <div className="bg-[#F5F7FA] min-h-screen flex flex-col md:flex-row">
//       {/* Sidebar Menu */}
//       <div className="w-full max-w-[348px] md:w-1/4 bg-white p-6 border-r border-gray-200 shadow-sm">
//         <nav className="space-y-4 sticky top-6">
//           <button
//             className={`w-full text-left px-6 py-3 rounded-lg font-medium text-lg transition-all duration-200 hover:bg-gray-50 ${
//               activeSection === "privacyPolicy"
//                 ? "text-blue-600 bg-blue-50 border-l-4 border-blue-500"
//                 : "text-gray-700"
//             }`}
//             onClick={() => setActiveSection("privacyPolicy")}
//           >
//             {(t('privacy_policy'))}
//           </button>
//           <button
//             className={`w-full text-left px-6 py-3 rounded-lg font-medium text-lg transition-all duration-200 hover:bg-gray-50 ${
//               activeSection === "terms"
//                 ? "text-blue-600 bg-blue-50 border-l-4 border-blue-500"
//                 : "text-gray-700"
//             }`}
//             onClick={() => setActiveSection("terms")}
//           >
//             {(t('terms_and_conditions'))}
//           </button>
//         </nav>
//       </div>

//       {/* Content Area */}
//       <main className="flex-1 p-8 bg-[#EFF3F8]">
//         <div className="max-w-4xl mx-auto">
//           {/* Privacy Policy Section */}
//           {activeSection === "privacyPolicy" && (
//             <section
//               className="bg-white p-8 rounded-xl shadow-lg transition-all duration-300 transform translate-y-0"
//               key="privacyPolicy"
//             >
//               <h1 className="text-3xl font-bold text-gray-900 mb-6">
//               {(t('privacy_policy'))}
//               </h1>
//               <p className="text-gray-600 leading-relaxed">
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
//                 eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
//                 ipsum dolor sit amet consectetur adipisicing elit. At earum officiis
//                 animi libero quo consectetur minima distinctio exercitationem iste
//                 totam veniam fugiat harum saepe, voluptate laborum facilis nostrum
//                 quia veritatis.
//               </p>
//             </section>
//           )}

//           {/* Terms & Conditions Section */}
//           {activeSection === "terms" && (
//             <section
//               className="bg-white p-8 rounded-xl shadow-lg transition-all duration-300 transform translate-y-0"
//               key="terms"
//             >
//               <h1 className="text-3xl font-bold text-gray-900 mb-6">
//               {(t('terms_and_conditions'))}
//               </h1>
//               <p className="text-gray-600 leading-relaxed">
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
//                 eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
//                 ipsum dolor sit amet consectetur adipisicing elit. Nisi,
//                 perspiciatis. Repudiandae est vel tenetur error illum nihil optio,
//                 numquam praesentium commodi dolorum ducimus fugiat! Eum, est. Vitae
//                 optio natus adipisci.
//               </p>
//             </section>
//           )}
//         </div>
//       </main>
//       <div className="container mx-auto p-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-semibold text-gray-800">Select Language</h2>
//         <div className="w-40">
//           <LanguageDropdown />
//         </div>
//       </div>
//       <p className="text-sm text-gray-500 mt-2">Choose your preferred language to continue.</p>
//     </div>
//     </div>
//   );
// };

// export default Sidebar;

































"use client";

import React, { useState } from "react";
import { useTranslations } from 'next-intl';
import LanguageDropdown from "../components/LanguageDropdown";

const Sidebar = () => {
  const t = useTranslations('Settings');
  const [activeSection, setActiveSection] = useState("privacyPolicy");

  return (
    <div className="bg-[#F5F7FA] min-h-screen flex flex-col md:flex-row">
      {/* Sidebar Menu */}
      <div className="w-full max-w-[348px] md:w-1/4 bg-white p-6 border-r border-gray-200 shadow-lg">
        <nav className="space-y-6 sticky top-6">
          <button
            className={`w-full text-left px-6 py-3 rounded-lg font-medium text-lg transition-all duration-200 hover:bg-gray-50 focus:outline-none ${
              activeSection === "privacyPolicy"
                ? "text-[#00BFFF] bg-blue-50 border-l-4 border-[#00BFFF]"
                : "text-gray-700"
            }`}
            onClick={() => setActiveSection("privacyPolicy")}
          >
            {t('privacy_policy')}
          </button>
          <button
            className={`w-full text-left px-6 py-3 rounded-lg font-medium text-lg transition-all duration-200 hover:bg-gray-50 focus:outline-none ${
              activeSection === "terms"
                ? "text-[#00BFFF] bg-blue-50 border-l-4 border-[#00BFFF]"
                : "text-gray-700"
            }`}
            onClick={() => setActiveSection("terms")}
          >
            {t('terms_and_conditions')}
          </button>
          {/* Language Section Link */}
          <button
            className={`w-full text-left px-6 py-3 rounded-lg font-medium text-lg transition-all duration-200 hover:bg-gray-50 focus:outline-none ${
              activeSection === "language"
                ? "text-[#00BFFF] bg-blue-50 border-l-4 border-[#00BFFF]"
                : "text-gray-700"
            }`}
            onClick={() => setActiveSection("language")}
          >
            {t('select_language')}
          </button>
        </nav>
      </div>

      {/* Content Area */}
      <main className="flex-1 p-8 bg-[#EFF3F8]">
        <div className="max-w-4xl mx-auto">
          {/* Privacy Policy Section */}
          {activeSection === "privacyPolicy" && (
            <section
              className="bg-white p-8 rounded-xl shadow-lg transition-all duration-300"
              key="privacyPolicy"
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                {t('privacy_policy')}
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
              className="bg-white p-8 rounded-xl shadow-lg transition-all duration-300"
              key="terms"
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                {t('terms_and_conditions')}
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

          {/* Language Section */}
          {activeSection === "language" && (
            <section
              className="bg-white p-8 rounded-xl shadow-lg transition-all duration-300"
              key="language"
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                {t('select_language')}
              </h1>
              <p className="text-gray-600 mb-4">{t('choose_language_description')}</p>
              <div className="w-40">
                <LanguageDropdown />
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default Sidebar;
