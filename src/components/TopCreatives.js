import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Auth, API } from 'aws-amplify';

/** Components */
import DatePickerField from '../components/form-fields/DatePickerField';
import DropdownFilter from '../components/form-fields/DropdownFilter';
import TopCreativeAdsBlock from './TopCreativeAdsBlock';

const TopCreatives = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [filterDateTitle, setFilterDateTitle] = useState('Last 7 Days');
  const [creatives, setTopCreativeList] = useState([]);

  const apiRequest = {
    headers: { accept: '*/*' },
    response: true,
    queryStringParameters: {},
  };

  /**
 * For Initial startdate and enddate
 */
  const now = new Date();
  const end = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate())).format('YYYY-MM-DD');
  const start = moment(start).subtract(7, 'days').format('YYYY-MM-DD');

  /**
   * Call API and generate graphs correspond to data
   * @param {start date} sDate
   * @param {end date} eDate
   */
  const loadCreativeData = (sDate, eDate) => {
    setIsLoading(true);
    Auth.currentSession()
      .then(async function(info) {
        const accessToken = info.getAccessToken().getJwtToken();

        // Setting up header info
        apiRequest.headers.authorization = `Bearer ${accessToken}`;

        Object.assign(apiRequest.queryStringParameters, {
          startDate: sDate,
          endDate: eDate,
        });

        const apiEndPoint = (props.campaignId) ? 'canpaignGroup' : 'advertiserPerformanceAsset';
        const apiPath = (props.campaignId) ? `/${props.campaignId}/performance/asset` : '';
        const response = await API.post(apiEndPoint, apiPath, apiRequest);

        setTopCreativeList(response.data.summary);
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
    loadCreativeData(moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'));
  };

  const loadCreativeList = (tFiveCreatives) => {
    return tFiveCreatives.length
      ? tFiveCreatives.slice(0, 4).map(creative => {
        return <TopCreativeAdsBlock key={creative.campaignAssetId} creative={creative} />;
      })
      : <div className="col">No Creative found</div>;
  };

  useEffect(() => {
    loadCreativeData(start, end);
  }, [props.campaignId]);

  return (
    <section className="top-creatives-content">
      <div className="container">
        <div className="row align-items-center filter-block">
          <div className="col-md-5">
            <div className="block-title">
              Top Creatives
              <Link to="/dashboard/creatives" className="btn-link">See All</Link>
            </div>
          </div>
          <div className="col-md-7">
            <div className="block-filter">
              <DropdownFilter />
              <DatePickerField applyCallback={datepickerCallback} label={filterDateTitle} />
            </div>
          </div>
        </div>

        <div className="creative-list row">
          {
            isLoading
              ? <div className="text-center m-5">
                <div className="spinner-grow spinner-grow-lg" role="status"> <span className="sr-only">Loading...</span></div>
              </div>
              : loadCreativeList(creatives)
          }
        </div>

      </div>
    </section>
  );
};

TopCreatives.propTypes = {
  campaignId: PropTypes.string,
};

export default TopCreatives;
