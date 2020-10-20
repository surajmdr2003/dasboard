import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

const TableLandingPages = (props) => {
  const [pageUrl, setPageUrl] = useState((props.landingPages.length) ? props.landingPages[0].landingPageURL : '');
  /**
   * Handle NAN and Infinity value
   * @param {Int} fNum
   * @param {Int} sNum
   */
  const handleNanValueWithCalculation = (fNum, sNum) => {
    if (sNum === 0) {
      return (fNum * 100).toFixed(2);
    }
    return ((fNum / sNum) * 100).toFixed(2);
  };

  /**
   * Load page url for mobile view
   * @param {URL} landingPageURL
   */
  const loadPageOnMobile = (landingPageURL) => {
    setPageUrl(landingPageURL);
  };

  const loadLandingPagesList = (landingPages) => {
    return landingPages.length
      ? landingPages.map(landingPage => {
        return (<tr key={landingPage.id}>
          <th scope="row">
            <div className="page-name" onClick={() => loadPageOnMobile(landingPage.landingPageURL)}>
              {(landingPage.name === null || landingPage.name === '') ? 'No Data' : landingPage.name}
            </div>
          </th>
          <td>{landingPage.impressions}</td>
          <td>{landingPage.clicks}</td>
          <td>{handleNanValueWithCalculation(landingPage.clicks, landingPage.impressions)}%</td>
          <td>{landingPage.conversions.length}</td>
          <td>{handleNanValueWithCalculation(landingPage.conversions.length, landingPage.clicks)}%</td>
        </tr>);
      })
      : <tr><td colSpan="6" className="text-center">No Landing Page found</td></tr>;
  };


  return (
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
                {
                  loadLandingPagesList(props.landingPages)
                }
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card-image ">
            <div className="page-on-phone-preview">
              <object data={pageUrl} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TableLandingPages.propTypes = {
  landingPages: PropTypes.array,
};

export default TableLandingPages;
