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

function Page() {
  const t = useTranslations("Jobs"); 
  const [jobs, setJobs] = useState<any>([]);
  const [editableJob, setEditableJob] = useState<null | any>(null); // Store the job being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [categories, setCategories] = useState<any[]>([]);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [selectedJob , setSelectedJob] = useState<null | any>(null);
  const [detailModalOpen , SetDetailModalOpen] = useState<boolean>(false);

  const router = useRouter()


  

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
      where("addStatus", "==", "active") // Filter for active jobs
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

  console.log(jobs);
  

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

  // const handleEditClick = (job: any) => {
  //   setEditableJob(job);
  //   setIsModalOpen(true);
  // };

  //fetch the job from db by id 


  const fetchJobById = async (jobId:string) => {
    try {
        const jobsRef = collection(db, "jobs"); // 'jobs' collection ka reference
        const q = query(jobsRef, where("jobId", "==", jobId)); // Query jobId ke equal data ke liye
        const querySnapshot = await getDocs(q);

        const jobData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        localStorage.setItem("editJob", JSON.stringify(jobData))

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


const handleEditClick = async (job:any) => {
  console.log("Editing job ID:", job.jobId);
  try {
      const editableJob = await fetchJobById(job.jobId);
      if (editableJob) {
          setEditableJob(editableJob);
          setIsModalOpen(true);
      }

      router.push("/jobs/addJob")

    
  } catch (error) {
      console.error("Failed to fetch the job:", error);
  }
};


console.log(editableJob)





  //handle click on the job

  const handleJobClick = (job:any) => {
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



      <div>
      {detailModalOpen && <BookingModal bookingData={selectedJob} handleClose={()=>SetDetailModalOpen(false)} />}
      </div>
    </div>
  );
}

export default Page;
