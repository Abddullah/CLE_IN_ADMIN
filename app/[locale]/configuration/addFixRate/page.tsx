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
  const t = useTranslations("Services");

  type InputTitle = {
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
  const router = useRouter();

  const path = usePathname();
  const language = path.replace("/configuration/fixRates/addFixRates", "");
  const lang = language.replace("/", "");

  const onSubmit: SubmitHandler<InputTitle> = async (data) => {
    try {
      // Check if a card already exists
      const querySnapshot = await getDocs(collection(db, "fixRates"));

      // Add data to Firebase Firestore
      const docRef = doc(collection(db, "fixRates"));

      const fixRates = {
        rate: data.priceRequired,
        createdAt: serverTimestamp(),
        id: docRef.id,
      };
      await setDoc(docRef, fixRates);
      reset();

      setShowModal(true);
      setTimeout(() => {
        router.push("/configuration");
      }, 3000);
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
    router.push("/configuration");
  };

  return (
    <>
      <div className="bg-[#F5F7FA] min-h-screen w-full flex items-start justify-start pt-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16"
        >
          <h1 className="text-2xl font-bold mb-4">{t("add_fix_rate")}</h1>

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
            <Label htmlFor="text" className="font-semibold text-md">
              {t("fix_Rate")}
            </Label>
            <Input
              type="number"
              {...register("priceRequired", {
                required: true,
                pattern: /^\d+$/,
              })}
              placeholder={t("Enter_fixRates")}
              className="h-[50px] border-[#4BB1D3]"
              id="number"
            />
            {errors.priceRequired && (
              <span className="text-red-600">{t("fix_rate_required")}</span>
            )}
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              className="border-[#4BB1D3] w-full h-[40px] mt-5 text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out sm:w-[150px] sm:h-[45px]"
            >
              <span>{t("add_button")}</span>
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default page;
