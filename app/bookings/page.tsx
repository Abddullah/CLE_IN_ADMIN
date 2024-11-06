import React from "react";
import { DatePicker } from "../components/bookingComponents/DatePicker";
import { BookingTable } from "../components/bookingComponents/BookingChart";

function page() {
  return (
    <>
      <div className="bg-[#F5F7FA] min-h-screen w-full items-start justify-start pt-7">
        <div className="w-full max-w-md px-4 sm:px-8 md:px-12 lg:px-16">
          <p className="text-lg font-semibold">Booking Calendar</p>
          <div className="mt-2">
            <DatePicker />
          </div>
          <div className="flex gap-8 mt-3">
            <div>
              <p className="text-sm">Previous Day</p>
            </div>
            <div>
              <p className="text-sm">Next Day</p>
            </div>
          </div>
        </div>

        {/* Adjust the margin and width for the table */}
        <div className="w-full max-w-screen-3xl mx-auto mt-10 px-14">
          <BookingTable />
        </div>
      </div>
    </>
  );
}

export default page;
