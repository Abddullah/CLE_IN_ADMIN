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
      className={`${bgColor} rounded-lg shadow-xl h-32 w-56 mx-auto transition duration-200 ease-in-out hover:shadow-xl flex flex-col justify-center items-center`}
    >
      <div className="flex items-center gap-3">
      <h2 className="text-lg font-semibold text-black mb-2 text-center truncate mt-2">
        {title}
      </h2>
      <div className="bg-white rounded-lg p-2 shadow-md flex items-center justify-center h-7 w-7">
          <FontAwesomeIcon icon={icons} className="text-blue-600 text-lg" />
        </div>
      </div>
        <p className="text-4xl font-bold text-black mr-4">{totalBookings}</p>
    </div>
  );
};

export default BookingCard;






























