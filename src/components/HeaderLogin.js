import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const HeaderLogin = () => {
  return (
    <header className="main-header">
      <Link to="/" className="home-link"><i className="icon-caret-left" /></Link>
      <nav className="navbar navbar-expand-lg container">
        <Logo />
      </nav>
    </header>
  );
};

export default HeaderLogin;
