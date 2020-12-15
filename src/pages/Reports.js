import React, { Fragment, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import cogoToast from 'cogo-toast';
import DataTable from 'react-data-table-component';

// Context
import GlobalContext from '../context/GlobalContext';

/** Services */
import ReportService from '../services/report.service';

/** Components */
import ErrorMessage from '../components/common/ErrorMessage.component';
import PageTitleCampaignDropdown from '../components/PageTitleCampaignDropdown';

const Reports = () => {
  const { activeCampaign } = React.useContext(GlobalContext);
  const [isModalOpen, toggleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const { register, handleSubmit, errors, isSubmitting } = useForm();
  const [currentReport, setCurrentReport] = useState({
    startDate: '',
    endDate: '',
  });
  const [columns] = useState([
    {
      name: 'Time Frame',
      selector: 'months',
      sortable: true,
      cell: row => getMonthBlock(row),
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      cell: (row) => getReportStatus(row),
    },
    {
      name: 'Impressions',
      selector: 'impressions',
      sortable: true,
      cell: row => (<div row={row}>{row.impressions.toLocaleString()}</div>),
    },
    {
      name: 'Clicks',
      selector: 'clicks',
      sortable: true,
      cell: row => (<div row={row}>{row.clicks.toLocaleString()}</div>),
    },
    {
      name: 'CTR',
      selector: 'ctr',
      sortable: true,
      cell: row => (<div row={row}>{row.ctr}%</div>),
    },
    {
      name: 'Conv. rate',
      selector: 'conv-rate',
      sortable: true,
      cell: row => (<div row={row}>{row.convRate}%</div>),
    },
    {
      name: '',
      selector: 'id',
      sortable: false,
      cell: row => getActionBlock(row),
    },
  ]);

  /**
   * Preoare row data for table
   * @param {*} row
   */
  const prepareTableRow = (row) => {
    row.ctr = handleNanValueWithCalculation(row.clicks, row.impressions);
    row.convRate = handleNanValueWithCalculation(+row.conversions, row.clicks);

    return row;
  };

  const handleNanValueWithCalculation = (fNum, sNum) => {
    if (sNum === 0) {
      return (fNum * 100).toFixed(2);
    }
    return ((fNum / sNum) * 100).toFixed(2);
  };

  useEffect(() => {
    fetchCampaignReports(currentPage);
  }, [activeCampaign.id]);

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
    (row.reportAvailable)
      ? <ul>
        <li><a href="#" onClick={(e) => sendEmail(e, row)}>Email</a></li>
        <li><a href="#" onClick={(e) => downloadReport(e, row)}>Download</a></li>
      </ul>
      : <div className="no-report">Not available</div>
  );

  const sendEmail = async(event, report) => {
    event.preventDefault();
    setCurrentReport(report);
    toggleModal(true);
  };

  const fetchCampaignReports = async(page) => {
    if (activeCampaign && activeCampaign.id === null) {
      return console.log('No Active campaign selected!');
    }

    setLoading(true);
    return ReportService.getReports(activeCampaign.id, page, perPage)
      .then((response) => {
        setData(response.data);
      })
      .catch(() => console.log('Unable to fetch Reports for Campaign'))
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

  const downloadReport = (e, report) => {
    e.preventDefault();

    const { hide } = cogoToast.loading('Report is being downloaded ...', {hideAfter: 0, position: 'bottom-center'});
    ReportService.downloadReport(report.id)
      .then((response) => {
        if (response.data) {
          // Convert the data into Respective Blob Object
          const file = new Blob([response.data], {type: response.headers['content-type']});
          const fileURL = URL.createObjectURL(file);

          // Redirect to the report url
          const link = document.createElement('a');

          link.href = fileURL;
          link.download = `${report.monthName}_${report.startDate}_${report.endDate}_eom_report.pdf`;
          link.click();

          // Removes the node
          link.remove();
          hide();
          cogoToast.success('Report is downloaded successfully!', {position: 'bottom-center'});
        }
      })
      .catch(() => {
        hide();
        cogoToast.error('Error downloading the report.', {position: 'bottom-center'});
      });
  };

  const onSubmit = (formData, e) => {
    const { hide } = cogoToast.loading('Email is being sent ...', {hideAfter: 0, position: 'bottom-center'});
    ReportService.emailReport(currentReport.id, formData)
      .then((response) => {
        hide();
        e.target.reset();
        if (response.data.success) {
          cogoToast.success(response.data.message, {position: 'bottom-center'});
        } else {
          cogoToast.error(response.data.message, {position: 'bottom-center'});
        }
      });
  };

  return (
    <Fragment>
      <section className="filter-bar ">
        <div className="inner-filter-bar w-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <PageTitleCampaignDropdown pageName="Reports" campaignId={+activeCampaign.id} campaignList={window.$campaigns} />
              </div>
              <div className="col-md-6 text-right">
                {/* <Link to="/dashboard/create-report" className="btn btn-primary btn-default">Create Custom Report</Link> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="main-content-wrapper table-reports">
        <div className="container">
          <DataTable
            columns={columns}
            data={data.content ? data.content.map(prepareTableRow) : []}
            progressPending={loading}
            pagination
            persistTableHead
            paginationServer
            paginationTotalRows={data.totalElements}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
            defaultSortField="impressions"
            defaultSortAsc={false}
          />
          <div className={`custom-modal ${(isModalOpen ? 'show' : 'hide')}`}>
            <div className="modal-block">
              <div className="modal-header">
                <header>
                  <h4>Email Report</h4>
                  <div>From {currentReport.startDate} to {currentReport.endDate}</div>
                </header>
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
                      ref={register()}
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

export default Reports;
