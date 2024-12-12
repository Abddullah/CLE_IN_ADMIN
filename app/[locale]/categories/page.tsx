"use client"
import React, { useEffect, useState } from "react";
import CleaningCards from "../components/categoriesComponents/CleaningCards";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/Firebase/FirebaseConfig";

interface Category {
  id: string;
  title: string;
  subcategories: string[];
}
interface Props {
  title: string;
  image: string;
  subcategories: string[];
  id: string;
  onDelete: (id: string) => void;
  onUpdate: (category: { id: string; title: string; subcategories: string[] }) => void; 
}


function Page() {
  const t = useTranslations("category");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newSubcategories, setNewSubcategories] = useState<string>("");

  useEffect(() => {
    // Fetch categories data from Firestore
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const categoriesData: Category[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id, // Store the document ID
          title: data.categoryName,
          subcategories: data.subCategories || [],
        };
      });
      setCategories(categoriesData);
    };

    fetchCategories();
  }, []);

  const handleDeleteCategory = async (id: string) => {
    // Delete category from Firestore
    const categoryRef = doc(db, "categories", id);
    await deleteDoc(categoryRef);

    // Update the local state after deletion
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== id)
    );
  };

  const handleEditCategory = (category: { id: string; title: string; subcategories: string[] }) => {
    setCategoryToEdit(category);
    setNewTitle(category.title);
    setNewSubcategories(category.subcategories.join(", ")); // Convert array to string for easier editing
    setIsModalOpen(true);
  };
  

  const handleUpdateCategory = async () => {
    if (categoryToEdit) {
      if (!newTitle || !newSubcategories) {
        // Show an error if any of the fields are empty
        alert("Title and Subcategories cannot be empty!");
        return;
      }

      const categoryRef = doc(db, "categories", categoryToEdit.id);
      const updatedSubcategories = newSubcategories.split(",").map((subcategory) => subcategory.trim()); // Convert the input back to an array

      try {
        await updateDoc(categoryRef, {
          categoryName: newTitle,
          subCategories: updatedSubcategories,
        });

        // Update the local state after editing
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.id === categoryToEdit.id
              ? { ...category, title: newTitle, subcategories: updatedSubcategories }
              : category
          )
        );
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error updating category:", error);
        alert("Failed to update category. Please try again.");
      }
    }
  };

  return (
    <div className="bg-[#F5F7FA] h-full w-full">
      <Link href={"categories/add"}>
        <div className="flex justify-end overflow-hidden">
          <Button className="border-[#4BB1D3] w-[110px] h-[40px] mt-5 mr-8 text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00BFFF] sm:w-[120px] sm:h-[45px]">
            {t("add_button")}
          </Button>
        </div>
      </Link>

      <div className="flex justify-center sm:justify-start flex-wrap gap-5 px-6">
      {categories.map((category) => (
  <div key={category.id} className="relative">
    <CleaningCards
      id={category.id}
      title={category.title}
      subcategories={category.subcategories}
      onDelete={handleDeleteCategory}
      onUpdate={handleEditCategory} 
      image={'/assets/categoriesIcons/Factory.svg'}
    />
  </div>
))}

      </div>

      {/* Edit Category Modal */}
      {isModalOpen && categoryToEdit && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit Category</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Subcategories</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={newSubcategories}
                onChange={(e) => setNewSubcategories(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateCategory}
                className="bg-[#00BFFF] text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
