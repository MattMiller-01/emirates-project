"use client"; // This line marks the component as a Client Component

import React, { useEffect, useState } from 'react';
import { fetchSwiper } from '@/services/swiperService'; // Import your fetch function


const API_URL = 'http://localhost:1337'; // Replace with your actual API URL


const CompanyStory: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [slides, setSlides] = useState<any>(null); // State to hold swiper data

  // JavaScript to control the scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // API data
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchSwiper();
        setSlides(data[0]); 
      } catch (error) {
        console.error('Error fetching swiper data:', error);
      }
    };

    getData();
  }, []);

  // Return null or a loading state if setSlides is not ready yet
  if (!slides) {
    return <div>Loading...</div>;
  }

  return (
    <section className="relative bg-white text-black py-12 md:py-24">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-4">
        {/* Left Column: Story Text */}
        <div className="w-full lg:w-1/2 pr-0 lg:pr-12 text-left lg:text-left mb-8 lg:mb-0">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-wide mb-4 uppercase">
          {slides.titulo_about}
          </h2>
          <p className="text-lg md:text-xl leading-relaxed mb-4 font-light max-w-2xl">
          {slides.texto_about}
          </p>        
        </div>

        {/* Right Column: Luxury Image */}
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
          <div className="relative group">
            {/* Parallax effect on hover */}
            <img 
              src= {`${API_URL}${slides.imagem_about.url}`}
              alt="Imagem da Empresa" 
              className="w-full h-auto shadow-lg transform group-hover:scale-105 transition-transform duration-500 ease-out" 
              style={{ maxHeight: '400px', objectFit: 'cover' }} 
            />
            {/* Decorative Accent (floating border) */}
            <div className="absolute inset-0 w-full h-full border-4 border-black opacity-0 group-hover:opacity-100 transform scale-90 transition duration-500 ease-out pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyStory;
