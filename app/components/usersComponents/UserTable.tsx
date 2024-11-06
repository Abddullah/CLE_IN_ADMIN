"use client";

import { useState } from "react";
import Image from "next/image";
import editIcon from "../../../assets/categoriesIcons/edit.svg";
import deleteIcon from "../../../assets/categoriesIcons/delete.svg";
import dots from "../../../assets/categoriesIcons/dots.svg";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    role: "Manager",
    address: "123 Main St, Springfield",
    gender: "Male",
    dateBirth: "1985-01-15",
  },
  {
    Name: "Jane Smith",
    email: "jane.smith@example.com",
    PhoneNo: "(987) 654-3210",
    role: "Developer",
    address: "456 Oak St, Metropolis",
    gender: "Female",
    dateBirth: "1990-06-23",
  },{
    Name: "Jane Smith",
    email: "jane.smith@example.com",
    PhoneNo: "(987) 654-3210",
    role: "Developer",
    address: "456 Oak St, Metropolis",
    gender: "Female",
    dateBirth: "1990-06-23",
  },{
    Name: "Jane Smith",
    email: "jane.smith@example.com",
    PhoneNo: "(987) 654-3210",
    role: "Developer",
    address: "456 Oak St, Metropolis",
    gender: "Female",
    dateBirth: "1990-06-23",
  },{
    Name: "Jane Smith",
    email: "jane.smith@example.com",
    PhoneNo: "(987) 654-3210",
    role: "Developer",
    address: "456 Oak St, Metropolis",
    gender: "Female",
    dateBirth: "1990-06-23",
  },{
    Name: "Jane Smith",
    email: "jane.smith@example.com",
    PhoneNo: "(987) 654-3210",
    role: "Developer",
    address: "456 Oak St, Metropolis",
    gender: "Female",
    dateBirth: "1990-06-23",
  },
];

export function TableDemo() {
  const [showOptions, setShowOptions] = useState<number | null>(null);

  const handleActionClick = (index: number) => {
    setShowOptions(showOptions === index ? null : index);
  };

  return (
    <div className="overflow-x-auto p-4 relative"> 
      <Table className="min-w-full border border-gray-200 rounded-lg shadow-md">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="p-2 text-left text-xs md:text-sm lg:text-base">
              Name
            </TableHead>
            <TableHead className="p-2 text-left text-xs md:text-sm lg:text-base">
              Email Address
            </TableHead>
            <TableHead className="p-2 text-left text-xs md:text-sm lg:text-base hidden md:table-cell">
              Phone Number
            </TableHead>
            <TableHead className="p-2 text-left text-xs md:text-sm lg:text-base hidden md:table-cell">
              Role
            </TableHead>
            <TableHead className="p-2 text-left text-xs md:text-sm lg:text-base hidden lg:table-cell">
              Address
            </TableHead>
            <TableHead className="p-2 text-left text-xs md:text-sm lg:text-base hidden lg:table-cell">
              Gender
            </TableHead>
            <TableHead className="p-2 text-right text-xs md:text-sm lg:text-base hidden lg:table-cell">
              Date of Birth
            </TableHead>
            <TableHead className="p-2 text-xs md:text-sm lg:text-base">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice, index) => (
            <TableRow
              key={index}
              className="even:bg-gray-50 hover:bg-gray-100 transition-colors relative"
            >
              <TableCell className="p-2 font-medium text-xs md:text-sm lg:text-base">
                {invoice.Name}
              </TableCell>
              <TableCell className="p-2 text-xs md:text-sm lg:text-base">
                {invoice.email}
              </TableCell>
              <TableCell className="p-2 text-xs md:text-sm lg:text-base hidden md:table-cell">
                {invoice.PhoneNo}
              </TableCell>
              <TableCell className="p-2 text-xs md:text-sm lg:text-base hidden md:table-cell">
                {invoice.role}
              </TableCell>
              <TableCell className="p-2 text-xs md:text-sm lg:text-base hidden lg:table-cell">
                {invoice.address}
              </TableCell>
              <TableCell className="p-2 text-xs md:text-sm lg:text-base hidden lg:table-cell">
                {invoice.gender}
              </TableCell>
              <TableCell className="p-2 text-right text-xs md:text-sm lg:text-base hidden lg:table-cell">
                {invoice.dateBirth}
              </TableCell>

              <TableCell className="p-2 text-center relative">
                <button onClick={() => handleActionClick(index)}>
                  <Image src={dots} alt="Options" className="w-6 h-6 mr-2" />
                </button>

                {showOptions === index && (
                  <div className="absolute right-14 top-[-40px] w-32 bg-white border border-gray-200 rounded-lg shadow-md z-10">
                    <button
                      className="flex items-center w-full p-2 hover:bg-gray-100"
                      onClick={() => {
                        console.log("Edit clicked");
                        setShowOptions(null);
                      }}
                    >
                      <Image
                        src={editIcon}
                        alt="Edit"
                        className="w-4 h-4 mr-2"
                      />
                      <span>Edit</span>
                    </button>
                    <button
                      className="flex items-center w-full p-2 hover:bg-gray-100"
                      onClick={() => {
                        console.log("Delete clicked");
                        setShowOptions(null);
                      }}
                    >
                      <Image
                        src={deleteIcon}
                        alt="Delete"
                        className="w-4 h-4 mr-2"
                      />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
