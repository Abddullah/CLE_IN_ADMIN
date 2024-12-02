"use client";

import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";
 
const UploadButton: React.FC = () => {
  const t = useTranslations('AddCategory');
  
  const handleFileInputClick = () => {
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <input
        type="file"
        id="file-input"
        className="hidden focus:outline-none"
        accept="image/*"
      />
      <button
        onClick={handleFileInputClick}
        className="flex items-start justify-start p-3 border border-blue-400 rounded-lg hover:bg-gray-100 transition"
      >
        <Image
          className="w-5 h-7 ml-1 mr-3"
          src="/assets/categoriesIcons/upload-icon.svg"
          width={10}
          height={10}
          alt="upload icon"
        />
        <span className="mt-1.5 text-[15px]">{(t('Choose_a_file'))}</span>
      </button>
    </div>
  );
};

export default UploadButton;
