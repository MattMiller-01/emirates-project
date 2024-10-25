"use client"; // This line marks the component as a Client Component

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';
import 'swiper/css';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 flex items-center justify-between h-12 bg-white/30 backdrop-blur-md transition duration-300 ease-in-out z-10 px-4">
      {/* Favicon and Logo */}
      <Link href="/" passHref>
        <div className="flex items-center cursor-pointer">
          <Image src="/favicon.ico" alt="Logo" width={30} height={30} />
          <div className="text-center ml-4 text-white">Emirates</div>
        </div>
      </Link>

      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden flex items-center" onClick={toggleMenu}>
        {isOpen ? <FaTimes className="text-white" /> : <FaBars className="text-white" />}
      </div>

      {/* Mobile Menu Links */}
      <div
        className={`absolute top-12 right-0 bg-white/30 backdrop-blur-md text-white rounded shadow-md transition duration-300 ease-in-out ${
          isOpen ? "block" : "hidden"
        } md:hidden`}
      >
        <div className="flex flex-col items-center space-y-2 p-2">
          <Link href="/imoveis" className="transition duration-300 px-2 py-1 hover:bg-white hover:text-black rounded">Imóveis</Link>
          <Link href="/contato" className="transition duration-300 px-2 py-1 hover:bg-white hover:text-black rounded">Contato</Link>
          <Link href="/quem-somos" className="transition duration-300 px-2 py-1 hover:bg-white hover:text-black rounded">Quem Somos</Link>
        </div>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-6 text-white">
        <Link href="/imoveis" className="transition duration-300 px-2 py-1 hover:bg-white hover:text-black">Imóveis</Link>
        <Link href="/contato" className="transition duration-300 px-2 py-1 hover:bg-white hover:text-black">Contato</Link>
        <Link href="/quem-somos" className="transition duration-300 px-2 py-1 hover:bg-white hover:text-black">Quem Somos</Link>
      </div>

      {/* Bottom Gradient Border */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-white to-transparent opacity-60"></div>
    </nav>
  );
};

export default Navbar;
