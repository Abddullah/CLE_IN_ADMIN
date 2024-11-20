"use client";

import Image from "next/image";
import React from "react";
import uploadIcon from "../../../../assets/categoriesIcons/upload-icon.svg";

const UploadButton: React.FC = () => {
  const handleFileInputClick = () => {
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <input type="file" id="file-input" className="hidden" accept="image/*" />
      <button
        onClick={handleFileInputClick}
        className="flex items-start justify-start p-3 border border-blue-400 rounded-lg hover:bg-gray-100 transition"
      >
        <Image className="w-6 h-6 mr-3" src="/assets/categoriesIcons/upload-icon.svg" width={10} height={10} alt="upload icon" />
        <span className="mt-1">Choose a File</span>
      </button>
    </div>
  );
}; 

export default UploadButton;
