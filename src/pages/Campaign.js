import React, { Fragment } from 'react';

/** Components */
import HeaderMain from '../components/HeaderMain';
import SingleCampaingsData from '../components/SingleCampaingsData';
import TopCreatives from '../components/TopCreatives';
import TopLandingPages from '../components/TopLandingPages';
import TopTargets from '../components/TopTargets';
import Footer from '../components/Footer';
import PageTitleWithFilter from '../components/PageTitleWithFilter';

const Campaign = () => {
    return (
        <Fragment>
            <HeaderMain />
            <div className="main-container">
                <PageTitleWithFilter reportUrl="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"/>
                <SingleCampaingsData />
                <TopCreatives />
                <TopLandingPages />
                <TopTargets />
            </div>
            <Footer />
        </Fragment>
    );
};

export default Campaign;