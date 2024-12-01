import React from "react";
import { DatePicker } from "../components/bookingComponents/DatePicker";
import { BookingTable } from "../components/bookingComponents/BookingChart";
import Image from "next/image";
import {useTranslations} from 'next-intl';


function page() {
  const t = useTranslations('Bookings');

  return (
    <div className="bg-[#F5F7FA] min-h-screen flex flex-col items-center pt-8">
      {/* Header */}
      <div className="w-full max-w-screen-3xl px-3 sm:px-8 md:px-12 lg:px-16 flex justify-between items-center">
        <div className="flex flex-col flex-1">
          <h1 className="text-xl font-semibold text-gray-800">{(t('booking_calendar'))}</h1>
          <div className="mt-2">
            <DatePicker />
          </div>
          <div className="flex gap-6 mt-4">
            <button className="text-xs text-blue-600 hover:underline focus:underline">
              {(t('previous_day'))}
            </button>
            <button className="text-xs text-blue-600 hover:underline focus:underline">
             {(t('next_day'))}
            </button>
          </div>
        </div>
        <div className="ml-auto mt-4">
          <Image
            src="/assets/bookingsIcon/loader.svg"
            alt="Loader"
            width={24}
            height={24}
            className="w-6 h-6 animate-spin"
          />
        </div>
      </div>

      {/* Booking Table Section */}
      <div className="w-full max-w-screen-3xl mt-8 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16">
        <BookingTable />
      </div>
    </div>
  );
}

export default page;
