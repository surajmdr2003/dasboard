import React, { Fragment, useState, useEffect } from 'react';
import moment from 'moment';
import groupBy from 'lodash/groupBy';

// Context
import GlobalContext from '../context/GlobalContext';

/** Components */
import DatePickerField from '../components/form-fields/DatePickerField';
import DropdownFilter from '../components/form-fields/DropdownFilter';
import PageTitleCampaignDropdown from '../components/PageTitleCampaignDropdown';

/** Services */
import CampaignService from '../services/campaign.service';

const Creatives = () => {
  const {activeCampaign, dateFilterRange} = React.useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [filterDateTitle, setFilterDateTitle] = useState(`Last  ${dateFilterRange.days} Days`);
  const [groupedCreatives, setGroupedCreatives] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [filterLabel, setFilterLabel] = useState('Filter By Size');
  const [sizeFilters, setSizeFilters] = useState(['All Size']);
  const [dateFilter, setDateFilter] = useState({
    endDate: dateFilterRange.endDate,
    startDate: dateFilterRange.startDate,
  });

  /**
   * Call API and generate graphs correspond to data
   * @param {object} dateRangeFilter
   */
  const loadCreativesData = (dateRangeFilter) => {
    if (activeCampaign && activeCampaign.id === null) {
      return console.log('No Active campaign selected!');
    }

    setIsLoading(true);
    return CampaignService.getCampaignCreatives(activeCampaign.id, dateRangeFilter)
      .then(response => {
        const gCreatives = groupBy(response.data.summary.map(summary => ({...summary, size: calculateAssetDimensional(summary.assetUrl)})), 'size');
        setSizeFilters(['All Size', ...Object.keys(gCreatives)]);
        setGroupedCreatives(gCreatives);
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

  const getFilteredOrAllCreatives = (size) => {
    let list = [];

    if (size && size !== 'All Size') {
      list = groupedCreatives[size];
    } else {
      for (const creativeGroup in groupedCreatives) {
        list = [...list, ...groupedCreatives[creativeGroup]];
      }
    }

    return list;
  };

  const loadViewOfCreative = () => {
    const creatives = getFilteredOrAllCreatives(selectedSize) || [];

    return creatives && creatives.length
      ? creatives.map(creative => {
        return (<tr key={creative.campaignAssetId}>
          <td scope="row">
            <div className="campaign-media media">
              <object data={creative.assetUrl} />
              <div className="media-body">
                <p className="mt-0">{(creative.name === null || creative.name === '') ? 'No Data' : creative.name}</p>
              </div>
            </div>
          </td>
          <td>{creative.size}</td>
          <td>{creative.impressions}</td>
          <td>{creative.clicks}</td>
          <td>{handleNanValueWithCalculation(creative.clicks, creative.impressions)}%</td>
          <td>{creative.conversions.length}</td>
          <td>{handleNanValueWithCalculation(creative.conversions.length, creative.clicks)}%</td>
        </tr>);
      })
      : <tr><td colSpan="7" className="text-center">No creative in this campaign</td></tr>;
  };

  useEffect(() => {
    loadCreativesData(dateFilter);
  }, [activeCampaign.id]);

  const loadDataByMonth = (data) => {
    setSelectedSize(data.name);
    setFilterLabel('Size: ' + data.name);
  };

  return (
    <Fragment>
      <section className="filter-bar ">
        <div className="inner-filter-bar w-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <PageTitleCampaignDropdown pageSlug="/dashboard/creatives" campaignId={activeCampaign.id} campaignList={window.$campaigns} />
              </div>
              <div className="col-md-6 text-right">
                <div className="block-filter">
                  {sizeFilters.length ? <DropdownFilter itemList={sizeFilters.map((item) => ({id: item, name: item}))} label={filterLabel} dropwDownCallBack={loadDataByMonth} /> : ''}
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
                    : loadViewOfCreative()
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
