"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faSearch } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { useDispatch } from "react-redux";
import { setSearch } from "../../[locale]/config/Redux/reducers/searchSlice";

const pathMapping: Record<string, string> = {
  services: "Services",
  categories: "Categories",
  settings: "Settings",
  bookings: "Bookings",
  jobs: "Jobs",
  users: "Users",
  logout: "Logout",
  chat: "Chat",
  payments: "Payments",
  dashboard: "Dashboard",
  additionalServices: "Additional Services",
  configuration: "Configurations",
  banner: "Banners",
};

interface SearchProps {
  setSearchTerm: (term: string) => void;
}

const hidePaths = ["/it", "/en"];
const SearchHiddenRoutes = [
  "/en/dashboard",
  "/en/configuration",
  "/en/settings",
  "/en/payments",
  "/en/banner",
];

const Navbar = () => {
  const t = useTranslations("navbar");

  const pathname = usePathname();
  const router = useRouter();
  const notificationsRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [pathName, setPathName] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [languageCode, setLanguageCode] = useState("");

  useEffect(() => {
    if (pathname.includes("/en")) {
      setLanguageCode("en");
      return;
    }

    setLanguageCode("it");
  }, [setLanguageCode]);

  const toggleNotifications = useCallback(() => {
    setIsNotificationsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const matchedPath = Object.keys(pathMapping).find((key) =>
      pathname.includes(key)
    );
    setPathName(matchedPath ? pathMapping[matchedPath] : "");
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (hidePaths.includes(pathname)) {
    return null;
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.trim();
    dispatch(setSearch(query));
    setSearchTerm(query);
  };

  //empty the serach bar when route changes

 
    if (searchTerm) {
      setSearchTerm("");
    }
  
  

  return (
    <aside>
      <div className="w-full flex items-center justify-end ml-auto bg-white p-5 sm:p-4 md:px-6 md:py-3 rounded-lg relative md:justify-between lg:justify-between">
        <div className="hidden md:block text-2xl font-bold text-[#343C6A] mt-2">
          {pathName}
        </div>

        {!pathname.includes(`/${languageCode}/dashboard`) &&
          !pathname.includes(`/${languageCode}/configuration`) &&
          !pathname.includes(`/${languageCode}/banner`) &&
          !pathname.includes(`/${languageCode}/payments`) &&
          !pathname.includes(`/${languageCode}/settings`) && 
          !pathname.includes(`/${languageCode}/jobs/addJob`) &&
          !pathname.includes(`/${languageCode}/services/addService`) &&
          !pathname.includes(`/${languageCode}/services/reviewService`) &&
          (
            <div className="flex-1 gap-3 mt-2 max-w-[75%] sm:max-w-[50%] md:max-w-[40%] lg:max-w-[30%] relative ml-auto sm:mr-4 md:mr-9 px-2">
            {/* // <div className={`flex-1 ${SearchHiddenRoutes.includes(pathname) ? "hidden" : "flex"} gap-3 mt-2 max-w-[75%] sm:max-w-[50%] md:max-w-[40%] lg:max-w-[30%] relative ml-auto sm:mr-4 md:mr-9 px-2`}> */}
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder={t("search_placeholder")}
                className="w-full h-9 sm:h-12 bg-gray-100 rounded-full py-1 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          )}

        <div className="flex items-center space-x-3 mr-2 sm:space-x-4 relative">
          <div
            className="relative cursor-pointer"
            onClick={toggleNotifications}
          >
            <FontAwesomeIcon
              icon={faBell}
              className="text-gray-600 text-lg sm:text-xl mt-2"
            />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2 mt-2">
              3
            </span>
          </div>

          <div className="flex items-center">
            <Image
              src="/assets/Mask Group.png"
              alt={t("user_profile_alt")}
              width={32}
              height={32}
              className="rounded-full border border-gray-300 shadow-md"
            />
          </div>

          {isNotificationsOpen && (
            <div
              ref={notificationsRef}
              className="absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-y-auto max-h-90"
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {t("notifications")}
                </h3>
                <div className="space-y-4 mt-2">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <NotificationCard key={index} t={t} />
                  ))}
                  <div className="items-center text-center">
                    <Button
                      variant="outline"
                      className="border-[#00BFFF] border-2   w-[150px] text-[#00BFFF] hover:bg-[#00BFFF] hover:text-white"
                    >
                      {t("show_all")}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

const NotificationCard = ({ t }: any) => (
  <div className="flex items-start p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-150 ease-in-out">
    <Image
      src="/assets/Mask Group.png"
      alt={t("notification_icon_alt")}
      width={40}
      height={40}
      className="rounded-full mr-3"
    />
    <div>
      <p className="text-sm font-medium text-gray-700">
        {t("notification_received")}
      </p>
      <p className="text-xs text-gray-400">{t("notification_time")}</p>
      <p className="text-sm text-gray-600 mt-1">{t("notification_message")}</p>
    </div>
  </div>
);

export default Navbar;
