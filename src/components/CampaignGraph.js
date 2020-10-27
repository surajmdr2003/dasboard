import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import C3Chart from '@kaiouwang/react-c3js';
import 'c3/c3.css';
import moment from 'moment';

// Components
import DatePickerField from './form-fields/DatePickerField';
import AllCampaignsLifetimeData from './AllCampaignsLifetimeData';
import SingleCampaignInfo from './SingleCompanyInfo';
import AllCampaignInfo from './AllCampaignInfo';
import CampaignDetail from './CampaignDetail';

// Services
import CampaignService from '../services/campaign.service';
import AdvertiserService from '../services/advertiser.service';

// Contexts
import GlobalContext from '../context/GlobalContext';

/**
 * Attribute for graph starts
 */
const primaryColor = '#22a6de';

const initialData = {
  x: 'x',
  columns: [
    ['x'],
    ['Impression'],
  ],
  type: 'bar',
  colors: {
    impression: primaryColor,
  },
};

const size = {
  height: 280,
};

const legend = {
  show: false,
};

const bar = {
  width: 10,
};

const axis = {
  x: {
    type: 'timeseries',
    tick: {
      format: '%m-%d',
    },
    label: {
      position: 'inner-center',
    },
  },
  y: {
    show: false,
  },
};

/** Attributes for bar graph ends **/

/**
 * Campaigns Attr Tab
 */
const campaignTabs = [
  {
    label: 'Impressions',
    slug: 'impressions',
  },
  {
    label: 'Clicks',
    slug: 'clicks',
  },
  {
    label: 'CTR',
    slug: 'ctr',
  },
  {
    label: 'Conversion',
    slug: 'conversions',
  },
  {
    label: 'Conv rate',
    slug: 'convrate',
  },
];

/**
 * Format of data for bar graph
 */
const graphData = {
  date: [],
  impressions: [],
  clicks: [],
  ctr: [],
  conversion: [],
  convrate: [],
};

const CampaignGraph = (props) => {
  const {dateFilterRange} = React.useContext(GlobalContext);
  const currentCampaign = window.$campaigns.find(item => item.id === parseInt(props.campaignId, 10));
  const [userId, serUserId] = useState(null);
  const [gData, setData] = useState(initialData); // For graph data
  const [activeAttr, setActive] = useState('impressions'); // For active graph (tab)
  const [filterDateTitle, setFilterDateTitle] = useState(`Last ${dateFilterRange.days} Days`); // For datepicker label
  const [chartDate, setChartDate] = useState((moment(dateFilterRange.startDate).format('MMM DD YYYY') + ' - ' + moment(dateFilterRange.endDate).format('MMM DD YYYY')).toString()); // For datepicker label
  const [summaryData, setSummaryData] = useState({
    clicks: 0,
    impressions: 0,
    conversions: [],
    change: [],
  });
  const [lifeTimeData, setLifeTimeData] = useState({
    clicks: 0,
    impressions: 0,
    conversions: [],
  });
  const [campaignInfo, setCampaignInfo] = useState({
    campaigns: {
      active: 0,
      inactive: 0,
      paused: 0,
      total: 0,
    },
  });

  useEffect(() => {
    initialize();
  }, [props.campaignId]);

  const initialize = async() => {
    const userInfo = await AdvertiserService.getAdvertiser();

    // Load Advertiser Lifetime Data
    advertiserLifeTimeData(userInfo.data.id);
    advertiserPerformanceData(userInfo.data.id, dateFilterRange.startDate, dateFilterRange.endDate);

    // Set User Campaign Info
    setCampaignInfo(userInfo.data.campaigns);
    serUserId(userInfo.data.id);
  };

  /**
   * Call API and generate graphs correspond to data
   * @param {Number | String} advertiserId
   * @param {start date} sDate
   * @param {end date} eDate
   */
  const advertiserPerformanceData = (advertiserId, sDate, eDate) => {
    const makeApiCall = (props.campaignId)
      ? CampaignService.getCampaignPerformance(props.campaignId)
      : AdvertiserService.getAdvertiserPerformance(advertiserId, {
        startDate: sDate,
        endDate: eDate,
        interval: checkInterval(sDate, eDate),
        includeChange: true,
      });

    makeApiCall.then(response => {
      // Reformatting data for BarGraph
      reformatDataForGraph(response.data.data);

      // Merge old summary data and new summarydata from api
      setSummaryData(
        (response.data.summary.length)
          ? response.data.summary[0]
          : {
            clicks: 0,
            impressions: 0,
            conversions: [],
            change: [],
          }
      );

      setTimeout(() => {
        updateGraph('impressions');
      }, 500);
    });
  };

  /**
   * Call API for life time data
   */
  const advertiserLifeTimeData = (advertiserId) => {
    AdvertiserService.getAdvertiserPerformanceLifetime(advertiserId)
      .then((response) => {
        setLifeTimeData(response.data.summary.length ? response.data.summary[0] : null);
      })
      .catch(() => false);
  };

  /**
   * Returns interval correspond to provided date
   * @param {start date} sdate
   * @param {end date} edate
   */
  const checkInterval = (sDate, eDate) => {
    const days = moment.duration(moment(eDate).diff(moment(sDate))).asDays();
    let interval = 'DAILY';

    if (days > 60 && days < 365) {
      interval = 'WEEKLY';
    } else if (days > 365) {
      interval = 'MONTHLY';
    }

    return interval;
  };

  /**
   * Returns Formatted data for Bar graph
   * @param {Array} data
   */
  const reformatDataForGraph = (data) => {
    graphData.date = [];
    graphData.impressions = [];
    graphData.clicks = [];
    graphData.ctr = [];
    graphData.conversions = [];
    graphData.convrate = [];

    data.length
      ? data.forEach(element => {
        graphData.date.push(element.date);
        graphData.impressions.push(element.impressions);
        graphData.clicks.push(element.clicks);
        graphData.ctr.push(handleNanValueWithCalculation(element.clicks, element.impressions));
        graphData.conversions.push(element.conversions.length);
        graphData.convrate.push(handleNanValueWithCalculation(element.conversions.length, element.clicks));
      })
      : graphData.date.push(end);
    graphData.impressions.push(0);
    graphData.clicks.push(0);
    graphData.ctr.push(0);
    graphData.conversions.push(0);
    graphData.convrate.push(0);

    updateGraph('impressions');
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

  /**
   * Update Bar graph correspond active tab
   * @param {String} label
   */
  const updateGraph = (label) => {
    setData((prevData) => {
      return ({
        ...prevData,
        columns: [
          ['x', ...graphData.date],
          [label, ...graphData[label]],
        ],
        colors: {
          [label]: primaryColor,
        },
      });
    });
    setActive(label);
  };

  /**
   * Callback func of date picker to handle start and end date
   * @param {date} startDate
   * @param {date} endDate
   */
  const datepickerCallback = (startDate, endDate) => {
    const range = (moment(startDate).format('DD MMM YY') + ' - ' + moment(endDate).format('DD MMM YY')).toString();
    setFilterDateTitle(range);
    setChartDate((moment(startDate).format('MMM DD YYYY') + ' - ' + moment(endDate).format('MMM DD YYYY')).toString());
    advertiserPerformanceData(userId, moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'));
  };

  const tabData = (slug) => {
    if (slug === 'conversions') {
      return summaryData[slug].length;
    } else if (slug === 'convrate') {
      return handleNanValueWithCalculation(summaryData.conversions.length, summaryData.clicks) + '%';
    } else if (slug === 'ctr') {
      return handleNanValueWithCalculation(summaryData.clicks, summaryData.impressions) + '%';
    }
    return summaryData[slug];
  };

  const showChangeValue = (changeVal, activeTab) => {
    const clickChange = changeVal.find(value => value.metricType === 'CLICK').change.toFixed(10);
    const conversionChange = changeVal.find(value => value.metricType === 'CONVERSION').change.toFixed(10);
    const impressionChange = changeVal.find(value => value.metricType === 'IMPRESSION').change.toFixed(10);

    if (activeTab === 'impressions') {
      return showViewOf(impressionChange);
    } else if (activeTab === 'clicks') {
      return showViewOf(clickChange);
    } else if (activeTab === 'conversions') {
      return showViewOf(conversionChange);
    } else if (activeTab === 'convrate') {
      return showViewOf(handleNanValueWithCalculation(summaryData.conversions.length, summaryData.clicks));
    } else if (activeTab === 'ctr') {
      return showViewOf(handleNanValueWithCalculation(summaryData.clicks, summaryData.impressions));
    }

    return '-';
  };

  const showViewOf = (val) => {
    return <div className={'percent ' + ((val >= 0) ? 'up-percent' : 'down-percent')}>{Math.abs(val).toFixed(2)}</div>;
  };

  return (
    <section className="all-campaigns-content">
      <div className="container">
        <div className="card campaigns-card">
          <div className="card-header">
            <div className="row">
              <div className="col-md-6">
                {
                  (props.campaignId)
                    ? <SingleCampaignInfo campaignDetail={currentCampaign} chartDate={chartDate}/>
                    : <AllCampaignInfo campaigns={campaignInfo}/>
                }
              </div>
              <div className="col-md-6 text-right">
                <DatePickerField applyCallback={datepickerCallback} label={filterDateTitle} />
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-8 pr-0 br">
                <div className="campaigns-chart">
                  <ul className="nav nav-pills nav-fill bb">
                    {campaignTabs.map((tab) => {
                      return (
                        <li key={tab.slug} className={'nav-item ' + ((activeAttr === tab.slug) ? 'active' : '')} onClick={() => updateGraph(tab.slug)}>
                          <div className="number">{tabData(tab.slug)}</div>
                          <div className="title">{tab.label}</div>
                          { summaryData.change !== null && summaryData.change.length ? showChangeValue(summaryData.change, tab.slug) : ''}
                        </li>);
                    })
                    }
                  </ul>
                  <div className="chart-block">
                    <div className="date-range">{chartDate}</div>
                    <C3Chart size={size} data={gData} bar={bar} axis={axis} unloadBeforeLoad={true} legend={legend} />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                {
                  (props.campaignId)
                    ? <CampaignDetail />
                    : <AllCampaignsLifetimeData summaryData={lifeTimeData} />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

CampaignGraph.propTypes = {
  campaignId: PropTypes.any,
  campaignDetail: PropTypes.any,
};

export default React.memo(CampaignGraph);
