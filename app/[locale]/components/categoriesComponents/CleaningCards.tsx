import Image from "next/image";
import React, { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/Firebase/FirebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

interface Props {
  title: string;
  image: string;
  subcategories: string[];
  id: string;
  onDelete: (id: string) => void;
  onUpdate: (category: {
    id: string;
    title: string;
    subcategories: string[];
  }) => void; // Updated to pass the whole category object
}

const CleaningCards: React.FC<Props> = ({
  title,
  image,
  subcategories,
  id,
  onDelete,
  onUpdate,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "categories", id));
      onDelete(id);
    } catch (error) {
      console.error("Error deleting category: ", error);
    }
  };

  const handleEdit = () => {
    onUpdate({ id, title, subcategories });
  };

  return (
    <div
      className="relative w-[250px] rounded-3xl border-2 top-9 border-[#00BFFF] bg-white/90 backdrop-blur-sm p-6 hover:shadow-2xl transition-all duration-300 h-[450px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowOptions(false);
      }}
    >
      <div className="absolute top-4 right-4">
        <Image
          src="/assets/categoriesIcons/dots.svg"
          width={24}
          height={24}
          alt="Options"
          className="cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
          onClick={handleToggleOptions}
        />
        {showOptions && (
          <div
            className="absolute top-6 right-0 mt-2 bg-white border rounded shadow-lg z-50"
            style={{ minWidth: "150px" }}
          >
            <button
              onClick={handleEdit}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faEdit} className="mr-2" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-100"
            >
              <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center h-full justify-between">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative border-2 border-[#00BFFF] rounded-full overflow-hidden w-32 h-32 bg-white">
            {image && image !== "" ? (
              <Image
                src={"/assets/categoriesIcons/Factory.svg"}
                className="w-16 h-auto object-cover mt-8 mx-auto transform transition-transform duration-300 group-hover:scale-110"
                alt="Service Icon"
                width={64}
                height={64}
              />
            ) : (
              <div className="w-16 h-16 bg-gray-200 flex justify-center items-center text-gray-500 rounded-full">
                No Image
              </div>
            )}
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4 text-center">
          {title}
        </h2>

        {/* Subcategories Section */}
        <div className="space-y-3 w-full flex flex-col items-start">
          {subcategories && subcategories.length > 0 ? (
            subcategories.map((subcategory, index) => (
              <div
                key={index}
                className="text-sm text-gray-600 hover:text-[#00BFFF] cursor-pointer flex items-center hover:translate-x-1 transition-transform"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2" />
                {subcategory}
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500">
              No subcategories available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CleaningCards;
