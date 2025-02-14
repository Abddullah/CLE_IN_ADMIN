"use client";

import React, { useEffect, useRef, useState } from "react";
import Card from "../components/servicesComponents/ServicesCards";
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
import { db } from "../config/Firebase/FirebaseConfig";
import moment from "moment";
import LoaderSpinner from "../components/Spinner";
import { useTranslations } from "use-intl";
import { Link, useRouter } from "@/i18n/routing";
// import BookingModal from "../components/jobsComponent/JobDetailsCard";
import JobTab from "../components/JobTab";
import BookingModal from "../components/jobsComponent/JobDetailsCard";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

function Page() {
  const t = useTranslations("Jobs");
  const searchData = useSelector((state: any) => state.search.search);
  const [jobs, setJobs] = useState<any>([]);
  const [allJobs, setAllJobs] = useState<any>([]);
  const [editableJob, setEditableJob] = useState<null | any>(null); // Store the job being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [categories, setCategories] = useState<any[]>([]);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [selectedJob, setSelectedJob] = useState<null | any>(null);
  const [detailModalOpen, SetDetailModalOpen] = useState<boolean>(false);
  const [status, setStatus] = useState();
  const [StatusJob, setStatusJob] = useState();

  const router = useRouter();
  const pathname = usePathname();

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
      where("addStatus", "==", "pending") // Filter for active jobs
    );

    // Set up real-time listener for the filtered collection
    const unsubscribe = onSnapshot(jobsQuery, (snapshot) => {
      const jobList = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setJobs(jobList);
      setAllJobs(jobList);
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  useEffect(() => {
    const trimmedSearchData = searchData.trim().toLowerCase();

    if (trimmedSearchData !== "") {
      const filterData = allJobs.filter(
        (data: any) =>
          data.category &&
          data.category.toLowerCase().includes(trimmedSearchData)
      );
      setJobs(filterData);
    } else {
      setJobs(allJobs);
    }
  }, [searchData, allJobs]);

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

  const fetchJobById = async (jobId: string) => {
    try {
      const jobsRef = collection(db, "jobs"); // 'jobs' collection ka reference
      const q = query(jobsRef, where("jobId", "==", jobId)); // Query jobId ke equal data ke liye
      const querySnapshot = await getDocs(q);

      const jobData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      localStorage.setItem("editJob", JSON.stringify(jobData));

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

  window.onpopstate = function () {
    localStorage.removeItem("editJob");
  };

  const allowedRoutes = ["/addJob", "/location", "/reviewJob" , '/scheduleService'];


  useEffect(() => {
    if (!allowedRoutes.includes(pathname)) {
      localStorage.removeItem("editJob");
    }
  }, [pathname]);

  const handleEditClick = async (job: any) => {
    try {
      const editableJob = await fetchJobById(job.jobId);
      if (editableJob) {
        setEditableJob(editableJob);
      }

      router.push("/jobs/addJob");
    } catch (error) {
      console.error("Failed to fetch the job:", error);
    }
  };

  //handle click on the job

  const handleJobClick = (job: any) => {
    setSelectedJob(job);
    SetDetailModalOpen(true);
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

  const handleStatusChange = (e: any) => {
    setStatus(e.target.value);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleStatusClick = async (job: any) => {
    setIsModalOpen(true);
    setStatusJob(job);
    setStatus(job.addStatus);
  };

  const updateJobStatus = async () => {
    if ((StatusJob as any)?.jobId) {
      const jobRef = doc(db, "jobs", (StatusJob as any).jobId);
      await updateDoc(jobRef, {
        addStatus: status,
      });
      closeModal();
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
            {t("no_job_available")}
          </div>
        ) : (
          jobs.map((job: any) => (
            <div className="w-[310px] mt-[40px]" key={job.id}>
              <Card
                price={` € ${job.totalPriceWithTax}`}
                title={job.category || "No Title"}
                time={`${moment(job.bookingStart).format("hh:mm A")} - ${moment(
                  job.bookingEnd
                ).format("hh:mm A")}`}
                imageUrl={job.imageUrl || "/assets/servicesIcons/cardImage.svg"}
                status={job.addStatus || "Inactive"}
                statusTextColor={"yellow-400"}
                detailOpen={() => handleJobClick(job)}
                date={`Date: ${
                  moment(job.bookingDate).isValid()
                    ? moment(job.bookingDate).format("MMM -D -YYYY")
                    : "Invalid Date"
                }`}
                createdAt={moment(job.createdAt).fromNow()}
                dotsIcon="/assets/categoriesIcons/dots.svg"
                onEdit={() => handleEditClick(job)}
                onDelete={() => handleDeleteClick(job)}
                onStatus={() => handleStatusClick(job)}
              />
            </div>
          ))
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
              <div className="relative">
                <select
                  id="status-select"
                  value={status}
                  onChange={handleStatusChange}
                  className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="moderate">Moderate</option>
                </select>
                <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-xl">
                  ▾
                </span>
              </div>
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
          <BookingModal
            bookingData={selectedJob}
            handleClose={() => SetDetailModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default Page;
