import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import DataTable from 'react-data-table-component';

const pageNotFound = '../assets/images/404.png';

const TableLandingPages = ({landingPages}) => {
  const [pageUrl, setPageUrl] = useState((landingPages.length) ? landingPages[0].landingPageURL : '');
  const [activePageId, setActivePageId] = useState((landingPages.length) ? landingPages[0].id : '');
  const [columns] = useState([
    {
      name: 'Campaign name',
      selector: 'name',
      sortable: true,
      cell: row => (<div className={`page-name ${(activePageId === row.id) ? 'active' : ''}` } onClick={() => loadPageOnMobile(row)}>
        {(row.name === null || row.name === '') ? 'No Data' : row.name}
      </div>),
    },
    {
      name: 'Impressions',
      selector: 'impressions',
      sortable: true,
      cell: row => (<div row={row}>{row.impressions.toLocaleString()}</div>),
    },
    {
      name: 'Clicks',
      selector: 'clicks',
      sortable: true,
      cell: row => (<div row={row}>{row.clicks.toLocaleString()}</div>),
    },
    {
      name: 'CTR',
      selector: 'id',
      sortable: false,
      cell: row => (<div row={row}>{handleNanValueWithCalculation(row.clicks, row.impressions)}%</div>),
    },
    {
      name: 'Conversion',
      selector: 'id',
      sortable: false,
      cell: row => (<div row={row}>{row.conversions.reduce((sum, next) => sum + next.count, 0).toLocaleString()}</div>),
    },
    {
      name: 'Conv rate',
      selector: 'id',
      sortable: false,
      cell: row => (<div row={row}>{handleNanValueWithCalculation(row.conversions.reduce((sum, next) => sum + next.count, 0), row.clicks)}%</div>),
    },
  ]);
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
   * @param {Object} pageObj
   */
  const loadPageOnMobile = (pageObj) => {
    setPageUrl(pageObj.landingPageURL);
    setActivePageId(pageObj.id);
  };

  return (
    <div className="card card-table">
      <div className="row">
        <div className="col-md-8">
          <div className="table-responsive">
            <DataTable
              columns={columns}
              data={landingPages}
              persistTableHead
              pagination={landingPages.length > 10 ? true : false}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="card-image ">
            <div className="page-on-phone-preview">
              <object data={(pageUrl === null || pageUrl === '') ? pageNotFound : pageUrl} />
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
