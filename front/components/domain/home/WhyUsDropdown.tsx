"use client";

import React from "react";
import { Link as ScrollLink } from "react-scroll";

const WhyUsDropdown = () => {
  return (
    <li className="relative font-semibold cursor-pointer group hover:text-orange-600 transition-colors">
      Why Us ▼
      <ul className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white rounded-md shadow-xl mt-2 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all w-48 text-black whitespace-nowrap">
        <li className="px-4 py-2 hover:bg-gray-100"><ScrollLink to="team" smooth duration={500}>Team</ScrollLink></li>
        <li className="px-4 py-2 hover:bg-gray-100"><ScrollLink to="mission" smooth duration={500}>Mission</ScrollLink></li>
        <li className="px-4 py-2 hover:bg-gray-100"><ScrollLink to="ourpromise" smooth duration={500}>Our Promise</ScrollLink></li>
        <li className="px-4 py-2 hover:bg-gray-100"><ScrollLink to="values" smooth duration={500}>Values</ScrollLink></li>
      </ul>
    </li>
  );
};

export default WhyUsDropdown;