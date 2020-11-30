import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import cogoToast from 'cogo-toast';
import DataTable from 'react-data-table-component';

// Assets
const pageNotFound = '../assets/images/404.png';

// Services
import CampaignService from '../services/campaign.service';

const TableLandingPages = ({ landingPages }) => {
  const [iframeState, setIframeState] = useState({
    isLoading: false,
    isLoadable: false,
    activePage: (landingPages.length) ? landingPages[0].id : '',
    loadView: '../assets/images/404.png',
  });

  const [columns] = useState([
    {
      name: 'Page name',
      selector: 'name',
      sortable: true,
      cell: row => (<div className={'page-name'} style={{ 'cursor': 'pointer' }} onClick={() => loadPageOnMobile(row)}>
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
    setIframeState({ ...iframeState, isLoading: true, activePage: pageObj.id });
    CampaignService.checkIfSiteCanBeLoaded(pageObj.params.url)
      .then(response => {
        const isLoadable = response.data.headers['X-Frame-Options'] || response.data.responseCode !== 200;
        setIframeState({ ...iframeState, isLoading: false, isLoadable, loadView: (!isLoadable ? pageObj.params.url : pageNotFound), activePage: pageObj.id });
      })
      .catch(() => cogoToast.error('Coundn\'t verifiy the url can be loaded.', { position: 'bottom-left' }));
  };

  const conditionalRowStyles = [
    {
      when: row => row.id === iframeState.activePage,
      style: {
        color: '#22a6de',
        fontWeight: 'bold',
      },
    },
  ];

  useEffect(() => {
    landingPages.length ? loadPageOnMobile(landingPages[0]) : '';
  }, []);

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
              {iframeState.isLoading
                ? <div className="text-center m-5">
                  <div className="spinner-grow spinner-grow-lg" role="status"> <span className="sr-only">Loading...</span></div>
                </div>
                : ''
              }
              { iframeState.isLoadable
                ? <object data={iframeState.loadView} />
                : <iframe src={iframeState.loadView} />
              }
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
