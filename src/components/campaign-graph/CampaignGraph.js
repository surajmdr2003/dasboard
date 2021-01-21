import React, { useState, useEffect, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

// Contexts
import GlobalContext from '../../context/GlobalContext';

// Components
import DatePickerField from '../form-fields/DatePickerField';
import SingleCampaignInfo from '../SingleCompanyInfo';
import AllCampaignInfo from '../AllCampaignInfo';
// import CampaignDetail from '../CampaignDetail';
import ChartBlock from './ChartBlock';
import LifeTimeSummary from './LifeTimeSummary';

// Services
import CampaignService from '../../services/campaign.service';
import AdvertiserService from '../../services/advertiser.service';

/**
 * Attribute for graph starts
 */
const initialData = {
  graph: {
    x: 'x',
    columns: [
      ['x'],
      ['Impression'],
    ],
    type: 'spline',
    colors: {
      impression: '#22a6de',
    },
  },
  summaryData: {
    clicks: 0,
    impressions: 0,
    conversions: [],
    change: [],
    params: {
      hasConversions: true,
    },
  },
  campaignInfo: {
    active: 0,
    inactive: 0,
    paused: 0,
    total: 0,
  },
  graphData: {
    date: [],
    impressions: [],
    clicks: [],
    ctr: [],
    conversion: [],
    convrate: [],
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
    label: 'Conversions',
    slug: 'conversions',
  },
  {
    label: 'Conv. rate',
    slug: 'convrate',
  },
];

const CampaignGraph = (props) => {
  const currentCampaign = window.$campaigns.find(item => item.id === parseInt(props.campaignId, 10));
  const { user, campaignDateFilterRange, setCampaignDateFilterRange } = React.useContext(GlobalContext);
  const [filterDateTitle, setFilterDateTitle] = useState(campaignDateFilterRange.label);
  const [chartDate, setChartDate] = useState((moment(campaignDateFilterRange.startDate).format('MMM DD, YYYY') + ' - ' + moment(campaignDateFilterRange.endDate).format('MMM DD, YYYY')).toString()); // For datepicker label
  const [state, setState] = useState({
    isLoading: true,
    activeTab: 'impressions',
    summaryData: initialData.summaryData,
    campaignInfo: initialData.campaignInfo,
    graphData: initialData.graphData,
    selectedPreset: '',
    lifetime: {
      start: '',
      end: '',
    },
  });

  useEffect(() => {
    initialize();
  }, [user.id, props.campaignId]);

  const initialize = async() => {
    campaignDateFilterRange;

    setState({ ...state, isLoading: true });
    const userInfo = await AdvertiserService.getAdvertiserProfile(user.id);
    const response = await loadAdvertiserPerformanceData(user.id, campaignDateFilterRange.startDate, campaignDateFilterRange.endDate);
    const formatedGraphData = reformatDataForGraph(response.data.data);

    setState({
      ...state,
      isLoading: false,
      graphData: formatedGraphData,
      campaignInfo: userInfo.data.campaigns,
      summaryData: response.data.summary.length ? response.data.summary[0] : initialData.summaryData,
      lifetime: {
        start: response.data.summary.length ? response.data.summary[0].startDate : '',
        end: response.data.summary.length ? response.data.summary[0].endDate : '',
      },
    });
  };

  /**
   * Call API and generate graphs correspond to data
   * @param {Number | String} advertiserId
   * @param {start date} sDate
   * @param {end date} eDate
   */
  const loadAdvertiserPerformanceData = (advertiserId, sDate, eDate) => {
    const filterOptions = {
      startDate: sDate,
      endDate: eDate,
      interval: checkInterval(sDate, eDate),
      includeChange: true,
    };

    const makeApiCall = (props.campaignId)
      ? CampaignService.getCampaignPerformance(props.campaignId, filterOptions)
      : AdvertiserService.getAdvertiserPerformance(advertiserId, filterOptions);

    return makeApiCall;
  };

  /**
   * Returns interval correspond to provided date
   * @param {start date} sdate
   * @param {end date} edate
   */
  const checkInterval = (sDate, eDate) => {
    let interval = 'DAILY';
    const days = moment.duration(moment(eDate).diff(moment(sDate))).asDays();

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
    const graphData = {};

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
        graphData.conversions.push(element.conversions.reduce((sum, next) => sum + next.count, 0));
        graphData.convrate.push(handleNanValueWithCalculation(element.conversions.reduce((sum, next) => sum + next.count, 0), element.clicks));
      })
      : graphData.date.push(campaignDateFilterRange.endDate);
    graphData.impressions.push(0);
    graphData.clicks.push(0);
    graphData.ctr.push(0);
    graphData.conversions.push(0);
    graphData.convrate.push(0);

    return graphData;
  };

  /**
   * Handle NAN and Infinity value
   * @param {Int} fNum
   * @param {Int} sNum
   */
  const handleNanValueWithCalculation = (fNum, sNum) => {
    return (sNum === 0) ? (fNum * 100).toFixed(2) : ((fNum / sNum) * 100).toFixed(2);
  };

  const handlePresetChange = (index, name) => {
    setState({ ...state, selectedPreset: name });
  };

  /**
   * Update Bar graph correspond active tab
   * @param {String} label
   */
  const getSelectedGraph = (label) => {
    return {
      ...initialData.graph,
      columns: [
        ['x', ...state.graphData.date],
        [label, ...state.graphData[label]],
      ],
      colors: {
        [label]: '#22a6de',
      },
    };
  };

  /**
   * Callback func of date picker to handle start and end date
   * @param {date} startDate
   * @param {date} endDate
   */
  const datepickerCallback = async(startDate, endDate) => {
    const range = (moment(startDate).format('MMM DD, YYYY') + ' - ' + moment(endDate).format('MMM DD, YYYY')).toString();
    setFilterDateTitle(range);
    setCampaignDateFilterRange({
      label: range,
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD'),
    });
    setChartDate(range);
    setState({ ...state, isLoading: true });

    const response = await loadAdvertiserPerformanceData(user.id, moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'));
    const formatedGraphData = reformatDataForGraph(response.data.data);
    setState({
      ...state,
      isLoading: false,
      graphData: formatedGraphData,
      summaryData: response.data.summary.length ? response.data.summary[0] : {
        clicks: 0,
        impressions: 0,
        conversions: [],
        change: [],
        params: null,
      },
    });
  };

  const tabData = (slug) => {
    if (slug === 'conversions') {
      return (state.summaryData.params !== null && !state.summaryData.params.hasConversions)
        ? hasNoConversionView()
        : state.summaryData.conversions.reduce((sum, next) => sum + next.count, 0);
    } else if (slug === 'convrate') {
      return handleNanValueWithCalculation(state.summaryData.conversions.reduce((sum, next) => sum + next.count, 0), state.summaryData.clicks) + '%';
    } else if (slug === 'ctr') {
      return handleNanValueWithCalculation(state.summaryData.clicks, state.summaryData.impressions) + '%';
    }
    return state.summaryData[slug].toLocaleString();
  };

  const hasNoConversionView = () => {
    return (<OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <span className="icon">- <img src="/assets/images/question-circular.svg" /></span>
    </OverlayTrigger>);
  };

  const renderTooltip = (propsInfo) => (
    <Tooltip id="button-tooltip" {...propsInfo}>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
    </Tooltip>
  );

  const showChangeValue = (changeVal, activeTab) => {
    const clickChange = changeVal.find(value => value.metricType === 'CLICK');
    const conversionChange = changeVal.find(value => value.metricType === 'CONVERSION');
    const impressionChange = changeVal.find(value => value.metricType === 'IMPRESSION');
    const ctrChange = changeVal.find(value => value.metricType === 'CTR');
    const conversionRateChange = changeVal.find(value => value.metricType === 'CONVERSION_RATE');

    if (activeTab === 'impressions') {
      return showViewOf(impressionChange);
    } else if (activeTab === 'clicks') {
      return showViewOf(clickChange);
    } else if (activeTab === 'conversions') {
      return showViewOf(conversionChange);
    } else if (activeTab === 'convrate') {
      return showViewOf(conversionRateChange);
    } else if (activeTab === 'ctr') {
      return showViewOf(ctrChange);
    }

    return '-';
  };

  const showViewOf = (val) => {
    return (val)
      ? <div className={'percent ' + ((val.change >= 0) ? 'up-percent' : 'down-percent')}>{Math.abs(val.change)}%</div>
      : <div className="percent">N/A</div>;
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
                    ? <SingleCampaignInfo campaignDetail={currentCampaign} chartDate={state.summaryData.params ? (moment(state.summaryData.params.startDate).format('MMM DD, YYYY') + ' - ' + moment(state.summaryData.params.endDate).format('MMM DD, YYYY')) : (state.isLoading ? ' xx-xx-xxxx - xx-xx-xxxx' : chartDate)} />
                    : <AllCampaignInfo campaigns={state.campaignInfo} />
                }
              </div>
              <div className="col-md-6 text-right">
                <DatePickerField applyCallback={datepickerCallback} label={filterDateTitle} rangeCallback={handlePresetChange} selectedPreset={state.selectedPreset} lifetime={state.lifetime} />
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className={(props.campaignId ? 'col-md-12' : 'col-md-8 br pr-0')}>
                <div className="campaigns-chart">
                  {
                    state.isLoading
                      ? <div className="text-center m-5">
                        <div className="spinner-grow spinner-grow-lg" role="status"> <span className="sr-only">Loading...</span></div>
                      </div>
                      : <Fragment>
                        <ul className="nav nav-pills nav-fill bb">
                          {campaignTabs.map((tab) => {
                            return (
                              <li key={tab.slug} className={'nav-item ' + ((state.activeTab === tab.slug) ? 'active' : '')}
                                onClick={() => setState({ ...state, activeTab: tab.slug })}>
                                <div className="number">{tabData(tab.slug)}</div>
                                <div className="title">{tab.label}</div>
                                {(state.summaryData.params !== null && !state.summaryData.params.hasConversions && tab.slug === 'conversions')
                                  ? <div className="percent text-primary">Set Up Conversion</div>
                                  : state.summaryData.change !== null && state.summaryData.change.length ? showChangeValue(state.summaryData.change, tab.slug) : ''
                                }
                              </li>);
                          })
                          }
                        </ul>
                        <ChartBlock chartDate={chartDate} selectedGraph={getSelectedGraph(state.activeTab)} />
                      </Fragment>
                  }
                </div>
              </div>
              {!props.campaignId
                ? <div className="col-md-4">
                  <LifeTimeSummary advertiserId={user.id} />
                </div>
                : ''  }
              {/* <div className="col-md-4">
                {props.campaignId ? <CampaignDetail campaignDesp={currentCampaign} /> : <LifeTimeSummary advertiserId={user.id} />}
              </div> */}
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
