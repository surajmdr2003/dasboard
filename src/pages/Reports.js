import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import DataTable from 'react-data-table-component';

/** Services */
import ReportService from '../services/report.service';

/** Components */
import AlertComponent from '../components/AlertComponent';
import ErrorMessage from '../components/common/ErrorMessage.component';
import PageTitleCampaignDropdown from '../components/PageTitleCampaignDropdown';


const Reports = (props) => {
  const campaignId = props.match.params.id;
  const [isModalOpen, toggleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [emailNotification, setEmailNotification] = useState({
    isSending: false,
    show: false,
    message: '',
    status: 'light',
  });
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
  }, [campaignId]);

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

  const sendEmail = async(event, reportId) => {
    event.preventDefault();
    setEmailNotification({
      ...setEmailNotification,
      isSending: true,
      show: true,
      message: 'Sending requested report in you email...',
      status: 'warning',
    });

    ReportService.emailReport(reportId)
      .then((response) => {
        console.log(response);
        setEmailNotification({
          ...setEmailNotification,
          isSending: false,
          show: true,
          message: 'Requested report is emailed to your registered account email!',
          status: 'success',
        });
      })
      .catch((error) => {
        setEmailNotification({
          ...setEmailNotification,
          isSending: false,
          show: true,
          message: error.message,
          status: 'danger',
        });
      });
  };

  const fetchCampaignReports = async(page) => {
    setLoading(true);
    ReportService.getReports(campaignId, page, perPage)
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

  const { register, handleSubmit, errors, isSubmitting } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <Fragment>
      <section className="filter-bar ">
        <div className="inner-filter-bar w-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <PageTitleCampaignDropdown pageSlug="/dashboard/reports" campaignId={+campaignId} campaignList={window.$campaigns} />
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
          <AlertComponent message={emailNotification.message} alert={emailNotification.status} show={emailNotification.show} isLoading={emailNotification.isSending} />
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

          <button className="btn btn-outline-primary" onClick={() => toggleModal(true)}>Show Modal</button>
          <div className={`custom-modal ${(isModalOpen ? 'show' : 'hide')}`}>
            <div className="modal-block">
              <div className="modal-header">
                <h4>Email this report</h4>
                <span className="icon-close" onClick={() => toggleModal(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492 492">
                    <path d="M300.188,246L484.14,62.04c5.06-5.064,7.852-11.82,7.86-19.024c0-7.208-2.792-13.972-7.86-19.028L468.02,7.872    c-5.068-5.076-11.824-7.856-19.036-7.856c-7.2,0-13.956,2.78-19.024,7.856L246.008,191.82L62.048,7.872    c-5.06-5.076-11.82-7.856-19.028-7.856c-7.2,0-13.96,2.78-19.02,7.856L7.872,23.988c-10.496,10.496-10.496,27.568,0,38.052    L191.828,246L7.872,429.952c-5.064,5.072-7.852,11.828-7.852,19.032c0,7.204,2.788,13.96,7.852,19.028l16.124,16.116    c5.06,5.072,11.824,7.856,19.02,7.856c7.208,0,13.968-2.784,19.028-7.856l183.96-183.952l183.952,183.952    c5.068,5.072,11.824,7.856,19.024,7.856h0.008c7.204,0,13.96-2.784,19.028-7.856l16.12-16.116    c5.06-5.064,7.852-11.824,7.852-19.028c0-7.204-2.792-13.96-7.852-19.028L300.188,246z" />
                  </svg>
                </span>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <label htmlFor="emailAddress" className="label">Email address</label>
                    <input
                      id="emailAddress"
                      name="emailAddress"
                      type="text"
                      className="form-control"
                      placeholder="you@example.com"
                      autoFocus
                      ref={register({
                        required: 'Please enter email address.',
                      })}
                    />
                    <ErrorMessage error={errors.emailAddress} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message" className="label">Leave a message</label>
                    <textarea
                      rows="5"
                      id="message"
                      name="message"
                      type="text"
                      className="form-control"
                      placeholder="Type your message here"
                    />
                  </div>
                  <div className="form-group mb-0">
                    <button disabled={isSubmitting} type="submit" className="mt-3 btn btn-default btn-primary">Email Report</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Reports.propTypes = {
  match: PropTypes.object,
};

export default Reports;
