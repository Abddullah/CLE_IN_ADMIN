"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faEdit,
  faTrashAlt,
  faChartSimple,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";

interface CardProps {
  imageUrl: string;
  title: string;
  price: string;
  time?: string;
  status: string;
  date?: any;
  dotsIcon: string;
  statusTextColor: any;
  createdAt: string;
  detailOpen: any;
  onEdit: (updatedData: {
    title: string;
    price: string;
    status: string;
  }) => void;
  onDelete: () => void;
  onStatus?: (Data: { status: string }) => void;
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
  createdAt,
  detailOpen,
  onEdit,
  onDelete,
  onStatus = () => {},
}) => {
  const t = useTranslations("Jobs");
  const [showOptions, setShowOptions] = useState(false);
  const [editableData, setEditableData] = useState({ title, price, status });
  const [statusData, setStatusData] = useState({ status });
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleEdit = () => {
    onEdit(editableData);
    setShowOptions(false);
  };

  const handleDelete = () => {
    onDelete();
    setShowOptions(false);
  };

  const handleStatus = () => {
    if (typeof onStatus === "function") {
      onStatus(statusData);
      setShowOptions(false);
    } else {
      console.error("onStatus is not a function", onStatus);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };

    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

  return (
    <div className="cursor-pointer flex">
      <div className="bg-white rounded-lg shadow-md border p-4 w-80">
        <Image
          onClick={detailOpen}
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
            <div
              ref={menuRef}
              className="absolute top-0 right-0 mt-2 bg-white border rounded shadow-lg z-50"
            >
              <button
                onClick={handleEdit}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700"
              >
                <FontAwesomeIcon icon={faEdit} className="mr-2" />
                {t("edit")}
              </button>
              <button
                onClick={handleDelete}
                className="block w-full px-4 py-2 text-left text-sm text-red-600"
              >
                <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                {t("delete")}
              </button>
              <button
                onClick={handleStatus}
                className="block w-full px-4 py-2 text-left text-sm text-blue-600"
              >
                <FontAwesomeIcon icon={faChartSimple} className="mr-2" />
                {t("Status")}
              </button>
            </div>
          )}

          <h2 className="text-md font-semibold text-gray-800">{title}</h2>
          <h2 className="text-sm text-gray-600">{time}</h2>
          <h2 className="text-sm text-gray-600">
            Status: <span className={`text-${statusTextColor}`}>{status}</span>
          </h2>
          <h2 className="text-sm text-gray-600"> {date}</h2>
          <h2 className="text-xs text-gray-600"> {createdAt}</h2>
        </div>
      </div>
    </div>
  );
};

export default Card;
