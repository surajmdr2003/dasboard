import React from 'react';
import styled from 'styled-components';

const Spinner = styled.div`
  margin: 16px;
  animation: ___CSS_0___ 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const CustomLoader = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Spinner />
      <div>Fancy Loader...</div>
    </div>
  );
};

export default CustomLoader;
