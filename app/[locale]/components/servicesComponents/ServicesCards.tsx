"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import BookingModal from "../jobsComponent/JobDetailsCard";

interface CardProps {
  imageUrl: string;
  title: string;
  price: string;
  time: string;
  status: string;
  date: any;
  dotsIcon: string;
  statusTextColor:any;
  onEdit: (updatedData: {
    title: string;
    price: string;
    status: string;
  }) => void;
  onDelete: () => void; // Add onDelete callback
}

const Card: React.FC<CardProps> = ({
  imageUrl,
  title,
  price,
  time,
  status,
  date,
  dotsIcon,
  statusTextColor,
  onEdit,
  onDelete, // Add onDelete callback
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [editableData, setEditableData] = useState({ title, price, status });

  const handleEdit = () => {
    onEdit(editableData);
    setShowOptions(false); // Close the options menu
  };

  const handleDelete = () => {
    onDelete();
    setShowOptions(false); // Close the options menu
  };

  const [image , setImage]=useState(false);

  return (
    <div className="cursor-pointer flex">
      <div className="bg-white rounded-lg shadow-md border p-4 w-80 ">
        <Image
          src={imageUrl}
          alt={title}
          width={200}
          height={100}
          className="w-full h-48 object-cover rounded-md"
        />
        <div className="p-4 space-y-2 relative">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-[#00BFFF]">{price}</h2>
            <Image
              src={dotsIcon}
              alt="options"
              width={20}
              height={20}
              className="cursor-pointer"
              onClick={() => setShowOptions(!showOptions)}
            />
          </div>

          {showOptions && (
            <div className="absolute top-0 right-0 mt-2 bg-white border rounded shadow-lg z-50">
              <button
                onClick={handleEdit}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700"
              >
                <FontAwesomeIcon icon={faEdit} className="mr-2" />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="block w-full px-4 py-2 text-left text-sm text-red-600"
              >
                <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                Delete
              </button>
            </div>
          )}

          <h2 className="text-md font-semibold text-gray-800">{title}</h2>
          <h2 className="text-sm text-gray-600">{time}</h2>
          <h2 className="text-sm text-gray-600">Status: <span className={`text-${statusTextColor}`}>{status}</span></h2>
          <h2 className="text-sm text-gray-600">Date: {date}</h2>
        </div>
      </div>
    </div>
  );
};

export default Card;
