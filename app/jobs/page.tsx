import React from "react";
import Card from "../components/servicesComponents/ServicesCards";
import { Button } from "@/components/ui/button";
import Link from "next/link";



function page() {
  return (
    <>
   
     <div className="bg-[#F5F7FA] min-h-screen w-full">
   
      <div className="flex justify-end">
        <Link href={'jobs/addJob'}>
        <Button
          className="border-[#4BB1D3] w-[80px] h-[40px] mt-5 mr-8 text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00BFFF] 
      sm:w-[100px] sm:h-[45px]"
        >
          ADD
        </Button>
        </Link>
      </div>
      
      <div className="flex justify-between w-full px-4 sm:px-8 md:px-12 lg:px-14 space-x-4 mt-6">
        <button className="flex-1 py-3 text-white bg-[#00BFFF] hover:bg-[#00BFFF]">
          Active
        </button>
        <button className="flex-1 py-3 text-white bg-[#859090] hover:bg-[#859090]">
          Moderate
        </button>
        <button className="flex-1 py-3 text-white bg-[#859090] hover:bg-[#859090]">
          Pending
        </button>
      </div>

      
      <div className="flex flex-wrap justify-center lg:justify-start gap-12 w-full px-4 sm:px-8 md:px-14 lg:px-10 mt-4">
  {/* Card 1 */}
  <div className="w-[300px]">
  <Card
    price="€ 34/hr"
    title="Cleaning at home"
    time="8:00 pm to 22:00pm"
    imageUrl="/assets/servicesIcons/cardImage.svg"
    status="active"
    date="Sep 09 , 2024"
    dotsIcon="/assets/categoriesIcons/dots.svg"
    editIcon="/assets/categoriesIcons/edit.svg"
    deleteIcon="/categoriesIcons/delete.svg"
  />
  </div>

  {/* Card 2 */}
  <div className="w-[300px]">
  <Card
    price="€ 34/hr"
    title="Cleaning at company"
    time="8:00 pm to 22:00pm"
    imageUrl="/assets/servicesIcons/company.svg"
    status="active"
    date="Sep 09 , 2024"
    dotsIcon="/assets/categoriesIcons/dots.svg"
    editIcon="/assets/categoriesIcons/edit.svg"
    deleteIcon="/categoriesIcons/delete.svg"
  />
  </div>

  {/* Card 3 */}
  <div className="w-[300px]">
  <Card
    price="€ 34/hr"
    title="Cleaning at Hospital"
    time="8:00 pm to 22:00pm"
    imageUrl="/assets/servicesIcons/hospital.svg"
    status="active"
    date="Sep 09 , 2024"
    dotsIcon="/assets/categoriesIcons/dots.svg"
    editIcon="/assets/categoriesIcons/edit.svg"
    deleteIcon="/categoriesIcons/delete.svg"
  />
  </div>

  {/* Card 4 */}
  <div className="w-[300px]">
  <Card
    price="€ 34/hr"
    title="Cleaning at Office"
    time="8:00 pm to 22:00pm"
    imageUrl="/assets/servicesIcons/office.svg"
    status="active"
    date="Sep 09 , 2024"
    dotsIcon="/assets/categoriesIcons/dots.svg"
    editIcon="/assets/categoriesIcons/edit.svg"
    deleteIcon="/categoriesIcons/delete.svg"
  />
  </div>

  {/* Card 5 */}
  <div className="w-[400px]">
  <Card
    price="€ 34/hr"
    title="Cleaning at Factory"
    time="8:00 pm to 22:00pm"
    imageUrl="/assets/servicesIcons/factory.svg"
    status="active"
    date="Sep 09 , 2024"
    dotsIcon="/assets/categoriesIcons/dots.svg"
    editIcon="/assets/categoriesIcons/edit.svg"
    deleteIcon="/categoriesIcons/delete.svg"
  />
  </div>
</div>

      </div>
     
    </>
  );
}

export default page;
