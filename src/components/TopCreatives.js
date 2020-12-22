import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

// Context
import GlobalContext from '../context/GlobalContext';

// Services
import CampaignService from '../services/campaign.service';
import AdvertiserService from '../services/advertiser.service';

/** Components */
import DatePickerField from '../components/form-fields/DatePickerField';
import DropdownFilter from '../components/form-fields/DropdownFilter';
import TopCreativeAdsBlock from './TopCreativeAdsBlock';

/** Slick slider */
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
};

const TopCreatives = (props) => {
  const { user, creativesDateFilterRange, setCreativesDateFilterRange } = React.useContext(GlobalContext);
  const [campaignId, setCampaignId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filterDateTitle, setFilterDateTitle] = useState(creativesDateFilterRange.label);
  const [creatives, setTopCreativeList] = useState([]);
  const [dateFilter, setDateFilter] = useState({
    endDate: creativesDateFilterRange.endDate,
    startDate: creativesDateFilterRange.startDate,
  });

  /**
   * Call API and generate graphs correspond to data
   * @param {Integer} campId
   * @param {object} dateRangeFilter
   * @param {object} campaignFilter
   */
  const loadCreativeData = (campId, dateRangeFilter, campaignFilter) => {
    setIsLoading(true);
    const makeApiCall = campId
      ? CampaignService.getCampaignPerformanceAssets(campId, dateRangeFilter, campaignFilter)
      : AdvertiserService.getAdvertiserPerformanceAssets(user.id, dateRangeFilter, campaignFilter);

    makeApiCall
      .then((response) => {
        setTopCreativeList(response.data.summary);
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
    const label = (moment(startDate).format('MMM DD, YYYY') + ' to ' + moment(endDate).format('MMM DD, YYYY')).toString();

    setFilterDateTitle(label);
    setDateFilter({ startDate: moment(startDate).format('YYYY-MM-DD'), endDate: moment(endDate).format('YYYY-MM-DD') });
    setCreativesDateFilterRange({
      label: label,
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD'),
    });
    loadCreativeData(campaignId || props.campaignId, { startDate: moment(startDate).format('YYYY-MM-DD'), endDate: moment(endDate).format('YYYY-MM-DD') });
  };

  const loadCreativeList = (tFiveCreatives) => {
    return tFiveCreatives.length
      ? tFiveCreatives.map(creative => {
        return <TopCreativeAdsBlock key={creative.campaignAssetId} creative={creative} />;
      })
      : <div className="col text-center not-found">No creative found</div>;
  };

  const loadCreativesByCampaign = (campaign) => {
    setCampaignId(campaign.id);
  };

  useEffect(() => {
    loadCreativeData(campaignId || props.campaignId, dateFilter);
  }, [props.campaignId, campaignId, user.id]);

  return (
    <section className="top-creatives-content">
      <div className="container">
        <div className="row align-items-center filter-block">
          <div className="col-md-5">
            <div className="block-title">
              Top creatives
              <Link to="/dashboard/creatives" className="btn-link">More Details</Link>
            </div>
          </div>
          <div className="col-md-7">
            <div className="block-filter">
              {!props.campaignId ? <DropdownFilter itemList={[{id: '', name: 'See All Creatives'}, ...window.$campaigns]} label="Filter By Campaign" dropwDownCallBack={loadCreativesByCampaign} /> : ''}
              <DatePickerField applyCallback={datepickerCallback} label={filterDateTitle} />
            </div>
          </div>
        </div>

        <div className="creative-list">
          {
            isLoading
              ? <div className="text-center m-5">
                <div className="spinner-grow spinner-grow-lg" role="status"> <span className="sr-only">Loading...</span></div>
              </div>
              : <Slider {...settings}> {loadCreativeList(creatives)}</Slider>
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
