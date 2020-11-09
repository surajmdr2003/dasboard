import React from 'react';
import { PropTypes } from 'prop-types';

const PageTitleWithFilter = ({title}) => {
  return (
    <section className="filter-bar ">
      <div className="inner-filter-bar w-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h4>{title ? title : 'Account Overview'}</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

PageTitleWithFilter.propTypes = {
  title: PropTypes.string,
};
export default PageTitleWithFilter;
