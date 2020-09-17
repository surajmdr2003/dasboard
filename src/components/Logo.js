import React from 'react';
import { Link } from 'react-router-dom';

const logo = [
    './assets/images/rain-horizontal.png',
    './assets/images/rain-horizontal@2x.png'
]

const Logo = () => {
    return (
        <Link className="navbar-brand mr-auto" to="/">
            <img src={logo[0]} alt="rain horizontal logo" srcSet={`${logo[0]} 1x, ${logo[1]} 2x`} />
        </Link>
    );
};

export default Logo;