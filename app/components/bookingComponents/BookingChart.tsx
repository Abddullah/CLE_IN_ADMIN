import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import profile from "../../../assets/bookingsIcon/buttonProfile.svg";

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
      <Table>
        <TableHeader>
          <p className="text-lg mb-3 ">September 18,2024</p>
          <TableRow>
            <TableHead>Bookings</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {timeSlots.map((slot, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{slot}</TableCell>

              <TableCell>
                <button className="bg-[#00BFFF] flex gap-2 w-[120px] text-white px-2 py-2 rounded-lg hover:bg-[#00BFFF]">
                  <span>
                    <Image src={profile} alt="profile" />
                  </span>
                  <span className="mt-1">Helina</span>
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
