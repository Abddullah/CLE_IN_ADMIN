import { InputWithLabel } from "@/app/components/categoriesComponents/addCategoryPage/NameField";
import UploadButton from "@/app/components/categoriesComponents/addCategoryPage/UploadBtn";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";


function page() {
  return (
    <>


<div className="bg-[#F5F7FA] min-h-screen w-full flex items-start justify-start pt-8">
      {" "}
      
      <div className="w-full max-w-md overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16">
        <h1 className="text-2xl font-bold mb-4">Add Additional Services</h1>

        <div className="grid w-full max-w-sm items-center gap-1.5 mt-8">
      <Label htmlFor="text" className="font-semibold text-md"> Title</Label>
      <Input type="text" placeholder="e.g: Cupboard Cleaning" className="h-[50px] border-[#4BB1D3] " id="title" />
    </div>

    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
      <Label htmlFor="text" className="font-semibold text-md">Price</Label>
      <Input type="number" className="h-[50px] border-[#4BB1D3] " id="number" />
    </div>
        <div className="mt-6">
    <Link href="/additionalServices">
          <Button className="border-[#4BB1D3] w-full h-[40px] mt-5 text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out sm:w-[100px] sm:h-[45px]">
            <span>Add</span>
          </Button>
    </Link>
        </div>
      </div>
    </div>
    
    
   
    </>
  );
}

export default page;
