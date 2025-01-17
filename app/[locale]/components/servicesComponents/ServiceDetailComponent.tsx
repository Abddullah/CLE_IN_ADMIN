import React, { useState } from 'react';
import Image from 'next/image';
import moment from 'moment';
import Map, { Marker } from "mapbox-gl";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import {  collection, query , getDocs , where} from 'firebase/firestore';
import { db } from '../../config/Firebase/FirebaseConfig';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from 'next-intl';



interface Props {
  bookingData:any;
  handleClose: () => void; 
}



const ServiceDetails = ({ bookingData, handleClose}:Props) => {

  const t = useTranslations("Services");
  const [customerInfoModal, setCustomerInfoModal] = useState(false);
  const [editDelete, SetEditDelete] = useState<boolean>(false);
  const [customerInfo , setCustomerInfo]=useState<null | any>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  const postedBy = bookingData.postedBy;

  useEffect(() => {

    console.log(bookingData);
    
    const fetchUserInfo = async () => {
      try {
        // Firestore query to match the postedBy userId
        const userQuery = query(
          collection(db, "users"),
          where("userId", "==", postedBy)  // Match the postedBy userId in users collection
        );

        const querySnapshot = await getDocs(userQuery);
        if (!querySnapshot.empty) {
          // Get the user data if a match is found
          const userData = querySnapshot.docs[0].data();
          setCustomerInfo(userData);  // Set the customer info state
        } else {
          console.log('No user found with the provided userId');
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (postedBy) {
      fetchUserInfo();  // Only fetch if postedBy is available
    }
  }, [postedBy]);


          
  console.log(customerInfo);
  
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_ACCESS_TOKEN as string;

 

  const mapContainerRef = useRef<HTMLDivElement | null>(null);

 
  

  
  
  useEffect(() => {
    if (!mapContainerRef.current) return; // Ensure ref is not null

    // Initialize the map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current, // Safe to use ref here
      style: "mapbox://styles/mapbox/streets-v11", // Map style
      center: [
        bookingData?.geoPoint?._long, 
        bookingData?.geoPoint?._lat
      ],
      zoom: 10, // Initial zoom level
      interactive:false
    });

    const lng = bookingData?.geoPoint?._long;
    const lat = bookingData?.geoPoint?._lat;


    console.log("long" , lng  , "lat" , lat);
    

    // Add a marker
    new mapboxgl.Marker({ color: "red" }) // Customize marker color
    .setLngLat([lng , lat]) // Marker position (longitude, latitude)
      .addTo(map); // Add marker to map

    // Clean up on component unmount
    return () => map.remove();
  }, []);


  



  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50 ">
      <div className="w-full max-w-4xl sm:max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6 relative max-h-[95vh] overflow-auto">
        <div className="flex justify-end">
          <button onClick={handleClose}>
            <Image src="/assets/bookingsIcon/closeIcon.svg" alt="Close" width={16} height={16} />
          </button>
        </div>

        <div className="space-y-4 z-10 relative">
          <div className="flex justify-center items-center mt-5 w-full">
            <div className="w-full max-w-xl">
              <Image
                src={"/assets/bookingsIcon/room.svg"}
                alt="Room Image"
                width={300}
                height={100}
                className="w-full h-[200px] object-cover rounded-md shadow-lg"
              />
            </div>
          </div>

          <h3 className="text-gray-600 text-sm sm:text-lg font-semibold">
            {bookingData?.category} 
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm">
            {bookingData?.description}
          </p>

          {/* Price, Cleaners, etc. */}
          <div className="max-w-full w-full bg-white shadow-lg rounded-lg p-6 mt-4 border border-gray-200">
            <div className="flex justify-between items-center py-2 ">
              <span className="text-gray-600">Price</span>
              <span className="text-gray-800 font-medium">€ {bookingData?.totalPriceWithTax}</span>
            </div>
            
           
          
           
          </div>


          <div>
      <p className="text-lg mt-8">{(t('Availablity'))}</p>
      <div className="flex justify-start gap-12">
        {bookingData.timeSlots.map((slot:any, index:number) => (
          <div key={index} className="mt-3">
            <p className="text-sm font-semibold">{slot.day}</p>
            <p className="text-sm text-[#00BFFF]">
              {/* {moment(slot.openingTime).format('h:mm A')} to {moment(slot.closingTime).format('h:mm A')} */}
            </p>
          </div>
        ))}
      </div>
    </div>


        
         
          {/* Location */}
  

<div className="grid w-full items-center gap-1.5 mt-6">
      <p className="text-lg mt-2">{(t('Location'))}</p>
      <div
        className="mt-4 w-full h-[180px] relative overflow-hidden rounded-lg"
        style={{ position: "relative" }}
      >
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>
    </div>
          {/* Customer Info Button */}
          <div onClick={() => setCustomerInfoModal(!customerInfoModal)} className="flex items-center mt-6">
            <button
              className="flex items-center justify-center w-5 h-5 bg-blue-600 text-white rounded-full shadow-lg transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Customer Info"
            >
              <span className="text-xl font-bold">i</span>
            </button>
            <p className="ml-2 text-gray-700 cursor-pointer text-sm font-medium hover:text-blue-600 transition-all duration-300">
              {(t('customer_info'))}
            </p>
          </div>

          {customerInfoModal && (
 
            <div className="max-w-full w-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
            <div className="px-6 py-4 border-b bg-[#00BFFF] text-white">
              <h2 className="text-lg font-bold">{(t('customer_info'))}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-gray-500">Full Name</h3>
                <p className="text-gray-700">{customerInfo.fullName}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-500">Phone No</h3>
                <p className="text-gray-700">{customerInfo.phone}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-500">Email Address</h3>
                <p className="text-gray-700">{customerInfo.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-500">Date of Birth</h3>
                <p className="text-gray-700">{ moment(customerInfo.dob).format('DD/MM/YYYY')}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-500">Gender</h3>
                <p className="text-gray-700">{customerInfo.gender}</p>
              </div>
              
              
            </div>
           
          </div>
    
          )}


<div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  {(t('reviews'))}
                </h4>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl shadow-md transition duration-300 hover:shadow-lg">
                    <div className="flex items-center mb-2">
                      <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full overflow-hidden mr-3">
                        <Image
                          src="/assets/servicesIcons/profile2.svg"
                          alt="Alex Smith"
                          width={40}
                          height={40}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Alex Smith</p>
                        <div className="flex items-center text-yellow-400 text-xs">
                          ★★★★☆
                          <span className="text-gray-500 ml-2">
                            (4.5 Stars)
                          </span>
                        </div>
                      </div>

                      <div className="ml-auto relative">
                        <button
                          onClick={() => SetEditDelete(!editDelete)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <FontAwesomeIcon icon={faEllipsisV} size="lg" />
                        </button>

                        {editDelete && (
                          <div className="absolute right-0 top-8 w-32 bg-white border border-gray-200 rounded-lg shadow-md z-10">
                            <button
                              className="flex items-center w-full p-2 hover:bg-gray-100"
                              onClick={() => {
                                console.log("Edit clicked");
                                SetEditDelete(false);
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
                                SetEditDelete(false);
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
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      "Very happy with the cleaning. Will definitely book
                      again!"
                    </p>
                  </div>
                </div>
              </div>
         

          {/* Apply Button */}
          <div className="flex mt-6 justify-center">
            <button className="px-6 py-2 border-2 w-[250px] rounded-md max-w-xs border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF] hover:text-white transition mt-3">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
