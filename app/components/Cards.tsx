import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';

interface BookingCardProps {
  totalBookings: number;
  title?: string;
  icons: any;
}

const BookingCard: React.FC<BookingCardProps> = ({ totalBookings, title, icons }) => {
  return (
    <div className="bg-blue-100 rounded-lg shadow-xl h-32 w-64 mx-auto transition duration-200 ease-in-out hover:shadow-xl flex flex-col justify-center items-center">
      <h2 className="text-lg font-semibold text-black mb-2 text-center truncate">{title}</h2>
      <div className="flex items-center">
        <p className="text-4xl font-bold text-black">{totalBookings}</p>
        <div className="bg-white rounded-lg p-2 ml-4 shadow-md">
          <FontAwesomeIcon icon={icons} className="text-blue-600 text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default BookingCard;

