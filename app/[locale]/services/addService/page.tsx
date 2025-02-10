"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useState } from "react";
import { Link, useRouter } from "@/i18n/routing";
import map from "../../../assets/bookingsIcon/map.svg";
import { useRef } from "react";
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
import { useSelector } from "react-redux";
import MapComponent from "../../components/map/map";
import { getDocs, query, where, collection } from "firebase/firestore";
import { db } from "../../config/Firebase/FirebaseConfig";

function page() {
  const t = useTranslations("Services");
  const location = useSelector((state: any) => state.location); 
  const router = useRouter();
  const [images, setImages] = useState<(string | null)[]>(Array(6).fill(null));

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


  const [selectedUserId, setSelectedUserId] = useState(null); 




  // const handleProviderChange = (selectedProvider: string) => {
  //   // Find the selected user by userId (which is the value of the SelectItem)
  //   const selectedUser = providers.find(
  //     (user: any) => user.userId === selectedProvider
  //   );

  //   if (selectedUser) {
  //     localStorage.setItem("servicePostId", selectedProvider);
  //   }
  //   console.log(selectedProvider);
    
  // };

  const handleProviderChange = (value:any) => {
    const selectedProvider = providers.find((user:any) => user.fullName === value);
    if (selectedProvider) {
      setSelectedUserId(selectedProvider.userId); // Set the userId in state
      
    }
    localStorage.setItem("servicePostId", selectedUserId);
  };
  
  console.log(selectedUserId);
  const handleRemoveImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages[index] = null; // Remove the selected image
    setImages(updatedImages); // Update the state
  };

  

  interface Props {
    provider: string;
    category: string;
    subCategory: string;
    fixRate: string;
    descriptionValue: string;
    totalWithTax: number;
    days:any[];
  }

  type FormInputs = {
    provider: string;
    category: string;
    subcategory: string;
    fixRate: string;
    description: string;
    location: { lng: number; lat: number };
    totalWithTax: number;
    days: any[];
  };


  type Day = {
    day: string;
    isChecked: boolean;
    openingTime: string;
    closingTime: string;
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
    setError,
  } = useForm<FormInputs>({
    defaultValues: {
      location: { lat: 0, lng: 0 },
      days: [],
    },
    mode: "onChange",
  });

  const days = watch("days"); 
  

  const allDays = [
    { day: "Monday", openingTime: "", closingTime: "" },
    { day: "Tuesday", openingTime: "", closingTime: "" },
    { day: "Wednesday", openingTime: "", closingTime: "" },
    { day: "Thursday", openingTime: "", closingTime: "" },
    { day: "Friday", openingTime: "", closingTime: "" },
    { day: "Saturday", openingTime: "", closingTime: "" },
    { day: "Sunday", openingTime: "", closingTime: "" },
  ];

  // Watch selected days
  const selectedDays = watch("days");

  // Handle form submission
  
  
  useEffect(() => {
    if (location) {
      setValue("location", { lng: location.lng, lat: location.lat });
    }
  }, [location, setValue]);

  //testing the checkbox functionality



  
 
 

  

  const onSubmit: SubmitHandler<FormInputs> = (data) => {

    clearErrors();

    // Check if at least one day is checked
    const hasCheckedDay = data.days.some((d) => d.isChecked);
    if (!hasCheckedDay) {
      setError("days", {
        type: "manual",
        message: (t('select_one')),
      });
      return;
    }

    // Check for invalid time ranges
    const invalidDay = data.days.find(
      (d) =>
        d.isChecked &&
        new Date(`1970-01-01T${d.closingTime}:00`) <= new Date(`1970-01-01T${d.openingTime}:00`)
    );

    if (invalidDay) {
      setError("days", {
        type: "manual",
        message: `Invalid time range for ${invalidDay.day}. Closing time must be after opening time.`,
      });
      return;
    }

    
    console.log("Selected Days:", data.days.filter((d) => d.isChecked));
    


   
    console.log("data", data);
    localStorage.setItem("addService", JSON.stringify(data));
    router.push("reviewService");
  };

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [providers, setProviders] = useState<string[] | any>([]);
  const [categories, setCategories] = useState<{ [key: string]: string[] }>({});
  const [subCategory, setSubCategory] = useState("");
  const [fixRate, setFixRate] = useState<null | any[]>(null);
  const [descriptionValue, setDescriptionValue] = useState("");
  let [formData, setFormData] = useState<Props | any>("");
  const [editData , setEditData]= useState()

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("role", "==", "provider")
        );
        const querySnapshot = await getDocs(q);
        const providersList = querySnapshot.docs.map((doc) => doc.data()); 

        setProviders(providersList);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    fetchProviders();
  }, []);

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

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  useEffect(() => {
    const data: any = localStorage.getItem("fixRates");

    setFixRate(JSON.parse(data));
  }, []);

  const description = useRef<HTMLTextAreaElement>(null);

  const selectedRate = watch("fixRate");
const selectedRateValue = selectedRate ? selectedRate : 0;




//get edit data from local storage in the state

  useEffect(() => {
    const data = localStorage.getItem("editService");
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        setEditData(parsedData[0]);
        console.log(editData  , 'checks the edited data state')
      } catch (error) {
        console.error("Invalid JSON data:", error);
      }
    }
  }, [setEditData]);
 


useEffect(()=>{
    if(editData){
    //   setSelectedCategory((editData as any).
    // category
    // )
    // setDescriptionValue(  (editData as any).description)

    console.log((editData as any).
    category)
    setSelectedCategory((editData as any).
    category
    )


    }
   

} , [setEditData])


  useEffect(() => {
      const data = localStorage.getItem("tax");
  
      const tax = data ? JSON.parse(data) : 0;
  
  
  
      // Check if tax is an array
      if (Array.isArray(tax)) {
        const totalPercentage = tax
          .map((item) => Number(item.percentage))
          .reduce((sum, percentage) => sum + percentage, 0);
        const totalWithTaxRate = Number(
          (
            Number(selectedRateValue) *
            (1 + totalPercentage / 100)
          ).toFixed(1)
        );
        setValue("totalWithTax" , totalWithTaxRate);
        console.log(totalWithTaxRate);
        
       
      } else {
        console.log("No valid tax data found.");
        setValue('totalWithTax' , Number(selectedRateValue))
      }
    }, [Number(selectedRateValue)]);

    

  

  

  

  return (
    <>
      <div className="bg-[#F5F7FA] min-h-screen w-full flex items-start justify-start relative">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-6xl px-8 lg:px-16 mt-6"
          >
            <h1 className="text-2xl font-bold mt-2">{t("addServices")}</h1>

            <div className="grid w-full items-center gap-1.5 mt-6">
      <Controller
        name="provider"
        control={control}
        rules={{
          required: t("providerRequired"),
        }}
        render={({ field: { value, onChange } }) => (
          <Select
            onValueChange={(value) => {
              onChange(value);
              handleProviderChange(value); // Set the userId when provider changes
            }}
            value={value}
          >
            <SelectTrigger className="w-full h-[55px] rounded-lg border border-[#4BB1D3] bg-gray-50 mt-1 pr-6 outline-[#4BB1D3] focus:border-[#4BB1D3] focus:outline-none focus:border-none">
              <SelectValue placeholder={t("selectProvider")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{t("selectProvider")}</SelectLabel>
                {providers.map((user: any) => (
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
            <div className="grid w-full items-center gap-1.5 mt-3">
              <p className="text-xl font-semibold mt-6 mb-4">{(t('selectCategory'))}</p>
              <label className="text-md font-semibold" htmlFor="category">
                {(t('category'))}
              </label>
              <Controller
                name="category"
                control={control}
                rules={{
                  required: (t('categoryRequired')),
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
                      <SelectValue placeholder={(t('selectCategory'))} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{t('categories')}</SelectLabel>
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
                    {(t('SubCategories'))}
                  </label>
                  <Controller
                    name="subcategory"
                    control={control}
                    rules={{
                      required: (t('subcategoryRequired')),
                    }}
                    render={({ field: { value, onChange } }) => (
                      <Select value={value} onValueChange={onChange}>
                        <SelectTrigger className="w-full h-[55px] rounded-lg border p-4 pr-6 border-[#4BB1D3] bg-gray-50 outline-[#4BB1D3] focus:border-blue-500 focus:outline-none">
                          <SelectValue placeholder={(t('selectSubCategory'))} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>{(t('SubCategories'))}</SelectLabel>
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
            <div className="grid w-full items-center gap-1.5 mt-6">
              <div className="w-full">
                <label className="text-md font-semibold" htmlFor="AdFixedRate">
                  {t("adFixedRate")}
                </label>
                <Controller
                  name="fixRate"
                  control={control}
                  rules={{
                    required: t("fixRateRequired"),
                  }}
                  render={({ field: { value, onChange } }) => (
                    <Select value={value} onValueChange={onChange}>
                      <SelectTrigger className="w-full h-[55px] rounded-lg border border-[#4BB1D3] bg-gray-50 mt-1 pr-6 outline-[#4BB1D3] focus:border-[#4BB1D3] focus:outline-none focus:border-none">
                        <SelectValue placeholder={t("adFixedRate")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>{t("FixRate")}</SelectLabel>
                          {fixRate?.map((item: any, index: any) => (
                            <SelectItem key={index} value={item.rate}>
                              {item.rate} Euro
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.fixRate && (
                  <p className="text-red-500 mt-2 text-sm">
                    {errors.fixRate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid w-full items-center gap-1.5 mt-3">
              <p className="text-md font-semibold">{t("description")}</p>
              <Textarea
                {...register("description", { required: true })}
                className="w-full h-[85px] rounded-lg border-[#4BB1D3] focus:border-blue-500 focus:outline-none"
                placeholder={t("description")}
              />
              {errors.description && (
                <span className="text-red-600 text-sm">
                  {t("descriptionRequired")}
                </span>
              )}
            </div>

            <div className="grid w-full items-center gap-2 mt-3">
              <p className="font-semibold text-lg">{(t('photos'))}</p>
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
                        + {(t('upload'))}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid w-full items-center gap-1.5 mt-6">
              <p className="text-lg font-bold mt-2">{t("Location")}</p>

              <MapComponent />
            </div>

            {/* <div className="grid w-full items-center gap-1.5 mt-3">
  
</div> */}
<div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg mt-6">

<h1 className="text-2xl font-bold text-gray-800 mb-6">{(t('select_time_slots'))}</h1>

{allDays.map((day) => {
  const existingDay = selectedDays.find((d) => d.day === day.day);

  return (
    <Controller
      key={day.day}
      name={`days.${day.day}`}
      control={control}
      render={() => (
        <div className="flex flex-col md:flex-row justify-between items-center border-b py-4">
          {/* Checkbox */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={!!existingDay?.isChecked}
              onChange={() => {
                const updatedDays = existingDay
                  ? selectedDays.map((d) =>
                      d.day === day.day
                        ? { ...d, isChecked: !d.isChecked }
                        : d
                    )
                  : [...selectedDays, { ...day, isChecked: true }];
                setValue("days", updatedDays);
                clearErrors("days");
              }}
              className="w-5 h-5 text-[#00BFFF] border-gray-300 rounded"
            />
            <span className="text-gray-800 font-medium">{day.day}</span>
          </div>

          {/* Time Fields */}
          {existingDay?.isChecked && (
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mt-4 md:mt-0">
              {/* Opening Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {(t('opening_Time'))}
                </label>
                <input
                  type="time"
                  value={existingDay.openingTime}
                  onChange={(e) =>
                    setValue(
                      "days",
                      selectedDays.map((d) =>
                        d.day === day.day
                          ? { ...d, openingTime: e.target.value }
                          : d
                      )
                    )
                  }
                  required
                  className={`w-28 px-3 py-2 border ${
                    errors.days?.message && "border-red-500"
                  } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              {/* Closing Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                {(t('closing_Time'))}
                </label>
                <input
                  type="time"
                  value={existingDay.closingTime}
                  onChange={(e) =>
                    setValue(
                      "days",
                      selectedDays.map((d) =>
                        d.day === day.day
                          ? { ...d, closingTime: e.target.value }
                          : d
                      )
                    )
                  }
                  required
                  className={`w-28 px-3 py-2 border ${
                    errors.days?.message && "border-red-500"
                  } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>
          )}
        </div>
      )}
    />
  );
})}


      {/* Display Error Messages */}
      {errors.days && (
        <div className="text-red-500 text-sm mt-4">
          {errors.days.message}
        </div>
      )}

      {/* Submit Button */}
    

{/* Submit Button */}


       
      </div>


            <div className="mt-6 flex justify-center items-center">
              {/* <Link href={"/services/reviewService"}> */}
              <Button
                type="submit"
                className="w-[200px] h-[45px] mb-6 mt-2 text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out"
              >
                <span>{t("next")}</span>
              </Button>
              {/* </Link> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default page;
