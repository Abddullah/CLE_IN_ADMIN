"use client";

import React, { useEffect, useRef, useState } from "react";
import Card from "../../components/servicesComponents/ServicesCards";
import {
  getDocs,
  collection,
  doc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  where,
  query,
} from "firebase/firestore";
import { db } from "../../config/Firebase/FirebaseConfig";
import moment from "moment";
import LoaderSpinner from "../../components/Spinner";
import { useTranslations } from "use-intl";
import { Link } from "@/i18n/routing";
import JobTab from "../../components/JobTab";
import BookingModal from "../../components/jobsComponent/JobDetailsCard";
function Page() {
  const t = useTranslations("Jobs");
  const [jobs, setJobs] = useState<any>([]);
  const [editableJob, setEditableJob] = useState<null | any>(null); // Store the job being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [categories, setCategories] = useState<any[]>([]);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [detailModalOpen , SetDetailModalOpen]=useState<boolean>(false)
  const [selectedJob , setSelectedJob]=useState<null | any>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Create a query to fetch only active jobs
    const jobsQuery = query(
      collection(db, "jobs"),
      where("addStatus", "==", "pending")
    );

    // Set up real-time listener for the filtered collection
    const unsubscribe = onSnapshot(jobsQuery, (snapshot) => {
      const jobList = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobs(jobList);
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);


  const handleJobClick = (job:any) => {
    setSelectedJob(job);
    SetDetailModalOpen(true);
  };


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

  const handleEditClick = (job: any) => {
    setEditableJob(job);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (job: any) => {
    try {
      // Get the document reference
      const jobDocRef = doc(db, "jobs", job.id);

      // Delete the document
      await deleteDoc(jobDocRef);

      console.log(`Job with ID ${job.id} has been deleted successfully.`);
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleSave = async () => {
    if (!editableJob) return;

    try {
      // Update the job in Firebase
      const jobDocRef = doc(db, "jobs", editableJob.id);
      await updateDoc(jobDocRef, {
        category: editableJob?.category,
        addStatus: editableJob?.addStatus,
        bookingStart: editableJob?.bookingStart,
        bookingEnd: editableJob?.bookingEnd,
        bookingDate: editableJob?.bookingDate,
      });

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  return (
    <div className="bg-[#F5F7FA] w-full h-full overflow-hidden overflow-y-auto max-h-screen">
      <div className="absolute bottom-8 right-8 z-10">
        <Link href={"/jobs/addJob"}>
          <button className="w-14 h-14 flex items-center justify-center bg-[#00BFFF] text-white text-3xl rounded-full shadow-lg hover:bg-[#009ACD] focus:outline-none focus:ring-4 focus:ring-blue-300">
            +
          </button>
        </Link>
      </div>

      <JobTab />

      <div className="flex flex-wrap justify-center gap-12 w-full px-4 sm:px-8 sm:justify-start md:px-14 md:justify-start lg:justify-start lg:px-10 mt-4">
  {jobs.length === 0 ? (
    <div className="flex items-center justify-center h-[60vh] w-full text-gray-500 text-xl font-semibold">
     {(t('no_job_available'))}
    </div>
  ) : (
    jobs.map((job: any) => (
      <div className="w-[310px] mt-[40px]" key={job.id}>
        <Card
          price={` € ${job.totalPriceWithTax}`}
          title={job.category || "No Title"}
          time={`${moment(job.bookingStart).format("hh:mm A")} - ${moment(job.bookingEnd).format("hh:mm A")}`}
          imageUrl={job.imageUrl || "/assets/servicesIcons/cardImage.svg"}
          status={job.addStatus || "Inactive"}
          statusTextColor={"green-500"}
          detailOpen={() => handleJobClick(job)}
          date={`Date: ${moment(job.bookingDate).isValid() ? moment(job.bookingDate).format("MMM -D -YYYY") : "Invalid Date"}`}
          createdAt={moment(job.createdAt).fromNow()}
          dotsIcon="/assets/categoriesIcons/dots.svg"
          onEdit={() => handleEditClick(job)}
          onDelete={() => handleDeleteClick(job)}
        />
      </div>
    ))
  )}
</div>

     {isModalOpen && (
            <div
              ref={modalRef}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 "
            >
              <div className="bg-white w-[450px] rounded-lg p-6 shadow-lg mx-3">
                <h2 className="text-xl font-semibold mb-4">{(t('edit_Job'))}</h2>
                <form>
                  {/* Title (Select Field) */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      {(t('titleEdit'))}
                    </label>
    
                    <div className="mb-4 mt-2">
                      <div className="relative">
                        <select
                          id="professional-select"
                          className="block w-full px-4 py-3 text-sm border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={editableJob?.category || ""}
                          onChange={(e) =>
                            setEditableJob({
                              ...editableJob,
                              category: e.target.value,
                            })
                          }
                        >
                          <option value="" disabled>
                            Choose an option
                          </option>
                          {categories.map((category: any) => (
                            <option key={category.id} value={category.categoryName}>
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
    
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      {(t('select_Date'))}
                    </label>
                    <div className="mt-1">
                      <input
                        type="date"
                        name="ServiceDate"
                                            onChange={(e) => {
                          setEditableJob({
                            ...editableJob,
                            bookingDate: new Date(e.target.value).getTime(),
                          });
                        }}
                        // Register field with validation
                        className="w-full px-4 py-2 mt-1 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
    
                  {/* Select Time Start */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      {(t('select_Time_Start'))}
                    </label>
                    <input
                      type="time"
                      onChange={(e) =>
                        setEditableJob({
                          ...editableJob,
                          bookingStart: moment(e.target.value, "HH:mm").valueOf(),
                        })
                      }
                      value={
                        editableJob?.bookingStart
                          ? moment(editableJob.bookingStart).format("HH:mm")
                          : ""
                      }
                      className="w-full px-4 py-2 mt-1 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
    
                  {/* Select Time End */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      {(t('select_Time_End'))}
                    </label>
                    <input
                      type="time"
                      onChange={(e) =>
                        setEditableJob({
                          ...editableJob,
                          bookingEnd: moment(e.target.value, "HH:mm").valueOf(),
                        })
                      }
                      value={
                        editableJob?.bookingEnd
                          ? moment(editableJob.bookingEnd).format("HH:mm")
                          : ""
                      }
                      className="w-full px-4 py-2 mt-1 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
    
                  {/* Status */}
    
                  <div className="mb-4">
                    <label
                      htmlFor="professional-select"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {(t('select_Job_Status'))}
                    </label>
                    <div className="relative">
                      <select
                        value={editableJob?.addStatus || ""}
                        onChange={(e) =>
                          setEditableJob({
                            ...editableJob,
                            addStatus: e.target.value,
                          })
                        }
                        id="professional-select"
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
    
                  {/* Buttons */}
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="py-2 px-4 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600"
                    >
                      {(t('cancel'))}
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      className="py-2 px-4 bg-[#00BFFF] text-white rounded-md shadow-sm hover:bg-[#00BFFF]"
                    >
                      {(t('update'))}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        <div>
      {detailModalOpen && <BookingModal bookingData={selectedJob} handleClose={()=>SetDetailModalOpen(false)} />}
      </div>
    </div>
  );
}

export default Page;
