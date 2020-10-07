import React, { Fragment } from 'react';
import C3Chart from '@kaiouwang/react-c3js';
import 'c3/c3.css';

/** Components */
import PageTitleWithFilter from '../components/PageTitleWithFilter';
import ProgressBarBlock from '../components/ProgressBarBlock';
import GraphData from '../components/GraphData';

const primaryColor = '#22a6de';
const secondaryColor = '#faddb1';

const dataDonut = {
  columns: [
    ['Male', 70],
    ['Female', 30],
  ],
  type: 'donut',
  colors: {
    Male: primaryColor,
    Female: secondaryColor,
  },
};

const data = {
  columns: [
    ['Impression', ...GraphData.AgeDatas.data],
  ],
  type: 'bar',
  colors: {
    Impression: primaryColor,
  },
};

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

const axis = {
  x: {
    type: 'category',
    categories: [...GraphData.AgeDatas.label],
    label: {
      position: 'inner-center',
    },
  },
  y: {
    show: false,
  },
};

const Stats = () => {
  return (
    <Fragment>
      <PageTitleWithFilter/>
      <section className="campaigns-charts">
        <div className="container">
          <div className="row bar-donut-charts mb-5">
            <div className="col-sm-8">
              <div className="card card-chart card-bar-chart">
                <div className="card-body">
                  <h4>Age data</h4>
                  <div className="chart-block">
                    <C3Chart size={size} data={data} bar={bar} axis={axis} legend={legend} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card card-chart card-donut-chart">
                <div className="card-body">
                  <h4>Gender data</h4>
                  <div className="chart-block">
                    <C3Chart data={dataDonut} />
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
                    <ProgressBarBlock data={10.24} label={'Sports & Fitness/Sports Fans'}/>
                    <ProgressBarBlock data={8.05} label={'Media & Entertainment/Movie Lovers'}/>
                    <ProgressBarBlock data={4.24} label={'Technology/Technophiles'}/>
                    <ProgressBarBlock data={9.40} label={'Sports/Fitness/Health & Fitness Buffs'}/>
                    <ProgressBarBlock data={10.14} label={'Shoppers/Luxury Shoppers'}/>
                    <ProgressBarBlock data={6.00} label={'Media & Entertainment/Movie'}/>
                    <ProgressBarBlock data={4.50} label={'Lifestyles & Hobbies/Green Living'}/>
                    <ProgressBarBlock data={1.00} label={'Shoppers/Luxury Shoppers'}/>
                    <ProgressBarBlock data={8.85} label={'Hobbies/Fashionistas'}/>
                    <ProgressBarBlock data={7.00} label={'Sports/Fitness/Health & Fitness Buffs'}/>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card card-chart card-progress-chart">
                <div className="card-body">
                  <h4>In market data</h4>
                  <ul className="progress-chart-block">
                    <ProgressBarBlock data={1.24} label={'Sports & Fitness/Sports Fans'}/>
                    <ProgressBarBlock data={5.05} label={'Media & Entertainment/Movie Lovers'}/>
                    <ProgressBarBlock data={4.24} label={'Technology/Technophiles'}/>
                    <ProgressBarBlock data={7.40} label={'Sports/Fitness/Health & Fitness Buffs'}/>
                    <ProgressBarBlock data={3.14} label={'Shoppers/Luxury Shoppers'}/>
                    <ProgressBarBlock data={2.00} label={'Media & Entertainment/Movie'}/>
                    <ProgressBarBlock data={6.50} label={'Lifestyles & Hobbies/Green Living'}/>
                    <ProgressBarBlock data={5.00} label={'Shoppers/Luxury Shoppers'}/>
                    <ProgressBarBlock data={1.85} label={'Hobbies/Fashionistas'}/>
                    <ProgressBarBlock data={10.00} label={'Sports/Fitness/Health & Fitness Buffs'}/>
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
