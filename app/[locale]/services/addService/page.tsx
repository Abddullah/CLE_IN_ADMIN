"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useState } from "react";
import { Link } from "@/i18n/routing";
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
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {useTranslations} from 'next-intl';
import { useSelector } from "react-redux";
import MapComponent from "../../components/map/map";

function page() {
  

  const t = useTranslations('Services');
  const location = useSelector((state: any) => state.location); // Redux location state

  // console.log(location);

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
    setValue(`slots.${day}.checked`, !slotTimes[day].checked, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const checkedSlots = Object.entries(data.slots)
      .filter(([_, value]) => value.checked)
      .map(([day, value]) => ({
        day,
        open: value.open,
        close: value.close,
      }));

    console.log(data);
    alert("Form submitted successfully");
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
  const [provider, setProvider] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [fixRate, setFixRate] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  let [formData, setFormData] = useState<Props | any>("");

  const categories: { [key: string]: string[] } = {
    "Cleaning and Hygiene Services": [
      "Office Cleaning",
      "Room Cleaning",
      "Pest Control Service",
      "Laundry Service",
    ],
    "Home Maintenance Services": [
      "Electrician",
      "Plumber",
      "Mason/Bricklayer",
      "Carpenter",
      "Painter",
    ],
    "Installation Services": [
      "Air Conditioning Installer",
      "Alarm System Installer",
      "Solar Panel Installer",
      "Door and Window Installer",
    ],
    "Renovation Services": [
      "Architect",
      "Interior Designer",
      "Building Contractor",
      "Floor Layer",
    ],
  };

  const router = useRouter();

  const description = useRef<HTMLTextAreaElement>(null);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCategory(value);
    setSubCategories(categories[value] || []);
  };
 

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
                  <Select onValueChange={onChange} value={value}>
                    <SelectTrigger className="w-full h-[55px] rounded-lg border border-[#4BB1D3] bg-gray-50 mt-1 pr-6 outline-[#4BB1D3] focus:border-[#4BB1D3] focus:outline-none focus:border-none">
                      <SelectValue placeholder={(t('selectProvider'))} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{(t('selectProvider'))} </SelectLabel>
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

            <div className="grid w-full items-center gap-1.5 mt-3">
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
                        <SelectLabel>{(t('categories'))}</SelectLabel>
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
            </div>

              {subCategories.length > 0 && (
                <div className="grid w-full items-center gap-1.5 mt-4">
                  <label
                    className="text-md font-semibold"
                    htmlFor="subCategory"
                  >
                    Subcategory
                  </label>
                  <Controller
                    name="subcategory"
                    control={control}
                    rules={{
                      required: (t("subcategoryRequired")),
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
                          <SelectItem value="5 Euro">5 Euro</SelectItem>
                          <SelectItem value="6 Euro">6 Euro</SelectItem>
                          <SelectItem value="7 Euro">7 Euro</SelectItem>
                          <SelectItem value="8 Euro">8 Euro</SelectItem>
                          <SelectItem value="9 Euro">9 Euro</SelectItem>
                          <SelectItem value="10 Euro">10 Euro</SelectItem>
                          <SelectItem value="11 Euro">11 Euro</SelectItem>
                          <SelectItem value="12 Euro">12 Euro</SelectItem>
                          <SelectItem value="13 Euro">13 Euro</SelectItem>
                          <SelectItem value="14 Euro">14 Euro</SelectItem>
                          <SelectItem value="15 Euro">15 Euro</SelectItem>
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

            <div className="grid w-full items-center gap-1.5 mt-3">
              <p className="font-semibold">{(t('photos'))}</p>
              <div className="flex justify-between flex-wrap">
                {/* Displaying existing images */}
                <div className="w-[108px] h-[99.52px]">
                  <Image
                    src="/assets/servicesIcons/cardImage.svg"
                    alt="room-image"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="w-[108px] h-[99.52px]">
                  <Image
                    src="/assets/servicesIcons/factory.svg"
                    alt="factory-image"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="w-[108px] h-[99.52px]">
                  <Image
                    src="/assets/servicesIcons/hospital.svg"
                    alt="hospital-image"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="w-[108px] h-[99.52px]">
                  <Image
                    src="/assets/servicesIcons/cardImage.svg"
                    alt="djdj"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="w-[108px] h-[99.52px]">
                  <Image
                    src="/assets/servicesIcons/factory.svg"
                    alt="djdj"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="w-[108px] h-[99.52px]">
                  <Image
                    src="/assets/servicesIcons/office.svg"
                    alt="djdj"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="w-[108px] h-[99.52px]">
                  <Image
                    src="/assets/servicesIcons/hospital.svg"
                    alt="djdj"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="w-[108px] h-[99.52px]">
                  <Image
                    src="/assets/servicesIcons/office.svg"
                    alt="djdj"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="w-[108px] h-[99.52px]">
                  <Image
                    src="/assets/servicesIcons/cardImage.svg"
                    alt="djdj"
                    width={100}
                    height={100}
                  />
                </div>

                {/* Upload Button */}
                <div className="w-[108px] h-[99.52px] flex items-center justify-center">
                  <label
                    htmlFor="upload"
                    className="cursor-pointer w-full h-full flex justify-center items-center border-2 border-[#00BFFF] rounded-lg"
                  >
                    <span className="text-sm text-gray-600">Upload</span>
                    <input
                      id="upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                </div>
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
                render={() => (
                  <input
                    type="checkbox"
                    id={day.toLowerCase()}
                    checked={slotTimes[day].checked}
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