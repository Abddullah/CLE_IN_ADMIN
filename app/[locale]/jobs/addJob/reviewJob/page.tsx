"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { db } from "@/app/[locale]/config/Firebase/FirebaseConfig";
import moment from "moment";
import {
  addDoc,
  collection,
  serverTimestamp,
  GeoPoint,
  doc,
  setDoc,
  getDocs,
} from "firebase/firestore";
import SuccessModal from "@/app/[locale]/components/sucessModal";

function Page() {
  const t = useTranslations("Jobs");
  const router = useRouter();
  const selector = useSelector((state: any) => state);

  const [job, setJob] = useState<null | any>();
  const [address, setAddress] = useState<null | any>();
  const [service, setService] = useState<null | any>();
  const [isDisbale, setIsDisable] = useState<boolean>(false);
  const [isSucessModalOpen, setIsSucessModalOpen] = useState(false);
  const [errorText, setErrorText] = useState<any>();
  const [reviewData, setReviewData] = useState<any[]>([]);
  const [reviewJob, setReviewJob] = useState<any[]>([]);
  const [paymentSummary, setPaymentSummary] = useState([]);
  const [editData, setEditData] = useState();
  const [amountAfterDiscount, setAmountAfterDiscount] = useState(0);

  useEffect(() => {
    const data = localStorage.getItem("editJob");
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        setEditData(parsedData[0]);
      } catch (error) {
        console.error("Invalid JSON data:", error);
      }
    }
  }, []);

  useEffect(() => {
    //get all the pages data from the local storage

    const job = localStorage.getItem("addJob");
    const jobData = job ? JSON.parse(job) : null;

    const address = localStorage.getItem("address");
    const addressData = address ? JSON.parse(address) : null;

    const service = localStorage.getItem("scheduleService");
    const serviceData = service ? JSON.parse(service) : null;


     const fetchTax = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, "payments"));
            const taxData = querySnapshot.docs.map((doc: any) => ({
              id: doc.id,
              ...doc.data(),
            }));
    
            const taxArray = taxData.flatMap((item) => item.tax || []);
    
            setPaymentSummary(taxArray as any);
          } catch (error) {
            console.error("Error fetching tax data:", error);
          }
        };
    
        fetchTax();

  

    reviewData.push(jobData, addressData, serviceData);

    setReviewData([...reviewData]);

  
  }, []);

  const timeStart = moment(reviewData[2]?.startTime, "HH:mm").format("hh:mm A");
  const timeEnd = moment(reviewData[2]?.endTime, "HH:mm").format("hh:mm A");

  //fetch additional Service

  const [additionalService, setAdditionalService] = useState([]);

  // const fetchAdditionalServices = async (titlesToMatch: any) => {
  //   // Initialize Firestore
  //   const servicesCollection = collection(db, "additionalServices");

  //   try {
  //     const querySnapshot = await getDocs(servicesCollection); // Fetch the data from the collection
  //     const servicesList = querySnapshot.docs.map((doc) => doc.data()); // Extract the data from each document
    

  //     // Filter the services based on matching titles
  //     const filteredServices = servicesList.filter((service) =>
  //       titlesToMatch?.includes(service.title)
  //     );
  //     setAdditionalService(filteredServices as any);
  //   } catch (error) {
  //     console.error("Error fetching additional services: ", error);
  //   }
  // };
  const fetchAdditionalServices = async (titlesToMatch: any) => {
    let isMounted = true; // ✅ Track mount status
  
    const servicesCollection = collection(db, "additionalServices");
  
    try {
      const querySnapshot = await getDocs(servicesCollection);
      const servicesList = querySnapshot.docs.map((doc) => doc.data());
  
      const filteredServices = servicesList.filter((service) =>
        titlesToMatch?.includes(service.title)
      );
  
      if (isMounted) {
        setAdditionalService(filteredServices as any);
      }
    } catch (error) {
      console.error("Error fetching additional services: ", error);
    }
  
    return () => {
      isMounted = false; 
    };
  };
  
  fetchAdditionalServices(reviewData[0]?.Additionalservices);

  //function to covert in english for store in db

  const closeModal = () => {
    setIsSucessModalOpen(false);
    router.push("/jobs");
  };

  let totalWithDiscount = 0;

  useEffect(() => {
    if (reviewData[0]?.plan.value == "Weekly") {
      totalWithDiscount = Number(
        (
          reviewData[0]?.totalWithTax -
          reviewData[0]?.totalWithTax * 0.1
        ).toFixed(2)
      );
      setAmountAfterDiscount(totalWithDiscount);
    } else if (reviewData[0]?.plan.value == "Every 2 Weeks") {
      totalWithDiscount = Number(
        (
          reviewData[0]?.totalWithTax -
          reviewData[0]?.totalWithTax * 0.05
        ).toFixed(2)
      );
      setAmountAfterDiscount(totalWithDiscount);
    } else {
      totalWithDiscount = reviewData[0]?.totalWithTax;
      setAmountAfterDiscount(totalWithDiscount);
    }
  }, [setAmountAfterDiscount, totalWithDiscount]);

  const clickNext = async () => {
    setIsDisable(true);

    const geoPoint = new GeoPoint(
      reviewData[0]?.location.lat,
      reviewData[0]?.location.lng
    );


    let formatCleaningMaterials = "";

    if (reviewData[0]?.needmaterial === t("No")) {
      formatCleaningMaterials = "No, I have them";
    }
    if (reviewData[0]?.needmaterial === t("yes")) {
      formatCleaningMaterials = "Yes, Please";
    }

    const additionalServices = additionalService.map((service: any) => ({
      ...service,
      isSelect: true,
    }));

    try {
      const jobCollectionRef = collection(db, "jobs");

      if (editData) {
        const existingDocRef = doc(jobCollectionRef, (editData as any).id);
        await setDoc(existingDocRef, {
          jobId: (editData as any).id,
          repeateService: reviewData[0]?.plan.value,
          roomSize: reviewData[0]?.roomsizes || "",
          roomsQty: reviewData[0]?.numberofrooms || "",
          category: reviewData[0]?.category,
          howManyHourDoYouNeed: reviewData[0]?.hour,
          howManyProfessionalDoYouNeed: reviewData[0]?.professional,
          subCategory: reviewData[0]?.subcategory,
          aditionalServices: additionalServices || [],
          createdAt: new Date().getTime(),
          addStatus: (editData as any).addStatus,
          addType: "job",
          geoPoint: geoPoint,
          bookingDate: new Date(reviewData[2]?.ServiceDate).getTime(),
          bookingStart: moment(reviewData[2]?.startTime, "HH:mm").valueOf(),
          bookingEnd: moment(reviewData[2]?.endTime, "HH:mm").valueOf(),
          images: Array(6).fill({ imagURL: "" }),
          totalPrice: Number(reviewData[0]?.total).toFixed(2),
          totalPriceWithTax: amountAfterDiscount,
          needCleaningMaterials: formatCleaningMaterials,
          address: reviewData[1]?.locationRequired,
          instructions: reviewData[1]?.instructionRequired,
          postedBy: reviewData[1]?.postedBy,
        });

        console.log(`Document updated with ID:`, existingDocRef.id);
      } else {
        // Create a new document
        const newDocRef = doc(jobCollectionRef);
        await setDoc(newDocRef, {
          jobId: newDocRef.id,
          repeateService: reviewData[0]?.plan.value,
          roomSize: reviewData[0]?.roomsizes || "",
          roomsQty: reviewData[0]?.numberofrooms || "",
          category: reviewData[0]?.category,
          howManyHourDoYouNeed: reviewData[0]?.hour,
          howManyProfessionalDoYouNeed: reviewData[0]?.professional,
          subCategory: reviewData[0]?.subcategory,
          aditionalServices: additionalServices || [],
          createdAt: new  Date().getTime(),
          addStatus: "pending",
          addType: "job",
          geoPoint: geoPoint,
          bookingDate: new Date(reviewData[2]?.ServiceDate).getTime(),
          bookingStart: moment(reviewData[2]?.startTime, "HH:mm").valueOf(),
          bookingEnd: moment(reviewData[2]?.endTime, "HH:mm").valueOf(),
          images: Array(6).fill({ imagURL: "" }),
          totalPrice: Number(reviewData[0]?.total).toFixed(2),
          totalPriceWithTax: amountAfterDiscount,
          needCleaningMaterials: formatCleaningMaterials,
          address: reviewData[1]?.locationRequired,
          instructions: reviewData[1]?.instructionRequired,
          postedBy: localStorage.getItem("JobPostUserId"),
        });

        console.log(`Document created with ID:`, newDocRef.id);
      }

      // Cleanup and success handling
      localStorage.removeItem("editJob");
      setIsDisable(false);
      setIsSucessModalOpen(true);

      setTimeout(() => {
        router.push("/jobs");
      }, 3000);
    } catch (error) {
      console.error("Error adding/updating document:", error);
      setIsDisable(false);
    }
  };
  //edit data in the firebase

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F7FA] to-white">
      <div className="container px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl">
          <h1 className="text-1xl md:text-2xl font-bold text-gray-900 mb-8 tracking-tight">
            {t("pageTitle")}{" "}
          </h1>

          <div className="bg-white border-2 rounded-2xl shadow-xl p-8 mb-10 transition-all duration-300 hover:shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Service Details */}
              <div className="space-y-8">
                <div className="transform transition-all duration-300 hover:translate-x-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    {t("service")}
                  </h2>
                  <p className="text-gray-700 text-lg">
                    {reviewData[0]?.category}
                  </p>
                </div>
                <div className="transform transition-all duration-300 hover:translate-x-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    {t("description")}
                  </h2>
                  <p className="text-gray-700 text-lg">
                    {reviewData[0]?.subcategory}{" "}
                  </p>
                </div>
                <div className="transform transition-all duration-300 hover:translate-x-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    {t("professionalCleaners")}
                  </h2>
                  <p className="text-gray-700 text-lg">
                    {reviewData[0]?.professional} Professional
                  </p>
                </div>
                <div className="transform transition-all duration-300 hover:translate-x-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    {t("frequency")}
                  </h2>
                  <p className="text-gray-700 text-lg">
                    {reviewData[0]?.plan.value}
                  </p>
                </div>
              </div>

              {/* Additional Details */}
              <div className="space-y-8">
                <div className="transform transition-all duration-300 hover:translate-x-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    {t("appointmentDate")}
                  </h2>
                  <p className="text-gray-700 text-lg">
                    {reviewData[2]?.ServiceDate}
                  </p>
                </div>
                <div className="transform transition-all duration-300 hover:translate-x-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    {t("duration")}
                  </h2>
                  <p className="text-gray-700 text-lg">
                    {`${timeStart} - ${timeEnd}`}
                  </p>
                </div>
                <div className="transform transition-all duration-300 hover:translate-x-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    {t("location")}
                  </h2>
                  <p className="text-gray-700 text-lg">
                    {reviewData[1]?.locationRequired}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Summary Card */}
          <div className="bg-white border-2 rounded-2xl shadow-xl p-8 max-w-md mb-10 transition-all duration-300 hover:shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {t("Summary")}
            </h2>
            <div className="space-y-6">
              <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <span className="text-lg text-gray-700">
                  {t("serviceAmount")}
                </span>
                <span className="text-xl text-gray-900 font-semibold">
                  €{reviewData[0]?.total}
                </span>
              </div>

              {/* Map over reviewData to display name and percentage */}
              {paymentSummary !== null   &&
  paymentSummary.map(
    (item: any, index: any) =>
      item.name &&
      item.percentage && (
        <div
          key={index}
          className="flex justify-between items-center py-4 border-b border-gray-200"
        >
          <span className="text-lg text-gray-700">{item.name}</span>
          <span className="text-xl text-gray-900 font-semibold">
            {item.percentage}%
          </span>
        </div>
      )
  )}

              <div className="flex justify-between items-center pt-6">
                <span className="text-xl font-bold text-gray-900">
                  {t("total")}
                </span>
                <span className="text-2xl font-bold text-[#00BFFF]">
                  €{amountAfterDiscount}
                </span>
              </div>
            </div>
          </div>

          {/* Book Button */}
          <div className="mt-8 flex justify-center items-center">
            <Button
              type="submit"
              onClick={clickNext}
              disabled={isDisbale}
              className="w-[250px] mb-4 mt-6 h-[45px] text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out"
            >
              <span>{t("next")}</span>
            </Button>
          </div>
          <SuccessModal
            text={editData ? t("job_updated_sucess") : t("job_created_sucess")}
            isOpen={isSucessModalOpen}
            onClose={closeModal}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
