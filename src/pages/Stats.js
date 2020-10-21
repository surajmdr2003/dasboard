import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import C3Chart from '@kaiouwang/react-c3js';
import 'c3/c3.css';


/** Service */
import StatsService from '../services/stats.service';

/** Components */
import PageTitleCampaignDropdown from '../components/PageTitleCampaignDropdown';
import ProgressBarBlock from '../components/ProgressBarBlock';
import DropdownFilter from '../components/form-fields/DropdownFilter';

const primaryColor = '#22a6de';
const secondaryColor = '#faddb1';

const size = {
  height: 320,
};

const legend = {
  show: false,
};

const bar = {
  width: {
    ratio: 0.5, // this makes bar width 50% of length between ticks
  },
};


const Stats = (props) => {
  const campaignId = props.match.params.id;

  const [months, setCampaignMonths] = useState([]);
  const [affinityData, setAffinityData] = useState([]);
  const [inMarketData, setInMarketData] = useState([]);
  const [genderData, setGenderData] = useState({
    columns: [
      ['Male', 0],
      ['Female', 0],
    ],
    type: 'donut',
    colors: {
      Male: primaryColor,
      Female: secondaryColor,
    },
  });

  const [genderAxisData] = useState({
    x: {
      type: 'category',
      categories: ['15-25', '25-35', '35-45', '45-55', '55+'],
      label: {
        position: 'inner-center',
      },
    },
    y: {
      show: false,
    },
  });

  const [ageData, setAgeData] = useState({
    columns: [
      ['Peoples'],
    ],
    type: 'bar',
    colors: {
      Impression: primaryColor,
    },
  });

  

  /**
  * API call to load month
  */
  const getCampaignMonths = () => {
    StatsService.getCampaignMonths(campaignId)
      .then((response) => {
        setCampaignMonths(response.data);
        loadStatsData(response.data[0].id);
      })
      .catch(() => false)
      .finally();
  };

  /**
   * API call to load stats data
   */
  const loadStatsData = (monthId) => {
    StatsService.getCampaignStatsOfMonth(monthId)
      .then((response) => {
        // setData(response.data);
        reformatDataForGraph(response.data);
      })
      .catch(() => false)
      .finally();
  };

  const reformatDataForGraph = (graphData) => {
    graphData.length
      ? graphData.find(item => {
        if (item.type === 'Gender Data') {
          formateGenderData(item.stats);
        } else if (item.type === 'Age Data') {
          formateAgeData(item.stats);
        } else if (item.type === 'Affinity Data') {
          formateAffinityData(item.stats);
        } else if (item.type === 'In Market Data') {
          formateInMarketData(item.stats);
        }
      })
      : (formateAffinityData([]),
      formateInMarketData([]),
      formateGenderData([{ 'field': 'Male', 'value': 0 }, { 'field': 'Female', 'value': 0 }]),
      formateAgeData([{
        'field': '15-25',
        'value': 0,
      },
      {
        'field': '25-35',
        'value': 0,
      },
      {
        'field': '35-45',
        'value': 0,
      },
      {
        'field': '45-55',
        'value': 0,
      },
      {
        'field': '55+',
        'value': 0,
      },
      ])
      );
  };

  const formateGenderData = (statsData) => {
    setGenderData(prevData => {
      return ({
        ...prevData,
        columns: [
          ['Male', statsData.find(item => item.field === 'Male').value],
          ['Female', statsData.find(item => item.field === 'Female').value],
        ],
      });
    });
  };

  const formateAgeData = (statsData) => {
    setAgeData(prevData => {
      return ({
        ...prevData,
        columns: [
          ['People', ...statsData.map(item => item.value)],
        ],
      });
    });
  };

  const formateAffinityData = (statsData) => {
    setAffinityData(statsData);
  };

  const formateInMarketData = (statsData) => {
    setInMarketData(statsData);
  };

  const affinityTotal = affinityData.length ? affinityData.map(item => item.value).reduce((prev, next) => prev + next) : 0;
  const inMarketTotal = inMarketData.length ? inMarketData.map(item => item.value).reduce((prev, next) => prev + next) : 0;

  const loadDataByMonth = (data) => {
    loadStatsData(data.id);
  };

  useEffect(() => {
    getCampaignMonths();
  }, [campaignId]);

  return (
    <Fragment>
      <section className="filter-bar ">
        <div className="inner-filter-bar w-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <PageTitleCampaignDropdown pageSlug="/dashboard/stats" campaignId={campaignId} campaignList={window.$campaigns} />
              </div>
              <div className="col-md-6 text-right">
                <div className="block-filter">
                  {
                    months.length
                      ? <DropdownFilter itemList={months} label={(months[0].name === '' ? months[0].id : months[0].name)} dropwDownCallBack={loadDataByMonth} />
                      : 'No Month'
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="campaigns-charts">
        <div className="container">
          <div className="row bar-donut-charts mb-5">
            <div className="col-sm-8">
              <div className="card card-chart card-bar-chart">
                <div className="card-body">
                  <h4>Age data</h4>
                  <div className="chart-block">
                    <C3Chart size={size} data={ageData} bar={bar} axis={genderAxisData} legend={legend} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card card-chart card-donut-chart">
                <div className="card-body">
                  <h4>Gender data</h4>
                  <div className="chart-block">
                    <C3Chart data={genderData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row progress-chart">
            <div className="col-sm-6">
              <div className="card card-chart card-progress-chart">
                <div className="card-body">
                  <h4>Affinity data</h4>
                  <ul className="progress-chart-block">
                    {affinityData.length && affinityTotal > 0
                      ? affinityData.map((progressbar, i) => {
                        return <ProgressBarBlock key={i} data={progressbar.value} label={progressbar.field} total={affinityTotal}/>;
                      })
                      : 'No Data'
                    }
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card card-chart card-progress-chart">
                <div className="card-body">
                  <h4>In market data</h4>
                  <ul className="progress-chart-block">
                    {inMarketData.length && inMarketTotal > 0
                      ? inMarketData.map((progressbar, i) => {
                        return <ProgressBarBlock key={i} data={progressbar.value} label={progressbar.field} total={inMarketTotal}/>;
                      })
                      : 'No Data'
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Stats.propTypes = {
  match: PropTypes.object,
};

export default Stats;
