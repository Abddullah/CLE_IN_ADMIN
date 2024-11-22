// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// interface Invoice {
//   Name: string;
//   email: string;
//   PhoneNo: string;
//   role: string;
//   address: string;
//   gender: string;
//   dateBirth: string;
// }

// const invoices: Invoice[] = [
//   {
//     Name: "John Doe",
//     email: "john.doe@example.com",
//     PhoneNo: "(123) 456-7890",
//     role: "Manager",
//     address: "123 Main St, Springfield",
//     gender: "Male",
//     dateBirth: "1985-01-15",
//   },
//   {
//     Name: "Jane Smith",
//     email: "jane.smith@example.com",
//     PhoneNo: "(987) 654-3210",
//     role: "Developer",
//     address: "456 Oak St, Metropolis",
//     gender: "Female",
//     dateBirth: "1990-06-23",
//   },{
//     Name: "Jane Smith",
//     email: "jane.smith@example.com",
//     PhoneNo: "(987) 654-3210",
//     role: "Developer",
//     address: "456 Oak St, Metropolis",
//     gender: "Female",
//     dateBirth: "1990-06-23",
//   },{
//     Name: "Jane Smith",
//     email: "jane.smith@example.com",
//     PhoneNo: "(987) 654-3210",
//     role: "Developer",
//     address: "456 Oak St, Metropolis",
//     gender: "Female",
//     dateBirth: "1990-06-23",
//   },{
//     Name: "Jane Smith",
//     email: "jane.smith@example.com",
//     PhoneNo: "(987) 654-3210",
//     role: "Developer",
//     address: "456 Oak St, Metropolis",
//     gender: "Female",
//     dateBirth: "1990-06-23",
//   },{
//     Name: "Jane Smith",
//     email: "jane.smith@example.com",
//     PhoneNo: "(987) 654-3210",
//     role: "Developer",
//     address: "456 Oak St, Metropolis",
//     gender: "Female",
//     dateBirth: "1990-06-23",
//   },
// ];

// export function TableDemo() {
//   const [showOptions, setShowOptions] = useState<number | null>(null);

//   const handleActionClick = (index: number) => {
//     setShowOptions(showOptions === index ? null : index);
//   };

//   return (
//     <div className="overflow-x-auto p-8 relative"> 
//       <Table className="min-w-full border border-gray-200 rounded-lg shadow-md">
//         <TableHeader>
//           <TableRow className="bg-gray-100">
//             <TableHead className="p-2 text-left text-xs md:text-sm lg:text-base">
//               Name
//             </TableHead>
//             <TableHead className="p-2 text-left text-xs md:text-sm lg:text-base">
//               Email Address
//             </TableHead>
//             <TableHead className="p-2 text-left text-xs md:text-sm lg:text-base hidden md:table-cell">
//               Phone Number
//             </TableHead>
//             <TableHead className="p-2 text-left text-xs md:text-sm lg:text-base hidden md:table-cell">
//               Role
//             </TableHead>
//             <TableHead className="p-2 text-left text-xs md:text-sm lg:text-base hidden lg:table-cell">
//               Address
//             </TableHead>
//             <TableHead className="p-2 text-left text-xs md:text-sm lg:text-base hidden lg:table-cell">
//               Gender
//             </TableHead>
//             <TableHead className="p-2 text-right text-xs md:text-sm lg:text-base hidden lg:table-cell">
//               Date of Birth
//             </TableHead>
//             <TableHead className="p-2 text-xs md:text-sm lg:text-base">
//               Actions
//             </TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {invoices.map((invoice, index) => (
//             <TableRow
//               key={index}
//               className="even:bg-gray-50 hover:bg-gray-100 transition-colors relative"
//             >
//               <TableCell className="p-2 font-medium text-xs md:text-sm lg:text-base">
//                 {invoice.Name}
//               </TableCell>
//               <TableCell className="p-2 text-xs md:text-sm lg:text-base">
//                 {invoice.email}
//               </TableCell>
//               <TableCell className="p-2 text-xs md:text-sm lg:text-base hidden md:table-cell">
//                 {invoice.PhoneNo}
//               </TableCell>
//               <TableCell className="p-2 text-xs md:text-sm lg:text-base hidden md:table-cell">
//                 {invoice.role}
//               </TableCell>
//               <TableCell className="p-2 text-xs md:text-sm lg:text-base hidden lg:table-cell">
//                 {invoice.address}
//               </TableCell>
//               <TableCell className="p-2 text-xs md:text-sm lg:text-base hidden lg:table-cell">
//                 {invoice.gender}
//               </TableCell>
//               <TableCell className="p-2 text-right text-xs md:text-sm lg:text-base hidden lg:table-cell">
//                 {invoice.dateBirth}
//               </TableCell>

//               <TableCell className="p-2 text-center relative">
//                 <button onClick={() => handleActionClick(index)}>
//                   <Image src="/assets/categoriesIcons/dots.svg" 
//                   width={10}
//                   height={10} 
//                   alt="Options" className="w-6 h-6 mr-2" />
//                 </button>

//                 {showOptions === index && (
//                   <div className="absolute right-14 top-[-40px] w-32 bg-white border border-gray-200 rounded-lg shadow-md z-10">
//                     <button
//                       className="flex items-center w-full p-2 hover:bg-gray-100"
//                       onClick={() => {
//                         console.log("Edit clicked");
//                         setShowOptions(null);
//                       }}
//                     >
//                       <Image
//                         src="/assets/categoriesIcons/edit.svg"
//                         width={10}
//                         height={10}
//                         alt="Edit"
//                         className="w-4 h-4 mr-2"
//                       />
//                       <span>Edit</span>
//                     </button>
//                     <button
//                       className="flex items-center w-full p-2 hover:bg-gray-100"
//                       onClick={() => {
//                         console.log("Delete clicked");
//                         setShowOptions(null);
//                       }}
//                     >
//                       <Image
//                         src="/assets/categoriesIcons/delete.svg"
//                         width={10}
//                         height={10}
//                         alt="Delete"
//                         className="w-4 h-4 mr-2"
//                       />
//                       <span>Delete</span>
//                     </button>
//                   </div>
//                 )}
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }


















// "use client";

// import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   faEllipsisV,
//   faEdit,
//   faTrashAlt,
// } from "@fortawesome/free-solid-svg-icons";


// interface Invoice {
//   Name: string;
//   email: string;
//   PhoneNo: string;
//   role: string;
//   address: string;
//   gender: string;
//   dateBirth: string;
// }

// const invoices: Invoice[] = [
//   {
//     Name: "John Doe",
//     email: "john.doe@example.com",
//     PhoneNo: "(123) 456-7890",
//     role: "Manager",
//     address: "123 Main St, Springfield",
//     gender: "Male",
//     dateBirth: "1985-01-15",
//   },
//   {
//     Name: "Jane Smith",
//     email: "jane.smith@example.com",
//     PhoneNo: "(987) 654-3210",
//     role: "Developer",
//     address: "456 Oak St, Metropolis",
//     gender: "Female",
//     dateBirth: "1990-06-23",
//   },
// ];

// export function TableDemo() {
//   const [expandedRow, setExpandedRow] = useState<number | null>(null);
//   const [activeMenu, setActiveMenu] = useState<number | null>(null);

//   const handleToggleMoreInfo = (index: number) => {
//     setExpandedRow(expandedRow === index ? null : index);
//   };

//   const toggleMenu = (index: number) => {
//     setActiveMenu(activeMenu === index ? null : index);
//   };

//   return (
//     <div className="overflow-x-auto p-8">
//       <Table className="min-w-full border border-gray-200 rounded-lg shadow-md">
//         <TableHeader>
//           <TableRow className="bg-gray-100">
//             <TableHead className="p-2 text-left text-sm">Name</TableHead>
//             <TableHead className="p-2 text-left text-sm">Email</TableHead>
//             <TableHead className="p-2 text-left text-sm hidden md:table-cell">
//               Phone No
//             </TableHead>
//             <TableHead className="p-2 text-left text-sm hidden md:table-cell">
//               Role
//             </TableHead>
//             <TableHead className="p-2 text-left text-sm hidden lg:table-cell">
//               Address
//             </TableHead>
//             <TableHead className="p-2 text-left text-sm hidden lg:table-cell">
//               Gender
//             </TableHead>
//             <TableHead className="p-2 text-right text-sm hidden lg:table-cell">
//               Date of Birth
//             </TableHead>
//             <TableHead className="p-2 text-center text-sm">Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {invoices.map((invoice, index) => (
//             <>
//               <TableRow
//                 key={index}
//                 className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
//               >
//                 <TableCell className="p-2 text-sm font-medium">
//                   {invoice.Name}
//                 </TableCell>
//                 <TableCell className="p-2 text-sm">{invoice.email}</TableCell>
//                 <TableCell className="p-2 text-sm hidden md:table-cell">
//                   {invoice.PhoneNo}
//                 </TableCell>
//                 <TableCell className="p-2 text-sm hidden md:table-cell">
//                   {invoice.role}
//                 </TableCell>
//                 <TableCell className="p-2 text-sm hidden lg:table-cell">
//                   {invoice.address}
//                 </TableCell>
//                 <TableCell className="p-2 text-sm hidden lg:table-cell">
//                   {invoice.gender}
//                 </TableCell>
//                 <TableCell className="p-2 text-sm hidden lg:table-cell">
//                   {invoice.dateBirth}
//                 </TableCell>
//                 <TableCell className="p-2 text-center relative">
//                   {/* Three-dot menu with icons */}
//                   <button
//                     className="text-gray-500 hover:text-gray-700"
//                     onClick={() => toggleMenu(index)}
//                   >
//                     <FontAwesomeIcon icon={faEllipsisV} className="w-5 h-5" /> {/* Ellipsis icon */}
//                   </button>
//                   {activeMenu === index && (
//                     <div className="absolute top-2  z-20 bg-white border border-gray-200 shadow-lg rounded-md text-sm transition-all duration-300 opacity-100 scale-100">
//                       <button
//                         className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-gray-700"
//                         onClick={() => console.log("Edit", index)}
//                       >
//                         <FontAwesomeIcon icon={faEdit} className="inline w-4 h-4 mr-2" />
//                         Edit
//                       </button>
//                       <button
//                         className="block px-4 py-2 hover:bg-gray-100 w-full text-left "
//                         onClick={() => console.log("Delete", index)}
//                       >
//                         <FontAwesomeIcon icon={faTrashAlt} className="inline w-4 h-4 mr-2" />
//                         Delete
//                       </button>
//                     </div>
//                   )}
//                   {/* Show More Info button only on mobile */}
//                   <button
//                     className="text-blue-500 hover:underline md:hidden"
//                     onClick={() => handleToggleMoreInfo(index)}
//                   >
//                     {expandedRow === index ? "Hide Info" : "More Info"}
//                   </button>
//                 </TableCell>
//               </TableRow>
//               {/* Collapsible Row for Mobile */}
//               {expandedRow === index && (
//                 <TableRow className="md:hidden">
//                   <TableCell colSpan={3} className="p-2 bg-gray-50 text-sm">
//                     <div className="flex flex-col gap-2">
//                       <div>
//                         <strong>Phone No:</strong> {invoice.PhoneNo}
//                       </div>
//                       <div>
//                         <strong>Role:</strong> {invoice.role}
//                       </div>
//                       <div>
//                         <strong>Address:</strong> {invoice.address}
//                       </div>
//                       <div>
//                         <strong>Gender:</strong> {invoice.gender}
//                       </div>
//                       <div>
//                         <strong>Date of Birth:</strong> {invoice.dateBirth}
//                       </div>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }




































"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { faEllipsisV, faEdit, faTrashAlt, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

interface Invoice {
  Name: string;
  email: string;
  PhoneNo: string;
  role: string;
  address: string;
  gender: string;
  dateBirth: string;
}

const invoices: Invoice[] = [
  {
    Name: "John Doe",
    email: "john.doe@example.com",
    PhoneNo: "(123) 456-7890",
    role: "Manager",
    address: "123 Main St, Springfield",
    gender: "Male",
    dateBirth: "1985-01-15",
  },
  {
    Name: "Jane Smith",
    email: "jane.smith@example.com",
    PhoneNo: "(987) 654-3210",
    role: "Developer",
    address: "456 Oak St, Metropolis",
    gender: "Female",
    dateBirth: "1990-06-23",
  },
];

export function TableDemo() {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [openEditDelete, setOpenEditDelete] = useState<number | null>(null);

  const handleToggleMoreInfo = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className="overflow-x-auto p-8">
      <Table className="min-w-full border border-gray-200 rounded-lg">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="p-2 text-left text-sm">Name</TableHead>
            <TableHead className="p-2 text-left text-sm">Email</TableHead>
            <TableHead className="p-2 text-left text-sm hidden md:table-cell">
              Phone No
            </TableHead>
            <TableHead className="p-2 text-left text-sm hidden md:table-cell">
              Role
            </TableHead>
            <TableHead className="p-2 text-left text-sm hidden lg:table-cell">
              Address
            </TableHead>
            <TableHead className="p-2 text-left text-sm hidden lg:table-cell">
              Gender
            </TableHead>
            <TableHead className="p-2 text-right text-sm hidden lg:table-cell">
              Date of Birth
            </TableHead>
            <TableHead className="p-2 text-center text-sm">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice, index) => (
            <>
              <TableRow
                key={index}
                className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <TableCell className="p-2 text-sm font-medium">
                  {invoice.Name}
                </TableCell>
                <TableCell className="p-2 text-sm">{invoice.email}</TableCell>
                <TableCell className="p-2 text-sm hidden md:table-cell">
                  {invoice.PhoneNo}
                </TableCell>
                <TableCell className="p-2 text-sm hidden md:table-cell">
                  {invoice.role}
                </TableCell>
                <TableCell className="p-2 text-sm hidden lg:table-cell">
                  {invoice.address}
                </TableCell>
                <TableCell className="p-2 text-sm hidden lg:table-cell">
                  {invoice.gender}
                </TableCell>
                <TableCell className="p-2 text-sm hidden lg:table-cell">
                  {invoice.dateBirth}
                </TableCell>
                <TableCell className="p-2 text-center relative">
                  <div className="flex items-center justify-center gap-2">
                    {/* Edit/Delete Actions */}
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() =>
                        setOpenEditDelete(openEditDelete === index ? null : index)
                      }
                    >
                      <FontAwesomeIcon icon={faEllipsisV} className="w-5 h-5" />
                    </button>
                    {openEditDelete === index && (
                      <div className="absolute w-36 bg-white border  border-gray-200 rounded-lg shadow-md z-20">
                        <button
                          className="flex items-center w-full p-2 hover:bg-gray-100"
                          onClick={() => {
                            console.log("Edit clicked");
                            setOpenEditDelete(null);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faEdit}
                            className="w-4 h-4 mr-2"
                          />
                          <span>Edit</span>
                        </button>
                        <button
                          className="flex items-center w-full p-2 hover:bg-gray-100"
                          onClick={() => {
                            console.log("Delete clicked");
                            setOpenEditDelete(null);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            className="w-4 h-4 mr-2"
                          />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                    {/* More Info Button */}
                    <button
                      className="text-blue-500 hover:text-blue-700 block md:hidden"
                      onClick={() => handleToggleMoreInfo(index)}
                    >
                      <FontAwesomeIcon
                        icon={faInfoCircle}
                        className="w-5 h-5"
                      />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
              {expandedRow === index && (
                <TableRow className="md:hidden">
                  <TableCell colSpan={8} className="p-2 bg-gray-50 text-sm">
                    <div className="flex flex-col gap-2">
                      <div>
                        <strong>Phone No:</strong> {invoice.PhoneNo}
                      </div>
                      <div>
                        <strong>Role:</strong> {invoice.role}
                      </div>
                      <div>
                        <strong>Address:</strong> {invoice.address}
                      </div>
                      <div>
                        <strong>Gender:</strong> {invoice.gender}
                      </div>
                      <div>
                        <strong>Date of Birth:</strong> {invoice.dateBirth}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}










































