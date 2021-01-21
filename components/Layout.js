import React from "react";

import Navbar from "./Navbar";
const Layout = ({ isDarkModeSet, children, darkMode, setDarkMode }) => {
  return (
    <>
      <Navbar
        isDarkModeSet={isDarkModeSet}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      {children}
    </>
  );
};

export default Layout;
