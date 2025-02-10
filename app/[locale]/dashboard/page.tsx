import React from "react";
import BookingCard from "../components/Cards";
import {
  faUser,
  faEnvelope,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { Component } from "../components/IncomeBarChart";
import { ComponentAreaChart } from "../components/BookingAreaChart";
import { useTranslations } from "next-intl";

const LoginPage = () => {
  const t = useTranslations("dashboard");

  return (
    <>
      <div className="bg-white m-4 p-1 flex flex-wrap justify-start gap-10 mt-6 my-2 ">
        <div className="mt-1 w-full sm:w-[48%] lg:w-[28%] xl:w-[20%] ">
          <BookingCard
            title={t("totalBooking")}
            totalBookings={10}
            icons={faEnvelope}
            bgColor="bg-[#C8E7F8]"
          />
        </div>
        <div className="mt-1 w-full sm:w-[48%] lg:w-[28%] xl:w-[20%]">
          <BookingCard
            title={t("totalIncome")}
            totalBookings={18}
            icons={faMoneyBill}
            bgColor="bg-[#BBD4E2]"
          />
        </div>
        <div className="mt-1 w-full sm:w-[48%] lg:w-[28%] xl:w-[20%] ">
          <BookingCard
            title={t("totalUsers")}
            totalBookings={18}
            icons={faUser}
            bgColor="bg-[#C8E7F8]"
          />
        </div>
        <div className="mt-1 w-full sm:w-[48%] lg:w-[28%] xl:w-[20%]">
          <BookingCard
            title={t("totalProvider")}
            totalBookings={18}
            icons={faUser}
            bgColor="bg-[#BBD4E2]"
          />
        </div>
      </div>

      <div className="bg-white m-4 p-1 flex flex-col gap-3 mt-16 my-4 h-[315px] w-100 overflow-hidden">
        <p className="text-2xl font-semibold text-left md:text-3xl lg:text-2xl">
          {t("totalIncome")}
        </p>

        <Component />
      </div>

      <div className="bg-white w-100 overflow-hidden m-4 p-1 flex flex-col gap-3 mt-1 my-4">
        <p className="text-2xl font-semibold text-left md:text-3xl lg:text-2xl">
          {t("totalBooking")}
        </p>

        <ComponentAreaChart />
      </div>
    </>
  );
};

export default LoginPage;
