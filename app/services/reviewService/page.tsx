import Image from 'next/image'
import React from 'react'
import map from '../../../assets/bookingsIcon/map.svg'
import serviceImage from '../../../assets/bookingsIcon/room.svg'
import { Button } from '@/components/ui/button'


function page() {
  return (
    <>
   
    <div className="bg-[#F5F7FA] min-h-screen w-full flex items-start justify-start pt-2">
    <div className="w-full max-w-7xl px-8 lg:px-16 mt-6">


        <div>
        <h1 className='text-xl font-semibold'>Review & Confirm</h1>

<p className='text-xl mt-4'>Category</p>

     <div>
     <input
        type="text"
        defaultValue="Cleaning at home"
        className="p-4 h-[40px] w-[200px] mt-3 border rounded-lg text-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter text here"
      />
     </div>


     <div className='mt-7'>
        <p className='text-xl'>Price</p>
        <p className='text-[#00BFFF] font-semibold text-xl mt-2'>$30/hr</p>
     </div>


     <div className='mt-4'>
        <p className='text-xl'>Location</p>
        <p className='text-lg mt-3'>Manor Station Rd.Gastonia</p>
        <Image className='mt-4' src={map} alt='map'/>
     </div>

     <div className='mt-6'>
        <p>Availablity</p>

        <input
        type="text"
        defaultValue="8:00 AM to 22:00 PM"
        className="p-4 h-[40px] w-[280px] mt-3 border rounded-lg text-md text-[#00BFFF] font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter text here"
      />
     </div>


     <div className='mt-7'>
        <p className='text-xl'>Description</p>
        <p className='mt-4'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum ducimus debitis beatae aliquid laborum, placeat aspernatur itaque vero provident iusto! Suscipit architecto quos accusamus eius velit minima labore totam dolorem.</p>
     </div>

     <div className='mt-3'>
        <Image src={serviceImage} alt='image'/>
     </div>


     <div className="mt-6 flex justify-center items-center">
            <Button className="w-[280px] mb-4 h-[45px] text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out">
              <span>POST</span>
            </Button>
          </div>

     
    



        </div>




</div>

    </div>
    </>
  )
}

export default page