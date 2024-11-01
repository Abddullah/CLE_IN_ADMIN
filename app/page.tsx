import React from 'react'
import BookingCard from './components/Cards'
import { faUser , faEnvelope , faMoneyBill } from '@fortawesome/free-solid-svg-icons';

const page = () => {
  return (
    <>

<div className="flex items-center justify-center mt-12 bg-gray-50 flex-wrap gap-3 px-6">
   
    <BookingCard title='Total Booking' totalBookings={10} icons={faEnvelope} />
    <BookingCard title='Total Income' totalBookings={18} icons={faMoneyBill}  />
    <BookingCard title="Total Users" totalBookings={18} icons={faUser} />
    <BookingCard title='Total Provider' totalBookings={18} icons={faUser} />
    </div>
    </>
  )
}

export default page