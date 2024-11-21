// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import Image from "next/image";
// import clockIcon from "../../../assets/bookingsIcon/clock.svg";
// import BookingCard from "./UserDetails";

// const timeSlots = [
//   "8:00 am to 10:00 am",
//   "10:00 am to 12:00 am",
//   "12:00 am to 2:00 pm",
//   "2:00 pm to 4:00 pm",
//   "4:00 pm to 6:00 pm",
//   "6:00 pm to 8:00 pm",
//   "8:00 pm to 10:00 pm",
//   "10:00 am to 12:00 pm",
//   "12:00 am to 2:00 pm",
//   "2:00 am to 4:00 pm",
//   "4:00 am to 6:00 pm",
//   "6:00 am to 8:00 pm",
// ];

// export function BookingTable() {
//   return (
//     <div className="bg-white p-6 rounded-md">
//       <div>
//         <span className="text-lg mb-3">September 18, 2024</span>
//       </div>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Bookings</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {timeSlots.map((slot, index) => (
//             <TableRow key={index}>
//               <TableCell className="flex items-center gap-4 font-medium">
//                 <Image
//                   src={clockIcon}
//                   alt="Clock Icon"
//                   width={16}
//                   height={16}
//                 />
//                 <span>{slot}</span>
//               </TableCell>

//               <TableCell className="flex justify-end items-center gap-4">
//                 {index === 0 || index === 1 ? (
//                   <div className="flex gap-4 items-center h-[10px]">
//                     <div className="mt-0 mb-8">
//                       {" "}
//                       {/* Set mt-0 to remove the extra gap */}
//                       <BookingCard name="Ashar" />
//                     </div>
//                     <div className="mt-0 mb-8">
//                       <BookingCard name="User 2" />
//                     </div>
//                     <div className="mt-0 mb-8">
//                       <BookingCard name="User 3" />
//                     </div>
//                   </div>
//                 ) : null}
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }








































// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import Image from "next/image";
// import clockIcon from "../../../assets/bookingsIcon/clock.svg";
// import BookingCard from "./UserDetails";

// const timeSlots = [
//   "8:00 am to 10:00 am",
//   "10:00 am to 12:00 am",
//   "12:00 am to 2:00 pm",
//   "2:00 pm to 4:00 pm",
//   "4:00 pm to 6:00 pm",
//   "6:00 pm to 8:00 pm",
//   "8:00 pm to 10:00 pm",
//   "10:00 am to 12:00 pm",
//   "12:00 am to 2:00 pm",
//   "2:00 am to 4:00 pm",
//   "4:00 am to 6:00 pm",
//   "6:00 am to 8:00 pm",
// ];

// export function BookingTable() {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-xl max-w-full overflow-x-auto">
//       <div className="mb-6">
//         <span className="text-2xl font-semibold text-gray-800">September 18, 2024</span>
//       </div>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="text-left text-lg font-medium text-gray-700">
//               Bookings
//             </TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {timeSlots.map((slot, index) => (
//             <TableRow
//               key={index}
//               className="transition-all duration-300 hover:bg-gray-50 border-b border-gray-200"
//             >
//               <TableCell className="flex items-center gap-4 text-sm font-medium text-gray-700 py-4">
//                 <Image src={clockIcon} alt="Clock Icon" width={20} height={20} />
//                 <span>{slot}</span>
//               </TableCell>

//               <TableCell className="flex justify-end items-center gap-4">
//                 {index === 0 || index === 1 ? (
//                   <div className="flex gap-4 flex-wrap justify-center sm:justify-end">
//                     {/* Booking Cards Layout */}
//                     <div className="w-full sm:w-[calc(50%-16px)] md:w-[calc(33.3333%-16px)]">
//                       <BookingCard name="Ashar" />
//                     </div>
//                     <div className="w-full sm:w-[calc(50%-16px)] md:w-[calc(33.3333%-16px)]">
//                       <BookingCard name="User 2" />
//                     </div>
//                     <div className="w-full sm:w-[calc(50%-16px)] md:w-[calc(33.3333%-16px)]">
//                       <BookingCard name="User 3" />
//                     </div>
//                   </div>
//                 ) : null}
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }

































import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import BookingCard from "./UserDetails";

const timeSlots = [
  "8:00 am to 10:00 am",
  "10:00 am to 12:00 am",
  "12:00 am to 2:00 pm",
  "2:00 pm to 4:00 pm",
  "4:00 pm to 6:00 pm",
  "6:00 pm to 8:00 pm",
  "8:00 pm to 10:00 pm",
  "10:00 am to 12:00 pm",
  "12:00 am to 2:00 pm",
  "2:00 am to 4:00 pm",
  "4:00 am to 6:00 pm",
  "6:00 am to 8:00 pm",
];

export function BookingTable() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-full overflow-x-auto">
      <div className="mb-4">
        <span className="text-2xl font-semibold text-gray-800">September 18, 2024</span>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left text-base font-semibold text-gray-600">
              Bookings
            </TableHead>
            <TableHead className="text-left text-base font-semibold text-gray-600">
              User Bookings
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {timeSlots.map((slot, index) => (
            <TableRow
              key={index}
              className="transition-all duration-300 hover:bg-gray-50 border-b border-gray-200"
            >
              <TableCell className="flex items-center gap-4 text-sm text-gray-700 py-3">
                <Image src="/assets/bookingsIcon/clock.svg" alt="Clock Icon" width={20} height={20} />
                <span>{slot}</span>
              </TableCell>

              {/* Align the booking cards to the top and right */}
              <TableCell className="flex flex-col items-end">
                {index === 0 || index === 1 ? (
                  <div className="flex flex-wrap gap-4">
                    <BookingCard name="User 1" />
                    <BookingCard name="User 2" />
                    <BookingCard name="User 3" />
                  </div>
                ) : (
                  <span className="text-gray-400">No bookings yet</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}











