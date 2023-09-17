import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black h-screen">
      <div className="absolute inset-0 backdrop-blur-lg bg-opacity-80"></div>
      <div className="relative z-10 flex flex-col  h-screen">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
