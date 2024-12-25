"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslations } from "next-intl";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  setDoc,
  getDocs,
} from "firebase/firestore"; // import Firebase methods
import { db } from "@/app/[locale]/config/Firebase/FirebaseConfig";
import getFirebaseErrorMessage from "@/app/firebaseErrorHandler";
import { usePathname } from "next/navigation";
import { useRouter } from "@/i18n/routing";

function page() {
  const t = useTranslations("AdditionalServices");

  type InputTitle = {
    title: string;
    titleRequired: string;
    price: number;
    priceRequired: number;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputTitle>();
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [errorModal, setErrorModal] = useState(false); // State to control error modal visibility
  const router = useRouter()

  const path = usePathname();
  const language = path.replace("/configuration/hourlyRate/addHourlyRate", "");
  const lang = language.replace("/", "");

  const onSubmit: SubmitHandler<InputTitle> = async (data) => {
    try {
      
    

      // Add data to Firebase Firestore
      const docRef = doc(collection(db, "roomSize"));

      const AdditionalService = {
        title: data.titleRequired,
        rate: data.priceRequired,
        createdAt: serverTimestamp(),
        id: docRef.id,
      };
      await setDoc(docRef, AdditionalService);
      reset();
      
      setShowModal(true);
      setTimeout(() => {
        router.push('/configuration/roomAreaSize')

      }, 3000)
    } catch (e: any) {
      const errorCode = e.code;
      const errorMessage = await getFirebaseErrorMessage(errorCode, lang);
      console.log(errorMessage);
    }
  };

  // Close modals
  const closeModal = () => {
    setShowModal(false);
    setErrorModal(false);
    router.push('/configuration/roomAreaSize')
  };

  return (
    <>
      <div className="bg-[#F5F7FA] min-h-screen w-full flex items-start justify-start pt-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16"
        >
          <h1 className="text-2xl font-bold mb-4">{t("add_room_size")}</h1>

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-8">
            <Label htmlFor="text" className="font-semibold text-md">
              {t("title")}
            </Label>
            <Input
              type="text"
              {...register("titleRequired", { required: true })}
              placeholder={t("room_size_title")}
              className="h-[50px] border-[#4BB1D3]"
              id="title"
            />
            {errors.titleRequired && (
              <span className="text-red-600">{t("title_required")}</span>
            )}
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
            <Label htmlFor="text" className="font-semibold text-md">
              {t("price")}
            </Label>
            <Input
              type="number"
              {...register("priceRequired", {
                required: true,
                pattern: /^\d+$/,
              })}
              placeholder={t("price_placeholder")}
              className="h-[50px] border-[#4BB1D3]"
              id="number"
            />
            {errors.priceRequired && (
              <span className="text-red-600">{t("price_required")}</span>
            )}
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              className="border-[#4BB1D3] w-full h-[40px] mt-5 text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out sm:w-[100px] sm:h-[45px]"
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
            <h2 className="text-2xl font-bold text-center text-green-500">
              {t("room_sucess")}
            </h2>
            <p className="text-center text-gray-600 mt-2">
              {t("room_added_message")}
            </p>
            <div className="mt-4 flex justify-center">
              <Button
                onClick={closeModal}
                className="bg-[#00BFFF] text-white hover:bg-[#00A0E0]"
              >
                {t("close_button")}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {errorModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-red-600">
              {t("error_occured")}
            </h2>
            <p className="mt-2">{t("error_message")}</p>
            <button
              onClick={() => setErrorModal(false)}
              className="mt-4 px-4 py-2 bg-[#00BFFF] text-white rounded"
            >
              {t("close_button")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default page;