"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler, FieldError } from "react-hook-form";
import { useTranslations } from 'next-intl';

type Field = {
  id: number;
};

type InputTitle = {
  [key: string]: string | number;
};

function Page() {
  const t = useTranslations("Payments");
  const [fields, setFields] = useState<Field[]>([{ id: 1 }]);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputTitle>();

  const onSubmit: SubmitHandler<InputTitle> = (data) => {
    console.log(data);
  };

  const addMoreFields = () => {
    setFields([...fields, { id: fields.length + 1 }]);
  };

  const deleteField = (id: number) => {
    if (fields.length > 1) {
      setDeletingId(id);
      setTimeout(() => {
        setFields(fields.filter(field => field.id !== id));
        setDeletingId(null);
      }, 300);
    }
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen w-full flex items-start justify-start pt-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16"
      >
        <h1 className="text-2xl font-bold mb-4">{t("add_payment")}</h1>

        {fields.map((field) => (
          <div 
            key={field.id} 
            className={`relative transition-all duration-300 ease-in-out transform 
              ${deletingId === field.id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
          >
            {field.id !== 1 && (
              <button
                type="button"
                onClick={() => deleteField(field.id)}
                className="absolute right-2 top-2 w-6 h-6 flex items-center justify-center 
                  rounded-full bg-red-100 text-red-500 hover:bg-red-200 hover:text-red-700 
                  transition-colors duration-200 focus:outline-none focus:ring-2 
                  focus:ring-red-500 focus:ring-opacity-50"
                aria-label="Delete field"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
            <div className="grid w-full max-w-sm items-center gap-1.5 mt-8">
              <Label htmlFor={`title-${field.id}`} className="font-semibold text-md">
                {t("name")}
              </Label>
              <Input
                type="text"
                {...register(`title-${field.id}`, { required: true })}
                placeholder={t("enter_name")}
                className="h-[50px] border-[#4BB1D3]"
                id={`title-${field.id}`}
              />
              {errors[`title-${field.id}`] && (
                <span className="text-red-600">{t("name_required")}</span>
              )}
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
              <Label htmlFor={`price-${field.id}`} className="font-semibold text-md">
                {t("percentage")}
              </Label>
              <Input
                type="text"
                {...register(`price-${field.id}`, { required: true })}
                placeholder={t("enter_percentage")}
                className="h-[50px] border-[#4BB1D3]"
                id={`price-${field.id}`}
              />
              {errors[`price-${field.id}`] && (
                <span className="text-red-600">{t("percentage_required")}</span>
              )}
            </div>
          </div>
        ))}

        <div className="mt-6">
          <Button
            type="button"
            onClick={addMoreFields}
            className="border-[#4BB1D3] w-full h-[40px] mb-4 text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out"
          >
           {(t('add_more'))}
          </Button>

          <Button
            type="submit"
            className="border-[#4BB1D3] w-full h-[40px] text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out sm:w-[100px] sm:h-[45px]"
          >
            <span>{t("add_button")}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Page;