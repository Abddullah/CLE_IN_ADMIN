"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollReset = () => {
  const pathname = usePathname(); 

  useEffect(() => {
    const mainContent = document.getElementById("main-content"); 

    if (mainContent) {
      mainContent.scrollTop = 0; 
    } else {
      window.scrollTo(0, 0); 
    }
  }, [pathname]); 

  return null;
};

export default ScrollReset;
