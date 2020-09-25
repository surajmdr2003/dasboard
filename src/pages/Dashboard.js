import React, { Fragment } from 'react';

/** Components */
import HeaderMain from '../components/HeaderMain';
import AllCampaingsData from '../components/AllCampaingsData';
import YourCampaigns from '../components/YourCampaigns';
import TopCreatives from '../components/TopCreatives';
import TopLandingPages from '../components/TopLandingPages';
import Footer from '../components/Footer';
import PageTitleWithOutFilter from '../components/PageTitleWithOutFilter';

const Dashboard = () => {
    return (
        <Fragment>
            <HeaderMain />
            <div className="main-container">
                <PageTitleWithOutFilter title="Account Overview" />
                <AllCampaingsData />
                <YourCampaigns />
                <TopCreatives />
                <TopLandingPages />
            </div>
            <Footer />
        </Fragment>
    );
};

export default Dashboard;