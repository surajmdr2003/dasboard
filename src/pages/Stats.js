import React, { Fragment, useState, useEffect } from 'react';
import C3Chart from '@kaiouwang/react-c3js';
import 'c3/c3.css';

/** Components */
import { Auth, API } from 'aws-amplify';
import PageTitleWithOutFilter from '../components/PageTitleWithOutFilter';
import ProgressBarBlock from '../components/ProgressBarBlock';

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


const Stats = () => {
  const [affinityData, setAffinityData] = useState([]);
  const [inMarketData, setInMarketData] = useState([]);
  const [genderData, setGenderData] = useState({
    columns: [
      ['Male', 70],
      ['Female', 30],
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
      ['Peoples' ],
    ],
    type: 'bar',
    colors: {
      Impression: primaryColor,
    },
  });

  const apiRequest = {
    headers: { accept: '*/*' },
    response: true,
  };

  /**
   * API call to load stats data
   */
  const loadStatsData = () => {
    Auth.currentSession()
      .then(async function(info) {
        const accessToken = info.getAccessToken().getJwtToken();

        // Setting up header info
        apiRequest.headers.authorization = `Bearer ${accessToken}`;

        // const apiEndPoint = (props.campaignId) ? 'canpaignGroup' : 'advertiserPerformanceLandingPage';
        const apiPath = '/4955/stats';
        const response = await API.get('canpaignGroup', apiPath, apiRequest);

        // Reformatting data for BarGraph
        reformatDataForGraph(response.data);
      })
      .catch(() => false)
      .finally();
  };

  const reformatDataForGraph = (graphData) => {
    graphData.find(item => {
      if (item.type === 'Gender Data') {
        formateGenderData(item.stats);
      } else if (item.type === 'Age Data') {
        formateAgeData(item.stats);
      } else if (item.type === 'Affinity Data') {
        formateAffinityData(item.stats);
      } else if (item.type === 'In Market Data') {
        formateInMarketData(item.stats);
      }
    });
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

  useEffect(() => {
    loadStatsData();
  }, []);

  return (
    <Fragment>
      {/* <PageTitleWithFilter/> */}
      <PageTitleWithOutFilter title="Stats" />
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
                    { affinityData.length
                      ? affinityData.map((progressbar, i) => {
                        return <ProgressBarBlock key={i} data={progressbar.value} label={progressbar.field}/>;
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
                    { inMarketData.length
                      ? inMarketData.map((progressbar, i) => {
                        return <ProgressBarBlock key={i} data={progressbar.value} label={progressbar.field}/>;
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

export default Stats;
