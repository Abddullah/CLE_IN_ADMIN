"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function page() {
  let [data, setData] = useState({});
  let [location, setLocation] = useState("");
  let [comment, setComment] = useState("");

  let locationValue = useRef<HTMLInputElement>(null);
  let commentValue = useRef<any>(null);

  const handleLocation = () => {
    if (locationValue.current) {
      setLocation(locationValue.current.value);
      return;
    }
  };

  const handleComment = () => {
    if (commentValue.current) {
      setComment(commentValue.current.value);
      return;
    }
  };

  const handleData = () => {
  if(!location || !comment){
    alert("Please fill in the required fields");
  }else{
    data = {
      location,
      comment,
    };

    setData({ ...data });
    console.log(data);
    alert("Data submitted Sucessfully")
  }
  };

  return (
    <>
      <div className="bg-[#F5F7FA] min-h-screen w-full flex items-start justify-start pt-2">
        <div className="w-full max-w-7xl px-8 lg:px-16 mt-6">
          {/* Location Field */}
          <div className="mb-4">
            <label
              htmlFor="instructions"
              className="text-md font-semibold text-gray-800"
            >
              Location
            </label>
            <div className="relative mt-2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#00BFFF]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2C8.134 2 5 5.134 5 9c0 4.418 4.373 9.44 6.708 11.56a1.504 1.504 0 002.585 0C14.627 18.44 19 13.418 19 9c0-3.866-3.134-7-7-7z"
                  />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </span>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Enter your location"
                className="w-full pl-10 pr-4 py-2 border border-[#00BFFF] rounded-md shadow-sm focus:outline-none focus:ring-1  focus:ring-[#00BFFF]"
                ref={locationValue}
                onChange={handleLocation}
              />
            </div>
          </div>

          {/* Any Specific Instruction? Textarea */}
          <div className="mt-6">
            <label
              htmlFor="instructions"
              className="text-md font-semibold text-gray-800"
            >
              Any Specific Instructions?
            </label>
            <textarea
              id="instructions"
              name="instructions"
              rows={4}
              placeholder="Write here..."
              ref={commentValue}
              onChange={handleComment}
              className="w-full mt-2 p-3 border border-[#00BFFF] rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#00BFFF] focus:border-[#00BFFF]"
              
            ></textarea>
          </div>

          <div className="mt-8 flex justify-center items-center">
            <Link href={"/jobs/reviewJob"}>
              <Button
                onClick={handleData}
                className="w-[250px] mb-4 mt-6 h-[45px] text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out"
              >
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
