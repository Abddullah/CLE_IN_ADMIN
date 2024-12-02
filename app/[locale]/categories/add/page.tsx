"use client";

import UploadButton from "../../components/categoriesComponents/addCategoryPage/UploadBtn";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslations } from "next-intl";

function Page() {
  const t = useTranslations("AddCategory");
  const [subCategories, setSubCategories] = useState([{ id: 1 }]);

  type Inputs = {
    category: string;
    categoryName: string;
    subCategories: string[];
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const id = Date.now();

  const addSubCategory = () => {
    setSubCategories([...subCategories, { id }]);
  };

  const removeSubCategory = (id: number) => {
    if (subCategories.length > 1) {
      setSubCategories(subCategories.filter((item) => item.id !== id));
    }
  };

  return (
    <>
      <div className="bg-[#F5F7FA] min-h-screen w-full flex items-start justify-start pt-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16"
        >
          <h1 className="text-2xl font-bold mb-4">{t("add_category")}</h1>

          <div className="mt-8">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="text" className="font-semibold text-md">
                {t("name")}
              </Label>
              <Input
                type="text"
                placeholder={t("category_name_placeholder")}
                {...register("categoryName", { required: true })}
                className="h-[50px] border-[#4BB1D3]"
                id="name"
              />
              {errors.categoryName && (
                <span className="text-red-600">
                  {t("category_name_required")}
                </span>
              )}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-md font-semibold">{t("upload_image")}</p>
            <div className="mt-4">
              <UploadButton />
            </div>
          </div>

          <div className="mt-8">
            {subCategories.map((subCat, index) => (
              <div
                key={subCat.id}
                className="grid w-full max-w-sm items-center gap-1.5 mb-4 relative"
              >
                <Label
                  htmlFor={`subCategory-${subCat.id}`}
                  className="font-semibold text-md"
                >
                  {t("sub_category_Name")}
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder={t("sub_category_Placeholder")}
                    {...register(`subCategories.${index}`, { required: true })}
                    className="h-[50px] border-[#4BB1D3] flex-1"
                    id={`subCategory-${subCat.id}`}
                  />
                  {subCategories.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeSubCategory(subCat.id)}
                      className="bg-[#00BFFF] hover:bg-[#00BFFF] text-white h-[50px] px-4"
                    >
                      ✕
                    </Button>
                  )}
                </div>
                {errors.subCategories?.[index] && (
                  <span className="text-red-600">
                    {t("required_Sub_Category")}
                  </span>
                )}
              </div>
            ))}

            <Button
              type="button"
              onClick={addSubCategory}
              className="w-full h-[40px] text-[#4BB1D3] bg-white border-2 border-[#4BB1D3] rounded-lg hover:bg-[#F5F7FA] transition duration-200 ease-in-out"
            >
              <span className="text-3xl">+</span> Add Sub Category
            </Button>
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              className="border-[#4BB1D3] w-full h-[40px] mt-5 text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out sm:w-[100px] sm:h-[45px]"
            >
              <span>{t("save_button")}</span>
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Page;
