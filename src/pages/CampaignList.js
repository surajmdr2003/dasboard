import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Datatable from 'react-bs-datatable';

// Context
import GlobalContext from '../context/GlobalContext';

// Services
import AdvertiserService from '../services/advertiser.service';

/** Components */
import DatePickerField from '../components/form-fields/DatePickerField';

const CampaignList = () => {
  const { user, setActiveCampaign, CLDateFilterRange, setCLDateFilterRange} = React.useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [filterDateTitle, setFilterDateTitle] = useState(CLDateFilterRange.label);
  const [campaigns, setCampaigns] = useState([]);
  const [dateFilter, setDateFilter] = useState({
    endDate: CLDateFilterRange.endDate,
    startDate: CLDateFilterRange.startDate,
  });

  const [columns] = useState([
    {
      title: 'Campaign name',
      prop: 'name',
      sortable: true,
      cell: row => (<div className="campaign">
        <div className="c-name">{(row.params.name) ? row.params.name : 'No Data'}</div>
        <div className="c-date">
          {row.params.startDate + ' - ' + row.params.endDate}</div>
      </div>),
    },
    {
      title: 'Status',
      prop: 'status',
      sortable: true,
      cell: row => (<div className={`status ${row.params.status.toLowerCase()}-campaign`}>{row.params.status.toLowerCase()}</div>),
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
    {
      title: '',
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
   * Call API and generate graphs correspond to data
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
    loadCampaignListData(user.id, { startDate: moment(startDate).format('YYYY-MM-DD'), endDate: moment(endDate).format('YYYY-MM-DD') });
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

  const customLabels = {
    first: '<<',
    last: '>>',
    prev: '<',
    next: '>',
    show: 'Display',
    entries: 'rows',
    noResults: 'There are no data to be displayed',
  };

  useEffect(() => {
    loadCampaignListData(user.id, dateFilter);
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
          <div className="table-CampaignList">
            {
              isLoading
                ?
                <div className="text-center m-5">
                  <div className="spinner-grow spinner-grow-lg" role="status"> <span className="sr-only">Loading...</span></div>
                </div>
                : <Datatable tableHeaders={columns} tableBody={campaigns.map(prepareTableRow)} rowsPerPage={(campaigns.length > 10) ? 10 : false} labels={customLabels}/>
            }
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default CampaignList;
