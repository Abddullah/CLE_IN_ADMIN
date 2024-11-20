import React from "react";
import CleaningCards from "../components/categoriesComponents/CleaningCards";
import { Button } from "@/components/ui/button";
import Link from "next/link";



function page() {
  return (
    <>


<div className="bg-[#F5F7FA] h-full w-full">
      <Link href={"categories/add"}>
        <div className="flex justify-end overflow-hidden">
          <Button
            className="border-[#4BB1D3] w-[80px] h-[40px] mt-5 mr-8 text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00BFFF] 
      sm:w-[100px] sm:h-[45px]"
          >
            ADD
          </Button>
        </div>
        </Link>

<div className="flex justify-center sm:justify-start flex-wrap gap-5 px-6">
  <CleaningCards title="Cleaning at house" image="/assets/categoriesIcons/Vector.svg" />
  <CleaningCards title="Cleaning at Company" image="/assets/categoriesIcons/company.svg" />
  <CleaningCards title="Cleaning at hospital" image="/assets/categoriesIcons/hospital.svg" />
  <CleaningCards title="Cleaning at Factory" image="/assets/categoriesIcons/Factory.svg" />
</div>

      </div>
    
      
    </>
  );
}

export default page;
