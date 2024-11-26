"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

function page() {
  type InputTitle = {
    title: string;
    titleRequired: string;
    price: number;
    priceRequired: number;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputTitle>();
  const onSubmit: SubmitHandler<InputTitle> = (data) => console.log(data);

  return (
    <>
      <div className="bg-[#F5F7FA] min-h-screen w-full flex items-start justify-start pt-8">
        {" "}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16"
        >
          <h1 className="text-2xl font-bold mb-4">Add Additional Services</h1>

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-8">
            <Label htmlFor="text" className="font-semibold text-md">
              {" "}
              Title
            </Label>
            <Input
              type="text"
              {...register("titleRequired", { required: true })}
              placeholder="e.g: Cupboard Cleaning"
              className="h-[50px] border-[#4BB1D3] "
              id="title"
            />
            {errors.titleRequired && (
              <span className="text-red-600">Title is required</span>
            )}
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
            <Label htmlFor="text" className="font-semibold text-md">
              Price
            </Label>
            <Input
              type="number"
              {...register("priceRequired", {
                required: true,
                pattern: /^\d+$/,
              })}
              placeholder="Enter Price"
              className="h-[50px] border-[#4BB1D3] "
              id="number"
            />
            {errors.priceRequired && (
              <span className="text-red-600">Price is required</span>
            )}
          </div>
          <div className="mt-6">
            {/* <Link href="/additionalServices"> */}
            <Button
              type="submit"
              className="border-[#4BB1D3] w-full h-[40px] mt-5 text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out sm:w-[100px] sm:h-[45px]"
            >
              <span>Add</span>
            </Button>
            {/* </Link> */}
          </div>
        </form>
      </div>
    </>
  );
}

export default page;
