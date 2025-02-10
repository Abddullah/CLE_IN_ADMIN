import React, { useEffect, useState } from "react";

interface SuccessModalProps {
  text: string;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ text, onClose }) => {
  const [isOpen, setIsOpen] = useState(true); // Modal auto-open

  useEffect(() => {
    // Close modal after 3 seconds (optional)
    const timer = setTimeout(() => {
      setIsOpen(false);
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative w-80 p-6 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col items-center justify-center">
              {/* Animated Circle with Tick */}
              <div className="relative mb-4">
                <div className="w-16 h-16 border-4 border-green-500 rounded-full animate-ping"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              {/* Success Text */}
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{text}</h2>
              {/* Close Button */}
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuccessModal;

