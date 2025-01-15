"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  collection,
  doc,
  setDoc,
  GeoPoint,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../config/Firebase/FirebaseConfig";
import moment from "moment";

function page() {
  const t = useTranslations("Jobs");
  const router = useRouter();

  const [reviewServiceData, setReviewServiceData] = useState<any>();
  const [rateWithTax, setRateWithTax] = useState<number>(0);
  const [paymentSummary , setPaymentSummary]= useState([])

  useEffect(() => {
    const data = localStorage.getItem("tax");

    const tax = data ? JSON.parse(data) : 0;

   setPaymentSummary(tax)

     console.log(paymentSummary);
     

   
  }, [Number(reviewServiceData?.fixRate)]);



  useEffect(() => {
    const data = localStorage.getItem("addService");

    const reviewService = data ? JSON.parse(data) : null;

    setReviewServiceData(reviewService);
  }, []);




  let timeSlot = reviewServiceData?.days
  .filter((obj: any) => obj !== null && obj !== undefined) // Null aur undefined ko filter karna
  .map((obj: any) => {
    // 'isChecked' ko delete karna
    const { isChecked, openingTime, closingTime, ...rest } = obj;

    // 'openingTime' aur 'closingTime' ko milliseconds mein convert karna
    const openingTimeMs = moment(openingTime, 'hh:mm A').valueOf();
    const closingTimeMs = moment(closingTime, 'hh:mm A').valueOf();

    return {
      ...rest, // Baaki properties ko preserve karna
      openingTime: openingTimeMs, // Opening time ko milliseconds mein convert karna
      closingTime: closingTimeMs // Closing time ko milliseconds mein convert karna
    };
  });


  const clickNext = async () => {
    // setIsDisable(true);

    const geoPoint = new GeoPoint(
      reviewServiceData.location.lat,
      reviewServiceData?.location.lng
    );

    try {
      // Firebase ki `job` collection reference
      const jobCollectionRef = collection(db, "service");

      // Nayi document ID generate karna
      const newDocRef = doc(jobCollectionRef); // Ye random ID generate karega

      const timeStamp = serverTimestamp()

      console.log(timeStamp);
      

      // Data save karna
      await setDoc(newDocRef, {
        serviceId: newDocRef.id, // Random ID ko data mein shamil karna
        category: reviewServiceData?.category,
        subCategory: reviewServiceData?.subcategory,
        createdAt: new Date().getTime(),
        addStatus: "pending",
        addType: "service",
        description: reviewServiceData?.description,
        geoPoint: geoPoint,
        fixRates: reviewServiceData?.fixRate,
        postedBy: localStorage.getItem("servicePostId"),
        totalPriceWithTax: reviewServiceData?.totalWithTax,
        timeSlots:timeSlot,
        images: [
          { imagURL: "" },
          { imagURL: "" },
          { imagURL: "" },
          { imagURL: "" },
          { imagURL: "" },
          { imagURL: "" },
        ],
      });

      console.log("Document written with ID:", newDocRef.id);
      setTimeout(() => {
        router.push("/services");
      }, 3000);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  return (
    <>
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
                      {reviewServiceData?.category}
                    </p>
                  </div>
                  <div className="transform transition-all duration-300 hover:translate-x-2">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      {t("subcategory")}
                    </h2>
                    <p className="text-gray-700 text-lg">
                      {reviewServiceData?.description}{" "}
                    </p>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="space-y-8">
                  <div className="transform transition-all duration-300 hover:translate-x-2">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      {t("description")}
                    </h2>
                    <p className="text-gray-700 text-lg">
                      {reviewServiceData?.subcategory}{" "}
                    </p>
                  </div>

                  <div className="transform transition-all duration-300 hover:translate-x-2">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      {t("duration")}
                    </h2>
                    <p className="text-gray-700 text-lg">
                      {reviewServiceData?.category}
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
        € {reviewServiceData?.fixRate}
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
      Total
      </span>
      <span className="text-2xl font-bold text-[#00BFFF]">
        € {reviewServiceData?.totalWithTax}
      </span>
    </div>
  </div>
</div>
            {/* Book Button */}
            <div className="mt-8 flex justify-center items-center">
              <Button
                type="submit"
                onClick={clickNext}
                className="w-[250px] mb-4 mt-6 h-[45px] text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out"
              >
                <span>{t("next")}</span>
              </Button>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
