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
    <div>
      <input type="file" id="file-input" className="hidden" accept="image/*" />
      <button
        onClick={handleFileInputClick}
        className="flex items-center justify-center p-4 border border-blue-400 rounded-xl hover:bg-gray-100 transition"
      >
        <Image className="w-6 h-6 mr-2" src={uploadIcon} alt="upload icon" />
        <span>Choose a File</span>
      </button>
    </div>
  );
};

export default UploadButton;
