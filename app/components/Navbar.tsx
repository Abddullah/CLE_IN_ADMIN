"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useState } from 'react';
import profileImage from '../../assets/Mask Group.png';

interface TitleProps {
  title: string;
}

const Navbar: React.FC<TitleProps> = ({ title }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="w-full mx-auto flex items-center justify-between bg-white p-4 md:px-6 md:py-3 rounded-lg">
      <div className="hidden md:block text-2xl font-bold text-[#343C6A] transition duration-200 ease-in-out">
        {title}
      </div>

      <div className="flex-1 max-w-md relative mx-2">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for something"
          className="w-full h-[53px] bg-gray-100 rounded-full py-1 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out"
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-3 top-2.5 text-gray-400 mt-2"
        />
      </div>

      <div className="flex items-center space-x-4">
     
        <div className="relative cursor-pointer transition duration-200 ease-in-out hover:text-blue-600">
          <FontAwesomeIcon
            icon={faBell}
            className="text-gray-600 text-xl"
          />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
            3
          </span>
        </div>

        <div className="flex items-center">
          <Image
            src={profileImage}
            alt="User Profile"
            width={40}
            height={40}
            className="rounded-full border-2 border-gray-300 shadow-md transition duration-200 ease-in-out hover:shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;































































  
