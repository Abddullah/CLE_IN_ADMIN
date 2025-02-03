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

  const [isflag, setIsFlag] = useState<boolean>(false);
  const [isflagForSubCat, setisflagForSubCat] = useState<boolean>(false);

  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const CleaningAndHygineService = "Cleaning and Hygiene Services";

  const [roomSizes, setRoomSizes] = useState<string[]>([]);
  const [previousRoomSizeRate , setPreviousRoomSizeRate]= useState(0);
  const [selectedRoomAreaSize, setSelectedRoomAreaSize] = useState("");
  const [selectedRoomSizePrice , setSelectedRoomSizePrice]= useState(0);

  const [noOfRooms, setNoOfRooms] = useState<string[]>([]);
  const [selectedRoomNoOfSizePrice , setSelectedRoomNoOfSizePrice]= useState(0);
  const [selectedNoOfRooms, setSelectedNoOfRooms] = useState("");
  const [selectedNoOfRoomsPrice , setSelectedNoOfRoomsPrice]= useState(0);



  const [selectedNeedMaterial, setSelectedNeedMaterial] = useState("");
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

  const [selectedMaterialPrice, setSelectedMaterialPrice] = useState<number>(0);
  const [users, setUsers] = useState<any[]>([]);
  const [previousUserRate, setPreviouUserRate] = useState<number>(0);
  const [selectedName, setSelectedName] = useState("");
  const [isEdited , setIsEdited]= useState();
  const [allRoomSize , setAllRoomSize]= useState([]);
  const [allNoOfRooms , setAllNoOfRoom] = useState([]);
  const [hasEdited, setHasEdited] = useState(false);
 

  const getUserName = async (userId: string) => {
    try {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        setSelectedName(userDoc.data().fullName);
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const editHandler = () => {
    const data = localStorage.getItem("editJob");
    if (data) {
      const parsedData = JSON.parse(data);
      setIsEdited(parsedData[0]);
      const matchedUser = users.find(
        (user: any) => user.userId === parsedData[0].postedBy
      );
      if (matchedUser) {
        setSelectedName(matchedUser.fullName);
      }
      setSelectedHour(Number(parsedData[0].howManyHourDoYouNeed));
      setSelectedProfessional(
        Number(parsedData[0].howManyProfessionalDoYouNeed)
      );
      setSelectedCategory(parsedData[0].category);
      setSelectedSubCategory(parsedData[0].subCategory);
      setSelectedRoomAreaSize(parsedData[0].roomSize);
      setSelectedNoOfRooms(parsedData[0].roomsQty);
      setSelectedNeedMaterial(parsedData[0].needCleaningMaterials);
      setTotalPrice(Number(parsedData[0].totalPrice));
      const additionalService = parsedData[0].aditionalServices.map(
        (item: any) => item.title
      );
      setSelectedServices(additionalService);
      
    }
  };


//   useEffect(() => {
//     const myIndex = roomSizes.indexOf(selectedRoomAreaSize);
//     if (myIndex !== -1) {
//       const myIndexPrice = parseFloat(roomPrices[myIndex] || 0);
//       setSelectedRoomSizePrice(myIndexPrice);
//     }
  
//     const myIndexNoOfRooms = noOfRooms.indexOf(selectedNoOfRooms);
//     if (myIndexNoOfRooms !== -1) {
//       const myIndexPrice = parseFloat(roomCountsPrices[myIndexNoOfRooms] || '0');
//       setSelectedNoOfRoomsPrice(myIndexPrice);
//     }
//   }, [selectedRoomAreaSize, selectedNoOfRooms , editHandler]);
  
// console.log(selectedNoOfRoomsPrice , 'no of rooms ki price')

const userHourlyRate = users.find((user) => user.fullName === selectedName)?.hourlyRate || 'N/A'



const calculateTotal = (
  roomPrice: number,
  roomCountPrice: number,
  hours: number,
  selectedProfessional: number, 
  hourlyRate: number 
) => {
  // Calculate room price
  const totalRoomPrice = roomPrice + roomCountPrice;

  // Calculate hourly price
  const totalHourlyPrice = hourlyRate * hours ;

  // Calculate professional price
  const totalProfessionalPrice =
    selectedProfessional > 1
      ? (selectedProfessional - 1) * totalHourlyPrice
      : 0;

  // Calculate final total
  const total = totalRoomPrice + totalHourlyPrice + totalProfessionalPrice;

  

  setTotalPrice(total);
 
};









  //fetch the users from the firebase

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Firestore query to exclude admin users
        const usersQuery = query(
          collection(db, "users"),
          where("role", "!=", "admin") // Only fetch users whose role is not admin
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
    
    fetchUsers();
  }, []);


  
  

 



  

  const handleProviderChange = (selectedProvider: string) => {
    // Find the selected user by userId (which is the value of the SelectItem)
    console.log()
    const selectedUser = users.find(
      (user: any) => user.userId === selectedProvider
    );

    if (selectedUser) {
      
    
   
      // Save userId in local storage
      localStorage.setItem("JobPostUserId", selectedProvider);

      // Update hourly rate
      setHourPrice(userHourlyRate);

    }
  };
  



  

  // Watch for changes in `hourPrice` to update the total price
  useEffect(() => {
    // Recalculate total price based on the updated hourly rate
    if (hourPrice && selectedHour) {
      const newTotalPrice = hourPrice * selectedHour;
      setTotalPrice(newTotalPrice);
      console.log("Total price updated:", newTotalPrice);
    }
  }, [hourPrice, selectedHour]); 

 
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
    updatedImages[index] = null;
    setImages(updatedImages);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    editHandler();
  }, [isflag]);

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
            setIsFlag(!isflag);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const categoryHandler = (categoryName: any) => {
    setSelectedCategory(categoryName);
    let subCat = categories.find(
      (category) => category.categoryName === categoryName
    );
    setSubCategories(subCat?.subCategories);
  };

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
          allRoomSize.push(data);
          setAllRoomSize([...allRoomSize])

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
        const data = querySnapshot.docs.map((doc) => doc.data());
        setAllNoOfRoom(data);
        setNoOfRooms(roomNumbers);
        setRoomCountsPrices(prices);

      } catch (error) {
        console.error("Error fetching number of rooms: ", error);
      }
    };
    fetchNumberOfRooms();
  }, []);
  


  // Updated handleHourChange function to explicitly pass hourPrice
  const handleHourChange = (hours: number) => {
    setSelectedHour(hours);
    console.log(selectedHour , "selected hour")
    setValue("hour", hours );
   
    calculateTotal(
      selectedRoomSizePrice,
      selectedNoOfRoomsPrice,
      hours,
      selectedProfessional,
      hourPrice // Pass the current hourPrice
    );
  };

  // Updated handleSelectProfessional to include hourPrice
  const handleSelectProfessional = (professional: number) => {
    setSelectedProfessional(professional);
    setValue("professional", professional);
   
    calculateTotal(
      selectedRoomPrice,
      selectedRoomCountPrice,
      selectedHour || 0,
      selectedProfessional,
      hourPrice // Pass the current hourPrice
    );
  };
  

  


 

  // Ensure room size and room count functions also pass hourPrice
  const handleRoomSizeChange = (value: string) => {
    const selectedIndex = roomSizes.indexOf(value);
    const price = parseFloat(roomPrices[selectedIndex] || 0);
    setSelectedRoomPrice(price);
    calculateTotal(
      price,
      selectedRoomSizePrice,
      selectedHour || 0,
      selectedProfessional,
      hourPrice 
    );
  };

  const handleNoOfRoomsChange = (value: string) => {
    setSelectedNoOfRooms(value);
    const selectedIndex = noOfRooms.indexOf(value);
    const price = parseFloat(roomCountsPrices[selectedIndex] || "0");
    setSelectedRoomCountPrice(price);
    calculateTotal(
      selectedNoOfRoomsPrice,
      price,
      selectedHour || 0,
      selectedProfessional ,
      hourPrice 
    );
  };

  //needed material

  const handleMaterialSelectedOption = (option: any) => {
    let price = 0; // Assume 5 for "yes"
    if (option === t("yes")) {
      price = 6;
      setMaterialSelectedOption(t("yes"));
    } else {
      price = 0;
      setMaterialSelectedOption(t("No"));
    }
    setTotalPrice((prevPrice) => prevPrice - selectedMaterialPrice + price);
    setSelectedMaterialPrice(price);
    setValue("needmaterial", matererialSelectedOption);
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
        const servicesRef = collection(db, "additionalServices"); 
        const querySnapshot = await getDocs(servicesRef); 

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

  const handleCheckboxChange = (service: string): void => {
    setSelectedServices((prevSelectedServices) => {
      const updatedServices = prevSelectedServices.includes(service)
        ? prevSelectedServices.filter((item) => item !== service)
        : [...prevSelectedServices, service];

      // Set the updated services in the form value
      setValue("Additionalservices", updatedServices);

      return updatedServices;
    });

    const servicePrice = additionalServicePrice[service] || 0;
    if (selectedServices.includes(service)) {
      // If already selected, deselect it and subtract the price
      setTotalPrice((prevPrice) => prevPrice - servicePrice); // Subtract price from total
    } else {
      // If not selected, add it and add the price
      setTotalPrice((prevPrice) => prevPrice + servicePrice); // Add price to total
    }
  };

  //set total when user change the category from cleaning to someother category

  useEffect(() => {
    if (selectedCategory !== "Cleaning and Hygiene Services") {
      // Subtract all related prices

      const additionalServicesTotal = selectedServices.reduce(
        (sum, service) => sum + (additionalServicePrice[service] || 0),
        0
      );

      setTotalPrice(
        (prevPrice) =>
          prevPrice -
          selectedRoomPrice -
          selectedRoomCountPrice -
          selectedMaterialPrice -
          additionalServicesTotal
      );

      // Reset states
      setSelectedRoomPrice(0);
      setSelectedRoomCountPrice(0);
      setSelectedMaterialPrice(0);
      setSelectedServices([]);
    }
  }, [selectedCategory]);

  setValue("total", totalPrice);

  useEffect(() => {
    const data = localStorage.getItem("tax");

    const tax = data ? JSON.parse(data) : 0;

    // Check if tax is an array
    if (Array.isArray(tax)) {
      const totalPercentage = tax
        .map((item) => Number(item.percentage))
        .reduce((sum, percentage) => sum + percentage, 0);
      const totalWithTax = Number(
        (totalPrice * (1 + totalPercentage / 100)).toFixed(1)
      );
      setValue("totalWithTax", totalWithTax);
    } else {
      console.log("No valid tax data found.");
      setValue("totalWithTax", totalPrice);
    }
  }, [totalPrice]);

 
  const totalForEdit = () => {
    let total = 0;
  
    // Check if data is available
  
    // Find and add room size rate
    const findRoomSize = allRoomSize.find(item => item.title === isEdited.roomSize);
    if (findRoomSize) {
      const roomSizeRate = Number(findRoomSize.rate) || 0;
      total += roomSizeRate;
      setPreviousRoomSizeRate(roomSizeRate);
    } else {
      console.warn('No matching room size found');
    }
  
    // Find and add room quantity price
    const findNoOfRooms = noOfRooms.find(item => item.title === isEdited.roomsQty);
    if (findNoOfRooms) {
      const roomsPrice = Number(findNoOfRooms.price) || 0;
      total += roomsPrice;
      setSelectedNoOfRoomsPrice(roomsPrice);
    } else {
      console.warn('No matching room quantity found');
    }
  
      setTotalPrice(prevPrice => prevPrice + total);
  };



  
  
 


 
  useEffect(() => {
    if (isEdited && !hasEdited) {
      const timeout = setTimeout(() => {
        setHasEdited(true);
        if (isEdited.addType === 'job') totalForEdit();
      }, 0);
      editHandler();
      return () => clearTimeout(timeout);
    }
  }, [isEdited, hasEdited]);
  

  
  

  return (
    <>
      <div className="bg-[#F5F7FA] min-h-screen w-full flex items-start justify-start relative">
        {/* <div className="flex items-center justify-center h-screen">
          <FrequencyModal />
        </div> */}

        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-6xl px-8 lg:px-16 mt-6 mb-0"
          >
            <h1 className="text-2xl font-bold mt-2">{t("AddJobs")}</h1>
            <div className="grid w-full items-center gap-1.5">
              <Controller
                name="provider"
                control={control}
                rules={{
                  required: t("ProviderRequired"),
                }}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value || selectedName} // Show correct initial value
                    onValueChange={(newValue) => {
                      setSelectedName(newValue);
                      onChange(newValue);
                      handleProviderChange(newValue);
                    }}
                  >
                    <SelectTrigger className="w-full h-[55px] rounded-lg border border-[#4BB1D3] bg-gray-50 mt-1 pr-6 outline-[#4BB1D3] focus:border-[#4BB1D3] focus:outline-none focus:border-none">
                      <SelectValue
                        placeholder={selectedName || t("Provider")}
                      />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{t("Provider")}</SelectLabel>
                        {users.map((user: any) => (
                          <SelectItem key={user.userId} value={user.fullName}>
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
                          field.value || selectedCategory || t("SelectCategory")
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
                    rules={{
                      required: (t('SubcategoryRequired')),
                    }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={selectedSubCategory}
                        onValueChange={(newValue: any) => {
                          setSelectedSubCategory(newValue);
                          onChange(newValue);
                        }}
                      >
                        <SelectTrigger className="w-full h-[55px] rounded-lg border p-4 pr-6 border-[#4BB1D3] bg-gray-50 outline-[#4BB1D3] focus:border-blue-500 focus:outline-none">
                          <SelectValue placeholder={t("Select_SubCategory")} />
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
        setSelectedRoomAreaSize(newValue);
        handleRoomSizeChange(value);
        onChange(newValue);
      }}
    >
                          <SelectTrigger className="w-full h-[55px] rounded-lg border border-[#4BB1D3] bg-gray-50 mt-1 pr-6 outline-[#4BB1D3] focus:border-[#4BB1D3] focus:outline-none focus:border-none">
                            <SelectValue  placeholder={
        selectedRoomAreaSize || t("RoomAreaSize")
      }/>
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
      value={value || selectedNoOfRooms}
      onValueChange={(newValue) => {
        onChange(newValue);
        handleNoOfRoomsChange(newValue);
      }}
    >
                          <SelectTrigger className="w-full h-[55px] rounded-lg border border-[#4BB1D3] bg-gray-50 mt-1 pr-6 outline-[#4BB1D3] focus:border-[#4BB1D3] focus:outline-none focus:border-none">
                            <SelectValue placeholder={t("NumberOfRoom") || selectedNoOfRooms} />
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
