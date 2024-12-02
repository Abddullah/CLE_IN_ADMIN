"use client";

import Image from "next/image";
import React, { useState } from "react";

interface Props {
  title: string;
  image: string;
}

const CleaningCards: React.FC<Props> = ({ title, image }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const subcategories = [
    "Regular Cleaning",
    "Deep Cleaning", 
    "Move In/Out Cleaning",
    "Office Cleaning"
  ];

  return (
    <div
      className="relative w-[250px] rounded-3xl border-2 top-9 border-[#00BFFF] bg-white/90 backdrop-blur-sm p-6 hover:shadow-2xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowOptions(false);
      }}
    >
      <div className="absolute top-4 right-4">
        <Image
          src="/assets/categoriesIcons/dots.svg"
          width={24}
          height={24}
          alt="Options"
          className="cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
          onClick={handleToggleOptions}
        />

        {showOptions && (
          <div
            className="absolute right-0 top-8 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden"
            style={{ transformOrigin: "top right" }}
          >
            <button
              className="flex items-center w-full p-3 transition-all hover:text-blue-500 hover:bg-blue-50"
              onClick={() => {
                console.log("Edit clicked");
                setShowOptions(false);
              }}
            >
              <Image src="/assets/categoriesIcons/edit.svg" alt="Edit" width={16} height={16} className="mr-3" />
              <span className="text-sm font-medium">Edit</span>
            </button>
            <button
              className="flex items-center w-full p-3 transition-all hover:text-red-500 hover:bg-red-50"
              onClick={() => {
                console.log("Delete clicked");
                setShowOptions(false);
              }}
            >
              <Image src="/assets/categoriesIcons/delete.svg" alt="Delete" width={16} height={16} className="mr-3" />
              <span className="text-sm font-medium">Delete</span>
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative border-2 border-[#00BFFF] rounded-full overflow-hidden w-32 h-32 bg-white">
            <Image
              src={image}
              className="w-16 h-auto object-cover mt-8 mx-auto transform transition-transform duration-300 group-hover:scale-110"
              alt="Service Icon"
              width={64}
              height={64}
            />
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4">
          {title}
        </h2>

        <div className="space-y-3 w-full">
          {subcategories.map((subcategory, index) => (
            <div
              key={index}
              className="text-sm text-gray-600 hover:text-blue-500 cursor-pointer flex items-center hover:translate-x-1 transition-transform"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2" />
              {subcategory}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CleaningCards;