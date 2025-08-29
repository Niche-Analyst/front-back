"use client";

import React from "react";
import { Link as ScrollLink } from "react-scroll";

const ProductDropdown = () => {
  return (
    <li className="relative font-semibold cursor-pointer group hover:text-orange-600 transition-colors">
      Product ▼
      <ul className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white rounded-md shadow-xl mt-2 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all w-48 text-black whitespace-nowrap">
        <li className="px-4 py-2 hover:bg-gray-100"><ScrollLink to="features" smooth duration={500}>Features</ScrollLink></li>
        <li className="px-4 py-2 hover:bg-gray-100"><ScrollLink to="howitworks" smooth duration={500}>How It Works</ScrollLink></li>
        <li className="px-4 py-2 hover:bg-gray-100"><ScrollLink to="pricing" smooth duration={500}>Pricing</ScrollLink></li>
        <li className="px-4 py-2 hover:bg-gray-100"><ScrollLink to="integrations" smooth duration={500}>Integrations</ScrollLink></li>
        <li className="px-4 py-2 hover:bg-gray-100"><ScrollLink to="demo" smooth duration={500}>Demo</ScrollLink></li>
        <li className="px-4 py-2 hover:bg-gray-100"><ScrollLink to="roadmap" smooth duration={500}>Roadmap</ScrollLink></li>
      </ul>
    </li>
  );
};

export default ProductDropdown;