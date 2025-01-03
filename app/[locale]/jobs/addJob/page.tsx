"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Link, useRouter } from "@/i18n/routing";
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

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useTranslations } from "next-intl";
import MapComponent from "../../components/map/map";
import { db } from "../../config/Firebase/FirebaseConfig";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import Modal from "../../components/ChooseFrequencyModal";
import { useDispatch } from "react-redux";
import { setCategory } from "../../config/Redux/reducers/categorySlice";

function page() {
  const t = useTranslations("Jobs");

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

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    alert("Form Submitted Sucessfully");
    console.log(data);
    router.push("/jobs/location");
  };

  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [subCategories, setSubCategories] = useState<string[]>([]);

  const [noOfRooms, setNoOfRooms] = useState<string[]>([]);
  const [roomSizes, setRoomSizes] = useState<string[]>([]);
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [hourPrice, setHourPrice] = useState<number>(0);
  const [error, setError] = useState<any>(null);
  const [roomPrices, setRoomPrices] = useState<any>();
  const [roomCountsPrices, setRoomCountsPrices] = useState<string[]>([]);

  const [selectedRoomPrice, setSelectedRoomPrice] = useState<number>(0);
  const [selectedRoomCountPrice, setSelectedRoomCountPrice] =
    useState<number>(0);
  const [matererialSelectedOption, setMaterialSelectedOption] =
    useState<string>("");
  const [additionalServicePrice, setAdditionalServicesPrice] = useState<any>();
  const [selectedProfessional, setSelectedProfessional] = useState<number>(0);
  const [images, setImages] = useState<(string | null)[]>(Array(6).fill(null));

  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [selectedHour, setSelectedHour] = useState<number>(0);

  const [categories, setCategories] = useState<{ [key: string]: string[] }>({});

  const location = useSelector((state: any) => state.location);
  const plane = useSelector((state: any) => state.plan);

  //image upload

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

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages[index] = null; // Remove the selected image
    setImages(updatedImages); // Update the state
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesCollection = collection(db, "categories");
      const categorySnapshot = await getDocs(categoriesCollection);
      const categoriesData: { [key: string]: string[] } = {};

      categorySnapshot.forEach((doc) => {
        const data = doc.data();
        const categoryName = data.categoryName;
        const subCategories: string[] = data.subCategories || [];
        categoriesData[categoryName] = subCategories;
      });

      setCategories(categoriesData);
      dispatch(setCategory(categoriesData));
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Update subCategories based on selectedCategory
    if (selectedCategory && categories[selectedCategory]) {
      setSubCategories(categories[selectedCategory]);
    } else {
      setSubCategories([]);
    }
  }, [selectedCategory, categories]);

  console.log(selectedCategory);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  useEffect(() => {
    const fetchHourlyRate = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "hourlyRates"));
        querySnapshot.forEach((doc) => {
          const price = parseInt(doc.data().rate || "0");
          setHourPrice(price);
        });
      } catch (error) {
        console.error("Error fetching hourly rate: ", error);
      }
    };
    fetchHourlyRate();
  }, []);

  // Fetch room sizes and their prices
  useEffect(() => {
    const fetchRoomSizes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "roomSize"));
        const sizes: string[] = [];
        const prices: any[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data() as RoomSize;
          sizes.push(data.title);
          prices.push(data.rate);
        });

        setRoomSizes(sizes);
        setRoomPrices(prices);
      } catch (error) {
        console.error("Error fetching room sizes: ", error);
      }
    };

    fetchRoomSizes();
  }, []);

  // Fetch number of rooms and their prices
  useEffect(() => {
    const fetchNumberOfRooms = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "NoOfRooms"));
        const roomNumbers = querySnapshot.docs.map((doc) => doc.data().title);
        const prices = querySnapshot.docs.map((doc) => doc.data().price);
        setNoOfRooms(roomNumbers);
        setRoomCountsPrices(prices);
      } catch (error) {
        console.error("Error fetching number of rooms: ", error);
      }
    };
    fetchNumberOfRooms();
  }, []);

  const calculateTotal = (
    roomPrice: number,
    roomCountPrice: number,
    hours: number,
    professional: number,
    hourlyRate: number // Pass hourPrice explicitly
  ) => {
    // Calculate total prices
    const totalRoomPrice = roomPrice + roomCountPrice;
    const totalHourlyPrice = hourlyRate * hours;
    const totalProfessionalPrice = totalHourlyPrice * professional;

    console.log("Total Professional Price:", totalProfessionalPrice);

    // Calculate final total
    const total = totalRoomPrice + totalProfessionalPrice + totalHourlyPrice;
    setTotalPrice(total); // Set the combined total price
  };

  // Updated handleHourChange function to explicitly pass hourPrice
  const handleHourChange = (hours: number) => {
    setSelectedHour(hours);
    calculateTotal(
      selectedRoomPrice,
      selectedRoomCountPrice,
      hours,
      selectedProfessional,
      hourPrice // Pass the current hourPrice
    );
  };

  // Updated handleSelectProfessional to include hourPrice
  const handleSelectProfessional = (professional: number) => {
    setSelectedProfessional(professional);
    calculateTotal(
      selectedRoomPrice,
      selectedRoomCountPrice,
      selectedHour,
      professional,
      hourPrice // Pass the current hourPrice
    );
  };

  // Ensure room size and room count functions also pass hourPrice
  const handleRoomSizeChange = (value: string) => {
    const selectedIndex = roomSizes.indexOf(value);
    const price = parseFloat(roomPrices[selectedIndex] || "0");
    setSelectedRoomPrice(price);
    calculateTotal(
      price,
      selectedRoomCountPrice,
      selectedHour,
      selectedProfessional,
      hourPrice // Pass the current hourPrice
    );
  };

  const handleNoOfRoomsChange = (value: string) => {
    const selectedIndex = noOfRooms.indexOf(value);
    const price = parseFloat(roomCountsPrices[selectedIndex] || "0");
    setSelectedRoomCountPrice(price);
    calculateTotal(
      selectedRoomPrice,
      price,
      selectedHour,
      selectedProfessional,
      hourPrice // Pass the current hourPrice
    );
  };

  //needed material

  const handleMaterialSelectedOption = (option: string) => {
    if (option === t("yes")) {
      if (matererialSelectedOption === t("yes")) {
        // If "Yes" is already selected, unselect it and subtract 5 from totalPrice
        setMaterialSelectedOption("");
        setTotalPrice((prevPrice) => prevPrice - 5);
      } else {
        // If "Yes" is not selected, select it and add 5 to totalPrice
        setMaterialSelectedOption(t("yes"));
        setTotalPrice((prevPrice) => prevPrice + 5);
      }
    } else {
      // "No" selected, reset the selected option
      setMaterialSelectedOption("");
    }
  };

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
    const fetchServicesAndPrices = async () => {
      try {
        const servicesRef = collection(db, "additionalServices"); // Fetching collection of additional services
        const querySnapshot = await getDocs(servicesRef); // Getting all documents

        let servicesData: any[] = [];
        let servicesPrice: any = {};

        // Loop through the documents to fetch services and their prices
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          servicesData.push(data.title); // Assuming the service has a 'name' field
          servicesPrice[data.title] = parseInt(data.price); // Assuming the service has a 'price' field
        });

        setAdditionalServices(servicesData); // Set the services list
        setAdditionalServicesPrice(servicesPrice); // Set the prices for each service
      } catch (err) {
        console.error("Error fetching services: ", err);
      }
    };

    fetchServicesAndPrices();
  }, []); // Only run once when the component mounts

  // Handle checkbox selection and updating total price
  const handleCheckboxChange = (service: string) => {
    const servicePrice = additionalServicePrice[service] || 0; // Get price of the selected service
    if (selectedServices.includes(service)) {
      // If already selected, deselect it and subtract the price
      setSelectedServices(selectedServices.filter((item) => item !== service));
      setTotalPrice((prevPrice) => prevPrice - servicePrice); // Subtract price from total
    } else {
      // If not selected, add it and add the price
      setSelectedServices([...selectedServices, service]);
      setTotalPrice((prevPrice) => prevPrice + servicePrice); // Add price to total
    }
  };

  return (
    <>
      <div className="bg-[#F5F7FA] min-h-screen w-full flex items-start justify-start relative">
        <div className="flex items-center justify-center h-screen">
          <Modal />
        </div>

        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-6xl px-8 lg:px-16 mt-6 mb-0"
          >
            <h1 className="text-2xl font-bold mt-2">{t("AddJobs")}</h1>
            <div className="grid w-full items-center gap-1.5 ">
              <Controller
                name="provider"
                control={control}
                rules={{
                  required: t("ProviderRequired"),
                }}
                render={({ field: { value, onChange } }) => (
                  <Select onValueChange={onChange} value={value}>
                    <SelectTrigger className="w-full h-[55px] rounded-lg border border-[#4BB1D3] bg-gray-50 mt-1 pr-6 outline-[#4BB1D3] focus:border-[#4BB1D3] focus:outline-none focus:border-none">
                      <SelectValue placeholder={t("Provider")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{t("Provider")}</SelectLabel>
                        <SelectItem value="Leonardo">Leonardo </SelectItem>
                        <SelectItem value="Matteo">Matteo</SelectItem>
                        <SelectItem value="Alessandro">Alessandro</SelectItem>
                        <SelectItem value="Giovanni">Giovanni</SelectItem>
                        <SelectItem value="Luca">Luca</SelectItem>
                        <SelectItem value="Marco">Marco</SelectItem>
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

              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
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
              <p className="text-xl font-semibold mt-6 mb-4">Select Category</p>
              <label className="text-md font-semibold" htmlFor="category">
                Category
              </label>
              <Controller
                name="category"
                control={control}
                rules={{
                  required: "Category is required",
                }}
                render={({ field }) => (
                  <Select
                    value={selectedCategory}
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleCategoryChange(value);
                    }}
                  >
                    <SelectTrigger className="w-full h-[55px] rounded-lg border p-4 pr-6 border-[#4BB1D3] bg-gray-50 outline-[#4BB1D3] focus:border-blue-500 focus:outline-none">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        {Object.keys(categories).map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
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
              {subCategories.length > 0 && (
                <div className="grid w-full items-center gap-1.5 mt-4">
                  <label
                    className="text-md font-semibold"
                    htmlFor="subcategory"
                  >
                    Subcategories
                  </label>
                  <Controller
                    name="subcategory"
                    control={control}
                    rules={{
                      required: "Subcategory is required",
                    }}
                    render={({ field: { value, onChange } }) => (
                      <Select value={value} onValueChange={onChange}>
                        <SelectTrigger className="w-full h-[55px] rounded-lg border p-4 pr-6 border-[#4BB1D3] bg-gray-50 outline-[#4BB1D3] focus:border-blue-500 focus:outline-none">
                          <SelectValue placeholder="Select Subcategory" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Subcategories</SelectLabel>
                            {subCategories.map((subCategory) => (
                              <SelectItem key={subCategory} value={subCategory}>
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
                      render={({ field: { value, onChange } }) => (
                        <Select
                          onValueChange={(value) => {
                            onChange(value);
                            handleRoomSizeChange(value); // Update the price when room size changes
                          }}
                          value={value}
                        >
                          <SelectTrigger className="w-full h-[55px] rounded-lg border border-[#4BB1D3] bg-gray-50 mt-1 pr-6 outline-[#4BB1D3] focus:border-[#4BB1D3] focus:outline-none focus:border-none">
                            <SelectValue placeholder={t("RoomAreaSize")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>{t("RoomAreaSize")}</SelectLabel>
                              {roomSizes.map((size, index) => (
                                <SelectItem key={index} value={size}>
                                  {size}
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
                          onValueChange={(value) => {
                            onChange(value);
                            handleNoOfRoomsChange(value);
                          }}
                          value={value}
                        >
                          <SelectTrigger className="w-full h-[55px] rounded-lg border border-[#4BB1D3] bg-gray-50 mt-1 pr-6 outline-[#4BB1D3] focus:border-[#4BB1D3] focus:outline-none focus:border-none">
                            <SelectValue placeholder={t("NumberOfRoom")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>{t("NumberOfRoom")}</SelectLabel>
                              {noOfRooms.map((room, index) => (
                                <SelectItem key={index} value={room}>
                                  {room}
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
                                  : "bg-[#d5dce4] text-black hover:bg-[#00A0E0] hover:text-white"
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
              <p className="font-semibold text-lg">Photos</p>
              <div className="flex flex-wrap gap-6">
                {images.map((image, index) => (
                  <div
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
                      <span
                        onClick={() => handleImageUpload(index)}
                        className="text-gray-500 text-sm font-medium"
                      >
                        + Upload
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
                className="w-[250px] mb-10  mt-6 h-[45px] text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out"
              >
                <span>{t("next")}</span>
              </Button>
            </div>
          </form>
        </div>

        <div className="fixed bottom-0 w-full bg-gray-300  z-20 p-3 border-t border-indigo-300 shadow-lg">
          <div className="flex justify-center items-center">
            <span className="text-lg font-medium">Total:</span>
            <span className="text-xl ml-2">{totalPrice} €</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
