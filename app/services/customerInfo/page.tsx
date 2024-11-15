import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function page() {
  return (
    <>
      <div className="bg-[#F5F7FA] min-h-screen w-full flex items-start justify-start pt-2">
        <div className="w-full max-w-7xl px-8 lg:px-16 mt-6">
          <div>
            <h1 className="text-2xl font-semibold">Customer Information</h1>

            {/* Service Section */}
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Full Name</h2>
              <p className="mt-2 ">Kam David</p>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Phone No</h2>
              <p className="mt-2 ">0987654321</p>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Email Address</h2>
              <p className="mt-2 ">kamdavid@gmail.com</p>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Date of Birth</h2>
              <p className="mt-2 ">11/07/2024</p>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Gender</h2>
              <p className="mt-2 ">Male</p>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Service</h2>
              <p className="mt-2 ">Cleaning at Home</p>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Description</h2>
              <p className="mt-2 ">This is a text description</p>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Cleaners</h2>
              <p className="mt-2 ">3</p>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Work Frequency</h2>
              <p className="mt-2 ">Weekly</p>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Room Area Size</h2>
              <p className="mt-2 ">51 - 100 m2</p>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Number of Rooms</h2>
              <p className="mt-2 ">1 Room</p>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold">
                Needs Cleaning Materials?
              </h2>
              <p className="mt-2 ">Yes Please</p>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Price</h2>
              <p className="mt-2 ">€ 30/hr</p>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Selected Date</h2>
              <p className="mt-2 ">8,Jan,2024</p>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Selected Time</h2>
              <p className="mt-2 ">10:00 AM - 12:00 PM</p>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Selected Location</h2>
              <p className="mt-2 ">Jameria Residence</p>
            </div>

            <div className="max-w-sm w-full bg-white shadow-lg rounded-lg p-6 mt-6 border border-gray-300">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-start">
                Payment Summary
              </h2>
              {/* Amount */}
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Amount</span>
                <span className="text-gray-800 font-medium">€150.00</span>
              </div>
              {/* VAT */}
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">VAT</span>
                <span className="text-gray-800 font-medium">€22.50</span>
              </div>
              {/* Total */}
              <div className="flex justify-between items-center py-2 mt-4">
                <span className="text-gray-800 font-semibold text-lg">
                  Total Amount
                </span>
                <span className="text-[#00BFFF] font-bold text-lg">
                  €172.50
                </span>
              </div>
            </div>

            <div className="mt-8 flex justify-center items-center">
              <Link href={"/services"}>
                <Button className="w-[250px] mb-4 mt-6 h-[45px] text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out">
                  <span>Book</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
