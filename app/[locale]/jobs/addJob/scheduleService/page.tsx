"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { setServiceData } from "@/app/[locale]/config/Redux/reducers/ServiceTimeSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "@/i18n/routing";
import moment from "moment";

interface FormData {
  ServiceDate: string;
  startTime: string;
  endTime: string;
}

function Page() {
  const t = useTranslations("Jobs");
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  // Load data from local storage if editing

  useEffect(() => {
    const storedData = localStorage.getItem("editJob");
    if (storedData) {
      const parsedData: any = JSON.parse(storedData);

      // Convert milliseconds to readable date format
      const formattedServiceDate = parsedData[0]?.bookingDate
        ? moment(parsedData[0].bookingDate).format("YYYY-MM-DD")
        : "";

      const formattedStartTime = parsedData[0]?.bookingStart
        ? moment(parsedData[0].bookingStart, "x").format("HH:mm")
        : "";

      const formattedEndTime = parsedData[0]?.bookingEnd
        ? moment(parsedData[0].bookingEnd, "x").format("HH:mm")
        : "";

      setValue("ServiceDate", formattedServiceDate);
      setValue("startTime", formattedStartTime);
      setValue("endTime", formattedEndTime);
    }
  }, [setValue]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const { startTime, endTime } = data;

    // Validate time range
    if (startTime >= endTime) {
      setError("endTime", {
        type: "manual",
        message: t("invalidTime"),
      });
      return;
    }

    // Save form data to local storage and dispatch
    dispatch(setServiceData(data));
    localStorage.setItem("scheduleService", JSON.stringify(data));

    router.push("/jobs/addJob/reviewJob");
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen w-full flex justify-center">
      <div className="w-full max-w-7xl px-8 lg:px-16 mt-6">
        <div>
          <p className="text-lg font-semibold">{t("WhatWouldYouLike")}</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-5">
              <p className="font-semibold text-md">{t("selectDate")}</p>
              <div className="mt-1">
                <input
                  type="date"
                  {...register("ServiceDate", { required: true })}
                  className="w-full px-4 py-2 mt-1 bg-gray-50 rounded-md border border-[#4BB1D3]"
                />
                {errors.ServiceDate && (
                  <p className="text-red-500 text-sm">
                    {t("ServiceDateRequired")}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-3">
              <p className="font-semibold text-md">{t("selectTimeStart")}</p>
              <div className="mt-1">
                <input
                  type="time"
                  {...register("startTime", { required: true })}
                  className="w-full px-4 py-2 mt-1 bg-gray-50 rounded-md border border-[#4BB1D3]"
                />
                {errors.startTime && (
                  <p className="text-red-500 text-sm">
                    {t("serviceTimeStartRequired")}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-3">
              <p className="font-semibold text-md">{t("selectTimeEnd")}</p>
              <div className="mt-1">
                <input
                  type="time"
                  {...register("endTime", { required: true })}
                  className="w-full px-4 py-2 mt-1 bg-gray-50 rounded-md border border-[#4BB1D3]"
                />
                {errors.endTime && (
                  <p className="text-red-500 text-sm">
                    {errors.endTime?.message || t("serviceTimeEndRequired")}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-center items-center">
              <Button className="w-[250px] mb-4 mt-6 h-[45px] text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out">
                <span>{t("next")}</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
