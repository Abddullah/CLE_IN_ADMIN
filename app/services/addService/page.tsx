'use client'
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

function page() {

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [subCategories, setSubCategories] = useState<string[]>([])
  // Category options and their corresponding subcategories
  const categories: { [key: string]: string[] } = {
    "Cleaning and Hygiene Services": [
      "Office Cleaning",
      "Room Cleaning",
      "Pest Control Service",
      "Laundry Service",
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
          <h1 className="text-2xl font-bold mt-2">Add Services</h1>

          <div className="grid w-full items-center gap-1.5 mt-6">
            <select
              className="w-full h-[55px] rounded-lg border border-[#4BB1D3] bg-gray-50 outline-[#4BB1D3] focus:border-[#4BB1D3] focus:outline-none"
              id="providerName"
            >
              <option value="" disabled selected>
                Select Provider Name
              </option>
              <option value="Muzammil">Muzammil</option>
              <option value="Abdullah">Abdullah</option>
              <option value="Haider Ali">Haider Ali</option>
              <option value="Ashar">Ashar</option>
              <option value="Ahmed">Ahmed</option>
            </select>
          </div>

          


<div className="grid w-full items-center gap-1.5 mt-3">
      
      <p className="text-xl font-semibold mt-6 mb-4">Select Category</p>
      <label className="text-md font-semibold" htmlFor="category">
        Category
      </label>
      <select
        className="w-full h-[50px] rounded-lg border border-[#4BB1D3] bg-gray-50 outline-[#4BB1D3] focus:border-blue-500 focus:outline-none"
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
            className="w-full h-[50px] rounded-lg border border-[#4BB1D3] bg-gray-50 outline-[#4BB1D3] focus:border-blue-500 focus:outline-none"
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

          <div className="grid w-full items-center gap-1.5 mt-3">
            <Label className="text-md font-semibold" htmlFor="confirmPassword">
              Add Details
            </Label>
            <Input
              type="text"
              className="w-full h-[50px] rounded-lg border-[#4BB1D3] focus:border-blue-500 focus:outline-none"
              id="confirmPassword"
            />
          </div>

          <div className="grid w-full items-center gap-1.5 mt-3">
            <Textarea
              className="w-full h-[85px] rounded-lg border-[#4BB1D3] focus:border-blue-500 focus:outline-none"
              placeholder="Type your message here."
            />
          </div>

          <div className="grid w-full items-center gap-1.5 mt-3">
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

          <div className="grid w-full items-center gap-1.5 mt-3">
            <h1 className="text-xl font-semibold text-gray-800 mb-6">
              Select Slot Time
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <div
                  key={day}
                  className="flex items-center justify-between space-x-4 py-3 px-4 rounded-lg border border-gray-200 shadow-md"
                >
                  <input
                    type="checkbox"
                    id={day.toLowerCase()}
                    className="h-5 w-5 text-[#00BFFF] rounded-md focus:ring-[#00BFFF] cursor-pointer"
                  />
                  <label
                    htmlFor={day.toLowerCase()}
                    className="font-semibold text-lg text-gray-700 w-1/4"
                  >
                    {day}
                  </label>

                  <div className="flex space-x-4 w-2/3 justify-end gap-1">
                    <input
                      type="number"
                      className="w-[70px] sm:w-[105px] md:w-[105px] lg:w-[100px] h-[40px] rounded-lg bg-transparent focus:outline-none px-3 border-2 border-[#4BB1D3] focus:border-blue-500 placeholder-gray-400"
                      placeholder="Open"
                      id={`open-${day.toLowerCase()}`}
                    />
                    <input
                      type="number"
                      className="w-[70px] sm:w-[105px] md:w-[105px] lg:w-[100px] h-[40px] rounded-lg bg-transparent focus:outline-none px-3 border-2 border-[#4BB1D3] focus:border-blue-500 placeholder-gray-400"
                      placeholder="Close"
                      id={`close-${day.toLowerCase()}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center items-center">
            <Link href={"/services/reviewService"}>
              <Button className="w-[200px] h-[45px] mb-6 mt-2 text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out">
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
