import React, { Fragment, useState, useEffect } from 'react';
import C3Chart from '../components/common/C3Chart';
import 'c3/c3.css';
import cogoToast from 'cogo-toast';

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
    ratio: 0.5,
  },
};

const intialData = {
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
};

const Stats = () => {
  const { activeCampaign } = React.useContext(GlobalContext);
  const [dropdownLabel, setDropdownLabel] = useState('Filter By Month');
  const [months, setCampaignMonths] = useState([]);
  const [state, setState] = useState({
    isLoading: false,
    ...intialData,
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
      cogoToast.error('No Active campaign selected!', {position: 'bottom-left'});
      setCampaignMonths([]);
      setState({
        isLoading: false,
        ...intialData,
      });
    } else {
      setState({ ...state, isLoading: true });
      StatsService.getCampaignMonths(activeCampaign.id)
        .then((response) => {
          setCampaignMonths(response.data);
          if (response.data.length) {
            loadStatsData(response.data[0].id);
            setDropdownLabel(response.data[0].name);
          } else {
            setState({ ...state, isLoading: false });
          }
        })
        .catch((error) => cogoToast.error(error.message, {position: 'bottom-left'}));
    }
  };

  /**
   * API call to load stats data
   */
  const loadStatsData = (monthId) => {
    setState({ ...state, isLoading: true });
    StatsService.getCampaignStatsOfMonth(monthId)
      .then((response) => {
        let options = {};

        response.data.length
          ? response.data.forEach(data => {
            if (data.type === 'Gender Data') {
              options.gender = {
                ...state.gender, columns: [
                  ['Male', data.stats.find(item => item.field.toLowerCase() === 'male').value],
                  ['Female', data.stats.find(item => item.field.toLowerCase() === 'female').value],
                ],
              };
            } else if (data.type === 'Age Data') {
              options.age = { ...state.age, columns: [['People', ...data.stats.map(item => item.value)]] };
            } else if (data.type === 'Affinity Data') {
              options.affinity = data.stats;
            } else if (data.type === 'In Market Data') {
              options.market = data.stats;
            }
          })
          : options = { ...intialData };

        return options;
      })
      .then((options) => {
        setState({
          ...state,
          isLoading: false,
          ...options,
        });
      })
      .catch((error) => cogoToast.error(error.message, {position: 'bottom-left'}));
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
                <PageTitleCampaignDropdown pageName="Stats" campaignId={activeCampaign.id} campaignList={window.$campaigns} />
              </div>
              <div className="col-md-6 text-right">
                <div className="block-filter">
                  {months.length ? <DropdownFilter itemList={[...months]} label={dropdownLabel} dropwDownCallBack={loadDataByMonth} /> : ''}
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
              : activeCampaign.id
                ? <Fragment>
                  <div className="row bar-donut-charts mb-5">
                    <div className="col-sm-8">
                      <div className="card card-chart card-bar-chart">
                        <div className="card-body">
                          <h4 className={(state.age.columns[0].length === 1) ? 'mb-2' : ''}>Age data</h4>
                          <div className="chart-block">
                            {
                              (state.age.columns[0].length === 1)
                                ? <div className="text-muted"><i className="icon-bulb" /> No data for Age Graph.</div>
                                : <C3Chart holder="ageGraph" columns={state.age} axis={genderAxisData} bar={bar} size={size} legend={legend} />
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="card card-chart card-donut-chart">
                        <div className="card-body">
                          <h4 className={(state.gender.columns[0][1] === 0 && state.gender.columns[1][1] === 0) ? 'mb-2' : ''}>Gender data</h4>
                          <div className="chart-block">
                            {
                              (state.gender.columns[0][1] === 0 && state.gender.columns[1][1] === 0)
                                ? <div className="text-muted"><i className="icon-bulb" /> No data for Gender Graph</div>
                                : <C3Chart holder="genderGraph" columns={state.gender} />
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row progress-chart">
                    <div className="col-sm-6">
                      <div className="card card-chart card-progress-chart">
                        <div className="card-body">
                          <h4 className={(state.affinity.length && affinityTotal > 0) ? '' : 'mb-2'}>Affinity data</h4>
                          <ul className="progress-chart-block">
                            {state.affinity.length && affinityTotal > 0
                              ? state.affinity.map((progressbar, i) => {
                                return <ProgressBarBlock key={i} data={progressbar.value} label={progressbar.field} total={affinityTotal} />;
                              })
                              : <div className="text-muted"><i className="icon-bulb" /> No Affinity data available.</div>
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="card card-chart card-progress-chart">
                        <div className="card-body">
                          <h4 className={(state.market.length && inMarketTotal > 0) ? '' : 'mb-2'}>In market data</h4>
                          <ul className="progress-chart-block">
                            {state.market.length && inMarketTotal > 0
                              ? state.market.map((progressbar, i) => {
                                return <ProgressBarBlock key={i} data={progressbar.value} label={progressbar.field} total={inMarketTotal} />;
                              })
                              : <div className="text-muted"><i className="icon-bulb" /> No Market data available.</div>
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Fragment>
                : <p className="text-center">No Available Stats!</p>
          }
        </div>
      </section>
    </Fragment>
  );
};

export default Stats;
