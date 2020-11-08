import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import 'c3/c3.css';

// Custom Chart using C3 chart
import C3Chart from './C3Chart';

/**
 * Attribute for graph starts
 */
const initialData = {
  x: 'x',
  columns: [
    ['x'],
    ['Impression'],
  ],
  type: 'bar',
  colors: {
    impression: '#22a6de',
  },
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

const ChartBlock = ({ chartDate, selectedGraph }) => {
  const [chartData, setChartData] = useState(initialData);

  useEffect(() => {
    setChartData(selectedGraph);
  }, [selectedGraph]);

  return (

    <div className="chart-block">
      <div className="date-range">{chartDate}</div>
      <C3Chart columns={chartData} axis={axis} bar={{ width: 10 }} size={{ height: 280 }} legend={{ show: false }}/>
    </div>
  );
};

ChartBlock.propTypes = {
  chartDate: PropTypes.string,
  selectedGraph: PropTypes.any,
};

export default ChartBlock;
