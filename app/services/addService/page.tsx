"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useState } from "react";
import map from "../../../assets/bookingsIcon/map.svg";
import { useRef } from "react";
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
    fixRate: string;
    descriptionValue: string;
    slotTimes: object;
  }
  type FormInputs = {
    provider: string;
    category: string;
    subcategory: string;
    fixRate: string;  
    description:string;
    
    
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
    clearErrors

  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
    alert("Form submitted sucessfully")
    
  }


  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [provider, setProvider] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [fixRate, setFixRate] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  let [formData, setFormData] = useState<Props | any>("");
  const [slotTimes, setSlotTimes] = useState<Record<string, any>>({});

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

  const router = useRouter();

  const description = useRef<HTMLTextAreaElement>(null);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCategory(value);
    setSubCategories(categories[value] || []);
  };

  const handleProvider = (value: string) => {
    setProvider(value);
  };

  const handleSubCategory = (value: string) => {
    setSubCategory(value);
  };

  const handleFixRate = (value: string) => {
    setFixRate(value);
  };

  const handleDescription = () => {
    if (description.current) {
      setDescriptionValue(description.current.value);
      return;
    }
  };

  const handleCheckboxChange = (day: string) => {
    setSlotTimes((prev) => {
      const updatedSlotTimes = { ...prev };

      if (updatedSlotTimes[day]) {
        updatedSlotTimes[day].checked = !updatedSlotTimes[day].checked;
      } else {
        updatedSlotTimes[day] = { checked: true, open: "", close: "" };
      }

      if (!updatedSlotTimes[day].checked) {
        delete updatedSlotTimes[day];
      }

      return updatedSlotTimes;
    });
  };

  const handleInputChange = (
    day: string,
    field: "open" | "close",
    value: string
  ) => {
    setSlotTimes((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(slotTimes);

    const checkedSlotTimes = Object.keys(slotTimes).map((day) => ({
      day,
      open: slotTimes[day].open,
      close: slotTimes[day].close,
    }));

    console.log("Checked Slot Times:", checkedSlotTimes);
  };

 

  return (
    <>
      <div className="bg-[#F5F7FA] min-h-screen w-full flex items-start justify-start">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-6xl px-8 lg:px-16 mt-6">
          <h1 className="text-2xl font-bold mt-2">Add Services</h1>

          <div className="grid w-full items-center gap-1.5 mt-6">
          <Controller
                name="provider"
                control={control}
                rules={{
                  required: "Provider name is required",
                }}
                render={({ field: { value, onChange } }) => (
            <Select  onValueChange={onChange} value={value}>
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
              
              onValueChange={handleCategoryChange}
              value={selectedCategory}
            >
              <SelectTrigger className="w-full h-[55px] rounded-lg border p-4 pr-6 border-[#4BB1D3] bg-gray-50 outline-[#4BB1D3] focus:border-blue-500 focus:outline-none ">
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
            <p className="text-red-500 mt-2 text-sm">{errors.category.message}</p>
          )}


            {subCategories.length > 0 && (
              <div className="grid w-full items-center gap-1.5 mt-4">
                <label className="text-md font-semibold" htmlFor="subCategory">
                  Subcategory
                </label>
                <Controller
              name="subcategory"
              control={control}
              rules={{
                required: "Subcategory is required",
              }}
              render={({ field: { value, onChange } }) => (
               
                <Select
                  
                  value={value}
                  onValueChange={onChange}
                >
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
              <p className="text-red-500 mt-2 text-sm">{errors.subcategory.message}</p>
            )}
            
                 
              </div>
            )}
          </div>

          <div className="grid w-full items-center gap-1.5 mt-6">
            <div className="w-full">
              <label className="text-md font-semibold" htmlFor="AdFixedRate">
                Ad Fixed Rate
              </label>
              <Controller
                name="fixRate"
                control={control}
                rules={{
                  required: "Fix Rate is required",
                }}
                render={({ field: { value, onChange } }) => (
              <Select  value={value} onValueChange={onChange}>
                <SelectTrigger className="w-full h-[55px] rounded-lg border border-[#4BB1D3] bg-gray-50 mt-1 pr-6 outline-[#4BB1D3] focus:border-[#4BB1D3] focus:outline-none focus:border-none">
                  <SelectValue placeholder="Add Fix Rate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fix Rate</SelectLabel>
                    <SelectItem value="5 Euro">5 Euro</SelectItem>
                    <SelectItem value="6 Euro">6 Euro</SelectItem>
                    <SelectItem value="7 Euro">7 Euro</SelectItem>
                    <SelectItem value="8 Euro">8 Euro</SelectItem>
                    <SelectItem value="9 Euro">9 Euro</SelectItem>
                    <SelectItem value="10 Euro">10 Euro</SelectItem>
                    <SelectItem value="11 Euro">11 Euro</SelectItem>
                    <SelectItem value="12 Euro">12 Euro</SelectItem>
                    <SelectItem value="13 Euro">13 Euro</SelectItem>
                    <SelectItem value="14 Euro">14 Euro</SelectItem>
                    <SelectItem value="15 Euro">15 Euro</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
                )}
                />
                 {errors.fixRate && (
              <p className="text-red-500 mt-2 text-sm">{errors.fixRate.message}</p>
            )}
            </div>
          </div>

          <div className="grid w-full items-center gap-1.5 mt-3">
            <p className="text-md font-semibold">Description</p>
            <Textarea
              
              
              {...register("description", { required: true })}
              className="w-full h-[85px] rounded-lg border-[#4BB1D3] focus:border-blue-500 focus:outline-none"
              placeholder="Description"
            />
            {errors.description && <span className="text-red-600 text-sm">description is required</span>}
          </div>

          <div className="grid w-full items-center gap-1.5 mt-3">
            <p className="font-semibold">Photos</p>
            <div className="flex justify-between flex-wrap">
              {/* Displaying existing images */}
              <div className="w-[108px] h-[99.52px]">
                <Image src="/assets/servicesIcons/cardImage.svg" alt="room-image" width={100} height={100} />
              </div>
              <div className="w-[108px] h-[99.52px]">
                <Image src="/assets/servicesIcons/factory.svg" alt="factory-image" width={100} height={100} />
              </div>
              <div className="w-[108px] h-[99.52px]">
                <Image src="/assets/servicesIcons/hospital.svg" alt="hospital-image" width={100} height={100} />
              </div>
              <div className="w-[108px] h-[99.52px]">
                <Image src="/assets/servicesIcons/cardImage.svg" alt="djdj" width={100} height={100} />
              </div>
              <div className="w-[108px] h-[99.52px]">
                <Image src="/assets/servicesIcons/factory.svg" alt="djdj" width={100} height={100}/>
              </div>
              <div className="w-[108px] h-[99.52px]">
                <Image src="/assets/servicesIcons/office.svg" alt="djdj" width={100} height={100} />
              </div>
              <div className="w-[108px] h-[99.52px]">
                <Image src="/assets/servicesIcons/hospital.svg" alt="djdj" width={100} height={100} />
              </div>
              <div className="w-[108px] h-[99.52px]">
                <Image src="/assets/servicesIcons/office.svg" alt="djdj" width={100} height={100} />
              </div>
              <div className="w-[108px] h-[99.52px]">
                <Image src="/assets/servicesIcons/cardImage.svg" alt="djdj" width={100} height={100} />
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

          <div className="grid w-full items-center gap-1.5 mt-6">
            <p className="text-lg font-bold mt-2">Location</p>

            <Image
              className="mt-4 w-full h-[180px] object-cover"
              src="/assets/bookingsIcon/map.svg"
              width={10} height={10}
              alt="map"
            />
          </div>

         

          <div className="grid w-full items-center gap-1.5 mt-3">
            <h1 className="text-xl font-semibold mt-6 text-gray-800 mb-6">
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
                      checked={slotTimes[day.toLowerCase()]?.checked || false}
                      onChange={() => handleCheckboxChange(day.toLowerCase())}
                    />
                    <label
                      htmlFor={day.toLowerCase()}
                      className="font-semibold text-lg text-gray-700 w-1/4"
                    >
                      {day}
                    </label>

                    <div className="flex space-x-4 w-2/3 justify-end gap-1">
                      <input
                        type="text"
                        
                        className="w-[70px] sm:w-[105px] md:w-[105px] lg:w-[100px] h-[40px] rounded-lg bg-transparent focus:outline-none px-3 border-2 border-[#4BB1D3] focus:border-blue-500 placeholder-gray-400"
                        placeholder="Open"
                        id={`open-${day.toLowerCase()}`}
                        value={slotTimes[day.toLowerCase()]?.open || ""}
                        onChange={(e) =>
                          handleInputChange(
                            day.toLowerCase(),
                            "open",
                            e.target.value
                          )
                        }
                      />

                      <input
                        type="text"
                        
                        className="w-[70px] sm:w-[105px] md:w-[105px] lg:w-[100px] h-[40px] rounded-lg bg-transparent focus:outline-none px-3 border-2 border-[#4BB1D3] focus:border-blue-500 placeholder-gray-400"
                        placeholder="Close"
                        id={`close-${day.toLowerCase()}`}
                        value={slotTimes[day.toLowerCase()]?.close || ""}
                        onChange={(e) =>
                          handleInputChange(
                            day.toLowerCase(),
                            "close",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            
          </div>

          <div className="mt-6 flex justify-center items-center">
            {/* <Link href={"/services/reviewService"}> */}
            <Button
             type="submit"
              className="w-[200px] h-[45px] mb-6 mt-2 text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out"
            >
              <span>Next</span>
            </Button>
            {/* </Link> */}
          </div>
        </form>
      </div>
      </div>
    </>
  );
}

export default page;















