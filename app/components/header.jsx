import { Link } from "@remix-run/react";

import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Logo / Title */}
        <h1 className="text-3xl font-bold tracking-wide">
          <span className="text-gray-300 text-bold">PC-NEXUS</span>
        </h1>

        {/* Navigation */}
        <nav className="flex space-x-6 text-lg">
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 text-lg">
            <Link to="/" className="hover:text-gray-300 transition">
              Home
            </Link>
            <Link to="/products" className="hover:text-gray-300 transition">
              Products
            </Link>
            <Link to="/manage" className="hover:text-gray-300 transition">Manage Products</Link>

            <Link to="/test" className="hover:text-gray-300 transition">
              Contact
            </Link>

            <Link to="/test2" className="hover:text-gray-300 transition">
              Contact1
            </Link>
          </div>

          {/* Mobile Navigation - Hamburger Menu */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black text-white py-4 px-6 space-y-4">
          <Link to="/" className="hover:text-gray-300 transition block">
            Home
          </Link>
          <Link to="/products" className="hover:text-gray-300 transition block">
            Products
          </Link>
          <Link to="#" className="hover:text-gray-300 transition block">
            About
          </Link>
          <Link to="#" className="hover:text-gray-300 transition block">
            Contact
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
