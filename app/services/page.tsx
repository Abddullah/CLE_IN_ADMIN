import React from "react";
import Card from "../components/servicesComponents/ServicesCards";
import image from "../../assets/servicesIcons/cardImage.svg";
import office from "../../assets/servicesIcons/office.svg";
import hospital from "../../assets/servicesIcons/hospital.svg";
import company from "../../assets/servicesIcons/company.svg";
import factory from "../../assets/servicesIcons/factory.svg";
import dotsIcon from "../../assets/categoriesIcons/dots.svg";
import edit from "../../assets/categoriesIcons/edit.svg";
import remove from "../../assets/categoriesIcons/delete.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function page() {
  return (
    <>
      <div className="bg-[#F5F7FA] min-h-screen w-full">
        <div className="flex justify-end">
          <Link href={"services/addService"}>
            <Button
              className="border-[#4BB1D3] w-[80px] h-[40px] mt-5 mr-8 text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00BFFF] 
      sm:w-[100px] sm:h-[45px]"
            >
              ADD
            </Button>
          </Link>
        </div>

        <div className="flex justify-between w-full px-4 sm:px-8 md:px-12 lg:px-9 space-x-4 mt-6">
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

        <div className="flex flex-wrap justify-center lg:justify-start gap-12 w-full px-4 sm:px-8 md:px-14 lg:px-10 mt-4 z-5">
          <div className="w-[310px]">
            <Card
              price="€34/hr"
              title="Cleaning at home"
              time="8:00 pm to 22:00pm"
              imageUrl={image}
              status="active"
              date="Sep 09 , 2024"
              dotsIcon={dotsIcon}
              editIcon={edit}
              deleteIcon={remove}
            />
          </div>

          <div className="w-[310px]">
            <Card
              price="€ 34/hr"
              title="Cleaning at company"
              time="8:00 pm to 22:00pm"
              imageUrl={company}
              status="active"
              date="Sep 09 , 2024"
              dotsIcon={dotsIcon}
              editIcon={edit}
              deleteIcon={remove}
            />
          </div>

          <div className="w-[310px]">
            <Card
              price="€ 34/hr"
              title="Cleaning at Hospital"
              time="8:00 pm to 22:00pm"
              imageUrl={hospital}
              status="active"
              date="Sep 09 , 2024"
              dotsIcon={dotsIcon}
              editIcon={edit}
              deleteIcon={remove}
            />
          </div>

          <div className="w-[310px]">
            <Card
              price="€ 30/hr"
              title="Cleaning at Office"
              time="8:00 pm to 22:00pm"
              imageUrl={office}
              status="active"
              date="Sep 09 , 2024"
              dotsIcon={dotsIcon}
              editIcon={edit}
              deleteIcon={remove}
            />
          </div>

          <div className="w-[310px]">
            <Card
              price="€ 30/hr"
              title="Cleaning at Factory"
              time="8:00 pm to 22:00pm"
              imageUrl={factory}
              status="active"
              date="Sep 09 , 2024"
              dotsIcon={dotsIcon}
              editIcon={edit}
              deleteIcon={remove}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
