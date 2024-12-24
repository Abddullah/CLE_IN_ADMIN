import { useRouter } from "@/i18n/routing";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

function ConfigurationTab() {
  const t = useTranslations("AdditionalServices");
  const [active , setActive] = useState<string>("");
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (path.includes("noOfRoom") ) {
      setActive("noOfRoom");
      console.log(active);
    } else if (path.includes("roomAreaSize")) {
      setActive("roomAreaSize");
    } else if (path.includes("hourlyRate")) {
      setActive("hourlyRate");
    } else if (path.includes("configuration")) {
      setActive("configuration");
    }
    
  }, [path])


  return (
    <>
      <div className="flex justify-between w-full px-4 sm:px-4 md:px-12 lg:px-9 space-x-4 mt-6">
       

        <button
          onClick={() => {
            router.push("/configuration/hourlyRate");
          }}
          className={`flex-1 py-4 rounded-md ${
            active === "hourlyRate"
              ? " text-white bg-[#00BFFF] hover:bg-[#00BFFF]"
              : "text-white bg-[#859090] hover:bg-[#859090]"
          } `}
        >
          {t("HourlyRates")}
        </button>

        <button
          onClick={() => {
            router.push("/configuration/roomAreaSize");
          }}
          className={`flex-1 py-4 rounded-md ${
            active === "roomAreaSize"
              ? " text-white bg-[#00BFFF] hover:bg-[#00BFFF]"
              : "text-white bg-[#859090] hover:bg-[#859090]"
          } `}
        >
          {t("RoomAreaSize")}
        </button>
        <button
          onClick={() => {
            router.push("/configuration/noOfRoom");
          }}
          className={`flex-1 py-4 rounded-md ${
            active === "noOfRoom"
              ? " text-white bg-[#00BFFF] hover:bg-[#00BFFF]"
              : "text-white bg-[#859090] hover:bg-[#859090]"
          } `}
        >
          {t("NumberOfRoom")}
        </button>
        <button
          onClick={() => {
            router.push("/configuration");
            // text-white bg-[#00BFFF] hover:bg-[#00BFFF]
          }}
          className={`flex-1 py-4 rounded-md ${
            active === "configuration"
              ? " text-white bg-[#00BFFF] hover:bg-[#00BFFF]"
              : "text-white bg-[#859090] hover:bg-[#859090]"
          } `}
        >
          {t("additionalService")}
        </button>
      </div>
    </>
  );
}

export default ConfigurationTab;
