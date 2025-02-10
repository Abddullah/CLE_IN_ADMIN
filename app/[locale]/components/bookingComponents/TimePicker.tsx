"use client"
import React, { useState, useRef } from 'react';

const TimePicker: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(0);
  const [meridian, setMeridian] = useState<'AM' | 'PM'>('AM');
  const timeRef = useRef<HTMLDivElement>(null);

  const handleTimeSelect = () => {
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')} ${meridian}`;
    setSelectedTime(formattedTime);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (timeRef.current && !timeRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block">
      {/* Input Box with Clock Icon */}
      <div
        className="relative border border-gray-300 rounded-lg px-4 py-2 cursor-pointer hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {/* Clock Icon inside Input */}
        <svg
          className="absolute left-3 top-2.5 w-5 h-5 text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6l4 2"
          />
        </svg>
        {selectedTime || (
          <span className="text-gray-500 pl-8">Select time</span> // Added padding for the icon space
        )}
      </div>

      {/* Time Picker Dropdown */}
      {isOpen && (
        <div
          ref={timeRef}
          className="absolute z-20 bg-white border border-gray-200 shadow-lg rounded-lg mt-2 w-72 p-4 transition-all duration-300"
        >
          {/* Hours Selection */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col items-center">
              <button
                className="text-gray-600 hover:text-blue-600 transition"
                onClick={() => setHours((prev) => (prev === 12 ? 1 : prev + 1))}
              >
                &#8593;
              </button>
              <span className="text-lg font-semibold text-gray-700">
                {hours.toString().padStart(2, '0')}
              </span>
              <button
                className="text-gray-600 hover:text-blue-600 transition"
                onClick={() => setHours((prev) => (prev === 1 ? 12 : prev - 1))}
              >
                &#8595;
              </button>
            </div>

            {/* Separator */}
            <span className="text-lg font-semibold text-gray-700">:</span>

            {/* Minutes Selection */}
            <div className="flex flex-col items-center">
              <button
                className="text-gray-600 hover:text-blue-600 transition"
                onClick={() =>
                  setMinutes((prev) => (prev === 59 ? 0 : prev + 1))
                }
              >
                &#8593;
              </button>
              <span className="text-lg font-semibold text-gray-700">
                {minutes.toString().padStart(2, '0')}
              </span>
              <button
                className="text-gray-600 hover:text-blue-600 transition"
                onClick={() =>
                  setMinutes((prev) => (prev === 0 ? 59 : prev - 1))
                }
              >
                &#8595;
              </button>
            </div>

            {/* Meridian Selection */}
            <div className="flex flex-col items-center ml-4">
              <button
                className="text-gray-600 hover:text-blue-600 transition"
                onClick={() =>
                  setMeridian((prev) => (prev === 'AM' ? 'PM' : 'AM'))
                }
              >
                &#8593;
              </button>
              <span className="text-lg font-semibold text-gray-700">
                {meridian}
              </span>
              <button
                className="text-gray-600 hover:text-blue-600 transition"
                onClick={() =>
                  setMeridian((prev) => (prev === 'AM' ? 'PM' : 'AM'))
                }
              >
                &#8595;
              </button>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={handleTimeSelect}
          >
            Confirm Time
          </button>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
