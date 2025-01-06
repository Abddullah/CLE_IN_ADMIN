import React from "react";

interface SuccessModalProps {
  text: string;
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ text, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <div className="flex items-center justify-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          
        </div>
        <p className="mt-6 text-gray-800 text-center text-lg">{text}</p>
        <div className="flex justify-center mt-6 ">
          <button
            onClick={onClose}
            className="bg-green-500 text-white py-2 px-4 w-[8rem] rounded-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
