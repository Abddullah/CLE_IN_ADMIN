"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faEllipsisV,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../config/Firebase/FirebaseConfig";
import { useRouter } from "next/navigation";
import { useRef } from "react";

interface Invoice {
  Name: string;
  email: string;
  PhoneNo: string;
  role: string;
  address: string;
  gender: string;
  dateBirth: string;
  docId: string;
}

export function TableDemo() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [formData, setFormData] = useState<Invoice>({
    Name: "",
    email: "",
    PhoneNo: "",
    role: "",
    address: "",
    gender: "",
    dateBirth: "",
    docId: "",
  });
   const fetchInvoices = async () => {
    const invoicesCollection = collection(db, "users");
    const invoiceSnapshot = await getDocs(invoicesCollection);
    const invoiceList = invoiceSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        Name: data.fullName || "",
        email: data.email || "",
        PhoneNo: data.phone || "",
        role: data.role || "",
        address: data.address || "",
        gender: data.gender || "",
        dateBirth: data.dob || "",
        docId: doc.id,
      };
    });
    setInvoices(invoiceList);
  };

  const toggleRowExpansion = (index: number) => {
    setExpandedRows((prev) => {
      const newExpandedRows = new Set(prev);
      newExpandedRows.has(index)
        ? newExpandedRows.delete(index)
        : newExpandedRows.add(index);
      return newExpandedRows;
    });
  };

  const toggleMenu = (index: number) => {
    setActiveMenu((prev) => (prev === index ? null : index));
  };
  const menuRef = useRef<HTMLDivElement>(null);


  const openEditModal = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setFormData(invoice);
    setIsModalOpen(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 

  const updateInvoice = async () => {
    setIsModalOpen(true)
    if (formData.docId) {
      const invoiceRef = doc(db, "users", formData.docId);
      await updateDoc(invoiceRef, {
        fullName: formData.Name,
        phone: formData.PhoneNo,
        role: formData.role,
        address: formData.address,
        gender: formData.gender,
        dob: formData.dateBirth,
      });
      setIsModalOpen(false);
      fetchInvoices();
    }
  };

  const deleteInvoice = async (docId: string) => {
    setIsModalOpen(false)
    await deleteDoc(doc(db, "users", docId));
    fetchInvoices();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setActiveMenu(null);
    }
  };

  
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50"
          
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md sm:max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Edit User</h2>
            <form>
              {[
                { label: "Name", name: "Name" },
                { label: "Phone No", name: "PhoneNo" },
                { label: "Address", name: "address" },
              ].map((field, idx) => (
                <div className="mb-4" key={idx}>
                  <label className="block text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name as keyof Invoice]}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
                  />
                </div>
              ))}

              {/* Gender Select */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {/* Role Select */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
                >
                  <option value="">Select Role</option>
                  <option value="User">User</option>
                  <option value="Provider">Provider</option>
                </select>
              </div>

              {/* Date of Birth */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateBirth"
                  value={formData.dateBirth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-white bg-gray-400 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={updateInvoice}
                  className="px-4 py-2 text-white bg-[#00BFFF] rounded-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className="table-auto w-full divide-y divide-gray-200 mt-4 overflow-x-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
            <th className="px-4 py-3 text-left text-sm font-semibold hidden sm:table-cell">
              Email
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold hidden sm:table-cell">
              Phone No
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold hidden sm:table-cell">
              Role
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold hidden sm:table-cell">
              Address
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold hidden sm:table-cell">
              Gender
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold hidden sm:table-cell">
              DOB
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {invoices.map((invoice, index) => (
            <tr key={index} className="hover:bg-gray-50 transition">
              <td className="sm:hidden px-4 py-3 text-sm flex flex-col items-start">
                <div className="font-semibold text-lg">{invoice.Name}</div>
                <div className="text-sm text-gray-600">{invoice.email}</div>
                <button
                  className="text-blue-500 mt-2"
                  onClick={() => toggleRowExpansion(index)}
                >
                  <FontAwesomeIcon
                    icon={expandedRows.has(index) ? faChevronUp : faChevronDown}
                    className="mr-2"
                  />
                  <span className="text-sm">Show more</span>
                </button>
              </td>

              <td className="px-4 py-3 text-sm hidden sm:table-cell">
                {invoice.Name}
              </td>
              <td className="px-4 py-3 text-sm hidden sm:table-cell">
                {invoice.email}
              </td>
              <td className="px-4 py-3 text-sm hidden sm:table-cell">
                {invoice.PhoneNo}
              </td>
              <td className="px-4 py-3 text-sm hidden sm:table-cell">
                {invoice.role}
              </td>
              <td className="px-4 py-3 text-sm hidden sm:table-cell">
                {invoice.address}
              </td>
              <td className="px-4 py-3 text-sm hidden sm:table-cell">
                {invoice.gender}
              </td>
              <td className="px-4 py-3 text-sm hidden sm:table-cell">
                {invoice.dateBirth}
              </td>

              {expandedRows.has(index) && (
                <tr className="bg-gray-50 text-sm">
                  <td colSpan={8} className="px-4 py-3">
                    <div className="space-y-2">
                      <p>
                        <strong>Role:</strong> {invoice.role}
                      </p>
                      <p>
                        <strong>Address:</strong> {invoice.address}
                      </p>
                      <p>
                        <strong>Gender:</strong> {invoice.gender}
                      </p>
                      <p>
                        <strong>Date of Birth:</strong> {invoice.dateBirth}
                      </p>
                    </div>
                  </td>
                </tr>
              )}

              <td className="px-4 py-3 text-lg relative">
                <div ref={menuRef}>
                <button
                 onClick={() => setActiveMenu(activeMenu === index ? null : index)
                  
                 
                  
                 }
                  className="text-gray-500 hover:text-gray-800"
                >
                  <FontAwesomeIcon icon={faEllipsisV} />
                </button>
               
                {activeMenu === index && (
                  <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg w-40 z-50">
                    <button
                      className="w-full px-4 py-2 text-sm text-gray-700 flex items-center space-x-2 hover:bg-gray-100"
                      onClick={() => openEditModal(invoice)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                      <span>Edit</span>
                    </button>
                    <button
                      className="w-full px-4 py-2 text-sm text-gray-700 flex items-center space-x-2 hover:bg-gray-100"
                      onClick={() => deleteInvoice(invoice.docId)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                      <span>Delete</span>
                    </button>
                  </div>
                
              )}
              </div>
              </td>
            </tr>
           
          ))}
        </tbody>
      </table>
    </div>
  );
}




