import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

import DataTable from 'react-data-table-component';

const TableLandingPages = ({ landingPages }) => {
  // const [state, setState] = useState({
  //   activePage: '',
  //   activeUrl: '',
  // });

  // const updateState = ({id, params}) => {
  //   setState({
  //     activePage: id,
  //     activeUrl: params.url,
  //   });
  // };

  const [columns] = useState([
    {
      name: 'Page name',
      selector: 'name',
      sortable: true,
      cell: row => (<div className={'page-name'} style={{ 'cursor': 'pointer' }} >
        {(row.params.name) ? row.params.name : 'No Data'}
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
      name: 'Conversions',
      selector: 'conversion',
      sortable: true,
      cell: row => (<div row={row}>{row.conversions}</div>),
    },
    {
      name: 'Conv. rate',
      selector: 'conv-rate',
      sortable: true,
      cell: row => (<div row={row}>{row.convRate}%</div>),
    },
    {
      name: '',
      selector: 'conv-rate',
      sortable: true,
      cell: row => (<div row={row}><a target="_blank" href={row.params.url}>preview</a></div>),
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

  // const conditionalRowStyles = [
  //   {
  //     when: row => row.id === state.activePage,
  //     style: {
  //       color: '#22a6de',
  //       fontWeight: 'bold',
  //     },
  //   },
  // ];

  useEffect(() => {
    landingPages.length;
  }, []);

  return (
    <div className="card card-table">
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive table-landingpage">
            <DataTable
              columns={columns}
              data={landingPages.map(prepareTableRow)}
              persistTableHead
              // conditionalRowStyles={conditionalRowStyles}
              pagination={landingPages.length > 10 ? true : false}
            />
          </div>
        </div>
        {/* <div className="col-md-4">
          <div className="card-image ">
            <PagePreview pageUrl={state.activeUrl} />
          </div>
        </div> */}
      </div>
    </div>
  );
};

TableLandingPages.propTypes = {
  landingPages: PropTypes.array,
};

export default TableLandingPages;
