import React, { Fragment, useState, useEffect } from 'react';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import ReactDatatable from '@ashvin27/react-datatable';
import cogoToast from 'cogo-toast';
import Modal from 'react-bootstrap/Modal';

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
  const { activeCampaign, creativesDateFilterRange, setCreativesDateFilterRange } = React.useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [filterDateTitle, setFilterDateTitle] = useState(creativesDateFilterRange.label);
  const [groupedCreatives, setGroupedCreatives] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [filterLabel, setFilterLabel] = useState('Filter By Size');
  const [sizeFilters, setSizeFilters] = useState(['All Sizes']);
  const [creativeOnModal, setCreativeOnModal] = useState({
    params: {
      name: '',
      url: '',
    },
  });
  const [dateFilter, setDateFilter] = useState({
    endDate: creativesDateFilterRange.endDate,
    startDate: creativesDateFilterRange.startDate,
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (event, data) => {
    setShow(true);
    setCreativeOnModal(data);
  };

  const [columns] = useState([
    {
      text: 'Ad name',
      key: 'name',
      sortable: true,
      cell: row => (<div className="campaign-media media">
        {
          row.params.url.endsWith('mp4')
            ? <a title="Preview video" className="tooltip">
              <span className="play-icon"><i className="icon-caret-left" /></span>
              <span className="tooltiptext">Click to preview video</span>
            </a>
            : <a title="Preview image" className="tooltip">
              <object data={row.params.url} />
              <span className="tooltiptext">Click to preview image</span>
            </a>
        }
        <div className="media-body">
          <p className="mt-0">{(row.params.name) ? row.params.name : 'No Data'}</p>
        </div>
      </div>),
    },
    {
      text: 'Size',
      key: 'size',
      sortable: false,
      className: 'size-column',
      TrOnlyClassName: 'size-column',
      cell: row => (<ImageSizeRow row={row} />),
    },
    {
      text: 'Impressions',
      key: 'impressions',
      sortable: true,
      cell: row => (<div row={row}>{row.impressions.toLocaleString()}</div>),
    },
    {
      text: 'Clicks',
      key: 'clicks',
      sortable: true,
      cell: row => (<div row={row}>{row.clicks.toLocaleString()}</div>),
    },
    {
      text: 'CTR',
      key: 'ctr',
      sortable: true,
      cell: row => (<div row={row}>{row.ctr}%</div>),
    },
    {
      text: 'Conversions',
      key: 'conversions',
      sortable: true,
      cell: row => (<div row={row}>{row.conversions.toLocaleString()}</div>),
    },
    {
      text: 'Conv. rate',
      key: 'convRate',
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
      return cogoToast.warn('No Active campaign selected!', { position: 'bottom-left' });
    }

    setIsLoading(true);
    return CampaignService.getCampaignCreatives(activeCampaign.id, dateRangeFilter)
      .then(response => {
        const gCreatives = groupBy(response.data.summary.map(summary => ({ ...summary, size: summary.params.dimension })), 'size');
        setSizeFilters(['All Sizes', ...Object.keys(gCreatives)]);
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
    row.name = row.params.name;
    row.ctr = handleNanValueWithCalculation(row.clicks, row.impressions);
    row.conversions = Array.isArray(row.conversions) ? row.conversions.reduce((sum, next) => sum + next.count, 0) : row.conversions;
    row.convRate = handleNanValueWithCalculation(+row.conversions, row.clicks);

    return row;
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

  // const calculateAssetDimensional = (asset) => {
  //   const img = new Image();
  //   img.src = asset;
  //   img.onload;
  //   return (img.width + 'x' + img.height);
  // };

  const getFilteredOrAllCreatives = (size) => {
    let list = [];

    if (size && size !== 'All Sizes') {
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

    const config = {
      page_size: 10,
      length_menu: [10, 20, 50],
      show_filter: false,
      show_pagination: (creatives.length > 10) ? true : false,
      pagination: 'advance',
      key_column: 'campaignAssetId',
      button: {
        excel: false,
        print: false,
      },
      language: {
        no_data_text: 'No creatives for this campaign.',
      },
    };

    return (<ReactDatatable
      config={config}
      columns={columns}
      records={creatives.map(prepareTableRow)}
      onRowClicked={handleShow} />);
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
                <PageTitleCampaignDropdown pageName="Creatives" campaignId={activeCampaign.id} campaignList={window.$campaigns} />
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
      <section className="main-content-wrapper">
        <div className="container">
          {
            isLoading
              ? <div className="text-center m-5">
                <div className="spinner-grow spinner-grow-lg" role="status"> <span className="sr-only">Loading...</span></div>
              </div>
              : <div className="table-creatives">{loadViewOfCreative()}</div>
          }
        </div>
      </section>
      <Modal show={show} onHide={handleClose} size="lg" dialogClassName="creative-modal">
        <Modal.Header closeButton>
          {creativeOnModal.params.name}
        </Modal.Header>
        <Modal.Body>
          {
            creativeOnModal.params.url.endsWith('mp4')
              ? <video controls preload="none">
                <source src={creativeOnModal.params.url} type="video/mp4" />
                  Your browser does not support the video tag.
              </video>
              : <img src={creativeOnModal.params.url} />
          }
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default Creatives;
