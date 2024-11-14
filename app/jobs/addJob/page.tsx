"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import room from "../../../assets/servicesIcons/cardImage.svg";
import office from "../../../assets/servicesIcons/office.svg";
import hospital from "../../../assets/servicesIcons/hospital.svg";
import factory from "../../../assets/servicesIcons/factory.svg";
import Link from "next/link";
import { useState } from "react";
import map from '../../../assets/bookingsIcon/map.svg'

function page() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [subCategories, setSubCategories] = useState<string[]>([]);

  const categories: { [key: string]: string[] } = {
    "Cleaning and Hygiene Services": [
      "Office Cleaning",
      "Room Cleaning",
      "Pest Control Service",
      "Laundry Service",
      "Etc",
    ],
    "Home Maintenance Services": [
      "Electrician",
      "Plumber",
      "Mason/Bricklayer",
      "Carpenter",
      "Painter",
    ],
    "Installation Services": [
      "Air Conditioning Installer",
      "Alarm System Installer",
      "Solar Panel Installer",
      "Door and Window Installer",
    ],
    "Renovation Services": [
      "Architect",
      "Interior Designer",
      "Building Contractor",
      "Floor Layer",
    ],
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSelectedCategory(selected);
    setSubCategories(categories[selected] || []);
  };
  return (
    <>
      <div className="bg-[#F5F7FA] min-h-screen w-full flex items-start justify-start pt-2">
        <div className="w-full max-w-7xl px-8 lg:px-16 mt-6">
          <h1 className="text-2xl font-bold mt-2">Add Jobs</h1>

          <div className="flex flex-col items-start space-y-6 mt-4">
            <h2 className="text-md font-semibold text-gray-800">
              How many hours do you need?
            </h2>

            <div className="flex space-x-4">
              {[1, 2, 3, 4, 5, 6, 7].map((hour) => (
                <button
                  key={hour}
                  className="flex items-center justify-center w-9 h-9 text-lg font-bold text-[#4BB1D3]  rounded-full border border-[#4BB1D3]  hover:bg-[#4BB1D3] hover:text-white focus:outline-none  focus:bg-[#4BB1D3] focus:text-white transition duration-300"
                >
                  {hour}
                </button>
              ))}
            </div>
          </div>

          <div className="grid w-full items-center gap-1.5 mt-6">
            <h2 className="text-md font-semibold text-gray-800">
              How many professionals do you need?
            </h2>

            <div className="flex space-x-4 mt-3  ">
              {[1, 2, 3, 4].map((professional) => (
                <button
                  key={professional}
                  className="flex items-center justify-center w-9 h-9 text-lg font-bold text-[#4BB1D3]  rounded-full border border-[#4BB1D3]  hover:bg-blue-500 focus:outline-none  focus:bg-[#4BB1D3] focus:text-white transition duration-300"
                >
                  {professional}
                </button>
              ))}
            </div>
          </div>

          <div className="grid w-full items-center gap-1.5 mt-3">
            <p className="text-xl font-semibold mt-6 mb-4">Select Category</p>
            <label className="text-md font-semibold" htmlFor="category">
              Category
            </label>
            <select
              className="w-full h-[50px] rounded-lg border p-2  border-[#4BB1D3] bg-gray-50 outline-[#4BB1D3] focus:border-blue-500 focus:outline-none"
              id="category"
              onChange={handleCategoryChange}
            >
              <option value="" disabled selected>
                Select Category
              </option>
              {Object.keys(categories).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {subCategories.length > 0 && (
              <div className="grid w-full items-center gap-1.5 mt-4">
                <label className="text-md font-semibold" htmlFor="subCategory">
                  Subcategory
                </label>
                <select
                  className="w-full h-[50px] rounded-lg border p-2 border-[#4BB1D3] bg-gray-50 outline-[#4BB1D3] focus:border-blue-500 focus:outline-none"
                  id="subCategory"
                >
                  <option value="" disabled selected>
                    Select Subcategory
                  </option>
                  {subCategories.map((subCategory) => (
                    <option key={subCategory} value={subCategory}>
                      {subCategory}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* <div className="grid w-full items-center gap-1.5 mt-3">
            <Label className="text-md font-semibold" htmlFor="confirmPassword">
              Add Details
            </Label>
            <Input
              type="text"
              className="w-full h-[50px] rounded-lg border-[#4BB1D3] focus:border-blue-500 focus:outline-none"
              id="confirmPassword"
            />
          </div> */}

          <div className="grid w-full items-center gap-1.5 mt-6">
            <label className="text-md font-semibold" htmlFor="Room Area Size">
              Room Area Size
            </label>
            <select
              className="w-full h-[55px] rounded-lg border p-2 border-[#4BB1D3] bg-gray-50 outline-[#4BB1D3] focus:border-[#4BB1D3] focus:outline-none"
              id="providerName"
            >
              <option className="pl-4" value="" disabled selected>
                Room Area Size
              </option>
              <option value="Muzammil">Less than 50 m2</option>
              <option value="Abdullah">51 - 100 m2</option>
              <option value="Haider Ali">101 - 150 m2</option>
              <option value="Haider Ali">151 - 200 m2</option>
              <option value="Ashar">Over 200 m2</option>
            </select>
          </div>

          <div className="grid w-full items-center gap-1.5 mt-6">
            <label className="text-md font-semibold" htmlFor="Room Area Size">
              Numbers of Rooms
            </label>
            <select
              className="w-full h-[55px] p-2 rounded-lg border border-[#4BB1D3] bg-gray-50 outline-[#4BB1D3] focus:border-[#4BB1D3] focus:outline-none"
              id="providerName"
            >
              <option className="pl-4" value="" disabled selected>
                Number of Rooms
              </option>
              <option value="Studio">Studio</option>
              <option value="1 Room">1 Room</option>
              <option value="2 Rooms">2 Rooms</option>
              <option value="3 Rooms">3 Rooms</option>
              <option value="4 Rooms">4 Rooms</option>
              <option value="5 Rooms">5 Rooms</option>
            </select>
          </div>

          {/* Cleaning Material started */}

          <div className="grid w-full items-center gap-1.5 mt-6">
            <p className="text-md font-semibold">Need cleaning materials?</p>

            <div className="flex space-x-4 mt-2">
              <button className="bg-[#ADB5BD] text-black px-4 py-2 rounded-full focus:bg-blue-500 focus:text-white">
                No,I have them
              </button>
              <button className="bg-[#ADB5BD] text-black px-4 py-2 rounded-full focus:bg-blue-500 focus:text-white">
                Yes, Please
              </button>
            </div>
          </div>

          {/* Additional Services Started */}

          <div className="grid w-full items-center gap-1.5 mt-6">
  <p className="text-lg font-semibold text-gray-800 mt-3">Additional Services</p>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
    <label className="flex items-center space-x-2 rounded-lg p-3 border border-gray-200 hover:bg-blue-50 transition-all duration-200">
      <input type="checkbox" className="form-checkbox h-6 w-6 text-blue-600" />
      <span className="text-gray-700 font-medium">Oven</span>
    </label>
    <label className="flex items-center space-x-2 rounded-lg p-3 border border-gray-200 hover:bg-blue-50 transition-all duration-200">
      <input type="checkbox" className="form-checkbox h-6 w-6 text-blue-600" />
      <span className="text-gray-700 font-medium">Laundry</span>
    </label>
    <label className="flex items-center space-x-2 rounded-lg p-3 border border-gray-200 hover:bg-blue-50 transition-all duration-200">
      <input type="checkbox" className="form-checkbox h-6 w-6 text-blue-600" />
      <span className="text-gray-700 font-medium">Fridge</span>
    </label>
    <label className="flex items-center space-x-2 rounded-lg p-3 border border-gray-200 hover:bg-blue-50 transition-all duration-200">
      <input type="checkbox" className="form-checkbox h-6 w-6 text-blue-600" />
      <span className="text-gray-700 font-medium">Ironing</span>
    </label>
    <label className="flex items-center space-x-2 rounded-lg p-3 border border-gray-200 hover:bg-blue-50 transition-all duration-200">
      <input type="checkbox" className="form-checkbox h-6 w-6 text-blue-600" />
      <span className="text-gray-700 font-medium">Balcony</span>
    </label>
    <label className="flex items-center space-x-2 rounded-lg p-3 border border-gray-200 hover:bg-blue-50 transition-all duration-200">
      <input type="checkbox" className="form-checkbox h-6 w-6 text-blue-600" />
      <span className="text-gray-700 font-medium">Cupboard</span>
    </label>
  </div>
</div>

{/* Photos section started */}

          <div className="grid w-full items-center gap-1.5 mt-8">
            <p className="font-semibold">Photos</p>
            <div className="flex justify-between flex-wrap">
              <div className="w-[108px] h-[99.52px]">
                <Image src={room} alt="djdj" />
              </div>
              <div className="w-[108px] h-[99.52px]">
                <Image src={factory} alt="djdj" />
              </div>
              <div className="w-[108px] h-[99.52px]">
                <Image src={hospital} alt="djdj" />
              </div>
              <div className="w-[108px] h-[99.52px]">
                <Image src={room} alt="djdj" />
              </div>
              <div className="w-[108px] h-[99.52px]">
                <Image src={factory} alt="djdj" />
              </div>
              <div className="w-[108px] h-[99.52px]">
                <Image src={office} alt="djdj" />
              </div>
              <div className="w-[108px] h-[99.52px]">
                <Image src={hospital} alt="djdj" />
              </div>
              <div className="w-[108px] h-[99.52px]">
                <Image src={office} alt="djdj" />
              </div>
              <div className="w-[108px] h-[99.52px]">
                <Image src={room} alt="djdj" />
              </div>
            </div>
          </div>


      {/* location */}

      <div className="grid w-full items-center gap-1.5 mt-6">

          <p className="text-lg font-bold mt-2">Location</p>

          <Image className='mt-4 w-full h-[180px] object-cover' src={map} alt='map'/>
          </div>

          <div className="mt-8 flex justify-center items-center">
            <Link href={"/jobs/scheduleService"}>
              <Button className="w-[250px] mb-4 mt-6 h-[45px] text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out">
                <span>Next</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
