import React, { Fragment, useState, useEffect } from 'react';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import DataTable from 'react-data-table-component';

// Context
import GlobalContext from '../context/GlobalContext';

/** Components */
import ImageSizeRow from '../components/common/ImageSizeRow';
import DatePickerField from '../components/form-fields/DatePickerField';
import DropdownFilter from '../components/form-fields/DropdownFilter';
import PageTitleCampaignDropdown from '../components/PageTitleCampaignDropdown';

/** Services */
import CampaignService from '../services/campaign.service';

const Creatives = () => {
  const { activeCampaign, creativesDateFilterRange, setCreativesDateFilterRange} = React.useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [filterDateTitle, setFilterDateTitle] = useState(creativesDateFilterRange.label);
  const [groupedCreatives, setGroupedCreatives] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [filterLabel, setFilterLabel] = useState('Filter By Size');
  const [sizeFilters, setSizeFilters] = useState(['All Size']);
  const [dateFilter, setDateFilter] = useState({
    endDate: creativesDateFilterRange.endDate,
    startDate: creativesDateFilterRange.startDate,
  });

  const [columns] = useState([
    {
      name: 'Ad name',
      selector: 'name',
      sortable: true,
      cell: row => (<div className="campaign-media media">
        {
          row.params.name.endsWith('mp4')
            ? <video controls preload="none">
              <source src={row.params.url} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            : <object data={row.params.url} />
        }
        <div className="media-body">
          <p className="mt-0">{(row.params.name) ? row.params.name : 'No Data'}</p>
        </div>
      </div>),
    },
    {
      name: 'Size',
      selector: 'size',
      sortable: false,
      cell: row => (<ImageSizeRow row={row} />),
    },
    {
      name: 'Impressions',
      selector: 'impressions',
      sortable: true,
      cell: row => (<div row={row}>{row.impressions.toLocaleString()}</div>),
    },
    {
      name: 'Clicks',
      selector: 'clicks',
      sortable: true,
      cell: row => (<div row={row}>{row.clicks.toLocaleString()}</div>),
    },
    {
      name: 'CTR',
      selector: 'ctr',
      sortable: true,
      cell: row => (<div row={row}>{row.ctr}%</div>),
    },
    {
      name: 'Conversion',
      selector: 'conversion',
      sortable: true,
      cell: row => (<div row={row}>{row.conversions}</div>),
    },
    {
      name: 'Conv rate',
      selector: 'conv-rate',
      sortable: true,
      cell: row => (<div row={row}>{row.convRate}%</div>),
    },
  ]);

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
        const gCreatives = groupBy(response.data.summary.map(summary => ({ ...summary, size: calculateAssetDimensional(summary.assetUrl) })), 'size');
        setSizeFilters(['All Size', ...Object.keys(gCreatives)]);
        setGroupedCreatives(gCreatives);
        setIsLoading(false);
      })
      .catch(() => false)
      .finally(() => setIsLoading(false));
  };

  /**
   * Preoare row data for table
   * @param {*} row
   */
  const prepareTableRow = (row) => {
    row.ctr = handleNanValueWithCalculation(row.clicks, row.impressions);
    row.conversions = Array.isArray(row.conversions) ? row.conversions.reduce((sum, next) => sum + next.count, 0).toLocaleString() : row.conversions.toLocaleString();
    row.convRate = handleNanValueWithCalculation(+row.conversions, row.clicks);

    return row;
  };

  /**
   * Handle callback of datepicker
   * @param {Start Date} startDate
   * @param {End Date} endDate
   */
  const datepickerCallback = (startDate, endDate) => {
    const label = (moment(startDate).format('DD MMM YY') + ' to ' + moment(endDate).format('DD MMM YY')).toString();

    setFilterDateTitle(label);
    setDateFilter({ startDate: moment(startDate).format('YYYY-MM-DD'), endDate: moment(endDate).format('YYYY-MM-DD') });
    setCreativesDateFilterRange({
      label: label,
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD'),
    });
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
      ? <DataTable
        columns={columns}
        data={creatives.map(prepareTableRow)}
        persistTableHead
        pagination={creatives.length > 10 ? true : false}
      />
      : <div className="text-center">No creative in this campaign</div>;
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
                <PageTitleCampaignDropdown pageName="Creatives Page" campaignId={activeCampaign.id} campaignList={window.$campaigns} />
              </div>
              <div className="col-md-6 text-right">
                <div className="block-filter">
                  {sizeFilters.length ? <DropdownFilter itemList={sizeFilters.map((item) => ({ id: item, name: item }))} label={filterLabel} dropwDownCallBack={loadDataByMonth} /> : ''}
                  <DatePickerField applyCallback={datepickerCallback} label={filterDateTitle} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="main-content-wrapper table-creatives">
        <div className="container">
          {
            isLoading
              ? <div className="text-center m-5">
                <div className="spinner-grow spinner-grow-lg" role="status"> <span className="sr-only">Loading...</span></div>
              </div>
              : loadViewOfCreative()
          }
        </div>
      </section>
    </Fragment>
  );
};

export default Creatives;
