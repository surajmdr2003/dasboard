import React, { useState, useContext} from 'react';
import PropTypes from 'prop-types';

// Context
import GlobalContext from '../context/GlobalContext';

// Components
import DatePickerField from './form-fields/DatePickerField';

const PageTitleWithFilter = ({reportUrl}) => {
  const [pageDateFilterRange, setPageDateFilterRange] = useContext(GlobalContext);
  const [filterDateTitle, setFilterDateTitle] = useState(pageDateFilterRange.label);

  /**
   * Handles the change in date filter range.
   * @param {*} startDate
   * @param {*} endDate
   */
  const handleFilterDateChange = (startDate, endDate) => {
    const label = (moment(startDate).format('MMM DD, YYYY') + ' to ' + moment(endDate).format('MMM DD, YYYY')).toString();

    setFilterDateTitle(label);
    setPageDateFilterRange({
      label: label,
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD'),
    });
  };

  /**
   * View of Filter Buttons
   */
  const FilterFeilds = (<div className="block-filter">
    <div className="dropdown dropdown-filter">
      <button className="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Filter by status
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a className="dropdown-item" href="#">Action</a>
        <a className="dropdown-item" href="#">Another action</a>
        <a className="dropdown-item" href="#">Something else here</a>
      </div>
    </div>
    <DatePickerField applyCallback={handleFilterDateChange} label={filterDateTitle}/>
  </div>);

  /**
     * View of Download View
     */
  const ReportDownloadFeils = (<div className="text-right">
    <button type="button" className="btn btn-link btn-download-report">Download Report</button>
  </div>);

  /**
   * Return Views with Conditions
   */
  const showFilterButtons = () => {
    return ((reportUrl === undefined ) ? FilterFeilds : ReportDownloadFeils);
  };

  return (
    <section className="filter-bar ">
      <div className="inner-filter-bar w-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="campaigns-link">
                Creatives - <a href="#" className="btn-breadcrumb">Go! checking OU</a>
                <div className="campaign-dropdown-menu dropdown-menu">
                  <div className="card-header">
                    <div className="active">Active campaigns</div>
                    <div>Inactive campaigns</div>
                  </div>
                  <div className="card-body p-0">
                    <ul className="campaign-list">
                      <li>Go Checking OSU!</li>
                      <li>MFB Fall Checking 2020 - RAF AZ</li>
                      <li>MFB Fall Checking 2020 - RAF AZ</li>
                      <li>MFB Fall Checking 2020 - RAF AZ</li>
                      <li>MFB Fall Checking 2020 - RAF AZ</li>
                      <li>MFB Fall Checking 2020 - RAF AZ</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 text-right">
              { showFilterButtons(reportUrl)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

PageTitleWithFilter.propTypes = {
  reportUrl: PropTypes.any,
};

export default PageTitleWithFilter;
