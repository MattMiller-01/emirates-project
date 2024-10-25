"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchListings } from '@/services/imoveisService'; // Import your service

const API_URL = 'http://localhost:1337'; // Your API base URL

const RealEstatePreview: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [randomListings, setRandomListings] = useState([]);

  // Function to shuffle and select random listings
  const getRandomListings = (listings, num) => {
    const shuffled = listings.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  // Fetch listings and select random ones
  useEffect(() => {
    const fetchRandomListings = async () => {
      const data = await fetchListings(); // Fetch data from the API
      const randomProperties = getRandomListings(data, 4); // Select 6 random listings
      setRandomListings(randomProperties);
    };

    fetchRandomListings(); // Fetch and set the listings

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="relative">
      <div className="relative">
        <br />
        <div className="mt-16 grid grid-cols-2 gap-1 p-4">
          {randomListings.map((listing, index) => (
            <div
              key={listing.id}
              className="relative group h-64 w-full overflow-hidden"
              style={{
                transform: `translateY(${scrollY * 0.00 * (index + 1)}px)`,
                transition: 'transform 0.2s ease-out',
              }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 transform group-hover:scale-105"
                style={{
                  backgroundImage: `url(${listing.images[0]?.url ? `${API_URL}${listing.images[0].url}` : '/fallback-image.jpg'})`
                }}
              ></div>
              <div className="absolute inset-0 bg-white opacity-30 transition-opacity duration-300 group-hover:opacity-0"></div>
              <div className="relative z-10 flex flex-col justify-center items-center h-full bg-black bg-opacity-50 text-white">
                <div className="text-xl font-bold">{listing.nome}</div>
                <Link href={`/imovel/${listing.id}`} passHref legacyBehavior>
                  <a className="mt-2 px-4 py-2 bg-transparent border border-white text-white font-semibold transition duration-200 hover:bg-white hover:text-black">
                    Veja Mais
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mb-8">
        <Link href="/imoveis" passHref>
          <button className="mt-8 w-auto h-12 bg-transparent border border-black text-black font-bold hover:bg-black hover:text-white flex items-center justify-center z-10 px-4">
            Ver Mais Imóveis
          </button>
        </Link>
      </div>
    </section>
  );
};

export default RealEstatePreview;
