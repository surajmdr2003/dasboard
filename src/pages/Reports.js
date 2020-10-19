import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/** Services */
import ReportService from '../services/report.service';

/** Components */
import DataTable from 'react-data-table-component';

const Reports = () => {
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [columns] = useState([
    {
      name: 'Months',
      selector: 'avatar',
      sortable: true,
      cell: row => getMonthBlock(row),
    },
    {
      name: 'Status',
      selector: 'id',
      sortable: true,
      cell: (row) => getReportStatus(row),
    },
    {
      name: 'Impressions',
      selector: 'id',
      sortable: true,
      cell: row => (<div row={row}>{row.impressions}</div>),
    },
    {
      name: 'Clicks',
      selector: 'id',
      sortable: true,
      cell: row => (<div row={row}>{row.clicks}</div>),
    },
    {
      name: 'CTR',
      selector: 'id',
      sortable: true,
      cell: row => (<div row={row}>{(row.clicks / row.impressions).toFixed(2)}</div>),
    },
    {
      name: 'Conv rate',
      selector: 'id',
      sortable: true,
      cell: row => (<div row={row}>{(row.conversions / row.clicks).toFixed(2)}%</div>),
    },
    {
      name: '',
      selector: 'id',
      cell: row => getActionBlock(row),
    },
  ]);

  useEffect(() => {
    fetchCampaignReports(currentPage);
  }, []);

  const getReportStatus = (row) => {
    return (
      <div className={'status ' + (row.status === 'ACTIVE' ? 'active' : 'inactive') + '-campaign'}>
        {row.status}
      </div>
    );
  };

  const getMonthBlock = (row) => (
    <div className="campaign">
      <div className="c-name">{row.monthName}</div>
      <div className="c-date">{row.startDate} - {row.endDate}</div>
    </div>
  );

  const getActionBlock = (row) => (
    <ul>
      <li><a href="#" onClick={(e) => sendEmail(e, row.id)}>Email</a></li>
      <li><a target="_blank" href={row.reportUrl}>Download</a></li>
    </ul>
  );

  const  sendEmail = async(event, reportId) => {
    event.preventDefault();
    setLoading(true);
    ReportService.emailReport(reportId)
      .then((response) => {
        console.log(response);
        alert('Email Sent!');
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  const fetchCampaignReports = async(page) => {
    setLoading(true);
    ReportService.getReports(page, perPage)
      .then((response) => {
        setData(response.data);
      })
      .catch(() => false)
      .finally(() => setLoading(false));
  };

  const handlePageChange = page => {
    setCurrentPage(page);
    fetchCampaignReports(page);
  };

  const handlePerRowsChange = async(newPerPage, page) => {
    setPerPage(newPerPage);
    fetchCampaignReports(page);
  };

  return (
    <Fragment>
      <section className="filter-bar ">
        <div className="inner-filter-bar w-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                {/* <PageTitleCampaignDropdown /> */}
              </div>
              <div className="col-md-6 text-right">
                <Link to="/dashboard/create-report" className="btn btn-primary btn-default">Create Custom Report</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="main-content-wrapper table-reports">
        <div className="container">
          <DataTable
            columns={columns}
            data={data.content}
            progressPending={loading}
            pagination
            paginationServer
            paginationTotalRows={data.totalElements}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
          />
        </div>
      </section>
    </Fragment>
  );
};

export default Reports;
