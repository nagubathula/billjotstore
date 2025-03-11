"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionRefs = useRef({});
  const [showQRCode, setShowQRCode] = useState(false);

  // Cart State:  An array of objects, each with productId and quantity
  const [cart, setCart] = useState([]);

  // Cart Modal State
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Function to add to cart or increment quantity
  const addToCart = (productId) => {
    const existingItem = cart.find((item) => item.productId === productId);
    if (existingItem) {
      // Increment quantity if already in cart
      setCart(
        cart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Add to cart with quantity 1
      setCart([...cart, { productId: productId, quantity: 1 }]);
    }
  };

  // Function to decrement quantity
  const decrementCart = (productId) => {
    const existingItem = cart.find((item) => item.productId === productId);
    if (!existingItem) return; // Should not happen, but check anyway

    if (existingItem.quantity === 1) {
      // Remove from cart if quantity is 1
      setCart(cart.filter((item) => item.productId !== productId));
    } else {
      // Decrement quantity
      setCart(
        cart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  // Function to remove item from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.productId !== productId));
  };

  // Function to get the quantity of a product in the cart
  const getQuantityInCart = (productId) => {
    const item = cart.find((item) => item.productId === productId);
    return item ? item.quantity : 0;
  };

  // Calculate total cart count for the nav bar display
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Calculate Subtotal
  const subtotal = cart.reduce((total, item) => {
    const product = products.find((p) => p._id === item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  // Function to toggle cart modal
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Function to handle checkout
  const handleCheckout = () => {
    setShowQRCode(true);
  };

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          axios.get("/api/categories"),
          axios.get("/api/products"),
        ]);

        setCategories(categoriesResponse.data);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  const scrollToCategory = (categoryId) => {
    if (sectionRefs.current[categoryId]) {
      sectionRefs.current[categoryId].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4">Error: {error}</div>;

  return (
    <div className="font-sans antialiased bg-gray-50 text-gray-900">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          {/* Hamburger Menu (You can add functionality here) */}
          <div className="text-gray-800 text-xl font-semibold">☰</div>

          {/* Logo (Replace with your logo) */}
          <div>
            <span className="text-green-500 text-lg font-bold">YourLogo</span>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center">
            {/* Search Icon (Add functionality here) */}
            <svg
              className="h-6 w-6 text-gray-600 mr-4 cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <div className="relative">
              <svg
                className="h-6 w-6 text-gray-600 cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                onClick={toggleCart} // Open cart on click
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2.2M7 16a4 4 0 01-.8 8H5.1a4 4 0 01-8-4M7 16H4m7 8a4 4 0 01-8-4m-4+2l4.229 1.409M5 21l4.229 1.409"
                ></path>
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center transform translate-x-2 -translate-y-2">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex z-50">
          <div
            className={`bg-white h-full w-96 shadow-xl transform transition-transform duration-300 ease-in-out ml-auto ${
              isCartOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Header */}
            <div className="bg-gray-100 py-4 px-6 flex justify-between items-center border-b border-gray-200">
              <h2 className="text-lg font-semibold">Your Bag ({cartCount})</h2>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={toggleCart}
              >
                X
              </button>
            </div>

            {/* Cart Items */}
            <div
              className="p-6 overflow-y-auto"
              style={{ maxHeight: "calc(100vh - 150px)" }}
            >
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <ul>
                  {cart.map((item) => {
                    const product = products.find(
                      (p) => p._id === item.productId
                    );
                    return (
                      product && (
                        <li
                          key={item.productId}
                          className="flex items-center py-2 border-b border-gray-200"
                        >
                          <div className="flex items-center">
                            <button
                              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-l"
                              onClick={() => decrementCart(product._id)}
                            >
                              -
                            </button>
                            <span className="bg-gray-100 text-gray-700 font-semibold py-2 px-4">
                              {getQuantityInCart(product._id)}
                            </span>
                            <button
                              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-r"
                              onClick={() => addToCart(product._id)}
                            >
                              +
                            </button>
                          </div>
                          <span className="mr-4">{product.name}</span>
                          <span className="mr-4">
                            ₹{product.price * item.quantity}
                          </span>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => removeFromCart(item.productId)}
                          >
                            X
                          </button>
                        </li>
                      )
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Subtotal */}
            <div className="py-4 px-6 flex justify-between font-semibold border-t border-gray-200">
              <span>Subtotal:</span>
              <span>₹{subtotal}</span>
            </div>

            {/* Checkout Button */}
            <div className="py-4 px-6 flex flex-col items-center border-t border-gray-200">
              {showQRCode ? (
                <QRCodeCanvas value={JSON.stringify(cart)} size={200} />
              ) : (
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md w-full"
                  onClick={handleCheckout}
                >
                  Continue to Checkout
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto flex min-h-screen">
        {/* Sticky Left Column: Categories */}
        <div className="w-1/4 p-6 bg-gray-100 border-r border-gray-200 h-screen sticky top-0 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4 uppercase text-gray-700">
            Categories
          </h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li
                key={category._id}
                className="py-2 cursor-pointer hover:text-green-500 font-medium capitalize"
                onClick={() => scrollToCategory(category._id)}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Scrollable Right Column: Menu Items */}
        <div
          className="w-3/4 p-6 bg-white overflow-y-auto"
          style={{ maxHeight: "100vh" }}
        >
          {categories.map((category) => (
            <div
              key={category._id}
              ref={(el) => (sectionRefs.current[category._id] = el)}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold mb-6 text-green-700 capitalize">
                {category.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products
                  .filter((product) =>
                    product.categories.some((cat) => cat._id === category._id)
                  )
                  .map((product) => (
                    <div
                      key={product._id}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      {product.img && (
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <h3 className="text-lg font-semibold">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 font-medium">
                          ₹{product.price}
                        </p>

                        {/* Add/Remove Buttons */}
                        {getQuantityInCart(product._id) === 0 ? (
                          <button
                            className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => addToCart(product._id)}
                          >
                            ADD +
                          </button>
                        ) : (
                          <div className="flex items-center mt-4">
                            <button
                              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-l"
                              onClick={() => decrementCart(product._id)}
                            >
                              -
                            </button>
                            <span className="bg-gray-100 text-gray-700 font-semibold py-2 px-4">
                              {getQuantityInCart(product._id)}
                            </span>
                            <button
                              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-r"
                              onClick={() => addToCart(product._id)}
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
