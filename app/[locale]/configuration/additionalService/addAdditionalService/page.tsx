"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslations } from "next-intl";
import {  addDoc, collection, serverTimestamp , doc , setDoc} from "firebase/firestore"; // import Firebase methods
import { db } from "@/app/[locale]/config/Firebase/FirebaseConfig";
import { useRouter } from "@/i18n/routing";
function page() {
  const t = useTranslations("AdditionalServices");

  type InputTitle = {
    title: string;
    titleRequired: string;
    price: number;
    priceRequired: number;
  };

  const { register, handleSubmit, formState: { errors } } = useForm<InputTitle>();
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const router = useRouter();

  const onSubmit: SubmitHandler<InputTitle> = async (data) => {
    try {
      // Add data to Firebase Firestore
      const docRef = doc(collection(db ,"additionalServices" ))
   
      
       const AdditionalService =  {
        title: data.titleRequired,
        price: data.priceRequired,
        createdAt:serverTimestamp(),
        id:docRef.id
      };

      await setDoc(docRef , AdditionalService)
      console.log("Data added successfully");
      

      
      setShowModal(true);
      setTimeout(() => {
        router.push('/configuration/additionalService')

      },3000)
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    router.push('/configuration/additionalService')
  };

  return (
    <>
      <div className="bg-[#F5F7FA] min-h-screen w-full flex items-start justify-start pt-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16"
        >
          <h1 className="text-2xl font-bold mb-4">{t("add_additional_services")}</h1>

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-8">
            <Label htmlFor="text" className="font-semibold text-md">
              {t("title")}
            </Label>
            <Input
              type="text"
              {...register("titleRequired", { required: true })}
              placeholder={t("title_placeholder")}
              className="h-[50px] border-[#4BB1D3]"
              id="title"
            />
            {errors.titleRequired && <span className="text-red-600">{t("title_required")}</span>}
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
            <Label htmlFor="text" className="font-semibold text-md">
              {t("price")}
            </Label>
            <Input
              type="text"
              {...register("priceRequired", {
                required: true,
                pattern: /^\d+$/,
              })}
              placeholder={t("price_placeholder")}
              className="h-[50px] border-[#4BB1D3]"
              id="number"
            />
            {errors.priceRequired && <span className="text-red-600">{t("price_required")}</span>}
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              className="border-[#4BB1D3] w-full h-[40px] mt-5 text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out sm:w-[120px] sm:h-[45px]"
            >
              <span>{t("add_button")}</span>
            </Button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold text-center text-green-500">{t("service_added_successfully")}</h2>
            <p className="text-center text-gray-600 mt-2">{t("additional_service_added_message")}</p>
            <div className="mt-4 flex justify-center">
              <Button onClick={closeModal} className="bg-[#00BFFF] text-white hover:bg-[#00A0E0]">
                {t("close_button")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default page;

















