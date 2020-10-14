import React, { Fragment, useState, useEffect } from 'react';
import moment from 'moment';
import { Auth, API } from 'aws-amplify';

/** Components */
import DatePickerField from '../components/form-fields/DatePickerField';
import PageTitleCampaignDropdown from '../components/PageTitleCampaignDropdown';
import DropdownFilter from '../components/form-fields/DropdownFilter';


/**
 * For Initial startdate and enddate
 */
const now = new Date();
const end = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate())).format('YYYY-MM-DD');
const start = moment(start).subtract(7, 'days').format('YYYY-MM-DD');

const Creatives = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [filterDateTitle, setFilterDateTitle] = useState('Last 7 Days');
  const [creativeList, setCreativeList] = useState([]);
  const [dateFilter, setDateFilter] = useState({
    endDate: end,
    startDate: start,
  })

  const campaignId = props.match.params.id;

  const apiRequest = {
    headers: { accept: '*/*' },
    response: true,
    queryStringParameters: {},
  };


  /**
   * Call API and generate graphs correspond to data
   * @param {object} dateFilter 
   */
  const loadCreativesData = (dateFilter) => {
    setIsLoading(true);
    Auth.currentSession()
      .then(async function (info) {
        const accessToken = info.getAccessToken().getJwtToken();

        // Setting up header info
        apiRequest.headers.authorization = `Bearer ${accessToken}`;

        Object.assign(apiRequest.queryStringParameters, dateFilter);

        const response = await API.post('canpaignGroup', `/${campaignId}/performance/asset`, apiRequest);
        setCreativeList(response.data.summary);
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
    loadCreativesData({ startDate: moment(startDate).format('YYYY-MM-DD'), endDate: moment(endDate).format('YYYY-MM-DD') });
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

  const calculateAssetDimensional = (asset) => {
    const img = new Image();
    img.src = asset;
    img.onload;
    return (img.width + '*' + img.height);
  };

  const loadViewOfCreative = (creativeList) => {
    return creativeList.length
      ? creativeList.map(creative => {
        return <tr key={creative.campaignAssetId}>
          <td scope="row">
            <div className="campaign-media media">
              <object data={creative.assetUrl} />
              <div className="media-body">
                <p className="mt-0">{(creative.name === null || creative.name === '') ? 'No Data' : creative.name}</p>
              </div>
            </div>
          </td>
          <td>{calculateAssetDimensional(creative.assetUrl)}</td>
          <td>{creative.impressions}</td>
          <td>{creative.clicks}</td>
          <td>{handleNanValueWithCalculation(creative.clicks, creative.impressions)}%</td>
          <td>{creative.conversions.length}</td>
          <td>{handleNanValueWithCalculation(creative.conversions.length, creative.clicks)}%</td>
        </tr>
      })
      : <tr><td colSpan="7" className="text-center">No creative in this campaign</td></tr>
  }


  useEffect(() => {
    loadCreativesData(dateFilter);
  }, [campaignId]);

  return (
    <Fragment>
      <section className="filter-bar ">
        <div className="inner-filter-bar w-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                {
                  window.$campaigns.length
                    ? <PageTitleCampaignDropdown pageSlug='/dashboard/creatives' campaignId={campaignId} campaignList={window.$campaigns} />
                    : ''
                }
              </div>
              <div className="col-md-6 text-right">
                <div className="block-filter">
                  <DropdownFilter />
                  <DatePickerField applyCallback={datepickerCallback} label={filterDateTitle} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="main-content-wrapper table-creatives">
        <div className="container">
          <div className="table-responsive table-creatives">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Ad name</th>
                  <th scope="col">Size</th>
                  <th scope="col">Impressions</th>
                  <th scope="col">Clicks</th>
                  <th scope="col">CTR</th>
                  <th scope="col">Conversion</th>
                  <th scope="col">Conv rate</th>
                </tr>
              </thead>
              <tbody>
                {
                  isLoading
                    ? <tr><td colSpan="7"><div className="text-center m-5">
                      <div className="spinner-grow spinner-grow-lg" role="status"> <span className="sr-only">Loading...</span></div>
                    </div></td></tr>
                    : loadViewOfCreative(creativeList)
                }
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Creatives;
