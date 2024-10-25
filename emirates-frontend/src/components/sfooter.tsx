"use client"; // This line marks the component as a Client Component

import React from 'react';

const Sfooter: React.FC = () => {
  return (
    <footer className="section-wrapper py-20 bg-[#111C22] text-white relative overflow-hidden">

      {/* Footer Bottom Section */}
      <div className="container mx-auto px-4 py-8 mt-10 border-t border-gray-800">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Copyright Notice */}
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Emirates Real Estate. All rights reserved.
          </p>

          {/* Footer Navigation Links */}
          <div className="flex space-x-6 text-gray-400 text-sm">
            <a href="#home" className="hover:text-white">Home</a>
            <a href="#about" className="hover:text-white">Lançamentos</a>
            <a href="#services" className="hover:text-white">Imóveis</a>
            <a href="#contact" className="hover:text-white">Contato</a>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://facebook.com" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" className="text-gray-400 hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" className="text-gray-400 hover:text-white">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111C22] opacity-70 z-0"></div>
    </footer>
  );
};

export default Sfooter;
