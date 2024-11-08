import React from 'react'
import { TableDemo } from '../components/usersComponents/UserTable'
import { Button } from "@/components/ui/button";
import Link from 'next/link';


function page() {
  return (

    <>
    
    <div className="bg-[#F5F7FA] h-full w-full">

<div className="flex justify-end">
<Link href={"users/addUser"}>
          <Button
            className="border-[#4BB1D3] w-[80px] h-[40px] mt-5 mr-3 text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00BFFF] 
            sm:w-[100px] sm:h-[45px]"
            >
           ADD
          </Button>
          </Link>
        </div>


        <TableDemo/>
    </div>
            </>
  )
}

export default page