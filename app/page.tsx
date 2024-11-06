import React from "react";
import BookingCard from "./components/Cards";
import {
  faUser,
  faEnvelope,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { Component } from "./components/IncomeBarChart";
import { ComponentAreaChart } from "./components/BookingAreaChart";

const page = () => {
  return (
    <>
      <div className="bg-white m-4 p-1 flex flex-wrap justify-start gap-4 mt-6 my-2">
        <div className="mt-1 w-full sm:w-[48%] lg:w-[28%] xl:w-[22%]">
          <BookingCard
            title="Total Booking"
            totalBookings={10}
            icons={faEnvelope}
            bgColor="bg-[#C8E7F8]"
          />
        </div>
        <div className="mt-1 w-full sm:w-[48%] lg:w-[28%] xl:w-[22%]">
          <BookingCard
            title="Total Income"
            totalBookings={18}
            icons={faMoneyBill}
            bgColor="bg-[#BBD4E2]"
          />
        </div>
        <div className="mt-1 w-full sm:w-[48%] lg:w-[28%] xl:w-[22%]">
          <BookingCard
            title="Total Users"
            totalBookings={18}
            icons={faUser}
            bgColor="bg-[#C8E7F8]"
          />
        </div>
        <div className="mt-1 w-full sm:w-[48%] lg:w-[28%] xl:w-[22%]">
          <BookingCard
            title="Total Provider"
            totalBookings={18}
            icons={faUser}
            bgColor="bg-[#BBD4E2]"
          />
        </div>
      </div>

      <div className="bg-white m-4 p-1 flex flex-col gap-3 mt-16 my-4 h-[315px]">
        <p className="text-2xl font-semibold text-left md:text-3xl lg:text-2xl">
          Total Income
        </p>

        <Component />
      </div>

      <div className="bg-white m-4 p-1 flex flex-col gap-3 mt-1 my-4">
        <p className="text-2xl font-semibold text-left md:text-3xl lg:text-2xl">
          Total Booking
        </p>
        <div>
          <ComponentAreaChart />
        </div>
      </div>
    </>
  );
};

export default page;
