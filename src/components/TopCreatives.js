import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/** Components */
import DatePickerField from '../components/form-fields/DatePickerField';
import DropdownFilter from '../components/form-fields/DropdownFilter';
import TopCreativeAdsBlock from './TopCreativeAdsBlock';

const TopCreatives = () => {
  const [filterDateTitle, setFilterDateTitle] = useState('Last 7 Days');

  const datepickerCallback = (startDate, endDate) => {
    const range = (moment(startDate).format('DD MMM YY') + ' to ' + moment(endDate).format('DD MMM YY')).toString();
    setFilterDateTitle(range);
  };

  return (
    <section className="top-creatives-content">
      <div className="container">
        <div className="row align-items-center filter-block">
          <div className="col-md-5">
            <div className="block-title">
                            Top Creatives
              <Link to="./creatives" className="btn-link">See All</Link>
            </div>
          </div>
          <div className="col-md-7">
            <div className="block-filter">
              <DropdownFilter />
              <DatePickerField applyCallback={datepickerCallback} label={filterDateTitle} />
            </div>
          </div>
        </div>

        <div className="creative-list row">
          <TopCreativeAdsBlock />
          <TopCreativeAdsBlock />
          <TopCreativeAdsBlock />
          <TopCreativeAdsBlock />
        </div>

      </div>
    </section>
  );
};

export default TopCreatives;
