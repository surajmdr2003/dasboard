import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

// Context
import GlobalContext from '../context/GlobalContext';

// Services
import AdvertiserService from '../services/advertiser.service';

/** Components */
import DatePickerField from '../components/form-fields/DatePickerField';

const CampaignList = () => {
  const {user, dateFilterRange} = React.useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [filterDateTitle, setFilterDateTitle] = useState(`Last  ${dateFilterRange.days} Days`);
  const [campaigns, setCampaigns] = useState([]);
  const [dateFilter, setDateFilter] = useState({
    endDate: dateFilterRange.endDate,
    startDate: dateFilterRange.startDate,
  });

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
  const datepickerCallback = (startDate, endDate) => {
    setFilterDateTitle((moment(startDate).format('DD MMM YY') + ' to ' + moment(endDate).format('DD MMM YY')).toString());
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

  const loadViewOfCampaigns = (campaignList) => {
    return campaignList.length
      ? campaignList.map(campaign => {
        return (<tr key={campaign.id}>
          <th scope="row">
            <div className="campaign">
              <div className="c-name">{(campaign.name === null || campaign.name === '') ? 'No Data' : campaign.name}</div>
              <div className="c-date">
                {campaign.startDate + ' - ' + campaign.endDate}</div>
            </div>
          </th>
          <td><div className={`status ${campaign.status.toLowerCase()}-campaign`}>{campaign.status}</div></td>
          <td>{campaign.impressions}</td>
          <td>{campaign.clicks}</td>
          <td>{handleNanValueWithCalculation(campaign.clicks, campaign.impressions)}%</td>
          <td>{campaign.conversions.reduce((sum, next) => sum + next.count, 0)}</td>
          <td>{handleNanValueWithCalculation(campaign.conversions.reduce((sum, next) => sum + next.count, 0), campaign.clicks)}%</td>
          <td><Link to={`/dashboard/campaigns/${campaign.id}`}>See details</Link></td>
        </tr>);
      })
      : <tr><td colSpan="7" className="text-center">No campaign</td></tr>;
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
                  <DatePickerField applyCallback={datepickerCallback} label={filterDateTitle} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="main-content-wrapper table-CampaignList">
        <div className="container">
          <div className="table-responsive table-CampaignList">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Campaign name</th>
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
                    ? <tr><td colSpan="7"><div className="text-center m-5">
                      <div className="spinner-grow spinner-grow-lg" role="status"> <span className="sr-only">Loading...</span></div>
                    </div></td></tr>
                    : loadViewOfCampaigns(campaigns)
                }
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default CampaignList;
