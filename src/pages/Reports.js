import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';

/** Components */
import PageTitleCampaignDropdown from '../components/PageTitleCampaignDropdown';

const Reports = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [columns] = useState([
    {
      name: 'Months',
      selector: 'avatar',
      sortable: true,
      cell: row => getMonthBlock({row}),
    },
    {
      name: 'Status',
      selector: 'id',
      sortable: true,
      cell: () => (<div className="status active-campaign">Active</div>),
    },
    {
      name: 'Impressions',
      selector: 'id',
      sortable: true,
    },
    {
      name: 'Clicks',
      selector: 'id',
      sortable: true,
    },
    {
      name: 'CTR',
      selector: 'id',
      sortable: true,
    },
    {
      name: 'Conv rate',
      selector: 'id',
      sortable: true,
      cell: row => (<div row={row}>{row.id}%</div>),
    },
    {
      name: '',
      selector: 'id',
      cell: row => getActionBlock({row}),
    },
  ]);

  const getMonthBlock = () => (
    <div className="campaign">
      <div className="c-name">MFB Fall Checking 2020 - RAF AZ</div>
      <div className="c-date">12th Jan - 12th Sept</div>
    </div>
  );

  const getActionBlock = () => (
    <ul>
      <li><Link to="">Email</Link></li>
      <li><Link to="">Download</Link></li>
    </ul>
  );

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
      <section className="filter-bar ">
        <div className="inner-filter-bar w-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <PageTitleCampaignDropdown />
              </div>
              <div className="col-md-6 text-right">
                <Link to="./create-report" className="btn btn-primary btn-default">Create Custom Report</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
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
    </Fragment>
  );
};

export default Reports;
