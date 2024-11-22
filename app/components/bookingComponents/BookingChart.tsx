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
    <div className="w-full max-w-screen-3xl flex flex-col items-start gap-6 mb-10">
      {/* Booking Details Header */}
      <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">
        Booking Details
      </h2>

      {/* Table Container */}
      <div className="overflow-hidden border border-gray-300 rounded-lg shadow-xl bg-white w-full">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-700">
                Time Slot
              </TableHead>
              <TableHead className="px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-700">
                User Bookings
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            {timeSlots.map((slot, index) => (
              <TableRow
                key={index}
                className="hover:bg-blue-50 focus-within:bg-blue-100 focus-within:outline focus-within:outline-2 focus-within:outline-blue-500 transition duration-300 ease-in-out"
              >
                {/* Time Slot Cell */}
                <TableCell className="flex items-center gap-3 px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                  <Image
                    src="/assets/bookingsIcon/clock.svg"
                    alt="Clock Icon"
                    width={20}
                    height={20}
                    className="opacity-90"
                  />
                  <span>{slot}</span>
                </TableCell>
  
                {/* User Bookings Cell */}
                <TableCell className="px-6 py-4">
                  {index === 0 || index === 1 ? (
                    <div className="flex flex-wrap gap-4 mt-2">
                      <BookingCard name="User 1" />
                      <BookingCard name="User 2" />
                      <BookingCard name="User 3" />
                    </div>
                  ) : (
                    <span className="block text-gray-500 text-sm italic">
                      No bookings available
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}


