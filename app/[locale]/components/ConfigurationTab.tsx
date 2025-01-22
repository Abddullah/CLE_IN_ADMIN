import { useRouter } from "@/i18n/routing";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

function ConfigurationTab() {
  const t = useTranslations("AdditionalServices");
  const [active, setActive] = useState<string>("");
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (path.includes("noOfRoom")) {
      setActive("noOfRoom");
    } else if (path.includes("roomAreaSize")) {
      setActive("roomAreaSize");
    } else if (path.includes("additionalService")) {
      setActive("additionalService");
    } else if (path.includes("/configuration")) {
      setActive("fixRates");
    }
  }, [path]);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-6 mx-6 mt-8">
        <button
          onClick={() => {
            router.push("/configuration");
          }}
          className={`flex-1 py-4  rounded-md ${
            active === "fixRates"
              ? "text-white bg-[#00BFFF] hover:bg-[#00BFFF]"
              : "text-white bg-[#859090] hover:bg-[#859090]"
          }`}
        >
          {(t('Fix Rate'))}
        </button>

        <button
          onClick={() => {
            router.push("/configuration/roomAreaSize");
          }}
          className={`flex-1 py-4 rounded-md ${
            active === "roomAreaSize"
              ? "text-white bg-[#00BFFF] hover:bg-[#00BFFF]"
              : "text-white bg-[#859090] hover:bg-[#859090]"
          }`}
        >
          {t("RoomAreaSize")}
        </button>

        <button
          onClick={() => {
            router.push("/configuration/noOfRoom");
          }}
          className={`flex-1 py-4 rounded-md ${
            active === "noOfRoom"
              ? "text-white bg-[#00BFFF] hover:bg-[#00BFFF]"
              : "text-white bg-[#859090] hover:bg-[#859090]"
          }`}
        >
          {t("NumberOfRoom")}
        </button>

        <button
          onClick={() => {
            router.push("/configuration/additionalService");
          }}
          className={`flex-1 py-4 rounded-md ${
            active === "additionalService"
              ? "text-white bg-[#00BFFF] hover:bg-[#00BFFF]"
              : "text-white bg-[#859090] hover:bg-[#859090]"
          }`}
        >
          {t("additionalService")}
        </button>
      </div>
    </>
  );
}

export default ConfigurationTab;
