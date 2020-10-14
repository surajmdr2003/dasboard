import React, { Fragment, useState, useEffect } from 'react';
import moment from 'moment';
import { Auth, API } from 'aws-amplify';

/** Components */
import DatePickerField from '../components/form-fields/DatePickerField';
import PageTitleCampaignDropdown from '../components/PageTitleCampaignDropdown';
import TableLandingPages from '../components/TableLandingPages';
import DropdownFilter from '../components/form-fields/DropdownFilter';

const LandingPages = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [filterDateTitle, setFilterDateTitle] = useState('Last 7 Days');
  const [topLandingPageList, setLandingPagesList] = useState([]);

  const campaignId = props.match.params.id

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
  const loadLandingPagesData = (sDate, eDate) => {
    setIsLoading(true);
    Auth.currentSession()
      .then(async function (info) {
        const accessToken = info.getAccessToken().getJwtToken();

        // Setting up header info
        apiRequest.headers.authorization = `Bearer ${accessToken}`;

        Object.assign(apiRequest.queryStringParameters, {
          startDate: sDate,
          endDate: eDate,
        });

        const response = await API.post('canpaignGroup', `/${campaignId}/performance/landingpage`, apiRequest);
        setLandingPagesList(response.data.summary);
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
    loadLandingPagesData(moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'));
  };

  useEffect(() => {
    loadLandingPagesData(start, end);
  }, []);

  return (
    <Fragment>
      <section className="filter-bar ">
        <div className="inner-filter-bar w-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                {
                  window.$campaigns.length
                    ? <PageTitleCampaignDropdown pageSlug='/dashboard/landing-pages' campaignCallback={() => campaignFilterCallback()} campaignList={window.$campaigns} />
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
      <section className="main-content-wrapper top-landingpage-content">
        <div className="container">
          {
            isLoading
              ? <div className="text-center m-5">
                <div className="spinner-grow spinner-grow-lg" role="status"> <span className="sr-only">Loading...</span></div>
              </div>
              : <TableLandingPages landingPages={topLandingPageList} />
          }
        </div>
      </section>
    </Fragment>
  );
};

export default LandingPages;
