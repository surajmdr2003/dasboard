import React, { Fragment, useState, useEffect } from 'react';
import C3Chart from '../components/common/C3Chart';
import 'c3/c3.css';

/** Service */
import StatsService from '../services/stats.service';

// Context
import GlobalContext from '../context/GlobalContext';

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

const Stats = () => {
  const { activeCampaign } = React.useContext(GlobalContext);
  const [dropdownLabel, setDropdownLabel] = useState('Filter By Month');
  const [months, setCampaignMonths] = useState([]);
  const [state, setState] = useState({
    isLoading: false,
    affinity: [],
    market: [],
    gender: {
      columns: [
        ['Male', 0],
        ['Female', 0],
      ],
      type: 'donut',
      colors: {
        Male: primaryColor,
        Female: secondaryColor,
      },
    },
    age: {
      columns: [
        ['Peoples'],
      ],
      type: 'bar',
      colors: {
        Impression: primaryColor,
      },
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

  /**
  * API call to load month
  */
  const getCampaignMonths = () => {
    if (activeCampaign && activeCampaign.id === null) {
      return console.log('No Active campaign selected!');
    }
    setState({...state, isLoading: true});
    return StatsService.getCampaignMonths(activeCampaign.id)
      .then((response) => {
        setCampaignMonths(response.data);

        if (response.data.length) {
          loadStatsData(response.data[0].id);
          setDropdownLabel(response.data[0].name);
        } else {
          setState({...state, isLoading: false});
        }
      })
      .catch(() => false);
  };

  /**
   * API call to load stats data
   */
  const loadStatsData = (monthId) => {
    setState({ ...state, isLoading: true });
    StatsService.getCampaignStatsOfMonth(monthId)
      .then((response) => {
        const options = {};

        response.data.forEach(data => {
          if (data.type === 'Gender Data') {
            options.gender = {
              ...state.gender, columns: [
                ['Male', data.stats.find(item => item.field === 'Male').value],
                ['Female', data.stats.find(item => item.field === 'Female').value],
              ],
            };
          } else if (data.type === 'Age Data') {
            options.age = { ...state.age, columns: [['People', ...data.stats.map(item => item.value)]] };
          } else if (data.type === 'Affinity Data') {
            options.affinity = data.stats;
          } else if (data.type === 'In Market Data') {
            options.market = data.stats;
          }
        });

        return options;
      })
      .then((options) => {
        setState({
          ...state,
          isLoading: false,
          ...options,
        });
      })
      .catch(() => false);
  };

  const affinityTotal = state.affinity.length ? state.affinity.map(item => item.value).reduce((prev, next) => prev + next) : 0;
  const inMarketTotal = state.market.length ? state.market.map(item => item.value).reduce((prev, next) => prev + next) : 0;

  const loadDataByMonth = (data) => {
    loadStatsData(data.id);
    setDropdownLabel(data.name);
  };

  useEffect(() => {
    getCampaignMonths();
  }, [activeCampaign.id]);

  return (
    <Fragment>
      <section className="filter-bar ">
        <div className="inner-filter-bar w-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <PageTitleCampaignDropdown pageName="Stats Page" campaignId={activeCampaign.id} campaignList={window.$campaigns} />
              </div>
              <div className="col-md-6 text-right">
                <div className="block-filter">
                  {
                    months.length
                      ? <DropdownFilter itemList={[...months]} label={dropdownLabel} dropwDownCallBack={loadDataByMonth} />
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
          {
            state.isLoading
              ? <div className="text-center m-5">
                <div className="spinner-grow spinner-grow-lg" role="status"> <span className="sr-only">Loading...</span></div>
              </div>
              : <Fragment>
                <div className="row bar-donut-charts mb-5">
                  <div className="col-sm-8">
                    <div className="card card-chart card-bar-chart">
                      <div className="card-body">
                        <h4>Age data</h4>
                        <div className="chart-block">
                          <C3Chart holder="ageGraph" columns={state.age} axis={genderAxisData} bar={bar} size={size} legend={legend} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="card card-chart card-donut-chart">
                      <div className="card-body">
                        <h4>Gender data</h4>
                        <div className="chart-block">
                          <C3Chart holder="genderGraph" columns={state.gender} />
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
                          {state.affinity.length && affinityTotal > 0
                            ? state.affinity.map((progressbar, i) => {
                              return <ProgressBarBlock key={i} data={progressbar.value} label={progressbar.field} total={affinityTotal} />;
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
                          {state.market.length && inMarketTotal > 0
                            ? state.market.map((progressbar, i) => {
                              return <ProgressBarBlock key={i} data={progressbar.value} label={progressbar.field} total={inMarketTotal} />;
                            })
                            : 'No Data'
                          }
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
          }
        </div>
      </section>
    </Fragment>
  );
};

export default Stats;
