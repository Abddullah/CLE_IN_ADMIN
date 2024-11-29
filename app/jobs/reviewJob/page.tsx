import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F7FA] to-white">
      <div className="container px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl">
          <h1 className="text-1xl md:text-2xl font-bold text-gray-900 mb-8 tracking-tight">
            Review & Confirm Booking
          </h1>

          <div className="bg-white border-2 rounded-2xl shadow-xl p-8 mb-10 transition-all duration-300 hover:shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Service Details */}
              <div className="space-y-8">
                <div className="transform transition-all duration-300 hover:translate-x-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Service</h2>
                  <p className="text-gray-700 text-lg">Premium Cleaning Services</p>
                </div>
                <div className="transform transition-all duration-300 hover:translate-x-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                  <p className="text-gray-700 text-lg">Deep cleaning with eco-friendly products</p>
                </div>
                <div className="transform transition-all duration-300 hover:translate-x-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Professional Cleaners</h2>
                  <p className="text-gray-700 text-lg">3 Certified Experts</p>
                </div>
                <div className="transform transition-all duration-300 hover:translate-x-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Service Frequency</h2>
                  <p className="text-gray-700 text-lg">Weekly Premium Service</p>
                </div>
                <div className="transform transition-all duration-300 hover:translate-x-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Coverage Area</h2>
                  <p className="text-gray-700 text-lg">51 - 100 m² (Professional Grade)</p>
                </div>
              </div>

              {/* Additional Details */}
              <div className="space-y-8">
                <div className="transform transition-all duration-300 hover:translate-x-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Accommodation</h2>
                  <p className="text-gray-700 text-lg">1 Luxury Suite</p>
                </div>
                <div className="transform transition-all duration-300 hover:translate-x-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Equipment & Materials</h2>
                  <p className="text-gray-700 text-lg">Premium Cleaning Supplies Included</p>
                </div>
                <div className="transform transition-all duration-300 hover:translate-x-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Professional Rate</h2>
                  <p className="text-gray-700 text-lg">€30/hr (Premium Service)</p>
                </div>
                <div className="transform transition-all duration-300 hover:translate-x-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Appointment Date</h2>
                  <p className="text-gray-700 text-lg">Monday, January 8, 2024</p>
                </div>
                <div className="transform transition-all duration-300 hover:translate-x-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Service Duration</h2>
                  <p className="text-gray-700 text-lg">10:00 AM - 12:00 PM (2 hours)</p>
                </div>
                <div className="transform transition-all duration-300 hover:translate-x-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Service Location</h2>
                  <p className="text-gray-700 text-lg">Jameria Luxury Residence</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Summary Card */}
          <div className="bg-white border-2 rounded-2xl shadow-xl p-8 max-w-md mb-10 transition-all duration-300 hover:shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Payment Summary
            </h2>
            <div className="space-y-6">
              <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <span className="text-lg text-gray-700">Service Amount</span>
                <span className="text-xl text-gray-900 font-semibold">€150.00</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <span className="text-lg text-gray-700">VAT (15%)</span>
                <span className="text-xl text-gray-900 font-semibold">€22.50</span>
              </div>
              <div className="flex justify-between items-center pt-6">
                <span className="text-xl font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-[#00BFFF]">€172.50</span>
              </div>
            </div>
          </div>

          {/* Book Button */}
          <div className="mt-8 flex justify-center items-center">
            <Link href={"/jobs/"}>
              <Button
                type="submit"
                className="w-[250px] mb-4 mt-6 h-[45px] text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out"
              >
                <span>Next</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;