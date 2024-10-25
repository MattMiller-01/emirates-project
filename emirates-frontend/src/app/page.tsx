"use client"; // This line marks the component as a Client Component

import React from 'react';
import Navbar from '../components/navbar';
import SwipeBanner from '../components/swiper';
import Tiles from '../components/tiles';
import Preview from '../components/preview';
import About from '../components/about';
import Footer from '../components/footer';

const Homepage: React.FC = () => {
  return (

    <div className="bg-white text-[#505254]">
      {/* ---------navbar-------- */}
      <div>
      <Navbar/>
      </div>

      {/* swipe banner */}
      <div>
      <SwipeBanner/>
      </div>

      {/* real state display Content */}
      <div>
      <Tiles/>
      </div>
      
      {/*Previw Section */}
      <div>
      <Preview />
      </div>

      {/* Property Preview Section */}
      <div>
      <About />
      </div>

      {/* footer/contact Section */}
      <div>
      <Footer/>
      </div>
    </div>
  );
};

export default Homepage;
