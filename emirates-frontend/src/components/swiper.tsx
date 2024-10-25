"use client"; // This line marks the component as a Client Component

import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { fetchSwiper } from '@/services/swiperService'; // Import your fetch function
import 'swiper/css';

const API_URL = 'http://localhost:1337'; // Replace with your actual API URL

const SwiperComponent: React.FC = () => {
  const slideRef = useRef<HTMLDivElement | null>(null); // Ref to the slide for animation
  const [slides, setSlides] = useState<any>(null); // State to hold swiper data


  // Function to handle slide change
  const handleSlideChange = () => {
    if (slideRef.current) {
      slideRef.current.classList.remove('animate-fadeInUp');
      void slideRef.current.offsetWidth; // Trigger reflow
      slideRef.current.classList.add('animate-fadeInUp');
    }
  };

  // Parallax effect for background images
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      document.querySelectorAll('.parallax-bg').forEach((bgElement) => {
        const parallaxSpeed = 1; // Adjust this value to modify the parallax effect
        const offset = scrollPosition * parallaxSpeed;
        (bgElement as HTMLElement).style.transform = `translateY(${offset}px)`;
      });
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
    <section className="relative">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={handleSlideChange}
        loop={true}
        speed={1200}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={false} // Disable default navigation arrows
        pagination={{ clickable: true }}
        effect="fade"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative h-[1000px] overflow-hidden">
            <div
              className="absolute inset-0 parallax-bg"
              style={{ backgroundImage: `url(${API_URL}${slides.imagem_carrossel1.url})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75" />
            <div className="absolute top-1/3 left-10 max-w-lg text-left transform-gpu" ref={slideRef}>
              <h1 className="text-5xl text-white font-extrabold tracking-wide leading-tight animate-fadeInUp">
                {slides.titulo_carrossel1}
              </h1>
              <p className="mt-4 text-lg text-white opacity-80 animate-fadeInUp delay-100">
                {slides.textocurto_carrossel1}
              </p>
              <a
                href="/imoveis"
                className="inline-block mt-6 px-8 py-3 text-lg font-medium text-white border-2 border-white hover:bg-white hover:text-black transition-all duration-300 animate-fadeInUp delay-200"
                style={{ borderRadius: '0' }}
              >
                {slides.botao_carrossel1}
              </a>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative h-[1000px] overflow-hidden">
            <div
              className="absolute inset-0 parallax-bg"
              style={{ backgroundImage: `url(${API_URL}${slides.imagem_carrossel2.url})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75" />
            <div className="absolute top-1/3 right-10 max-w-lg text-right transform-gpu" ref={slideRef}>
              <h1 className="text-5xl text-white font-extrabold tracking-wide leading-tight animate-fadeInUp">
                {slides.titulo_carrossel2}
              </h1>
              <p className="mt-4 text-lg text-white opacity-80 animate-fadeInUp delay-100">
                {slides.textocurto_carrossel2}
              </p>
              <a
                href="/imoveis"
                className="inline-block mt-6 px-8 py-3 text-lg font-medium text-white border-2 border-white hover:bg-white hover:text-black transition-all duration-300 animate-fadeInUp delay-200"
                style={{ borderRadius: '0' }}
              >
                {slides.botao_carrossel2}
              </a>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative h-[1000px] overflow-hidden">
            <div
              className="absolute inset-0 parallax-bg"
              style={{ backgroundImage: `url(${API_URL}${slides.imagem_carrossel3.url})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75" />
            <div className="absolute top-1/3 left-10 max-w-lg text-left transform-gpu" ref={slideRef}>
              <h1 className="text-5xl text-white font-extrabold tracking-wide leading-tight animate-fadeInUp">
                {slides.titulo_carrossel3}
              </h1>
              <p className="mt-4 text-lg text-white opacity-80 animate-fadeInUp delay-100">
                {slides.textocurto_carrossel3}
              </p>
              <a
                href="/imoveis"
                className="inline-block mt-6 px-8 py-3 text-lg font-medium text-white border-2 border-white hover:bg-white hover:text-black transition-all duration-300 animate-fadeInUp delay-200"
                style={{ borderRadius: '0' }}
              >
                {slides.botao_carrossel3}
              </a>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default SwiperComponent;
