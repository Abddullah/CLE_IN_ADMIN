"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const SliderPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    '/assets/slider-1.jpg',
    '/assets/slider-2.jpg',
    '/assets/slider-3.jpg',
  ];

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className="bg-[#F5F7FA] h-full w-full">
      <div className="flex justify-end mb-4">
      <Link href={"banner/addBanner"}>
        <div className="flex justify-end overflow-hidden">
          <Button className="border-[#4BB1D3] w-[110px] h-[40px] mt-5 mr-8 text-white bg-[#00BFFF] rounded-lg outline-none hover:bg-[#00BFFF] sm:w-[120px] sm:h-[45px]">
            ADD
          </Button>
        </div>
      </Link>
      </div>

      <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg mt-8">
        <img
          src={slides[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-64 object-cover"
        />

        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#00BFFF] text-white p-2 rounded-full"
        >
          ◀
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#00BFFF] text-white p-2 rounded-full"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default SliderPage;
