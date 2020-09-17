import React from 'react';

const TopLandingPages = () => {
    return (
        <section className="top-landingpage-content">
            <div className="container">
                <div className="row align-items-center filter-block">
                    <div className="col-md-5">
                        <div className="block-title">
                            Top Landing Pages
                        <a href="#" className="btn-link">See All</a>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="block-filter">
                            <div className="dropdown dropdown-filter">
                                <button className="btn btn-outline-primary dropdown-toggle" type="button"
                                    id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    Filter by status
                            </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </div>
                            </div>
                            <button type="button" className="btn btn-outline-primary btn-date-picker">March 2020</button>
                        </div>
                    </div>
                </div>
                <div className="card card-table">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Campaigns name</th>
                                            <th scope="col">Impressions</th>
                                            <th scope="col">Clicks</th>
                                            <th scope="col">CTR</th>
                                            <th scope="col">Conversion</th>
                                            <th scope="col">Conv rate</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">
                                                <div className="page-name">MFB Fall Checking 2020 - RAF AZ</div>
                                            </th>
                                            <td>
                                                340,919
                                        </td>
                                            <td>
                                                2,066
                                        </td>
                                            <td>5.4%</td>
                                            <td>431</td>
                                            <td>1.8%</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                <div className="page-name">MFB Fall Checking 2020 - RAF AZ</div>
                                            </th>
                                            <td>
                                                340,919
                                        </td>
                                            <td>
                                                2,066
                                        </td>
                                            <td>5.4%</td>
                                            <td>431</td>
                                            <td>1.8%</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                <div className="page-name">Go! Checking OU</div>
                                            </th>
                                            <td>
                                                340,919
                                        </td>
                                            <td>
                                                2,066
                                        </td>
                                            <td>5.4%</td>
                                            <td>431</td>
                                            <td>1.8%</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                <div className="page-name">MFB Fall Checking 2020 - RAF AZ</div>
                                            </th>
                                            <td>
                                                340,919
                                        </td>
                                            <td>
                                                2,066
                                        </td>
                                            <td>5.4%</td>
                                            <td>431</td>
                                            <td>1.8%</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                <div className="page-name">MFB Fall Checking 2020 - RAF AZ</div>
                                            </th>
                                            <td>
                                                340,919
                                        </td>
                                            <td>
                                                2,066
                                        </td>
                                            <td>5.4%</td>
                                            <td>431</td>
                                            <td>1.8%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card-image">
                                <img src="./assets/images/phone.png" alt="phone" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TopLandingPages;