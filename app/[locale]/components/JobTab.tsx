import { useRouter } from "@/i18n/routing";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

function JobTab() {
  const t = useTranslations("Jobs");

  const [active, setActive] = useState<string>("");
  const router = useRouter();
  const path = usePathname();

  console.log(path);
  
  const [pathName , setPathName] = useState("");


  useEffect(()=>{
  if(path.includes('jobs')){
    setPathName('jobs')
    return
  }

  setPathName('services')

  },[path])
  

  useEffect(() => {
    if (path.includes("moderate")) {
      setActive("moderate");
    } else if (path.includes("active")) {
      setActive("active");
    } else if (path.includes("jobs") || path.includes("services")) {
      setActive("jobs");
    }
  }, [path]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 sm:px-6 mt-6">
        <button
          onClick={() => {
            router.push(`/${pathName}`);
          }}
          className={`w-full py-3 text-center rounded-lg transition-all duration-200 ${
            active === "jobs"
              ? "text-white bg-[#00BFFF] hover:bg-[#00BFFF]"
              : "text-white bg-[#859090] hover:bg-[#859090]"
          }`}
        >
          {/* {t("active")} */}
          {t("Pending")}
        </button>

        <button
          onClick={() => {
            router.push(`/${pathName}/active`);
          }}
          className={`w-full py-3 text-center rounded-lg transition-all duration-200 ${
            active === "active"
              ? "text-white bg-[#00BFFF] hover:bg-[#00BFFF]"
              : "text-white bg-[#859090] hover:bg-[#859090]"
          }`}
        >
          {/* {t("Pending")} */}
           {t("active")}
        </button>

        <button
          onClick={() => {
            router.push(`/${pathName}/moderate`);
          }}
          className={`w-full py-3 text-center rounded-lg transition-all duration-200 ${
            active === "moderate"
              ? "text-white bg-[#00BFFF] hover:bg-[#00BFFF]"
              : "text-white bg-[#859090] hover:bg-[#859090]"
          }`}
        >
          {t("moderate")}
        </button>
      </div>
    </>
  );
}

export default JobTab;
