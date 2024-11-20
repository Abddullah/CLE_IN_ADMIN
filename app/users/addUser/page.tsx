'use client'

import React, { useRef, useState , useEffect} from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



function page() {

  let [data , setData] = useState({});
  let [userName , setUserName] = useState("");
  let [email , setEmail] = useState("");
  let [role , setRole] = useState("");

  const nameValue = useRef<HTMLInputElement>(null);
  const emailValue = useRef<HTMLInputElement>(null);
  
  

  const handleUserName =() => {
    if(nameValue.current){
      setUserName(nameValue.current.value)
      return
    }
  }

  const handleEmail =() => {
    if(emailValue.current){
      setEmail(emailValue.current.value)
      return
    }
  }

  const handleRole = (value: string) => {
    setRole(value);
  };


const handleData = ()=> {

  if(!email || !userName || !role){
    alert("Please fill all fields")
  }else{
    data = {
      userName:userName,
      email:email,
      role:role
    }
  
    setData({...data})
  
    console.log(data);
    
  }
  
  
}

  

  return (
    <>
    
    <div className="bg-[#F5F7FA] min-h-screen w-full flex items-start justify-start pt-8">
        <div className="w-full max-w-md px-4 sm:px-8 md:px-12 lg:px-16">
          <h1 className="text-2xl font-bold mt-2">Add Users</h1>

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
            <Label htmlFor="name" className="text-lg font-semibold">
              Name
            </Label>
            <Input
              type="text" placeholder="Username"
              className="h-[50px] rounded-lg border-[#4BB1D3] focus:border-blue-500 focus:outline-none"
              id="Name" ref={nameValue} onChange={handleUserName}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
            <Label className="text-md font-semibold" htmlFor="email">
              Email Address
            </Label>
            <Input
              type="email"
              placeholder="Email Address "
              className="h-[50px] rounded-lg border-[#4BB1D3] focus:border-blue-500 focus:outline-none"
              id="email" ref={emailValue} onChange={handleEmail}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
            <Label className="text-md font-semibold" htmlFor="password">
              Password
            </Label>
            <Input
              type="password"
              placeholder="Password"
              className="h-[50px] rounded-lg border-[#4BB1D3] focus:border-blue-500 focus:outline-none"
              id="password"
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
            <Label className="text-md font-semibold" htmlFor="confirmPassword">
              Confirm Password
            </Label>
            <Input
              type="password"
              placeholder="Confirm Password"
              className="h-[50px] rounded-lg border-[#4BB1D3] focus:border-blue-500 focus:outline-none"
              id="confirmPassword"
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
            <Label className="text-md font-semibold" htmlFor="role">
              Role
            </Label>
            {/* <Input
              type="text"
              className="h-[50px] rounded-lg border-[#4BB1D3] focus:border-blue-500 focus:outline-none"
              id="role" ref={roleValue} onChange={handleRole}
            /> */}

<Select required onValueChange={handleRole} value={role}  >
              <SelectTrigger className="w-full h-[55px] rounded-lg border border-[#4BB1D3] bg-gray-50 mt-1 pr-6 outline-[#4BB1D3] focus:border-[#4BB1D3] focus:outline-none focus:border-none">
                <SelectValue placeholder="Please Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="User">User</SelectItem>
                  <SelectItem value="Provider">Provider</SelectItem>
                  
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-6">
            <Button onClick={handleData} className="border-[#4BB1D3] w-full h-[40px] mt-5 text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00A0E0] transition duration-200 ease-in-out sm:w-[100px] sm:h-[45px]">
              <span>Add User</span>
            </Button>
          </div>
        </div>
      </div>
   
   
     
    </>
  );
}

export default page;
