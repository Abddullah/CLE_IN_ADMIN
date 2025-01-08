import React, { useState } from 'react';
import Image from 'next/image';

const BookingModal: React.FC = () => {
  const [showCustomerInfo, setShowCustomerInfo] = useState(false);

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
      email: "johndoe@example.com",
      phone: "+123 456 7890",
      address: "123 Main St, City, Country",
    },
  };

  const customerInfo = {
    fullName: 'Kam David',
    phone: '0987654321',
    email: 'kamdavid@gmail.com',
    dob: '11/07/2024',
    gender: 'Male',
    service: 'Cleaning at Home',
    description: 'This is a text description',
    cleaners: 3,
    workFrequency: 'Weekly',
    roomAreaSize: '51-100 m2',
    numberOfRooms: '1 Room',
    needsCleaningMaterials: 'Yes Please',
    price: '€ 30/hr',
    selectedDate: '8, Jan, 2024',
    selectedTime: '10:00 AM - 12:00 PM',
    selectedLocation: 'Jameria Residence',
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center  bg-opacity-50 z-50">
      <div className="w-full max-w-4xl sm:max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6 relative max-h-[95vh] overflow-auto">
        <div className="flex justify-end">
          <button onClick={() => {/* Close Modal */}}>Close</button>
        </div>

        <div className="space-y-4 z-10 relative">
          <div className="flex justify-center items-center mt-5 w-full">
            <div className="w-full max-w-xl">
              <Image
                src={bookingData.imageUrl}
                alt="Room Image"
                width={300}
                height={100}
                className="w-full h-[200px] object-cover rounded-md shadow-lg"
              />
            </div>
          </div>

          <h3 className="text-gray-600 text-sm sm:text-lg font-semibold">{bookingData.title}</h3>
          <p className="text-gray-600 text-xs sm:text-sm">{bookingData.description}</p>

          <div className="max-w-full w-full bg-white shadow-lg rounded-lg p-6 mt-4 border border-gray-200">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Price</span>
              <span className="text-gray-800 font-medium">{customerInfo.price}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Service</span>
              <span className="text-gray-800 font-medium">{customerInfo.service}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Location</span>
              <span className="text-gray-800 font-medium">{customerInfo.selectedLocation}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Date</span>
              <span className="text-gray-800 font-medium">{customerInfo.selectedDate}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Time</span>
              <span className="text-gray-800 font-medium">{customerInfo.selectedTime}</span>
            </div>
          </div>

          <div>
            <p className="text-lg mt-8">Availability</p>
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
            <Image className="mt-4 w-full h-[180px] object-cover" src="/assets/map.svg" alt="map" width={1000} height={500} />
          </div>

          <div onClick={() => setShowCustomerInfo(!showCustomerInfo)} className="flex items-center mt-6">
            <button className="flex items-center justify-center w-5 h-5 bg-blue-600 text-white rounded-full shadow-lg">
              <span className="text-xl font-bold">i</span>
            </button>
            <p className="ml-2 text-gray-700 cursor-pointer text-sm font-medium hover:text-blue-600">
              Customer Info
            </p>
          </div>

          {showCustomerInfo && (
            <div className="max-w-full w-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
              <div className="px-6 py-4 border-b bg-[#00BFFF] text-white">
                <h2 className="text-lg font-bold">Customer Information</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-gray-500">Full Name</h3>
                  <p className="text-gray-700">{customerInfo.fullName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-500">Phone No</h3>
                  <p className="text-gray-700">{customerInfo.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-500">Email</h3>
                  <p className="text-gray-700">{customerInfo.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-500">Gender</h3>
                  <p className="text-gray-700">{customerInfo.gender}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-500">Date of Birth</h3>
                  <p className="text-gray-700">{customerInfo.dob}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-500">Description</h3>
                  <p className="text-gray-700">{customerInfo.description}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-500">Number of Cleaners</h3>
                  <p className="text-gray-700">{customerInfo.cleaners}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-500">Work Frequency</h3>
                  <p className="text-gray-700">{customerInfo.workFrequency}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-500">Room Area Size</h3>
                  <p className="text-gray-700">{customerInfo.roomAreaSize}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-500">Number of Rooms</h3>
                  <p className="text-gray-700">{customerInfo.numberOfRooms}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-500">Needs Cleaning Materials</h3>
                  <p className="text-gray-700">{customerInfo.needsCleaningMaterials}</p>
                </div>
              </div>
            </div>
          )}

<div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Reviews
                </h4>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl shadow-md transition duration-300 hover:shadow-lg">
                    <div className="flex items-center mb-2">
                      <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full overflow-hidden mr-3">
                        <Image
                          src="/assets/servicesIcons/profile2.svg"
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


          <div className="flex mt-6 justify-center">
            <button className="px-6 py-2 border-2 w-[250px] rounded-md max-w-xs border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF] hover:text-white transition mt-3">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
    </div>

  );
};

export default BookingModal;
