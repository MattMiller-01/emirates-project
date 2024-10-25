// src/app/newListings/page.tsx

"use client"; // This line marks the component as a Client Component

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar'; // Update the path if necessary
import Footer from '@/components/footer'; // Update the path if necessary
import Image from 'next/image';
import Link from 'next/link';

const NewListings = () => {
  const [scrollY, setScrollY] = useState(0);

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

  const listings = [
    {
      id: 1,
      title: "Vila de Luxo em Dubai",
      description: "Esta deslumbrante vila de luxo possui um design moderno com vistas expansivas, piscina privativa e paisagismo requintado. Perfeita para entretenimento ou um retiro tranquilo.",
      imageUrl: "/image1.jpg", // Replace with your image path
      link: "/listings/vila-dubai", // Link to the specific listing page
    },
    {
      id: 2,
      title: "Apartamento Contemporâneo",
      description: "Um apartamento contemporâneo requintado situado em uma localização privilegiada, oferecendo amenidades incomparáveis e acabamentos modernos. Aproveite as vistas da cidade do seu terraço privativo.",
      imageUrl: "/image2.jpg", // Replace with your image path
      link: "/listings/apartamento-contemporaneo", // Link to the specific listing page
    },
  ];

  return (
    <div className="bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">

        {listings.map((listing) => (
          <section
            key={listing.id}
            className="relative flex flex-col md:flex-row mb-10"
            style={{
              backgroundImage: `url(${listing.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '60vh',
              overflow: 'hidden',
            }}
          >
            {/* Text Overlay */}
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="relative w-full md:w-1/2 flex flex-col justify-center p-6">
              <h2 className="text-3xl font-serif text-white leading-tight mb-4">{listing.title}</h2>
              <p className="text-lg text-gray-300 mb-4">{listing.description}</p>
              <Link
                href={listing.link}
                className="border border-white text-white px-6 py-3 text-base font-medium hover:bg-white hover:text-black transition duration-300 mt-4"
              >
                Ver Imóvel
              </Link>
            </div>
          </section>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default NewListings;
