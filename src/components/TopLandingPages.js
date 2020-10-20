import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Auth, API } from 'aws-amplify';

/** Components */
import DatePickerField from '../components/form-fields/DatePickerField';
import DropdownFilter from '../components/form-fields/DropdownFilter';
import TableLandingPages from '../components/TableLandingPages';

/**
 * For Initial startdate and enddate
 */
const now = new Date();
const end = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate())).format('YYYY-MM-DD');
const start = moment(start).subtract(29, 'days').format('YYYY-MM-DD');

const TopLandingPages = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [filterDateTitle, setFilterDateTitle] = useState('Last 30 Days');
  const [topLandingPageList, setLandingPagesList] = useState([]);
  const [filteredCampaignId, setFilteredCampaignId] = useState();
  const [dateFilter, setDateFilter] = useState({
    endDate: end,
    startDate: start,
  });

  const apiRequest = {
    headers: { accept: '*/*' },
    response: true,
    queryStringParameters: {},
  };

  /**
   * Call API and generate graphs correspond to data
   * @param {Integer} campaignFilter
   * @param {Object} dateRangeFilter
   */
  const loadLandingPagesData = (dateRangeFilter, campaignFilter) => {
    setIsLoading(true);
    Auth.currentSession()
      .then(async function(info) {
        const accessToken = info.getAccessToken().getJwtToken();

        // Setting up header info
        apiRequest.headers.authorization = `Bearer ${accessToken}`;

        Object.assign(apiRequest.queryStringParameters, dateRangeFilter);

        campaignFilter
          ? Object.assign(apiRequest.queryStringParameters, {
            filter: campaignFilter,
          })
          : '';

        const apiEndPoint = (props.campaignId) ? 'canpaignGroup' : 'advertiserPerformanceLandingPage';
        const apiPath = (props.campaignId) ? `/${props.campaignId}/performance/landingpage` : '';

        const response = await API.post(apiEndPoint, apiPath, apiRequest);
        setLandingPagesList(response.data.summary.slice(0, 7));
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
    setFilterDateTitle((moment(startDate).format('DD MMM YY') + ' to ' + moment(endDate).format('DD MMM YY')).toString());
    setDateFilter({ startDate: moment(startDate).format('YYYY-MM-DD'), endDate: moment(endDate).format('YYYY-MM-DD') });
    loadLandingPagesData({ startDate: moment(startDate).format('YYYY-MM-DD'), endDate: moment(endDate).format('YYYY-MM-DD') }, filteredCampaignId);
  };

  const loadLandingPagesByCampaign = (campaign) => {
    setFilteredCampaignId(campaign.id);
    loadLandingPagesData(dateFilter, campaign.id);
  };

  useEffect(() => {
    loadLandingPagesData(dateFilter);
  }, [props.campaignId]);

  return (
    <section className="top-landingpage-content">
      <div className="container">
        <div className="row align-items-center filter-block">
          <div className="col-md-5">
            <div className="block-title">
              Top Landing Pages
              <Link to={`/dashboard/landing-pages${props.campaignId ? '/' + props.campaignId : ''}`} className="btn-link">See All</Link>
            </div>
          </div>
          <div className="col-md-7">
            <div className="block-filter">
              <DropdownFilter itemList={window.$campaigns} dropwDownCallBack={loadLandingPagesByCampaign} />
              <DatePickerField applyCallback={datepickerCallback} label={filterDateTitle} />
            </div>
          </div>
        </div>
        {
          isLoading
            ? <div className="text-center m-5">
              <div className="spinner-grow spinner-grow-lg" role="status"> <span className="sr-only">Loading...</span></div>
            </div>
            : <TableLandingPages landingPages={topLandingPageList} />
        }
      </div>
    </section>
  );
};

TopLandingPages.propTypes = {
  campaignId: PropTypes.string,
};

export default TopLandingPages;
