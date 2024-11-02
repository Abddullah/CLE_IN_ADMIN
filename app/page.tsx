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
      <div className="flex items-center justify-center mt-12 bg-gray-50 flex-wrap gap-1 px-6">
        <BookingCard
          title="Total Booking"
          totalBookings={10}
          icons={faEnvelope}
          bgColor="bg-[#C8E7F8]"
        />
        <BookingCard
          title="Total Income"
          totalBookings={18}
          icons={faMoneyBill}
          bgColor="bg-[#BBD4E2]"
        />
        <BookingCard
          title="Total Users"
          totalBookings={18}
          icons={faUser}
          bgColor="bg-[#C8E7F8]"
        />
        <BookingCard
          title="Total Provider"
          totalBookings={18}
          icons={faUser}
          bgColor="bg-[#BBD4E2]"
        />
      </div>

      <div className="bg-white m-4 p-5 flex flex-col gap-3 mt-8 my-4">
        <p className="text-2xl font-semibold text-left md:text-3xl lg:text-2xl">
          Total Income
        </p>

        <Component />
      </div>

      <div className="bg-white m-4 p-5 flex flex-col gap-3 mt-8 my-4">
        <p className="text-2xl font-semibold text-left md:text-3xl lg:text-2xl">
          Total Bookings
        </p>

        <ComponentAreaChart />
      </div>
    </>
  );
};

export default page;
