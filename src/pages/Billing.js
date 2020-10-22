import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import DataTable from 'react-data-table-component';

/** Components */
import Footer from '../components/Footer';
import PageTitleWithOutFilter from '../components/PageTitleWithOutFilter';


const ActionBlock = () => (
  <ul>
    <li><Link to="">Print</Link></li>
    <li><Link to="">Download</Link></li>
  </ul>
);

const columns = [
  {
    name: 'Date',
    selector: 'id',
    sortable: true,
  },
  {
    name: 'Invoice #',
    selector: 'id',
    sortable: true,
  },
  {
    name: 'Payment method',
    selector: 'id',
    sortable: true,
  },
  {
    name: 'Amount',
    selector: 'id',
    sortable: true,
  },
  {
    name: 'Status',
    selector: 'id',
    sortable: true,
    cell: () => <div className="status paid">Paid</div>,
  },
  {
    name: '',
    selector: 'id',
    cell: row => <ActionBlock row={row}/>,
  },
];

const Billing = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const fetchUsers = async page => {
    setLoading(true);

    const response = await axios.get(
      `https://reqres.in/api/users?page=${page}&per_page=${perPage}&delay=1`,
    );

    setData(response.data.data);
    setTotalRows(response.data.total);
    setLoading(false);
  };

  const handlePageChange = page => {
    fetchUsers(page);
  };

  const handlePerRowsChange = async(newPerPage, page) => {
    setLoading(true);

    const response = await axios.get(
      `https://reqres.in/api/users?page=${page}&per_page=${newPerPage}&delay=1`,
    );

    setData(response.data.data);
    setPerPage(newPerPage);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  return (
    <Fragment>
      <div className="main-container">
        <PageTitleWithOutFilter title="Your profile" />
        <section className="main-content-wrapper table-reports">
          <div className="container">
            <DataTable
              columns={columns}
              data={data}
              progressPending={loading}
              pagination
              paginationServer
              paginationTotalRows={totalRows}
              onChangeRowsPerPage={handlePerRowsChange}
              onChangePage={handlePageChange}
            />
          </div>
        </section>
      </div>
      <Footer />
    </Fragment>
  );
};

Billing.propTypes = {
  row: PropTypes.object,
};

export default Billing;
