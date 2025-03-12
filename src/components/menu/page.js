"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const sectionRefs = useRef({});
  const [showQRCode, setShowQRCode] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Add to cart function with animation feedback
  const addToCart = (productId) => {
    const existingItem = cart.find((item) => item.productId === productId);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { productId: productId, quantity: 1 }]);
    }

    // Show brief visual feedback (could add animation here)
    const product = products.find((p) => p._id === productId);
    if (product) {
      // Could add toast notification here
    }
  };

  // Function to decrement quantity
  const decrementCart = (productId) => {
    const existingItem = cart.find((item) => item.productId === productId);
    if (!existingItem) return;

    if (existingItem.quantity === 1) {
      setCart(cart.filter((item) => item.productId !== productId));
    } else {
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

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("restaurantCart", JSON.stringify(cart));
  }, [cart]);

  // Load cart from localStorage on initial load
  useEffect(() => {
    const savedCart = localStorage.getItem("restaurantCart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing saved cart:", e);
      }
    }
  }, []);

  // Calculate total cart count for the nav bar display
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Calculate Subtotal
  const subtotal = cart.reduce((total, item) => {
    const product = products.find((p) => p._id === item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  // Format currency helper
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Function to toggle cart modal
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    // Close search if open
    if (showSearch) setShowSearch(false);
  };

  // Toggle search interface
  const toggleSearch = () => {
    setShowSearch(!showSearch);
    // Close cart if open
    if (isCartOpen) setIsCartOpen(false);
  };

  // Function to handle checkout
  const handleCheckout = () => {
    if (cart.length === 0) return;
    setShowQRCode(true);
  };

  // Reset checkout
  const resetCheckout = () => {
    setShowQRCode(false);
  };

  // Clear entire cart
  const clearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      setCart([]);
      setShowQRCode(false);
    }
  };

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          axios.get("/api/categories"),
          axios.get("/api/products"),
        ]);

        const sortedCategories = categoriesResponse.data.sort(
          (a, b) => a.order - b.order
        );
        setCategories(sortedCategories);
        setProducts(productsResponse.data);

        // Set initial active category
        if (sortedCategories.length > 0) {
          setActiveCategory(sortedCategories[0]._id);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message || "Failed to load menu data");
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
      setActiveCategory(categoryId);
    }
  };

  // Handle scroll events to update active category
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      // Find the section that is currently in view
      for (const categoryId in sectionRefs.current) {
        const element = sectionRefs.current[categoryId];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveCategory(categoryId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [categories]);

  // Filter products based on search
  const filteredProducts =
    searchQuery.trim() !== ""
      ? products.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase())
        )
      : products;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f4f4f0]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-lg">Loading menu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f4f4f0]">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-lg">
          <svg
            className="h-16 w-16 text-red-500 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h2 className="text-xl font-bold mt-4">Unable to Load Menu</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            className="mt-4 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition duration-300"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans antialiased text-gray-900">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Hamburger Menu */}
          <div className="text-gray-800 text-xl font-semibold cursor-pointer">
            ☰
          </div>

          {/* Logo */}
          <div>
            <img alt="Restaurant logo" src="/AGI.png" className="h-16" />
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            {/* Search Icon */}
            <div className="cursor-pointer" onClick={toggleSearch}>
              <svg
                className="h-6 w-6 text-gray-600 hover:text-green-500 transition-colors"
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
            </div>

            {/* Cart Icon */}
            <div className="relative" onClick={toggleCart}>
              <svg
                className="h-6 w-6 text-gray-600 hover:text-green-500 transition-colors cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
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

        {/* Search Bar (Expandable) */}
        {showSearch && (
          <div className="bg-white p-4 border-t border-gray-200 shadow-md">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search menu items..."
                className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                  onClick={() => setSearchQuery("")}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Cart Modal */}
      {isCartOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/50 flex z-50"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className={`bg-white h-full w-96 shadow-xl transform transition-transform duration-300 ease-in-out ml-auto overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-green-50 py-4 px-6 flex justify-between items-center border-b border-gray-200">
              <h2 className="text-lg font-semibold">Your Bag ({cartCount})</h2>
              <button
                className="text-gray-600 hover:text-gray-800 h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-200"
                onClick={() => setIsCartOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Cart Items */}
            <div
              className="overflow-y-auto"
              style={{ height: showQRCode ? "30vh" : "calc(100vh - 220px)" }}
            >
              {cart.length === 0 ? (
                <div className="p-8 text-center">
                  <svg
                    className="h-16 w-16 text-gray-400 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    ></path>
                  </svg>
                  <p className="mt-4 text-gray-600">Your cart is empty</p>
                  <button
                    className="mt-4 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition duration-300"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {cart.map((item) => {
                    const product = products.find(
                      (p) => p._id === item.productId
                    );
                    return (
                      product && (
                        <li
                          key={item.productId}
                          className="px-6 py-4 flex items-center justify-between"
                        >
                          <div className="flex flex-col flex-grow mr-4">
                            <span className="font-medium">{product.name}</span>
                            <span className="text-green-600 font-medium">
                              {formatCurrency(product.price)}
                            </span>
                          </div>

                          <div className="flex items-center">
                            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                              <button
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-1 px-3 transition-colors"
                                onClick={() => decrementCart(product._id)}
                              >
                                −
                              </button>
                              <span className="bg-white text-gray-700 font-medium py-1 px-3 min-w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-1 px-3 transition-colors"
                                onClick={() => addToCart(product._id)}
                              >
                                +
                              </button>
                            </div>

                            <button
                              className="ml-3 text-gray-400 hover:text-red-500"
                              onClick={() => removeFromCart(item.productId)}
                              aria-label="Remove item"
                            >
                              ✕
                            </button>
                          </div>
                        </li>
                      )
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Checkout Section */}
            {cart.length > 0 && (
              <div className="border-t border-gray-200">
                {/* Subtotal */}
                <div className="px-6 py-4 flex justify-between font-semibold bg-green-50">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>

                {/* Clear Cart Button */}
                {!showQRCode && (
                  <div className="px-6 pt-2 text-right">
                    <button
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </button>
                  </div>
                )}

                {/* QR Code or Checkout Button */}
                <div className="p-6 flex flex-col items-center">
                  {showQRCode ? (
                    <div className="text-center">
                      <div className="bg-white p-4 rounded-lg shadow-md inline-block">
                        <QRCodeCanvas
                          value={JSON.stringify({
                            orderId: Date.now().toString(36),
                            items: cart.map((item) => {
                              const product = products.find(
                                (p) => p._id === item.productId
                              );
                              return {
                                id: item.productId,
                                name: product?.name,
                                price: product?.price,
                                quantity: item.quantity,
                              };
                            }),
                            total: subtotal,
                          })}
                          size={180}
                          level="H"
                          includeMargin={true}
                        />
                      </div>
                      <p className="mt-4 text-sm text-gray-600">
                        Scan this QR code to process your payment
                      </p>
                      <button
                        className="mt-4 text-green-600 hover:text-green-800 font-medium"
                        onClick={resetCheckout}
                      >
                        Back to Cart
                      </button>
                    </div>
                  ) : (
                    <button
                      className={`bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-md w-full transition duration-300 ${
                        cart.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={handleCheckout}
                      disabled={cart.length === 0}
                    >
                      Continue to Checkout
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl bg-[#f4f4f0] mx-auto flex min-h-screen">
        {/* Sticky Left Column: Categories */}
        <div className="w-1/4 bg-white border-r border-gray-200 h-screen sticky  top-20 overflow-y-auto shadow-md hidden md:block">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-6 uppercase text-gray-700 border-b pb-2">
              Menu
            </h2>
            <ul className="space-y-1">
              {categories.map((category) => (
                <li
                  key={category._id}
                  className={`py-2.5 px-4 cursor-pointer rounded-md transition-colors ${
                    activeCategory === category._id
                      ? "bg-green-100 text-green-700 font-medium"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => scrollToCategory(category._id)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile Categories (Horizontal Scroll) */}
        <div className="md:hidden sticky top-22 z-10 w-full bg-white shadow-md overflow-x-auto whitespace-nowrap py-3 px-4 border-b border-gray-200">
          {categories.map((category) => (
            <button
              key={category._id}
              className={`mr-4 py-1 px-4 rounded-full ${
                activeCategory === category._id
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => scrollToCategory(category._id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Scrollable Right Column: Menu Items */}
        <div className="w-full md:w-3/4 p-6 overflow-y-auto">
          {/* Search Results (if searching) */}
          {searchQuery.trim() !== "" && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">
                Search Results for {searchQuery}
              </h2>

              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <p className="text-gray-600">
                    No items found matching your search.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product._id}
                      className="bg-white rounded-lg shadow-md overflow-hidden flex justify-between transition-transform hover:scale-[1.02] duration-300"
                    >
                      <div className="p-4 flex-grow">
                        <h3 className="text-lg font-semibold">
                          {product.name}
                        </h3>
                        {product.description && (
                          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                            {product.description}
                          </p>
                        )}
                        <p className="text-green-600 font-medium mt-2">
                          {formatCurrency(product.price)}
                        </p>

                        {/* Add/Remove Buttons */}
                        {getQuantityInCart(product._id) === 0 ? (
                          <button
                            className="mt-3 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                            onClick={() => addToCart(product._id)}
                          >
                            Add to Cart
                          </button>
                        ) : (
                          <div className="flex items-center mt-3">
                            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                              <button
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-1 px-3 transition-colors"
                                onClick={() => decrementCart(product._id)}
                              >
                                −
                              </button>
                              <span className="bg-white text-gray-700 font-medium py-1 px-3 min-w-8 text-center">
                                {getQuantityInCart(product._id)}
                              </span>
                              <button
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-1 px-3 transition-colors"
                                onClick={() => addToCart(product._id)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {product.img && (
                        <div className="w-24 h-24 sm:w-32 sm:h-32 relative flex-shrink-0">
                          <img
                            src={product.img}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Categories and Products (normal view) */}
          {searchQuery.trim() === "" &&
            categories.map((category) => (
              <div
                key={category._id}
                ref={(el) => (sectionRefs.current[category._id] = el)}
                className="mb-12"
                id={`category-${category._id}`}
              >
                <h2 className="text-2xl font-bold mb-6 text-green-700 capitalize">
                  {category.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {products
                    .filter((product) =>
                      product.categories.some((cat) => cat._id === category._id)
                    )
                    .map((product) => (
                      <div
                        key={product._id}
                        className="bg-white rounded-lg shadow-md overflow-hidden flex justify-between transition-transform hover:scale-[1.02] duration-300"
                      >
                        <div className="p-4 flex-grow">
                          <h3 className="text-lg font-semibold">
                            {product.name}
                          </h3>
                          {product.description && (
                            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                              {product.description}
                            </p>
                          )}
                          <p className="text-green-600 font-medium mt-2">
                            {formatCurrency(product.price)}
                          </p>
                        </div>
                        <div>
                          {product.img && (
                            <div className="w-24 h-24 sm:w-32 sm:h-32 relative flex-shrink-0">
                              <img
                                src={product.img}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          {/* Add/Remove Buttons */}
                          {getQuantityInCart(product._id) === 0 ? (
                            <button
                              className="mt-3 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                              onClick={() => addToCart(product._id)}
                            >
                              Add to Cart
                            </button>
                          ) : (
                            <div className="flex items-center mt-3">
                              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                                <button
                                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-1 px-3 transition-colors"
                                  onClick={() => decrementCart(product._id)}
                                >
                                  −
                                </button>
                                <span className="bg-white text-gray-700 font-medium py-1 px-3 min-w-8 text-center">
                                  {getQuantityInCart(product._id)}
                                </span>
                                <button
                                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-1 px-3 transition-colors"
                                  onClick={() => addToCart(product._id)}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}

          {/* No products message */}
          {categories.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600">
                No menu items available. Please check back later.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
