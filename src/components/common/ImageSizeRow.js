import React, {useState } from 'react';
import PropTypes from 'prop-types';

const ImageSizeRow = ({row}) => {
  const [size, setSize] = useState('0x0');
  const img = new Image();

  img.src = row.params.url;
  // Important to use function decleration for "this" scope
  img.onload = function calculateSize() {
    setSize(this.width + 'x' + this.height);
  };

  return <div row={row}>{size}</div>;
};

ImageSizeRow.propTypes = {
  row: PropTypes.object,
};

export default ImageSizeRow;
