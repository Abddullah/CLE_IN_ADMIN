"use client";

import UploadButton from "../../components/categoriesComponents/addCategoryPage/UploadBtn";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslations } from "next-intl";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/Firebase/FirebaseConfig";
import SuccessModal from "../../components/categoriesComponents/SucessModal";

function Page() {
  const t = useTranslations("AddCategory");
  const [subCategories, setSubCategories] = useState([{ id: 1 }]);
  const [showModal, setShowModal] = useState(false);

  type Inputs = {
    categoryName: string;
    subCategories: string[];
  };

  const {
    register,
    handleSubmit,
    reset, // Reset method from React Hook Form
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      // Add data to Firestore
      await addDoc(collection(db, "categories"), {
        categoryName: data.categoryName,
        profile: "",
        subCategories: data.subCategories,
      });

      // Show success modal
      setShowModal(true);

      // Reset form fields
      reset(); 
      
      // Reset subcategories
      setSubCategories([{ id: 1 }]);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const addSubCategory = () => {
    setSubCategories([...subCategories, { id: Date.now() }]);
  };

  const removeSubCategory = (id: number) => {
    if (subCategories.length > 1) {
      setSubCategories(subCategories.filter((item) => item.id !== id));
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen w-full flex items-start justify-start pt-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16"
      >
        <h1 className="text-2xl font-bold mb-4">{t("add_category")}</h1>

        <div className="mt-8">
          <Label htmlFor="categoryName" className="font-semibold text-md">
            {t("name")}
          </Label>
          <Input
            id="categoryName"
            type="text"
            placeholder={t("category_name_placeholder")}
            {...register("categoryName", { required: true })}
            className="h-[50px] border-[#4BB1D3]"
          />
          {errors.categoryName && (
            <span className="text-red-600">
              {t("category_name_required")}
            </span>
          )}
        </div>

        <div className="mt-8">
          <p className="text-md font-semibold">{t("upload_image")}</p>
          <UploadButton />
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
                  id={`subCategory-${subCat.id}`}
                  type="text"
                  placeholder={t("sub_category_Placeholder")}
                  {...register(`subCategories.${index}`, { required: true })}
                  className="h-[50px] border-[#4BB1D3] flex-1"
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
            <span className="text-3xl">+</span> {t("add_Subcategory")}
          </Button>
        </div>

        <Button
          type="submit"
          className="border-[#4BB1D3] w-full h-[40px] mt-5 text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out sm:w-[100px] sm:h-[45px]"
        >
          {t("save_button")}
        </Button>
      </form>

      {showModal && <SuccessModal onClose={closeModal} />}
    </div>
  );
}

export default Page;
