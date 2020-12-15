import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import 'c3/c3.css';

// Custom Chart using C3 chart
import C3Chart from '../common/C3Chart';

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

let tooltipValue = null;

const tooltip = {
  format: {
    check: null,
    value: function(value, ratio, id) {
      tooltipValue = value;

      return (id === 'ctr' || id === 'convrate')
        ? value.toFixed(2) + '%'
        : value.toLocaleString();
    },
    name: function(name) {
      let label = '';

      switch (name) {
        case 'convrate':
          label = 'Conv. rate';
          break;

        case 'conversions':
          label = tooltipValue === 1 ? 'Conversion' : 'Conversions';
          break;
        default:
          label = name;
      }

      return label;
    },
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
      <C3Chart holder="campaignGraph" columns={chartData} axis={axis} bar={{ width: 10 }} size={{ height: 280 }} legend={{ show: false }} tooltip={tooltip} />
    </div>
  );
};

ChartBlock.propTypes = {
  chartDate: PropTypes.string,
  selectedGraph: PropTypes.any,
};

export default ChartBlock;
