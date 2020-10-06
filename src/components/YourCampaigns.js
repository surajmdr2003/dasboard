import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/** Components */
import DatePickerField from '../components/form-fields/DatePickerField';
import DropdownFilter from '../components/form-fields/DropdownFilter';

const YourCampaigns = () => {
  const [filterDateTitle, setFilterDateTitle] = useState('Last 7 Days');

  const datepickerCallback = (startDate, endDate) => {
    const range = (moment(startDate).format('DD MMM YY') + ' to ' + moment(endDate).format('DD MMM YY')).toString();
    setFilterDateTitle(range);
  };

  return (
    <section className="your-campaigns-content">
      <div className="container">
        <div className="row align-items-center filter-block">
          <div className="col-md-5">
            <div className="block-title">
                            Your Campaigns
              <Link to="./campaign" className="btn-link">See All</Link>
            </div>
          </div>
          <div className="col-md-7">
            <div className="block-filter">
              <DropdownFilter />
              <DatePickerField applyCallback={datepickerCallback} label={filterDateTitle} />
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
                <th scope="col" />
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
