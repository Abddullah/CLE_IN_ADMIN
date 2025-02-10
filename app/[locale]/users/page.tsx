import React from 'react'
import { TableDemo } from '../components/usersComponents/UserTable'
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import {useTranslations} from 'next-intl';



function page() {
  const t = useTranslations('Users');
  return (

    <>


<div className="bg-[#F5F7FA] max-w-full h-full overflow-hidden overflow-y-auto max-h-screen relative ">





        <div className="absolute bottom-8 right-8 cursor-pointer">
            <Link href={"users/addUser"}>
              <button className="w-14 h-14 flex items-center justify-center bg-[#00BFFF] text-white text-3xl rounded-full shadow-lg hover:bg-[#009ACD] focus:outline-none focus:ring-4 focus:ring-blue-300">
                +
              </button>
            </Link>
          </div>



        


        
    
   
    <TableDemo/>
    
   
    </div>
    
    
   
            </>
  )
}

export default page