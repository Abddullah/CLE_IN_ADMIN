import React from "react";
import { DatePicker } from "../components/bookingComponents/DatePicker";
import { BookingTable } from "../components/bookingComponents/BookingChart";
import Image from "next/image";
import loader from "../../assets/bookingsIcon/loader.svg";



function page() {
  return (
    <>

    

<div className="bg-[#F5F7FA] min-h-screen w-full items-start justify-start pt-7">
        <div className="w-full px-6  sm:px-8 md:px-12 lg:px-16 flex justify-between items-start">
          <div className="flex flex-col flex-1">
            <p className="text-lg font-semibold">Booking Calendar</p>
            <div className="mt-2">
              <DatePicker />
            </div>
            <div className="flex gap-8 mt-3">
              <div>
                <p className="text-xs cursor-pointer">Previous Day</p>
              </div>
              <div>
                <p className="text-xs cursor-pointer">Next Day</p>
              </div>
            </div>
          </div>

          <div className="ml-auto flex items-end mt-3 cursor-pointer">
            <Image src={loader} alt="loader" />
          </div>
        </div>

        <div className="w-full max-w-screen-3xl mx-auto mt-10 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16">
          <BookingTable />
        </div>
      </div>
   
   
      
    </>
  );
}

export default page;
