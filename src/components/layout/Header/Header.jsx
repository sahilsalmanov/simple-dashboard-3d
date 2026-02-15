import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent hover:from-gray-700 hover:to-gray-500 transition-all duration-300">
              Simple Dashboard 3D
            </NavLink>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            <NavLink
              to="/designers"
              className={({ isEmployed }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isEmployed
                    ? "bg-gray-900 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              Designers
            </NavLink>
            <NavLink
              to="/editor"
              className={({ isEmployed }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isEmployed
                    ? "bg-gray-900 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              Editor
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;