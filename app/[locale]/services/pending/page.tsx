"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@/i18n/routing";
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
import { useSelector } from "react-redux";
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
  const [detailModalOpen, SetDetailModalOpen] = useState<boolean>(false);
  const [allServices, setAllServices] = useState<any[]>([]);
  const [StatusJob, setStatusJob] = useState();
  const [status, setStatus] = useState();

  const router = useRouter();

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const searchData = useSelector((state: any) => state.search.search);

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
      setAllServices(jobList);
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  useEffect(() => {
    const trimmedSearchData = searchData.trim().toLowerCase();

    if (trimmedSearchData !== "") {
      const filterData = allServices.filter(
        (data: any) =>
          data.category &&
          data.category.toLowerCase().includes(trimmedSearchData)
      );
      setServices(filterData);
    } else {
      setServices(allServices);
    }
  }, [searchData, allServices]);

  //handle Click job

  const handleJobClick = (job: any) => {
    setSelectedServices(job);
    SetDetailModalOpen(true);
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

  const fetchServiceById = async (jobId: string) => {
    try {
      const jobsRef = collection(db, "service"); // 'jobs' collection ka reference
      const q = query(jobsRef, where("serviceId", "==", jobId)); // Query jobId ke equal data ke liye
      const querySnapshot = await getDocs(q);

      const jobData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      localStorage.setItem("editService", JSON.stringify(jobData));

      if (jobData.length > 0) {
        console.log("Job Found:", jobData[0]);
        return jobData[0]; // Agar ek hi job return hoti ho
      } else {
        console.log("No job found with this ID.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching job:", error);
      throw error;
    }
  };

  const handleEditClick = async (job: any) => {
    console.log("Editing job ID:", job.serviceId);
    try {
      const editableJob = await fetchServiceById(job.serviceId);
      if (editableJob) {
        setEditableService(editableJob);
        setIsModalOpen(true);
      }

      router.push("/services/addService");
    } catch (error) {
      console.error("Failed to fetch the job:", error);
    }
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

  const handleStatusChange = (e: any) => {
    setStatus(e.target.value);
    console.log(status, "modal ki value");
  };

  const handleStatusClick = async (job: any) => {
    setIsModalOpen(true);
    setStatusJob(job);
  };

  const updateJobStatus = async () => {
    if ((StatusJob as any)?.serviceId) {
      const jobRef = doc(db, "service", (StatusJob as any).serviceId);
      await updateDoc(jobRef, {
        addStatus: status,
      });
      closeModal();
    }
  };

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

        <JobTab />

        <div className="flex flex-wrap justify-center gap-12 w-full px-4 sm:px-8 sm:justify-start md:px-14 md:justify-start lg:justify-start lg:px-10 mt-4">
          {services.length != 0 ? (
            services.map((job: any) => (
              <div className="w-[310px] mt-[40px]" key={job.id}>
                <Card
                  price={` € ${job.totalPriceWithTax}`}
                  title={job.category || "No Title"}
                  imageUrl={
                    job.imageUrl || "/assets/servicesIcons/cardImage.svg"
                  }
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
                  onStatus={() => {
                    handleStatusClick(job);
                  }}
                />
              </div>
            ))
          ) : (
            <p className="flex items-center justify-center h-[30vh] w-full text-gray-500 text-lg font-semibold">
              {t("no_service_available")}
            </p>
          )}
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 h-full">
            <div className="bg-white w-[400px] p-6 rounded-lg shadow-lg relative">
              {/* Close Button */}
              <button
                className="absolute top-2 right-4 text-2xl text-gray-500 hover:text-gray-800"
                onClick={closeModal}
              >
                &times;
              </button>

              {/* Modal Title */}
              <h2 className="text-2xl font-semibold text-center mb-4">
                {t("modalTitle")}
              </h2>

              {/* Select Field */}
              <div className="mt-4">
                <label
                  htmlFor="status-select"
                  className="block text-lg font-medium mb-2"
                >
                  {t("selectStatusLabel")}
                </label>
                <select
                  id="status-select"
                  value={status}
                  onChange={handleStatusChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="moderate">Moderate</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={closeModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg"
                >
                  {t("cancel")}
                </button>
                <button
                  onClick={updateJobStatus}
                  className="bg-[#00BFFF] hover:bg-[#00BFFF] text-white py-2 px-4 rounded-lg"
                >
                  {t("save")}
                </button>
              </div>
            </div>
          </div>
        )}
        <div>
          {detailModalOpen && (
            <ServiceDetails
              bookingData={selectedService}
              handleClose={() => SetDetailModalOpen(false)}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default page;
