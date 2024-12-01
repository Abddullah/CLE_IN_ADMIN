"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {useTranslations} from 'next-intl';

function page() {
  const t = useTranslations('logout');
  const router = useRouter();
  
  const [confirmLogout, setConfirmLogout] = useState(false);

  const handleLogout = () => {
    router.push("/")
    
  }



  return (
    <>
      <div className="bg-[#F5F7FA] min-h-screen w-full ">
        <div className="flex items-center justify-center space-x-4 flex-col h-[60vh]">
          <p className="text-2xl sm:text-3xl font-semibold text-center">
            {(t('are_you_sure_logout'))}
          </p>
          <div className="flex justify-center gap-4 mt-8 flex-col sm:flex-col">
            <button
              onClick={() => {handleLogout()}}
              className="w-[16rem] sm:w-[20rem] bg-[#00BFFF] text-white py-2 px-4 rounded hover:bg-[#00BFFF] transition-all duration-300"
            >
             {(t('yes'))}
            </button>
            <button
              onClick={() => setConfirmLogout(false)}
              className="w-[16rem] sm:w-[20rem] py-2 px-4 border-2 border-[#00BFFF] text-[#00BFFF] bg-transparent rounded focus:outline-none focus:ring-2 focus:ring-[#00BFFF] hover:bg-transparent transition-all duration-300"
            >
             {(t('no'))}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
