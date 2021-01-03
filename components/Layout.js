import React from "react";

import Navbar from "./Navbar";
const Layout = ({ children, darkMode, setDarkMode }) => {
  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      {children}
    </>
  );
};

export default Layout;
