"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/Firebase/FirebaseConfig";
import CleaningCards from "../components/categoriesComponents/CleaningCards";

interface Category {
  id: string;
  title: string;
  subcategories: string[];
}

type FormData = {
  title: string;
  subcategories: string[];
};

function Page() {
  const t = useTranslations("category");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [newSubcategories, setNewSubcategories] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      subcategories: [],
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const categoriesData: Category[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.categoryName,
          subcategories: data.subCategories || [],
        };
      });
      setCategories(categoriesData);
    };

    fetchCategories();
  }, []);

  const handleDeleteCategory = async (id: string) => {
    const categoryRef = doc(db, "categories", id);
    await deleteDoc(categoryRef);
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== id)
    );
  };

  const handleEditCategory = (category: Category) => {
    setCategoryToEdit(category);
    reset({ title: category.title, subcategories: category.subcategories });
    setNewSubcategories([...category.subcategories]); 
    setIsModalOpen(true);
  };

  const handleUpdateCategory = async (data: FormData) => {
    if (categoryToEdit) {
      const updatedSubcategories = newSubcategories.filter(
        (subcategory) => subcategory.trim() !== ""
      );
  
      const categoryRef = doc(db, "categories", categoryToEdit.id);
      await updateDoc(categoryRef, {
        categoryName: data.title,
        subCategories: updatedSubcategories,
      });
  
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === categoryToEdit.id
            ? { ...category, title: data.title, subcategories: updatedSubcategories }
            : category
        )
      );
  
      setIsModalOpen(false);
      reset();
      setNewSubcategories([]);
    }
  };
  

  // Handle changes in subcategory inputs
  const handleSubcategoryChange = (index: number, value: string) => {
    const updatedSubcategories = [...newSubcategories];
    updatedSubcategories[index] = value;
    setNewSubcategories(updatedSubcategories);
  };

  // Remove subcategory from the list and Firebase
  const handleRemoveSubcategory = async (index: number) => {
    const subcategoryToRemove = newSubcategories[index];

    // Remove the subcategory from the local state first
    const updatedSubcategories = newSubcategories.filter((_, i) => i !== index);
    setNewSubcategories(updatedSubcategories);

    if (categoryToEdit) {
      const categoryRef = doc(db, "categories", categoryToEdit.id);

      // Update Firestore by removing the specific subcategory
      await updateDoc(categoryRef, {
        subCategories: updatedSubcategories,
      });

      // Update categories state to reflect the change in subcategories
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === categoryToEdit.id
            ? { ...category, subcategories: updatedSubcategories }
            : category
        )
      );
    }
  };

  return (
    <div className="bg-[#F5F7FA] h-full w-full">
        <div className="flex justify-end overflow-hidden">
      <Link href={"categories/add"}>
          <Button className="border-[#4BB1D3] w-[110px] h-[40px] mt-5 mr-8 text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00BFFF] sm:w-[120px] sm:h-[45px]">
            {t("add_button")}
          </Button>
      </Link>
        </div>

      <div className="flex justify-center sm:justify-start flex-wrap gap-5 px-6">
        {categories.map((category) => (
          <div key={category.id} className="relative">
            <CleaningCards
              id={category.id}
              title={category.title}
              subcategories={category.subcategories}
              onDelete={handleDeleteCategory}
              onUpdate={handleEditCategory}
              image={"/assets/categoriesIcons/Factory.svg"}
            />
          </div>
        ))}
      </div>

      {isModalOpen && categoryToEdit && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-full sm:w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit Category</h2>
            <form onSubmit={handleSubmit(handleUpdateCategory)}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Title</label>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: "Title is required" }}
                  render={({ field }) => (
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      {...field}
                    />
                  )}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs">{errors.title.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Subcategories
                </label>
                {newSubcategories.map((subcategory, index) => (
                  <div key={index} className="mb-2 flex items-center gap-2">
                    <Controller
                      name={`subcategories.${index}`}
                      control={control}
                      rules={{ required: "Subcategory cannot be empty" }}
                      render={({ field }) => (
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          value={newSubcategories[index] || ""}
                          onChange={(e) => {
                            field.onChange(e);
                            handleSubcategoryChange(index, e.target.value);
                          }}
                        />
                      )}
                    />

                    {errors.subcategories?.[index] && (
                      <p className="text-red-500 text-xs">
                        {errors.subcategories[index]?.message}
                      </p>
                    )}
                    <Button
                      type="button"
                      onClick={() => handleRemoveSubcategory(index)}
                      className="bg-[#00BFFF] hover:bg-[#00BFFF] text-white h-[43px] px-4"
                    >
                      ✕
                    </Button>
                  </div>
                ))}

                <Button
                  type="button"
                  onClick={() => setNewSubcategories([...newSubcategories, ""])}
                  className="w-full h-[40px] text-[#4BB1D3] bg-white border-2 border-[#4BB1D3] rounded-lg hover:bg-[#F5F7FA] transition duration-200 ease-in-out"
                >
                  <span className="text-3xl">+</span> {t("add_Subcategory")}
                </Button>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#00BFFF] text-white px-4 py-2 rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
