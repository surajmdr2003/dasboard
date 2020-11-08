import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import c3 from 'c3';

const C3Chart = ({columns, axis, size, bar, legend}) => {
  useEffect(() => {
    c3.generate({
      bindto: '#chart',
      data: columns,
      axis: axis,
      size: size,
      bar: bar,
      legend: legend,
    });
  }, [columns]);

  return <div id="chart"/>;
};

C3Chart.propTypes = {
  columns: PropTypes.any,
  axis: PropTypes.object,
  size: PropTypes.object,
  bar: PropTypes.object,
  legend: PropTypes.object,
};

export default C3Chart;

