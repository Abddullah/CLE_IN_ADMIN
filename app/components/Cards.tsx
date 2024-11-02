import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface BookingCardProps {
  totalBookings: number;
  title?: string;
  icons: any;
  bgColor?: string;
}

const BookingCard: React.FC<BookingCardProps> = ({
  totalBookings,
  title,
  icons,
  bgColor,
}) => {
  return (
    <div
      className={`${bgColor} rounded-lg shadow-xl h-40 w-64 mx-auto transition duration-200 ease-in-out hover:shadow-xl flex flex-col justify-center items-center`}
    >
      <h2 className="text-lg font-semibold text-black mb-2 text-center truncate">
        {title}
      </h2>
      <div className="flex items-center">
        <p className="text-4xl font-bold text-black mr-4">{totalBookings}</p>
        <div className="bg-white rounded-lg p-2 shadow-md flex items-center justify-center h-12 w-12">
          <FontAwesomeIcon icon={icons} className="text-blue-600 text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default BookingCard;






























