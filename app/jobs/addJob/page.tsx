import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import room from "../../../assets/servicesIcons/cardImage.svg";
import office from "../../../assets/servicesIcons/office.svg";
import hospital from "../../../assets/servicesIcons/hospital.svg";
import factory from "../../../assets/servicesIcons/factory.svg";
import Link from "next/link";


function page() {
  return (
    <>
    
      <div className="bg-[#F5F7FA] min-h-screen w-full flex items-start justify-start pt-2">
        <div className="w-full max-w-7xl px-8 lg:px-16 mt-6">
          <h1 className="text-2xl font-bold mt-2">Add Jobs</h1>

          <div className="grid w-full items-center gap-1.5 mt-6">
            <Input
              type="text"
              className="w-full h-[55px] rounded-lg border-[#4BB1D3] focus:border-blue-500 focus:outline-none"
              placeholder="Provider Name"
              id="name"
            />
          </div>

          <div className="grid w-full items-center gap-1.5 mt-3">
            <p className="text-xl font-semibold mt-6 mb-4">Select Category</p>
            <Label className="text-md font-semibold" htmlFor="email">
              Category
            </Label>
            <Input
              type="text"
              className="w-full h-[50px] rounded-lg border-[#4BB1D3] focus:border-blue-500 focus:outline-none"
              id="category"
            />
          </div>

          <div className="grid w-full items-center gap-1.5 mt-3">
            <Label className="text-md font-semibold" htmlFor="password">
              Sub Category
            </Label>
            <Input
              type="text"
              className="w-full h-[50px] rounded-lg border-[#4BB1D3] focus:border-blue-500 focus:outline-none"
              id="sub-category"
            />
          </div>

          <div className="grid w-full items-center gap-1.5 mt-3">
            <Label className="text-md font-semibold" htmlFor="confirmPassword">
              Add Details
            </Label>
            <Input
              type="text"
              className="w-full h-[50px] rounded-lg border-[#4BB1D3] focus:border-blue-500 focus:outline-none"
              id="confirmPassword"
            />
          </div>

          <div className="grid w-full items-center gap-1.5 mt-3">
            <Textarea
              className="w-full h-[85px] rounded-lg border-[#4BB1D3] focus:border-blue-500 focus:outline-none"
              placeholder="Type your message here."
            />
          </div>

          <div className="grid w-full items-center gap-1.5 mt-3">
            <p className="font-semibold">Photos</p>
            <div className="flex justify-between flex-wrap">
              <div className="w-[108px] h-[99.52px]">
                <Image src={room} alt="djdj" />
              </div>
              <div className="w-[108px] h-[99.52px]">
                <Image src={factory} alt="djdj" />
              </div>
              <div className="w-[108px] h-[99.52px]">
                <Image src={hospital} alt="djdj" />
              </div>
              <div className="w-[108px] h-[99.52px]">
                <Image src={room} alt="djdj" />
              </div>
              <div className="w-[108px] h-[99.52px]">
                <Image src={factory} alt="djdj" />
              </div>
              <div className="w-[108px] h-[99.52px]">
                <Image src={office} alt="djdj" />
              </div>
              <div className="w-[108px] h-[99.52px]">
                <Image src={hospital} alt="djdj" />
              </div>
              <div className="w-[108px] h-[99.52px]">
                <Image src={office} alt="djdj" />
              </div>
              <div className="w-[108px] h-[99.52px]">
                <Image src={room} alt="djdj" />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center items-center">
            <Link href={'/jobs/reviewJob'}>
            <Button className="w-[250px] mb-6 h-[45px] text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out">
              <span>Next</span>
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
