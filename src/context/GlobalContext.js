import React from 'react';
import moment from 'moment';

/**
 * For Initial startdate and enddate
 */
const now = new Date();
const start = moment(start).subtract(29, 'days').format('YYYY-MM-DD');
const end = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate())).format('YYYY-MM-DD');

const GlobalContext = React.createContext({
  user: {},
  activeCampaign: {id: null},
  dateFilter: {
    days: 30,
    startDate: start,
    endDate: end,
  },
});

export default GlobalContext;
