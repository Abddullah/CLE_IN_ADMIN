import { InputWithLabel } from "@/app/components/categoriesComponents/addCategoryPage/NameField";
import UploadButton from "@/app/components/categoriesComponents/addCategoryPage/UploadBtn";
import React from "react";
import { Button } from "@/components/ui/button";


function page() {
  return (
    <>
    
    <div className="bg-[#F5F7FA] min-h-screen w-full flex items-start justify-start pt-8">
      {" "}
      
      <div className="w-full max-w-md px-4 sm:px-8 md:px-12 lg:px-16">
        <h1 className="text-2xl font-bold mb-4">Add Category</h1>

        <div className="mt-8">
          <InputWithLabel />
        </div>

        <div className="mt-8">
          <p className="text-md font-semibold">Upload Image</p>
          <div className="mt-4">
            <UploadButton />
          </div>
        </div>

        <div className="mt-6">
          <Button className="border-[#4BB1D3] w-full h-[40px] mt-5 text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out sm:w-[100px] sm:h-[45px]">
            <span>Save</span>
          </Button>
        </div>
      </div>
    </div>
    </>
  );
}

export default page;
