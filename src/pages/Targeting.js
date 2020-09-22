import React, { Fragment } from 'react';

/** Components */
import HeaderMain from '../components/HeaderMain';
import Footer from '../components/Footer';
import PageTitleWithFilter from '../components/PageTitleWithFilter';
import TopTargets from '../components/TopTargets';

const Targeting = () => {
    return (
        <Fragment>
            <HeaderMain />
            <div className="main-container">
                <PageTitleWithFilter/>
                <TopTargets />
            </div>
            <Footer />
        </Fragment>
    );
};

export default Targeting;