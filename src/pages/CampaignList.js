import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import DataTable from 'react-data-table-component';

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
      name: 'Campaign name',
      selector: 'name',
      sortable: true,
      cell: row => (<div className="campaign">
        <div className="c-name">{(row.params.name === null || row.params.name === '') ? 'No Data' : row.params.name}</div>
        <div className="c-date">
          {row.params.startDate + ' - ' + row.params.endDate}</div>
      </div>),
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: false,
      cell: row => (<div className={`status ${row.params.status.toLowerCase()}-campaign`}>{row.params.status.toLowerCase()}</div>),
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
      sortable: false,
      cell: row => (<div row={row}>{handleNanValueWithCalculation(row.clicks, row.impressions)}%</div>),
    },
    {
      name: 'Conversion',
      sortable: false,
      cell: row => (<div row={row}>{row.conversions.reduce((sum, next) => sum + next.count, 0).toLocaleString()}</div>),
    },
    {
      name: 'Conv rate',
      sortable: false,
      cell: row => (<div row={row}>{handleNanValueWithCalculation(row.conversions.reduce((sum, next) => sum + next.count, 0), row.clicks)}%</div>),
    },
    {
      name: '',
      sortable: false,
      cell: row => (<div row={row}><Link onClick={() => setActiveCampaign(row)} to={'/dashboard/campaign'}>See details</Link></div>),
    },
  ]);


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
    const range = (moment(startDate).format('DD MMM YY') + ' to ' + moment(endDate).format('DD MMM YY')).toString();
    setFilterDateTitle(range);
    setCLDateFilterRange({
      label: range,
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD'),
    });
    setDateFilter({ startDate: moment(startDate).format('YYYY-MM-DD'), endDate: moment(endDate).format('YYYY-MM-DD') });
    loadCampaignListData({ startDate: moment(startDate).format('YYYY-MM-DD'), endDate: moment(endDate).format('YYYY-MM-DD') });
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
          <div className="table-responsive table-CampaignList">
            {
              isLoading
                ?
                <div className="text-center m-5">
                  <div className="spinner-grow spinner-grow-lg" role="status"> <span className="sr-only">Loading...</span></div>
                </div>
                : <DataTable
                  columns={columns}
                  data={campaigns}
                  persistTableHead
                  pagination={campaigns.length > 10 ? true : false}
                />
            }
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default CampaignList;
