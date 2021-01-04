import React, { useState, useEffect } from 'react';
import ProtoTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ReactDatatable from '@ashvin27/react-datatable';

// Context
import GlobalContext from '../context/GlobalContext';

// Services
import AdvertiserService from '../services/advertiser.service';

/** Components */
import DatePickerField from '../components/form-fields/DatePickerField';
import DropdownFilter from '../components/form-fields/DropdownFilter';

const YourCampaigns = ({ top }) => {
  const { user, setActiveCampaign, CLDateFilterRange, setCLDateFilterRange } = React.useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [filterDateTitle, setFilterDateTitle] = useState(CLDateFilterRange.label);
  const [filteredCampaginList, setFilteredCampaginList] = useState([]);
  const [activeStatusFilter, setActiveStatusFilter] = useState('Filter By Status');
  const dropDownStatus = [{ id: 1, name: 'all' }, { id: 2, name: 'active' }, { id: 3, name: 'inactive' }];
  const [dateFilter, setDateFilter] = useState({
    endDate: CLDateFilterRange.endDate,
    startDate: CLDateFilterRange.startDate,
    top: top,
  });

  const [columns] = useState([
    {
      text: 'Campaign name',
      key: 'name',
      sortable: true,
      cell: row => (<div className="campaign">
        <div className="c-name">{(row.params.name) ? row.params.name : 'No Data'}</div>
        <div className="c-date">
          {moment(row.params.startDate).format('MMM DD, YYYY') + ' - ' + moment(row.params.endDate).format('MMM DD, YYYY')}</div>
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
      cell: row => (<div row={row}>{row.conversions.toLocaleString()}</div>),
    },
    {
      text: 'Conv. rate',
      prop: 'conv-rate',
      sortable: true,
      cell: row => (<div row={row}>{row.convRate}%</div>),
    },
    {
      text: '',
      sortable: false,
      cell: row => (<div row={row}><Link onClick={() => setActiveCampaign(row)} to={'/dashboard/campaign'}>See details</Link></div>),
    },
  ]);

  const prepareTableRow = (row) => {
    row.name = row.params.name;
    row.status = row.params.status;
    row.ctr = handleNanValueWithCalculation(row.clicks, row.impressions);
    row.conversions = Array.isArray(row.conversions) ? row.conversions.reduce((sum, next) => sum + next.count, 0) : row.conversions;
    row.convRate = handleNanValueWithCalculation(+row.conversions, row.clicks);

    return row;
  };

  /**
   * Call API and generate graphs correspond to data
   * @param {start date} sDate
   * @param {end date} eDate
   */
  const campaignsData = (campaignDateFilter) => {
    setIsLoading(true);
    AdvertiserService.getAdvertiserPerformanceCampaigns(user.id, campaignDateFilter)
      .then((response) => {
        setFilteredCampaginList(response.data.summary.map(prepareTableRow));
      })
      .catch(() => false)
      .finally(() => setIsLoading(false));
  };

  /**
   * Handle callback of datepicker
   * @param {Start Date} startDate
   * @param {End Date} endDate
   */
  const datepickerCallback = (startDate, endDate) => {
    const range = (moment(startDate).format('MMM DD, YYYY') + ' to ' + moment(endDate).format('MMM DD, YYYY')).toString();
    setFilterDateTitle(range);
    setCLDateFilterRange({
      label: range,
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD'),
    });

    const fiterParams = { startDate: moment(startDate).format('YYYY-MM-DD'), endDate: moment(endDate).format('YYYY-MM-DD'), top: top };
    (activeStatusFilter !== 'Filter By Status') ? fiterParams.status = activeStatusFilter.toUpperCase() : '';

    setDateFilter(fiterParams);
    campaignsData(fiterParams);
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

  const loadCampaignDataFilterByStatus = (status) => {
    if (status.name === 'all') {
      delete dateFilter.status;
    } else {
      dateFilter.status = status.name.toUpperCase();
    }

    campaignsData(dateFilter);
    setActiveStatusFilter(status.name);
  };

  const config = {
    page_size: 10,
    length_menu: [10, 20, 50],
    show_filter: false,
    show_pagination: false,
    pagination: 'advance',
    key_column: 'id',
    button: {
      excel: false,
      print: false,
    },

    language: {
      no_data_text: 'No campaign found',
    },
  };

  useEffect(() => {
    campaignsData(dateFilter);
  }, [user.id]);


  return (
    <section className="your-campaigns-content">
      <div className="container">
        <div className="row align-items-center filter-block">
          <div className="col-md-5">
            <div className="block-title">
              Your campaigns
              <Link to="/dashboard/campaigns" className="btn-link">See All</Link>
            </div>
          </div>
          <div className="col-md-7">
            <div className="block-filter">
              <DropdownFilter itemList={dropDownStatus} label={activeStatusFilter} dropwDownCallBack={loadCampaignDataFilterByStatus} />
              <DatePickerField applyCallback={datepickerCallback} label={filterDateTitle} />
            </div>
          </div>
        </div>

        <div className="table-CampaignList">
          {
            isLoading
              ? <div className="text-center m-5">
                <div className="spinner-grow spinner-grow-lg" role="status"> <span className="sr-only">Loading...</span></div>
              </div>
              : <ReactDatatable
                config={config}
                columns={columns}
                records={filteredCampaginList} />
          }
        </div>
      </div>
    </section>
  );
};

YourCampaigns.propTypes = {
  top: ProtoTypes.string,
};

export default YourCampaigns;
