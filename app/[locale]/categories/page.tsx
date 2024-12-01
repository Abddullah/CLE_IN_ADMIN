import React from "react";
import CleaningCards from "../components/categoriesComponents/CleaningCards";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {useTranslations} from 'next-intl';



function page() {
  const t = useTranslations('category');
  return (
    <>


<div className="bg-[#F5F7FA] h-full w-full">
      <Link href={"categories/add"}>
        <div className="flex justify-end overflow-hidden">
          <Button
            className="border-[#4BB1D3] w-[80px] h-[40px] mt-5 mr-8 text-white bg-[#00BFFF] rounded-xl outline-none hover:bg-[#00BFFF] 
      sm:w-[120px] sm:h-[45px] "
          >
            {(t('add_button'))}
          </Button>
        </div>
        </Link>

<div className="flex justify-center sm:justify-start flex-wrap gap-5 px-6">
  <CleaningCards title={(t('cleaning_at_house'))} image="/assets/categoriesIcons/Vector.svg" />
  <CleaningCards title={(t('cleaning_at_company'))} image="/assets/categoriesIcons/company.svg" />
  <CleaningCards title={(t('cleaning_at_hospital'))} image="/assets/categoriesIcons/hospital.svg" />
  <CleaningCards title={(t('cleaning_at_factory'))} image="/assets/categoriesIcons/Factory.svg" />
</div>

      </div>
    
      
    </>
  );
}

export default page;
