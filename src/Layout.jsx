import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default Layout;
