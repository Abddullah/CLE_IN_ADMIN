"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form"; // Import necessary types
import { setServiceData } from "@/app/[locale]/config/Redux/reducers/ServiceTimeSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "@/i18n/routing";



interface FormData {
  ServiceDate: string;
  startTime: string;
  endTime: string;
}

function Page() {
  const t = useTranslations("Jobs");

  

  const dispatch = useDispatch()

  const router = useRouter()

  // Initialize the form with useForm hook
  const { register, handleSubmit, setError, formState: { errors } } = useForm<FormData>();

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = (data) => {
    const { startTime, endTime } = data;

    // Check if endTime is later than startTime
    if (startTime >= endTime) {
      setError("endTime", {
        type: "manual",
        message: t("invalidTime"),
      });
      return;
    }

    dispatch(setServiceData(data));

    console.log(data);
    router.push('/jobs/addJob/reviewJob')

  };


  

  



  return (
    <div className="bg-[#F5F7FA] min-h-screen w-full flex items-start justify-start">
      <div className="w-full max-w-7xl px-8 lg:px-16 mt-6">
        <div>
          <p className="text-lg font-semibold">
            {t('WhatWouldYouLike')}
          </p>
          <form onSubmit={handleSubmit(onSubmit)}> {/* Wrap form with handleSubmit */}
            <div className="mt-5">
              <p className="font-semibold text-md">{t('selectDate')}</p>
              <div className="mt-1">
                <input
                  type="date"
                  name="ServiceDate"
                  {...register("ServiceDate", { required: true })} // Register field with validation
                  className="w-full px-4 py-2 mt-1 bg-gray-50 rounded-md border border-[#4BB1D3]"
                />
                {errors.ServiceDate && <p className="text-red-500 text-sm">{t("ServiceDateRequired")}</p>} {/* Error message */}
              </div>
            </div>

            <div className="mt-3">
              <div className="mt-5">
                <p className="font-semibold text-md">{t('selectTimeStart')}</p>
                <div className="mt-1">
                  <input
                    type="time"
                    name="startTime"
                    {...register("startTime", { required: true })}
                    className="w-full px-4 py-2 mt-1 bg-gray-50 rounded-md border border-[#4BB1D3]"
                  />
                  {errors.startTime && <p className="text-red-500 text-sm">{t("serviceTimeStartRequired")}</p>}
                </div>
              </div>
            </div>

            <div className="mt-3">
              <div className="mt-5">
                <p className="font-semibold text-md">{t('selectTimeEnd')}</p>
                <div className="mt-1">
                  <input
                    type="time"
                    name="endTime"
                    {...register("endTime", { required: true })}
                    className="w-full px-4 py-2 mt-1 bg-gray-50 rounded-md border border-[#4BB1D3]"
                  />
                  {errors.endTime && <p className="text-red-500 text-sm">{errors.endTime?.message || t("serviceTimeEndRequired")}</p>}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center items-center">
              {/* <Link href="/jobs/reviewJob"> */}
                <Button className="w-[250px] mb-4 mt-6 h-[45px] text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out">
                  <span>{t('next')}</span>
                </Button>
              {/* </Link> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
