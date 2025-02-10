import React, { useState, useRef } from 'react';

const DatePicker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dateRef = useRef<HTMLDivElement>(null);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const handleDateClick = (day: number) => {
    const selected = new Date(currentYear, currentMonth, day);
    setSelectedDate(selected.toDateString());
    setIsOpen(false);
  };

  const generateDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const daysArray = Array(firstDay).fill(null);
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }
    return daysArray;
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block">
      {/* Input Box */}
      <div
        className="border border-gray-300 rounded-lg px-4 py-2 cursor-pointer hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedDate || (
          <span className="text-gray-500">Select a date</span>
        )}
      </div>

      {/* Dropdown Calendar */}
      {isOpen && (
        <div
          ref={dateRef}
          className="absolute z-20 bg-white border border-gray-200 shadow-lg rounded-lg mt-2 w-80 p-4 transition-all duration-300"
        >
          {/* Month and Year Navigation */}
          <div className="flex justify-between items-center mb-4">
            <button
              className="text-gray-600 hover:text-blue-600 p-2 rounded-full transition"
              onClick={prevMonth}
            >
              &#8592;
            </button>
            <span className="font-semibold text-lg text-gray-700">
              {new Date(currentYear, currentMonth).toLocaleString('default', {
                month: 'long',
              })}{' '}
              {currentYear}
            </span>
            <button
              className="text-gray-600 hover:text-blue-600 p-2 rounded-full transition"
              onClick={nextMonth}
            >
              &#8594;
            </button>
          </div>

          {/* Days of the Week */}
          <div className="grid grid-cols-7 gap-2">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="text-sm font-semibold text-gray-500 text-center"
              >
                {day}
              </div>
            ))}
            {generateDays().map((day, index) => (
              <div
                key={index}
                className={`h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer ${
                  day
                    ? 'hover:bg-blue-500 hover:text-white transition-all'
                    : ''
                } ${day && day === today.getDate() &&
                  currentMonth === today.getMonth() &&
                  currentYear === today.getFullYear()
                    ? 'bg-blue-100 text-blue-600 font-bold'
                    : ''
                  } ${
                  day &&
                  selectedDate ===
                    new Date(currentYear, currentMonth, day).toDateString()
                    ? 'bg-blue-500 text-white'
                    : ''
                }`}
                onClick={() => day && handleDateClick(day)}
              >
                {day || ''}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
