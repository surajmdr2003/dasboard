import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <Fragment>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse primary-navigation" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li><Link to="./dashboard">Dashboard</Link></li>
                    <li className="menu-item-has-children"><Link to="./campaign">Campaigns</Link>
                        <div className="dropdown-full-width">
                            <div className="container">
                                <div className="row w-100">
                                    <div className="col-sm-2 br">
                                        <ul className="nav flex-column">
                                            <li className="nav-item"><Link to="#" className="nav-link">Active</Link></li>
                                            <li className="nav-item"><Link to="#" className="nav-link">Inactive</Link></li>
                                            <li className="nav-item"><Link to="#" className="nav-link btn-link">See All Campaigns</Link></li>
                                        </ul>
                                    </div>
                                    <div className="col-sm-2 br">
                                        <ul className="nav flex-column">
                                            <li className="nav-item"><Link to="#" className="nav-link">Campaign 1</Link></li>
                                            <li className="nav-item"><Link to="#" className="nav-link">Campaign 2</Link></li>
                                            <li className="nav-item"><Link to="#" className="nav-link">Campaign 3</Link></li>
                                            <li className="nav-item"><Link to="#" className="nav-link">Campaign 4</Link></li>
                                            <li className="nav-item"><Link to="#" className="nav-link">Campaign 5</Link></li>
                                        </ul>
                                    </div>
                                    <div className="col-sm-8 pt-4">
                                        <div className="pl-3 campaign-overview">
                                            <div className="overview-title">
                                                <h5>Overview of Campaign 1</h5>
                                                <p>Last 7 days</p>
                                            </div>
                                            <ul className="nav nav-pills nav-fill overview-detail">
                                                <li className="nav-item">
                                                    <div className="number">430,387</div>
                                                    <div className="title">Impressions</div>
                                                </li>
                                                <li className="nav-item active">
                                                    <div className="number">320</div>
                                                    <div className="title">Clicks</div>
                                                </li>
                                                <li className="nav-item">
                                                    <div className="number">1.9%</div>
                                                    <div className="title">CTR</div>
                                                </li>
                                                <li className="nav-item">
                                                    <div className="number">862</div>
                                                    <div className="title">Conversion</div>
                                                </li>
                                                <li className="nav-item">
                                                    <div className="number">4.2%</div>
                                                    <div className="title">Conv rate</div>
                                                </li>
                                            </ul>
                                            <Link to="#" className="btn-link">View Performance</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="menu-item-has-children"><Link to="./creatives">Creatives</Link>
                        <div className="dropdown-full-width">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-2 br">
                                        <ul className="nav flex-column">
                                            <li className="nav-item"><Link to="#" className="nav-link">Campaign 1</Link></li>
                                            <li className="nav-item"><Link to="#" className="nav-link">Campaign 2</Link></li>
                                            <li className="nav-item"><Link to="#" className="nav-link">Campaign 3</Link></li>
                                            <li className="nav-item"><Link to="#" className="nav-link">Campaign 4</Link></li>
                                            <li className="nav-item"><Link to="#" className="nav-link">Campaign 5</Link></li>
                                        </ul>
                                    </div>
                                    <div className="col-md-10 pt-4">
                                        <div className="pl-3 creatives-overview">
                                            <div className="overview-title">
                                                <h5>Top 5 Creatives
                                                    <Link to="#" className="btn-link">See All Campaigns</Link>
                                                </h5>
                                            </div>
                                            <ul className="row overview-detail">
                                                <li className="col">
                                                    <div className="card card-menu-creative">
                                                        <div className="card-creative-thumb">
                                                            <span className="badge badge-secondary">1200*462</span>
                                                            <img src="./assets/images/ads-1.png" alt="creative thumb" />
                                                        </div>
                                                        <div className="card-body">
                                                            <h5>MFB Fall Checking 2020 - RAZ AZ</h5>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="col">
                                                    <div className="card card-menu-creative">
                                                        <div className="card-creative-thumb">
                                                            <span className="badge badge-secondary">1200*462</span>
                                                            <img src="./assets/images/ads-2.png" alt="creative thumb" />
                                                        </div>
                                                        <div className="card-body">
                                                            <h5>MFB Fall Checking 2020 - RAZ AZ</h5>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="col">
                                                    <div className="card card-menu-creative">
                                                        <div className="card-creative-thumb">
                                                            <span className="badge badge-secondary">1200*462</span>
                                                            <img src="./assets/images/ads-3.png" alt="creative thumb" />
                                                        </div>
                                                        <div className="card-body">
                                                            <h5>MFB Fall Checking 2020 - RAZ AZ</h5>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="col">
                                                    <div className="card card-menu-creative">
                                                        <div className="card-creative-thumb">
                                                            <span className="badge badge-secondary">1200*462</span>
                                                            <img src="./assets/images/ads-1.png" alt="creative thumb" />
                                                        </div>
                                                        <div className="card-body">
                                                            <h5>MFB Fall Checking 2020 - RAZ AZ</h5>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="col">
                                                    <div className="card card-menu-creative">
                                                        <div className="card-creative-thumb">
                                                            <span className="badge badge-secondary">1200*462</span>
                                                            <img src="./assets/images/ads-2.png" alt="creative thumb" />
                                                        </div>
                                                        <div className="card-body">
                                                            <h5>MFB Fall Checking 2020 - RAZ AZ</h5>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li><Link to="./landingpages">Landing pages</Link></li>
                    <li><Link to="./targeting">Targeting</Link></li>
                    <li><Link to="./stats">Stats</Link></li>
                    <li><Link to="./reports">Report</Link></li>
                </ul>
                <ul className="navbar-nav align-items-center secondary-menu">
                    <li><i className="icon icon-notification"></i>
                        <div className="dropdown-menu notification-dropdown-menu">
                            <div className="notification-header">
                                Notifications <Link to="./all-notifications.html" className="btn-link">See All</Link>
                            </div>
                            <ul className="notifications list-unstyled">
                                <li className="media">
                                    <span className="icon-box mr-3">
                                        <i className="icon-bulb"></i>
                                    </span>
                                    <div className="media-body">
                                        <h5>Adds responsive display ads</h5>
                                        <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                                            sollicitudin.</p>
                                        <Link to="#" className="btn-link">Notify Sales</Link>
                                    </div>
                                </li>
                                <li className="media">
                                    <span className="icon-box mr-3">
                                        <i className="icon-pause"></i>
                                    </span>
                                    <div className="media-body">
                                        <h5>List-based media object</h5>
                                        <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                                            sollicitudin.</p>
                                    </div>
                                </li>
                                <li className="media">
                                    <span className="icon-box mr-3">
                                        <i className="icon-Rectangle"></i>
                                    </span>
                                    <div className="media-body">
                                        <h5>List-based media object</h5>
                                        <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                                            sollicitudin. Cras purus odio,</p>
                                        <Link to="#" className="btn-link">See Report</Link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div className="menu-profile media">
                            <img src="./assets/images/avatar.png" className="profile-icon align-self-center mr-3"
                                alt="Midfirst Bank's profile picture" />
                            <div className="media-body  align-self-center">
                                <h6 className="mt-0">Midfirst Bank</h6>
                            </div>
                        </div>
                        <ul className="dropdown-menu profile-dropdown-menu">
                            <li>
                                <Link to="./login">Login</Link>
                            </li>
                            <li>
                                <Link to="./profile">Profile</Link>
                            </li>
                            <li>
                                <Link to="#">Payment setting</Link>
                            </li>
                            <li>
                                <Link to="./billing">Billing history</Link>
                            </li>
                            <li>
                                <Link to="#">Contact us</Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </Fragment>
    );
};

export default Navigation;