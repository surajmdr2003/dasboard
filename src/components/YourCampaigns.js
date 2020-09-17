import React from 'react';
import DatePickerField from './form-fields/DatePickerField';

const YourCampaigns = () => {
    return (
        <section className="your-campaigns-content">
            <div className="container">
                <div className="row align-items-center filter-block">
                    <div className="col-md-5">
                        <div className="block-title">
                            Your Campaigns
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
                            {/* <DatePickerField /> */}
                        </div>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Campaigns name</th>
                                <th scope="col">Status</th>
                                <th scope="col">Impressions</th>
                                <th scope="col">Clicks</th>
                                <th scope="col">CTR</th>
                                <th scope="col">Conversion</th>
                                <th scope="col">Conv rate</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">
                                    <div className="campaign">
                                        <div className="c-name">MFB Fall Checking 2020 - RAF AZ</div>
                                        <div className="c-date">12th Jan - 12th Sept</div>
                                    </div>
                                </th>
                                <td>
                                    <div className="status active-campaign">Active</div>
                                </td>
                                <td>
                                    340,919
                                        </td>
                                <td>
                                    2,066
                                        </td>
                                <td>5.4%</td>
                                <td>431</td>
                                <td>1.8%</td>
                                <td><a href="#">See details</a></td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <div className="campaign">
                                        <div className="c-name">MFB Fall Checking 2020 - RAF AZ</div>
                                        <div className="c-date">12th Jan - 12th Sept</div>
                                    </div>
                                </th>
                                <td>
                                    <div className="status inactive-campaign">Inactive</div>
                                </td>
                                <td>
                                    340,919
                                        </td>
                                <td>
                                    2,066
                                        </td>
                                <td>5.4%</td>
                                <td>431</td>
                                <td>1.8%</td>
                                <td><a href="#">See details</a></td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <div className="campaign">
                                        <div className="c-name">Go! Checking OU</div>
                                        <div className="c-date">12th Jan - 12th Sept</div>
                                    </div>
                                </th>
                                <td>
                                    <div className="status paused-campaign">Paused</div>
                                </td>
                                <td>
                                    340,919
                                        </td>
                                <td>
                                    2,066
                                        </td>
                                <td>5.4%</td>
                                <td>431</td>
                                <td>1.8%</td>
                                <td><a href="#">See details</a></td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <div className="campaign">
                                        <div className="c-name">MFB Fall Checking 2020 - RAF AZ</div>
                                        <div className="c-date">12th Jan - 12th Sept</div>
                                    </div>
                                </th>
                                <td>
                                    <div className="status active-campaign">Active</div>
                                </td>
                                <td>
                                    340,919
                                        </td>
                                <td>
                                    2,066
                                        </td>
                                <td>5.4%</td>
                                <td>431</td>
                                <td>1.8%</td>
                                <td><a href="#">See details</a></td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <div className="campaign">
                                        <div className="c-name">MFB Fall Checking 2020 - RAF AZ</div>
                                        <div className="c-date">12th Jan - 12th Sept</div>
                                    </div>
                                </th>
                                <td>
                                    <div className="status active-campaign">Active</div>
                                </td>
                                <td>
                                    340,919
                                        </td>
                                <td>
                                    2,066
                                        </td>
                                <td>5.4%</td>
                                <td>431</td>
                                <td>1.8%</td>
                                <td><a href="#">See details</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default YourCampaigns;