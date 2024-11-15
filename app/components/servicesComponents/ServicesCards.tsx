"use client";

import React, { useState } from "react";
import Image from "next/image";
import closeIcon from "../../../assets/bookingsIcon/closeIcon.svg";
import bookingImage from "../../../assets/bookingsIcon/room.svg";
import profile from "../../../assets/servicesIcons/profile.svg";
import profile2 from "../../../assets/servicesIcons/profile2.svg";
import editIcon from "../../../assets/categoriesIcons/edit.svg";
import deleteIcon from "../../../assets/categoriesIcons/delete.svg";
import map from "../../../assets/bookingsIcon/map.svg";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Define the props for the Card component
interface CardProps {
  imageUrl: string;
  title: string;
  price: string;
  time: string;
  status: string;
  date: string;
  dotsIcon: string;
  editIcon: string;
  deleteIcon: string;
}

const Card: React.FC<CardProps> = ({
  imageUrl,
  title,
  price,
  time,
  status,
  date,
  dotsIcon,
  editIcon,
  deleteIcon,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => setIsVisible(false);
  const handleOpen = () => setIsVisible(true);

  const [showOptions, setShowOptions] = useState(false);

  const path = usePathname();

  const bookingData = {
    name: "John Doe",
    date: "September 18, 2024",
    bookingTime: "2:00 pm to 4:00 pm",
    imageUrl: bookingImage,
    title: "We clean room with 100% efforts and dedication",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, ipsam nihil? Accusantium vitae quam quod quis sint, soluta molestias tempore, facere earum atque nulla, nihil voluptatibus magni excepturi! Unde, ducimus.",
    price: 30,
    customerDetails: {
      email: "johndoe@example.com",
      phone: "+123 456 7890",
      address: "123 Main St, City, Country",
    },
  };

  const vatPercentage = 12;
  const vatAmount = (bookingData.price * vatPercentage) / 100;
  const totalAmount = bookingData.price + vatAmount;

  return (
    <>
      <div onClick={handleOpen} className="cursor-pointer">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4 w-80 z-10">
          <Image
            src={imageUrl}
            alt={title}
            width={200}
            height={100}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-md font-semibold text-[#00BFFF]">{price}</h2>

              {/* Dots Icon to toggle the menu */}
              <Image
                src={dotsIcon}
                alt="options"
                width={20}
                height={20}
                className="cursor-pointer"
                onClick={(event) => {
                  event.stopPropagation();
                  setShowOptions(!showOptions);
                }}
              />

              {showOptions && (
                <div className="absolute right-0 top-8 w-32 bg-white border border-gray-200 rounded-lg shadow-md z-10">
                  <button
                    className="flex items-center w-full p-2 hover:bg-gray-100"
                    onClick={() => {
                      console.log("Edit clicked");
                      setShowOptions(false);
                    }}
                  >
                    <Image
                      src={editIcon}
                      alt="Edit"
                      width={16}
                      height={16}
                      className="mr-2"
                    />
                    <span>Edit</span>
                  </button>
                  <button
                    className="flex items-center w-full p-2 hover:bg-gray-100"
                    onClick={() => {
                      console.log("Delete clicked");
                      setShowOptions(false);
                    }}
                  >
                    <Image
                      src={deleteIcon}
                      alt="Delete"
                      width={16}
                      height={16}
                      className="mr-2"
                    />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>

            <h2 className="text-md font-semibold text-gray-800">{title}</h2>
            <h2 className="text-sm text-gray-800">{time}</h2>
            <h2 className="text-sm text-gray-800">Status: {status}</h2>
            <h2 className="text-sm text-gray-800">Date: {date}</h2>
          </div>
        </div>
      </div>

      {isVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="w-full max-w-4xl sm:max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6 relative max-h-[95vh] overflow-auto">
            <div className="flex justify-end">
              <button onClick={handleClose}>
                <Image src={closeIcon} alt="Close" width={16} height={16} />
              </button>
            </div>

            <div className="space-y-4 z-10 relative">
              <div className="flex justify-start">
                <div className="w-32 h-32 sm:w-20 sm:h-20 mr-4">
                  <Image
                    src={bookingData.imageUrl}
                    alt="Room Image"
                    width={800}
                    height={800}
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

              <div className="max-w-full w-full bg-white shadow-lg rounded-lg p-6 mt-4 border border-gray-200">
                {/* Price */}
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Price</span>
                  <span className="text-gray-800 font-medium">€ 200/hr</span>
                </div>

                {/* Cleaners */}
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Cleaners</span>
                  <span className="text-gray-800 font-medium">2</span>
                </div>

                {/* Work Frequency */}
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Work Frequency</span>
                  <span className="text-gray-800 font-medium">Weekly</span>
                </div>

                {/* Room Area Size */}
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Room Area Size</span>
                  <span className="text-gray-800 font-medium">51-100m2</span>
                </div>

                {/* Number of Rooms */}
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Number of Rooms</span>
                  <span className="text-gray-800 font-medium">3 Rooms</span>
                </div>

                {/* Need Cleaning Material */}
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">
                    Need Cleaning Materials?
                  </span>
                  <span className="text-gray-800 font-medium">Yes Please</span>
                </div>
              </div>

              <div>
                <p className="text-lg mt-8">Availablity</p>

                <div className="flex justify-start gap-12">
                  <div className="mt-3">
                    <p className="text-sm font-semibold">Monday</p>
                    <p className="text-sm text-[#00BFFF]">8:00 AM to 22:00</p>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-semibold">Tuesday</p>
                    <p className="text-sm text-[#00BFFF]">8:00 AM to 22:00</p>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-semibold">Wednesday</p>
                    <p className="text-sm text-[#00BFFF]">8:00 AM to 22:00</p>
                  </div>
                </div>
              </div>

              <div className="grid w-full items-center gap-1.5 mt-6">
                <p className="text-lg mt-2">Location</p>

                <Image
                  className="mt-4 w-full h-[180px] object-cover"
                  src={map}
                  alt="map"
                />
              </div>

              <Link href={"/services/customerInfo"}>
                <div className="flex items-center mt-6">
                  {/* Info Button */}
                  <button
                    className="flex items-center justify-center w-5 h-5 bg-blue-600 text-white rounded-full shadow-lg transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    aria-label="Customer Info"
                  >
                    <span className="text-xl font-bold">i</span>
                  </button>
                  {/* Info Text */}
                  <p className="ml-2 text-gray-700 cursor-pointer text-sm font-medium hover:text-blue-600 transition-all duration-300">
                    Customer info
                  </p>
                </div>
              </Link>

              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Reviews
                </h4>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl shadow-md transition duration-300 hover:shadow-lg">
                    <div className="flex items-center mb-2">
                      <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full overflow-hidden mr-3">
                        <Image
                          src={profile2} // replace with actual path
                          alt="Alex Smith"
                          width={40}
                          height={40}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Alex Smith</p>
                        <div className="flex items-center text-yellow-400 text-xs">
                          ★★★★☆
                          <span className="text-gray-500 ml-2">
                            (4.5 Stars)
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      "Very happy with the cleaning. Will definitely book
                      again!"
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex mt-6 justify-center">
                <button className="px-6 py-2 border-2 w-[250px] rounded-md max-w-xs border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF] hover:text-white transition mt-3">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
