"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

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

  const cards = [
    {
      image: "/assets/slider-1.jpg",
      title: "Card Title 1",
      description: "This is a brief description for card 1.",
    },
    {
      image: "/assets/slider-2.jpg",
      title: "Card Title 2",
      description: "This is a brief description for card 2.",
    },
    {
      image: "/assets/slider-3.jpg",
      title: "Card Title 3",
      description: "This is a brief description for card 3.",
    },
  ];
  

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

 
 

  {/* Cards Section */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-w-6xl mx-auto px-3">
    {cards.map((card:any, index:number) => (
      <div
        key={index}
        className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
      >
        <Image
          src={card.image}
          alt={card.title}
          className="w-full h-48 object-cover"
          width={400}
          height={10}
        />
       
      </div>
    ))}
  </div>
</div>

  );
};

export default SliderPage;
