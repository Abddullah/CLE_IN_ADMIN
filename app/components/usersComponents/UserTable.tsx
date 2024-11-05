import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  
  const invoices = [
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
    {
        Name: "Jane Smith",
        email: "jane.smith@example.com",
        PhoneNo: "(987) 654-3210",
        role: "Developer",
        address: "456 Oak St, Metropolis",
        gender: "Female",
        dateBirth: "1990-06-23",
      },{
        Name: "Jane Smith",
        email: "jane.smith@example.com",
        PhoneNo: "(987) 654-3210",
        role: "Developer",
        address: "456 Oak St, Metropolis",
        gender: "Female",
        dateBirth: "1990-06-23",
      },{
        Name: "Jane Smith",
        email: "jane.smith@example.com",
        PhoneNo: "(987) 654-3210",
        role: "Developer",
        address: "456 Oak St, Metropolis",
        gender: "Female",
        dateBirth: "1990-06-23",
      },{
        Name: "Jane Smith",
        email: "jane.smith@example.com",
        PhoneNo: "(987) 654-3210",
        role: "Developer",
        address: "456 Oak St, Metropolis",
        gender: "Female",
        dateBirth: "1990-06-23",
      },{
        Name: "Jane Smith",
        email: "jane.smith@example.com",
        PhoneNo: "(987) 654-3210",
        role: "Developer",
        address: "456 Oak St, Metropolis",
        gender: "Female",
        dateBirth: "1990-06-23",
      },{
        Name: "Jane Smith",
        email: "jane.smith@example.com",
        PhoneNo: "(987) 654-3210",
        role: "Developer",
        address: "456 Oak St, Metropolis",
        gender: "Female",
        dateBirth: "1990-06-23",
      },{
        Name: "Jane Smith",
        email: "jane.smith@example.com",
        PhoneNo: "(987) 654-3210",
        role: "Developer",
        address: "456 Oak St, Metropolis",
        gender: "Female",
        dateBirth: "1990-06-23",
      },{
        Name: "Jane Smith",
        email: "jane.smith@example.com",
        PhoneNo: "(987) 654-3210",
        role: "Developer",
        address: "456 Oak St, Metropolis",
        gender: "Female",
        dateBirth: "1990-06-23",
      },{
        Name: "Jane Smith",
        email: "jane.smith@example.com",
        PhoneNo: "(987) 654-3210",
        role: "Developer",
        address: "456 Oak St, Metropolis",
        gender: "Female",
        dateBirth: "1990-06-23",
      },{
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
    return (
      <div className="overflow-x-auto p-4">
        <Table className="min-w-full border border-gray-200 rounded-lg shadow-md">
          <TableCaption className="text-gray-600 text-sm py-2">
            A list of recent employee records.
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="p-2 text-left text-xs md:text-sm lg:text-base">Name</TableHead>
              <TableHead className="p-2 text-left text-xs md:text-sm lg:text-base">Email Address</TableHead>
              <TableHead className="p-2 text-left text-xs md:text-sm lg:text-base hidden md:table-cell">Phone Number</TableHead>
              <TableHead className="p-2 text-left text-xs md:text-sm lg:text-base hidden md:table-cell">Role</TableHead>
              <TableHead className="p-2 text-left text-xs md:text-sm lg:text-base hidden lg:table-cell">Address</TableHead>
              <TableHead className="p-2 text-left text-xs md:text-sm lg:text-base hidden lg:table-cell">Gender</TableHead>
              <TableHead className="p-2 text-right text-xs md:text-sm lg:text-base hidden lg:table-cell">Date of Birth</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice, index) => (
              <TableRow key={index} className="even:bg-gray-50 hover:bg-gray-100 transition-colors">
                <TableCell className="p-2 font-medium text-xs md:text-sm lg:text-base">{invoice.Name}</TableCell>
                <TableCell className="p-2 text-xs md:text-sm lg:text-base">{invoice.email}</TableCell>
                <TableCell className="p-2 text-xs md:text-sm lg:text-base hidden md:table-cell">{invoice.PhoneNo}</TableCell>
                <TableCell className="p-2 text-xs md:text-sm lg:text-base hidden md:table-cell">{invoice.role}</TableCell>
                <TableCell className="p-2 text-xs md:text-sm lg:text-base hidden lg:table-cell">{invoice.address}</TableCell>
                <TableCell className="p-2 text-xs md:text-sm lg:text-base hidden lg:table-cell">{invoice.gender}</TableCell>
                <TableCell className="p-2 text-right text-xs md:text-sm lg:text-base hidden lg:table-cell">{invoice.dateBirth}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
  





































