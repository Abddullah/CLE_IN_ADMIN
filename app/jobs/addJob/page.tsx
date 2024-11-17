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
import map from "../../../assets/bookingsIcon/map.svg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function page() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [provider, setProvider] = useState("");
  const [roomSize, setRoomSize] = useState("");
  const [noOfRooms, setNoOfRooms] = useState("");
  const [formData, setFormData] = useState({});
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedProfessionals, setSelectedProfessionals] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

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

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCategory(value);
    setSubCategories(categories[value] || []);
  };

  const handleSubCategory = (value: string) => {
    setSubCategory(value);
  };

  const handleProvider = (value: string) => {
    setProvider(value);
  };

  const handleRoomSize = (value: string) => {
    setRoomSize(value);
  };

  const handleNumberOfRooms = (value: string) => {
    setNoOfRooms(value);
  };

  const handleSelectHour = (hour: any) => {
    setSelectedHour(hour);
  };

  const handleSelectProfessional = (professionals: any) => {
    setSelectedProfessionals(professionals);
  };

  const handleSelectOption = (option: any) => {
    setSelectedOption(option);
  };

  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // List of services
  const services: string[] = [
    "Oven",
    "Laundry",
    "Fridge",
    "Ironing",
    "Balcony",
    "Cupboard",
  ];

  const handleCheckboxChange = (service: string): void => {
    selectedServices.includes(service)
      ? setSelectedServices(selectedServices.filter((item) => item !== service))
      : setSelectedServices([...selectedServices, service]);
   
  };

  const nextBtn = () => {
    (!category || !subCategory || !provider || !selectedHour || !roomSize || !noOfRooms || !selectedOption) ? alert('Please fill all the fields') :  setFormData({
      provider,
      category,
      subCategory,
      selectedHour,
      roomSize,
      noOfRooms,
      selectedOption,
      AdditionalServices:selectedServices
      
    })
    console.log(formData);
  };

  return (
    <>
      <div className="bg-[#F5F7FA] min-h-screen w-full flex items-start justify-start pt-2">
        <div className="w-full max-w-7xl px-8 lg:px-16 mt-6">
          <h1 className="text-2xl font-bold mt-2">Add Jobs</h1>
          <div className="grid w-full items-center gap-1.5 mt-6">
            <Select required onValueChange={handleProvider} value={provider}>
              <SelectTrigger className="w-full h-[55px] rounded-lg border border-[#4BB1D3] bg-gray-50 mt-1 pr-6 outline-[#4BB1D3] focus:border-[#4BB1D3] focus:outline-none focus:border-none">
                <SelectValue placeholder="Select Provider Name" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select Provider Name</SelectLabel>
                  <SelectItem value="Haider Ali">Haider Ali</SelectItem>
                  <SelectItem value="Ahmed">Ahmed</SelectItem>
                  <SelectItem value="Muzammil">Muzammil</SelectItem>
                  <SelectItem value="Ashar">Ashar</SelectItem>
                  <SelectItem value="Abdullah">Abdullah</SelectItem>
                  <SelectItem value="Jawed">Jawed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col items-start space-y-6 mt-8">
            <h2 className="text-md font-semibold text-gray-800">
              How many hours do you need?
            </h2>

            <div className="flex space-x-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((hour) => (
                <button
                  key={hour}
                  onClick={() => handleSelectHour(hour)}
                  className={`flex items-center justify-center w-10 h-10 text-lg font-bold rounded-full border transition duration-300 ${
                    selectedHour === hour
                      ? "bg-[#4BB1D3] text-white border-[#4BB1D3]"
                      : "text-[#4BB1D3] border-[#4BB1D3] hover:bg-[#4BB1D3] hover:text-white"
                  }`}
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
                  onClick={() => {
                    handleSelectProfessional(professional);
                  }}
                  className={`flex items-center justify-center w-10 h-10 text-lg font-bold rounded-full border transition duration-300 ${
                    selectedProfessionals === professional
                      ? "bg-[#4BB1D3] text-white border-[#4BB1D3]"
                      : "text-[#4BB1D3] border-[#4BB1D3] hover:bg-[#4BB1D3] hover:text-white"
                  }`}
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
            <Select
              required
              onValueChange={handleCategoryChange}
              value={selectedCategory}
            >
              <SelectTrigger className="w-full h-[50px] rounded-lg border p-2 border-[#4BB1D3] bg-gray-50 outline-[#4BB1D3] focus:border-blue-500 focus:outline-none">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {Object.keys(categories).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {subCategories.length > 0 && (
              <div className="grid w-full items-center gap-1.5 mt-4">
                <label className="text-md font-semibold" htmlFor="subCategory">
                  Subcategory
                </label>
                <Select
                  required
                  value={subCategory}
                  onValueChange={handleSubCategory}
                >
                  <SelectTrigger className="w-full h-[50px] rounded-lg border p-2 border-[#4BB1D3] bg-gray-50 outline-[#4BB1D3] focus:border-blue-500 focus:outline-none">
                    <SelectValue placeholder="Select Subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Subcategories</SelectLabel>
                      {subCategories.map((subCategory) => (
                        <SelectItem key={subCategory} value={subCategory}>
                          {subCategory}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="grid w-full items-center gap-1.5 mt-6">
            <label className="text-md font-semibold" htmlFor="Room Area Size">
              Room Area Size
            </label>

            <Select onValueChange={handleRoomSize} value={roomSize}>
              <SelectTrigger className="w-full h-[55px] rounded-lg border border-[#4BB1D3] bg-gray-50 mt-1 pr-6 outline-[#4BB1D3] focus:border-[#4BB1D3] focus:outline-none focus:border-none">
                <SelectValue placeholder="Room Area Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Room Area Size</SelectLabel>
                  <SelectItem value="Haider Ali">Less than 50 m2</SelectItem>
                  <SelectItem value="101 - 150 m2">101 - 150 m2</SelectItem>
                  <SelectItem value="101 - 150 m2">101 - 150 m2</SelectItem>
                  <SelectItem value="151 - 200 m2">151 - 200 m2</SelectItem>
                  <SelectItem value="Over 200 m2">Over 200 m2</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid w-full items-center gap-1.5 mt-6">
            <label className="text-md font-semibold" htmlFor="Room Area Size">
              Numbers of Rooms
            </label>

            <Select
              required
              onValueChange={handleNumberOfRooms}
              value={noOfRooms}
            >
              <SelectTrigger className="w-full h-[55px] rounded-lg border border-[#4BB1D3] bg-gray-50 mt-1 pr-6 outline-[#4BB1D3] focus:border-[#4BB1D3] focus:outline-none focus:border-none">
                <SelectValue placeholder="Number of Rooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Room Area Size</SelectLabel>
                  <SelectItem value="1 Room">1 Room</SelectItem>
                  <SelectItem value="2 Room">2 Room</SelectItem>
                  <SelectItem value="3 Room">3 Room</SelectItem>
                  <SelectItem value="4 Room">4 Room</SelectItem>
                  <SelectItem value="5 Room">5 Room</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Cleaning Material started */}

          <div className="grid w-full items-center gap-1.5 mt-6">
            <p className="text-md font-semibold text-gray-800">
              Need cleaning materials?
            </p>

            <div className="flex space-x-4 mt-2">
              {["No, I have them", "Yes, Please"].map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelectOption(option)}
                  className={`px-4 py-2 rounded-full text-md font-medium transition duration-300 ${
                    selectedOption === option
                      ? "bg-[#00A0E0] text-white"
                      : "bg-[#d5dce4] text-black hover:bg-[#00A0E0] hover:text-white"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Additional Services Started */}

          <div className="grid w-full items-center gap-1.5 mt-6">
            <p className="text-lg font-semibold text-gray-800 mt-3">
              Additional Services
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
              {services.map((service) => (
                <label
                  key={service}
                  className="flex items-center space-x-2 rounded-lg p-3 border border-gray-200 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="form-checkbox h-6 w-6 text-blue-600"
                    checked={selectedServices.includes(service)}
                    onChange={() => handleCheckboxChange(service)}
                  />
                  <span className="text-gray-700 font-medium">{service}</span>
                </label>
              ))}
            </div>

            {selectedServices.length > 0 && (
              <div className="mt-4 text-sm text-gray-600">
                Selected Services:{" "}
                <span className="font-bold">{selectedServices.join(", ")}</span>
              </div>
            )}
          </div>

          <div className="grid w-full items-center gap-1.5 mt-3">
            <p className="font-semibold">Photos</p>
            <div className="flex justify-between flex-wrap">
              {/* Displaying existing images */}
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

              {/* Upload Button */}
              <div className="w-[108px] h-[99.52px] flex items-center justify-center">
                <label
                  htmlFor="upload"
                  className="cursor-pointer w-full h-full flex justify-center items-center border-2 border-[#00BFFF] rounded-lg"
                >
                  <span className="text-sm text-gray-600">Upload</span>
                  <input
                    id="upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
          </div>
          {/* location */}

          <div className="grid w-full items-center gap-1.5 mt-6">
            <p className="text-lg font-bold mt-2">Location</p>

            <Image
              className="mt-4 w-full h-[180px] object-cover"
              src={map}
              alt="map"
            />
          </div>

          <div className="mt-8 flex justify-center items-center">
            <Button
              onClick={nextBtn}
              className="w-[250px] mb-4 mt-6 h-[45px] text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out"
            >
              <span>Next</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;





























