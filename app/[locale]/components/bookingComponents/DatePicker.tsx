
// components/DatePicker.tsx
"use client"
import { useState } from 'react';

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState<boolean>(false);

  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  // Function to go to the previous month
  const goToPreviousMonth = () => {
    setCurrentMonth(currentMonth - 1);
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    }
  };

  // Function to go to the next month
  const goToNextMonth = () => {
    setCurrentMonth(currentMonth + 1);
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    }
  };

  // Function to handle day click
  const handleDayClick = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newDate);
    setIsCalendarVisible(false); // Hide calendar after selecting a date
  };

  // Get the days in the current month
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate(); // Last day of the month
  };

  // Generate the calendar
  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const startDay = new Date(currentYear, currentMonth, 1).getDay(); // First day of the month

    const calendar: JSX.Element[] = [];
    let blankDays = startDay;

    // Add blank days before the first day of the month
    for (let i = 0; i < blankDays; i++) {
      calendar.push(<div key={`blank-${i}`} className="day invisible"></div>);
    }

    // Add the actual days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      calendar.push(
        <div
          key={i}
          className={`day p-2 text-center rounded-lg cursor-pointer hover:bg-blue-200 ${selectedDate?.getDate() === i ? 'bg-blue-500 text-white' : ''}`}
          onClick={() => handleDayClick(i)}
        >
          {i}
        </div>
      );
    }

    return calendar;
  };

  return (
    <div className="datepicker relative inline-block">
      <div className="input-container" onClick={() => setIsCalendarVisible(!isCalendarVisible)}>
        <input
          type="text"
          value={selectedDate ? selectedDate.toDateString() : ''}
          readOnly
          className="p-2 border border-gray-300 rounded-md focus:outline-none w-full"
          placeholder="Select a date"
        />
      </div>
      {isCalendarVisible && (
        <div className="calendar absolute bg-white shadow-lg rounded-lg mt-2 w-72 z-10">
          <div className="calendar-header flex justify-between items-center p-2 border-b">
            <button onClick={goToPreviousMonth} className="text-gray-500 hover:text-gray-700">{"<"}</button>
            <span className="text-lg font-semibold">{`${currentMonth + 1}/${currentYear}`}</span>
            <button onClick={goToNextMonth} className="text-gray-500 hover:text-gray-700">{">"}</button>
          </div>
          <div className="calendar-body p-2">
            <div className="weekdays grid grid-cols-7 text-center text-sm font-medium">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            <div className="days grid grid-cols-7 gap-1 mt-2">
              {generateCalendar()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
