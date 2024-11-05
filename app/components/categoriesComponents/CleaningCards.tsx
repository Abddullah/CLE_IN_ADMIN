"use client";

import Image from "next/image";
import React, { useState } from "react";
import dots from "../../../assets/categoriesIcons/dots.svg";
import editIcon from "../../../assets/categoriesIcons/edit.svg";
import deleteIcon from "../../../assets/categoriesIcons/delete.svg";

interface Props {
  title: string;
  image: string;
}

const CleaningCards: React.FC<Props> = ({ title, image }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <>
      <div className="relative w-[203px] rounded-3xl border border-6 top-9 border-[#00BFFF] shadow-lg bg-transparent p-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <div className="absolute top-3 right-3 flex flex-col space-y-1 cursor-pointer">
          <Image
            src={dots}
            alt="Options"
            className="w-6 h-6 transition-all duration-300 ease-in-out transform hover:scale-125"
            onClick={handleToggleOptions}
          />

          
          {showOptions && (
            <div className="absolute right-0 top-8 w-32 bg-white border border-gray-200 rounded-lg shadow-md z-10">
              <button
                className="flex items-center w-full p-2 hover:bg-gray-100"
                onClick={() => {
                  console.log("Edit clicked");
                  setShowOptions(false);
                }}
              >
                <Image src={editIcon} alt="Edit" className="w-4 h-4 mr-2" />
                <span>Edit</span>
              </button>
              <button
                className="flex items-center w-full p-2 hover:bg-gray-100"
                onClick={() => {
                  console.log("Delete clicked");
                  setShowOptions(false);
                }}
              >
                <Image src={deleteIcon} alt="Delete" className="w-4 h-4 mr-2" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center mb-4">
          <div className="border-2 border-[#00BFFF] rounded-full overflow-hidden w-28 h-28 bg-white">
            <Image
              src={image}
              className="w-12 h-auto object-cover mt-7 ml-7"
              alt="House Image"
            />
          </div>
          <h2 className="text-md font-semibold text-[#242525] mt-4 text-center">
            {title}
          </h2>
        </div>
      </div>
    </>
  );
};

export default CleaningCards;
