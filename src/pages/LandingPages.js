import React, { Fragment } from 'react';

/** Components */
import HeaderMain from '../components/HeaderMain';
import TopLandingPages from '../components/TopLandingPages';
import Footer from '../components/Footer';
import PageTitleWithFilter from '../components/PageTitleWithFilter';

const LandingPages = () => {
    return (
        <Fragment>
            <HeaderMain />
            <div className="main-container">
                <PageTitleWithFilter/>
                <TopLandingPages />
            </div>
            <Footer />
        </Fragment>
    );
};

export default LandingPages;