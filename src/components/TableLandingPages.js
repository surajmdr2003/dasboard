import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import Datatable from 'react-bs-datatable';

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
      title: 'Page name',
      prop: 'name',
      sortable: true,
      cell: row => (<div className={'page-name'} style={{ 'cursor': 'pointer' }} >
        {(row.params.name) ? row.params.name : 'No Data'}
      </div>),
    },
    {
      title: 'Impressions',
      prop: 'impressions',
      sortable: true,
      cell: row => (<div row={row}>{row.impressions.toLocaleString()}</div>),
    },
    {
      title: 'Clicks',
      prop: 'clicks',
      sortable: true,
      cell: row => (<div row={row}>{row.clicks.toLocaleString()}</div>),
    },
    {
      title: 'CTR',
      prop: 'ctr',
      sortable: true,
      cell: row => (<div row={row}>{row.ctr}%</div>),
    },
    {
      title: 'Conversions',
      prop: 'conversion',
      sortable: true,
      cell: row => (<div row={row}>{row.conversions}</div>),
    },
    {
      title: 'Conv. rate',
      prop: 'conv-rate',
      sortable: true,
      cell: row => (<div row={row}>{row.convRate}%</div>),
    },
    // {
    //   title: '',
    //   cell: row => (<div row={row}><a target="_blank" href={row.params.url}>Preview</a></div>),
    // },
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
    row.name = row.params.name;
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

  const customLabels = {
    first: '<<',
    last: '>>',
    prev: '<',
    next: '>',
    show: 'Display',
    entries: 'rows',
    noResults: (<div className="text-center">There are no data to be displayed</div>),
  };

  useEffect(() => {
    landingPages.length;
  }, []);

  return (
    <div className="card card-table">
      <div className="row">
        <div className="col-md-12">
          <div className="table-landingpage">
            <Datatable tableHeaders={columns} tableBody={landingPages.map(prepareTableRow)}  rowsPerPage={(landingPages.length > 10) ? 10 : false} labels={customLabels} />
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
