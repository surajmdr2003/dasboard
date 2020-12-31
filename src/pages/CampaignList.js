import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ReactDatatable from '@ashvin27/react-datatable';

// Context
import GlobalContext from '../context/GlobalContext';

// Services
import AdvertiserService from '../services/advertiser.service';

/** Components */
import DatePickerField from '../components/form-fields/DatePickerField';

const CampaignList = () => {
  const { user, setActiveCampaign, CLDateFilterRange, setCLDateFilterRange } = React.useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isInactiveCampaginLoading, setIsInactiveCampaginLoading] = useState(false);
  const [filterDateTitle, setFilterDateTitle] = useState(CLDateFilterRange.label);
  const [campaigns, setCampaigns] = useState([]);
  const [inActiveCampaigns, setInactiveCampaigns] = useState([]);
  const [dateFilter, setDateFilter] = useState({
    endDate: CLDateFilterRange.endDate,
    startDate: CLDateFilterRange.startDate,
    status: 'ACTIVE',
  });

  const [columns] = useState([
    {
      text: 'Campaign name',
      key: 'name',
      sortable: true,
      cell: row => (<div className="campaign">
        <div className="c-name">{(row.params.name) ? row.params.name : 'No Data'}</div>
        <div className="c-date">
          {row.params.startDate + ' - ' + row.params.endDate}</div>
      </div>),
    },
    {
      text: 'Status',
      key: 'status',
      sortable: true,
      cell: row => (<div className={`status ${row.params.status.toLowerCase()}-campaign`}>{row.params.status.toLowerCase()}</div>),
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
      key: 'conversion',
      sortable: true,
      cell: row => (<div row={row}>{row.conversions}</div>),
    },
    {
      text: 'Conv. rate',
      key: 'conv-rate',
      sortable: true,
      cell: row => (<div row={row}>{row.convRate}%</div>),
    },
    {
      text: '',
      sortable: false,
      cell: row => (<div row={row}><Link onClick={() => setActiveCampaign(row)} to={'/dashboard/campaign'}>See details</Link></div>),
    },
  ]);

  /**
   * Preoare row data for table
   * @param {*} row
   */
  const prepareTableRow = (row) => {
    row.name = row.params.name;
    row.status = row.params.status;
    row.ctr = handleNanValueWithCalculation(row.clicks, row.impressions);
    row.conversions = Array.isArray(row.conversions) ? row.conversions.reduce((sum, next) => sum + next.count, 0).toLocaleString() : row.conversions.toLocaleString();
    row.convRate = handleNanValueWithCalculation(+row.conversions, row.clicks);

    return row;
  };

  /**
   * Call API and generate data
   * @param {Integer} userId
   * @param {object} dateRangeFilter
   */
  const loadCampaignListData = (userId, dateRangeFilter) => {
    setIsLoading(true);
    AdvertiserService.getAdvertiserPerformanceCampaigns(userId, dateRangeFilter)
      .then((response) => {
        setCampaigns(response.data.summary);
      })
      .catch(() => false)
      .finally(() => setIsLoading(false));
  };

  /**
 * Call API and generate data
 * @param {Integer} userId
 */
  const loadInactiveCampaignListData = (userId) => {
    setIsInactiveCampaginLoading(true);
    AdvertiserService.getAdvertiserPerformanceInactiveCampaigns(userId)
      .then((response) => {
        setInactiveCampaigns(response.data.summary);
      })
      .catch(() => false)
      .finally(() => setIsInactiveCampaginLoading(false));
  };

  /**
   * Handle callback of datepicker
   * @param {Start Date} startDate
   * @param {End Date} endDate
   */
  const datePickerCallback = (startDate, endDate) => {
    const range = (moment(startDate).format('MMM DD, YYYY') + ' to ' + moment(endDate).format('MMM DD, YYYY')).toString();
    setFilterDateTitle(range);
    setCLDateFilterRange({
      label: range,
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD'),
    });
    setDateFilter({ startDate: moment(startDate).format('YYYY-MM-DD'), endDate: moment(endDate).format('YYYY-MM-DD') });
    loadCampaignListData(user.id, { startDate: moment(startDate).format('YYYY-MM-DD'), endDate: moment(endDate).format('YYYY-MM-DD'), status: 'ACTIVE' });
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

  const config = {
    page_size: 10,
    length_menu: [10, 20, 50],
    show_filter: false,
    pagination: 'advance',
    key_column: 'id',
    button: {
      excel: false,
      print: false,
    },
    language: {
      no_data_text: 'No campaigns found',
    },
  };

  const configActiveCampaign = { ...config, show_pagination: ((campaigns.length > 10) ? true : false) };
  const configInactiveCampaign = { ...config, show_pagination: ((inActiveCampaigns.length > 10) ? true : false) };

  useEffect(() => {
    loadCampaignListData(user.id, dateFilter);
    loadInactiveCampaignListData(user.id);
  }, [user.id]);

  return (
    <Fragment>
      <section className="filter-bar ">
        <div className="inner-filter-bar w-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h4>All Campaigns</h4>
              </div>
              <div className="col-md-6 text-right">
                <div className="block-filter">
                  <DatePickerField applyCallback={datePickerCallback} label={filterDateTitle} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="main-content-wrapper table-CampaignList">
        <div className="container">
          <h6>Active campaigns</h6>
          <div className="table-CampaignList mb-5">
            {
              isLoading
                ?
                <div className="text-center m-5">
                  <div className="spinner-grow spinner-grow-lg" role="status"> <span className="sr-only">Loading...</span></div>
                </div>
                : <ReactDatatable
                  config={configActiveCampaign}
                  columns={columns}
                  records={campaigns.map(prepareTableRow)} />
            }
          </div>

          <h6>Inactive campaigns</h6>
          <div className="table-CampaignList">
            {
              isInactiveCampaginLoading
                ?
                <div className="text-center m-5">
                  <div className="spinner-grow spinner-grow-lg" role="status"> <span className="sr-only">Loading...</span></div>
                </div>
                : <ReactDatatable
                  config={configInactiveCampaign}
                  columns={columns}
                  records={inActiveCampaigns.map(prepareTableRow)} />
            }
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default CampaignList;
