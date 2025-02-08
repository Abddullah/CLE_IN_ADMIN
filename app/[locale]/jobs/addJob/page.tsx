"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setJobSlice } from "../../config/Redux/reducers/jobSlice"; // Import the action

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useTranslations } from "next-intl";
import MapComponent from "../../components/map/map";
import { db } from "../../config/Firebase/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setCategory } from "../../config/Redux/reducers/categorySlice";
import FrequencyModal from "../../components/ChooseFrequencyModal";
import { doc, getDoc } from "firebase/firestore";
import { isFloat32Array } from "util/types";

function page() {
  const t = useTranslations("Jobs");

  const dispatch = useDispatch();

  interface Props {
    provider: string;
    category: string;
    subCategory: string;
    selectedHour: any;
    roomSize: string;
    noOfRooms: string;
    selectedOption: string;
    AdditionalServices: string[];
  }

  type FormInputs = {
    provider: string;
    category: string;
    subcategory: string;
    hour: number;
    professional: number;
    roomsizes: string;
    numberofrooms: string;
    needmaterial: string;
    Additionalservices: string[];
    location: { lng: number; lat: number };
    plan: { value: string };
    total: number;
    totalWithTax: number;
  };

  interface RoomSize {
    title: string;
    rate: number;
  }

  interface AdditionalServicePrice {
    [key: string]: number;
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
  } = useForm<FormInputs>({
    defaultValues: {
      Additionalservices: [],
    },
  });

  const [form, setForm] = useState({
    provider: "",
    category: "",
    subcategory: "",
    hour: 0,
    professional: 0,
    roomsizes: "",
    numberofrooms: "",
    needmaterial: "",
    Additionalservices: [],
    location: { lng: 0, lat: 0 },
    plan: { value: "" },
  });

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const onSubmit: SubmitHandler<FormInputs> = (data: any) => {
    dispatch(setJobSlice(data)); // Dispatch form data to Redux store
    localStorage.setItem("addJob", JSON.stringify(data));
    console.log(data);
    router.push("/jobs/addJob/location");
  };

  const CleaningAndHygineService = "Cleaning and Hygiene Services";

  const location = useSelector((state: any) => state.location);
  const plane = useSelector((state: any) => state.plan);

  const [selectedName, setSelectedName] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [hourPrice, setHourPrice] = useState<number>(0);

  const [selectedHour, setSelectedHour] = useState<number>(1);
  const [previousHourPrice , setPreviouHourPrice]= useState(0);

  const [selectedProfessional, setSelectedProfessional] = useState<number>(1);
  const [previousProfessionalPrice , setPreviousProfessionalPrice]= useState(0);

  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const [roomSizes, setRoomSizes] = useState<any[]>([]);
  const [selectedRoomAreaSize, setSelectedRoomAreaSize] = useState("");
  const [previousRoomSizePrice, setPreviousRoomSizePrice] = useState(0);

  const [noOfRooms, setNoOfRooms] = useState<any[]>([]);
  const [selectedNoOfRooms, setSelectedNoOfRooms] = useState("");
  const [previousNoOfRoomsPrice, setPreviousNoOfRoomsPrice] = useState(0);

  const [matererialSelectedOption, setMaterialSelectedOption] =
    useState<string>("");
  const [previousNeedMaterialPrice, setPreviousNeedMaterialPrice] = useState(0);

  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [additionalServicePrice, setAdditionalServicesPrice] = useState<any>();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const [error, setError] = useState<any>(null);
  const [images, setImages] = useState<(string | null)[]>(Array(6).fill(null));

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [totalPriceWithTax, setTotalPriceWithTax] = useState<number>(0);

  const [editData, setEditData] = useState<string | null>(null);

  //get edit data from local storage in the state

  useEffect(() => {
    const data = localStorage.getItem("editJob");
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        setEditData(parsedData[0]);
      } catch (error) {
        console.error("Invalid JSON data:", error);
      }
    }
  }, []);

  //for edit the job

  useEffect(() => {
    if (!editData) return;

    const user = users.find(({ id }) => id === (editData as any).postedBy);
    const userName = user?.fullName;

    // Update the state only if the name has changed to avoid redundant renders
    if (userName && userName !== selectedName) {
      setSelectedName(userName);
      handleProviderChange(userName);
    }

    // Type assertion to treat editData as an object
    handleHourChange(Number((editData as any).howManyHourDoYouNeed));
    handleSelectProfessional(
      Number((editData as any).howManyProfessionalDoYouNeed)
    );
    setSelectedCategory((editData as any).category);
    setSelectedSubCategory((editData as any).subCategory);
    setSelectedRoomAreaSize((editData as any).roomSize);
    setSelectedNoOfRooms((editData as any).roomsQty);
    const additionalService = (editData as any).aditionalServices.map(
      (item: any) => item.title
    );
    setSelectedServices(additionalService);
  }, [editData, users, selectedName, setSelectedName]);

  //get tax data from local storage and add the tax amount to the tax state

  useEffect(() => {
    if (typeof window !== "undefined") {
      const taxData = localStorage.getItem("tax");
      if (taxData) {
        const taxArray = JSON.parse(taxData);
        const totalTax = taxArray.reduce(
          (sum: number, item: { percentage: number }) => {
            return sum + (Number(item.percentage) || 0);
          },
          0
        );
        setTax(totalTax);
      }
    }
  }, []);

  useEffect(() => {
    if (location) {
      setValue("location", { lng: location.lng, lat: location.lat });
    }
  }, [location, setValue]);

  useEffect(() => {
    if (plane) {
      setValue("plan", { value: plane.value });
    }
  }, [plane, setValue]);

  useEffect(() => {
    fetchUsers();
    fetchCategories();
    fetchRoomSizes();
    fetchNumberOfRooms();
    fetchServicesAndPrices();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersQuery = query(
        collection(db, "users"),
        where("role", "==", "user")
      );
      const querySnapshot = await getDocs(usersQuery);
      const fetchedUsers = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchCategories = () => {
    const data = localStorage.getItem("editJob");
    const categoriesCollection = collection(db, "categories");
    getDocs(categoriesCollection)
      .then((snapshot) => {
        const categories = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categories);
        if (data) {
          const parsedData: { category: string }[] = JSON.parse(data);
          if (Array.isArray(parsedData) && parsedData.length > 0) {
            const subCat = (categories as any).find(
              (category: any) =>
                category?.categoryName === parsedData[0]?.category
            );
            setSubCategories(subCat?.subCategories ?? []);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const fetchRoomSizes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "roomSize"));
      let allroomSizes = [] as RoomSize[];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as RoomSize;
        allroomSizes.push(data);
      });

      setRoomSizes(allroomSizes);
    } catch (error) {
      console.error("Error fetching room sizes: ", error);
    }
  };

  const fetchNumberOfRooms = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "NoOfRooms"));
      const data = querySnapshot.docs.map((doc) => doc.data());
      setNoOfRooms(data);
    } catch (error) {
      console.error("Error fetching number of rooms: ", error);
    }
  };

  const fetchServicesAndPrices = async () => {
    try {
      const servicesRef = collection(db, "additionalServices");
      const querySnapshot = await getDocs(servicesRef);
      let servicesData: any[] = [];
      let servicesPrice: any = {};
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        servicesData.push(data.title);
        servicesPrice[data.title] = parseInt(data.price);
      });
      setAdditionalServices(servicesData);
      setAdditionalServicesPrice(servicesPrice);
    } catch (err) {
      console.error("Error fetching services: ", err);
    }
  };

  const handleProviderChange = (selectedProvider: string) => {
    const selectedUser = users.find(
      (user: any) => user.userId === selectedProvider
    );
    if (selectedUser) {
      localStorage.setItem("JobPostUserId", selectedProvider);
      setHourPrice(Number(selectedUser.hourlyRate));
    }
  };

  //handle the hour change

  const handleHourChange = (value: any) => {
    setSelectedHour(value);
    totalAmount(value, "hour");
    setValue("hour", value);
  };

  //handle the selected professional change

  const handleSelectProfessional = (value: any) => {
    setSelectedProfessional(value);
    totalAmount(value, "professional");
    setValue("professional", value);
  };

  const categoryHandler = (categoryName: any) => {
    setSelectedCategory(categoryName);
    let subCat = categories.find(
      (category) => category.categoryName === categoryName
    );
    setSubCategories(subCat?.subCategories);
  };

  //handle room size when changes

  const handleRoomSizeChange = (value: string) => {
    const findRoomSize = roomSizes.find((data) => data.title === value);
    setSelectedRoomAreaSize(value);

    if (findRoomSize?.rate) {
      const roomSizePrice = Number(findRoomSize.rate);
      totalAmount(roomSizePrice, "roomSize");
    } else {
      console.warn(`No matching room size found for value: "${value}"`);
    }
  };

  //handle the no of rooms when changes

  const handleNoOfRoomsChange = (value: string) => {
    const findNoOfRooms = noOfRooms.find((data) => data.title === value);
    setSelectedNoOfRooms(value);

    if (findNoOfRooms && findNoOfRooms.price) {
      const noOfRoomsPrice = Number(findNoOfRooms.price);
      totalAmount(noOfRoomsPrice, "NoOfRooms");
    } else {
      console.warn(`No matching room found for value: "${value}"`);
    }
  };

  //handle the select need cleaning material

  const handleMaterialSelectedOption = (option: any) => {
    let price = 0; // Assume 6 for "yes"
    if (option === t("yes")) {
      price = 6;
      setMaterialSelectedOption(t("yes"));
    } else {
      price = 0;
      setMaterialSelectedOption(t("No"));
    }
    totalAmount(price, "needMaterial");
  };

  //handle the check box of additional services

  const handleCheckboxChange = (service: string): void => {
    setSelectedServices((prevSelectedServices) => {
      const updatedServices = prevSelectedServices.includes(service)
        ? prevSelectedServices.filter((item) => item !== service)
        : [...prevSelectedServices, service];
      setValue("Additionalservices", updatedServices);
      return updatedServices;
    });
    const servicePrice = additionalServicePrice[service] || 0;
    if (selectedServices.includes(service)) {
      setTotalPrice((prevPrice) => prevPrice - servicePrice);
    } else {
      setTotalPrice((prevPrice) => prevPrice + servicePrice);
    }
  };

  // A function which handle the total of all the fields

  const totalAmount = (value: any, type: any) => {
    let total = 0;

    total = totalPrice;

    if (type === "hour") {
      total = total + value * hourPrice * selectedProfessional - previousHourPrice;
      setPreviouHourPrice(total + value * hourPrice * selectedProfessional);
    }

    if (type === "professional") {
      total = total + value * selectedHour * hourPrice - previousProfessionalPrice;
      setPreviousProfessionalPrice(value * selectedHour * hourPrice);
    }

    if (type === "roomSize") {
      total = totalPrice - previousRoomSizePrice + value;
      setPreviousRoomSizePrice(value);
    }

    if (type === "NoOfRooms") {
      total = totalPrice - previousNoOfRoomsPrice + value;
      setPreviousNoOfRoomsPrice(value);
    }

    if (type === "needMaterial") {
      total = totalPrice - previousNeedMaterialPrice + value;
      setPreviousNeedMaterialPrice(value);
    }

    setTotalPrice(total);
  };

  //handle the image upload

  const handleImageUpload = (index: number) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const updatedImages = [...images];
          updatedImages[index] = reader.result as string;
          setImages(updatedImages);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  //handle the remove the uploaded image

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages[index] = null;
    setImages(updatedImages);
  };

  //calculate the tax in the total price

  useEffect(() => {
    const priceWithTax = totalPrice + (totalPrice * tax) / 100;
    setTotalPriceWithTax(priceWithTax);
  }, [tax, totalPrice]);

  //set the value of total price or total price with tax

  setValue("total", totalPrice);
  setValue("totalWithTax", totalPriceWithTax);

  return (
    <>
      <div className="bg-[#F5F7FA] min-h-screen w-full flex items-start justify-start relative">
        {/* <div className="flex items-center justify-center h-screen">
          <FrequencyModal />
        </div> */}

<div className="w-full mx-auto p-4 sm:p-6 lg:px-8">
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="w-full max-w-full px-4 sm:px-8 lg:px-12 mt-6 mb-0"
  >
    <h1 className="text-2xl font-bold mt-2">{t("AddJobs")}</h1>

    <div className="w-full flex items-start justify-start">
      <Controller
        name="provider"
        control={control}
        rules={{ required: t("ProviderRequired") }}
        render={({ field: { value, onChange } }) => (
          <Select
            value={value || selectedName}
            onValueChange={(newValue) => {
              setSelectedName(newValue);
              onChange(newValue);
              handleProviderChange(newValue);
            }}
          >
            <SelectTrigger className="w-full h-[55px] rounded-lg border border-[#4BB1D3] bg-gray-50 mt-1 pr-6 outline-[#4BB1D3] focus:border-[#4BB1D3] focus:outline-none">
              <SelectValue
                placeholder={selectedName || t("Provider")}
              />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>{t("Provider")}</SelectLabel>
                {users.map((user: any) => (
                  <SelectItem key={user.userId} value={user.userId}>
                    {user.fullName}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />

      {errors.provider && (
        <p className="text-red-500 text-sm mt-1">
          {errors.provider.message}
        </p>
      )}
    </div>
            {selectedName && (
              <>
                <div className="flex flex-col mt-6 h-full">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {t("HowManyHours")}
                  </h2>
                  <div className="flex flex-wrap gap-4 mt-3 justify-start">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((hour) => (
                      <button
                        key={hour}
                        type="button"
                        onClick={() => handleHourChange(hour)}
                        className={`w-8 h-8 text-lg font-bold rounded-full border transition duration-300 ${
                          selectedHour === hour
                            ? "bg-[#4BB1D3] text-white"
                            : "text-[#4BB1D3] border-[#4BB1D3] hover:bg-[#4BB1D3] hover:text-white"
                        }`}
                      >
                        {hour}
                      </button>
                    ))}
                  </div>

                  {errors.hour && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.hour.message}
                    </p>
                  )}
                  {error && (
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                  )}
                </div>

                {/* Professionals Selection */}
                <div className="w-full mt-6 h-full">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {t("HowManyProfessionals")}
                  </h2>
                  <div className="flex space-x-2 mt-2 gap-2">
                    {[1, 2, 3, 4].map((professional) => (
                      <div className="flex mt-2" key={professional}>
                        <button
                          type="button"
                          onClick={() => handleSelectProfessional(professional)}
                          className={`w-8 h-8 text-lg font-bold rounded-full border transition duration-300 ${
                            selectedProfessional === professional
                              ? "bg-[#4BB1D3] text-white"
                              : "text-[#4BB1D3] border-[#4BB1D3] hover:bg-[#4BB1D3] hover:text-white"
                          }`}
                        >
                          {professional}
                        </button>
                      </div>
                    ))}
                  </div>
                  {errors.professional && (
                    <p className="text-red-500 mt-2 text-sm">
                      {errors.professional.message}
                    </p>
                  )}
                </div>

                <div className="grid w-full items-center gap-1.5 mt-3">
                  <p className="text-xl font-semibold mt-6 mb-4">
                    {t("SelectCategory")}
                  </p>
                  <label className="text-md font-semibold" htmlFor="category">
                    {t("Category")}
                  </label>

                  <Controller
                    name="category"
                    control={control}
                    rules={{
                      required: t("CategoryRequired"),
                    }}
                    render={({ field }) => (
                      <Select
                        value={selectedCategory}
                        onValueChange={(value) => {
                          field.onChange(value);
                          categoryHandler(value);
                        }}
                      >
                        <SelectTrigger className="w-full h-[55px] rounded-lg border p-4 pr-6 border-[#4BB1D3] bg-gray-50 outline-[#4BB1D3] focus:border-blue-500 focus:outline-none">
                          <SelectValue
                            placeholder={
                              field.value ||
                              selectedCategory ||
                              t("SelectCategory")
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>{t("categories")}</SelectLabel>
                            {categories &&
                              categories.map((category, index) => (
                                <SelectItem
                                  key={index}
                                  value={category.categoryName}
                                >
                                  {category.categoryName}
                                </SelectItem>
                              ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />

                  {errors.category && (
                    <p className="text-red-500 mt-2 text-sm">
                      {errors.category.message}
                    </p>
                  )}

                  {/* Render subcategories if available */}
                  {subCategories?.length != 0 && (
                    <div className="grid w-full items-center gap-1.5 mt-4">
                      <label
                        className="text-md font-semibold"
                        htmlFor="subcategory"
                      >
                        {t("Subcategories")}
                      </label>
                      <Controller
                        name="subcategory"
                        control={control}
                        rules={{ required: t("SubcategoryRequired") }}
                        render={({ field: { value, onChange } }) => (
                          <Select
                            value={selectedSubCategory}
                            onValueChange={(newValue: any) => {
                              setSelectedSubCategory(newValue);
                              onChange(newValue);
                            }}
                          >
                            <SelectTrigger className="w-full h-[55px] rounded-lg border p-4 pr-6 border-[#4BB1D3] bg-gray-50 outline-[#4BB1D3] focus:border-blue-500 focus:outline-none">
                              <SelectValue
                                placeholder={t("Select_SubCategory")}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel> {t("Subcategories")}</SelectLabel>
                                {subCategories != undefined &&
                                  subCategories.length != 0 &&
                                  subCategories?.map((subCategory, index) => (
                                    <SelectItem key={index} value={subCategory}>
                                      {subCategory}
                                    </SelectItem>
                                  ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.subcategory && (
                        <p className="text-red-500 mt-2 text-sm">
                          {errors.subcategory.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {selectedCategory === "Cleaning and Hygiene Services" && (
                  <>
                    <div className="w-full">
                      <div className="grid w-full items-center gap-1.5 mt-6">
                        <label
                          className="text-md font-semibold"
                          htmlFor="Room Area Size"
                        >
                          {t("RoomAreaSize")}
                        </label>
                        <Controller
                          name="roomsizes"
                          control={control}
                          rules={{
                            required: t("RoomSizeRequired"),
                          }}
                          defaultValue={selectedRoomAreaSize}
                          render={({ field: { value, onChange } }) => (
                            <Select
                              value={value}
                              onValueChange={(newValue) => {
                                handleRoomSizeChange(newValue);
                                onChange(newValue);
                              }}
                            >
                              <SelectTrigger className="w-full h-[55px] rounded-lg border border-[#4BB1D3] bg-gray-50 mt-1 pr-6 outline-[#4BB1D3] focus:border-[#4BB1D3] focus:outline-none focus:border-none">
                                <SelectValue
                                  placeholder={
                                    selectedRoomAreaSize || t("RoomAreaSize")
                                  }
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>{t("RoomAreaSize")}</SelectLabel>
                                  {roomSizes.map((size, index) => (
                                    <SelectItem key={index} value={size.title}>
                                      {size.title}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.roomsizes && (
                          <p className="text-red-500 mt-2 text-sm">
                            {errors.roomsizes.message}
                          </p>
                        )}
                      </div>

                      <div className="grid w-full items-center gap-1.5 mt-6">
                        <label
                          className="text-md font-semibold"
                          htmlFor="NumberOfRoom"
                        >
                          {t("NumberOfRoom")}
                        </label>
                        <Controller
                          name="numberofrooms"
                          control={control}
                          rules={{
                            required: t("RequiredNumberOfRoom"),
                          }}
                          render={({ field: { value, onChange } }) => (
                            <Select
                              value={value || selectedNoOfRooms}
                              onValueChange={(newValue) => {
                                onChange(newValue);
                                handleNoOfRoomsChange(newValue);
                              }}
                            >
                              <SelectTrigger className="w-full h-[55px] rounded-lg border border-[#4BB1D3] bg-gray-50 mt-1 pr-6 outline-[#4BB1D3] focus:border-[#4BB1D3] focus:outline-none focus:border-none">
                                <SelectValue
                                  placeholder={
                                    t("NumberOfRoom") || selectedNoOfRooms
                                  }
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>{t("NumberOfRoom")}</SelectLabel>
                                  {noOfRooms.map((room, index) => (
                                    <SelectItem key={index} value={room.title}>
                                      {room.title}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.numberofrooms && (
                          <p className="text-red-500 mt-2 text-sm">
                            {errors.numberofrooms.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Cleaning Material started */}
                    <div className="grid w-full items-center gap-1.5 mt-6">
                      <p className="text-md font-semibold">
                        {t("NeedCleaningMaterials")}
                      </p>
                      <Controller
                        name="needmaterial"
                        control={control}
                        rules={{ required: t("RequiredCleaningMaterial") }}
                        render={({
                          field: { onChange },
                          fieldState: { error },
                        }) => (
                          <>
                            <div className="flex space-x-4 mt-2">
                              {[t("No"), t("yes")].map((option) => (
                                <button
                                  type="button"
                                  key={option}
                                  onClick={() => {
                                    onChange(option);
                                    handleMaterialSelectedOption(option);
                                  }}
                                  className={`px-4 py-2 rounded-full text-md font-medium transition duration-300 ${
                                    matererialSelectedOption === option
                                      ? "bg-[#00A0E0] text-white"
                                      : "bg-[#d5dce4] text-black "
                                  }`}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                            {error && (
                              <p className="text-red-600 text-sm mt-2">
                                {error.message}
                              </p>
                            )}
                          </>
                        )}
                      />
                    </div>

                    <div className="grid w-full items-center gap-1.5 mt-6">
                      <h3 className="text-md font-semibold">
                        {t("SelectAdditional")}
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                        {additionalServices.map((service, index) => (
                          <div key={index}>
                            <label className="flex items-center space-x-2 rounded-lg p-3 border border-gray-200 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
                              <input
                                type="checkbox"
                                className="form-checkbox h-6 w-6 text-blue-600"
                                value={service}
                                checked={selectedServices.includes(service)}
                                onChange={() => handleCheckboxChange(service)}
                              />
                              <span className="text-gray-700 font-medium">
                                {service}
                              </span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <div className="grid w-full items-center gap-2 mt-3">
                  <p className="font-semibold text-lg">{t("photos")}</p>
                  <div className="flex flex-wrap gap-10">
                    {images.map((image, index) => (
                      <div
                        onClick={() => handleImageUpload(index)}
                        key={index}
                        className="relative w-[108px] h-[99.52px] rounded-lg bg-gray-100 border border-gray-400 flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md transition-all"
                      >
                        {image ? (
                          <>
                            <Image
                              src={image}
                              alt={`uploaded-image-${index}`}
                              width={108}
                              height={99.52}
                              className="object-cover rounded-lg"
                            />
                            <button
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-700 transition"
                              title="Remove image"
                            >
                              &times;
                            </button>
                          </>
                        ) : (
                          <span className="text-gray-500 text-sm font-medium">
                            + {t("upload")}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* location */}
                <div className="grid w-full items-center gap-1.5 mt-6">
                  <p className="text-lg font-bold mt-2">{t("Location")}</p>

                  <MapComponent />
                </div>

                <div className="mt-8 flex justify-center items-center">
                  <Button
                    type="submit"
                    className="w-[250px] mb-12  mt-6 h-[45px] text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out"
                  >
                    <span>{t("next")}</span>
                  </Button>
                </div>
              </>
            )}
          </form>
        </div>

        <div className="fixed bottom-0 w-full sm:left-[10%] sm:w-[100%] bg-[#00BFFF]  text-gray-200 z-20 p-3 rounded-t-lg shadow-2xl">
          <div className="flex justify-center items-center">
            <span className="text-lg font-semibold uppercase tracking-wide">
              Total Amount :{" "}
            </span>
            <span className="text-2xl font-bold ml-2"> € {totalPrice}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
