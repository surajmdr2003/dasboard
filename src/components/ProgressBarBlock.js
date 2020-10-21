import React from 'react';
import PropTypes from 'prop-types';

const ProgressBarBlock = (props) => {
  /**
     * Return percentage value for progress bar
     * @param {Number} num
     */
  const calcPercentage = (num, total) => {
    return (((100 / total) * num).toFixed(2) + '%');
  };

  return (
    <li className="progressbar-item">
      <div className="progressbar-data">{calcPercentage(props.data, props.total)}</div>
      <div className="progressbar-graph">
        <div className="progress">
          <div className="progress-bar" role="progressbar" style={{width: calcPercentage(props.data, props.total)}} />
        </div>
      </div>
      <div className="progressbar-label">{props.label}</div>
    </li>
  );
};

ProgressBarBlock.propTypes = {
  data: PropTypes.number,
  label: PropTypes.string,
  total: PropTypes.number,
};

export default ProgressBarBlock;
