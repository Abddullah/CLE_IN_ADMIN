// components/DatePicker.tsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="flex flex-col mt-5">
      
      <DatePicker
        selected={selectedDate}
        onChange={(date: any) => setSelectedDate(date)}
        className="w-64 px-4 py-2 rounded-md border border-gray-300 shadow-md 
                   focus:outline-none focus:ring-2 focus:ring-[#00BFFF]"
        dateFormat="dd/MM/yyyy"
        placeholderText="Choose a date"
      />
    </div>
  );
};

export default CustomDatePicker;
