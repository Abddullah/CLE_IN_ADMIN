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

// <span className="text-lg mb-3">September 18, 2024</span>
// </div>
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

//               <TableCell className="flex justify-around items-center h-[20px]">
//                 {index === 0 || index === 1 ? (
//                   <div className=" ml-[220px] mb-9 sm:mb-9 md:mb-9 lg:mb-9">
                   
//                     <BookingCard name="Ashar"/>
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
import clockIcon from "../../../assets/bookingsIcon/clock.svg";
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
    <div className="bg-white p-6 rounded-md">
      <div>
        <span className="text-lg mb-3">September 18, 2024</span>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Bookings</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {timeSlots.map((slot, index) => (
            <TableRow key={index}>
              <TableCell className="flex items-center gap-4 font-medium">
                <Image src={clockIcon} alt="Clock Icon" width={16} height={16} />
                <span>{slot}</span>
              </TableCell>

              <TableCell className="flex justify-end items-center gap-4">
                {index === 0 || index === 1 ? (
                  <div className="flex gap-4 items-center h-[10px]">
                    <div className="mt-0 mb-8"> {/* Set mt-0 to remove the extra gap */}
                      <BookingCard name="Ashar" />
                    </div>
                    <div className="mt-0 mb-8">
                      <BookingCard name="User 2" />
                    </div>
                    <div className="mt-0 mb-8">
                      <BookingCard name="User 3" />
                    </div>
                  </div>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
