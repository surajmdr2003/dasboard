import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

// Context
import GlobalContext from '../context/GlobalContext';

// Services
import AdvertiserService from '../services/advertiser.service';
import CampaignService from '../services/campaign.service';

/** Components */
import DatePickerField from '../components/form-fields/DatePickerField';
import DropdownFilter from '../components/form-fields/DropdownFilter';
import TableLandingPages from '../components/TableLandingPages';

const TopLandingPages = (props) => {
  const {user, activeCampaign, dateFilterRange} = React.useContext(GlobalContext);
  const [pageMode] = useState(props.campaignId ? 'detail' : '');
  const [campaignId, setCampaignId] = useState(props.campaignId || activeCampaign.id);
  const [isLoading, setIsLoading] = useState(false);
  const [filterDateTitle, setFilterDateTitle] = useState(`Last ${dateFilterRange.days} Days`);
  const [topLandingPageList, setLandingPagesList] = useState([]);
  const [dateFilter, setDateFilter] = useState({
    endDate: dateFilterRange.endDate,
    startDate: dateFilterRange.startDate,
  });

  /**
   * Call API and generate graphs correspond to data
   * @param {Integer} campId
   * @param {Object} campaignFilter
   * @param {Object} dateRangeFilter
   */
  const loadLandingPagesData = (campId, dateRangeFilter, campaignFilter) => {
    setIsLoading(true);
    const landingPageApiCall = (campId)
      ? CampaignService.getCampaignLandingPages(campId, dateRangeFilter, campaignFilter)
      : AdvertiserService.getAdvertiserPerformanceLandingPages(user.id, dateRangeFilter, campaignFilter);

    landingPageApiCall.then((response) => {
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
    loadLandingPagesData(campaignId, { startDate: moment(startDate).format('YYYY-MM-DD'), endDate: moment(endDate).format('YYYY-MM-DD') });
  };

  const loadLandingPagesByCampaign = (campaign) => {
    setCampaignId(campaign.id);
  };

  useEffect(() => {
    setCampaignId(campaignId);
    campaignId && loadLandingPagesData(campaignId, dateFilter);
  }, [campaignId]);

  return (
    <section className="top-landingpage-content">
      <div className="container">
        <div className="row align-items-center filter-block">
          <div className="col-md-5">
            <div className="block-title">
              Top Landing Pages
              <Link to={'/dashboard/landing-pages'} className="btn-link">See All</Link>
            </div>
          </div>
          <div className="col-md-7">
            <div className="block-filter">
              { pageMode !== 'detail' ? <DropdownFilter itemList={window.$campaigns} label={activeCampaign ? activeCampaign.name : null} dropwDownCallBack={loadLandingPagesByCampaign} /> : ''}
              <DatePickerField applyCallback={datepickerCallback} label={filterDateTitle} />
            </div>
          </div>
        </div>
        {
          isLoading
            ? <div className="col text-center m-5">
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
