"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

const services = [
  { name: "Oven", price: "20 Euro" },
  { name: "Laundry", price: "15 Euro" },
  { name: "Fridge", price: "30 Euro" },
  { name: "Ironing", price: "10 Euro" },
  { name: "Balcony Cupboard", price: "25 Euro" },
  { name: "Cupboard", price: "18 Euro" },
];

const AdditionalServices = () => {
  const [openEditDelete, setOpenEditDelete] = useState<null | number>(null);

  const handleEditDeleteToggle = (index: number) => {
    setOpenEditDelete(openEditDelete === index ? null : index);
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen w-full">
      <Link href={"additionalServices/addAdditionalService"}>
        <div className="flex justify-end overflow-hidden">
          <Button className="border-[#4BB1D3] w-[80px] h-[40px] mt-5 mr-8 text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00BFFF] sm:w-[100px] sm:h-[45px]">
            ADD
          </Button>
        </div>
      </Link>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Additional Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative bg-white p-6 rounded-xl border border-gray-300 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
            >
              <div className="absolute top-4 right-4">
                <button
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => handleEditDeleteToggle(index)}
                >
                  <FontAwesomeIcon icon={faEllipsisV} className="text-xl" />
                </button>
              </div>

              {openEditDelete === index && (
                <div className="absolute right-0 top-8 w-36 bg-white border border-gray-200 rounded-lg shadow-md z-10">
                  <button
                    className="flex items-center w-full p-2 hover:bg-gray-100"
                    onClick={() => {
                      setOpenEditDelete(null);
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} className="w-4 h-4 mr-2" />
                    <span>Edit</span>
                  </button>
                  <button
                    className="flex items-center w-full p-2 hover:bg-gray-100"
                    onClick={() => {
                      setOpenEditDelete(null);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="w-4 h-4 mr-2"
                    />
                    <span>Delete</span>
                  </button>
                </div>
              )}

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {service.name}
              </h3>
              <p className="text-lg font-medium text-gray-700 mb-4">
                Price: {service.price}
              </p>

              <div className="mt-4">
                <button className="w-full py-2 px-4 bg-[#4BB1D3] text-white rounded-lg hover:bg-[#59ccf2] transition-colors">
                  Add Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdditionalServices;
