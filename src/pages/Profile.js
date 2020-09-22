import React, { Fragment } from 'react';

/** Components */
import HeaderMain from '../components/HeaderMain';
import Footer from '../components/Footer';
import PageTitleWithOutFilter from '../components/PageTitleWithOutFilter';

const Profile = () => {
    return (
        <Fragment>
            <HeaderMain />
            <div className="main-container">
                <PageTitleWithOutFilter/>
                <section className="profile-content">
                    <div className="container">
                        <div className="row">
                            <div className="offset-md-2 col-md-8">
                                <div className="content-block">
                                    <div className="content-block-title">
                                        Your profile
                                    </div>
                                    <div className="content-block-body">
                                        <ul className="list-unstyled content-list">
                                            <li>
                                                <div className="media">
                                                    <span className="icon-box md-box icon-profile">
                                                        <img src="./assets/images/avatar.png" alt="company logo"/>
                                                    </span>
                                                    <div className="media-body">
                                                        <h5>Midfirst Banl</h5>
                                                        <p>info@midfirstbank.com | +1 (213) 393-3010 <br/> 1419 Westwood Blvd, Los Angles CA</p>
                                                        <a href="#" className="btn-link">Edit Info</a>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="media">
                                                    <span className="icon-box md-box">
                                                        <i className="icon-campaign"></i>
                                                    </span>
                                                    <div className="media-body">
                                                        <h5>Campaigns</h5>
                                                        <ul className="campaigns-datas nav">
                                                            <li>
                                                                12 total campaigns
                                                            </li>
                                                            <li className="active-campaigns">
                                                                5 Active
                                                            </li>
                                                            <li className="inactive-campaigns">
                                                                3 Inactive
                                                            </li>
                                                            <li className="paused-campaigns">
                                                                4 Paused
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="media">
                                                    <span className="icon-box md-box">
                                                        <i className="icon-card"></i>
                                                    </span>
                                                    <div className="media-body">
                                                        <h5>Payments</h5>
                                                        <p>
                                                            <img src="./assets/images/paypal-logo.png" className="paypal-logo" alt="paypal icon"/> <br/>
                                                            payment@midfirst.com | Added on 12th Jan 2020
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="media">
                                                    <span className="icon-box md-box icon-billing">
                                                        <i className="icon-report"></i>
                                                    </span>
                                                    <div className="media-body">
                                                        <h5>Billing History</h5>
                                                        <p>12 bills raised <br/>Last billed on 14th Aug 2020 | Next bill on 14th Sep 2020</p>
                                                        <a href="#" className="btn-link">View Receipts</a>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </Fragment>
    );
};

export default Profile;