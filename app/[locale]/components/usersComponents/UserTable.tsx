"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useTranslations} from 'next-intl';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  faEllipsisV,
  faEdit,
  faTrashAlt,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

interface Invoice {
  Name: string;
  email: string;
  PhoneNo: string;
  role: string;
  address: string;
  gender: string;
  dateBirth: string;
}

const invoices: Invoice[] = [
  {
    Name: "John Doe",
    email: "john.doe@example.com",
    PhoneNo: "(123) 456-7890",
    role: "User",
    address: "123 Main St, Springfield",
    gender: "Male",
    dateBirth: "1985-01-15",
  },
  {
    Name: "Jane Smith",
    email: "jane.smith@example.com",
    PhoneNo: "(987) 654-3210",
    role: "Provider",
    address: "456 Oak St, Metropolis",
    gender: "Female",
    dateBirth: "1990-06-23",
  },
  {
    Name: "Jane Smith",
    email: "jane.smith@example.com",
    PhoneNo: "(987) 654-3210",
    role: "User",
    address: "456 Oak St, Metropolis",
    gender: "Female",
    dateBirth: "1990-06-23",
  },
  {
    Name: "Jane Smith",
    email: "jane.smith@example.com",
    PhoneNo: "(987) 654-3210",
    role: "Provider",
    address: "456 Oak St, Metropolis",
    gender: "Female",
    dateBirth: "1990-06-23",
  },
  {
    Name: "Jane Smith",
    email: "jane.smith@example.com",
    PhoneNo: "(987) 654-3210",
    role: "User",
    address: "456 Oak St, Metropolis",
    gender: "Female",
    dateBirth: "1990-06-23",
  },
  {
    Name: "Jane Smith",
    email: "jane.smith@example.com",
    PhoneNo: "(987) 654-3210",
    role: "Provider",
    address: "456 Oak St, Metropolis",
    gender: "Female",
    dateBirth: "1990-06-23",
  },
  {
    Name: "Jane Smith",
    email: "jane.smith@example.com",
    PhoneNo: "(987) 654-3210",
    role: "User",
    address: "456 Oak St, Metropolis",
    gender: "Female",
    dateBirth: "1990-06-23",
  },
 
 
  
];

export function TableDemo() {
  const t = useTranslations('Users');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [openEditDelete, setOpenEditDelete] = useState<number | null>(null);

  const handleToggleMoreInfo = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (openEditDelete !== null) {
      setOpenEditDelete(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openEditDelete]);

  return (
    <div className="bg-[#F5F7FA] min-h-screen w-full px-8">
      <div className="overflow-hidden rounded-lg shadow-lg w-full mt-4">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader>
            <TableRow className="bg-gray-200 hover:bg-gray-200">
              <TableHead className="px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-700">
               {(t('name'))}
              </TableHead>
              <TableHead className="px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-700">
               {(t('email'))}
              </TableHead>
              <TableHead className="px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 hidden md:table-cell">
            
                {(t('phoneNo'))}
              </TableHead>
              <TableHead className="px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 hidden md:table-cell">
                
                {(t('role'))}
              </TableHead>
              <TableHead className="px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 hidden lg:table-cell">
                
                {(t('address'))}
              </TableHead>
              <TableHead className="px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 hidden lg:table-cell">
               
                {(t('gender'))}
              </TableHead>
              <TableHead className="px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 hidden lg:table-cell">
               
                {(t('dateOfBirth'))}
              </TableHead>
              <TableHead className="px-6 py-4 text-center text-xs sm:text-sm font-semibold text-gray-700">
                
                {(t('actions'))}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            {invoices.map((invoice, index) => (
              <React.Fragment key={index}>
                <TableRow className="hover:bg-gray-50 focus-within:bg-gray-100 focus-within:outline focus-within:outline-2 focus-within:outline-none transition duration-300 ease-in-out">
                  <TableCell className="px-6 py-4 text-sm font-medium text-gray-800">
                    {invoice.Name}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-600">
                  {invoice.email}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">
                  {invoice.PhoneNo}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 border text-[#00BFFF]">
                    {invoice.role}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-600 hidden lg:table-cell">
                  {invoice.address}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-600 hidden lg:table-cell">
                  {invoice.gender}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-600 hidden lg:table-cell">
                  {invoice.dateBirth}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-center text-sm font-medium relative">
                    <div className="flex items-center justify-center space-x-3">
                      <button
                        className="md:hidden text-[#00BFFF] hover:text-[#00BFFF] transition-colors duration-200 focus:outline-none flex items-center"
                        onClick={() => handleToggleMoreInfo(index)}
                      >
                        <FontAwesomeIcon
                          icon={
                            expandedRow === index ? faChevronUp : faChevronDown
                          }
                          className="w-5 h-5"
                        />
                        <span className="ml-1 text-sm">More</span>
                      </button>
                      <button
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenEditDelete(
                            openEditDelete === index ? null : index
                          );
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faEllipsisV}
                          className="w-5 h-5"
                        />
                      </button>
                    </div>

                    {openEditDelete === index && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-10 border border-gray-100">
                        <button
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 w-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log("Edit clicked");
                            setOpenEditDelete(null);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faEdit}
                            className="w-4 h-4 mr-2"
                          />
                         {(t('edit'))}
                        </button>
                        <button
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 w-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log("Delete clicked");
                            setOpenEditDelete(null);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            className="w-4 h-4 mr-2"
                          />
                         {(t('delete'))}
                        </button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>

                {/* Expanded Row for More Info */}
                {expandedRow === index && (
                  <TableRow className="md:hidden">
                    <TableCell colSpan={8} className="px-6 py-4 bg-gray-50">
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                          <span className="font-medium text-gray-600">
                            {(t('phone'))}:
                          </span>
                          <span className="text-gray-800">
                            {invoice.PhoneNo}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                          <span className="font-medium text-gray-600">
                          {(t('role'))}:
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {invoice.role}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                          <span className="font-medium text-gray-600">
                          {(t('address'))}:
                          </span>
                          <span className="text-gray-800">
                            {invoice.address}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                          <span className="font-medium text-gray-600">
                          {(t('gender'))}:
                          </span>
                          <span className="text-gray-800">
                            {invoice.gender}
                          </span>
                        </div>
                        <div className="flex justify-between items-center pb-2">
                          <span className="font-medium text-gray-600">
                          {(t('dateOfBirth'))}:
                          </span>
                          <span className="text-gray-800">
                            {invoice.dateBirth}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
