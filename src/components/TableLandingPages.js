import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import ReactDatatable from '@ashvin27/react-datatable';

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
      text: 'Page name',
      key: 'name',
      sortable: true,
      cell: row => (<div className={'page-name'} style={{ 'cursor': 'pointer' }} >
        {(row.params.name) ? row.params.name : 'No Data'}
      </div>),
    },
    {
      text: 'Impressions',
      key: 'impressions',
      sortable: true,
      cell: row => (<div row={row}>{row.impressions.toLocaleString()}</div>),
    },
    {
      text: 'Clicks',
      key: 'clicks',
      sortable: true,
      cell: row => (<div row={row}>{row.clicks.toLocaleString()}</div>),
    },
    {
      text: 'CTR',
      key: 'ctr',
      sortable: true,
      cell: row => (<div row={row}>{row.ctr}%</div>),
    },
    {
      text: 'Conversions',
      key: 'conversions',
      sortable: true,
      cell: row => (<div row={row}>{row.conversions.toLocaleString()}</div>),
    },
    {
      text: 'Conv. rate',
      key: 'convRate',
      sortable: true,
      cell: row => (<div row={row}>{row.convRate}%</div>),
    },
    // {
    //   text: '',
    //   cell: row => (<div row={row}><a target="_blank" href={row.params.url}>Preview</a></div>),
    // },
  ]);

  const config = {
    page_size: 10,
    length_menu: [10, 20, 50],
    show_filter: false,
    show_pagination: (landingPages.length > 10) ? true : false,
    pagination: 'advance',
    key_column: 'id',
    button: {
      excel: false,
      print: false,
    },
    language: {
      no_data_text: 'No landingpages for this campaign.',
    },
  };

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
    row.conversions = Array.isArray(row.conversions) ? row.conversions.reduce((sum, next) => sum + next.count, 0) : row.conversions;
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
          <div className="table-landingpage">
            {/* <Datatable tableHeaders={columns} tableBody={landingPages.map(prepareTableRow)}  rowsPerPage={(landingPages.length > 10) ? 10 : false} labels={customLabels} /> */}
            <ReactDatatable
              config={config}
              columns={columns}
              records={landingPages.map(prepareTableRow)} />
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
