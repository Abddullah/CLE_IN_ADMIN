"use client";

import UploadButton from "@/app/components/categoriesComponents/addCategoryPage/UploadBtn";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";

function page() {
  type Inputs = {
    category: string;
    categoryName: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <>
      <div className="bg-[#F5F7FA] min-h-screen w-full flex items-start justify-start pt-8">
        {" "}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16"
        >
          <h1 className="text-2xl font-bold mb-4">Add Category</h1>

          <div className="mt-8">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="text" className="font-semibold text-md">
                Name
              </Label>
              <Input
                type="text"
                placeholder="Category Name"
                {...register("categoryName", { required: true })}
                className="h-[50px] border-[#4BB1D3] "
                id="name"
              />
              {errors.categoryName && (
                <span className="text-red-600">Category name is required</span>
              )}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-md font-semibold">Upload Image</p>
            <div className="mt-4">
              <UploadButton />
            </div>
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              className="border-[#4BB1D3] w-full h-[40px] mt-5 text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out sm:w-[100px] sm:h-[45px]"
            >
              <span>Save</span>
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default page;
