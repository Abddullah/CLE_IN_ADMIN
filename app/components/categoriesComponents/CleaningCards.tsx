import Image from "next/image";
import React from "react";
import dots from "../../../assets/categoriesIcons/dots.svg";

interface Props {
  title: string;
  image: string;
}

const CleaningCards: React.FC<Props> = ({ title, image }) => {
  return (
    <>
      <div className="relative w-[203px] rounded-3xl border border-6 top-9 border-[#00BFFF] shadow-lg bg-transparent p-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <div className="absolute top-3 right-3 flex flex-col space-y-1 cursor-pointer">
          <Image
            src={dots}
            alt="Image 1"
            className="w-6 h-6 transition-all duration-300 ease-in-out transform hover:scale-125"
          />
        </div>

        <div className="flex flex-col items-center mb-4">
          <div className="border-2 border-[#00BFFF] rounded-full overflow-hidden w-28 h-28 bg-white">
            <Image
              src={image}
              className="w-12 h-auto object-cover mt-7 ml-7"
              alt="House Image"
            />
          </div>
          <h2 className="text-md font-semibold text-[#242525] mt-4 text-center">
            {title}
          </h2>
        </div>
      </div>
    </>
  );
};

export default CleaningCards;
