

"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslations } from "next-intl";
import { collection, addDoc, query, getDocs, serverTimestamp } from "firebase/firestore"; 
import { db } from "../../config/Firebase/FirebaseConfig";

type Field = {
  id: number;
};

type InputTitle = {
  [key: string]: string | number;
};

function Page() {
  const t = useTranslations("Payments");
  const [fields, setFields] = useState<Field[]>([{ id: 1 }, { id: 2 }]);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false); // State to handle error modal visibility
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State for success modal visibility

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputTitle>();

  // Function to check if any card exists in the "payments" collection
  const checkExistingCard = async () => {
    const q = query(collection(db, "payments"));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // If the query is not empty, a card already exists
  };

  // On form submit
  const onSubmit: SubmitHandler<InputTitle> = async (data) => {
    try {
      // Check if a card already exists
      const cardExists = await checkExistingCard();
      if (cardExists) {
        setShowErrorModal(true); // Show error modal if a card exists
        return;
      }

      // Prepare data for Firebase
      const paymentData = Object.keys(data).reduce((acc, key) => {
        // Modify field keys to avoid using dashes or spaces
        const newKey = key.replace(/-/g, "");
        acc[newKey] = data[key];
        return acc;
      }, {} as { [key: string]: any });

      // Add form data to Firebase "payments" collection
      await addDoc(collection(db, "payments"), {
        ...paymentData,
        createdAt: serverTimestamp(),
      });
      console.log("Payment saved successfully!");

      // Show success modal after creating the first card
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error saving payment data: ", error);
    }
  };

  const addMoreFields = () => {
    setFields([...fields, { id: fields.length + 1 }]);
  };

  const deleteField = (id: number) => {
    if (fields.length > 2) {
      setDeletingId(id);
      setTimeout(() => {
        setFields(fields.filter((field) => field.id !== id));
        setDeletingId(null);
      }, 300);
    }
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen w-full flex items-start justify-start pt-8 px-4 sm:px-8 md:px-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl px-6 sm:px-8 md:px-12"
      >
        <h1 className="text-3xl font-bold mb-8 text-gray-800">{t("add_payment")}</h1>

        {/* Default Fields */}
        <div className="space-y-10">
          {fields.slice(0, 1).map((field) => (
            <div key={field.id} className="grid w-full max-w-sm items-center gap-2 mb-4">
              <Label htmlFor={`name-${field.id}`} className="font-semibold text-md text-gray-700">
                {t("name")}
              </Label>
              <Input
                type="text"
                {...register(`name${field.id}`, { required: true })} // Changed to name{field.id}
                placeholder={t("enter_name")}
                className="h-[50px] border-[#4BB1D3] mt-2 focus:ring-[#4BB1D3] w-full sm:w-[22rem]"
                id={`name-${field.id}`}
              />
              {errors[`name${field.id}`] && (
                <span className="text-red-600 text-sm mt-1">{t("name_required")}</span>
              )}

              <Label htmlFor={`percentage-${field.id}`} className="font-semibold text-md text-gray-700">
                {t("percentage")}
              </Label>
              <Input
                type="text"
                {...register(`percentage${field.id}`, { required: true })} // Changed to percentage{field.id}
                placeholder={t("enter_percentage")}
                className="h-[50px] border-[#4BB1D3] mt-2 focus:ring-[#4BB1D3] w-full sm:w-[22rem]"
                id={`percentage-${field.id}`}
              />
              {errors[`percentage${field.id}`] && (
                <span className="text-red-600 text-sm mt-1">{t("percentage_required")}</span>
              )}
            </div>
          ))}
        </div>

        {/* Additional Fields */}
        <div className="flex max-w-full mt-6 flex-col space-y-6">
          {fields.slice(2).map((field) => (
            <div
              key={field.id}
              className={`relative flex w-full items-center gap-6 rounded-lg 
              ${deletingId === field.id ? "opacity-0 scale-95" : "opacity-100 scale-100"} transition`}
            >
              <div className="flex-grow">
                <Label htmlFor={`name-${field.id}`} className="font-semibold text-md text-gray-700">
                  {t("name")}
                </Label>
                <Input
                  type="text"
                  {...register(`name${field.id}`, { required: true })} 
                  placeholder={t("enter_name")}
                  className="h-[50px] border-[#4BB1D3] mt-2 focus:ring-[#4BB1D3] min-w-full"
                  id={`name-${field.id}`}
                />
                {errors[`name${field.id}`] && (
                  <span className="text-red-600 text-sm mt-1">{t("name_required")}</span>
                )}
              </div>

              <div className="flex-grow">
                <Label htmlFor={`percentage-${field.id}`} className="font-semibold text-md text-gray-700">
                  {t("percentage")}
                </Label>
                <Input
                  type="text"
                  {...register(`percentage${field.id}`, { required: true })} // Changed to percentage{field.id}
                  placeholder={t("enter_percentage")}
                  className="h-[50px] border-[#4BB1D3] mt-2 focus:ring-[#4BB1D3] max-w-full"
                  id={`percentage-${field.id}`}
                />
                {errors[`percentage${field.id}`] && (
                  <span className="text-red-600 text-sm mt-1">{t("percentage_required")}</span>
                )}
              </div>

              <button
                type="button"
                onClick={() => deleteField(field.id)}
                className="w-12 h-11 mt-8 flex items-center justify-center rounded bg-[#00BFFF] text-white hover:bg-[#00BFFF] transition"
                aria-label="Delete field"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <Button
          type="button"
          onClick={addMoreFields}
          className="w-full sm:w-[22rem] max-w-sm mt-6 text-[#4BB1D3] bg-white border-2 border-[#4BB1D3] rounded-lg hover:bg-[#F5F7FA] transition duration-200"
        >
          <span className="text-2xl">+</span> {t("add_more")}
        </Button>

        <div className="mt-6">
          <Button
            type="submit"
            className="w-full sm:w-[22rem] max-w-sm h-[45px] mt-5 text-white bg-[#00BFFF] rounded-lg hover:bg-[#00A0E0] transition duration-200"
          >
            {(t('save'))}
          </Button>
        </div>
      </form>

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-red-600">Error</h2>
            <p className="mt-2">Only one card can be created at a time.</p>
            <button
              onClick={() => setShowErrorModal(false)}
              className="mt-4 px-4 py-2 bg-[#00BFFF] text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-green-600">Success</h2>
            <p className="mt-2">Payment Card Created Successfully!</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="mt-4 px-4 py-2 bg-[#00BFFF] text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
