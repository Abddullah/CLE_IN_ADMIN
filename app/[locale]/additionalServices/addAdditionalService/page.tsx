"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import {useTranslations} from 'next-intl';

function page() {
  const t = useTranslations('AdditionalServices');
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
          <h1 className="text-2xl font-bold mb-4">{(t('add_additional_services'))}</h1>

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-8">
            <Label htmlFor="text" className="font-semibold text-md">
              {" "}
              {(t('title'))}
            </Label>
            <Input
              type="text"
              {...register("titleRequired", { required: true })}
              placeholder={(t('title_placeholder'))}
              className="h-[50px] border-[#4BB1D3] "
              id="title"
            />
            {errors.titleRequired && (
              <span className="text-red-600">{(t('title_required'))}</span>
            )}
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
            <Label htmlFor="text" className="font-semibold text-md">
              {(t('price'))}
            </Label>
            <Input
              type="number"
              {...register("priceRequired", {
                required: true,
                pattern: /^\d+$/,
              })}
              placeholder={(t('price_placeholder'))}
              className="h-[50px] border-[#4BB1D3] "
              id="number"
            />
            {errors.priceRequired && (
              <span className="text-red-600">{(t('price_required'))}</span>
            )}
          </div>
          <div className="mt-6">
            {/* <Link href="/additionalServices"> */}
            <Button
              type="submit"
              className="border-[#4BB1D3] w-full h-[40px] mt-5 text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out sm:w-[100px] sm:h-[45px]"
            >
              <span>{(t('add_button'))}</span>
            </Button>
            {/* </Link> */}
          </div>
        </form>
      </div>
    </>
  );
}

export default page;
