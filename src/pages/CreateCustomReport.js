import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';

/** Components */
import DatePickerField from '../components/form-fields/DatePickerField';

const CreateCustomReport = () => {
  const handleDateChange = (/* startDate, endDate */) => {
    // TODO use these params as required
    // const range = (moment(startDate).format('DD MMM YY') + ' to ' + moment(endDate).format('DD MMM YY')).toString();
  };

  return (
    <Fragment>
      <section className="filter-bar ">
        <div className="inner-filter-bar w-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                {/* <PageTitleCampaignDropdown /> */}
              </div>
              <div className="col-md-6 text-right">
                <Link to="./create-report" className="btn btn-primary btn-default">Create Custom Report</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="profile-content">
        <div className="container">
          <div className="row">
            <div className="offset-md-2 col-md-8">
              <div className="content-block">
                <div className="content-block-title">
                  Create custom report
                </div>
                <div className="content-block-body">
                  <div className="form-wrapper create-report-form">
                    <form>
                      <div className="form-group form-report">
                        <label><i className="icon-campaign" />Select a campaign</label>
                        <div className="form-feild select-feild">
                          <select className="form-control">
                            <option value="1">Go Checking OSU!</option>
                            <option value="2">MFB Fall Checking 2020 - RAF AZ</option>
                            <option value="3">MFB Fall Checking 2020 - RAF AZ</option>
                            <option value="4">MFB Fall Checking 2020 - RAF AZ</option>
                            <option value="5">MFB Fall Checking 2020 - RAF AZ</option>
                            <option value="6">MFB Fall Checking 2020 - RAF AZ</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group form-report">
                        <label><i className="icon-calendar" />Select date range</label>
                        <DatePickerField applyCallback={handleDateChange} label={'Life Time'}/>
                      </div>
                      <button className="btn btn-primary">Create Report</button>
                    </form>
                  </div>
                  <hr/>
                  <div className="form-wrapper">
                    <div className="form-group form-report result-block">
                      <label><i className="icon-signal" />Your report is ready</label>
                      <div className="result">
                        <div className="campaign-name">Go! Checking OU</div>
                        <div className="campaign-date-range">From 20th July 2019 - 18th Aug 2020</div>
                      </div>
                      <ul>
                        <li><Link to="/">Email</Link></li>
                        <li><Link to="/">Download</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default CreateCustomReport;
