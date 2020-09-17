import React, { Fragment } from 'react';

/** Components */
import HeaderMain from '../components/HeaderMain';
import AllCampaingsData from '../components/AllCampaingsData';
import YourCampaigns from '../components/YourCampaigns';
import TopCreatives from '../components/TopCreatives';
import TopLandingPages from '../components/TopLandingPages';
import TopTargets from '../components/TopTargets';
import Footer from '../components/Footer';
import PageTitleWithFilter from '../components/PageTitleWithFilter';

const Dashboard = () => {
    return (
        <Fragment>
            <HeaderMain />
            <div className="main-container">
                <PageTitleWithFilter />
                <AllCampaingsData />
                <YourCampaigns />
                <TopCreatives />
                <TopLandingPages />
                <TopTargets />
            </div>
            <Footer />
        </Fragment>
    );
};

export default Dashboard;