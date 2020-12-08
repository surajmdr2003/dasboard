import React, { Fragment, useState, useEffect } from 'react';
import moment from 'moment';
import cogoToast from 'cogo-toast';

// Context
import GlobalContext from '../context/GlobalContext';

/** Components */
import DatePickerField from '../components/form-fields/DatePickerField';
import PageTitleCampaignDropdown from '../components/PageTitleCampaignDropdown';
import TableLandingPages from '../components/TableLandingPages';

// Campaign Service
import CampaignService from '../services/campaign.service';

const LandingPages = () => {
  const {activeCampaign, landingDateFilterRange, setLandingDateFilterRange} = React.useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [filterDateTitle, setFilterDateTitle] = useState(landingDateFilterRange.label);
  const [topLandingPageList, setLandingPagesList] = useState([]);
  const [dateFilter, setDateFilter] = useState({
    endDate: landingDateFilterRange.endDate,
    startDate: landingDateFilterRange.startDate,
  });

  /**
   * Call API and generate graphs correspond to data
   * @param {object} dateRangeFilter
   */
  const loadLandingPagesData = (dateRangeFilter) => {
    if (activeCampaign && activeCampaign.id === null) {
      return cogoToast.warn('No Active campaign selected!', {position: 'bottom-left'});
    }

    setIsLoading(true);
    return CampaignService.getCampaignLandingPages(activeCampaign.id, dateRangeFilter)
      .then((response) => {
        setLandingPagesList(response.data.summary.splice(0, 7));
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
    const label = (moment(startDate).format('MMM DD, YYYY') + ' to ' + moment(endDate).format('MMM DD, YYYY')).toString();

    setFilterDateTitle(label);
    setDateFilter({startDate: moment(startDate).format('YYYY-MM-DD'), endDate: moment(endDate).format('YYYY-MM-DD')});
    setLandingDateFilterRange({
      label: label,
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD'),
    });
    loadLandingPagesData({startDate: moment(startDate).format('YYYY-MM-DD'), endDate: moment(endDate).format('YYYY-MM-DD')});
  };

  useEffect(() => {
    loadLandingPagesData(dateFilter);
  }, [activeCampaign.id]);

  return (
    <Fragment>
      <section className="filter-bar ">
        <div className="inner-filter-bar w-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <PageTitleCampaignDropdown pageName="Landing Pages" campaignId={activeCampaign.id} campaignList={window.$campaigns} />
              </div>
              <div className="col-md-6 text-right">
                <div className="block-filter">
                  {/* <DropdownFilter /> */}
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
