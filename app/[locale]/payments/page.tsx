"use client";

import React, { useState, useEffect, useRef } from "react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faEdit,
  faTrashAlt,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import { db } from "../config/Firebase/FirebaseConfig";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const Payments = () => {
  const t = useTranslations("Payments");
  const [services, setServices] = useState<any[]>([]);
  const [openEditDelete, setOpenEditDelete] = useState<null | number>(null);
  const [editingService, setEditingService] = useState<any | null>(null);

  // Use Ref for the modal container to check if the click is outside
  const modalRef = useRef(null);

  useEffect(() => {
    const servicesCollection = collection(db, "payments");

    // Fetch 'tax' arrays from Firestore
    const unsubscribe = onSnapshot(servicesCollection, (snapshot) => {
      const taxList = snapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, tax: data.tax || [] }; // Only fetch 'tax' array
      });

      setServices(taxList); // Update state with tax data
     
      
    });

   

    // Add event listener to close modal on click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !(modalRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setOpenEditDelete(null); // Close modal if click is outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      unsubscribe();
    };
  }, []);

  const handleEditDeleteToggle = (index: number) => {
    setOpenEditDelete(openEditDelete === index ? null : index);
  };

  const handleActiveToggle = async (index: number) => {
    const updatedServices = [...services];
    const service = updatedServices[index];
    service.active = !service.active;

    try {
      const serviceDoc = doc(db, "payments", service.id);
      await updateDoc(serviceDoc, { active: service.active });
      setServices(updatedServices);
    } catch (error) {
      console.error("Error updating active status:", error);
    }
    setOpenEditDelete(null);
  };

  const handleEdit = (service: any) => {
    setEditingService(service); // Set the service to edit
    setOpenEditDelete(null); // Close the edit menu
  };

  // Handle changes in service fields (like name, percentage, etc.)
  const handleFieldChange = (field: string, value: string | number) => {
    setEditingService((prevService: any) => ({
      ...prevService,
      [field]: value,
    }));
  };

  // Handle adding a new tax field dynamically
  const handleAddTaxField = () => {
    setEditingService((prevService: any) => ({
      ...prevService,
      tax: [
        ...(prevService.tax || []),
        { name: "", percentage: "" }, // Empty field for new tax
      ],
    }));
  };

  // Handle removing a tax field dynamically
  const handleRemoveTaxField = (index: number) => {
    setEditingService((prevService: any) => ({
      ...prevService,
      tax: prevService.tax.filter((_: any, i: number) => i !== index),
    }));
  };

  // Handle editing a tax field (either name or percentage)
  const handleTaxFieldChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    setEditingService((prevService: any) => {
      const updatedTax = prevService.tax.map((tax: any, i: number) =>
        i === index ? { ...tax, [field]: value } : tax
      );
      localStorage.setItem('tax', JSON.stringify(updatedTax));

      return { ...prevService, tax: updatedTax };

    });
  };

  // Handle saving the edited service data
  const handleSaveEdit = async () => {
    if (editingService) {
      try {
        const serviceDoc = doc(db, "payments", editingService.id);
        const { id, createdAt, updatedAt, ...fieldsToUpdate } = editingService;
        await updateDoc(serviceDoc, fieldsToUpdate);
        setEditingService(null); // Close the modal after saving
      } catch (error) {
        console.error("Error saving service edit:", error);
      }
    }
  };
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "payments", id));
      setServices(services.filter((service) => service.id !== id));
      localStorage.removeItem('tax')
    } catch (error) {
      console.error("Error deleting service:", error);
    }
    setOpenEditDelete(null);
  };

  return (
    <div className="bg-[#F5F7FA] max-w-full h-full overflow-hidden overflow-y-auto max-h-screen relative">
      <div className="absolute bottom-8 right-8 z-10">
        <Link href={"payments/AddPayments"}>
          <button className="w-14 h-14 flex items-center justify-center bg-[#00BFFF] text-white text-3xl rounded-full shadow-lg hover:bg-[#009ACD] focus:outline-none focus:ring-4 focus:ring-blue-300">
            +
          </button>
        </Link>
      </div>

      <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-64px)] overflow-auto">
        {services.length === 0 ? (
          <div className="text-center text-lg font-semibold text-gray-500">
            {t("no_payment_cards_available")}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {services.map((service, index) => (
              <div
                key={index}
                className={`relative bg-white p-6 rounded-xl border border-gray-300 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-104 cursor-pointer ${
                  service.active ? "bg-blue-200 border-blue-200" : ""
                }`}
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
                  <div
                    className="absolute top-6 right-0 mt-2 bg-white border rounded shadow-lg z-50"
                    ref={modalRef}
                    style={{ minWidth: "150px" }}
                  >
                    <button
                      onClick={() => handleEdit(service)}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-2" />
                      {(t('edit'))}
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-100"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                      {(t('delete'))}
                    </button>

                  
                  </div>
                )}

                <div className="space-y-4 mt-4">
                  <div className="flex flex-col items-start">
                    <h3 className="text-xl font-bold text-gray-900">
                      {service.name}
                    </h3>
                  </div>

                  {service.tax && service.tax.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Taxes:
                      </h4>
                      {service.tax.map((taxItem: any, taxIndex: number) => (
                        <div
                          key={taxIndex}
                          className="flex flex-col items-start mt-2"
                        >
                          <h5 className="text-md font-medium text-gray-800">
                            Name: {taxItem.name}
                          </h5>
                          <p className="text-lg font-medium text-gray-700 mt-1">
                            Percentage: {taxItem.percentage}%
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {service.percentage && (
                    <div className="flex flex-col items-start mt-2">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {t("percentage")}
                      </h4>
                      <p className="text-lg font-medium text-gray-700 mt-1">
                        {service.percentage}%
                      </p>
                    </div>
                  )}

                  {service.secondName && service.secondPercentage && (
                    <div className="flex flex-col items-start mt-2">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {service.secondName}
                      </h4>
                      <p className="text-lg font-medium text-gray-700 mt-1">
                        {service.secondPercentage}%
                      </p>
                    </div>
                  )}

                  {Object.entries(service).map(
                    ([key, value]: any) =>
                      key !== "id" &&
                      key !== "active" &&
                      key !== "createdAt" &&
                      key !== "updatedAt" &&
                      key !== "percentage" &&
                      key !== "secondPercentage" &&
                      key !== "tax" && (
                        <div
                          key={key}
                          className="flex flex-col items-start mt-2"
                        >
                          <h4 className="text-lg font-semibold text-gray-900">
                            {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                          </h4>
                          <p className="text-lg font-medium text-gray-700 mt-1">
                            {value}
                          </p>
                        </div>
                      )
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {editingService && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">
                Edit Payment
              </h3>

              {/* Edit Tax Fields */}
              {editingService.tax &&
                editingService.tax.map((tax: any, index: number) => (
                  <div key={index} className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between space-x-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-600">
                          Tax Name:
                        </label>
                        <input
                          type="text"
                          value={tax.name}
                          onChange={(e) =>
                            handleTaxFieldChange(index, "name", e.target.value)
                          }
                          className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-600">
                          Tax Percentage:
                        </label>
                        <input
                          type="number"
                          value={tax.percentage}
                          onChange={(e) =>
                            handleTaxFieldChange(
                              index,
                              "percentage",
                              e.target.value
                            )
                          }
                          className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BFFF]"
                        />
                      </div>
                     
                      <Button
                        type="button"
                        onClick={() => handleRemoveTaxField(index)}
                        className="bg-[#00BFFF] hover:bg-[#00BFFF] text-white h-[43px] px-4 mt-7 sticky"
                      >
                        ✕
                      </Button>
                    </div>
                  </div>
                ))}

              <button
                onClick={handleAddTaxField}
                className="w-full mt-4 py-2 bg-[#00BFFF] text-white rounded-lg hover:bg-[#00BFFF] focus:outline-none"
              >
                Add Tax Field
              </button>

              {/* Save Button */}
              <div className="flex justify-between items-center mt-4 gap-3">
                <button
                  onClick={() => setEditingService(null)}
                  className="w-full py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="w-full py-2 bg-[#00BFFF] text-white rounded-lg hover:bg-[#00BFFF] focus:outline-none"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;
