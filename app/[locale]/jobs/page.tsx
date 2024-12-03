import React from "react";
import Card from "../components/servicesComponents/ServicesCards";
import { Button } from "@/components/ui/button";
import {Link} from '@/i18n/routing';
import JobCard from "../components/jobsComponent/JobsCard";
import { useTranslations } from "next-intl";

function page() {
  const t = useTranslations('Services');
  return (
    <>
     <div className="bg-[#F5F7FA] min-h-screen w-full">
        <div className="flex justify-end">
          <Link href={"/jobs/addJob"}> 
            <Button
              className="border-[#4BB1D3] w-[110px] h-[40px] mt-5 mr-8 text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00BFFF] 
      sm:w-[120px] sm:h-[45px]"
            >
              {(t('add_button'))}
            </Button>
          </Link>
        </div>

        <div className="flex justify-between w-full px-4 sm:px-8 md:px-12 lg:px-9 space-x-4 mt-6">
          <button className="flex-1 py-3 rounded-md text-white bg-[#00BFFF] hover:bg-[#00BFFF]">
            {(t('active'))}
          </button>
          <button className="flex-1 py-3 rounded-md text-white bg-[#859090] hover:bg-[#859090]">
          {(t('moderate'))}
          </button>
          <button className="flex-1 py-3 rounded-md  text-white bg-[#859090] hover:bg-[#859090]">
          {(t('Pending'))}
          </button>
        </div>

        <div className="flex flex-wrap justify-center lg:justify-start gap-12 w-full px-4 sm:px-8 md:px-14 lg:px-10 mt-4">
          <div className="w-[310px]">
            <Card
              price="€34/hr"
              title={(t('serviceTitle'))}
              time="8:00 pm to 22:00pm"
              imageUrl="/assets/servicesIcons/cardImage.svg"
              status={(t('active'))}
              date="Sep 09 , 2024"
              dotsIcon="/assets/categoriesIcons/dots.svg"
              editIcon="/assets/categoriesIcons/edit.svg"
              deleteIcon="/assets/categoriesIcons/delete.svg"
            />
          </div>

          <div className="w-[310px]">
            <Card
              price="€ 34/hr"
              title={(t('cleaningAtCompany'))}
              time="8:00 pm to 22:00pm"
              imageUrl="/assets/servicesIcons/company.svg"
              status={(t('active'))}
              date="Sep 09 , 2024"
              dotsIcon="/assets/categoriesIcons/dots.svg"
              editIcon="/assets/categoriesIcons/edit.svg"
              deleteIcon="/assets/categoriesIcons/delete.svg"
            />
          </div>

          <div className="w-[310px]">
            <Card
              price="€ 34/hr"
              title={(t('cleaningAtHospital'))}
              time="8:00 pm to 22:00pm"
              imageUrl="/assets/servicesIcons/hospital.svg"
              status={(t('active'))}
              date="Sep 09 , 2024"
              dotsIcon="/assets/categoriesIcons/dots.svg"
              editIcon="/assets/categoriesIcons/edit.svg"
              deleteIcon="/assets/categoriesIcons/delete.svg"
            />
          </div>

          <div className="w-[310px]">
            <Card
              price="€ 30/hr"
              title={(t('cleaningAtOffice'))}
              time="8:00 pm to 22:00pm"
              imageUrl="/assets/servicesIcons/office.svg"
              status={(t('active'))}
              date="Sep 09 , 2024"
              dotsIcon="/assets/categoriesIcons/dots.svg"
              editIcon="/assets/categoriesIcons/edit.svg"
              deleteIcon="/assets/categoriesIcons/delete.svg"
            />
          </div>

          <div className="w-[310px]">
            <Card
              price="€ 30/hr"
              title={(t('cleaningAtFactory'))}  
              time="8:00 pm to 22:00pm"
              imageUrl="/assets/servicesIcons/factory.svg"
              status={(t('active'))}
              date="Sep 09 , 2024"
              dotsIcon="/assets/categoriesIcons/dots.svg"
              editIcon="/assets/categoriesIcons/edit.svg"
              deleteIcon="/assets/categoriesIcons/delete.svg"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
