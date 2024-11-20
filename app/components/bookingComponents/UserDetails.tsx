"use client";

import { useState } from "react";
import Image from "next/image";


interface ProfileButtonProps {
  name: string;
}

export default function BookingCard({ name }: ProfileButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleOpen = () => {
    setIsVisible(true);
  };

  const bookingData = {
    name: "John Doe",
    date: "September 18, 2024",
    bookingTime: "2:00 pm to 4:00 pm",
    imageUrl: "/assets/bookingsIcon/room.svg",
    title: "We clean room with 100% efforts and dedication",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, ipsam nihil? Accusantium vitae quam quod quis sint, soluta molestias tempore, facere earum atque nulla, nihil voluptatibus magni excepturi! Unde, ducimus.",
    price: 30,
    customerDetails: {
      address: "123 Main St, City, Country",
      email: "johndoe@example.com",
      phone: "+123 456 7890",
    },
  };

  const vatPercentage = 12;
  const vatAmount = (bookingData.price * vatPercentage) / 100;
  const totalAmount = bookingData.price + vatAmount;

  return (
    <>
      <button
        onClick={handleOpen}
        className="bg-[#00BFFF] flex gap-2 w-[125px] text-white rounded-lg hover:bg-[#00BFFF] py-2 px-4 text-sm h-12"
      >
        <span>
          <Image src="/assets/bookingsIcon/buttonProfile.svg" alt="profile" width={30} height={30} />
        </span>
        <span className="mt-1">{name}</span>
      </button>

      {isVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="w-full max-w-4xl sm:max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6 relative max-h-[95vh] overflow-auto">
            <div className="flex justify-end">
              <button onClick={handleClose}>
                <Image src="/assets/bookingsIcon/closeIcon.svg" alt="Close" width={16} height={16} />
              </button>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold">
                {bookingData.name}
              </h2>

              <div className="flex justify-between text-xs sm:text-sm text-gray-500">
                <span>{bookingData.date}</span>
                <span>
                  <span className="font-semibold">Booked Time:</span>{" "}
                  {bookingData.bookingTime}
                </span>
              </div>

              <div className="flex justify-start">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mr-4">
                  <Image
                    src={bookingData.imageUrl}
                    alt="Room Image"
                    width={80}
                    height={80}
                    className="object-cover rounded"
                  />
                </div>
              </div>

              <h3 className="text-gray-600 text-sm sm:text-lg font-semibold">
                {bookingData.title}
              </h3>

              <p className="text-gray-600 text-xs sm:text-sm">
                {bookingData.description}
              </p>

              <div className="flex justify-between items-center text-base sm:text-lg font-bold text-[#00BFFF]">
                <span className="text-black">Price</span>
                <span>${bookingData.price}</span>
              </div>

              <div className="space-y-2 mt-4 border-t-2 pt-4 text-xs sm:text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Price:</span>
                  <span>${bookingData.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT (12%):</span>
                  <span>${vatAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm sm:text-md font-semibold text-black-700">
                  Customer Details
                </h4>
                <div className="flex flex-col gap-2 text-xs sm:text-sm text-gray-600 mt-2">
                  <div className="flex flex-col">
                    <span>
                      <strong>Email:</strong>
                    </span>
                    <span>{bookingData.customerDetails.email}</span>
                  </div>
                  <div className="flex flex-col">
                    <span>
                      <strong>Phone:</strong>
                    </span>
                    <span>{bookingData.customerDetails.phone}</span>
                  </div>
                  <div className="flex flex-col">
                    <span>
                      <strong>Address:</strong>
                    </span>
                    <span>{bookingData.customerDetails.address}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="w-full h-[80px] sm:h-[110px] bg-gray-300 mt-2 rounded-lg">
                  <Image src="/assets/bookingsIcon/map.svg" alt="map" />
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button className="px-6 py-2 border-2 w-full max-w-xs border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF] hover:text-white transition mt-3">
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
