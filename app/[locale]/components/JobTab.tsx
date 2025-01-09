import { useRouter } from "@/i18n/routing";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

function JobTab() {
  const t = useTranslations("Jobs");

  const [active, setActive] = useState<string>("");
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (path.includes("moderate")) {
      setActive("moderate");
    } else if (path.includes("pending")) {
      setActive("pending");
    } else if (path.includes("jobs")) {
      setActive("jobs");
    }
  }, [path]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 sm:px-6 mt-6">
        <button
          onClick={() => {
            router.push("/jobs");
          }}
          className={`w-full py-3 text-center rounded-lg transition-all duration-200 ${
            active === "jobs"
              ? "text-white bg-[#00BFFF] hover:bg-[#00BFFF]"
              : "text-white bg-[#859090] hover:bg-[#859090]"
          }`}
        >
          {t("active")}
        </button>

        <button
          onClick={() => {
            router.push("/jobs/pending");
          }}
          className={`w-full py-3 text-center rounded-lg transition-all duration-200 ${
            active === "pending"
              ? "text-white bg-[#00BFFF] hover:bg-[#00BFFF]"
              : "text-white bg-[#859090] hover:bg-[#859090]"
          }`}
        >
          {t("Pending")}
        </button>

        <button
          onClick={() => {
            router.push("/jobs/moderate");
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
