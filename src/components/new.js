// pages/index.js
"use client";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Header */}
      <header className="bg-[#1A0C0C] text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="Hanzo Logo"
                width={100}
                height={32}
                className="mr-2"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="font-medium">
                HOME
              </a>
              <a href="#" className="font-medium">
                ABOUT
              </a>
              <a href="#" className="font-medium">
                MENU
              </a>
              <a href="#" className="font-medium">
                CONTACT
              </a>
            </nav>

            {/* CTA Button */}
            <div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-bold">
                Franchise
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <nav className="flex flex-col space-y-4">
                <a href="#" className="font-medium">
                  HOME
                </a>
                <a href="#" className="font-medium">
                  ABOUT
                </a>
                <a href="#" className="font-medium">
                  MENU
                </a>
                <a href="#" className="font-medium">
                  CONTACT
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-[#1A0C0C] text-white">
        <div className="container  flex mx-auto px-4 pt-16 pb-32 relative z-10">
          <div className="max-w-2xl mx-auto text-left mb-16">
            <h1 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">
              Relive the Taste of Tradition !
            </h1>
            <p className="text-lg mb-8">
              We make the best Kodi (Chicken) Pulao, crafted with time-honored
              recipes and the finest ingredients.
            </p>

            <p className="mb-6">Take Away | Dine In | Franchise Opportunity</p>
            <div className="flex flex-row items-center gap-4">
              <button className="bg-amber-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium">
                VIEW OUR MENU
              </button>
              {/* Replace with your social media icons/links */}
              <a href="#" className="hover:opacity-75">
                <Image src="/ig.svg" alt="Instagram" width={30} height={30} />
              </a>
              <a href="#" className="hover:opacity-75">
                <Image src="/fb.svg" alt="Facebook" width={30} height={30} />
              </a>
              <a href="#" className="hover:opacity-75 ">
                <Image src="/yt.svg" alt="YouTube" width={30} height={30} />
              </a>
            </div>
          </div>
          <div className="relative max-w-lg mx-auto">
            <Image
              src="/cbhero.png"
              alt="Delicious Sushi"
              width={500}
              height={300}
              className="rounded-lg mx-auto"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30"></div>
      </section>

      {/* Partners Section */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="flex items-center">
              <div className="w-6 h-6 mr-2 rounded-full bg-gray-300"></div>
              <span className="text-gray-700">LogoIpsum</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 mr-2 rounded-full bg-gray-300"></div>
              <span className="text-gray-700">HappyEaters</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 mr-2 rounded-full bg-gray-300"></div>
              <span className="text-gray-700">MagicSpoon</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 mr-2 rounded-full bg-gray-300"></div>
              <span className="text-gray-700">优质食品</span>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="relative">
                <Image
                  src="/sushi-plate2.jpg"
                  alt="Assorted Sushi"
                  width={500}
                  height={500}
                  className="rounded-lg"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="max-w-lg">
                <div className="flex items-center mb-4">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  <span className="text-orange-500 uppercase text-sm font-medium">
                    ASIAN CUISINE & FOOD
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif mb-6">
                  Immerse yourself in an asian experience
                </h2>
                Our journey began in{" "}
                <span className="font-semibold text-gray-900">Kakinada</span>,
                where we set out to craft the most authentic and flavorful
                <span className="font-semibold text-gray-900">
                  {" "}
                  Kodi (Chicken) Pulao
                </span>
                . With a commitment to tradition and taste, we have grown into
                multiple branches, bringing the nostalgic flavors of our beloved
                dish to more people.
                <p className="text-gray-600 mb-8">
                  Our passion is to provide the freshest seafood, expertly
                  prepared and beautifully presented. We have earned our
                  reputation with exceptional service and artful dishes.
                </p>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium">
                  VIEW OUR MENU
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Food Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex items-center mb-4 justify-center">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
              <span className="text-orange-500 uppercase text-sm font-medium">
                WHAT WE OFFER
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-center">
              Immerse yourself in an experience
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <Image
                  src="/soup.jpg"
                  alt="Soup & Ramen"
                  width={300}
                  height={200}
                  className="rounded-lg mb-4"
                />
                <h3 className="text-xl font-serif mb-2">Soup & Ramen</h3>
                <p className="text-gray-500">JAPANESE</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <Image
                  src="/sushi.jpg"
                  alt="Sushi & Sashimi"
                  width={300}
                  height={200}
                  className="rounded-lg mb-4"
                />
                <h3 className="text-xl font-serif mb-2">Sushi & Sashimi</h3>
                <p className="text-gray-500">JAPANESE</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <Image
                  src="/meat.jpg"
                  alt="Meat & Dishes"
                  width={300}
                  height={200}
                  className="rounded-lg mb-4"
                />
                <h3 className="text-xl font-serif mb-2">Meat & Dishes</h3>
                <p className="text-gray-500">JAPANESE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-8">
              Famous sushi's
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex justify-between mb-3">
                  <div>
                    <h3 className="font-medium">Philadelphia roll</h3>
                    <p className="text-gray-500 text-sm">
                      Salmon, cream cheese, cucumber
                    </p>
                  </div>
                  <div className="font-medium">$12.75</div>
                </div>

                <div className="flex justify-between mb-3">
                  <div>
                    <h3 className="font-medium">California roll</h3>
                    <p className="text-gray-500 text-sm">
                      Crab, avocado, cucumber
                    </p>
                  </div>
                  <div className="font-medium">$10.25</div>
                </div>

                <div className="flex justify-between mb-3">
                  <div>
                    <h3 className="font-medium">Spicy tuna roll</h3>
                    <p className="text-gray-500 text-sm">
                      Tuna, spicy mayo, cucumber
                    </p>
                  </div>
                  <div className="font-medium">$11.95</div>
                </div>

                <div className="flex justify-between mb-3">
                  <div>
                    <h3 className="font-medium">Tokyo maki</h3>
                    <p className="text-gray-500 text-sm">
                      Tuna, mayo, salmon, avocado
                    </p>
                  </div>
                  <div className="font-medium">$13.50</div>
                </div>
              </div>

              <div className="relative">
                <Image
                  src="/special-sushi.jpg"
                  alt="Special Sushi Rolls"
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-8">
              Sea fish & dishes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:order-2">
                <div className="flex justify-between mb-3">
                  <div>
                    <h3 className="font-medium">Crispy rice dishes</h3>
                    <p className="text-gray-500 text-sm">
                      Crispy rice, Yellowtail, Yuzu
                    </p>
                  </div>
                  <div className="font-medium">$16.25</div>
                </div>

                <div className="flex justify-between mb-3">
                  <div>
                    <h3 className="font-medium">Deep Blue steak</h3>
                    <p className="text-gray-500 text-sm">
                      Tuna steak, Wasabi, Yuzu
                    </p>
                  </div>
                  <div className="font-medium">$19.95</div>
                </div>

                <div className="flex justify-between mb-3">
                  <div>
                    <h3 className="font-medium">Scampi tempura</h3>
                    <p className="text-gray-500 text-sm">
                      Scampi, tempura batter
                    </p>
                  </div>
                  <div className="font-medium">$15.45</div>
                </div>

                <div className="flex justify-between mb-3">
                  <div>
                    <h3 className="font-medium">Wild salmon</h3>
                    <p className="text-gray-500 text-sm">
                      Fresh, sesame, ponzu sauce
                    </p>
                  </div>
                  <div className="font-medium">$18.95</div>
                </div>
              </div>

              <div className="relative md:order-1">
                <Image
                  src="/seafood.jpg"
                  alt="Sea Food"
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chef Section */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="max-w-lg">
                <div className="flex items-center mb-4">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  <span className="text-white uppercase text-sm font-medium">
                    OUR AWESOME CHEF
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif mb-6">
                  "Authentic sushi and rolls, expertly crafted with care,
                  tradition, and exceptional flavors"
                </h2>
                <div className="flex items-center">
                  <p className="font-medium">Shuhei T. Morgan</p>
                  <span className="mx-2">|</span>
                  <p>Head Chef</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <Image
                  src="/chef.jpg"
                  alt="Head Chef"
                  width={500}
                  height={500}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex items-center mb-4 justify-center">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
              <span className="text-orange-500 uppercase text-sm font-medium">
                BLOGS & ARTICLES
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-center">
              Restaurant blog & update
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <Image
                src="/blog1.jpg"
                alt="Blog Post 1"
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-medium mb-2">
                  10 affordable hacks for home and beverages
                </h3>
                <a href="#" className="text-orange-500 font-medium">
                  Read More
                </a>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <Image
                src="/blog2.jpg"
                alt="Blog Post 2"
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-medium mb-2">
                  10 affordable hacks for home and beverages
                </h3>
                <a href="#" className="text-orange-500 font-medium">
                  Read More
                </a>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <Image
                src="/blog3.jpg"
                alt="Blog Post 3"
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-medium mb-2">
                  10 affordable hacks for home and beverages
                </h3>
                <a href="#" className="text-orange-500 font-medium">
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ramen Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="max-w-3xl text-center">
              <h2 className="text-3xl md:text-4xl font-serif mb-6">
                Timeless recipes to savor & enjoy
              </h2>
              <div className="flex items-center justify-center space-x-8">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-orange-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 110-12 6 6 0 010 12zm-1-5h2v2H9v-2zm0-4h2v2H9V7z"></path>
                  </svg>
                  <span>123 Sushi Street, Tokyo</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-orange-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                  <span>+123-456-7890</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p>Copyright © 2025 by HanzoSushi</p>
              </div>
              <div className="flex space-x-6">
                <a href="#">PRIVACY POLICY</a>
                <a href="#">COOKIES</a>
                <a href="#">FAQ</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
