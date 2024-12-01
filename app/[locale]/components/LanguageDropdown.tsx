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

    // If English is selected, navigate to the root page '/'
    const path = language === 'en' ? '/en' : `/${language}`;
    console.log(path);
    
    router.push(path);
  };

  return (
    <div>
      <select
        value={selectedLanguage} // Controlled component for the dropdown
        onChange={handleLanguageChange}
        className="bg-white border border-gray-300 text-gray-700 rounded-lg p-3 pr-8 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-all ease-in-out duration-200 hover:border-gray-400"
      >
        <option value="en">English</option>
        <option value="it">Italian</option>
      </select>
    </div>
  );
};

export default LanguageDropdown;
