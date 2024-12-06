"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import {useTranslations} from 'next-intl';



const Payments = () => {
  const t = useTranslations('Payments');
  const services = [
    { name: "Text 1", price: "10%" },
    { name: "Text 2", price: "20%" },
    { name: "Text 3", price: "60%" },
    { name: "Text 4", price: "45%" },
    
  ];
  const [openEditDelete, setOpenEditDelete] = useState<null | number>(null);

  const handleEditDeleteToggle = (index: number) => {
    setOpenEditDelete(openEditDelete === index ? null : index);
  };

  return (
   <div className="bg-[#F5F7FA] min-h-screen w-full">
  <Link href={"payments/AddPayments"}>
    <div className="flex justify-end overflow-hidden">
      <Button className="border-[#4BB1D3] w-[80px] h-[40px] mt-5 mr-8 text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00BFFF] sm:w-[100px] sm:h-[45px]">
        {(t('add_button'))}
      </Button>
    </div>
  </Link>

  <div className="container mx-auto px-4 py-8">
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {services.map((service, index) => (
        <div
          key={index}
          className="relative bg-white p-6 rounded-xl border border-gray-300 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-104 cursor-pointer"
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
                <span>{(t('edit'))}</span>
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
                <span>{(t('delete'))}</span>
              </button>
            </div>
          )}

          <h3 className="text-lg font-semibold text-gray-900 mb-2">
             {(t('name'))}: {service.name}
          </h3>
          <p className="text-lg font-medium text-gray-700 mb-4">
            {t('percentage')}: {service.price}
          </p>

          <hr className="my-4 border-gray-200" />

          <h3 className="text-lg font-semibold text-gray-900 mb-2">
             {(t('name'))}: Text
          </h3>
          <p className="text-lg font-medium text-gray-700 mb-4">
            {t('percentage')}: 30%
          </p>
        
        </div>
      ))}
    </div>
  </div>
</div>
  );
};

export default Payments;
























