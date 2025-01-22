"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import {
  getDocs,
  collection,
  doc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import moment from "moment";
import { db } from "../../config/Firebase/FirebaseConfig";
import Card from "../../components/servicesComponents/ServicesCards";
import ServiceDetails from "../../components/servicesComponents/ServiceDetailComponent";
import JobTab from "../../components/JobTab";
;

function page() {
  const t = useTranslations("Services");

  //states

  const [services, setServices] = useState<any[]>([]);
  const [selectedService, setSelectedServices] = useState<null | any>(null);
  const [editableService, setEditableService] = useState<null | any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [timeSlots, setTimeSlots] = useState<any>([]);
  const [addStatus, setAddStatus] = useState("pending");
  const [detailModalOpen , SetDetailModalOpen] = useState<boolean>(false);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    if (editableService) {
      setTimeSlots(editableService?.timeSlots || []);
      setAddStatus(editableService?.addStatus || "pending");
    }
  }, [editableService]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const fetchedCategories = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(fetchedCategories);
        console.log(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Create a query to fetch only active jobs
    const jobsQuery = query(
      collection(db, "service"),
      where("addStatus", "==", "pending") // Filter for active jobs
    );

    // Set up real-time listener for the filtered collection
    const unsubscribe = onSnapshot(jobsQuery, (snapshot) => {
      const jobList = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setServices(jobList);
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  console.log(services);

  //handle Click job

  const handleJobClick = (job: any) => {
    setSelectedServices(job);
    SetDetailModalOpen(true)
  };

 

  //delete service function

  const handleDeleteClick = async (job: any) => {
    try {
      // Get the document reference
      const jobDocRef = doc(db, "service", job.id);

      // Delete the document
      await deleteDoc(jobDocRef);

      console.log(`Job with ID ${job.id} has been deleted successfully.`);
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  //handle service edit

  const handleEditClick = (job: any) => {
    setEditableService({ ...job });
    setIsModalOpen(true);
  };

  const handleTimeChange = (index: number, key: string, value: string) => {
    const updatedSlots = [...timeSlots];
    updatedSlots[index][key] = value;
    setTimeSlots(updatedSlots);
  };

  const handleDayChange = (index: number, value: string) => {
    const updatedSlots = [...timeSlots];
    updatedSlots[index]["day"] = value;
    setTimeSlots(updatedSlots);
  };

  const handleCategoryChange = (value: string) => {
    setEditableService({ ...editableService, category: value });
  };

  const handleStatusChange = (value: string) => {
    setAddStatus(value);
  };

  const handleSubmit = async () => {
    try {
      const docRef = doc(db, "service", editableService?.id);
      await updateDoc(docRef, {
        timeSlots: timeSlots,
        addStatus: addStatus,
        category: editableService?.category,
      });
      alert("Service updated successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditableService(null);
  };

  console.log(services);
  

  return (
    <>
      <div className="bg-[#F5F7FA] w-full h-full overflow-hidden overflow-y-auto max-h-screen">
        <div className="absolute bottom-8 right-8 z-10">
          <Link href={"/services/addService"}>
            <button className="w-14 h-14 flex items-center justify-center bg-[#00BFFF] text-white text-3xl rounded-full shadow-lg hover:bg-[#009ACD] focus:outline-none focus:ring-4 focus:ring-blue-300">
              +
            </button>
          </Link>
        </div>

        <JobTab/>

        <div className="flex flex-wrap justify-center gap-12 w-full px-4 sm:px-8 sm:justify-start md:px-14 md:justify-start lg:justify-start lg:px-10 mt-4">
  {services.length != 0 ? (
    services.map((job: any) => (
      <div className="w-[310px] mt-[40px]" key={job.id}>
        <Card
          price={` € ${job.totalPriceWithTax}`}
          title={job.category || "No Title"}
          imageUrl={job.imageUrl || "/assets/servicesIcons/cardImage.svg"}
          status={job.addStatus || "Inactive"}
          createdAt={moment(job.createdAt).fromNow()}
          statusTextColor={"yellow-400"}
          dotsIcon="/assets/categoriesIcons/dots.svg"
          detailOpen={() => handleJobClick(job)}
          onEdit={() => {
            handleEditClick(job);
          }}
          onDelete={() => {
            handleDeleteClick(job);
          }}
        />
      </div>
    ))
  ) : (
    <p className="flex items-center justify-center h-[30vh] w-full text-gray-500 text-lg font-semibold">
      {(t('no_service_available'))}
    </p>
  )}
</div>

        {isModalOpen && (
          <div className="p-5 space-y-6">
            {/* Modal */}
            {isModalOpen && editableService && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 h-full">
                <div className="bg-white w-[500px] p-6 rounded-lg shadow-lg relative ">
                  <button
                    className="absolute top-2 right-4 text-3xl"
                    onClick={closeModal}
                  >
                    ×
                  </button>
                  <h2 className="text-2xl font-semibold text-center mb-4">
                    {t("edit_Service")}
                  </h2>

                  {/* Time Slots Editing */}
                  <div className="space-y-4">
                    {timeSlots.map((slot: any, index: number) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row items-center sm:space-x-4 mb-4"
                      >
                        {/* Day Dropdown */}
                        <select
                          value={slot.day || "Monday"}
                          onChange={(e) =>
                            handleDayChange(index, e.target.value)
                          }
                          className="w-full sm:w-32 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {daysOfWeek.map((day, i) => (
                            <option key={i} value={day}>
                              {day}
                            </option>
                          ))}
                        </select>

                        {/* Opening Time */}
                        <input
                          type="time"
                          value={slot.openingTime}
                          onChange={(e) =>
                            handleTimeChange(
                              index,
                              "openingTime",
                              e.target.value
                            )
                          }
                          className="w-full sm:w-32 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 sm:mt-0"
                        />
                        <span className="text-lg mt-2 sm:mt-0">to</span>

                        {/* Closing Time */}
                        <input
                          type="time"
                          value={slot.closingTime}
                          onChange={(e) =>
                            handleTimeChange(
                              index,
                              "closingTime",
                              e.target.value
                            )
                          }
                          className="w-full sm:w-32 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 sm:mt-0"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Category Dropdown */}

                  <div className="mb-4 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      {(t('editTitle'))}
                    </label>

                    <div className="mb-4 mt-2">
                      <div className="relative">
                        <select
                          className="block w-full px-4 py-3 text-sm border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          id="category"
                          value={editableService?.category || ""}
                          onChange={(e) => handleCategoryChange(e.target.value)}
                        >
                          <option value="" disabled>
                            Choose an option
                          </option>
                          {categories.map((category: any, i: number) => (
                            <option key={i} value={category.categoryName}>
                              {category.categoryName}
                            </option>
                          ))}
                        </select>
                        <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Dropdown */}

                  <div className="mb-4">
                    <label
                      htmlFor="addStatus"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {(t('select_Job_status'))}
                    </label>
                    <div className="relative">
                      <select
                        id="addStatus"
                        value={addStatus}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className="block w-full px-4 py-3 text-sm border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="" disabled>
                          Choose an option
                        </option>
                        <option value="active">Active</option>
                        <option value="moderate">Moderate</option>
                        <option value="pending">Pending</option>
                      </select>
                      <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      className="bg-[#00BFFF] text-white py-2 px-6 rounded-lg hover:bg-[#00BFFF] transition-all"
                      onClick={handleSubmit}
                    >
                      {(t('update'))}
                    </button>
                    <button
                      className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition-all"
                      onClick={closeModal}
                    >
                      {(t('cancel'))}
                      
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

<div>
      {detailModalOpen && <ServiceDetails bookingData={selectedService} handleClose={()=>SetDetailModalOpen(false)} />}
      </div>
      </div>
    </>
  );
}

export default page;
