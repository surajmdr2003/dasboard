import React, {useState } from 'react';
import PropTypes from 'prop-types';

const ImageSizeRow = ({row}) => {
  const [size, setSize] = useState('0*0');
  const img = new Image();

  img.src = row.assetUrl;
  // Important to use function decleration for "this" scope
  img.onload = function calculateSize() {
    setSize(this.width + '*' + this.height);
  };

  return <div row={row}>{size}</div>;
};

ImageSizeRow.propTypes = {
  row: PropTypes.object,
};

export default ImageSizeRow;
