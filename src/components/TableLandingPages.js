import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import DataTable from 'react-data-table-component';

const pageNotFound = '../assets/images/404.png';

const TableLandingPages = ({landingPages}) => {
  const [pageUrl, setPageUrl] = useState((landingPages.length) ? landingPages[0].landingPageURL : '');
  const [activePageId, setActivePageId] = useState((landingPages.length) ? landingPages[0].id : '');
  const [columns] = useState([
    {
      name: 'Page name',
      selector: 'name',
      sortable: true,
      cell: row => (<div className={'page-name'} style={{'cursor': 'pointer'}} onClick={() => loadPageOnMobile(row)}>
        {(row.params.name) ?  row.params.name : 'No Data'  }
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
      selector: 'ctr',
      sortable: true,
      cell: row => (<div row={row}>{row.ctr}%</div>),
    },
    {
      name: 'Conversion',
      selector: 'conversion',
      sortable: true,
      cell: row => (<div row={row}>{row.conversions}</div>),
    },
    {
      name: 'Conv rate',
      selector: 'conv-rate',
      sortable: true,
      cell: row => (<div row={row}>{row.convRate}%</div>),
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
   * Preoare row data for table
   * @param {*} row
   */
  const prepareTableRow = (row) => {
    row.ctr = handleNanValueWithCalculation(row.clicks, row.impressions);
    row.conversions = (Array.isArray(row.conversions) ? row.conversions.reduce((sum, next) => sum + next.count, 0) : row.conversions).toLocaleString();
    row.convRate = handleNanValueWithCalculation(+row.conversions, row.clicks);

    return row;
  };

  /**
   * Load page url for mobile view
   * @param {Object} pageObj
   */
  const loadPageOnMobile = (pageObj) => {
    setPageUrl(pageObj.params.url);
    setActivePageId(pageObj.id);
  };

  const conditionalRowStyles = [
    {
      when: row => row.id === activePageId,
      style: {
        color: '#22a6de',
        fontWeight: 'bold',
      },
    },
  ];

  return (
    <div className="card card-table">
      <div className="row">
        <div className="col-md-8">
          <div className="table-responsive table-landingpage">
            <DataTable
              columns={columns}
              data={landingPages.map(prepareTableRow)}
              persistTableHead
              conditionalRowStyles={conditionalRowStyles}
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
