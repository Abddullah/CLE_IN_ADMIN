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
import {useTranslations} from 'next-intl';
import { useSelector } from "react-redux";
import MapComponent from "../../components/map/map";
import { getDocs , query , where , collection } from "firebase/firestore";
import { db } from "../../config/Firebase/FirebaseConfig";

function page() {

  

  

  const t = useTranslations('Services');
  const location = useSelector((state: any) => state.location); // Redux location state

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


  const handleProviderChange = (selectedProvider: string) => {
    // Find the selected user by userId (which is the value of the SelectItem)
    const selectedUser = providers.find((user: any) => user.userId === selectedProvider);

    if (selectedUser) {
        localStorage.setItem('servicePostId', selectedProvider);
    }
};
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
    slotTimes: object;
  }

  type FormInputs = {
    provider: string;
    category: string;
    subcategory: string;
    fixRate: string;
    description: string;
    slots: Record<string, { checked: boolean; open: string; close: string }>;
    location: { lng: number; lat: number }; 
  };

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
      slots: {
        Monday: { checked: false, open: '', close: '' },
        Tuesday: { checked: false, open: '', close: '' },
        Wednesday: { checked: false, open: '', close: '' },
        Thursday: { checked: false, open: '', close: '' },
        Friday: { checked: false, open: '', close: '' },
        Saturday: { checked: false, open: '', close: '' },
        Sunday: { checked: false, open: '', close: '' },
      },
      location:{lat:0 , lng:0}
    },
    mode: 'onChange',
  });

 


  useEffect(() => {
    if (location) {
      setValue('location', { lng: location.lng, lat: location.lat });
    }
  }, [location, setValue]);

  const slotTimes = watch('slots');
 
  const handleCheckboxChange = (day: string) => {

    
    // Get current checked state for the day
    const isChecked = slotTimes[day]?.checked;

  // Sirf jab user checkbox ko check kare ya uncheck kare tabhi set karna hai
  // Update checkbox checked state when user interacts
  if (!isChecked) {
    setValue(
      `slots.${day}.checked`,
      true, // Checkbox checked
      { shouldValidate: true }
    );
  } else {
    setValue(
      `slots.${day}.checked`,
      false, // Checkbox unchecked
      { shouldValidate: true }
    );
  }
  };
  
  
  
  

  const onSubmit: SubmitHandler<FormInputs> = (data) => {


    
    const checkedSlots = Object.entries(data.slots)
      .filter(([_, value]) => value.checked==true)
      .map(([day, value]) => ({
        day,
        open: value.open,
        close: value.close,
      }));

    console.log(data);
    localStorage.setItem("addService" , JSON.stringify(data))
    router.push('reviewService')
  };

  const getTimeError = (day: string) => {
    if (slotTimes[day].checked) {
      if (!slotTimes[day].open || !slotTimes[day].close) {
        return (t('select_Both'));
      }
    }
    return '';
  };

  const isAtLeastOneSlotChecked = Object.values(slotTimes).some(
    (slot) => slot.checked
  );

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [providers, setProviders] = useState<string[]>([]);
const [categories, setCategories] = useState<{ [key: string]: string[] }>({});  const [subCategory, setSubCategory] = useState("");
  const [fixRate, setFixRate] = useState<null|any[]>(null);
  const [descriptionValue, setDescriptionValue] = useState("");
  let [formData, setFormData] = useState<Props | any>("");
  


  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const q = query(collection(db, 'users'), where('role', '==', 'provider'));
        const querySnapshot = await getDocs(q);
        const providersList = querySnapshot.docs.map(doc => doc.data()); // assuming 'name' is a field in your Firestore document

        setProviders(providersList);
       
      } catch (error) {
        console.error('Error fetching providers:', error);
      
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


 useEffect(()=>{
  const data:any =  localStorage.getItem('fixRates')

setFixRate(JSON.parse(data));








 
 } , [])

  

 

  const description = useRef<HTMLTextAreaElement>(null);

 

  console.log(providers);
  
 

  return (
    <>
      <div className="bg-[#F5F7FA] min-h-screen w-full flex items-start justify-start relative">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg">
          <form
          onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-6xl px-8 lg:px-16 mt-6"
          >
            <h1 className="text-2xl font-bold mt-2">{(t('addServices'))}</h1>

            <div className="grid w-full items-center gap-1.5 mt-6">
      <Controller
        name="provider"
        control={control}
        rules={{
          required: (t('providerRequired')),
        }}
        render={({ field: { value, onChange } }) => (
          <Select onValueChange={(value) => {
            onChange(value);
            handleProviderChange(value); // Update the hourly rate when the provider changes
          }} value={value}>
            <SelectTrigger className="w-full h-[55px] rounded-lg border border-[#4BB1D3] bg-gray-50 mt-1 pr-6 outline-[#4BB1D3] focus:border-[#4BB1D3] focus:outline-none focus:border-none">
              <SelectValue placeholder={t('selectProvider')} />
            </SelectTrigger>
            <SelectContent>
  <SelectGroup>
    <SelectLabel>{t('selectProvider')}</SelectLabel>
    {providers.map((user: any) => (
                     <SelectItem key={user.userId} value={user.fullName}> {/* Use userId as the value */}
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
            <div className="grid w-full items-center gap-1.5 mt-6">
              <div className="w-full">
                <label className="text-md font-semibold" htmlFor="AdFixedRate">
                  {(t('adFixedRate'))}
                </label>
                <Controller
                  name="fixRate"
                  control={control}
                  rules={{
                    required: (t('fixRateRequired')),
                  }}
                  render={({ field: { value, onChange } }) => (
                    <Select value={value} onValueChange={onChange}>
                      <SelectTrigger className="w-full h-[55px] rounded-lg border border-[#4BB1D3] bg-gray-50 mt-1 pr-6 outline-[#4BB1D3] focus:border-[#4BB1D3] focus:outline-none focus:border-none">
                        <SelectValue placeholder={(t('adFixedRate'))} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>{(t('FixRate'))}</SelectLabel>
                          {
      fixRate?.map((item:any , index:any) => (
        <SelectItem key={index} value={item.rate}>{item.rate} Euro</SelectItem>
      ))

    }
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
              <p className="text-md font-semibold">{(t('description'))}</p>
              <Textarea
                {...register("description", { required: true })}
                className="w-full h-[85px] rounded-lg border-[#4BB1D3] focus:border-blue-500 focus:outline-none"
                placeholder={(t('description'))}
              />
              {errors.description && (
                <span className="text-red-600 text-sm">
                 {(t('descriptionRequired'))}
                </span>
              )}
            </div>

            <div className="grid w-full items-center gap-2 mt-3">
                          <p className="font-semibold text-lg">Photos</p>
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
                                    + Upload
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
           
            
            <div className="grid w-full items-center gap-1.5 mt-6">
  <p className="text-lg font-bold mt-2">{t('Location')}</p>

  <MapComponent/>

</div>



            

<div className="grid w-full items-center gap-1.5 mt-3">
  <h1 className="text-xl font-semibold mb-6 text-gray-800">{(t('select_time_slots'))}</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
    {Object.keys(slotTimes).map((day) => (
      <div key={day} className="flex flex-col space-y-2">
        <div className="flex items-center justify-between space-x-4 py-3 px-4 rounded-lg border border-gray-200 shadow-md">
          <Controller
            control={control}
            name={`slots.${day}.checked`}
            render={({ field }) => (
              <input
                type="checkbox"
                id={day.toLowerCase()}
                checked={field.value}
                onChange={() => handleCheckboxChange(day)}
                className="h-5 w-5 text-[#00BFFF] rounded-md focus:ring-[#00BFFF] cursor-pointer"
              />
            )}
          />
          <label
            htmlFor={day.toLowerCase()}
            className="font-semibold text-lg text-gray-700 w-1/4"
          >
            {day}
          </label>
          <div className="flex space-x-4 w-2/3 justify-end gap-1">
            <Controller
              control={control}
              name={`slots.${day}.open`}
              render={({ field }) => (
                <input
                  type="text"
                  placeholder="Open"
                  {...field}
                  className={`w-[70px] sm:w-[105px] h-[40px] rounded-lg bg-transparent focus:outline-none px-3 border-2 ${
                    slotTimes[day].checked && !field.value
                      ? 'border-red-500'
                      : 'border-[#4BB1D3]'
                  } focus:border-blue-500 placeholder-gray-400`}
                  disabled={!slotTimes[day].checked}
                />
              )}
            />
            <Controller
              control={control}
              name={`slots.${day}.close`}
              render={({ field }) => (
                <input
                  type="text"
                  placeholder="Close"
                  {...field}
                  className={`w-[70px] sm:w-[105px] h-[40px] rounded-lg bg-transparent focus:outline-none px-3 border-2 ${
                    slotTimes[day].checked && !field.value
                      ? 'border-red-500'
                      : 'border-[#4BB1D3]'
                  } focus:border-blue-500 placeholder-gray-400`}
                  disabled={!slotTimes[day].checked}
                />
              )}
            />
          </div>
        </div>
        {getTimeError(day) && (
          <p className="text-red-500 text-sm ml-4">{getTimeError(day)}</p>
        )}
      </div>
    ))}
  </div>

  {/* Error message for "Please select at least 1 day" */}
  {!isAtLeastOneSlotChecked && (
    <p className="text-red-500 mt-4 font-medium text-center">
      {(t('select_one'))}
    </p>
  )}
</div>
            <div className="mt-6 flex justify-center items-center">
              {/* <Link href={"/services/reviewService"}> */}
              <Button
                type="submit"
                className="w-[200px] h-[45px] mb-6 mt-2 text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out"
              >
                <span>{(t('next'))}</span>
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