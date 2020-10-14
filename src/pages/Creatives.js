import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import PageTitleWithFilter from '../components/PageTitleWithFilter';
import CustomLoader from '../components/CustomLoader';

const AdsBlock = ({row}) => (
  <div className="campaign-media media">
    <img src={row.avatar} className="table-campaign-image mr-3" alt="ads"/>
    <div className="media-body">
      <p className="mt-0">
        MFB Fall Checking 2020 - RAF AZ {row.first_name}
      </p>
    </div>
  </div>
);

AdsBlock.propTypes = {
  row: PropTypes.object,
};

const columns = [
  {
    name: 'Ad name',
    selector: 'avatar',
    sortable: true,
    className: 'fuck',
    cell: row => <AdsBlock row={row} />,
  },
  {
    name: 'size',
    selector: 'id',
    sortable: true,
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
    name: 'Conversion',
    selector: 'id',
    sortable: true,
  },
  {
    name: 'Conv rate',
    selector: 'id',
    sortable: true,
    cell: row => <div row={row}>{row.id}%</div>,
  },
];

const Creatives = () => {
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
      <PageTitleWithFilter hasFilter={true}/>
      <section className="main-content-wrapper table-creatives">
        <div className="container">
          <DataTable
            columns={columns}
            data={data}
            progressPending={loading}
            progressComponent={<CustomLoader />}
            persistTableHead
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

Creatives.propTypes = {
  row: PropTypes.object,
};

export default Creatives;
