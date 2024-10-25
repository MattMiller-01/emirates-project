"use client"; // This line marks the component as a Client Component

import React from 'react';
import {useState} from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="section-wrapper py-20 bg-[#111C22] text-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Contact Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold mb-6">Entre em contato</h2>
            <p className="mb-6 text-gray-400">Adoraríamos ouvir de você. Entre em contato conosco através de uma das opções a seguir:</p>

            {/* Contact Information with subtle hover effects */}
            <div className="space-y-6">
              {/* WhatsApp */}
              <div className="flex items-center hover:text-white transition-all duration-300 cursor-pointer">
                  <svg viewBox="0 0 24 24" width="1.5em" height="1.5em" className="mr-4 text-[#25D366]">
                    <path fill="currentColor" d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23c-1.48 0-2.93-.39-4.19-1.15l-.3-.17l-3.12.82l.83-3.04l-.2-.32a8.2 8.2 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31c-.22.25-.87.86-.87 2.07c0 1.22.89 2.39 1 2.56c.14.17 1.76 2.67 4.25 3.73c.59.27 1.05.42 1.41.53c.59.19 1.13.16 1.56.1c.48-.07 1.46-.6 1.67-1.18s.21-1.07.15-1.18c-.07-.1-.23-.16-.48-.27c-.25-.14-1.47-.74-1.69-.82c-.23-.08-.37-.12-.56.12c-.16.25-.64.81-.78.97c-.15.17-.29.19-.53.07c-.26-.13-1.06-.39-2-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.12-.24-.01-.39.11-.5c.11-.11.27-.29.37-.44c.13-.14.17-.25.25-.41c.08-.17.04-.31-.02-.43c-.06-.11-.56-1.35-.77-1.84c-.2-.48-.4-.42-.56-.43c-.14 0-.3-.01-.47-.01"></path>
                  </svg>
                  <div>
                    <p className="font-light">WhatsApp</p>
                    <a href="https://wa.me" className="text-gray-400 hover:text-[#25D366] transition">+55 62 99999-2222</a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center hover:text-white transition-all duration-300 cursor-pointer">
                  <svg viewBox="0 0 24 24" width="1.5em" height="1.5em" className="mr-4 text-[#EA4335]">
                    <path fill="currentColor" d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 5l-8-5zm0 12H4V8l8 5l8-5z"></path>
                  </svg>
                  <div>
                    <p className="font-light">Email</p>
                    <a href="mailto:contato@email.com.br" className="text-gray-400 hover:text-[#EA4335] transition">contato@email.com.br</a>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-center hover:text-white transition-all duration-300 cursor-pointer">
                  <svg viewBox="0 0 24 24" width="1.5em" height="1.5em" className="mr-4 text-[#E1306C]">
                    <path fill="currentColor" d="M12 2.2c3.31 0 3.72.01 5.03.07 1.15.06 1.94.26 2.4.45.56.21 1.03.49 1.49.95.45.45.73.93.95 1.49.19.46.39 1.25.45 2.4.06 1.31.07 1.72.07 5.03s-.01 3.72-.07 5.03c-.06 1.15-.26 1.94-.45 2.4-.21.56-.49 1.03-.95 1.49-.45.45-.93.73-1.49.95-.46.19-1.25.39-2.4.45-1.31.06-1.72.07-5.03.07s-3.72-.01-5.03-.07c-1.15-.06-1.94-.26-2.4-.45-.56-.21-1.03-.49-1.49-.95-.45-.45-.73-.93-.95-1.49-.19-.46-.39-1.25-.45-2.4C2.2 15.72 2.2 15.31 2.2 12s.01-3.72.07-5.03c.06-1.15.26-1.94.45-2.4.21-.56.49-1.03.95-1.49.45-.45.93-.73 1.49-.95.46-.19 1.25-.39 2.4-.45C8.28 2.21 8.69 2.2 12 2.2zm0 3.6c-3.32 0-6.02 2.7-6.02 6.02 0 3.32 2.7 6.02 6.02 6.02 3.32 0 6.02-2.7 6.02-6.02 0-3.32-2.7-6.02-6.02-6.02zm0 10.75c-2.62 0-4.73-2.11-4.73-4.73 0-2.62 2.11-4.73 4.73-4.73 2.62 0 4.73 2.11 4.73 4.73 0 2.62-2.11 4.73-4.73 4.73zm3.67-9.49a1.66 1.66 0 1 1-3.33 0 1.66 1.66 0 0 1 3.33 0z"></path>
                  </svg>
                  <div>
                    <p className="font-light">Instagram</p>
                    <a href="https://instagram.com" className="text-gray-400 hover:text-[#E1306C] transition">@emirates.si</a>
                  </div>
                </div>
            </div>
          </div>

          {/* Contact Form */}
          {/* <div className="bg-white p-8 text-gray-900 shadow-xl transform transition-transform duration-500 hover:scale-105">
            <h3 className="text-3xl font-semibold mb-6 text-center">Entre Em Contato</h3>
            <form className="space-y-4">
              <input type="text" name="name" placeholder="Nome" className="w-full px-4 py-2 border border-gray-300" />
              <input type="email" name="email" placeholder="Email" className="w-full px-4 py-2 border border-gray-300" />
              <input type="tel" name="phone" placeholder="Phone" className="w-full px-4 py-2 border border-gray-300" />
              <textarea name="message" rows="4" placeholder="Mensagem" className="w-full px-4 py-2 border border-gray-300"></textarea>
              <button type="submit" className="w-full bg-[#111C22] hover:bg-[#222831] text-white py-2 transition">Enviar Mensagem</button>
            </form>
          </div> */}
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="container mx-auto px-4 py-8 mt-10 border-t border-gray-800">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Copyright Notice */}
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Emirates Soluções Imobiliárias. All rights reserved.
          </p>

        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111C22] opacity-70 z-0"></div>
    </footer>
  );
};

export default Footer;
