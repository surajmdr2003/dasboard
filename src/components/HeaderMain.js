import React from 'react';
import Logo from './Logo';
import Navigation from './Navigation';

const HeaderMain = () => {
  return (
    <header className="main-header">
      <nav className="navbar navbar-expand-lg">
        <Logo />
        <Navigation/>
      </nav>
    </header>
  );
};

export default HeaderMain;
