"use client"
import React from 'react';
import Image from 'next/image';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <div className="relative h-screen flex items-center justify-start">
      <Image
        src="/AGI.png"
        alt="Delicious Food"
        layout="fill"
        objectFit="cover"
        className="absolute mix-blend-overlay"
      />
      <div className="absolute inset-0 bg-green-900 opacity-80"></div>
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between">
        <div className="text-white md:w-1/2 lg:w-1/3">
          <div className="flex items-center">
            <Image
              src="/AGI.png"
              alt="Nue Logo"
              width={80}
              height={80}
            />
            <h1 className="text-4xl font-bold ml-2">nue</h1>
          </div>
          <p className="text-xl mt-4 font-semibold">Simple, Honest. Nue.</p>
          <div className="mt-6">
            <p className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              Jubilee Hills, Hyderabad
            </p>
            <p className="flex items-center mt-2">
              <FaClock className="mr-2" />
              9AM-10PM
            </p>
          </div>
          <button className="bg-green-300 text-green-900 px-6 py-3 rounded-full mt-8 hover:bg-green-400 transition duration-300">
            ORDER ONLINE &gt;&gt;
          </button>
        </div>
        <div className="md:w-1/2 lg:w-1/2">
          {/* You can add a more relevant image here if needed */}
          {/*  <Image*/}
          {/*    src="/food-image.jpg"*/}
          {/*    alt="Food Image"*/}
          {/*    width={600}*/}
          {/*    height={400}*/}
          {/*    className="rounded-lg shadow-xl"*/}
          {/*  />*/}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
