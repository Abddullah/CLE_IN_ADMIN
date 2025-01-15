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
  setDoc
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
  const [paymentSummary , setPaymentSummary] = useState([]);

  useEffect(() => {

    //get all the pages data from the local storage

    const job = localStorage.getItem("addJob");
    const jobData = job ? JSON.parse(job) : null;

    const address = localStorage.getItem("address");
    const addressData = address ? JSON.parse(address) : null;

    const service = localStorage.getItem("scheduleService");
    const serviceData = service ? JSON.parse(service) : null;

    const tax = localStorage.getItem("tax");
    const taxData = tax ? JSON.parse(tax) : null;

    //push the get data from local storage to the state array

    reviewData.push(jobData, addressData, serviceData);

    setReviewData([...reviewData]);

    //push the payemet data in the payment summary state

    setPaymentSummary(taxData);

    
    

  }, []);

  const timeStart = moment(reviewData[2]?.startTime, "HH:mm").format("hh:mm A")
  const timeEnd = moment(reviewData[2]?.endTime, "HH:mm").format("hh:mm A")


  

  const closeModal = () => {
    setIsSucessModalOpen(false);
    router.push('/jobs')
  };

  const clickNext = async () => {
    setIsDisable(true);

    const geoPoint = new GeoPoint(
      reviewData[0]?.location.lat,
      reviewData[0]?.location.lng
    );

    try {
      // Firebase ki `job` collection reference
      const jobCollectionRef = collection(db, "jobs");
    
      // Nayi document ID generate karna
      const newDocRef = doc(jobCollectionRef); // Ye random ID generate karega
    
      // Data save karna
      await setDoc(newDocRef, {
        jobId: newDocRef.id, // Random ID ko data mein shamil karna
        repeateService: reviewData[0]?.plan.value,
        roomSize: reviewData[0]?.roomsizes || "",
        roomsQty: reviewData[0]?.numberofrooms || "",
        category: reviewData[0]?.category,
        howManyHourDoYouNeed: reviewData[0]?.hour,
        howManyProfessionalDoYouNeed: reviewData[0]?.professional,
        subCategory: reviewData[0]?.subcategory,
        aditionalServices: reviewData[0]?.Additionalservices,
        createdAt: new Date().getTime(),
        addStatus: "pending",
        addType: "job",
        geoPoint: geoPoint,
        bookingDate: new Date(reviewData[2]?.ServiceDate).getTime(),
        bookingStart: moment(reviewData[2]?.startTime, "HH:mm").valueOf(),
        bookingEnd: moment(reviewData[2]?.endTime, "HH:mm").valueOf(),
        images: [
          { imagURL: "" },
          { imagURL: "" },
          { imagURL: "" },
          { imagURL: "" },
          { imagURL: "" },
          { imagURL: "" },
        ],
        totalPrice: reviewData[0]?.total,
        totalPriceWithTax: reviewData[0]?.totalWithTax,
        needCleaningMaterials: reviewData[0]?.needmaterial || "",
        address: reviewData[1]?.locationRequired,
        instructions: reviewData[1]?.instructionRequired,
        postedBy:localStorage.getItem('JobPostUserId'),
      });
    
      console.log("Document written with ID:", newDocRef.id);
      setIsDisable(false);
      setIsSucessModalOpen(true);
      setTimeout(() => {
        router.push('/jobs');
      }, 3000);
    } catch (error) {
      console.error("Error adding document:", error);
    }
    
  };

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
                    {t("rate")}
                  </h2>
                  <p className="text-gray-700 text-lg">5</p>
                </div>
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
    {paymentSummary.map((item:any, index:any) => (
      item.name && item.percentage && (
        <div key={index} className="flex justify-between items-center py-4 border-b border-gray-200">
          <span className="text-lg text-gray-700">
            {item.name}
          </span>
          <span className="text-xl text-gray-900 font-semibold">
            {item.percentage}%
          </span>
        </div>
      )
    ))}

    <div className="flex justify-between items-center pt-6">
      <span className="text-xl font-bold text-gray-900">
        {t("total")}
      </span>
      <span className="text-2xl font-bold text-[#00BFFF]">
        €{reviewData[0]?.totalWithTax}
      </span>
    </div>
  </div>
</div>


          {/* Book Button */}
          <div className="mt-8 flex justify-center items-center">
            {/* <Link href={"/jobs/"}> */}
            <Button
              type="submit"
              onClick={clickNext}
              disabled={isDisbale}
              className="w-[250px] mb-4 mt-6 h-[45px] text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out"
            >
              <span>{t("next")}</span>
            </Button>
            {/* </Link> */}
          </div>
          <SuccessModal
            text={`${(t('job_created_sucess'))}`}
            isOpen={isSucessModalOpen}
            onClose={closeModal}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
