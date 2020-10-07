import React, { Fragment, useState } from 'react';

/** Components */
import DatePickerField from '../components/form-fields/DatePickerField';
import PageTitleCampaignDropdown from '../components/PageTitleCampaignDropdown';
import TableLandingPages from '../components/TableLandingPages';
import DropdownFilter from '../components/form-fields/DropdownFilter';

const LandingPages = () => {
  const [filterDateTitle, setFilterDateTitle] = useState('Last 7 Days');

  const datepickerCallback = (startDate, endDate) => {
    const range = (moment(startDate).format('DD MMM YY') + ' to ' + moment(endDate).format('DD MMM YY')).toString();
    setFilterDateTitle(range);
  };

  return (
    <Fragment>
      <section className="filter-bar ">
        <div className="inner-filter-bar w-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <PageTitleCampaignDropdown />
              </div>
              <div className="col-md-6 text-right">
                <div className="block-filter">
                  <DropdownFilter />
                  <DatePickerField applyCallback={datepickerCallback} label={filterDateTitle} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="main-content-wrapper top-landingpage-content">
        <div className="container">
          <TableLandingPages />
        </div>
      </section>
    </Fragment>
  );
};

export default LandingPages;
