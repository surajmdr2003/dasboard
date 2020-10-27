import React, { Fragment, useState, useEffect } from 'react';
import moment from 'moment';

// Context
import GlobalContext from '../context/GlobalContext';

/** Components */
import DatePickerField from '../components/form-fields/DatePickerField';
import PageTitleCampaignDropdown from '../components/PageTitleCampaignDropdown';
import TableLandingPages from '../components/TableLandingPages';

// Campaign Service
import CampaignService from '../services/campaign.service';

const LandingPages = () => {
  const {activeCampaign, dateFilterRange} = React.useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [filterDateTitle, setFilterDateTitle] = useState(`Last  ${dateFilterRange.days} Days`);
  const [topLandingPageList, setLandingPagesList] = useState([]);
  const [dateFilter, setDateFilter] = useState({
    endDate: dateFilterRange.endDate,
    startDate: dateFilterRange.startDate,
  });

  /**
   * Call API and generate graphs correspond to data
   * @param {object} dateRangeFilter
   */
  const loadLandingPagesData = (dateRangeFilter) => {
    if (activeCampaign && activeCampaign.id === null) {
      return console.log('No Active campaign selected!');
    }

    setIsLoading(true);
    return CampaignService.getCampaignLandingPages(activeCampaign.id, dateRangeFilter)
      .then((response) => {
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
    setFilterDateTitle((moment(startDate).format('DD MMM YY') + ' to ' + moment(endDate).format('DD MMM YY')).toString());
    setDateFilter({startDate: moment(startDate).format('YYYY-MM-DD'), endDate: moment(endDate).format('YYYY-MM-DD')});
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
                <PageTitleCampaignDropdown pageSlug="/dashboard/landing-pages" campaignId={activeCampaign.id} campaignList={window.$campaigns} />
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
