"use client";

import React, { useState } from "react";
import Image from "next/image";
import closeIcon from "../../../assets/bookingsIcon/closeIcon.svg";
import bookingImage from "../../../assets/bookingsIcon/room.svg";
import profile from "../../../assets/servicesIcons/profile.svg";
import profile2 from "../../../assets/servicesIcons/profile2.svg";
import editIcon from "../../../assets/categoriesIcons/edit.svg";
import deleteIcon from "../../../assets/categoriesIcons/delete.svg"

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

  const [showOptions , setShowOptions] = useState(false);


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
          <div className="flex justify-between items-center relative">
      <h2 className="text-md font-semibold text-[#00BFFF] z-1">{price}</h2>
      
      {/* Dots Icon to toggle the menu */}
      <Image
        src={dotsIcon}
        alt="options"
        width={20}
        height={20}
        className="cursor-pointer"
        onClick={(event) => {
          event.stopPropagation() 
          setShowOptions(!showOptions)

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
            <Image src={editIcon} alt="Edit" width={16} height={16} className="mr-2" />
            <span>Edit</span>
          </button>
          <button
            className="flex items-center w-full p-2 hover:bg-gray-100"
            onClick={() => {
              console.log("Delete clicked");
              setShowOptions(false);
            }}
          >
            <Image src={deleteIcon} alt="Delete" width={16} height={16} className="mr-2" />
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

              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Reviews
                </h4>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl shadow-md transition duration-300 hover:shadow-lg">
                    <div className="flex items-center mb-2">
                      <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full overflow-hidden mr-3">
                        <Image
                          src={profile} // replace with actual path
                          alt="Jane Doe"
                          width={40}
                          height={40}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Jane Doe</p>
                        <div className="flex items-center text-yellow-400 text-xs">
                          ★★★★★
                          <span className="text-gray-500 ml-2">(5 Stars)</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      "Great service! The room was spotless, and the staff was
                      very professional."
                    </p>
                  </div>

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

                    <div className="flex mt-6">
                      <button className="px-6 py-2 border-2 w-[140px] rounded-md max-w-xs border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF] hover:text-white transition mt-3">
                        Show More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
