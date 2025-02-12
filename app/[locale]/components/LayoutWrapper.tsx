"use client";
import { usePathname } from "next/navigation";
import ProtectedRoute from "./ProtectedRoute";
import { useEffect, useState } from "react";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [languageCode, setLanguageCode] = useState("en"); 

  useEffect(() => {
    if (pathname.includes("it")) {
      setLanguageCode("it");
    }
  }, [pathname]);

  const isLoginPage = pathname === `/${languageCode}`;

  return isLoginPage ? children : <ProtectedRoute>{children}</ProtectedRoute>;
}
