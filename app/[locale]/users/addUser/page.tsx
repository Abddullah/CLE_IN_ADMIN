"use client";

import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useTranslations } from "next-intl";
import { auth , db } from "../../config/Firebase/FirebaseConfig"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useRouter } from "@/i18n/routing";

function AddUserPage() {
  const t = useTranslations("Users");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  enum UserRole {
    PROVIDER = "Provider",
    USER = "User",
  }
  enum UserGender {
    MALE = "Male",
    FEMALE = "Female",
  }

  type FormInputs = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    address: string;
    phone: string;
    roleRequired: string;
    role: UserRole;
    gender: UserGender;
    dob: string;
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<FormInputs>();

const router = useRouter()
const path = usePathname();



  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user; // Get the user object containing the UID
  
      // Add user data to Firestore with user UID as the document ID
      await setDoc(doc(db, "users", user.uid), {
        fullName: data.username,
        email: data.email,
        address: data.address,
        phone: data.phone,
        role: data.role,
        gender: data.gender,
        dob: data.dob,
        userId:user.uid,
        createdAt: serverTimestamp(), // Set the creation timestamp
      });
      reset()
      setIsSuccessModalOpen(true)

      setTimeout(() =>{
        router.push('/users')
      },3000)
  
      
    
    } catch (error) {
      
      setIsErrorModalOpen(true)
    }
  };
  const password = watch("password");

  return (
    <div className="bg-[#F5F7FA] min-h-screen w-full flex items-start justify-start relative">
      <div className="w-full max-w-md px-4 sm:px-8 md:px-12 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
            <Label htmlFor="username" className="text-lg font-semibold">
              {t("name")}
            </Label>
            <Input
              type="text"
              placeholder={t("username_placeholder")}
              {...register("username", {
                required: t("username_required_error"),
                minLength: {
                  value: 8,
                  message: t("username_min_length_error"),
                },
              })}
              className="h-[50px] rounded-lg border-[#4BB1D3] focus:border-blue-500 focus:outline-none"
              id="username"
            />
            {errors.username && (
              <span className="text-red-600 text-sm">
                {errors.username.message}
              </span>
            )}
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
            <Label className="text-md font-semibold" htmlFor="email">
              {t("emailAdress")}
            </Label>
            <Input
              type="email"
              placeholder={t("email_placeholder")}
              {...register("email", {
                required: t("email_required_error"),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t("email_pattern_error"),
                },
              })}
              className="h-[50px] rounded-lg border-[#4BB1D3] focus:border-blue-500 focus:outline-none"
              id="email"
            />
            {errors.email && (
              <span className="text-red-600 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
            <Label className="text-md font-semibold" htmlFor="password">
              {t("password")}
            </Label>
            <Input
              type="password"
              placeholder={t("password_placeholder")}
              {...register("password", {
                required: t("password_required_error"),
                minLength: {
                  value: 6,
                  message: t("password_min_length_error"),
                },
              })}
              className="h-[50px] rounded-lg border-[#4BB1D3] focus:border-blue-500 focus:outline-none"
              id="password"
            />
            {errors.password && (
              <span className="text-red-600 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
            <Label className="text-md font-semibold" htmlFor="confirmPassword">
              {t("confirm_password")}
            </Label>
            <Input
              type="password"
              placeholder={t("confirm_password_placeholder")}
              {...register("confirmPassword", {
                required: t("confirm_password_required_error"),
                validate: (value) =>
                  value === password || t("confirm_password_validate_error"),
              })}
              className="h-[50px] rounded-lg border-[#4BB1D3] focus:border-blue-500 focus:outline-none"
              id="confirmPassword"
            />
            {errors.confirmPassword && (
              <span className="text-red-600 text-sm">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
            <Label htmlFor="address" className="text-md font-semibold">
              {t("address")}
            </Label>
            <Input
              type="text"
              placeholder={t("address")}
              {...register("address", { required: t("address_required_error") })}
              className="h-[50px] rounded-lg border-[#4BB1D3] focus:border-blue-500 focus:outline-none"
              id="address"
            />
            {errors.address && (
              <span className="text-red-600 text-sm">{errors.address.message}</span>
            )}
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
            <Label htmlFor="dob" className="text-md font-semibold">
              {t("dob_placeholder")}
            </Label>

            <Controller
              name="dob"
              defaultValue=""
              control={control}
              rules={{
                required: t("dob_required_error"),
              }}
              render={({ field: { value, onChange } }) => (
               
                
                
                <input
                  type="date"
                  name="dateBirth"
                  value={value || ""}
                  onChange={onChange}
                  className="w-full px-4 py-2 mt-1 bg-gray-50 rounded-md border border-[#4BB1D3]"/>
              
              
              )}
            />
            {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>}
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
            <Label htmlFor="phoneNo" className="text-md font-semibold">
              {t("phoneNo")}
            </Label>
            <Input
              type="tel"
              placeholder={t("phoneNo")}
              {...register("phone", {
                required: t("phone_required_error"),
                pattern: {
                  value: /^(\+39)?\s?\d{2,4}\s?\d{5,10}$/,
                  message: t("phone_pattern_error"),
                },
              })}
              className="h-[50px] rounded-lg border-[#4BB1D3] focus:border-blue-500 focus:outline-none"
              id="phoneNo"
            />
            {errors.phone && (
              <span className="text-red-600 text-sm">{errors.phone.message}</span>
            )}
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
            <Label htmlFor="gender" className="text-md font-semibold">
              {t("gender")}
            </Label>

            <Controller
              name="gender"
              control={control}
              rules={{
                required: t("gender_required_error"),
              }}
              render={({ field: { value, onChange } }) => (
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger className="w-full h-[55px] rounded-lg border border-[#4BB1D3] bg-gray-50 mt-1 pr-6 outline-[#4BB1D3] focus:border-[#4BB1D3] focus:outline-none">
                    <SelectValue placeholder={t("gender_placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Male">{t("male")}</SelectItem>
                      <SelectItem value="Female">{t("female")}</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
            )}
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
            <Label htmlFor="role" className="text-md font-semibold">
              {t("role")}
            </Label>

            <Controller
              name="role"
              control={control}
              rules={{
                required: t("role_required_error"),
              }}
              render={({ field: { value, onChange } }) => (
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger className="w-full h-[55px] rounded-lg border border-[#4BB1D3] bg-gray-50 mt-1 pr-6 outline-[#4BB1D3] focus:border-[#4BB1D3] focus:outline-none">
                    <SelectValue placeholder={t("role_placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="User">{t("user_role_user")}</SelectItem>
                      <SelectItem value="Provider">{t("user_role_provider")}</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              className="border-[#4BB1D3] mb-4 w-full h-[40px] mt-5 text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out sm:w-[120px] sm:h-[45px]"
            >
              {t("add_user_button")}
            </Button>
          </div>
        </form>
      </div>

      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-sm w-full">
            <h2 className="text-2xl font-semibold text-green-600">Success!</h2>
            <p className="mt-2">User has been created successfully in the system.</p>
            <div className="mt-4 flex justify-end">
              <Button
                onClick={() => {
                  setIsSuccessModalOpen(false)
                  router.push('/users')
                }}
                className="bg-green-500 text-white hover:bg-green-400"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {isErrorModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-sm w-full">
            <h2 className="text-2xl font-semibold text-red-600">Error Occured!</h2>
            <p className="mt-2">This User already exist in the system.</p>
            <div className="mt-4 flex justify-end">
              <Button
                onClick={() => setIsErrorModalOpen(false)}
                className="bg-red-500 text-white hover:bg-red-600"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddUserPage;
