// front/components/layout/NavBar.tsx

"use client";

import React from "react";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";
import ProductDropdown from "../domain/home/ProductDropdown";
import WhyUsDropdown from "../domain/home/WhyUsDropdown";

const NavBar = () => {
  return (
    <nav className="fixed top-0 w-full bg-transparent text-black h-16 flex items-center justify-center px-10 shadow-lg border-b border-gray-300/50 z-50">
      <div className="flex w-full items-center justify-center space-x-16">
        <ul className="flex gap-16 list-none m-0 p-0 items-center">
          <ProductDropdown />
          <WhyUsDropdown />

          <li className="font-semibold cursor-pointer hover:text-orange-600 transition-colors">
            <ScrollLink to="contact" smooth duration={500}>
              Contact
            </ScrollLink>
          </li>
        </ul>

        {/* 👇 href를 '/auth/signin'으로 변경 */}
        <Link href="/auth/signin">
          <button className="px-5 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 hover:scale-105 hover:shadow-md transition-transform cursor-pointer">
            Get Started
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;