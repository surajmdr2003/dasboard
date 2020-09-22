import React, { Fragment } from 'react';

import HeaderMain from '../components/HeaderMain';
import PageTitleWithFilter from '../components/PageTitleWithFilter';
import Footer from '../components/Footer';
import CreativesTableData from '../components/CreativesTableData';

const Campaign = () => {
    return (
        <Fragment>
            <HeaderMain />
            <div className="main-container">
                <PageTitleWithFilter hasFilter={true}/>
                <CreativesTableData />
            </div>
            <Footer />
        </Fragment>
    );
};

export default Campaign;