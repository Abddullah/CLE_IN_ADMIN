"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore"; // Added deleteDoc for deleting a service
import { db } from "../config/Firebase/FirebaseConfig";
import { usePathname, useRouter } from "next/navigation";

interface Service {
  id: string;
  title: string;
  price: string;
}

const AdditionalServices: React.FC = () => {
  const t = useTranslations("AdditionalServices");
  const [services, setServices] = useState<Service[]>([]); // Define the state with Service type
  const [openEditDelete, setOpenEditDelete] = useState<number | null>(null); // Allow null for initial state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal visibility state
  const [editedService, setEditedService] = useState<Service | null>(null); // Service being edited

  // Fetch data from Firebase Firestore
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "additionalServices"));
        const servicesList: Service[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Service[]; 
        setServices(servicesList); 
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const router = useRouter();

  const path = usePathname();

  let lang = "";

  if(path.includes('en')){
    lang = 'en'
  }else{
    lang = 'it'
  }

  
  

  const handleNavigation = (path:string) => {
    router.push(`/${lang}${path}`); // Navigate with current locale
  };


  const handleEditDeleteToggle = (index: number) => {
    setOpenEditDelete(openEditDelete === index ? null : index);
    
  };

  // Function to handle editing a service
  const handleEdit = (service: Service) => {
    setEditedService(service); // Set the service to be edited
    setIsModalOpen(true); // Open the modal
    setOpenEditDelete(null)
  };

  // Handle service update
  const handleUpdateService = async () => {
    
    if (editedService) {
      const serviceRef = doc(db, "additionalServices", editedService.id);
      try {
        await updateDoc(serviceRef, {
          title: editedService.title,
          price: editedService.price,
        });
        setIsModalOpen(false);
        setEditedService(null);
        
        // Optionally, fetch updated data
        const querySnapshot = await getDocs(collection(db, "additionalServices"));
        const updatedServicesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Service[];
        setServices(updatedServicesList);
      } catch (error) {
        console.error("Error updating service:", error);
      }
    }
  };

  // Function to handle deleting a service
  const handleDeleteService = async (serviceId: string) => {
    const serviceRef = doc(db, "additionalServices", serviceId);
    try {
      await deleteDoc(serviceRef);
      // Fetch updated list after deletion
      const querySnapshot = await getDocs(collection(db, "additionalServices"));
      const updatedServicesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Service[];
      setServices(updatedServicesList);
      setOpenEditDelete(null)
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  return (
    <div className="bg-[#F5F7FA] w-full h-full overflow-hidden overflow-y-auto max-h-screen">
      <div className="flex justify-between w-full px-4 sm:px-4 md:px-12 lg:px-9 space-x-4 mt-6">
          <button className="flex-1 py-4 rounded-md text-white bg-[#00BFFF] hover:bg-[#00BFFF]">
            {(t('additionalService'))}
          </button>
         
          <button onClick={() => {
            handleNavigation('/configuration/hourlyRate')
          }}className="flex-1 py-4 rounded-md text-white bg-[#00BFFF] hover:bg-[#00BFFF]">
          {(t('HourlyRates'))}
          </button>
         
          <button onClick={() => {handleNavigation('/configuration/roomAreaSize')}} className="flex-1 py-4 rounded-md  text-white bg-[#00BFFF] hover:bg-[#00BFFF]">
          {(t('RoomAreaSize'))}
          </button>
          <button onClick={() => {handleNavigation('/configuration/noOfRoom')}} className="flex-1 py-4 rounded-md  text-white bg-[#00BFFF] hover:bg-[#00BFFF]">
          {(t('NumberOfRoom'))}
          </button>
        </div>
      <div className="flex justify-end">
    <Link href={"configuration/addAdditionalService"}>
        <Button className="border-[#4BB1D3] w-[80px] h-[40px] mt-8 mr-8 text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00BFFF] sm:w-[100px] sm:h-[45px]">
          {t("add_button")}
        </Button>
    </Link>
      </div>
  
    <div className="container mx-auto px-4 py-8">
      {/* Show a message if no services are available */}
      {services.length === 0 ? (
        <p className="text-center text-lg font-semibold text-gray-600">
          {t("no_additional_service")}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {services.map((service, index) => (
            <div
              key={service.id}
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
                    onClick={() => handleEdit(service)}
                  >
                    <FontAwesomeIcon icon={faEdit} className="w-4 h-4 mr-2" />
                    <span>{t("edit")}</span>
                  </button>
                  <button
                    className="flex items-center w-full p-2 hover:bg-gray-100"
                    onClick={() => handleDeleteService(service.id)} // Delete functionality
                  >
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="w-4 h-4 mr-2"
                    />
                    <span>{t("delete")}</span>
                  </button>
                </div>
              )}
  
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-lg font-medium text-gray-700 mb-4">
                {t("price")}: {service.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  
    {/* Modal for editing the service */}
    {isModalOpen && editedService && (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center overflow-auto">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-full overflow-y-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t("edit")}</h2>
          <div className="mb-4">
            <label htmlFor="serviceTitle" className="block text-sm font-medium text-gray-600">
              {t("service_name")}
            </label>
            <input
              id="serviceTitle"
              type="text"
              value={editedService.title}
              onChange={(e) =>
                setEditedService({ ...editedService, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="servicePrice" className="block text-sm font-medium text-gray-600">
              {t("price")}
            </label>
            <input
              id="servicePrice"
              type="text"
              value={editedService.price}
              onChange={(e) =>
                setEditedService({ ...editedService, price: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <Button
              className="mr-2 text-white bg-[#00BFFF] rounded-lg hover:bg-[#00BFFF] "
              onClick={handleUpdateService}
            >
              {t("save_changes")}
            </Button>
            <Button
              className="text-white border border-gray-300 rounded-lg bg-red-500 hover:bg-red-500"
              onClick={() => setIsModalOpen(false)}
            >
              {t("close_button")}
            </Button>
          </div>
        </div>
      </div>
    )}
  </div>
  
  );
};

export default AdditionalServices;






















