import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import c3 from 'c3';

const C3Chart = ({holder, columns, axis, size, bar, legend, tooltip}) => {
  useEffect(() => {
    const options = {};

    axis ? options.axis = axis : '';
    size ? options.size = size : '';
    bar ? options.bar = bar : '';
    legend ? options.legend = legend : '';
    tooltip ? options.tooltip = tooltip : '';

    c3.generate({
      bindto: '#' + holder,
      data: columns,
      transition: {
        duration: 100,
      },
      ...options,
    });
  }, [columns]);

  return <div id={holder}/>;
};

C3Chart.propTypes = {
  columns: PropTypes.any,
  axis: PropTypes.object,
  size: PropTypes.object,
  bar: PropTypes.object,
  legend: PropTypes.object,
  tooltip: PropTypes.object,
  holder: PropTypes.string,
};

export default C3Chart;

