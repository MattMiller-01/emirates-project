"use client"; // This line marks the component as a Client Component

import React, { useEffect, useState } from 'react';
import { fetchSwiper } from '@/services/swiperService'; // Import your fetch function


const API_URL = 'http://localhost:1337'; // Replace with your actual API URL

const Banner: React.FC = () => {
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
    <section className="relative flex flex-col md:flex-row h-screen">
      {/* Image Section */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-500"
          style={{
            backgroundImage: `url(${API_URL}${slides.imagem_banner.url})`,
            backgroundAttachment: 'fixed',
          }}
        ></div>
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-start bg-[#111C22] px-6 md:px-12">
        <div className="text-left">
          <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-4 md:mb-6">
            Adquira o Sonho <br />
            <span className="text-gold">Que Você Merece</span>
          </h1>
          <p className="text-base md:text-lg text-gray-300 mb-4 md:mb-8 max-w-lg">
            Experimente um luxo e serenidade incomparáveis. Descubra casas projetadas para
            aqueles que buscam o melhor da vida.
          </p>
          <a
            href="/imoveis"
            className="border border-white text-white px-6 py-3 text-base md:px-8 md:py-3 md:text-lg font-medium hover:bg-white hover:text-black transition duration-300 mt-4"
          >
            Explore Propriedades
          </a>
          <br />
          <br />
        </div>
      </div>
    </section>
  );
};

export default Banner;
