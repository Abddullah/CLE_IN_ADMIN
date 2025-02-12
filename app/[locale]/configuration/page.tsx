"use client";
import { useRouter } from "@/i18n/routing";
import React, { useState, useEffect, useRef } from "react"; // Importing necessary hooks
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/routing";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore"; // Importing Firebase functions
import getFirebaseErrorMessage from "@/app/firebaseErrorHandler";
import { db } from "../config/Firebase/FirebaseConfig";
import ConfigurationTab from "../components/ConfigurationTab";
interface Service {
  id: string;
  rate: string;
}

function Page() {
  const t = useTranslations("Services");

  const [services, setServices] = useState<Service[]>([]); // State for services
  const [openEditDelete, setOpenEditDelete] = useState<number | null>(null); // State for toggle
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal visibility
  const [editedService, setEditedService] = useState<Service | null>(null); // Edited service state

  const modalRef = useRef<HTMLDivElement | null>(null); // Modal reference
  const menuRef = useRef<HTMLDivElement | null>(null); // Menu reference

  // Fetch language from the URL path
  const path = usePathname();
  const language = path.replace("/configuration/fixRates", "");
  const lang = language.replace("/", "");

  // Fetch services data from Firestore
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "fixRates"));
        const servicesList: Service[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Service[];
        setServices(servicesList.sort((a:any, b:any) => a.rate - b.rate));
        localStorage.setItem("fixRates" , JSON.stringify(servicesList))
      } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = await getFirebaseErrorMessage(errorCode, lang);
        console.log(errorMessage);
      }
    };

    fetchServices();
  }, [lang]); // Dependency on language

  const router = useRouter();

  // Toggle menu visibility for edit/delete actions
  const handleEditDeleteToggle = (index: number) => {
    setOpenEditDelete(openEditDelete === index ? null : index);
  };

  // Handle edit action
  const handleEdit = (service: Service) => {
    setEditedService(service); // Set service to be edited
    setIsModalOpen(true); // Open modal
    setOpenEditDelete(null); // Close the menu
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutsideMenu = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenEditDelete(null); // Close the menu
      }
    };

    if (openEditDelete !== null) {
      document.addEventListener("mousedown", handleClickOutsideMenu);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, [openEditDelete]);

  // Handle service update
  const handleUpdateService = async () => {
    if (editedService) {
      const serviceRef = doc(db, "fixRates", editedService.id);
      try {
        await updateDoc(serviceRef, { rate: editedService.rate });
        setIsModalOpen(false); // Close modal
        setEditedService(null); // Reset edited service

        // Fetch updated services
        const querySnapshot = await getDocs(collection(db, "fixRates"));
        const updatedServicesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Service[];
        setServices(updatedServicesList);
        localStorage.setItem("fixRates" , JSON.stringify(updatedServicesList))
      } catch (error) {
        console.error("Error updating service:", error);
      }
    }
  };

  // Handle delete service
  const handleDeleteService = async (serviceId: string) => {
    const serviceRef = doc(db, "fixRates", serviceId);
    try {
      await deleteDoc(serviceRef); // Delete service from Firestore
      // Fetch updated services after deletion
      const querySnapshot = await getDocs(collection(db, "fixRates"));
      const updatedServicesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Service[];
      setServices(updatedServicesList);
      localStorage.setItem("fixRates" , JSON.stringify(updatedServicesList))
      setOpenEditDelete(null); // Close the menu
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  return (
    <div className="bg-[#F5F7FA] w-full  pt-8 overflow-y-auto">


      
      <ConfigurationTab />

      <div className="container mx-auto px-4 py-8">
        
        {/* Show message if no services are available */}
        {services.length === 0 ? (
          <p className="text-center text-lg font-semibold text-gray-600">
            {t("no_fix_rate_available")}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 mx-2">
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
                      <div
                    
                        className="absolute top-6 right-0 mt-2 bg-white border rounded shadow-lg z-50"
                        ref={menuRef}
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
                          onClick={() => handleDeleteService(service.id)}
                          className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-100"
                        >
                          <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                          {(t('delete'))}
                        </button>
                      </div>
                    )}

              
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  {t("fix_Rate")}: {service.rate} €
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Button */}
     


      

              <div className="absolute bottom-8 right-8">
                    <Link href={"/configuration/addFixRate"}>
                      <button className="w-14 h-14 flex items-center justify-center bg-[#00BFFF] text-white text-3xl rounded-full shadow-lg hover:bg-[#009ACD] focus:outline-none focus:ring-4 focus:ring-blue-300">
                        +
                      </button>
                    </Link>
                  </div>

      {/* Modal for editing service */}
      {isModalOpen && editedService && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center overflow-auto">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-full overflow-y-auto"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {t("edit")}
            </h2>
            <div className="mb-4"></div>
            <div className="mb-4">
              <label
                htmlFor="servicePrice"
                className="block text-sm font-medium text-gray-600"
              >
                {t("price")}
              </label>
              <input
                id="servicePrice"
                type="text"
                value={editedService.rate}
                onChange={(e) =>
                  setEditedService({ ...editedService, rate: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end">
              <Button
                className="mr-2 text-white bg-[#00BFFF] rounded-lg hover:bg-[#00BFFF]"
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
}

export default Page;
