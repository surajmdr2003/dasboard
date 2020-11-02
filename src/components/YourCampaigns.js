import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import DataTable from 'react-data-table-component';

// Context
import GlobalContext from '../context/GlobalContext';

// Services
import AdvertiserService from '../services/advertiser.service';

/** Components */
import DatePickerField from '../components/form-fields/DatePickerField';
import DropdownFilter from '../components/form-fields/DropdownFilter';

const YourCampaigns = () => {
  const { user, dateFilterRange } = React.useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [filterDateTitle, setFilterDateTitle] = useState(`Last ${dateFilterRange.days} Days`);
  const [campaginList, setCampaginList] = useState([]);
  const [filteredCampaginList, setFilteredCampaginList] = useState([]);
  const dropDownStatus = [{ id: 1, name: 'ACTIVE' }, { id: 2, name: 'INACTIVE' }, { id: 3, name: 'PAUSED' }];
  const [dateFilter, setDateFilter] = useState({
    endDate: dateFilterRange.endDate,
    startDate: dateFilterRange.startDate,
  });

  const [columns] = useState([
    {
      name: 'Campaigns name',
      selector: 'name',
      sortable: true,
      cell: row => (<div className="campaign">
        <div className="c-name">{(row.name === null || row.name === '') ? 'No Data' : row.name}</div>
        <div className="c-date">
          {row.startDate + ' - ' + row.endDate}</div>
      </div>),
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: false,
      cell: row => (<div className={`status ${row.status.toLowerCase()}-campaign`}>{row.status.toLowerCase()}</div>),
    },
    {
      name: 'Impressions',
      selector: 'impressions',
      sortable: true,
      cell: row => (<div row={row}>{row.impressions}</div>),
    },
    {
      name: 'Clicks',
      selector: 'clicks',
      sortable: true,
      cell: row => (<div row={row}>{row.clicks}</div>),
    },
    {
      name: 'CTR',
      sortable: false,
      cell: row => (<div row={row}>{handleNanValueWithCalculation(row.clicks, row.impressions)}%</div>),
    },
    {
      name: 'Conversion',
      sortable: false,
      cell: row => (<div row={row}>{row.conversions.reduce((sum, next) => sum + next.count, 0)}</div>),
    },
    {
      name: 'Conv rate',
      sortable: false,
      cell: row => (<div row={row}>{handleNanValueWithCalculation(row.conversions.reduce((sum, next) => sum + next.count, 0), row.clicks)}%</div>),
    },
    {
      name: '',
      sortable: false,
      cell: row => (<div row={row}><Link to={`/dashboard/campaigns/${row.id}`}>See details</Link></div>),
    },
  ]);

  /**
   * Call API and generate graphs correspond to data
   * @param {start date} sDate
   * @param {end date} eDate
   */
  const campaignsData = () => {
    setIsLoading(true);
    AdvertiserService.getAdvertiserPerformanceCampaigns(user.id, dateFilter)
      .then((response) => {
        setCampaginList(response.data.summary);
        setFilteredCampaginList(response.data.summary);
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
    const range = (moment(startDate).format('DD MMM YY') + ' to ' + moment(endDate).format('DD MMM YY')).toString();
    setFilterDateTitle(range);
    setDateFilter({ startDate: moment(startDate).format('YYYY-MM-DD'), endDate: moment(endDate).format('YYYY-MM-DD') });
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
    const filteredCampagins = campaginList.filter(item => item.status === status.name);
    setFilteredCampaginList(filteredCampagins);
  };

  useEffect(() => {
    campaignsData();
  }, []);

  return (
    <section className="your-campaigns-content">
      <div className="container">
        <div className="row align-items-center filter-block">
          <div className="col-md-5">
            <div className="block-title">
              Your Campaigns
              <Link to="/dashboard/campaigns" className="btn-link">See All</Link>
            </div>
          </div>
          <div className="col-md-7">
            <div className="block-filter">
              <DropdownFilter itemList={dropDownStatus} label="Filter By Status" dropwDownCallBack={loadCampaignDataFilterByStatus} />
              <DatePickerField applyCallback={datepickerCallback} label={filterDateTitle} />
            </div>
          </div>
        </div>

        <div className="table-responsive table-CampaignList">
          {
            isLoading
              ?
              <div className="text-center m-5">
                <div className="spinner-grow spinner-grow-lg" role="status"> <span className="sr-only">Loading...</span></div>
              </div>
              : <DataTable
                columns={columns}
                data={filteredCampaginList}
                persistTableHead
                pagination={filteredCampaginList.length > 10 ? true : false}
              />
          }
        </div>
      </div>
    </section>
  );
};

export default YourCampaigns;
