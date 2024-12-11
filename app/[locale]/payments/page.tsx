

"use client";

import React, { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faEdit, faTrashAlt, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from 'next-intl';
import { db } from "../config/Firebase/FirebaseConfig";
import { collection, onSnapshot, updateDoc, doc, deleteDoc } from "firebase/firestore";

const Payments = () => {
  const t = useTranslations('Payments');
  const [services, setServices] = useState<any[]>([]);
  const [openEditDelete, setOpenEditDelete] = useState<null | number>(null);
  const [editingService, setEditingService] = useState<any | null>(null);

  useEffect(() => {
    const servicesCollection = collection(db, "payments");

    const unsubscribe = onSnapshot(servicesCollection, (snapshot) => {
      const serviceList = snapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data, active: data.active || false };
      });
      setServices(serviceList);
    });

    return () => unsubscribe();
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
    setEditingService(service);
    setOpenEditDelete(null);
  };

  const handleSaveEdit = async () => {
    if (editingService) {
      try {
        const serviceDoc = doc(db, "payments", editingService.id);
        const { id, createdAt, updatedAt, ...fieldsToUpdate } = editingService;
        await updateDoc(serviceDoc, fieldsToUpdate);
        setEditingService(null);
      } catch (error) {
        console.error("Error saving service edit:", error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "payments", id));
      setServices(services.filter(service => service.id !== id));
    } catch (error) {
      console.error("Error deleting service:", error);
    }
    setOpenEditDelete(null);
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen w-full">
      <Link href={"payments/AddPayments"}>
        <div className="flex justify-end">
          <Button className="border-[#4BB1D3] w-[100px] h-[45px] mt-5 mr-8 text-white bg-[#00BFFF] rounded-lg hover:bg-[#00BFFF]">
            {t('add_button')}
          </Button>
        </div>
      </Link>

      <div className="container mx-auto px-4 py-8">
        {services.length === 0 ? (
          <div className="text-center text-lg font-semibold text-gray-500">{t('no_payment_cards_available')}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {services.map((service, index) => (
              <div
                key={index}
                className={`relative bg-white p-6 rounded-xl border border-gray-300 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-104 cursor-pointer ${service.active ? 'bg-blue-200 border-blue-200' : ''}`}
              >
                <span className={`absolute top-2 right-8 text-xs px-2 py-1 rounded-full flex items-center ${service.active ? 'bg-blue-400 text-white' : 'bg-red-500 text-white'}`}>
                  <FontAwesomeIcon icon={service.active ? faCheckCircle : faTimesCircle} className="mr-1" />
                  {service.active ? t('activate') : t('deactivate')}
                </span>

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
                      onClick={() => handleEdit(service)}
                    >
                      <FontAwesomeIcon icon={faEdit} className="w-4 h-4 mr-2" />
                      <span>{t('edit')}</span>
                    </button>
                    <button
                      className="flex items-center w-full p-2 hover:bg-gray-100"
                      onClick={() => handleDelete(service.id)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} className="w-4 h-4 mr-2" />
                      <span>{t('delete')}</span>
                    </button>
                    <button
                      className="flex items-center w-full p-2 hover:bg-gray-100"
                      onClick={() => handleActiveToggle(index)}
                    >
                      <FontAwesomeIcon icon={service.active ? faTimesCircle : faCheckCircle} className="w-4 h-4 mr-2" />
                      <span>{service.active ? t('deactivate') : t('activate')}</span>
                    </button>
                  </div>
                )}

                <div className="space-y-4 mt-4">
                  {/* Render name first */}
                  <div className="flex flex-col items-start">
                    <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                  </div>

                  {/* Render percentage next */}
                  {service.percentage && (
                    <div className="flex flex-col items-start mt-2">
                      <h4 className="text-lg font-semibold text-gray-900">{t('percentage')}</h4>
                      <p className="text-lg font-medium text-gray-700 mt-1">{service.percentage}%</p>
                    </div>
                  )}

                  {/* Render secondName and secondPercentage */}
                  {service.secondName && service.secondPercentage && (
                    <div className="flex flex-col items-start mt-2">
                      <h4 className="text-lg font-semibold text-gray-900">{service.secondName}</h4>
                      <p className="text-lg font-medium text-gray-700 mt-1">{service.secondPercentage}%</p>
                    </div>
                  )}

                  {/* Display other fields dynamically */}
                  {Object.entries(service).map(([key, value]: any) => (
                    key !== 'id' && key !== 'active' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'percentage' && key !== 'secondPercentage' && (
                      <div key={key} className="flex flex-col items-start mt-2">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                        </h4>
                        <p className="text-lg font-medium text-gray-700 mt-1">{value}</p>
                      </div>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Editing Service */}
      {editingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[300px]">
            <h2 className="text-xl font-semibold mb-4">{t('edit_service')}</h2>
            {Object.entries(editingService).map(([key, value]: any) => (
              key !== 'id' && key !== 'active' && key !== 'createdAt' && key !== 'updatedAt' && (
                <input
                  key={key}
                  type="text"
                  value={value}
                  onChange={(e) => setEditingService({ ...editingService, [key]: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                  placeholder={key}
                />
              )
            ))}
            <div className="flex justify-between">
              <button
                onClick={() => setEditingService(null)}
                className="w-[45%] bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleSaveEdit}
                className="w-[45%] bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
              >
                {t('save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>




  );
};

export default Payments;
