"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../config/Firebase/FirebaseConfig"; 

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

export function TableDemo() {
  const t = useTranslations("Users");
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [openEditDelete, setOpenEditDelete] = useState<number | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]); // State to hold Firestore data

  // Fetch invoices from Firestore
  const fetchInvoices = async () => {
    const invoicesCollection = collection(db, "users");
    const invoiceSnapshot = await getDocs(invoicesCollection);
    const invoiceList = invoiceSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        Name: data.fullName || "",  // Handle missing field
        email: data.email || "", // Handle missing field
        PhoneNo: data.phone || "",  // Handle missing field
        role: data.role || "",
        address: data.address || "",
        gender: data.gender || "",
        dateBirth: data.dob || "",  // Handle missing field
      };
    });
    setInvoices(invoiceList);
  };

  // Add new invoice to Firestore
  const addInvoice = async (newInvoice: Invoice) => {
    const invoicesCollection = collection(db, "users");
    await addDoc(invoicesCollection, newInvoice);
    fetchInvoices(); 
  };

  useEffect(() => {
    fetchInvoices(); 
  }, []);

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
    <div className="w-full max-h-screen px-4 sm:px-8">
  <div className="overflow-hidden rounded-lg shadow-lg w-full mt-4">
    <Table className="table-auto w-full divide-y divide-gray-200">
      <TableHeader>
        <TableRow className="bg-gray-200">
          {[
            "name",
            "email",
            "phoneNo",
            "role",
            "address",
            "gender",
            "dateOfBirth",
            "actions",
          ].map((header, idx) => (
            <TableHead
              key={idx}
              className={`px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 ${
                header === "actions"
                  ? "text-center"
                  : idx > 1
                  ? "hidden sm:table-cell"
                  : ""
              }`}
            >
              {t(header)}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody className="divide-y divide-gray-200">
        {invoices.map((invoice, index) => (
          <React.Fragment key={index}>
            <TableRow className="hover:bg-gray-50 transition duration-300 ease-in-out">
              {[
                invoice.Name,
                invoice.email,
                invoice.PhoneNo,
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-[#00BFFF]">
                  {invoice.role}
                </span>,
                invoice.address,
                invoice.gender,
                invoice.dateBirth,
              ].map((value, idx) => (
                <TableCell
                  key={idx}
                  className={`px-4 py-3 text-[10px] sm:text-sm text-gray-600 ${
                    idx > 1 && idx < 7 ? "hidden sm:table-cell" : ""
                  }`}
                >
                  {value}
                </TableCell>
              ))}
              <TableCell className="px-4 py-3 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <button
                    className="sm:hidden text-[#00BFFF] hover:text-[#00BFFF] transition flex items-center"
                    onClick={() => handleToggleMoreInfo(index)}
                  >
                    <FontAwesomeIcon
                      icon={expandedRow === index ? faChevronUp : faChevronDown}
                      className="w-5 h-5"
                    />
                  </button>

                  <button
                    className="text-gray-400 hover:text-gray-600 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenEditDelete(openEditDelete === index ? null : index);
                    }}
                  >
                    <FontAwesomeIcon icon={faEllipsisV} className="w-5 h-5" />
                  </button>
                </div>

                {openEditDelete === index && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-10 border border-gray-100">
                    <button
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("Edit clicked");
                        setOpenEditDelete(null);
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} className="w-4 h-4 mr-2" />
                      {t("edit")}
                    </button>
                    <button
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("Delete clicked");
                        setOpenEditDelete(null);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} className="w-4 h-4 mr-2" />
                      {t("delete")}
                    </button>
                  </div>
                )}
              </TableCell>
            </TableRow>

            {expandedRow === index && (
              <TableRow className="sm:hidden">
                <TableCell colSpan={8} className="px-6 py-4 bg-gray-50">
                  <div className="space-y-3 text-sm">
                    {[
                      ["phone", invoice.PhoneNo],
                      ["role", invoice.role],
                      ["address", invoice.address],
                      ["gender", invoice.gender],
                      ["dateOfBirth", invoice.dateBirth],
                    ].map(([label, value], idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center border-b border-gray-200 pb-2"
                      >
                        <span className="font-medium text-gray-600">{t(label)}:</span>
                        <span className="text-gray-800 text-xs">{value}</span>
                      </div>
                    ))}
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
