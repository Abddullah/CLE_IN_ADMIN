import React from "react";
import CleaningCards from "../components/categoriesComponents/CleaningCards";
import house from "../../assets/categoriesIcons/Vector.svg";
import company from "../../assets/categoriesIcons/company.svg";
import hospital from "../../assets/categoriesIcons/hospital.svg";
import factory from "../../assets/categoriesIcons/Factory.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function page() {
  return (
    <>
      <div className="bg-[#F5F7FA] h-full w-full">
        <div className="flex justify-end">
          <Button
            className="border-[#4BB1D3] w-[80px] h-[40px] mt-5 mr-3 text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00BFFF] 
      sm:w-[100px] sm:h-[45px]"
          >
            <Link href={"categories/add"}>ADD</Link>
          </Button>
        </div>

        <div className="flex justify-evenly flex-wrap gap-5">
          <CleaningCards title="Cleaning at house" image={house} />
          <CleaningCards title="Cleaning at Company" image={company} />
          <CleaningCards title="Cleaning at hospital" image={hospital} />
          <CleaningCards title="Cleaning at Factory" image={factory} />
        </div>
      </div>
    </>
  );
}

export default page;
