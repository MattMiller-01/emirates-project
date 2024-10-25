"use client";
import Sfooter from '@/components/sfooter';
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

// Install Swiper modules
SwiperCore.use([Navigation, Pagination]);

const Gallery = () => {
  const [isSwiperOpen, setIsSwiperOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);

  const galleryImages = [
    "/image1.jpg",
    "/image2.jpg",
    "/image3.jpg",
    "/image1.jpg",
    "/image2.jpg",
    "/image3.jpg",
    "/image2.jpg",
    "/image1.jpg",
  ];

  const handleImageClick = (index: number) => {
    setActiveImageIndex(index);
    setIsSwiperOpen(true);
  };

  const handleCloseSwiper = () => {
    setIsSwiperOpen(false);
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close the swiper if the background (not the Swiper itself) is clicked
    if (e.target === e.currentTarget) {
      setIsSwiperOpen(false);
    }
  };

  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.slideTo(activeImageIndex);
    }
  }, [activeImageIndex, swiperInstance]);

  return (
    <>
      <div className="bg-[#111C22] min-h-screen flex items-center justify-center relative p-6">
        {/* Close Button */}
        <Link href="/state">
          <button className="absolute top-4 right-4 border border-white text-white p-2 transition duration-200 z-50 hover:bg-white hover:text-black">
            X
          </button>
        </Link>

        {/* Masonry-like Image Grid */}
        <div
          className={`columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 mt-12 ${
            isSwiperOpen ? "blur-md" : ""
          }`}
        >
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden cursor-pointer"
              onClick={() => handleImageClick(index)}
            >
              <Image
                src={image}
                alt={`Gallery Image ${index + 1}`}
                layout="responsive"
                width={500}
                height={300}
                className="object-cover transition-transform duration-500 ease-in-out hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* Swiper Carousel (Only visible when isSwiperOpen is true) */}
        {isSwiperOpen && (
          <div
            className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 z-50"
            onClick={handleBackgroundClick}
          >
            <button
              onClick={handleCloseSwiper}
              className="absolute top-4 right-4 border border-white text-white p-2 transition duration-200 z-50 hover:bg-white hover:text-black"
            >
              X
            </button>
            <Swiper
              initialSlide={activeImageIndex}
              pagination={{ clickable: true }}

              loop={true} // Enable infinite looping
              className="w-full md:w-2/3 lg:w-1/2 mb-6"
              onSwiper={(swiper) => setSwiperInstance(swiper)}
            >
              {galleryImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={image}
                    alt={`Gallery Image ${index + 1}`}
                    layout="responsive"
                    width={1000} // Larger display size
                    height={750}
                    className="object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbnail Row */}
            <div className="flex space-x-4 overflow-x-auto mt-4 px-4">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className={`w-20 h-20 cursor-pointer border-2 ${
                    activeImageIndex === index ? 'border-white' : 'border-transparent'
                  } transition-all duration-200`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    layout="responsive"
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Swipe Indicator */}
            <div className="absolute bottom-8 text-white text-sm opacity-75 animate-pulse">
              Swipe to view more images
            </div>
          </div>
        )}
      </div>

      <Sfooter />
    </>
  );
};

export default Gallery;
