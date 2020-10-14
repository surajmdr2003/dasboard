import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
// Components
import HeaderMain from '../components/HeaderMain';
import Footer from '../components/Footer';

const AdminPages = ({ children }) => {
  return (
    <Fragment>
      <HeaderMain />
      <div className="main-container">
        {children}
      </div>
      <Footer />
    </Fragment>
  );
};

AdminPages.propTypes = {
  children: PropTypes.object,
};

export default AdminPages;
