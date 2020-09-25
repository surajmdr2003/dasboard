import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DataTable from 'react-data-table-component';

/** Components */
import HeaderMain from '../components/HeaderMain';
import Footer from '../components/Footer';
import PageTitleCampaignDropdown from '../components/PageTitleCampaignDropdown';


const MonthsBlock = ({row}) => (
    <div className="campaign">
        <div className="c-name">MFB Fall Checking 2020 - RAF AZ</div>
        <div className="c-date">12th Jan - 12th Sept</div>
    </div>
);

const ActionBlock = ({row}) => (
    <ul>
        <li><Link to="">Email</Link></li>
        <li><Link to="">Download</Link></li>
    </ul>
);

const columns = [
    {
        name: 'Months',
        selector: 'avatar',
        sortable: true,
        cell: row => <MonthsBlock row={row} />,
    },
    {
        name: 'Status',
        selector: 'id',
        sortable: true,
        cell: row => <div className="status active-campaign">Active</div>,
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
        cell: row => <div row={row}>{row.id}%</div>,
    },
    {
        name: '',
        selector: 'id',
        cell: row => <ActionBlock row={row}/>,
    },
];

const Reports = () => {
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
  
    const handlePerRowsChange = async (newPerPage, page) => {
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
            <HeaderMain />
            <div className="main-container">
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
            </div>
            <Footer />
        </Fragment>
    );
};

export default Reports;