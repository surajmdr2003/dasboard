import React from 'react';
import Logo from './Logo';

const HeaderLogin = () => {
  return (
    <header className="main-header">
      <a href="https://rainlocal.com/" className="home-link"><i className="icon-caret-left" /></a>
      <nav className="navbar navbar-expand-lg container">
        <Logo />
      </nav>
    </header>
  );
};

export default HeaderLogin;
