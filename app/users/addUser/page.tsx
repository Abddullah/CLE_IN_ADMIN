import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";


function page() {
  return (
    <>
   
     <div className="bg-[#F5F7FA] min-h-screen w-full flex items-start justify-start pt-8">
        <div className="w-full max-w-md px-4 sm:px-8 md:px-12 lg:px-16">
          <h1 className="text-2xl font-bold mt-2">Add Users</h1>

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
            <Label htmlFor="name" className="text-lg font-semibold">
              Name
            </Label>
            <Input
              type="text"
              className="h-[50px] rounded-lg border-[#4BB1D3] focus:border-blue-500 focus:outline-none"
              id="Name"
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
            <Label className="text-md font-semibold" htmlFor="email">
              Email Address
            </Label>
            <Input
              type="email"
              className="h-[50px] rounded-lg border-[#4BB1D3] focus:border-blue-500 focus:outline-none"
              id="email"
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
            <Label className="text-md font-semibold" htmlFor="password">
              Password
            </Label>
            <Input
              type="password"
              className="h-[50px] rounded-lg border-[#4BB1D3] focus:border-blue-500 focus:outline-none"
              id="password"
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
            <Label className="text-md font-semibold" htmlFor="confirmPassword">
              Confirm Password
            </Label>
            <Input
              type="password"
              className="h-[50px] rounded-lg border-[#4BB1D3] focus:border-blue-500 focus:outline-none"
              id="confirmPassword"
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
            <Label className="text-md font-semibold" htmlFor="role">
              Role
            </Label>
            <Input
              type="text"
              className="h-[50px] rounded-lg border-[#4BB1D3] focus:border-blue-500 focus:outline-none"
              id="role"
            />
          </div>

          <div className="mt-6">
            <Button className="border-[#4BB1D3] w-full h-[40px] mt-5 text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out sm:w-[100px] sm:h-[45px]">
              <span>Add User</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
