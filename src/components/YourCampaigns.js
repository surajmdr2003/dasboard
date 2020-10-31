import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

// Context
import GlobalContext from '../context/GlobalContext';

// Services
import AdvertiserService from '../services/advertiser.service';

/** Components */
import DatePickerField from '../components/form-fields/DatePickerField';
import DropdownFilter from '../components/form-fields/DropdownFilter';

const YourCampaigns = () => {
  const {user, dateFilterRange} = React.useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [filterDateTitle, setFilterDateTitle] = useState(`Last ${dateFilterRange.days} Days`);
  const [campaginList, setCampaginList] = useState([]);
  const [filteredCampaginList, setFilteredCampaginList] = useState([]);
  const dropDownStatus = [{id: 1, name: 'ACTIVE'}, {id: 2, name: 'INACTIVE'}, {id: 3, name: 'PAUSED'}];
  const [dateFilter, setDateFilter] = useState({
    endDate: dateFilterRange.endDate,
    startDate: dateFilterRange.startDate,
  });

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
        setIsLoading(false);
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
    setDateFilter({startDate: moment(startDate).format('YYYY-MM-DD'), endDate: moment(endDate).format('YYYY-MM-DD')});
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
   * Returns List of campaign
   * @param {Array} campaigns
   */
  const loadCampaignList = (campaigns) => {
    return campaigns.length
      ? campaigns.map(campaign => {
        return (<tr key={campaign.id}>
          <th scope="row">
            <div className="campaign">
              <div className="c-name">{(campaign.name === null || campaign.name === '') ? 'No Data' : campaign.name}</div>
              <div className="c-date">
                {campaign.startDate + ' - ' + campaign.endDate}</div>
            </div>
          </th>
          <td><div className={`status ${campaign.status.toLowerCase()}-campaign`}>{campaign.status.toLowerCase()}</div></td>
          <td>{campaign.impressions}</td>
          <td>{campaign.clicks}</td>
          <td>{handleNanValueWithCalculation(campaign.clicks, campaign.impressions)}%</td>
          <td>{campaign.conversions.length}</td>
          <td>{handleNanValueWithCalculation(campaign.conversions.reduce((sum, next) => sum + next.count, 0), campaign.clicks)}%</td>
          <td><Link to={`/dashboard/campaigns/${campaign.id}`}>See details</Link></td>
        </tr>);
      })
      : <tr><td colSpan="7" className="text-center">No campaign</td></tr>;
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
              <Link to="/dashbaord/campaign" className="btn-link">See All</Link>
            </div>
          </div>
          <div className="col-md-7">
            <div className="block-filter">
              <DropdownFilter itemList={dropDownStatus} label="Filter By Status" dropwDownCallBack={loadCampaignDataFilterByStatus}/>
              <DatePickerField applyCallback={datepickerCallback} label={filterDateTitle} />
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col">Campaigns name</th>
                <th scope="col">Status</th>
                <th scope="col">Impressions</th>
                <th scope="col">Clicks</th>
                <th scope="col">CTR</th>
                <th scope="col">Conversion</th>
                <th scope="col">Conv rate</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {
                isLoading
                  ? <tr>
                    <td colSpan="8">
                      <div className="text-center m-5">
                        <div className="spinner-grow spinner-grow-lg" role="status"> <span className="sr-only">Loading...</span></div>
                      </div>
                    </td>
                  </tr>
                  : loadCampaignList(filteredCampaginList)
              }
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default YourCampaigns;
