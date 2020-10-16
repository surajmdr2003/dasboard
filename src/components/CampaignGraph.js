import React, { useState, useEffect, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { Auth, API } from 'aws-amplify';

import C3Chart from '@kaiouwang/react-c3js';
import 'c3/c3.css';
import moment from 'moment';
import DatePickerField from './form-fields/DatePickerField';
import AllCampaignsLifetimeData from './AllCampaignsLifetimeData';
import CampaignDetail from './CampaignDetail';


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
  width: {
    ratio: 0.5, // this makes bar width 50% of length between ticks
  },
};

const axis = {
  x: {
    type: 'timeseries',
    tick: {
      format: '%d-%m-%Y',
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

/**
 * For Initial startdate and enddate
 */
const now = new Date();
const end = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate())).format('YYYY-MM-DD');
const start = moment(start).subtract(7, 'days').format('YYYY-MM-DD');

const CampaignGraph = (props) => {
  const [gData, setData] = useState(initialData); // For graph data
  const [activeAttr, setActive] = useState('impressions'); // For active graph (tab)
  const [filterDateTitle, setFilterDateTitle] = useState('Last 7 Days'); // For datepicker label
  const [summaryData, setSummaryData] = useState({
    clicks: 0,
    impressions: 0,
    conversions: [],
  });


  const apiRequest = {
    headers: { accept: '*/*' },
    response: true,
    queryStringParameters: {},
  };

  useEffect(() => {
    advertiserPerformanceData(start, end);
  }, [props.campaignId]);

  /**
   * Call API and generate graphs correspond to data
   * @param {start date} sDate
   * @param {end date} eDate
   */
  const advertiserPerformanceData = (sDate, eDate) => {
    Auth.currentSession()
      .then(async function(info) {
        const accessToken = info.getAccessToken().getJwtToken();

        // Setting up header info
        apiRequest.headers.authorization = `Bearer ${accessToken}`;

        Object.assign(apiRequest.queryStringParameters, {
          startDate: sDate,
          endDate: eDate,
          interval: checkInterval(sDate, eDate),
        });

        const apiEndPoint = (props.campaignId) ? 'canpaignGroup' : 'advertiserPerformanceLandingPage';
        const apiPath = (props.campaignId) ? `/${props.campaignId}/performance` : '';

        const response = await API.post(apiEndPoint, apiPath, apiRequest);

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
            }
        );

        setTimeout(() => {
          updateGraph('impressions');
        }, 1000);
      })
      .catch(() => false)
      .finally();
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

    data.forEach(element => {
      graphData.date.push(element.date);
      graphData.impressions.push(element.impressions);
      graphData.clicks.push(element.clicks);
      graphData.ctr.push(handleNanValueWithCalculation(element.clicks, element.impressions));
      graphData.conversions.push(element.conversions.length);
      graphData.convrate.push(handleNanValueWithCalculation(element.conversions.length, element.clicks));
    });

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
    const range = (moment(startDate).format('DD MMM YY') + ' to ' + moment(endDate).format('DD MMM YY')).toString();
    setFilterDateTitle(range);
    advertiserPerformanceData(moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'));
  };

  /**
   * Returns view of All Campaigns Data
   */
  const AllCampaignInfo = () => {
    return (
      <Fragment>
        <h4>All Campaigns data</h4>
        <ul className="campaigns-datas nav">
          <li>12 total campaigns</li>
          <li className="active-campaign">5 Active</li>
          <li className="inactive-campaign">3 Inactive</li>
          <li className="paused-campaign">4 Paused</li>
        </ul>
      </Fragment>
    );
  };

  /**
   * Returns view of Single Campaigns Data
   */
  const SingleCampaignInfo = () => {
    return (
      <Fragment>
        <h4>Go Checking OU</h4>
        <ul className="campaigns-datas nav">
          <li>From 12th Jan 2020 - 18th Jan 2020</li>
          <li className="active-campaign">Active</li>
        </ul>
      </Fragment>
    );
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

  return (
    <section className="all-campaigns-content">
      <div className="container">
        <div className="card campaigns-card">
          <div className="card-header">
            <div className="row">
              <div className="col-md-6">
                {
                  (props.campaignId)
                    ? <SingleCampaignInfo />
                    : <AllCampaignInfo />
                }
              </div>
              <div className="col-md-6 text-right">
                <DatePickerField applyCallback={datepickerCallback} label={filterDateTitle} />
              </div>
            </div>
          </div>
          <div className="card-body">
            {/* {
              isLoading
                ? <div className="text-center m-5">
                  <div className="spinner-grow spinner-grow-lg" role="status"> <span className="sr-only">Loading...</span></div>
                </div>
                :

            } */}
            <div className="row">
              <div className="col-md-8 pr-0 br">
                <div className="campaigns-chart">
                  <ul className="nav nav-pills nav-fill bb">
                    {campaignTabs.map((tab) => {
                      return (
                        <li key={tab.slug} className={'nav-item ' + ((activeAttr === tab.slug) ? 'active' : '')} onClick={() => updateGraph(tab.slug)}>
                          <div className="number">{tabData(tab.slug)}</div>
                          <div className="title">{tab.label}</div>
                          <div className={'percent ' + ((summaryData[tab.slug + '_percent'] >= 0) ? 'up-percent' : 'down-percent')}>{summaryData[tab.slug + '_percent']}</div>
                        </li>);
                    })
                    }
                  </ul>
                  <div className="chart-block">
                    <C3Chart size={size} data={gData} bar={bar} axis={axis} unloadBeforeLoad={true} legend={legend} />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                {
                  (props.campaignId)
                    ? <CampaignDetail />
                    : <AllCampaignsLifetimeData summaryData={summaryData} />
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
};

export default CampaignGraph;
