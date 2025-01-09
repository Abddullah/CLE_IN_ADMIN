"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@/i18n/routing";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslations } from "next-intl";
import { setLocation } from '../../../config/Redux/reducers/addressSlice'; // Adjust path
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";



function page() {
  const t = useTranslations("Jobs");

  const dispatch = useDispatch()

  
  
 
  const router = useRouter();

  type Inputs = {
    location: string;
    locationRequired: string;
    instruction: string;
    instructionRequired: string;
  };
  

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();




  const onSubmit: SubmitHandler<Inputs> = (data: any) => {
   
    console.log(data);
    const formData = {
      location: data.locationRequired,
      instructions: data.instructionRequired,
    };

    dispatch(setLocation(formData));
    localStorage.setItem("address" , JSON.stringify(data))


    
    


    
    
    router.push('/jobs/addJob/scheduleService')
    
  };
  return (
    <>
      <div className="bg-[#F5F7FA] min-h-screen w-full flex items-start justify-start pt-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-7xl px-8 lg:px-16 mt-6"
        >
          {/* Location Field */}
          <div className="mb-4">
            <label
              htmlFor="instructions"
              className="text-md font-semibold text-gray-800"
            >
              {t("Location")}
            </label>
            <div className="relative mt-2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#00BFFF]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2C8.134 2 5 5.134 5 9c0 4.418 4.373 9.44 6.708 11.56a1.504 1.504 0 002.585 0C14.627 18.44 19 13.418 19 9c0-3.866-3.134-7-7-7z"
                  />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </span>
              <input
                type="text"
                id="location"
                {...register("locationRequired", { required: true })}
                placeholder={t("LocationPlacholder")}
                className="w-full pl-10 pr-4 py-2 border border-[#00BFFF] rounded-md shadow-sm focus:outline-none focus:ring-1  focus:ring-[#00BFFF]"
              />
            </div>
            {errors.locationRequired && (
              <span className="text-red-600">{t("RequiredLocation")}</span>
            )}
          </div>

          {/* Any Specific Instruction? Textarea */}
          <div className="mt-6">
            <label
              htmlFor="instructions"
              className="text-md font-semibold text-gray-800"
            >
              {t("specificInstruction")}
            </label>
            <textarea
              id="instructions"
              rows={4}
              placeholder={t("InstructionPlaceholder")}
              className="w-full mt-2 p-3 border border-[#00BFFF] rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#00BFFF] focus:border-[#00BFFF]"
              {...register("instructionRequired", { required: true })}
            ></textarea>
            {errors.instructionRequired && (
              <span className="text-red-600">
                Please provide any specific instructions
              </span>
            )}
          </div>

          <div className="mt-8 flex justify-center items-center">
            {/* <Link href={"/jobs/scheduleService"}> */}
            <Button
              type="submit"
              className="w-[250px] mb-4 mt-6 h-[45px] text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out"
            >
              <span>{t("next")}</span>
            </Button>
            {/* </Link> */}
          </div>
        </form>
      </div>
    </>
  );
}

export default page;
