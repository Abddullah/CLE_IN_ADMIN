import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const LanguageDropdown: React.FC = () => {
  const router = useRouter();
  
  // Track the selected language in the state
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  // This effect ensures the language is initialized properly on page load
  useEffect(() => {
    // Get the language from the current URL
    const currentLang = window.location.pathname.split('/')[1] || 'en';
    setSelectedLanguage(currentLang);
  }, []);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const language = event.target.value;
    setSelectedLanguage(language);

 
    const path = language === 'en' ? '/en/settings' : `/${language}/settings`;
    console.log(path);
    router.push(path);
  };

  return (
   <div className="relative w-full max-w-xs">
  <select
    value={selectedLanguage}
    onChange={handleLanguageChange}
    className="w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00BFFF] focus:border-[#00BFFF] hover:border-[#00BFFF]transition-all duration-200"
  >
    <option value="en" className="py-2">English</option>
    <option value="it" className="py-2">Italian</option>
  </select>
  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
    <svg
      className="w-5 h-5 text-gray-400"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  </div>
</div>

  );
};

export default LanguageDropdown;
