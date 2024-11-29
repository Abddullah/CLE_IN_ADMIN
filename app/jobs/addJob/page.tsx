"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
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
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

function page() {
  interface Props {
    provider: string;
    category: string;
    subCategory: string;
    selectedHour: any;
    roomSize: string;
    noOfRooms: string;
    selectedOption: string;
    AdditionalServices: string[];
  }

  type FormInputs = {
    provider: string;
    category: string;
    subcategory: string;
    hour: number;
    professional: number;
    roomsizes: string;
    numberofrooms: string;
    needmaterial: string;
    Additionalservices: string[];
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
  } = useForm<FormInputs>({
    defaultValues: {
      Additionalservices: [],
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
    alert("Form submitted sucessfully");
  };

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [provider, setProvider] = useState("");
  const [roomSize, setRoomSize] = useState("");
  const [noOfRooms, setNoOfRooms] = useState("");

  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [selectedProfessionals, setSelectedProfessionals] = useState<
    number | null
  >(null);
  const [selectedOption, setSelectedOption] = useState("");

  const router = useRouter();

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

  const handleSelectHour = (hour: any) => {
    setSelectedHour(hour);
    setValue("hour", hour);
  };

  const handleSelectProfessional = (professional: number) => {
    setSelectedProfessionals(professional);
    setValue("professional", professional);
    clearErrors("professional");
  };

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };

  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const services: string[] = [
    "Oven",
    "Laundry",
    "Fridge",
    "Ironing",
    "Balcony",
    "Cupboard",
  ];

  const handleCheckboxChange = (service: string): void => {
    setSelectedServices((prevSelectedServices) => {
      const updatedServices = prevSelectedServices.includes(service)
        ? prevSelectedServices.filter((item) => item !== service)
        : [...prevSelectedServices, service];

      setValue("Additionalservices", updatedServices);

      return updatedServices;
    });
  };

  return (
    <>
      {/* <div className="bg-[#F5F7FA] h-screen w-full flex items-start justify-start"> */}
      {/* <div className="bg-[#F5F7FA] min-h-screen w-full flex items-start justify-start">
       */}
       <div className="bg-[#F5F7FA] min-h-screen w-full flex items-start justify-start">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-6xl px-8 lg:px-16 mt-6"
          >
            <h1 className="text-2xl font-bold mt-2">Add Jobs</h1>
            <div className="grid w-full h-full items-center gap-1.5 mt-6">
              <Controller
                name="provider"
                control={control}
                rules={{
                  required: "Provider name is required",
                }}
                render={({ field: { value, onChange } }) => (
                  <Select onValueChange={onChange} value={value}>
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
                )}
              />
              {errors.provider && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.provider.message}
                </p>
              )}
            </div>

            <div className="flex flex-col items-start space-y-6 mt-8">
              <h2 className="text-md font-semibold text-gray-800">
                How many hours do you need?
              </h2>

              <Controller
                name="hour"
                control={control}
                rules={{
                  required: "Please select the hour you required",
                }}
                render={({ field }) => (
                  <div className="flex space-x-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((hour) => (
                      <button
                        key={hour}
                        type="button"
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
                )}
              />
              {errors.hour && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.hour.message}
                </p>
              )}
            </div>
            <div className="grid w-full items-center gap-1.5 mt-6">
              <h2 className="text-md font-semibold text-gray-800">
                How many professionals do you need?
              </h2>

              <Controller
                name="professional"
                control={control}
                rules={{
                  required: "Please select the professional you required",
                }}
                render={({ field }) => (
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
                )}
              />
              {errors.professional && (
                <p className="text-red-500 mt-2 text-sm">
                  {errors.professional.message}
                </p>
              )}
            </div>

            <div className="grid w-full items-center gap-1.5 mt-3">
              <p className="text-xl font-semibold mt-6 mb-4">Select Category</p>
              <label className="text-md font-semibold" htmlFor="category">
                Category
              </label>
              <Controller
                name="category"
                control={control}
                rules={{
                  required: "Category is required",
                }}
                render={({ field }) => (
                  <Select
                    value={selectedCategory}
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleCategoryChange(value);
                    }}
                  >
                    <SelectTrigger className="w-full h-[55px] rounded-lg border p-4 pr-6 border-[#4BB1D3] bg-gray-50 outline-[#4BB1D3] focus:border-blue-500 focus:outline-none">
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
                )}
              />
              {errors.category && (
                <p className="text-red-500 mt-2 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Subcategory Field */}
            {subCategories.length > 0 && (
              <div className="grid w-full items-center gap-1.5 mt-4">
                <label className="text-md font-semibold" htmlFor="subcategory">
                  Subcategory
                </label>
                <Controller
                  name="subcategory"
                  control={control}
                  rules={{
                    required: "Subcategory is required",
                  }}
                  render={({ field: { value, onChange } }) => (
                    <Select value={value} onValueChange={onChange}>
                      <SelectTrigger className="w-full h-[55px] rounded-lg border p-4 pr-6 border-[#4BB1D3] bg-gray-50 outline-[#4BB1D3] focus:border-blue-500 focus:outline-none">
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
                  )}
                />
                {errors.subcategory && (
                  <p className="text-red-500 mt-2 text-sm">
                    {errors.subcategory.message}
                  </p>
                )}
              </div>
            )}
            <div className="grid w-full items-center gap-1.5 mt-6">
              <label className="text-md font-semibold" htmlFor="Room Area Size">
                Room Area Size
              </label>
              <Controller
                name="roomsizes"
                control={control}
                rules={{
                  required: "Room Size is required",
                }}
                render={({ field: { value, onChange } }) => (
                  <Select onValueChange={onChange} value={value}>
                    <SelectTrigger className="w-full h-[55px] rounded-lg border border-[#4BB1D3] bg-gray-50 mt-1 pr-6 outline-[#4BB1D3] focus:border-[#4BB1D3] focus:outline-none focus:border-none">
                      <SelectValue placeholder="Room Area Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Room Area Size</SelectLabel>
                        <SelectItem value="Less than 50m2">
                          Less than 50 m2
                        </SelectItem>
                        <SelectItem value="101 - 150 m2">
                          101 - 150 m2
                        </SelectItem>

                        <SelectItem value="151 - 200 m2">
                          151 - 200 m2
                        </SelectItem>
                        <SelectItem value="Over 200 m2">Over 200 m2</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.roomsizes && (
                <p className="text-red-500 mt-2 text-sm">
                  {errors.roomsizes.message}
                </p>
              )}
            </div>

            <div className="grid w-full items-center gap-1.5 mt-6">
              <label className="text-md font-semibold" htmlFor="Room Area Size">
                Numbers of Rooms
              </label>
              <Controller
                name="numberofrooms"
                control={control}
                rules={{
                  required: "Number of rooms is required",
                }}
                render={({ field: { value, onChange } }) => (
                  <Select onValueChange={onChange} value={value}>
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
                )}
              />
              {errors.numberofrooms && (
                <p className="text-red-500 mt-2 text-sm">
                  {errors.numberofrooms.message}
                </p>
              )}
            </div>

            {/* Cleaning Material started */}

            <div className="grid w-full items-center gap-1.5 mt-6">
              <p className="text-md font-semibold ">Need cleaning materials?</p>

              <Controller
                name="needmaterial"
                control={control}
                rules={{ required: "Please select an option." }}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <>
                    <div className="flex space-x-4 mt-2">
                      {["No, I have them", "Yes, Please"].map((option) => (
                        <button
                          type="button"
                          key={option}
                          onClick={() => {
                            onChange(option);
                            handleSelectOption(option);
                          }}
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
                    {error && (
                      <p className="text-red-600 text-sm mt-2">
                        {error.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            <div className="grid w-full items-center gap-1.5 mt-6">
              <h3 className="text-md font-semibold">
                Select Additional Services
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                {services.map((service) => (
                  <div key={service}>
                    <label className="flex items-center space-x-2 rounded-lg p-3 border border-gray-200 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
                      <input
                        type="checkbox"
                        className="form-checkbox h-6 w-6 text-blue-600"
                        value={service}
                        {...register("Additionalservices")}
                        checked={selectedServices.includes(service)}
                        onChange={() => {
                          handleCheckboxChange(service);
                        }}
                      />
                      <span className="text-gray-700 font-medium">
                        {service}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid w-full items-center gap-1.5 mt-3">
              <p className="font-semibold">Photos</p>
              <div className="flex justify-between flex-wrap">
                <div className="w-[108px] h-[99.52px]">
                  <Image
                    src="/assets/servicesIcons/cardImage.svg"
                    alt="djdj"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="w-[108px] h-[99.52px]">
                  <Image
                    src="/assets/servicesIcons/factory.svg"
                    alt="djdj"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="w-[108px] h-[99.52px]">
                  <Image
                    src="/assets/servicesIcons/hospital.svg"
                    alt="hospital-image"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="w-[108px] h-[99.52px]">
                  <Image
                    src="/assets/servicesIcons/cardImage.svg"
                    width={100}
                    height={100}
                    alt="services-image"
                  />
                </div>
                <div className="w-[108px] h-[99.52px]">
                  <Image
                    src="/assets/servicesIcons/factory.svg"
                    alt="factory-image"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="w-[108px] h-[99.52px]">
                  <Image
                    src="/assets/servicesIcons/office.svg"
                    alt="office-image"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="w-[108px] h-[99.52px]">
                  <Image
                    src="/assets/servicesIcons/hospital.svg"
                    alt="hospital-image"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="w-[108px] h-[99.52px]">
                  <Image
                    src="/assets/servicesIcons/office.svg"
                    alt="office-image"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="w-[108px] h-[99.52px]">
                  <Image
                    src="/assets/servicesIcons/cardImage.svg"
                    alt="servies-image"
                    width={100}
                    height={100}
                  />
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
                src="/assets/bookingsIcon/map.svg"
                width={1000}
                height={900}
                alt="map"
              />
            </div>

            <div className="mt-8 flex justify-center items-center">
              <Button
                type="submit"
                className="w-[250px] mb-4 mt-6 h-[45px] text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out"
              >
                <span>Next</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default page;
