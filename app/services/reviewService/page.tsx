import Image from "next/image";
import React from "react";
import map from "../../../assets/bookingsIcon/map.svg";
import serviceImage from "../../../assets/bookingsIcon/room.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function page() {
  return (
    <>
      <div className="bg-[#F5F7FA] min-h-screen w-full flex items-start justify-start pt-2">
        <div className="w-full max-w-7xl px-8 lg:px-16 mt-6">
          <div>
            <h1 className="text-xl font-semibold">Review & Confirm Service</h1>

            <div className="mt-6">
              <Image src={serviceImage} alt="image" width={300} height={300} />
            </div>

            <div>
              <p className="text-xl mt-4">Title</p>
              <p className="mt-2">Cleaning at Home</p>
            </div>

            <div>
              <p className="text-xl mt-4">Description</p>
              <p className="mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis assumenda necessitatibus expedita, dicta iure eius
                dolorem voluptatum officia aut neque sint distinctio quia quasi
                sed recusandae voluptatibus voluptas magni error?
              </p>
            </div>

            <div className="max-w-sm w-full bg-white shadow-lg rounded-lg p-6 mt-4 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-start">
                {" "}
                Job Details
              </h2>

              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Price</span>
                <span className="text-gray-800 font-medium">€ 200/hr</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Cleaners</span>
                <span className="text-gray-800 font-medium">2</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Work Frequency</span>
                <span className="text-gray-800 font-medium">Weekly</span>
              </div>

              {/* Room Area Size */}
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Room Area Size</span>
                <span className="text-gray-800 font-medium">51-100m2</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Number of Rooms</span>
                <span className="text-gray-800 font-medium">3 Rooms</span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Need Cleaning Materials?</span>
                <span className="text-gray-800 font-medium">Yes Please</span>
              </div>
            </div>

            <div>
              <p className="text-xl mt-8">Availablity</p>
              <div className="mt-6">
                <p className="text-lg">Monday</p>
                <p className="text-md text-[#00BFFF]">8:00 AM to 22:00</p>
              </div>
              <div className="mt-3">
                <p className="text-lg">Tuesday</p>
                <p className="text-md text-[#00BFFF]">8:00 AM to 22:00</p>
              </div>
              <div className="mt-3">
                <p className="text-lg">Wednesday</p>
                <p className="text-md text-[#00BFFF]">8:00 AM to 22:00</p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xl">Location</p>
              <Image className="mt-4" src={map} alt="map" />

              <Link href={"/services/customerInfo"}>
                <div className="flex items-center mt-6">
                  <button
                    className="flex items-center justify-center w-5 h-5 bg-blue-600 text-white rounded-full shadow-lg transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    aria-label="Customer Info"
                  >
                    <span className="text-xl font-bold">i</span>
                  </button>

                  <p className="ml-2 text-gray-700 cursor-pointer text-sm font-medium hover:text-blue-600 transition-all duration-300">
                    Customer info
                  </p>
                </div>
              </Link>
            </div>

            <div className="mt-10 flex justify-center items-center">
              <Link href={"/services"}>
                <Button className="w-[280px] mb-4 h-[45px] text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out">
                  <span>POST</span>
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
