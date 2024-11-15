import { DatePicker } from "@/app/components/bookingComponents/DatePicker";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function page() {
  const timeSlots = [
    "8:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "12:00 PM - 2:00 PM",
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM",
    "6:00 PM - 8:00 PM",
    "8:00 PM - 10:00 PM",
  ];
  return (
    <div className="bg-[#F5F7FA] min-h-screen w-full flex items-start justify-start">
      <div className="w-full max-w-7xl px-8 lg:px-16 mt-6">
        <div>
          <p className="text-lg font-semibold">
            When would you like to scehedule your service?
          </p>
          <div className="mt-5">
            <p className="font-semibold text-md">Select Date</p>
            <div className="mt-1">
              <DatePicker />
            </div>
          </div>

          <div className="mt-5 mr-6">
            <p className="font-semibold text-md">Select Time</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 p-4">
              {timeSlots.map((slot, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center h-24 border border-gray-300 rounded-lg bg-gray-100 hover:bg-blue-100 transition-all duration-200 mr-10"
                >
                  <p className="text-gray-800 font-semibold">{slot}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center items-center">
            <Link href={"/jobs/location"}>
              <Button className="w-[250px] mb-4 mt-6 h-[45px] text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out">
                <span>Next</span>
              </Button>
            </Link>
          </div>
      </div>
    </div>
  );
}

export default page;
