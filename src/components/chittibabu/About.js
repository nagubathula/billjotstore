import React from 'react'

export default function About() {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-5">
        <div className="max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our journey began in <span className="font-semibold text-gray-900">Kakinada</span>, where we set out to craft the most authentic and flavorful
            <span className="font-semibold text-gray-900"> Kodi (Chicken) Pulao</span>. With a commitment to tradition and taste, we have grown into
            multiple branches, bringing the nostalgic flavors of our beloved dish to more people.
          </p>
          <p className="mt-4 text-lg text-gray-700 leading-relaxed">
            Whether you choose to <span className="font-semibold text-gray-900">dine in</span> with us, enjoy a <span className="font-semibold text-gray-900">takeaway</span>, or
            explore <span className="font-semibold text-gray-900">franchise opportunities</span>, we promise an unforgettable culinary experience that
            stays true to our roots.
          </p>
        </div>
      </div>
    );
  }
  