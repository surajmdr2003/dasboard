import React, { useState, useEffect, Fragment } from 'react';
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
    Impression: primaryColor,
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
    slug: 'conversion',
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
const start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate())).format('YYYY-MM-DD');
const end = moment(start).add(7, 'days').format('YYYY-MM-DD');

const CampaignGraph = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialData); // For graph data
  const [activeAttr, setActive] = useState('impressions'); // For active graph (tab)
  const [filterDateTitle, setFilterDateTitle] = useState('Last 7 Days'); // For datepicker label
  const [summaryData, setSummaryData] = useState({
    clicks: 0,
    clicks_percent: 0,
    impressions: 0,
    impressions_percent: 0,
    ctr: 0,
    ctr_percent: 0,
    conversion: 0,
    conversion_percent: 0,
    convrate: 0,
    convrate_percent: 0,
  });


  const apiRequest = {
    headers: { accept: '*/*' },
    response: true,
    queryStringParameters: {},
  };

  useEffect(() => {
    advertiserPerformanceData(start, end);
  }, []);

  /**
   * Call API and generate graphs correspond to data
   * @param {start date} sDate
   * @param {end date} eDate
   */
  const advertiserPerformanceData = (sDate, eDate) => {
    setIsLoading(true);
    Auth.currentSession()
      .then(async function(info) {
        let response;
        const accessToken = info.getAccessToken().getJwtToken();

        // Setting up header info
        apiRequest.headers.authorization = `Bearer ${accessToken}`;

        Object.assign(apiRequest.queryStringParameters, {
          startDate: sDate,
          endDate: eDate,
        });

        const apiEndPoint = (props.campaignId) ? 'canpaignGroupPerformance' : 'advertiserPerformance';
        response = await API.post(apiEndPoint, '', apiRequest);

        // Reformatting data for BarGraph
        reformatDataForGraph(response.data.data);

        // Merge old summary data and new summarydata from api
        setSummaryData(oldData => {
          return { ...oldData, ...response.data.summary[0] };
        });

        setTimeout(() => {
          updateGraph('impressions');
          setIsLoading(false)
        }, 1000);
      })
      .catch(() => false)
      .finally(() => setIsLoading(false));
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
    graphData.conversion = [];
    graphData.convrate = [];

    return data.forEach(element => {
      graphData.date.push(element.date);
      graphData.impressions.push(element.impressions);
      graphData.clicks.push(element.clicks);
      graphData.ctr.push(element.impressions);
      graphData.conversion.push(element.clicks);
      graphData.convrate.push(element.impressions);
    });
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

  return (
    <section className="all-campaigns-content">
      <div className="container">
      {
        isLoading
          ? <div className="text-center m-5">
              <div className="spinner-grow spinner-grow-lg" role="status"> <span className="sr-only">Loading...</span></div>
            </div>
          : <div className="card campaigns-card">
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
                <div className="row">
                  <div className="col-md-8 pr-0 br">
                    <div className="campaigns-chart">
                      <ul className="nav nav-pills nav-fill bb">
                        {campaignTabs.map((tab) => {
                          return (
                            <li key={tab.slug} className={'nav-item ' + ((activeAttr === tab.slug) ? 'active' : '')} onClick={() => updateGraph(tab.slug)}>
                              <div className="number">{summaryData[tab.slug]}</div>
                              <div className="title">{tab.label}</div>
                              <div className={'percent ' + ((summaryData[tab.slug + '_percent'] >= 0) ? 'up-percent' : 'down-percent')}>{summaryData[tab.slug + '_percent']}</div>
                            </li>);
                        })
                        }
                      </ul>
                      <div className="chart-block">
                        <C3Chart size={size} data={data} bar={bar} axis={axis} unloadBeforeLoad={true} legend={legend} />
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
      }
      </div>
    </section>
  );
};

export default CampaignGraph;