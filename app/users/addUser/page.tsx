"use client";

import React from "react";
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

function AddUserPage() {
  enum UserRole {
    PROVIDER = "Provider",
    USER = "User",
  }

  type FormInputs = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    roleRequired: string;
    role: UserRole;
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data);

  const password = watch("password");

  return (
    <div className="bg-[#F5F7FA] min-h-screen w-full flex items-start justify-start">
      <div className="w-full max-w-md px-4 sm:px-8 md:px-12 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
            <Label htmlFor="username" className="text-lg font-semibold">
              Name
            </Label>
            <Input
              type="text"
              placeholder="Username"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 8,
                  message: "Username must be at least 3 characters",
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
              Email Address
            </Label>
            <Input
              type="email"
              placeholder="Email Address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
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
              Password
            </Label>
            <Input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
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
              Confirm Password
            </Label>
            <Input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
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
            <label className="text-md font-semibold" htmlFor="role">
              Role
            </label>

            <Controller
              name="role"
              control={control}
              rules={{
                required: "Role is required",
              }}
              render={({ field: { value, onChange } }) => (
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger className="w-full h-[55px] rounded-lg border border-[#4BB1D3] bg-gray-50 mt-1 pr-6 outline-[#4BB1D3] focus:border-[#4BB1D3] focus:outline-none">
                    <SelectValue placeholder="Please Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="User">User</SelectItem>
                      <SelectItem value="Provider">Provider</SelectItem>
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
              className="border-[#4BB1D3] mb-4 w-full h-[40px] mt-5 text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out sm:w-[100px] sm:h-[45px]"
            >
              Add User
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUserPage;
