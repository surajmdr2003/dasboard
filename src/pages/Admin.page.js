import React, {Fragment} from 'react';
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

export default AdminPages;
