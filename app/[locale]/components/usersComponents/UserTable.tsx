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
import { useRef } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import moment from "moment";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";



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
  const t = useTranslations("Users");
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterData , setFilterData] = useState();
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
  const router = useRouter();
  

  

  const  email  = "provider@gmail.com"




 


  
  
  

  
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
  



useEffect(()=>{
  if (email) {
    // Filter invoices based on email
    const filterData = invoices.filter((user) =>
      user.email.includes(email as string)
    );
    invoices.push(filterData);
    setInvoices([...invoices])  
    console.log(invoices)
  } else {
    setInvoices(invoices);  // If no email, show all invoices
  }
} , [email])

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
    setIsModalOpen(true);
    if (formData.docId) {
      const invoiceRef = doc(db, "users", formData.docId);
      await updateDoc(invoiceRef, {
        fullName: formData.Name,
        phone: formData.PhoneNo,
        role: formData.role,
        address: formData.address,
        gender: formData.gender,
        dob: new Date(formData.dateBirth).getTime(),
      });
      setIsModalOpen(false);
      fetchInvoices();
    }
  };

  //cloud function for delete user account from firebase

  const functions = getFunctions();
  const deleteUser = httpsCallable(functions, "deleteUser");

  const deleteInvoice = async (docId: string) => {
    setIsModalOpen(false);
    await deleteDoc(doc(db, "users", docId));
    fetchInvoices();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null); // Close the menu
      }
    };

    // Attach event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, setActiveMenu]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      {/* {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
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
                    value={formData ?[field.name] : ""}

                    onChange={handleInputChange}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
                  />
                </div>
              ))}

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
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

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
                  <option value="user">User</option>
                  <option value="provider">Provider</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateBirth"
                  value={new Date(formData.dateBirth).getTime()}
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
      )} */}

{isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50"
          
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md sm:max-w-lg">
            <h2 className="text-xl font-semibold mb-4">{(t('edit_user'))}</h2>
            <form>
              {[
                { label: ((t('name'))), name: "Name" },
                { label: ((t('phoneNo'))), name: "PhoneNo" },
                { label: ((t('address'))), name: "address" },
               
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
                  {(t('gender'))}
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              {/* Role Select */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  {(t('role'))}
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
                >
                  <option value="">Select Role</option>
                  <option value="user">User</option>
                  <option value="provider">Provider</option>
                </select>
              </div>

              {/* Date of Birth */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  {(t('dateOfBirth'))}
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
                  {(t('cancel'))}
                </button>
                <button
                  type="button"
                  onClick={updateInvoice}
                  className="px-4 py-2 text-white bg-[#00BFFF] rounded-md"
                >
                  {(t('save_Changes'))}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      <table className="table-auto w-full divide-y divide-gray-200 mt-4">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold">{(t('name'))}</th>
            <th className="px-4 py-3 text-left text-sm font-semibold hidden sm:table-cell">
              {(t('email'))}
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold hidden lg:table-cell">
            {(t('phoneNo'))}
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold hidden lg:table-cell">
              {(t('address'))}
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold hidden lg:table-cell">
              {(t('gender'))}
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold hidden lg:table-cell">
              DOB
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold hidden lg:table-cell">
              {(t('role'))}
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              {(t('actions'))}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {invoices.map((invoice, index) => (
            <React.Fragment key={index}>
              <tr className="hover:bg-gray-50 transition">
                <td className="px-4 py-5 text-sm">
                  <div>{invoice.Name}</div>
                  <button
                    className="text-blue-500 mt-2 flex items-center sm:hidden"
                    onClick={() => toggleRowExpansion(index)}
                  >
                    <FontAwesomeIcon
                      icon={
                        expandedRows.has(index) ? faChevronUp : faChevronDown
                      }
                      className="mr-2"
                    />
                    <span>Show more</span>
                  </button>
                </td>
                <td className="px-4 py-3 text-sm hidden sm:table-cell">
                  {invoice.email}
                </td>
                <td className="px-4 py-3 text-sm hidden lg:table-cell">
                  {invoice.PhoneNo}
                </td>
                <td className="px-4 py-3 text-sm hidden lg:table-cell">
                  {invoice.address}
                </td>
                <td className="px-4 py-3 text-sm hidden lg:table-cell">
                  {invoice.gender}
                </td>
                <td className="px-4 py-3 text-sm hidden lg:table-cell">
                  {moment(invoice.dateBirth).format("D-M-YYYY")}
                </td>
                <td className="px-4 py-3 text-sm hidden lg:table-cell">
                  {invoice.role}
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="relative">
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => toggleMenu(index)}
                    >
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </button>
                    {activeMenu === index && (
                      <div
                        className="absolute top-6 right-0 mt-2 bg-white border rounded shadow-lg z-50"
                        ref={menuRef}
                        style={{ minWidth: "150px" }}
                      >
                        <button
                          onClick={() => openEditModal(invoice)}
                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <FontAwesomeIcon icon={faEdit} className="mr-2" />
                          {(t('edit'))}
                        </button>
                        <button
                          onClick={() => deleteInvoice(invoice.docId)}
                          className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-100"
                        >
                          <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                          {(t('delete'))}
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>

              {expandedRows.has(index) && (
                <tr className="bg-gray-50 text-sm sm:hidden">
                  <td colSpan={3} className="px-4 py-2">
                    <p>
                      <strong>Phone No:</strong> {invoice.PhoneNo}
                    </p>
                    <p>
                      <strong>Address:</strong> {invoice.address}
                    </p>
                    <p>
                      <strong>Email:</strong> {invoice.email}
                    </p>
                    <p>
                      <strong>Gender:</strong> {invoice.gender}
                    </p>
                    <p>
                      <strong>DOB:</strong> {moment(invoice.dateBirth).format("D-M-YYYY")}
                    </p>
                    <p>
                      <strong>Role:</strong> {invoice.role}
                    </p>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
