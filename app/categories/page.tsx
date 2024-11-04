import Image from 'next/image'
import React from 'react'
import cardImage from '../../assets/categoriesIcons/Vector.svg'


function page() {
  return (
    <div>
        <>

        <div className="max-w-[200px] rounded-xl border-2 border-blue-500 shadow-lg bg-white p-2">
      <div className="flex flex-col items-center mb-2">
        <Image src={cardImage} className='w-28 h-28 object-cover rounded-full mb-4' alt='dhdhdh'/>
        <h2 className="text-lg font-bold">Cleaning of Home</h2>
        <p className="text-gray-600 mt-2">...</p> {/* Three dots below the text */}
      </div>
    </div>




        </>
    </div>
  )
}

export default page