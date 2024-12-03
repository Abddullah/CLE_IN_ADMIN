import React from 'react'
import { TableDemo } from '../components/usersComponents/UserTable'
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import {useTranslations} from 'next-intl';



function page() {
  const t = useTranslations('Users');
  return (

    <>


<div className="bg-[#F5F7FA] min-h-screen w-full relative">

<div className="flex justify-end">
<Link href={"users/addUser"}>
          <Button
            className="border-[#4BB1D3] w-[110px] h-[40px] mt-5 mr-8 text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00BFFF] 
            sm:w-[120px] sm:h-[45px]"
            >
           {(t('add_users'))}
          </Button>
          </Link>
        </div>


        <TableDemo/>
    </div>
    
    
   
            </>
  )
}

export default page