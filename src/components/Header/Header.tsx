"use client";
import React from "react";
import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";

const Header: React.FC = () => {
  return (
    <header>
      {/* Masaüstü Navbar - 768px ve üzeri ekranlarda görünür */}
      <Navbar />
      {/* Mobil Navbar - 768px altı ekranlarda görünür */}
      <MobileNavbar />
    </header>
  );
};

export default Header;
