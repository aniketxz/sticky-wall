import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <main className="bg-[#0f172a] h-screen">
      <Outlet />
    </main>
  );
};

export default Layout;
