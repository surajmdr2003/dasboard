import React from 'react';

const TopCreatives = () => {
    return (
        <section className="top-creatives-content">
            <div className="container">
                <div className="row align-items-center filter-block">
                    <div className="col-md-5">
                        <div className="block-title">
                            Top Creatives
                                    <a href="#" className="btn-link">See All</a>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="block-filter">
                            <div className="dropdown dropdown-filter">
                                <button className="btn btn-outline-primary dropdown-toggle" type="button"
                                    id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    Filter by campaign
                                        </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </div>
                            </div>
                            <button type="button" className="btn btn-outline-primary btn-date-picker">Last 30 days</button>
                        </div>
                    </div>
                </div>

                <div className="creative-list row">
                    <div className="col-lg-3 col-sm-6">
                        <div className="card card-creative">
                            <div className="card-creative-thumb">
                                <span className="badge badge-secondary">1200*462</span>
                                <img src="./assets/images/creative-thumb.png" alt="creative thumb" />
                            </div>
                            <div className="card-body">
                                <h5>MFB Fall Checking 2020 - RAZ AZ</h5>
                                <ul>
                                    <li><strong>Impressions</strong>12,093</li>
                                    <li><strong>Clicks</strong>92</li>
                                    <li><strong>CTR</strong>5.4%</li>
                                    <li><strong>Conversion</strong>31</li>
                                    <li><strong>Conv rate</strong>0.5%</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="card card-creative">
                            <div className="card-creative-thumb">
                                <span className="badge badge-secondary">1200*462</span>
                                <img src="./assets/images/creative-thumb.png" alt="creative thumb" />
                            </div>
                            <div className="card-body">
                                <h5>MFB Fall Checking 2020 - RAZ AZ</h5>
                                <ul>
                                    <li><strong>Impressions</strong>12,093</li>
                                    <li><strong>Clicks</strong>92</li>
                                    <li><strong>CTR</strong>5.4%</li>
                                    <li><strong>Conversion</strong>31</li>
                                    <li><strong>Conv rate</strong>0.5%</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="card card-creative">
                            <div className="card-creative-thumb">
                                <span className="badge badge-secondary">1200*462</span>
                                <img src="./assets/images/creative-thumb.png" alt="creative thumb" />
                            </div>
                            <div className="card-body">
                                <h5>MFB Fall Checking 2020 - RAZ AZ</h5>
                                <ul>
                                    <li><strong>Impressions</strong>12,093</li>
                                    <li><strong>Clicks</strong>92</li>
                                    <li><strong>CTR</strong>5.4%</li>
                                    <li><strong>Conversion</strong>31</li>
                                    <li><strong>Conv rate</strong>0.5%</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="card card-creative">
                            <div className="card-creative-thumb">
                                <span className="badge badge-secondary">1200*462</span>
                                <img src="./assets/images/creative-thumb.png" alt="creative thumb" />
                            </div>
                            <div className="card-body">
                                <h5>MFB Fall Checking 2020 - RAZ AZ</h5>
                                <ul>
                                    <li><strong>Impressions</strong>12,093</li>
                                    <li><strong>Clicks</strong>92</li>
                                    <li><strong>CTR</strong>5.4%</li>
                                    <li><strong>Conversion</strong>31</li>
                                    <li><strong>Conv rate</strong>0.5%</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default TopCreatives;